#!/usr/bin/env python3
"""
scaffold.py — создаёт структуру папок для модуля/урока конвейера AMC 8.
Кросс-платформенно: Windows и Debian (нужен только Python 3).

Примеры:
    python scaffold.py modul-1-chisla-detektivy
        -> создаёт папку модуля с README.md и module.md

    python scaffold.py modul-1-chisla-detektivy urok-4-vycherkni-lishnee
        -> создаёт папку урока и раскладывает в неё все шаблоны из _templates/

Слаги — латиницей (a-z, 0-9, дефис). Содержимое файлов — русское.
"""
import sys
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TPL = ROOT / "_templates"

# шаблон _templates/<файл>  ->  имя в папке урока
LESSON_FILES = {
    "teacher.md":        "01-plan-konspekt-uchitelya.md",
    "student.md":        "02-materialy-uchenice.md",
    "tasks.md":          "03-zadachi.md",
    "solutions.md":      "04-resheniya.md",
    "slides.md":         "05-slides.md",
    "image-prompts.md":  "06-image-prompts.md",
    "homework.md":       "07-domashka.md",
    "error-notebook.md": "08-tetrad-oshibok.md",
    "deck.template.js":  "deck.js",
}

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def check_slug(slug: str, what: str):
    if not SLUG_RE.match(slug):
        sys.exit(f"[ошибка] {what}-слаг «{slug}»: только латиница, цифры и дефис "
                 f"(например modul-1-chisla-detektivy).")


def write_if_absent(path: Path, text: str):
    if path.exists():
        print(f"  = пропущено (уже есть): {path.relative_to(ROOT)}")
        return
    path.write_text(text, encoding="utf-8")
    print(f"  + создано: {path.relative_to(ROOT)}")


def copy_template(src_name: str, dst: Path):
    src = TPL / src_name
    if dst.exists():
        print(f"  = пропущено (уже есть): {dst.relative_to(ROOT)}")
        return
    if src.exists():
        shutil.copyfile(src, dst)
        print(f"  + из шаблона: {dst.relative_to(ROOT)}")
    else:
        dst.write_text(f"<!-- шаблон {src_name} не найден в _templates/ -->\n", encoding="utf-8")
        print(f"  ! шаблона нет, создан заглушкой: {dst.relative_to(ROOT)}")


def make_module(mod: str):
    d = ROOT / mod
    d.mkdir(parents=True, exist_ok=True)
    print(f"Модуль: {d.relative_to(ROOT)}")
    write_if_absent(d / "README.md",
        f"# Модуль: {mod}\n\n"
        "Обзор модуля и индекс уроков. Заполняется промтом "
        "`_prompts/01-decompose-module.md`.\n\n"
        "## Уроки\n\n_(появятся после декомпозиции)_\n")
    write_if_absent(d / "module.md",
        f"# {mod}\n\n"
        "<!-- Заполнить через _prompts/01-decompose-module.md -->\n\n"
        "## Темы модуля\n\n## Доступно (пройдено к началу модуля)\n\n"
        "## Крючок / визуальный мир\n\n## Разбивка на уроки\n")


def make_lesson(mod: str, lesson: str):
    make_module(mod)
    d = ROOT / mod / lesson
    d.mkdir(parents=True, exist_ok=True)
    print(f"Урок: {d.relative_to(ROOT)}")
    # сначала lesson.md (сводный файл, который читают все промты)
    copy_template("lesson.md", d / "lesson.md")
    for src_name, dst_name in LESSON_FILES.items():
        copy_template(src_name, d / dst_name)
    print("\nГотово. Дальше — промты по порядку: 02 → 03 → 04(QC) → 05 → 06 → 07.")


def main():
    args = [a for a in sys.argv[1:] if a.strip()]
    if not args:
        sys.exit(__doc__)
    mod = args[0]
    check_slug(mod, "модуль")
    if len(args) == 1:
        make_module(mod)
    else:
        lesson = args[1]
        check_slug(lesson, "урок")
        make_lesson(mod, lesson)


if __name__ == "__main__":
    main()
