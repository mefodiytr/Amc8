# Дека к уроку «Дело №3» — проект

Экранная презентация для Zoom. Учитель шарит её и аннотирует поверх.
Урок: 2024 AMC 8, задачи №3, №6, №7. Приём: **вычеркни лишнее**.

---

## Два правила, на которых держится вся дека

### 1. Математика — вектором. Картинки — атмосфера.

**Никогда не генерируем:** сетки 3×7 / 3×5 / 2×5, вложенные квадраты, укладку плиток, шахматную доску. Всё это рисуется точными фигурами прямо в деке.

Причины две:
- Модель промахивается в клетках и цифрах, а здесь **геометрия и есть содержание** — одна лишняя клетка убивает задачу.
- Учитель будет **обводить строку аннотацией Zoom** прямо на слайде. Ему нужна чистая сетка, а не живописный фон.

Картинка несёт эмоцию и сюжет. Вектор несёт математику. Не смешивать.

### 2. Название приёма НЕ выносим в титул.

Урок построен на «задача раньше правила». Если на первом слайде написать «Вычеркни лишнее» — она прочитает и всё поймёт до того, как помучается. Приём получает имя **на слайде 12**, не раньше.

Титул вместо этого ставит загадку: *«Три задачи, которые кажутся разными».* Она будет искать связь весь урок — и это работает на нас.

### Zoom-специфика

- Кегль крупный: Zoom жмёт картинку, мелкое не читается.
- Высокий контраст, тёмный фон — меньше устают глаза за 45 минут.
- На слайдах с сеткой — **чистая зона вокруг** под аннотацию.
- Ничего важного в нижние 8% — в Zoom подрезается панелью.

---

## Карта деки — 20 слайдов

### 1 · ТИТУЛ 🖼 IMG-01
> **АКАДЕМИЯ ЧИСЕЛ · ДЕЛО №3**
> ## Три задачи, которые кажутся разными
> Плитки. Квадраты. Коньки.
> Найди, что у них общего.

*Учителю: 10 секунд. Не объяснять. Загадка должна повиснуть.*

---

### 2 · РАЗМИНКА: СТАНОК
> **Разность квадратов**
> `a² − b² = (a − b)(a + b)`
>
> | | | | |
> |---|---|---|---|
> | 21 × 19 | 32 × 28 | 51 × 49 | 13 × 7 |
> | 104 × 96 | 25² − 15² | 41² − 39² | 100² − 99² |
> | 12² − 8² | 15² − 5² | | |
>
> ⏱ Норматив: 60 секунд

*Учителю: показать все десять сразу, засечь ВЕСЬ набор. По одному диктовать нельзя — задержка Zoom убивает ритм.*

---

### 3 · РАЗМИНКА: ДВЕ ЗАДАЧИ
> **Алгебра.** Последняя цифра числа 3 × 13 × 23 × 33?
> (A) 1 (B) 3 (C) 5 (D) 7 (E) 9
>
> **Геометрия.** Углы треугольника относятся как 1 : 2 : 3. Наибольший?
> (A) 60° (B) 72° (C) 80° (D) 90° (E) 108°

*Учителю: не объяснять. Завалила — пометить и дальше.*

---

### 4 · ЗАВЯЗКА 🖼 IMG-02
> **2024 AMC 8 · задача 7**
> ## Замости прямоугольник
> Прямоугольник **3 × 7**. Плитки трёх видов: **2×2**, **1×4**, **1×1**.
> Без наложений. Единичек — **как можно меньше**.
>
> [ВЕКТОР: большая чистая сетка 3×7 + три плитки-образца сбоку]

*Учителю: сказать условие — и **выключить микрофон**. Три минуты она работает сама. Вариантов ответа пока НЕ показываем.*

---

### 5 · ПОВОРОТНЫЙ ВОПРОС 🖼 IMG-03
> ## Ты нашла укладку с пятью единичками.
> ### А откуда ты знаешь, что четырёх не хватит?
> ### Или трёх?

