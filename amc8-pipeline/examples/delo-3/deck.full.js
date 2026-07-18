const PptxGenJS = require("pptxgenjs");
const A = "/home/claude/d3/";

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Дело №3 — Академия Чисел";

const CREAM = "F5EFE3", AMBER = "F0B84A", TEAL = "5BC4BC", RED = "E8615E";
const MUTED = "A8B4D4", PANEL = "080E22", DARK = "121A33", GRAYFIG = "9AA3BC";
const H = "Cambria", B = "Calibri";

const art  = (s, f) => s.addImage({ path: A + f, x: 0, y: 0, w: 13.333, h: 7.5 });
const bg   = (s) => { s.background = { color: DARK }; };
const pan  = (s, x, y, w, h, tr = 14) => s.addShape(pres.ShapeType.roundRect,
  { x, y, w, h, fill: { color: PANEL, transparency: tr }, rectRadius: 0.1 });
const badge = (s, n) => {
  s.addShape(pres.ShapeType.ellipse, { x: 12.6, y: 0.28, w: 0.44, h: 0.44, fill: { color: AMBER } });
  s.addText(String(n), { x: 12.6, y: 0.28, w: 0.44, h: 0.44, fontFace: B, fontSize: 12,
    bold: true, color: PANEL, align: "center", valign: "middle", margin: 0 });
};
const title = (s, t, sub) => {
  s.addText(t, { x: 0.8, y: 0.45, w: 11.4, h: 0.8, fontFace: H, fontSize: 36,
    bold: true, color: CREAM, margin: 0, valign: "middle" });
  if (sub) s.addText(sub, { x: 0.8, y: 1.25, w: 11.4, h: 0.4, fontFace: B, fontSize: 15,
    color: MUTED, italic: true, margin: 0 });
};

// ---- точная сетка ----
function grid(s, x0, y0, cols, rows, cell, opts = {}) {
  const { hiRow = -1, fill = "1C2747", line = MUTED } = opts;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    s.addShape(pres.ShapeType.rect, {
      x: x0 + c * cell, y: y0 + r * cell, w: cell, h: cell,
      fill: { color: r === hiRow ? "3A2E12" : fill },
      line: { color: r === hiRow ? AMBER : line, width: r === hiRow ? 2 : 1 },
    });
  }
}
// ---- плитка поверх сетки ----
function tile(s, x0, y0, c, r, w, h, cell, color, label) {
  s.addShape(pres.ShapeType.roundRect, {
    x: x0 + c * cell + 0.03, y: y0 + r * cell + 0.03,
    w: w * cell - 0.06, h: h * cell - 0.06,
    fill: { color }, line: { color: CREAM, width: 1.5 }, rectRadius: 0.04,
  });
  if (label) s.addText(label, {
    x: x0 + c * cell, y: y0 + r * cell, w: w * cell, h: h * cell,
    fontFace: B, fontSize: 11, bold: true, color: PANEL,
    align: "center", valign: "middle", margin: 0,
  });
}

/* ═══ 1. ТИТУЛ ═══ */
{
  const s = pres.addSlide(); art(s, "img-01.png");
  pan(s, 0.55, 4.55, 8.3, 2.45, 8);
  s.addText("АКАДЕМИЯ ЧИСЕЛ  ·  ДЕЛО №3", { x: 0.95, y: 4.75, w: 7.6, h: 0.35,
    fontFace: B, fontSize: 13, bold: true, color: AMBER, charSpacing: 2.5, margin: 0 });
  s.addText("Три задачи, которые кажутся разными", { x: 0.95, y: 5.15, w: 7.7, h: 0.85,
    fontFace: H, fontSize: 34, bold: true, color: CREAM, margin: 0, valign: "middle" });
  s.addText("Плитки.  Квадраты.  Коньки.\nНайди, что у них общего.", { x: 0.95, y: 6.05, w: 7.6, h: 0.8,
    fontFace: B, fontSize: 17, color: MUTED, margin: 0 });
  s.addNotes("10 секунд. Не объяснять. Загадка должна повиснуть — она будет искать связь весь урок.\nНазвание приёма НЕ произносим: оно появится на слайде 12.");
}

