// deck.js — Урок 1 «Дерево выборов» (Академия Чисел, Дело №1).
// Вся математика — вектором (дерево/ветки рисуются фигурами). Картинки — атмосфера (img/img-0N.png).
// Запуск из папки урока:  node deck.js   (в корне: npm i pptxgenjs)
const path = require("path");
const K = require(path.join(__dirname, "..", "..", "lib", "deckkit"));
const T = K.T;
const IMG = path.join(__dirname, "img");
const OUT = path.join(__dirname, "deck.pptx");
const pres = K.newDeck("Дело №1 — Академия Чисел");

// ── векторные помощники для ДЕРЕВА (точная математика) ──
function node(s, cx, cy, txt, fill) {
  const w = 0.54, h = 0.36;
  s.addShape(pres.ShapeType.roundRect, { x: cx - w/2, y: cy - h/2, w, h,
    fill: { color: fill || T.CARD }, line: { color: T.AMBER, width: 1.2 }, rectRadius: 0.06 });
  s.addText(String(txt), { x: cx - w/2, y: cy - h/2, w, h, fontFace: T.B, fontSize: 11,
    bold: true, color: T.CREAM, align: "center", valign: "middle", margin: 0 });
}
function edge(s, x1, y1, x2, y2, label) {
  s.addShape(pres.ShapeType.line, { x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: T.MUTED, width: 1.25 }, flipH: (x2 < x1) });
  if (label) s.addText(label, { x: (x1 + x2)/2 - 0.3, y: (y1 + y2)/2 - 0.16, w: 0.6, h: 0.24,
    fontFace: T.B, fontSize: 9, bold: true, color: T.TEAL, align: "center", valign: "middle", margin: 0 });
}
// полное бинарное дерево глубины 3 (два выбора: +add / ×mul). Возвращает значения листьев.
function binTree(s, o) {
  const { cx, top, dy, span, start, add, mul, dups = [] } = o;
  let level = [{ x: cx, y: top, val: start }];
  const levels = [level];
  for (let L = 1; L <= 3; L++) {
    const y = top + L * dy, cnt = 2 ** L, next = [];
    for (let i = 0; i < cnt; i++) {
      const parent = level[Math.floor(i / 2)];
      const plus = (i % 2 === 0);
      const val = plus ? parent.val + add : parent.val * mul;
      const x = cx - span/2 + (span / (cnt - 1)) * i;
      edge(s, parent.x, parent.y + 0.18, x, y - 0.18, L === 1 ? (plus ? "+" + add : "×" + mul) : null);
      next.push({ x, y, val });
    }
    levels.push(next); level = next;
  }
  levels.forEach((lv, Li) => lv.forEach(nd => {
    const isLeaf = Li === 3, dup = isLeaf && dups.includes(nd.val);
    node(s, nd.x, nd.y, nd.val, dup ? T.RED : (isLeaf ? "24406E" : T.CARD));
  }));
  return level.map(n => n.val);
}
// строка веток: [n] × [n] × … = result
function branchStrip(s, x, y, counts, joiner, result) {
  const bw = 0.72, gap = 0.5;
  counts.forEach((n, i) => {
    const bx = x + i * (bw + gap);
    s.addShape(pres.ShapeType.roundRect, { x: bx, y, w: bw, h: bw,
      fill: { color: T.CARD }, line: { color: T.AMBER, width: 1.5 }, rectRadius: 0.06 });
    s.addText(String(n), { x: bx, y, w: bw, h: bw, fontFace: T.H, fontSize: 24, bold: true,
      color: T.CREAM, align: "center", valign: "middle", margin: 0 });
    if (i < counts.length - 1) s.addText(joiner, { x: bx + bw, y, w: gap, h: bw,
      fontFace: T.H, fontSize: 22, bold: true, color: T.AMBER, align: "center", valign: "middle", margin: 0 });
  });
  const ex = x + counts.length * (bw + gap);
  s.addText("= " + result, { x: ex, y, w: 2.0, h: bw, fontFace: T.H, fontSize: 26, bold: true,
    color: T.AMBER, align: "left", valign: "middle", margin: 0 });
}