*Учителю: не хвалить. Пауза. Дать почувствовать, что ответа нет.*

---

### 6 · ШАГ 1: СЧИТАЕМ ПЛОЩАДЬ
> Всего клеток: **3 × 7 = 21**
>
> Плитка **2×2** → 4 клетки
> Плитка **1×4** → 4 клетки
> **Обе по четыре.**
>
> → Все большие плитки вместе закрывают число, **кратное 4**.

*Учителю: вести вопросами, не рассказывать. «Сколько закрывает 2×2? А 1×4?»*

---

### 7 · ФИЛЬТР ОСТАТКА 🖼 IMG-04
> **21 = 4 · 5 + 1**
>
> Убери всё, что кратно 4 → остаётся **1**.
>
> Значит единичек может быть только:
> ## 1 · 5 · 9 · 13 …

---

### 8 · ТРИ ВАРИАНТА УМЕРЛИ
> (A) 1 ✅  (B) 2 ❌  (C) 3 ❌  (D) 4 ❌  (E) 5 ✅
>
> ## Три из пяти убиты.
> ## А задачу мы ещё не решали.

*Учителю: вот это её удивит. Это и есть отсечение — и оно работает на любом AMC.*

---

### 9 · ШАГ 2: ОДНА СТРОКА
> [ВЕКТОР: сетка 3×7, одна строка подсвечена]
>
> В строке **7 клеток** — нечётно.
> **1×4** закрывает в строке 4 — чётно.  *(вертикально не влезет: нужно 4 строки, а их 3)*
> **2×2** закрывает в строке 2 — чётно.
>
> Убери чётное → останется **нечётное**.
> → В **каждой** строке нужна хотя бы одна единичка.
> → Строк три → единичек **минимум 3**.

*Учителю: обвести строку аннотацией. Одна линия объясняет больше, чем полминуты слов.*

---

### 10 · ОТВЕТ
> Единица не проходит. Остаётся **5**.
>
> [ВЕКТОР: точная укладка]
> `3 × (1×4) = 12` + `1 × (2×2) = 4` + `5 × (1×1) = 5` = **21** ✓
>
> ## Ответ: (E) 5

---

### 11 · ЛОВУШКА СОСТАВИТЕЛЕЙ
> **(B) 2 · (C) 3 · (D) 4** — для тех, кто просто повыкладывал плитку и посчитал.
> **(A) 1** — ⚠ она **прошла** фильтр остатка! Ловушка для того, кто остановился на первом шаге.
>
> ## Остаток отсекает невозможное.
> ## Но не обещает, что возможное — бывает.

---

### 12 · ПРИЁМ ДНЯ 🖼 IMG-05
> ## ВЫЧЕРКНИ ЛИШНЕЕ
> Не собирай ответ. Убери всё, что не влияет — и смотри, что осталось.
>
> [ВЕКТОР: три карточки]
> | вычеркни **КРАТНОЕ** | вычеркни **БЕЛОЕ** | вычеркни **ОБЩЕЕ** |
> |---|---|---|
> | останется остаток | останется серое | останется различие |
> | ✓ уже видела | сейчас | сейчас |

*Учителю: тут раскрывается название дела. «Помнишь, я обещал три задачи, которые кажутся разными? Одно лицо приёма ты уже видела. Проверим остальные два.»*

---

### 13 · КЛОН
> Тот же ход, другие числа.
>
> Прямоугольник **3 × 5**, те же три плитки. Минимум единичек?
>
> [ВЕКТОР: сетка 3×5]

*Учителю: 2 минуты, почти рефлекторно. Не решила — приём не сел: вариации отменяются, идём к финалу.*

---