/* ═══ 2. СТАНОК ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 2);
  title(s, "Разминка · станок", "Разность квадратов. Секундомер на весь набор.");
  pan(s, 0.8, 1.85, 11.7, 0.85, 0);
  s.addText("a² − b²  =  (a − b)(a + b)", { x: 0.8, y: 1.85, w: 11.7, h: 0.85,
    fontFace: H, fontSize: 26, bold: true, color: AMBER, align: "center", valign: "middle", margin: 0 });

  const ex = ["21 × 19", "32 × 28", "51 × 49", "13 × 7", "104 × 96",
              "25² − 15²", "41² − 39²", "100² − 99²", "12² − 8²", "15² − 5²"];
  ex.forEach((e, i) => {
    const x = 0.8 + (i % 5) * 2.35, y = 3.15 + Math.floor(i / 5) * 1.15;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.1, h: 0.9,
      fill: { color: "1C2747" }, line: { color: MUTED, width: 1 }, rectRadius: 0.08 });
    s.addText(e, { x, y, w: 2.1, h: 0.9, fontFace: H, fontSize: 18, bold: true,
      color: CREAM, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("⏱  Норматив: 60 секунд", { x: 0.8, y: 5.75, w: 11.7, h: 0.5,
    fontFace: B, fontSize: 18, bold: true, color: TEAL, align: "center", margin: 0 });
  s.addNotes("Показать все десять СРАЗУ и засечь весь набор. По одному диктовать нельзя — задержка Zoom убивает ритм.\nОтветы: 399 · 896 · 2499 · 91 · 9984 · 400 · 160 · 199 · 80 · 200");
}

/* ═══ 3. РАЗМИНКА: ЗАДАЧИ ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 3);
  title(s, "Разминка · две задачи");
  const tasks = [
    ["АЛГЕБРА", "Последняя цифра числа\n3 × 13 × 23 × 33 ?", "(A) 1   (B) 3   (C) 5   (D) 7   (E) 9", TEAL],
    ["ГЕОМЕТРИЯ", "Углы треугольника\nотносятся как 1 : 2 : 3.\nНайди наибольший.", "(A) 60°  (B) 72°  (C) 80°  (D) 90°  (E) 108°", AMBER],
  ];
  tasks.forEach((t, i) => {
    const x = 0.8 + i * 6.05;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.05, w: 5.65, h: 3.9,
      fill: { color: "1C2747" }, line: { color: t[3], width: 2 }, rectRadius: 0.12 });
    s.addText(t[0], { x: x + 0.35, y: 2.3, w: 5.0, h: 0.4, fontFace: B, fontSize: 13,
      bold: true, color: t[3], charSpacing: 2, margin: 0 });
    s.addText(t[1], { x: x + 0.35, y: 2.85, w: 5.0, h: 1.75, fontFace: H, fontSize: 22,
      bold: true, color: CREAM, margin: 0, valign: "middle" });
    s.addText(t[2], { x: x + 0.35, y: 4.85, w: 5.0, h: 0.7, fontFace: B, fontSize: 15,
      color: MUTED, margin: 0, valign: "middle" });
  });
  s.addNotes("Не объяснять. Завалила — пометить и дальше.\nОтветы: (A) 1  ·  (D) 90°");
}

/* ═══ 4. ЗАВЯЗКА ═══ */
{
  const s = pres.addSlide(); art(s, "img-02.png");
  pan(s, 7.45, 0.45, 5.35, 6.6, 8);
  s.addText("2024 AMC 8 · задача 7", { x: 7.8, y: 0.7, w: 4.7, h: 0.35,
    fontFace: B, fontSize: 12, bold: true, color: AMBER, charSpacing: 1.5, margin: 0 });
  s.addText("Замости прямоугольник", { x: 7.8, y: 1.1, w: 4.7, h: 0.9,
    fontFace: H, fontSize: 27, bold: true, color: CREAM, margin: 0, valign: "middle" });

  // сетка 3x7
  const cell = 0.62, gx = 7.85, gy = 2.15;
  grid(s, gx, gy, 7, 3, cell);
  s.addText("3 × 7", { x: 7.8, y: 4.1, w: 4.7, h: 0.35, fontFace: B, fontSize: 13,
    color: MUTED, align: "center", margin: 0 });

  // образцы плиток
  const px = 7.9, py = 4.6, c2 = 0.4;
  tile(s, px, py, 0, 0, 2, 2, c2, TEAL, "2×2");
  tile(s, px + 1.15, py, 0, 0, 4, 1, c2, AMBER, "1×4");
  tile(s, px + 3.1, py, 0, 0, 1, 1, c2, RED, "");
  s.addText("1×1", { x: px + 2.95, y: py + 0.45, w: 0.7, h: 0.3, fontFace: B, fontSize: 11,
    color: RED, align: "center", margin: 0 });

  s.addText("Без наложений.\nЕдиничек — как можно меньше.", { x: 7.8, y: 5.75, w: 4.7, h: 0.9,
    fontFace: B, fontSize: 16, bold: true, color: CREAM, margin: 0 });
  s.addNotes("Сказать условие — и ВЫКЛЮЧИТЬ МИКРОФОН. Три минуты она работает сама.\nВарианты ответа пока НЕ показываем.\nОна будет пробовать перебором. Это и нужно.");
}

/* ═══ 5. ПОВОРОТНЫЙ ВОПРОС ═══ */
{
  const s = pres.addSlide(); art(s, "img-03.png");
  pan(s, 6.6, 1.9, 6.2, 3.7, 8);
  s.addText("Ты нашла укладку\nс пятью единичками.", { x: 6.95, y: 2.2, w: 5.5, h: 1.2,
    fontFace: B, fontSize: 19, color: MUTED, margin: 0, valign: "middle" });
  s.addText("А откуда ты знаешь,\nчто четырёх не хватит?\nИли трёх?", { x: 6.95, y: 3.5, w: 5.5, h: 1.85,
    fontFace: H, fontSize: 27, bold: true, color: AMBER, margin: 0, valign: "middle" });
  s.addNotes("НЕ хвалить. Пауза. Дать почувствовать, что ответа нет.\nПеребор нашёл ответ, но не доказал минимум. Вот дыра, которую закроет приём.");
}

