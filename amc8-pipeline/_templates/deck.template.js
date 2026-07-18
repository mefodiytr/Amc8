// deck.js — генератор презентации урока. Заполняется по 05-slides.md (_prompts/07).
// Запуск из папки урока:  node deck.js
// Требует: npm i pptxgenjs  (в корне конвейера)
//
// Правило: ВСЯ математика — вектором через deckkit (K.grid/K.tile/K.chessboard/K.nestedSquares).
// Картинки (K.art) — атмосфера, лежат рядом в ./img/ как img-01.png … Текст — поверх, в safe-зоне.
// Полный рабочий пример: ../../examples/delo-3/deck.full.js

const path = require("path");
const K = require(path.join(__dirname, "..", "..", "lib", "deckkit"));
const T = K.T;

const IMG = path.join(__dirname, "img"); // сюда положить img-01.png …
const OUT = path.join(__dirname, "deck.pptx");

const pres = K.newDeck("Дело №N — Академия Чисел");

// ── Слайд 1 · ТИТУЛ (загадка, картинка). Имя приёма НЕ писать. ──
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-01.png"));       // картинка если есть, иначе тёмный фон
  K.panel(pres, s, 0.55, 4.55, 8.3, 2.45, 8);
  s.addText("АКАДЕМИЯ ЧИСЕЛ · ДЕЛО №N", { x: 0.95, y: 4.75, w: 7.6, h: 0.35,
    fontFace: T.B, fontSize: 13, bold: true, color: T.AMBER, charSpacing: 2.5, margin: 0 });
  s.addText("<ЗАГАДОЧНЫЙ ЗАГОЛОВОК>", { x: 0.95, y: 5.15, w: 7.7, h: 0.85,
    fontFace: T.H, fontSize: 34, bold: true, color: T.CREAM, margin: 0, valign: "middle" });
  s.addNotes("10 секунд, не объяснять. Имя приёма НЕ произносить.\n⛔ На уроке шарить ОКНО, не экран — в заметках ответы.");
}

// ── Слайд · ВЕКТОРНАЯ СЕТКА (пример завязки/разбора) ──
{
  const s = pres.addSlide();
  K.bg(s); K.badge(pres, s, 2);
  K.title(pres, s, "<Заголовок>", "<подзаголовок>");
  K.grid(pres, s, { x: 1.0, y: 2.3, cols: 7, rows: 3, cell: 0.62, hiRow: 1 }); // hiRow: подсветка строки
  // плитки поверх сетки:
  // K.tile(pres, s, { gx:1.0, gy:2.3, c:0, r:0, w:4, h:1, cell:0.62, color:T.AMBER, label:"1×4" });
  s.addNotes("Обвести строку аннотацией Zoom.");
}

// ── Слайд · ВЛОЖЕННЫЕ КВАДРАТЫ (пример маскировки) ──
{
  const s = pres.addSlide();
  K.bg(s); K.badge(pres, s, 3);
  K.title(pres, s, "<Заголовок>");
  K.nestedSquares(pres, s, { bx: 1.0, by: 6.0, u: 0.34, squares: [
    { n: 10, color: T.GRAYFIG }, { n: 9, color: T.CREAM },
    { n: 7, color: T.GRAYFIG }, { n: 4, color: T.CREAM },
  ]});
  s.addNotes("<что сказать>");
}

// ── Слайд · КАРТИНКА + ТЕКСT В SAFE-ЗОНЕ (пример приёма/финала) ──
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-05.png"));
  K.panel(pres, s, 6.75, 0.5, 6.05, 6.5, 6);      // панель напротив героини
  s.addText("<текст>", { x: 7.1, y: 1.15, w: 5.4, h: 1.5,
    fontFace: T.H, fontSize: 34, bold: true, color: T.AMBER, margin: 0, valign: "middle" });
  s.addNotes("<что сказать>");
}

// ── Слайд · КРЮЧОК (шахматная доска без двух углов) ──
{
  const s = pres.addSlide();
  K.bg(s); K.badge(pres, s, 20);
  K.title(pres, s, "Следующее дело");
  K.chessboard(pres, s, { x: 0.95, y: 2.15, n: 8, u: 0.29, holes: [[0, 0], [7, 7]] });
  s.addNotes("НЕ отвечать на вопрос, даже если попросит. Разгадку держать при себе.");
}

K.save(pres, OUT).then(() => console.log("собрано:", OUT));