### 14 · МАСКИРОВКА 🖼 IMG-07
> **2024 AMC 8 · задача 3**
>
> Квадраты со сторонами **4, 7, 9, 10** совмещены левыми и нижними краями.
> Большие нарисованы первыми, меньшие лежат **поверх**.
> **4 — белый · 7 — серый · 9 — белый · 10 — серый**
>
> Найди видимую **серую** площадь.
> (A) 42 (B) 45 (C) 49 (D) 50 (E) 52
>
> [ВЕКТОР: точная фигура из четырёх вложенных квадратов]

*Учителю: пусть наложит свои бумажные квадраты и покажет в камеру. Руками — лучше, чем глядя на картинку.*

---

### 15 · РЕШЕНИЕ: ВЫЧЕРКНИ БЕЛОЕ
> Не собирай серое по кусочкам — **убери белое**.
>
> Серый 10 закрыт белым 9 → `10² − 9² = (10−9)(10+9) = 1 × 19 = 19`
> Серый 7 закрыт белым 4 → `7² − 4² = (7−4)(7+4) = 3 × 11 = 33`
>
> ## 19 + 33 = 52 → (E)
>
> Ни одного возведения в квадрат. Это утренний станок.

---

### 16 · ГРАНИЦА 🖼 IMG-08
> **2024 AMC 8 · задача 6**
>
> Сергей катался по катку четырьмя маршрутами: **P, Q, R, S**.
> Расставь их от **самого короткого** к **самому длинному**.
>
> ⚠ **[ВСТАВИТЬ ОРИГИНАЛЬНУЮ КАРТИНКУ ИЗ БУКЛЕТА AMC 2024]**
> Без неё задача не читается. Генерить нельзя — маршруты должны быть точными.

*Учителю: тут ничего нельзя посчитать. В этом весь смысл.*

---

### 17 · РЕШЕНИЕ + ГРАНИЦА ПРИЁМА
> **R < P** — сверху и снизу у R прямые, у P дуги. Прямая короче дуги.
> **P < S** — у P куски вдоль борта, у S диагонали через каток. Диагональ длиннее.
> **S < Q** — у обоих **одни и те же дуги**. ✂ **Вычеркни их!** Осталась только середина: у Q две «галки», каждая длиннее галки у S.
>
> ## Ответ: R, P, S, Q → (D)
>
> ⚠ **Граница приёма:** он сказал, **какой** длиннее. И не может сказать, **на сколько**.

*Учителю: спросить её — «а чего этот приём НЕ умеет?»*

---

### 18 · ФИНАЛ 🖼 IMG-09
> ## Теперь сама.
>
> Прямоугольник **2 × 5**. Плитки **1×4** и **1×1**.
> Минимум единичек?
>
> (A) 1 (B) 2 (C) 3 (D) 4 (E) 5
>
> [ВЕКТОР: сетка 2×5]

*Учителю: 8 минут. Микрофон выключен. Не помогать. Подсказки только лесенкой.*

---

### 19 · КАРТОЧКА В ТЕТРАДЬ 🖼 IMG-10
> ## ПРИЁМ: «ВЫЧЕРКНИ ЛИШНЕЕ»
> Не собирай ответ — убери всё, что не влияет, и смотри, что осталось.
>
> • Вычеркни **кратное** → останется остаток. Он отсекает невозможное.
> • Вычеркни **белое** → останется серое. `a² − b² = (a−b)(a+b)`
> • Вычеркни **общее** → останется различие. Только его и сравнивай.
>
> ⚠ Остаток — условие **необходимое**, но не достаточное.
> Прошло фильтр ≠ бывает.

*Учителю: пишет РУКОЙ. Потом — «покажи в камеру». Не показала — считайте, что не написала.*

---

### 20 · КРЮЧОК 🖼 IMG-06
> Шахматная доска **8 × 8**. Вырезали **два противоположных угла**.
> Осталось **62** клетки.
>
> Костяшка домино закрывает **2** клетки. **62 : 2 = 31.**
> Площадь сходится идеально.
>
> ## Так замостить можно?
>
> Не решай сейчас. Подумай по дороге.
>
> [ВЕКТОР: точная доска 8×8 без двух углов]