/* ═══ 6. ШАГ 1 ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 6);
  title(s, "Шаг 1 — считаем площадь");

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.0, w: 5.4, h: 1.35,
    fill: { color: "1C2747" }, rectRadius: 0.1 });
  s.addText("Всего клеток:  3 × 7 = 21", { x: 0.8, y: 2.0, w: 5.4, h: 1.35,
    fontFace: H, fontSize: 24, bold: true, color: CREAM, align: "center", valign: "middle", margin: 0 });

  const tl = [["2×2", "4 клетки", TEAL], ["1×4", "4 клетки", AMBER]];
  tl.forEach((t, i) => {
    const y = 3.7 + i * 1.15;
    s.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 5.4, h: 0.95,
      fill: { color: "1C2747" }, line: { color: t[2], width: 2 }, rectRadius: 0.08 });
    s.addText(`Плитка  ${t[0]}   →   ${t[1]}`, { x: 0.8, y, w: 5.4, h: 0.95,
      fontFace: H, fontSize: 20, bold: true, color: CREAM, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 2.0, w: 5.6, h: 3.85,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 2 }, rectRadius: 0.12 });
  s.addText("Обе по четыре.", { x: 7.25, y: 2.5, w: 4.9, h: 0.7,
    fontFace: H, fontSize: 28, bold: true, color: AMBER, align: "center", valign: "middle", margin: 0 });
  s.addText("Значит все большие плитки\nвместе закрывают число,\nкратное 4.", { x: 7.25, y: 3.5, w: 4.9, h: 1.9,
    fontFace: B, fontSize: 19, color: CREAM, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Вести вопросами: «Сколько закрывает 2×2? А 1×4? Значит все большие вместе — сколько?»\nОна должна сказать «кратное четырём» сама.");
}

/* ═══ 7. ФИЛЬТР ОСТАТКА ═══ */
{
  const s = pres.addSlide(); art(s, "img-04.png");
  pan(s, 0.55, 4.75, 12.25, 2.3, 8);
  s.addText("21  =  4 · 5  +  1", { x: 0.95, y: 4.95, w: 5.3, h: 0.75,
    fontFace: H, fontSize: 30, bold: true, color: CREAM, margin: 0, valign: "middle" });
  s.addText("Убери всё, что кратно 4 → остаётся 1", { x: 0.95, y: 5.75, w: 5.6, h: 0.5,
    fontFace: B, fontSize: 16, color: MUTED, margin: 0 });
  s.addText("Значит единичек может быть только:", { x: 6.9, y: 4.95, w: 5.6, h: 0.45,
    fontFace: B, fontSize: 15, color: MUTED, margin: 0 });
  s.addText("1  ·  5  ·  9  ·  13  …", { x: 6.9, y: 5.45, w: 5.6, h: 0.85,
    fontFace: H, fontSize: 32, bold: true, color: AMBER, margin: 0, valign: "middle" });
  s.addNotes("Фильтр не решает задачу. Он говорит, чего ТОЧНО не может быть.");
}

