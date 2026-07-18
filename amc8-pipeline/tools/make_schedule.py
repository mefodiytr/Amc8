#!/usr/bin/env python3
"""
make_schedule.py — датированный план уроков AMC 8 со спиралью и «разгоном»
(до ramp — 1 урок/нед, с ramp — 2/нед). Роль урока считается по НОМЕРУ урока.

    python tools/make_schedule.py                                   # таблица в stdout
    python tools/make_schedule.py 2026-07-19 Sun Wed 2026-09-01 36
    python tools/make_schedule.py --json=syllabus.json 2026-07-19 Sun Wed 2026-09-01 36

С --json=PATH пишет машиночитаемый план (его читает harness.py), иначе печатает таблицу.
"""
import sys, json
from datetime import date, timedelta

WD = {"Sun": 6, "Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5}
WD_RU = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

TOPICS = [
    "Подсчёт-1 (правило произв., перестановки, факториал)",
    "Подсчёт-2 (сочетания, «хотя бы один», casework)",
    "Площадь разрезанием и на клетках",
    "Степени и корни",
    "Пифагор + тройки",
    "Среднее и медиана (терминология)",
    "Проценты и отношения",
    "Чтение графиков и диаграмм",
    "Дроби (доли, последовательные)",
    "Пространство и 3D (развёртки, отражения)",
]
SLUG = ["podschet-1", "podschet-2", "ploshchad", "stepeni-korni", "pifagor",
        "srednee-mediana", "procenty", "grafiki", "drobi", "prostranstvo-3d"]
STANOK = ["С1 умнож.", "С1 умнож.", "С5-база", "С2 квадр.", "С5-про",
          "С4 средние", "С3 флип", "С6 отсеч.", "С3 дроби", "С5-база пов."]
BANDS = {1: ("№8–12", "№5–9"), 2: ("№13–17", "№9–13"), 3: ("№18–24", "№13–17")}
MODULE = {"A": "modul-a-fundament", "B": "modul-b-uglublenie", "C": "modul-c-ekzamen"}


def next_weekday(d, wd):
    return d + timedelta(days=(wd - d.weekday()) % 7)


def role(n):
    if n <= 10:  return ("A Фундамент", "A", 1, "новая тема")
    if n <= 12:  return ("A обзор",     "A", 1, "ОБЗОР (микс, на время)")
    if n <= 22:  return ("B Углубление", "B", 2, "повтор темы ↑")
    if n <= 24:  return ("B обзор",     "B", 2, "ОБЗОР (микс, на время)")
    if n <= 34:  return ("C Экзамен",   "C", 3, "повтор темы ↑↑ + реальные AMC")
    return ("C обзор", "C", 3, "ПРОБНИК (реальный AMC) + разбор")


def build(argv):
    a = [x for x in argv if x.strip()]
    start = date.fromisoformat(a[0]) if len(a) > 0 else next_weekday(date.today(), WD["Sun"])
    d1 = WD.get(a[1], WD["Sun"]) if len(a) > 1 else WD["Sun"]
    d2 = WD.get(a[2], WD["Wed"]) if len(a) > 2 else WD["Wed"]
    ramp = date.fromisoformat(a[3]) if len(a) > 3 else date(start.year, 9, 1)
    total = int(a[4]) if len(a) > 4 else 36

    start = next_weekday(start, d1)
    offset = (d2 - d1) % 7
    dates = []
    wk = 0
    while len(dates) < total and wk < total + 5:
        primary = start + timedelta(weeks=wk)
        secondary = primary + timedelta(days=offset)
        dates.append(primary)
        if secondary >= ramp:
            dates.append(secondary)
        wk += 1
    dates = sorted(dates)[:total]

    recs, topic_i = [], 0
    for n, d in enumerate(dates, 1):
        blk, letter, pas, typ = role(n)
        is_new = ("тема" in typ or "повтор" in typ)
        if is_new:
            ti = topic_i % len(TOPICS)
            topic, st, slug = TOPICS[ti], STANOK[ti], f"{SLUG[ti]}-p{pas}"
            topic_i += 1
        else:
            topic, st = "— (микс блока)", "С6+микс"
            slug = ("probnik" if "ПРОБНИК" in typ else "obzor") + f"-p{pas}"
        recs.append({
            "n": n, "date": d.isoformat(), "weekday": WD_RU[d.weekday()],
            "block": blk, "block_letter": letter, "module": MODULE[letter],
            "pass": pas, "main_band": BANDS[pas][0], "finale_band": BANDS[pas][1],
            "type": typ, "is_new": is_new, "stanok": st, "topic": topic,
            "lesson_slug": f"urok-{n:02d}-{slug}",
        })
    return recs, start, ramp, total, dates


def main():
    argv = sys.argv[1:]
    json_path = None
    for a in list(argv):
        if a.startswith("--json="):
            json_path = a.split("=", 1)[1]; argv.remove(a)
    recs, start, ramp, total, dates = build(argv)

    if json_path:
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump({"start": start.isoformat(), "ramp": ramp.isoformat(),
                       "total": total, "lessons": recs}, f, ensure_ascii=False, indent=2)
        print(f"план записан: {json_path} ({total} уроков, {dates[0]} → {dates[-1]})")
        return

    print(f"старт: {start.isoformat()} ({WD_RU[start.weekday()]}) · "
          f"1/нед до {ramp.isoformat()}, далее 2/нед · уроков: {total}\n")
    hdr = f"{'#':>3}  {'дата':10} {'дн':2}  {'блок':13} {'пр':2} {'осн/фин':14} {'тип':30} {'станок':12} тема-слот"
    print(hdr); print("-" * len(hdr))
    pm = None
    for r in recs:
        d = date.fromisoformat(r["date"])
        if pm and d.month != pm: print()
        pm = d.month
        print(f"{r['n']:>3}  {r['date']:10} {r['weekday']:2}  {r['block']:13} "
              f"p{r['pass']:1} {r['main_band']+'/'+r['finale_band']:14} {r['type']:30} "
              f"{r['stanok']:12} {r['topic']}")
    print(f"\nфиниш: {dates[-1].isoformat()} · всего {total} уроков · "
          f"~{(dates[-1]-dates[0]).days/30:.1f} мес")


if __name__ == "__main__":
    main()
