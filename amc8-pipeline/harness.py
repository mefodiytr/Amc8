#!/usr/bin/env python3
"""
harness.py — оркестратор конвейера AMC 8. Детерминированную часть (структура,
сборка деки, проверка) делает он; генерацию текста/задач делает Claude Code
между вызовами (см. HARNESS.md).

  python harness.py plan                 # (пере)построить syllabus.json + syllabus.txt
  python harness.py new <N>              # развернуть папку урока N из плана + бриф для CC
  python harness.py check <N>            # собрать deck.pptx, проверить, показать чек-лист
  python harness.py status               # что уже собрано по всему плану

Один урок за вызов (как договорились). Требует: Python 3; для check — node+pptxgenjs.
"""
import sys, json, subprocess, glob, os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SYL = ROOT / "syllabus.json"

# ожидаемые файлы урока и минимальный «заполненный» размер (больше — значит не болванка)
LESSON_FILES = [
    "lesson.md", "01-plan-konspekt-uchitelya.md", "02-materialy-uchenice.md",
    "03-zadachi.md", "04-resheniya.md", "05-slides.md", "06-image-prompts.md",
    "07-domashka.md", "08-tetrad-oshibok.md", "deck.js",
]
FILLED_MIN = 900  # байт: болванка из _templates обычно меньше


def sh(cmd, cwd=None):
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)


def load_plan():
    if not SYL.exists():
        sys.exit("нет syllabus.json — сначала: python harness.py plan")
    return json.loads(SYL.read_text(encoding="utf-8"))


def cmd_plan(args):
    start = args[0] if args else "2026-07-19"
    d1 = args[1] if len(args) > 1 else "Sun"
    d2 = args[2] if len(args) > 2 else "Wed"
    ramp = args[3] if len(args) > 3 else "2026-09-01"
    total = args[4] if len(args) > 4 else "36"
    ms = str(ROOT / "tools" / "make_schedule.py")
    sh([sys.executable, ms, f"--json={SYL}", start, d1, d2, ramp, total])
    with open(ROOT / "syllabus.txt", "w", encoding="utf-8") as f:
        r = sh([sys.executable, ms, start, d1, d2, ramp, total])
        f.write(r.stdout)
    p = load_plan()
    print(f"план: {p['total']} уроков, {p['lessons'][0]['date']} → {p['lessons'][-1]['date']}")
    print("дальше: python harness.py new 1")


def find_lesson_dir(rec):
    hits = sorted(glob.glob(str(ROOT / rec["module"] / (rec["lesson_slug"] + "*"))))
    if hits:
        return Path(hits[0])
    # запасной поиск по номеру
    hits = sorted(glob.glob(str(ROOT / "modul-*" / f"urok-{rec['n']:02d}-*")))
    return Path(hits[0]) if hits else None


def cmd_new(args):
    if not args:
        sys.exit("укажи номер урока: python harness.py new 1")
    n = int(args[0])
    plan = load_plan()
    rec = next((r for r in plan["lessons"] if r["n"] == n), None)
    if not rec:
        sys.exit(f"урока {n} нет в плане (всего {plan['total']})")
    # scaffold
    r = sh([sys.executable, str(ROOT / "scaffold.py"), rec["module"], rec["lesson_slug"]])
    print(r.stdout.strip())
    if r.returncode != 0:
        print(r.stderr); sys.exit(1)
    d = find_lesson_dir(rec)
    is_mock = "ПРОБНИК" in rec["type"]
    is_review = "ОБЗОР" in rec["type"] or is_mock
    # бриф для Claude Code
    print("\n" + "=" * 64)
    print(f"БРИФ ДЛЯ CLAUDE CODE — урок {n}")
    print("=" * 64)
    print(f"папка:      {d.relative_to(ROOT) if d else '?'}")
    print(f"дата:       {rec['date']} ({rec['weekday']})")
    print(f"блок:       {rec['block']}  ·  проход {rec['pass']}")
    print(f"тема:       {rec['topic']}")
    print(f"сложность:  основная {rec['main_band']} · финал {rec['finale_band']}")
    print(f"станок:     {rec['stanok']}")
    if rec["pass"] >= 2 and rec["is_new"]:
        print("ПОВТОР:     это та же тема на уровень выше — приём/карточка те же,")
        print("            задачи из полосы AMC выше, разминкой интерливинг прошлого прохода.")
    if is_mock:
        print("ТИП:        ПРОБНИК — НЕ генерировать; собрать из реального прошлого AMC (AoPS),")
        print("            писать только разбор и хронометраж.")
    elif is_review:
        print("ТИП:        ОБЗОР — новых приёмов нет; микс уже пройденного, на время.")
    print("\nШАГИ (по порядку, писать файлы в папку урока):")
    steps = ["02-lesson-core", "03-tasks", "04-qc ⛔ШЛЮЗ", "05-slide-texts",
             "06-image-prompts", "07-build-deck"]
    for s in steps:
        print(f"  • _prompts/{s}.md")
    print("\nQC-ШЛЮЗ: в шаге 04 напиши python-скрипт, решающий каждую задачу с нуля,")
    print("         сверь с ответом; правь/заменяй, пока все не ✅. Иначе дальше НЕ идти.")
    print("МАТЕМАТИКА: сетки/фигуры/доски — вектором в deck.js (deckkit), не картинкой.")
    print("\nПосле генерации:  python harness.py check", n)