/* ═══ 8. ТРИ ВАРИАНТА УМЕРЛИ ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 8);
  title(s, "Три варианта умерли", "А задачу мы ещё не решали.");
  const opts = [["(A)", "1", true], ["(B)", "2", false], ["(C)", "3", false], ["(D)", "4", false], ["(E)", "5", true]];
  opts.forEach((o, i) => {
    const x = 0.75 + i * 2.48;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.3, w: 2.2, h: 2.7,
      fill: { color: o[2] ? "1C2747" : "15192B" },
      line: { color: o[2] ? AMBER : "3A4260", width: o[2] ? 3 : 1 }, rectRadius: 0.12 });
    s.addText(o[0], { x, y: 2.45, w: 2.2, h: 0.35, fontFace: B, fontSize: 13,
      bold: true, color: o[2] ? MUTED : "50596F", align: "center", margin: 0 });
    s.addText(o[1], { x, y: 2.8, w: 2.2, h: 1.15, fontFace: H, fontSize: 48, bold: true,
      color: o[2] ? AMBER : "3A4260", align: "center", valign: "middle", margin: 0 });
    s.addText(o[2] ? "✓ живёт" : "✗ убит", { x, y: 4.05, w: 2.2, h: 0.5,
      fontFace: B, fontSize: 14, bold: true, color: o[2] ? TEAL : RED,
      align: "center", valign: "middle", margin: 0 });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 5.5, w: 11.9, h: 1.2,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 2 }, rectRadius: 0.1 });
  s.addText("Три из пяти убиты — а мы ещё ничего не решили. Это и есть отсечение.", {
    x: 0.75, y: 5.5, w: 11.9, h: 1.2, fontFace: H, fontSize: 21, bold: true,
    color: AMBER, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Вот это её удивит. Приём работает на любом AMC: пять вариантов — это подарок, которым никто не пользуется.");
}

/* ═══ 9. ШАГ 2: СТРОКА ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 9);
  title(s, "Шаг 2 — посмотри на одну строку");

  const cell = 0.66, gx = 0.9, gy = 2.35;
  grid(s, gx, gy, 7, 3, cell, { hiRow: 1 });
  s.addText("← 7 клеток. Нечётно.", { x: 0.9, y: 4.5, w: 4.7, h: 0.4,
    fontFace: B, fontSize: 15, bold: true, color: AMBER, margin: 0 });

  const lines = [
    ["1×4  в строке закрывает 4", "чётно", "(вертикально не влезет: нужно 4 строки, а их 3)"],
    ["2×2  в строке закрывает 2", "чётно", ""],
  ];
  lines.forEach((l, i) => {
    const y = 2.4 + i * 1.1;
    s.addText(l[0], { x: 6.4, y, w: 4.3, h: 0.45, fontFace: H, fontSize: 18,
      bold: true, color: CREAM, margin: 0, valign: "middle" });
    s.addText(l[1], { x: 10.8, y, w: 1.7, h: 0.45, fontFace: B, fontSize: 16,
      bold: true, color: TEAL, margin: 0, valign: "middle" });
    if (l[2]) s.addText(l[2], { x: 6.4, y: y + 0.42, w: 6.1, h: 0.4, fontFace: B, fontSize: 12,
      italic: true, color: MUTED, margin: 0 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 6.4, y: 4.65, w: 6.1, h: 2.15,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 2 }, rectRadius: 0.1 });
  s.addText("Убери чётное → останется нечётное.\n\nВ КАЖДОЙ строке нужна\nхотя бы одна единичка.\nСтрок три → минимум 3.", {
    x: 6.65, y: 4.65, w: 5.6, h: 2.15, fontFace: B, fontSize: 16, bold: true,
    color: AMBER, valign: "middle", margin: 0 });
  s.addNotes("ОБВЕСТИ СТРОКУ аннотацией Zoom. Одна линия объясняет больше, чем полминуты слов.\nОсторожно: она может остановиться на тройке. Вернуть к фильтру: «а 3 даёт остаток 1 при делении на 4?»");
}

/* ═══ 10. ОТВЕТ ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 10);
  title(s, "Ответ: (E) 5", "Единица не проходит. Остаётся пять.");

  const cell = 0.72, gx = 1.35, gy = 2.5;
  grid(s, gx, gy, 7, 3, cell, { fill: "161E38" });
  // укладка: три 1x4 (строки 0..2, столбцы 0..3), одна 2x2 (строки 0-1, столбцы 4-5), пять 1x1
  for (let r = 0; r < 3; r++) tile(s, gx, gy, 0, r, 4, 1, cell, AMBER, "1×4");
  tile(s, gx, gy, 4, 0, 2, 2, cell, TEAL, "2×2");
  [[6, 0], [6, 1], [4, 2], [5, 2], [6, 2]].forEach(([c, r]) => tile(s, gx, gy, c, r, 1, 1, cell, RED, ""));

  s.addShape(pres.ShapeType.roundRect, { x: 7.5, y: 2.5, w: 5.0, h: 2.2,
    fill: { color: "1C2747" }, rectRadius: 0.1 });
  s.addText("3 × (1×4)  =  12\n1 × (2×2)  =   4\n5 × (1×1)  =   5", { x: 7.85, y: 2.65, w: 4.4, h: 1.35,
    fontFace: H, fontSize: 19, bold: true, color: CREAM, margin: 0, valign: "middle" });
  s.addText("————————————\n21  ✓", { x: 7.85, y: 3.95, w: 4.4, h: 0.65,
    fontFace: H, fontSize: 19, bold: true, color: AMBER, margin: 0, valign: "middle" });

  s.addShape(pres.ShapeType.roundRect, { x: 7.5, y: 5.0, w: 5.0, h: 1.5,
    fill: { color: AMBER }, rectRadius: 0.1 });
  s.addText("Единичек:  5", { x: 7.5, y: 5.0, w: 5.0, h: 1.5, fontFace: H, fontSize: 28,
    bold: true, color: PANEL, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Это одна из возможных укладок. Их несколько — важно, что меньше пяти не бывает, и мы это ДОКАЗАЛИ.");
}

/* ═══ 11. ЛОВУШКА ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 11);
  title(s, "Ловушка составителей", "Неверные варианты не случайны.");

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.05, w: 5.7, h: 2.1,
    fill: { color: "1C2747" }, rectRadius: 0.1 });
  s.addText("(B) 2   ·   (C) 3   ·   (D) 4", { x: 1.1, y: 2.25, w: 5.1, h: 0.6,
    fontFace: H, fontSize: 22, bold: true, color: MUTED, margin: 0, valign: "middle" });
  s.addText("Для тех, кто просто повыкладывал\nплитку и посчитал.\nФильтр остатка убивает их мгновенно.", {
    x: 1.1, y: 2.95, w: 5.1, h: 1.05, fontFace: B, fontSize: 14, color: CREAM, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 2.05, w: 5.6, h: 2.1,
    fill: { color: "3A1A1A" }, line: { color: RED, width: 2 }, rectRadius: 0.1 });
  s.addText("⚠  (A) 1", { x: 7.2, y: 2.25, w: 5.0, h: 0.6,
    fontFace: H, fontSize: 22, bold: true, color: RED, margin: 0, valign: "middle" });
  s.addText("Она ПРОШЛА фильтр остатка!\nЛовушка для того, кто сделал\nпервый шаг и остановился.", {
    x: 7.2, y: 2.95, w: 5.0, h: 1.05, fontFace: B, fontSize: 14, bold: true, color: CREAM, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.7, w: 11.7, h: 1.95,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 3 }, rectRadius: 0.12 });
  s.addText("Остаток отсекает невозможное.\nНо не обещает, что возможное — бывает.", {
    x: 0.8, y: 4.7, w: 11.7, h: 1.95, fontFace: H, fontSize: 26, bold: true,
    color: AMBER, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Главная мысль урока. Произнести вслух и попросить повторить своими словами.");
}

/* ═══ 12. ПРИЁМ ДНЯ ═══ */
{
  const s = pres.addSlide(); art(s, "img-05.png");
  pan(s, 6.75, 0.5, 6.05, 6.5, 6);
  s.addText("ПРИЁМ ДНЯ", { x: 7.1, y: 0.75, w: 5.4, h: 0.35, fontFace: B, fontSize: 12,
    bold: true, color: MUTED, charSpacing: 2.5, margin: 0 });
  s.addText("ВЫЧЕРКНИ\nЛИШНЕЕ", { x: 7.1, y: 1.15, w: 5.4, h: 1.55, fontFace: H, fontSize: 40,
    bold: true, color: AMBER, margin: 0, valign: "middle" });
  s.addText("Не собирай ответ. Убери всё,\nчто не влияет — и смотри,\nчто осталось.", { x: 7.1, y: 2.8, w: 5.4, h: 1.0,
    fontFace: B, fontSize: 16, color: CREAM, margin: 0 });

  const faces = [
    ["вычеркни КРАТНОЕ", "останется остаток", "✓ уже видела", TEAL],
    ["вычеркни БЕЛОЕ", "останется серое", "сейчас", AMBER],
    ["вычеркни ОБЩЕЕ", "останется различие", "сейчас", AMBER],
  ];
  faces.forEach((f, i) => {
    const y = 4.0 + i * 0.99;
    s.addShape(pres.ShapeType.roundRect, { x: 7.1, y, w: 5.4, h: 0.85,
      fill: { color: "1C2747" }, line: { color: f[3], width: 1.5 }, rectRadius: 0.08 });
    s.addText(f[0], { x: 7.3, y: y + 0.05, w: 3.3, h: 0.4, fontFace: B, fontSize: 14,
      bold: true, color: f[3], margin: 0, valign: "middle" });
    s.addText(f[1], { x: 7.3, y: y + 0.44, w: 3.3, h: 0.35, fontFace: B, fontSize: 12,
      color: MUTED, margin: 0 });
    s.addText(f[2], { x: 10.7, y, w: 1.65, h: 0.85, fontFace: B, fontSize: 11,
      italic: true, color: f[3], align: "center", valign: "middle", margin: 0 });
  });
  s.addNotes("ТУТ раскрывается название дела.\n«Помнишь, я обещал три задачи, которые кажутся разными? Одно лицо приёма ты уже видела. Проверим остальные два.»");
}

