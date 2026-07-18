#!/usr/bin/env python3
"""
extract_pdf.py — вытаскивает текст задач из буклетов AMC (обычно растровые PDF).

    python tools/extract_pdf.py "путь/к/папке-с-pdf"   [out.md]
    python tools/extract_pdf.py файл1.pdf файл2.pdf ...  [out.md]

Сначала пробует текстовый слой (pdftotext); если его нет (сканы/«Print to PDF») —
рендерит страницы и распознаёт через OCR (tesseract). Результат — один markdown
со всем текстом по годам, который дальше читает промт 00-intake.

Зависимости:
  - Debian:  apt-get install poppler-utils tesseract-ocr tesseract-ocr-eng
  - Windows: установить poppler и tesseract, добавить в PATH
             (или: pip install pytesseract pdf2image + бинарники)
Проверка:  pdftotext -v   tesseract --version
"""
import sys
import subprocess
import shutil
import tempfile
from pathlib import Path


def have(cmd):
    return shutil.which(cmd) is not None


def pdf_text_layer(pdf: Path) -> str:
    """Пытается вытащить встроенный текст. Пусто => скан."""
    if not have("pdftotext"):
        return ""
    try:
        out = subprocess.run(["pdftotext", "-layout", str(pdf), "-"],
                             capture_output=True, text=True, timeout=120)
        return out.stdout.strip()
    except Exception:
        return ""


def pdf_ocr(pdf: Path) -> str:
    """Рендерит страницы в PNG (200 dpi) и распознаёт tesseract'ом."""
    if not (have("pdftoppm") and have("tesseract")):
        return "[OCR недоступен: нет pdftoppm/tesseract — см. шапку extract_pdf.py]"
    text = []
    with tempfile.TemporaryDirectory() as td:
        base = Path(td) / "p"
        subprocess.run(["pdftoppm", "-r", "200", "-png", str(pdf), str(base)],
                       capture_output=True, timeout=600)
        for png in sorted(Path(td).glob("p*.png")):
            r = subprocess.run(["tesseract", str(png), "-", "-l", "eng"],
                               capture_output=True, text=True, timeout=120)
            text.append(r.stdout)
    return "\n".join(text).strip()


def collect_pdfs(args):
    pdfs = []
    for a in args:
        p = Path(a)
        if p.is_dir():
            pdfs += sorted(p.glob("*.pdf")) + sorted(p.glob("*.PDF"))
        elif p.suffix.lower() == ".pdf" and p.exists():
            pdfs.append(p)
    # уникальные, по имени
    seen, uniq = set(), []
    for p in pdfs:
        if p.resolve() not in seen:
            seen.add(p.resolve()); uniq.append(p)
    return uniq


def main():
    args = [a for a in sys.argv[1:] if a.strip()]
    if not args:
        sys.exit(__doc__)

    # последний аргумент с .md — это выходной файл
    out = Path("amc-corpus.md")
    if args and args[-1].lower().endswith(".md"):
        out = Path(args.pop())

    pdfs = collect_pdfs(args)
    if not pdfs:
        sys.exit("PDF не найдены. Укажи папку или файлы .pdf")

    print(f"нашёл PDF: {len(pdfs)}")
    chunks = ["# Корпус задач AMC (сырой текст из PDF)\n",
              "Автоизвлечение. Возможны опечатки OCR — при разборе сверяйся со смыслом.\n"]
    for pdf in pdfs:
        print(f"  · {pdf.name} …", end=" ", flush=True)
        txt = pdf_text_layer(pdf)
        how = "текстовый слой"
        if len(txt) < 200:            # почти пусто => скан
            txt = pdf_ocr(pdf)
            how = "OCR"
        print(f"{how}, {len(txt)} симв.")
        chunks.append(f"\n\n---\n\n## Файл: {pdf.name}  _({how})_\n\n{txt}\n")

    out.write_text("\n".join(chunks), encoding="utf-8")
    print(f"\nготово → {out}  ({out.stat().st_size // 1024} КБ)")
    print("дальше: скорми Claude Code промт _prompts/00-intake.md")


if __name__ == "__main__":
    main()