PLACEHOLDERS = ("<НАЗВАНИЕ>", "<…>", "<ЗАГ", "<Заголовок>", "<!-- шаблон",
                "тема-слот", "<текст>", "<что сказать>")

def filled(path):
    if not path.exists():
        return False
    try:
        txt = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return path.stat().st_size >= FILLED_MIN
    if any(m in txt for m in PLACEHOLDERS):   # остались заглушки -> болванка
        return False
    return len(txt) >= 300


def cmd_check(args):
    if not args:
        sys.exit("укажи номер урока: python harness.py check 1")
    n = int(args[0])
    plan = load_plan()
    rec = next((r for r in plan["lessons"] if r["n"] == n), None)
    if not rec:
        sys.exit(f"урока {n} нет в плане")
    d = find_lesson_dir(rec)
    if not d:
        sys.exit(f"папка урока {n} не найдена — сначала: python harness.py new {n}")

    print(f"урок {n}: {d.relative_to(ROOT)}\n")

    # 1. собрать деку (deck.js устойчив к отсутствию картинок через artOrBg)
    deck = d / "deck.js"
    built = None
    if deck.exists():
        r = sh(["node", "deck.js"], cwd=str(d))
        pptx = list(d.glob("*.pptx"))
        built = pptx[0] if pptx else None
        print("сборка деки:", "OK →" + built.name if built else "не собралась")
        if r.returncode != 0 and not built:
            print("  ", (r.stderr or r.stdout).strip().splitlines()[-1:] or "")

    # 2. валидатор
    if built:
        r = sh([sys.executable, str(ROOT / "tools" / "validate_deck.py"), str(built)])
        print(r.stdout.strip())

    # 3. чек-лист файлов
    print("\nчек-лист урока:")
    for f in LESSON_FILES:
        p = d / f
        mark = "✓ заполнен" if filled(p) else ("· болванка" if p.exists() else "✗ нет")
        print(f"  [{mark:11}] {f}")

    # 4. картинки
    imgs = sorted((d / "img").glob("*.png")) if (d / "img").exists() else []
    print(f"\nкартинки: {len(imgs)} в img/  " +
          ("(дека собрана с ними)" if imgs else "→ сгенерь по 06-image-prompts.md, положи в img/, повтори check"))

    # 5. вердикт
    ready = all(filled(d / f) for f in LESSON_FILES) and built is not None
    print("\nВЕРДИКТ:", "готов к занятию" if (ready and imgs) else
          ("текст готов, ждём картинки" if ready else "не готов — заполни отмеченные файлы"))
    print("коммит:", f"git add -A && git commit -m 'Урок {n:02d}: {rec['topic'][:40]}'")


def cmd_status(args):
    plan = load_plan()
    print(f"{'#':>3}  {'дата':10}  {'состояние':22}  тема")
    print("-" * 70)
    for rec in plan["lessons"]:
        d = find_lesson_dir(rec)
        if not d:
            st = "— не начат"
        else:
            done = sum(filled(d / f) for f in LESSON_FILES)
            imgs = len(list((d / "img").glob("*.png"))) if (d / "img").exists() else 0
            if done == len(LESSON_FILES) and imgs:
                st = "✓ готов"
            elif done == len(LESSON_FILES):
                st = "текст готов, без картинок"
            elif done:
                st = f"в работе ({done}/{len(LESSON_FILES)})"
            else:
                st = "развёрнут, пуст"
        print(f"{rec['n']:>3}  {rec['date']:10}  {st:22}  {rec['topic'][:34]}")


CMDS = {"plan": cmd_plan, "new": cmd_new, "check": cmd_check, "status": cmd_status}


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in CMDS:
        sys.exit(__doc__)
    CMDS[sys.argv[1]](sys.argv[2:])


if __name__ == "__main__":
    main()