*Учителю: НЕ отвечать, даже если попросит. В этом весь смысл.*

---

# ПРОМТЫ ДЛЯ GPT IMAGE — 10 штук

Используем уже сработавшие **STYLE LOCK v2** и **CHARACTER LOCK** из `amc8_promty_v2.md` — вставлять в каждый промт без изменений. Ниже — только сцены.

**Общие правила для всех десяти:**
- 16:9, максимальное разрешение. Скачивать кнопкой, **не скриншотить**.
- **Ни одного слова в кадре.** Никаких цифр в этих сценах — математику несёт вектор.
- В каждой сцене указана **safe-зона**: чистая область, куда ляжет текст слайда.

---

### IMG-01 · Обложка: три дела на одной доске
*Слайд 1. Загадка урока: три задачи, которые кажутся разными.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Deka stands before a large cork evidence board in the academy at night, studying it with narrowed eyes, hand on chin. Pinned to the board are THREE separate case files, each showing a completely different scene: one shows scattered puzzle tiles, one shows overlapping translucent square plates, one shows a frozen ice rink with looping trails. Thin red investigator threads run from all three files and converge on a single glowing golden question mark at the center of the board.

The idea: three cases that look unrelated — but one thread ties them together.

Composition: Deka on the RIGHT third. Keep the LEFT half calm and dark for the title.
No text, no letters, no digits anywhere.
16:9.
```

---

### IMG-02 · Мастерская: гора неудачных попыток
*Слайд 4. Завязка. Она должна узнать себя в этом кадре.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Deka sits at a cluttered workbench, surrounded by chaos: dozens of small brass tiles — square ones and long rectangular ones — scattered everywhere, crumpled discarded sketches piled on the floor, a knocked-over cup. She's mid-attempt, one tile held in the air, brow furrowed, clearly frustrated. An empty ornate frame hangs on the wall behind her, waiting to be filled. Warm amber lamplight, long shadows, the feeling of a long evening of trial and error.

The idea: brute force is exhausting — and it never proves anything.

Composition: Deka LEFT of center. Keep the RIGHT third calm and uncluttered for text.
No text, no letters, no digits.
16:9.
```

---

### IMG-03 · Поворотный вопрос
*Слайд 5. Момент, ради которого всё затевалось.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Close and dramatic. Deka is frozen mid-motion, one brass tile still pinched between her fingers, her hand stopped halfway. She looks upward, caught off guard. Above her, an enormous glowing golden question mark hangs in the air, its light falling across her face. Her expression: she has an answer — and has just realized she cannot prove it. Doubt, not defeat.