/* ═══ 13. КЛОН ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 13);
  title(s, "Клон — тот же ход, другие числа", "Прямоугольник 3 × 5. Те же три плитки.");
  const cell = 0.8, gx = 2.1, gy = 2.6;
  grid(s, gx, gy, 5, 3, cell);
  s.addText("3 × 5", { x: 2.1, y: 5.15, w: 4.0, h: 0.4, fontFace: B, fontSize: 15,
    color: MUTED, align: "center", margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 7.3, y: 2.6, w: 5.2, h: 2.4,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 2 }, rectRadius: 0.12 });
  s.addText("Минимум единичек?", { x: 7.3, y: 2.6, w: 5.2, h: 2.4, fontFace: H, fontSize: 26,
    bold: true, color: AMBER, align: "center", valign: "middle", margin: 0 });
  s.addText("2 минуты. Почти рефлекторно.", { x: 7.3, y: 5.2, w: 5.2, h: 0.4,
    fontFace: B, fontSize: 14, italic: true, color: MUTED, align: "center", margin: 0 });
  s.addNotes("Ответ: 3.  Площадь 15 = 4·3 + 3 → единичек ≡ 3 (mod 4). В строке 5 клеток (нечётно) → минимум 3. Оба условия сходятся на 3.\nУкладка: три плитки 1×4 по строкам + три единички в последнем столбце.\nНЕ решила — приём не сел: вариации отменяем, идём к финалу.");
}

/* ═══ 14. МАСКИРОВКА ═══ */
{
  const s = pres.addSlide(); art(s, "img-07.png");
  pan(s, 0.5, 0.5, 6.4, 6.55, 6);
  s.addText("2024 AMC 8 · задача 3", { x: 0.85, y: 0.75, w: 5.7, h: 0.35,
    fontFace: B, fontSize: 12, bold: true, color: AMBER, charSpacing: 1.5, margin: 0 });
  s.addText("Найди серую площадь", { x: 0.85, y: 1.15, w: 5.7, h: 0.7,
    fontFace: H, fontSize: 27, bold: true, color: CREAM, margin: 0, valign: "middle" });

  // ТОЧНАЯ фигура: 10 серый, 9 белый, 7 серый, 4 белый — снизу-слева
  const u = 0.34, bx = 1.0, by = 5.9; // by = нижняя граница
  const sq = [[10, GRAYFIG], [9, CREAM], [7, GRAYFIG], [4, CREAM]];
  sq.forEach(([n, col]) => {
    s.addShape(pres.ShapeType.rect, {
      x: bx, y: by - n * u, w: n * u, h: n * u,
      fill: { color: col }, line: { color: PANEL, width: 1 },
    });
  });
  [[10, 0.12], [9, 0.12], [7, 0.12], [4, 0.12]].forEach(([n]) => {
    s.addText(String(n), { x: bx + n * u - 0.38, y: by - n * u + 0.03, w: 0.35, h: 0.28,
      fontFace: B, fontSize: 11, bold: true, color: PANEL, align: "center", margin: 0 });
  });

  s.addText("Совмещены левыми и нижними краями.\nБольшие снизу, меньшие поверх.\n4 — белый · 7 — серый · 9 — белый · 10 — серый", {
    x: 4.55, y: 2.4, w: 2.15, h: 1.9, fontFace: B, fontSize: 11, color: CREAM, margin: 0 });
  s.addText("(A) 42   (B) 45   (C) 49   (D) 50   (E) 52", { x: 0.85, y: 6.2, w: 5.7, h: 0.5,
    fontFace: B, fontSize: 15, bold: true, color: MUTED, margin: 0 });
  s.addNotes("Пусть наложит СВОИ бумажные квадраты и покажет в камеру. Руками — лучше, чем глядя на картинку.\nОтвет: (E) 52.");
}