// 1 · ТИТУЛ (загадка, картинка) — имя приёма НЕ писать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-01.png"));
  K.panel(pres, s, 0.55, 4.5, 7.4, 2.5, 8);
  s.addText("АКАДЕМИЯ ЧИСЕЛ · ДЕЛО №1", { x: 0.95, y: 4.72, w: 6.8, h: 0.35,
    fontFace: T.B, fontSize: 13, bold: true, color: T.AMBER, charSpacing: 2.5, margin: 0 });
  s.addText("Восемь путей — сколько итогов?", { x: 0.95, y: 5.1, w: 6.9, h: 0.9,
    fontFace: T.H, fontSize: 32, bold: true, color: T.CREAM, margin: 0, valign: "middle" });
  s.addText("Судья трижды меняет счёт. Куда он может прийти?", { x: 0.95, y: 6.05, w: 6.8, h: 0.8,
    fontFace: T.B, fontSize: 16, color: T.MUTED, margin: 0 });
  s.addNotes("10 секунд. Имя приёма НЕ произносить — загадка должна повиснуть.\n⛔ На уроке шарить ОКНО, не экран — в заметках ответы.");
}

// 2 · РАЗМИНКА: станок С1
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 2);
  K.title(pres, s, "Станок · умножение налегке", "⏱ 10 примеров за 60 секунд — личный рекорд");
  s.addText("×11:  34·11   52·11   78·11\n×5:   86·5    124·5\n×25:  36·25   44·25\nразбиение:  7·34   6·48   9·23",
    { x: 1.0, y: 2.4, w: 11.0, h: 3.0, fontFace: T.H, fontSize: 26, bold: true, color: T.CREAM, lineSpacingMultiple: 1.3, margin: 0 });
  s.addNotes("Показать все сразу, засечь ВЕСЬ набор (задержка Zoom не даёт диктовать по одному). Время — в доску рекордов.\nОтветы: 374, 572, 858, 430, 620, 900, 1100, 238, 288, 207.");
}

// 3 · РАЗМИНКА: две задачи
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 3);
  K.title(pres, s, "Разминка · две задачи");
  s.addText("Делимость.  Какое число делится на 3?\n(A) 121   (B) 122   (C) 123   (D) 124   (E) 125\n\nУглы.  Углы треугольника как 1 : 2 : 3. Наибольший?\n(A) 60°   (B) 72°   (C) 80°   (D) 90°   (E) 108°",
    { x: 1.0, y: 2.3, w: 11.2, h: 3.4, fontFace: T.B, fontSize: 20, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Не объяснять, завалила — пометить и дальше. Ответы: (C) 123 (сумма цифр 6); (D) 90° (часть 30°).");
}

// 4 · ЗАВЯЗКА (картинка) — вариантов НЕ показывать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-02.png"));
  K.panel(pres, s, 6.7, 0.5, 6.1, 6.5, 6);
  s.addText("Подход за подходом", { x: 7.05, y: 1.05, w: 5.5, h: 0.7,
    fontFace: T.H, fontSize: 30, bold: true, color: T.AMBER, margin: 0, valign: "middle" });
  s.addText("У гимнастки 1 балл. В каждом из 3 подходов судья:\nлибо +3, либо ×2 (удвоить).\n\nСколько РАЗНЫХ итоговых баллов может получиться?",
    { x: 7.05, y: 1.9, w: 5.4, h: 3.6, fontFace: T.B, fontSize: 19, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Дать карточки «+3»/«×2», пусть выбирает цепочки в камеру, и МОЛЧАТЬ. Скорее всего решит, что итогов 8. Пауза.\nПо мотивам 2024 AMC 8 №8. Варианты ответа пока НЕ показывать.");
}

// 5 · ВЕКТОР — наивный путь (боль)
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 5);
  K.title(pres, s, "Считаем цепочки…");
  s.addText("+3, +3, +3  →  10\n+3, +3, ×2  →  14\n×2, +3, +3  →  8\n×2, ×2, ×2  →  8      …и так восемь цепочек",
    { x: 1.0, y: 2.4, w: 11.0, h: 2.6, fontFace: T.H, fontSize: 24, bold: true, color: T.CREAM, lineSpacingMultiple: 1.25, margin: 0 });
  s.addText("Но 8 уже выпало дважды. Совпадение?", { x: 1.0, y: 5.2, w: 11.0, h: 0.6,
    fontFace: T.B, fontSize: 20, italic: true, color: T.AMBER, margin: 0 });
  s.addNotes("Показать: цепочек 8, но среди результатов есть повторы. Отсюда — поворотный вопрос.");
}

