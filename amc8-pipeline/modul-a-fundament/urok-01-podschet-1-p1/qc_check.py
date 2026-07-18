#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""QC-шлюз урока 1 (2024-заякоренный). Каждая задача решается с нуля перебором и
сверяется с заявленным ответом. Дерево выборов — полный перебор всех цепочек операций."""
from itertools import permutations, combinations, product

report = []
def check(tag, got, claimed):
    report.append((tag, "✅" if got == claimed else "❌", got, claimed))

def tree_distinct(start, add, mul, rounds):
    """Полный перебор всех цепочек (+add / *mul) длины rounds; число РАЗНЫХ итогов."""
    outs = set()
    for chain in product([('+', add), ('*', mul)], repeat=rounds):
        v = start
        for op, k in chain:
            v = v + k if op == '+' else v * k
        outs.add(v)
    return sorted(outs)

# Р1 — делимость на 3 (перебор)
check("Р1 делимость", [n for n in (121,122,123,124,125) if n % 3 == 0], [123])
# Р2 — углы 1:2:3
check("Р2 угол", int(3 * 180 / (1+2+3)), 90)

# О — дерево старт 1, +3/×2, 3 подхода → число разных итогов
o = tree_distinct(1, 3, 2, 3)
check("О дерево(1;+3/×2;3) число разных", len(o), 6)
check("О дерево значения листьев-множества", o, [7,8,10,11,14,16])
check("О путей всего = 2^3", 2**3, 8)  # чтобы дистрактор 8 был обоснован

# В1 — клон старт 3, +2/×2, 3
v1 = tree_distinct(3, 2, 2, 3)
check("В1 дерево(3;+2/×2;3) число разных", len(v1), 7)
check("В1 множество листьев", v1, [9,10,12,14,16,20,24])

# В2 — 4 в ряд (перебор перестановок)
check("В2 маскировка 4!", len(list(permutations(range(4)))), 24)
# В3 — выбрать 3 из 5, порядок не важен (перебор сочетаний)
check("В3 граница C(5,3)", len(list(combinations(range(5), 3))), 10)
# сверим, что дерево-по-местам даёт 60 и 60/3!=10
check("В3 упорядоченных P(5,3)=60", len(list(permutations(range(5), 3))), 60)

# Ф — 3×4 (перебор пар); Довесок; Запасная
check("Ф финал 3×4", len(list(product(range(3), range(4)))), 12)
check("Довесок 3×4×2", len(list(product(range(3), range(4), range(2)))), 24)
check("Запасная 2×3", len(list(product(range(2), range(3)))), 6)

# Домашка Д1 4!, Д2 пароль 9·10·10, Д3 медали 6/3
check("Д1 4!", len(list(permutations(range(4)))), 24)
check("Д2 пароль первая≠0", sum(1 for a in range(10) for b in range(10) for c in range(10) if a != 0), 900)
check("Д3 медали P(6,3)", len(list(permutations(range(6), 3))), 120)

# единственность ответа основной: 6 не совпадает с дистракторами {4,5,7,8}
check("О ответ 6 отличен от дистракторов", 6 not in {4,5,7,8}, True)

print(f"{'задача':40} {'':3} {'счёт':>16}  заявлено")
print("-"*78)
allok = True
for tag, mark, got, claimed in report:
    allok &= (mark == "✅")
    print(f"{tag:40} {mark}  {str(got):>16}  {claimed}")
print("-"*78)
print("ИТОГ:", "ВСЁ ✅ — шлюз зелёный" if allok else "❌ РАСХОЖДЕНИЯ — править")
import sys; sys.exit(0 if allok else 1)