/* ═══ 15. РЕШЕНИЕ КВАДРАТОВ ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 15);
  title(s, "Вычеркни белое", "Не собирай серое по кусочкам — убери белое.");

  const rows = [
    ["Серый 10 закрыт белым 9", "10² − 9² = (10−9)(10+9) = 1 × 19", "19", TEAL],
    ["Серый 7 закрыт белым 4", "7² − 4² = (7−4)(7+4) = 3 × 11", "33", AMBER],
  ];
  rows.forEach((r, i) => {
    const y = 2.15 + i * 1.35;
    s.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 1.1,
      fill: { color: "1C2747" }, line: { color: r[3], width: 1.5 }, rectRadius: 0.1 });
    s.addText(r[0], { x: 1.15, y, w: 3.6, h: 1.1, fontFace: B, fontSize: 14,
      color: MUTED, valign: "middle", margin: 0 });
    s.addText(r[1], { x: 4.9, y, w: 5.9, h: 1.1, fontFace: H, fontSize: 20, bold: true,
      color: CREAM, valign: "middle", margin: 0 });
    s.addText(r[2], { x: 10.9, y, w: 1.3, h: 1.1, fontFace: H, fontSize: 30, bold: true,
      color: r[3], align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 5.05, w: 11.7, h: 1.6,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 3 }, rectRadius: 0.12 });
  s.addText("19 + 33 = 52  →  (E)          Ни одного возведения в квадрат. Это утренний станок.", {
    x: 0.8, y: 5.05, w: 11.7, h: 1.6, fontFace: H, fontSize: 22, bold: true,
    color: AMBER, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Связать с разминкой явно: «помнишь, чем мы начали урок?» Приём окупился через 25 минут.");
}

/* ═══ 16. ГРАНИЦА: КАТОК ═══ */
{
  const s = pres.addSlide(); art(s, "img-08.png");
  pan(s, 6.65, 0.5, 6.15, 6.55, 6);
  s.addText("2024 AMC 8 · задача 6", { x: 7.0, y: 0.75, w: 5.4, h: 0.35,
    fontFace: B, fontSize: 12, bold: true, color: AMBER, charSpacing: 1.5, margin: 0 });
  s.addText("Расставь маршруты", { x: 7.0, y: 1.15, w: 5.4, h: 0.7,
    fontFace: H, fontSize: 27, bold: true, color: CREAM, margin: 0, valign: "middle" });
  s.addText("От самого короткого\nк самому длинному.", { x: 7.0, y: 1.9, w: 5.4, h: 0.7,
    fontFace: B, fontSize: 16, color: MUTED, margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 6.95, y: 2.85, w: 5.55, h: 2.5,
    fill: { color: "FFFFFF" }, rectRadius: 0.08 });
  s.addImage({ path: A + "amc-rink.png", x: 7.1, y: 2.95, w: 5.25, h: 2.13 });
  s.addText("схема — официальный буклет MAA AMC 8, 2024", { x: 7.0, y: 5.45, w: 5.4, h: 0.3,
    fontFace: B, fontSize: 9, italic: true, color: MUTED, margin: 0 });
  s.addText("Тут ничего нельзя посчитать.\nВ этом весь смысл.", { x: 7.0, y: 5.95, w: 5.4, h: 0.75,
    fontFace: B, fontSize: 15, bold: true, color: AMBER, margin: 0 });
  s.addNotes("Захочет померить линейкой — спросить мягко: «а если бы картинки под рукой не было?»\nОтвет: (D) R, P, S, Q.");
}