// 6 · ПОВОРОТНЫЙ ВОПРОС
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 6);
  K.panel(pres, s, 1.2, 2.3, 10.9, 2.9, 10);
  s.addText("«Восемь путей — но вопрос про разные баллы.\nВдруг какие-то пришли в одно и то же число?»",
    { x: 1.6, y: 2.5, w: 10.1, h: 2.5, fontFace: T.H, fontSize: 28, bold: true, color: T.CREAM, valign: "middle", lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Держать вопрос. Разница «путь ≠ результат» — сердце урока. Не отвечать сразу.");
}

// 7 · ВЕКТОР — ПОЛНОЕ ДЕРЕВО (главный векторный слайд)
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 7);
  K.title(pres, s, "Нарисуем дерево", "старт 1 · каждый подход: +3 или ×2");
  const leaves = binTree(s, { cx: 6.66, top: 2.15, dy: 1.35, span: 11.4, start: 1, add: 3, mul: 2, dups: [10, 8] });
  s.addText("8 листьев — но две «10» и две «8» повторяются (красные)", { x: 1.0, y: 6.75, w: 11.3, h: 0.5,
    fontFace: T.B, fontSize: 16, italic: true, color: T.MUTED, align: "center", margin: 0 });
  s.addNotes("Рисуем вместе. Аннотацией Zoom обвести красные листья — это дубли. Листья: " + leaves.join(", ") + ".");
}

// 8 · ИМЯ ПРИЁМА (картинка) — раскрываем название
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-03.png"));
  K.panel(pres, s, 0.5, 4.3, 8.0, 2.7, 6);              // героиня справа → текст вниз-влево
  s.addText("Приём: ДЕРЕВО ВЫБОРОВ", { x: 0.85, y: 4.5, w: 7.4, h: 0.7,
    fontFace: T.H, fontSize: 27, bold: true, color: T.AMBER, valign: "middle", margin: 0 });
  s.addText("Путей = перемножить ветки:  2 × 2 × 2 = 8.\nНо путь ≠ результат — склей одинаковые листья  →  6 разных баллов.",
    { x: 0.85, y: 5.35, w: 7.4, h: 1.5, fontFace: T.B, fontSize: 19, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Здесь даём ИМЯ приёма (не раньше). Ответ основной: (C) 6.");
}

// 9 · ВЕКТОР — склейка дублей
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 9);
  K.title(pres, s, "Склей одинаковые");
  s.addText("{ 10, 14, 11, 16, 8, 10, 7, 8 }", { x: 1.0, y: 2.6, w: 11.3, h: 0.9,
    fontFace: T.H, fontSize: 28, bold: true, color: T.CREAM, align: "center", margin: 0 });
  s.addText("↓  две «10» → одна,  две «8» → одна", { x: 1.0, y: 3.7, w: 11.3, h: 0.7,
    fontFace: T.B, fontSize: 20, italic: true, color: T.MUTED, align: "center", margin: 0 });
  s.addText("{ 7, 8, 10, 11, 14, 16 }   →   6", { x: 1.0, y: 4.6, w: 11.3, h: 0.9,
    fontFace: T.H, fontSize: 30, bold: true, color: T.AMBER, align: "center", margin: 0 });
  s.addNotes("Подсветить, какие пути слиплись. «Путь и результат — разные вещи».");
}

// 10 · ДИСТРАКТОРЫ
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 10);
  K.title(pres, s, "Откуда неверные ответы");
  s.addText("8  =  2³ — посчитала пути, не склеила дубли  (самая частая)\n7  =  склеила одну пару из двух\n5  =  склеила лишнего\n6  =  верно",
    { x: 1.0, y: 2.5, w: 11.2, h: 3.0, fontFace: T.B, fontSize: 22, color: T.CREAM, lineSpacingMultiple: 1.35, margin: 0 });
  s.addNotes("Разобрать каждый. Особо 8 — самая частая ловушка: путь ≠ результат.");
}

// 11 · ВЕКТОР — КЛОН
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 11);
  K.title(pres, s, "Клон · другое дерево", "старт 3 · каждый подход: +2 или ×2");
  const leaves = binTree(s, { cx: 6.66, top: 2.15, dy: 1.35, span: 11.4, start: 3, add: 2, mul: 2, dups: [14] });
  s.addText("здесь склеилась одна пара (две «14») → 7 разных", { x: 1.0, y: 6.75, w: 11.3, h: 0.5,
    fontFace: T.B, fontSize: 16, italic: true, color: T.MUTED, align: "center", margin: 0 });
  s.addNotes("Её деревом. Контраст: сколько склеится — заранее не угадать. Листья: " + leaves.join(", ") + ". Ответ 7.");
}

// 12 · МАСКИРОВКА (картинка) — факториал
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-04.png"));
  K.panel(pres, s, 0.5, 4.4, 12.3, 2.6, 6);
  s.addText("Четыре гимнастки в ряд — ветки убывают", { x: 0.9, y: 4.6, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 24, bold: true, color: T.AMBER, margin: 0 });
  branchStrip(s, 0.9, 5.35, [4, 3, 2, 1], "×", "24 = 4!");
  s.addNotes("Здесь всплывает «факториал» — все листья разные, число путей = числу результатов. Ответ 24.");
}