Composition: Deka on the RIGHT. Keep the LEFT half calm and dark for text.
No text, no letters, no digits (the question mark is a symbol, that's fine).
16:9.
```

---

### IMG-04 · Решето остатка
*Слайд 7. Метафора фильтра: он убивает варианты, не решая задачу.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

A great ornate golden sieve floats in mid-air, glowing. Five smooth luminous tokens fall toward it from above. THREE of them slip straight through the mesh and tumble away into darkness below, their light dying. TWO remain caught on top of the sieve, still glowing bright amber. Deka stands to one side, arms crossed, watching with a satisfied half-smile — she didn't solve anything yet, and she's already thrown most of it away.

IMPORTANT: the tokens are BLANK — smooth, featureless discs. No numbers on them.

Composition: sieve and tokens on the RIGHT. Keep the LEFT third calm for text.
No text, no letters, no digits anywhere.
16:9.
```

---

### IMG-05 · ПРИЁМ: ВЫЧЕРКНИ ЛИШНЕЕ ⭐ главный кадр
*Слайд 12. Герой-арт урока. Не жалей попыток — 4–6 генераций.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Hero shot. Deka sweeps a great golden quill through the air in one powerful diagonal stroke, like a sword cut. Where the stroke passes, a dense cluttered mass of shapes, tiles, arcs and fragments DISSOLVES into golden dust and blows away. Behind the stroke, in the cleared space, ONE single small object remains — a bright glowing gem, untouched, radiant, obviously the thing that mattered all along. Her cloak and braid trail the motion. Cinematic, powerful, elegant.

The idea: you don't collect the answer — you strike away everything that doesn't matter, and what's left IS the answer.

Composition: centered, with clean margins on all sides for overlay text.
No text, no letters, no digits.
16:9.
```

---

### IMG-06 · Крючок: шахматная башня
*Слайд 20. Незакрытый вопрос на следующий урок.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

A colossal chessboard stands vertically in a dark academy hall, glowing softly, its checkered squares alternating deep indigo and cream. Two squares at OPPOSITE CORNERS of the board are missing — empty black voids where they should be. Domino pieces float in the air around the board, waiting. Deka stands small at its base, one domino held in her hand, head tilted back, staring up with pure curiosity. Mysterious, inviting, unresolved.

Composition: board fills the RIGHT and center. Keep the LEFT third calm for text.
No text, no letters, no digits.
16:9.
```

---

### IMG-07 · Ателье квадратов
*Слайд 14. Маскировка приёма.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Deka stands at a glowing light-table, carefully stacking four translucent square glass plates of different sizes on top of one another, all aligned at one corner like a staircase of frames. The plates alternate in tone: warm smoky gray and pale cream. Light shines up through them, so only the exposed border strips of the gray plates glow — the covered parts fall dark. Her face is lit from below, absorbed, delighted by what she's just noticed.

The idea: you don't measure the gray — you see what the white leaves behind.

Composition: Deka LEFT of center. Keep the RIGHT third calm for text.
No text, no letters, no digits.
16:9.
```

---

### IMG-08 · Каток
*Слайд 16. Граница приёма.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Deka glides on ice skates across a grand frozen rink inside the academy — a great oval of ice under arched windows and hanging lanterns. Four separate ribbons of golden light trace four different looping paths across the ice behind her: some curve around the rounded ends, some cut straight across the middle. She's mid-glide, arms out, cloak flying, completely in her element — athletic, joyful, fast.

Composition: Deka on the RIGHT, ribbons sweeping across the ice. Keep the LEFT third calm for text.
No text, no letters, no digits.
16:9.
```

---

### IMG-09 · Финал: одна на арене
*Слайд 18. Она решает сама.*

```text
[STYLE LOCK v2] [CHARACTER LOCK]

Deka stands alone in a great dark hall, in a single shaft of golden spotlight. Sleeves rolled up, cloak thrown back over one shoulder, a brass tile in one hand. Before her stands a tall empty ornate frame — a challenge waiting. Nobody else is in the room: no teacher, no help, no crowd. Her expression is calm, focused, ready. The moment before she solves it herself.

Composition: Deka LEFT of center, the empty frame beside her. Keep the RIGHT third calm for text.
No text, no letters, no digits.
16:9.
```

---

### IMG-10 · Эмблема приёма
*Слайд 19. Карточка в тетрадь. Печатается, вклеивается, служит наградой.*

```text
[STYLE LOCK v2]

An ornate golden emblem badge, centered on a plain deep-indigo background. A bold diagonal golden brush-stroke slashes clean through a tangle of small cluttered shapes — the shapes on either side of the stroke are crumbling into dust, while at the very center of the stroke a single flawless teal gem remains, glowing. Filigree border, gilded shine, medal-like and collectible. Clean, symmetrical, iconic — must read clearly at small size.

No character in this image. No text, no letters, no digits.
1:1 square.
```

---

## Что дальше

Пришлёшь картинки (`img-01.png` … `img-10.png`, оригиналами, не скриншотами) — соберу `.pptx`: сетки и укладки нарисую точным вектором, картинки положу фоном с текстом в safe-зонах, заметки учителю уйдут в поле заметок.

Отдельно понадобится **скрин задачи №6 из официального буклета AMC 2024** — маршруты катка генерить нельзя, нужен оригинал.
