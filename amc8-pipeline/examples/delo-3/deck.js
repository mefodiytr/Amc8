// deck.js — КОМПАКТНЫЙ рабочий пример на deckkit (демонстрация паттернов).
// Запускается БЕЗ картинок: где была бы K.art — используем K.bg, чтобы node deck.js
// работал в любом окружении. Полная дека с картинками: deck.full.js.
// Запуск:  node deck.js   (из этой папки; в корне конвейера: npm i pptxgenjs)

const path = require("path");
const K = require(path.join(__dirname, "..", "..", "lib", "deckkit"));
const T = K.T;
const OUT = path.join(__dirname, "deck.demo.pptx");

const pres = K.newDeck("Дело №3 — Академия Чисел (демо)");

// 1 · ТИТУЛ — загадка, без имени приёма
{
  const s = pres.addSlide(); K.bg(s);
  K.panel(pres, s, 0.55, 4.55, 8.3, 2.45, 8);
  s.addText("АКАДЕМИЯ ЧИСЕЛ · ДЕЛО №3", { x: 0.95, y: 4.75, w: 7.6, h: 0.35,
    fontFace: T.B, fontSize: 13, bold: true, color: T.AMBER, charSpacing: 2.5, margin: 0 });
  s.addText("Три задачи, которые кажутся разными", { x: 0.95, y: 5.15, w: 7.7, h: 0.85,
    fontFace: T.H, fontSize: 34, bold: true, color: T.CREAM, margin: 0, valign: "middle" });
  s.addText("Плитки.  Квадраты.  Коньки.\nНайди, что у них общего.", { x: 0.95, y: 6.05, w: 7.6, h: 0.8,
    fontFace: T.B, fontSize: 17, color: T.MUTED, margin: 0 });
  s.addNotes("10 секунд. Имя приёма НЕ произносить (раскроется на слайде 4 демо).\n⛔ На уроке шарить ОКНО, не экран — в заметках ответы.");
}

// 2 · ВЕКТОР: сетка 3×7 с подсвеченной строкой + плитки
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 2);
  K.title(pres, s, "Замости прямоугольник", "3 × 7 · плитки 2×2, 1×4, 1×1");
  const gx = 1.0, gy = 2.4, cell = 0.66;
  K.grid(pres, s, { x: gx, y: gy, cols: 7, rows: 3, cell, hiRow: 1 });
  // одна из укладок: три 1×4, одна 2×2, пять 1×1
  for (let r = 0; r < 3; r++) K.tile(pres, s, { gx, gy, c: 0, r, w: 4, h: 1, cell, color: T.AMBER, label: "1×4" });
  K.tile(pres, s, { gx, gy, c: 4, r: 0, w: 2, h: 2, cell, color: T.TEAL, label: "2×2" });
  [[6, 0], [6, 1], [4, 2], [5, 2], [6, 2]].forEach(([c, r]) =>
    K.tile(pres, s, { gx, gy, c, r, w: 1, h: 1, cell, color: T.RED }));
  s.addText("3·(1×4) + 1·(2×2) + 5·(1×1) = 21 ✓   →   минимум единичек: 5", {
    x: 1.0, y: 4.7, w: 11.5, h: 0.6, fontFace: T.H, fontSize: 20, bold: true,
    color: T.AMBER, valign: "middle", margin: 0 });
  s.addNotes("Обвести строку аннотацией Zoom: 7 клеток нечётно → в каждой строке нужна единичка.");
}

// 3 · ВЕКТОР: вложенные квадраты (маскировка)
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 3);
  K.title(pres, s, "Вычеркни белое", "серые 10 и 7, белые 9 и 4");
  K.nestedSquares(pres, s, { bx: 1.2, by: 6.2, u: 0.42, squares: [
    { n: 10, color: T.GRAYFIG }, { n: 9, color: T.CREAM },
    { n: 7, color: T.GRAYFIG }, { n: 4, color: T.CREAM },
  ]});
  s.addText("(10²−9²) + (7²−4²)\n= 1·19 + 3·11\n= 19 + 33 = 52", {
    x: 7.2, y: 2.6, w: 5.0, h: 2.2, fontFace: T.H, fontSize: 24, bold: true,
    color: T.CREAM, valign: "middle", margin: 0 });
  s.addNotes("Пусть наложит СВОИ бумажные квадраты и покажет в камеру.");
}

// 4 · КРЮЧОК: шахматная доска без двух противоположных углов
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 4);
  K.title(pres, s, "Следующее дело", "62 клетки, домино по 2 — так замостить можно?");
  K.chessboard(pres, s, { x: 1.0, y: 2.1, n: 8, u: 0.42, holes: [[0, 0], [7, 7]] });
  s.addText("62 : 2 = 31\nплощадь сходится идеально…\n\nНе решай сейчас.\nПодумай по дороге.", {
    x: 5.5, y: 2.4, w: 6.0, h: 3.0, fontFace: T.B, fontSize: 18, color: T.CREAM, margin: 0 });
  s.addNotes("НЕ отвечать, даже если попросит. (Для себя: нельзя — вырезаны две клетки одного цвета.)");
}

K.save(pres, OUT).then(() => console.log("собрано:", OUT));