/* ═══ 17. РЕШЕНИЕ КАТКА + ГРАНИЦА ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 17);
  title(s, "Вычеркни общее", "Сравнивай попарно — не меряя.");

  const cmp = [
    ["R < P", "сверху и снизу у R прямые, у P дуги", "прямая короче дуги", TEAL],
    ["P < S", "у P куски вдоль борта, у S диагонали", "диагональ длиннее", TEAL],
    ["S < Q", "у обоих ОДНИ И ТЕ ЖЕ дуги — вычеркни их!", "осталась середина: у Q галки длиннее", AMBER],
  ];
  cmp.forEach((c, i) => {
    const y = 1.95 + i * 1.15;
    s.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 0.95,
      fill: { color: "1C2747" }, line: { color: c[3], width: i === 2 ? 2 : 1 }, rectRadius: 0.08 });
    s.addText(c[0], { x: 1.1, y, w: 1.4, h: 0.95, fontFace: H, fontSize: 22, bold: true,
      color: c[3], valign: "middle", margin: 0 });
    s.addText(c[1], { x: 2.6, y, w: 5.6, h: 0.95, fontFace: B, fontSize: 14,
      color: CREAM, valign: "middle", margin: 0 });
    s.addText(c[2], { x: 8.3, y, w: 4.0, h: 0.95, fontFace: B, fontSize: 13,
      italic: true, color: MUTED, valign: "middle", margin: 0 });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 5.5, w: 5.5, h: 1.2,
    fill: { color: AMBER }, rectRadius: 0.1 });
  s.addText("R, P, S, Q  →  (D)", { x: 0.8, y: 5.5, w: 5.5, h: 1.2, fontFace: H, fontSize: 24,
    bold: true, color: PANEL, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.ShapeType.roundRect, { x: 6.7, y: 5.5, w: 5.8, h: 1.2,
    fill: { color: "3A1A1A" }, line: { color: RED, width: 2 }, rectRadius: 0.1 });
  s.addText("⚠ ГРАНИЦА: приём сказал, КАКОЙ длиннее.\nИ не может сказать, НА СКОЛЬКО.", {
    x: 6.9, y: 5.5, w: 5.4, h: 1.2, fontFace: B, fontSize: 14, bold: true,
    color: CREAM, valign: "middle", margin: 0 });
  s.addNotes("Спросить её: «а чего этот приём НЕ умеет?» Пусть сформулирует границу сама.");
}

/* ═══ 18. ФИНАЛ ═══ */
{
  const s = pres.addSlide(); art(s, "img-09.png");
  pan(s, 7.05, 1.15, 5.75, 5.2, 6);
  s.addText("Теперь сама.", { x: 7.4, y: 1.45, w: 5.1, h: 0.75,
    fontFace: H, fontSize: 32, bold: true, color: AMBER, margin: 0, valign: "middle" });

  const cell = 0.62, gx = 8.0, gy = 2.5;
  grid(s, gx, gy, 5, 2, cell);
  s.addText("2 × 5", { x: 7.4, y: 3.85, w: 5.1, h: 0.35, fontFace: B, fontSize: 13,
    color: MUTED, align: "center", margin: 0 });

  s.addText("Плитки: 1×4 и 1×1.\nМинимум единичек?", { x: 7.4, y: 4.35, w: 5.1, h: 0.8,
    fontFace: B, fontSize: 17, bold: true, color: CREAM, margin: 0 });
  s.addText("(A) 1   (B) 2   (C) 3   (D) 4   (E) 5", { x: 7.4, y: 5.35, w: 5.1, h: 0.5,
    fontFace: B, fontSize: 15, bold: true, color: MUTED, margin: 0 });
  s.addNotes("8 минут. МИКРОФОН ВЫКЛЮЧЕН. Не помогать.\nОтвет: (B) 2. Площадь 10 = 4·2 + 2 → единичек ≡ 2 (mod 4) → минимум 2, и он достижим: две плитки 1×4 по строкам + две единички в последнем столбце.\nПодсказки лесенкой: 1) какая площадь? 2) на что делится площадь больших плиток? 3) что остаётся от 10, если убрать кратное 4?\nРЕШИЛА ЗА 2 МИНУТЫ → довесок: квадрат 3×3, плитки 2×2, 1×4, 1×1 (ответ 5 — фильтр разрешает 1, но геометрия не даёт).\nЗАБУКСОВАЛА → запасная: квадрат 10×10, вырезан 6×6 из угла, площадь остатка (64). И сказать: «я дал слишком трудную, моя ошибка, не твоя».");
}