// 13 · ГРАНИЦА (картинка) — где приём считает лишнее
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-05.png"));
  K.panel(pres, s, 0.5, 4.5, 8.2, 2.5, 5);             // тройки справа не закрывать → текст вниз-влево
  s.addText("Граница: 3 в команду (мест нет)", { x: 0.85, y: 4.65, w: 7.6, h: 0.6,
    fontFace: T.H, fontSize: 23, bold: true, color: T.AMBER, margin: 0 });
  s.addText("Дерево-по-местам 5 · 4 · 3 = 60, но одну тройку оно проходит 3! = 6 раз  →  60 : 6 = 10.\nПорядок не важен → дерево считает лишнее.",
    { x: 0.85, y: 5.35, w: 7.6, h: 1.5, fontFace: T.B, fontSize: 18, color: T.CREAM, lineSpacingMultiple: 1.15, margin: 0 });
  s.addNotes("Не решать полностью — показать «перебор». Мостик к Подсчёту-2. Ответ 10.");
}

// 14 · КОНЦОВКА — маркер времени
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 14);
  K.panel(pres, s, 1.2, 2.6, 10.9, 2.3, 10);
  s.addText("⏱ 34-я минута — переходим к финалу", { x: 1.6, y: 2.8, w: 10.1, h: 0.9,
    fontFace: T.H, fontSize: 30, bold: true, color: T.AMBER, valign: "middle", margin: 0 });
  s.addText("Финал неприкосновенен. Кончается время — режь вариации, не финал.", { x: 1.6, y: 3.8, w: 10.1, h: 0.9,
    fontFace: T.B, fontSize: 20, color: T.CREAM, valign: "middle", margin: 0 });
  s.addNotes("Держать время. Что бы ни происходило — на финал переходим здесь.");
}

// 15 · ФИНАЛ (картинка) — решает сама
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-06.png"));
  K.panel(pres, s, 0.5, 4.35, 12.3, 2.65, 6);
  s.addText("Форма: 3 футболки, 4 пары шорт. Сколько комплектов?", { x: 0.9, y: 4.55, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 23, bold: true, color: T.AMBER, margin: 0 });
  branchStrip(s, 0.9, 5.25, [3, 4], "×", "12");
  s.addText("(A) 7   (B) 12   (C) 9   (D) 34   (E) 43", { x: 7.3, y: 5.35, w: 5.4, h: 0.7,
    fontFace: T.B, fontSize: 18, color: T.CREAM, valign: "middle", margin: 0 });
  s.addNotes("Решает вслух, сама. Подсказки лесенкой (см. 04). Ответ (B) 12.\nДовесок ×2 кроссовки → 24. Запасная 2×3=6 («дал слишком трудную, моя ошибка»).");
}

// 16 · ПЕЧАТЬ (эмблема) — карточка в тетрадь
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-07.png"));
  K.panel(pres, s, 6.5, 0.6, 6.3, 6.3, 6);
  s.addText("Карточка в тетрадь", { x: 6.85, y: 1.0, w: 5.7, h: 0.6,
    fontFace: T.B, fontSize: 15, bold: true, color: T.AMBER, charSpacing: 2, margin: 0 });
  s.addText("ДЕРЕВО ВЫБОРОВ", { x: 6.85, y: 1.55, w: 5.7, h: 0.7,
    fontFace: T.H, fontSize: 26, bold: true, color: T.CREAM, margin: 0 });
  s.addText("Рисуй дерево → путей = перемножить ветки.\n\n⚠ Путь ≠ результат: склей одинаковые листья.\n\nВетки убывают → все листья разные → факториал n!\nПорядок не важен → дели на перестановки.",
    { x: 6.85, y: 2.4, w: 5.6, h: 4.2, fontFace: T.B, fontSize: 18, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Писать РУКОЙ. Хвалить метод: «сразу увидела дубли», а не «молодец, верно».");
}

// 17 · КРЮЧОК (картинка) — не отвечать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-08.png"));
  K.panel(pres, s, 0.5, 4.4, 12.3, 2.6, 6);
  s.addText("Следующее дело", { x: 0.9, y: 4.6, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 24, bold: true, color: T.AMBER, margin: 0 });
  s.addText("Стёрли надписи мест на пьедестале — просто «трое лучших».\nДерево всё ещё даёт 60? Или каждую тройку посчитали по нескольку раз?",
    { x: 0.9, y: 5.3, w: 11.5, h: 1.5, fontFace: T.B, fontSize: 19, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("НЕ отвечать, даже если попросит. «Узнаешь в следующий раз.» (Для себя: каждую тройку 6 раз — тема Подсчёт-2.)");
}

K.save(pres, OUT).then(() => console.log("собрано:", OUT));
