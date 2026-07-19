#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""QC-шлюз урока 2 «Снять порядок». Каждая задача решается С НУЛЯ перебором
(itertools), затем сверяется с заявленным ответом. Никаких формул «на веру» —
всё пересчитывается независимым счётом."""
from itertools import combinations, permutations, product

rows = []
def check(tag, got, want_val, options, want_letter):
    """got — независимо посчитанное значение; сверяем со значением при want_letter."""
    letters = "ABCDE"
    declared_val = options[letters.index(want_letter)]
    # ответ есть среди вариантов и единственный (значение встречается один раз)
    in_opts = got in options
    unique = options.count(got) == 1
    ok = (got == declared_val) and in_opts and unique
    rows.append((tag, "✅" if ok else "❌", got, want_letter, declared_val,
                 "" if ok else f"счёт={got}, заявлено {want_letter}={declared_val}, in_opts={in_opts}, unique={unique}"))
    return ok

# ── Р1: комплекты куртка+шапка (правило произведения) ──
r1 = len(set(product(range(2), range(3))))          # 2×3
check("Р1 куртка×шапка", r1, None, [2,3,5,6,9], "D")

# ── Р2: углы 2:3:5, наибольший ──
part = 180 // (2+3+5)
r2 = 5 * part
check("Р2 угол 2:3:5", r2, None, [60,72,80,90,108], "D")

# ── О: команда 3 из 6 (порядок НЕ важен) ──
O = len(list(combinations(range(6), 3)))
check("О  3 из 6", O, None, [15,20,40,60,120], "B")

# ── В1: дуэт 2 из 5 ──
V1 = len(list(combinations(range(5), 2)))
check("В1 2 из 5", V1, None, [8,9,10,15,20], "C")

# ── В2: рукопожатия среди 6 (неупорядоченные пары) ──
V2 = len(list(combinations(range(6), 2)))
check("В2 рукопожатия 6", V2, None, [12,15,30,36,21], "B")

# ── В3: 3 из (4 обычных + 2 золотых), хотя бы 1 золотой ──
badges = ['o','o','o','o','G','G']
idx = list(range(6)); gold = {4,5}
picks = list(combinations(idx, 3))
V3 = sum(1 for c in picks if any(i in gold for i in c))   # >=1 золотой
# независимая перепроверка через дополнение и casework
compl = len(picks) - sum(1 for c in picks if not any(i in gold for i in c))
casew = (sum(1 for c in picks if sum(i in gold for i in c) == 1)
         + sum(1 for c in picks if sum(i in gold for i in c) == 2))
assert V3 == compl == casew, (V3, compl, casew)
check("В3 >=1 золотой", V3, None, [4,12,16,18,20], "C")

# ── Ф: пара 2 из 4 (без ролей) ──
F = len(list(combinations(range(4), 2)))
check("Ф  2 из 4", F, None, [4,6,8,12,16], "B")

# ── Довесок: пара 2 из 4 С ролями (порядок важен) ──
dov = len(list(permutations(range(4), 2)))
rows.append(("Довесок 2 из 4 роли", "✅" if dov == 12 else "❌", dov, "—", 12, "" if dov==12 else "!=12"))

# ── Запасная: 2 из 3 ──
zap = len(list(combinations(range(3), 2)))
rows.append(("Запасная 2 из 3", "✅" if zap == 3 else "❌", zap, "—", 3, "" if zap==3 else "!=3"))

# ── Домашка ──
D1 = len(list(combinations(range(7), 2)))            # рукопожатия 7 -> 21
check("Д1 рукопожатия 7", D1, None, [14,21,28,42,49], "B")
D2 = len(list(combinations(range(5), 2)))            # 2 из 5 -> 10
check("Д2 2 из 5 медалей", D2, None, [7,10,15,20,25], "B")
# Д3: 2 из (4+2), хотя бы 1 золотой
p2 = list(combinations(range(6), 2))
D3 = sum(1 for c in p2 if any(i in gold for i in c))  # 15-6=9
check("Д3 >=1 золотой (2 из 6)", D3, None, [6,8,9,11,15], "C")

# ── Отчёт ──
print(f"{'задача':<24}{'вердикт':<8}{'счёт':<6}{'letter':<7}{'знач':<6}примечание")
print("-"*78)
allok = True
for tag, verdict, got, letter, val, note in rows:
    allok = allok and verdict == "✅"
    print(f"{tag:<24}{verdict:<8}{str(got):<6}{letter:<7}{str(val):<6}{note}")
print("-"*78)
print(("ВСЕ ✅ — шлюз ОТКРЫТ" if allok else "ЕСТЬ ❌ — шлюз ЗАКРЫТ"),
      f"({sum(1 for r in rows if r[1]=='✅')}/{len(rows)})")