/* ═══ 19. КАРТОЧКА В ТЕТРАДЬ ═══ */
{
  const s = pres.addSlide(); bg(s); badge(s, 19);
  s.addImage({ path: A + "img-10.png", x: 9.55, y: 1.9, w: 3.1, h: 3.1 });
  title(s, "Забери в тетрадь", "Пиши рукой. Потом покажи в камеру.");

  s.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.95, w: 8.35, h: 4.6,
    fill: { color: "1C2747" }, line: { color: AMBER, width: 2 }, rectRadius: 0.12 });
  s.addText("ПРИЁМ:  «ВЫЧЕРКНИ ЛИШНЕЕ»", { x: 1.15, y: 2.2, w: 7.6, h: 0.55,
    fontFace: H, fontSize: 23, bold: true, color: AMBER, margin: 0, valign: "middle" });
  s.addText("Не собирай ответ — убери всё, что не влияет, и смотри, что осталось.", {
    x: 1.15, y: 2.8, w: 7.6, h: 0.4, fontFace: B, fontSize: 14, italic: true, color: MUTED, margin: 0 });

  const items = [
    ["Вычеркни КРАТНОЕ", "останется остаток. Он отсекает невозможное."],
    ["Вычеркни БЕЛОЕ", "останется серое.   a² − b² = (a−b)(a+b)"],
    ["Вычеркни ОБЩЕЕ", "останется различие. Только его и сравнивай."],
  ];
  items.forEach((it, i) => {
    const y = 3.5 + i * 0.72;
    s.addShape(pres.ShapeType.ellipse, { x: 1.2, y: y + 0.15, w: 0.18, h: 0.18, fill: { color: AMBER } });
    s.addText(it[0], { x: 1.55, y, w: 2.6, h: 0.48, fontFace: B, fontSize: 14, bold: true,
      color: CREAM, margin: 0, valign: "middle" });
    s.addText(it[1], { x: 4.2, y, w: 4.7, h: 0.48, fontFace: B, fontSize: 13,
      color: MUTED, margin: 0, valign: "middle" });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 1.15, y: 5.7, w: 7.6, h: 0.68,
    fill: { color: "3A1A1A" }, line: { color: RED, width: 1.5 }, rectRadius: 0.08 });
  s.addText("⚠  Остаток — условие необходимое, но не достаточное. Прошло фильтр ≠ бывает.", {
    x: 1.35, y: 5.7, w: 7.3, h: 0.68, fontFace: B, fontSize: 13, bold: true,
    color: CREAM, valign: "middle", margin: 0 });
  s.addNotes("Пишет РУКОЙ, не фотографирует. Потом — «покажи в камеру». Не показала — считайте, что не написала.");
}

/* ═══ 20. КРЮЧОК ═══ */
{
  const s = pres.addSlide(); art(s, "img-06.png");
  pan(s, 0.5, 1.3, 5.9, 5.1, 6);
  s.addText("СЛЕДУЮЩЕЕ ДЕЛО", { x: 0.85, y: 1.55, w: 5.2, h: 0.35,
    fontFace: B, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });

  // точная доска 8x8 без двух противоположных углов
  const u = 0.29, bx = 0.95, by = 2.15;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    if ((r === 0 && c === 0) || (r === 7 && c === 7)) continue;
    s.addShape(pres.ShapeType.rect, {
      x: bx + c * u, y: by + r * u, w: u, h: u,
      fill: { color: (r + c) % 2 === 0 ? CREAM : "2E3A5C" },
      line: { color: "50596F", width: 0.5 },
    });
  }
  s.addText("62 клетки", { x: 3.5, y: 2.2, w: 2.6, h: 0.4, fontFace: B, fontSize: 14,
    bold: true, color: AMBER, margin: 0 });
  s.addText("два угла\nвырезаны", { x: 3.5, y: 2.7, w: 2.6, h: 0.7, fontFace: B, fontSize: 12,
    color: MUTED, margin: 0 });

  s.addText("Домино закрывает 2 клетки.\n62 : 2 = 31 — площадь сходится идеально.", {
    x: 0.85, y: 4.75, w: 5.2, h: 0.75, fontFace: B, fontSize: 14, color: CREAM, margin: 0 });
  s.addText("Так замостить можно?", { x: 0.85, y: 5.6, w: 5.2, h: 0.55,
    fontFace: H, fontSize: 25, bold: true, color: AMBER, margin: 0, valign: "middle" });
  s.addText("Не решай сейчас. Подумай по дороге.", { x: 0.85, y: 6.15, w: 5.2, h: 0.35,
    fontFace: B, fontSize: 13, italic: true, color: MUTED, margin: 0 });
  s.addNotes("НЕ ОТВЕЧАТЬ, даже если попросит. В этом весь смысл — вопрос работает всю неделю.\n(Для вас: замостить нельзя. Противоположные углы одного цвета; убрали две одинаковые → осталось 30 и 32, а домино берёт ровно по одной каждого цвета. Это тот же приём этажом выше — инвариант через раскраску. Тема следующего урока.)");
}

pres.writeFile({ fileName: "/home/claude/delo_3.pptx" }).then(() => console.log("OK"));
