// deckkit.js — переиспользуемая библиотека для сборки презентаций «Академия Чисел».
// Требует: npm i pptxgenjs
// Идея: текст и картинки кладём как обычно, а ВСЮ математику (сетки, плитки,
// доски, вложенные квадраты) рисуем этими помощниками — точным вектором.
//
// Использование в deck.js урока:
//   const K = require("../../lib/deckkit");   // путь до lib из папки урока
//   const pres = K.newDeck("Дело №N — Академия Чисел");
//   const s = pres.addSlide(); K.bg(s); K.title(pres, s, "Заголовок", "подзаголовок");
//   K.grid(pres, s, {x:1, y:2, cols:7, rows:3, cell:0.62, hiRow:1});
//   ...
//   await K.save(pres, "deck.pptx");

const PptxGenJS = require("pptxgenjs");

// ── Палитра (проверена на реальных деках) ──
const T = {
  CREAM: "F5EFE3", AMBER: "F0B84A", TEAL: "5BC4BC", RED: "E8615E",
  MUTED: "A8B4D4", PANEL: "080E22", DARK: "121A33",
  CARD: "1C2747", GRAYFIG: "9AA3BC",
  H: "Cambria", B: "Calibri",
};

function newDeck(title) {
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = title || "Академия Чисел";
  return pres;
}

// Полноэкранная картинка-фон (эмоция/сюжет; НЕ математика)
function art(s, path) {
  s.addImage({ path, x: 0, y: 0, w: 13.333, h: 7.5 });
}

// Картинка, если файл существует; иначе тёмный фон-плейсхолдер.
// Позволяет собирать деку ДО генерации картинок (харнесс проверяет структуру рано).
function artOrBg(s, path, bgColor) {
  try {
    if (require("fs").existsSync(path)) { art(s, path); return true; }
  } catch (e) { /* fs недоступен — упадём в фон */ }
  s.background = { color: bgColor || "121A33" };
  return false;
}

// Тёмный фон-заливка для слайдов без картинки
function bg(s, color) {
  s.background = { color: color || T.DARK };
}

// Полупрозрачная панель под текст поверх картинки
function panel(pres, s, x, y, w, h, transparency) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: T.PANEL, transparency: transparency == null ? 14 : transparency },
    rectRadius: 0.1,
  });
}

// Янтарный бейдж с номером слайда (правый верхний угол)
function badge(pres, s, n) {
  s.addShape(pres.ShapeType.ellipse, { x: 12.6, y: 0.28, w: 0.44, h: 0.44, fill: { color: T.AMBER } });
  s.addText(String(n), {
    x: 12.6, y: 0.28, w: 0.44, h: 0.44, fontFace: T.B, fontSize: 12,
    bold: true, color: T.PANEL, align: "center", valign: "middle", margin: 0,
  });
}

// Заголовок + необязательный подзаголовок
function title(pres, s, text, sub) {
  s.addText(text, {
    x: 0.8, y: 0.45, w: 11.4, h: 0.8, fontFace: T.H, fontSize: 36,
    bold: true, color: T.CREAM, margin: 0, valign: "middle",
  });
  if (sub) s.addText(sub, {
    x: 0.8, y: 1.25, w: 11.4, h: 0.4, fontFace: T.B, fontSize: 15,
    color: T.MUTED, italic: true, margin: 0,
  });
}

// Точная клетчатая сетка cols×rows. hiRow — индекс подсвеченной строки (или -1).
function grid(pres, s, o) {
  const { x, y, cols, rows, cell, hiRow = -1, fill = "1C2747", line = T.MUTED } = o;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    s.addShape(pres.ShapeType.rect, {
      x: x + c * cell, y: y + r * cell, w: cell, h: cell,
      fill: { color: r === hiRow ? "3A2E12" : fill },
      line: { color: r === hiRow ? T.AMBER : line, width: r === hiRow ? 2 : 1 },
    });
  }
}

// Плитка поверх сетки: ячейка (c,r), размер w×h в клетках.
function tile(pres, s, o) {
  const { gx, gy, c, r, w, h, cell, color, label } = o;
  s.addShape(pres.ShapeType.roundRect, {
    x: gx + c * cell + 0.03, y: gy + r * cell + 0.03,
    w: w * cell - 0.06, h: h * cell - 0.06,
    fill: { color }, line: { color: T.CREAM, width: 1.5 }, rectRadius: 0.04,
  });
  if (label) s.addText(label, {
    x: gx + c * cell, y: gy + r * cell, w: w * cell, h: h * cell,
    fontFace: T.B, fontSize: 11, bold: true, color: T.PANEL,
    align: "center", valign: "middle", margin: 0,
  });
}

// Шахматная доска n×n, holes — массив [c,r] вырезанных клеток.
function chessboard(pres, s, o) {
  const { x, y, n = 8, u = 0.29, holes = [], light = T.CREAM, dark = "2E3A5C" } = o;
  const isHole = (c, r) => holes.some(([hc, hr]) => hc === c && hr === r);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (isHole(c, r)) continue;
    s.addShape(pres.ShapeType.rect, {
      x: x + c * u, y: y + r * u, w: u, h: u,
      fill: { color: (r + c) % 2 === 0 ? light : dark },
      line: { color: "50596F", width: 0.5 },
    });
  }
}

// Вложенные квадраты, совмещённые по нижне-левому углу.
// squares — массив {n, color} от большего к меньшему; label=true подписывает сторону.
function nestedSquares(pres, s, o) {
  const { bx, by, u, squares, label = true } = o; // by = нижняя граница
  squares.forEach(({ n, color }) => {
    s.addShape(pres.ShapeType.rect, {
      x: bx, y: by - n * u, w: n * u, h: n * u,
      fill: { color }, line: { color: T.PANEL, width: 1 },
    });
  });
  if (label) squares.forEach(({ n }) => {
    s.addText(String(n), {
      x: bx + n * u - 0.38, y: by - n * u + 0.03, w: 0.35, h: 0.28,
      fontFace: T.B, fontSize: 11, bold: true, color: T.PANEL, align: "center", margin: 0,
    });
  });
}

// Сохранить деку. Возвращает промис.
function save(pres, fileName) {
  return pres.writeFile({ fileName });
}

module.exports = {
  T, newDeck, art, artOrBg, bg, panel, badge, title,
  grid, tile, chessboard, nestedSquares, save,
};
