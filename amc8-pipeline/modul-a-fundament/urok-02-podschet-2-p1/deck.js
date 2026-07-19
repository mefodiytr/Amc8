// deck.js — Урок 2 «Снять порядок» (Академия Чисел, Дело №2).
// Вся математика — вектором (дерево-по-местам, полный граф рукопожатий, столбики
// дополнения рисуются фигурами). Картинки — атмосфера (img/img-0N.png).
// Запуск из папки урока:  node deck.js   (в корне: npm i pptxgenjs)
const path = require("path");
const K = require(path.join(__dirname, "..", "..", "lib", "deckkit"));
const T = K.T;
const IMG = path.join(__dirname, "img");
const OUT = path.join(__dirname, "deck.pptx");
const pres = K.newDeck("Дело №2 — Академия Чисел");

// ── векторные помощники ──

// отрезок из (x1,y1) в (x2,y2) с корректным отражением (для рёбер графа во все стороны)
function seg(s, x1, y1, x2, y2, color, width) {
  const left = x1 <= x2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
  const right = x1 <= x2 ? { x: x2, y: y2 } : { x: x1, y: y1 };
  s.addShape(pres.ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: color || T.MUTED, width: width || 1.25 },
    flipV: left.y > right.y,
  });
}

// узел-«кресло»/элемент
function node(s, cx, cy, txt, fill, r) {
  const w = r || 0.5, h = r || 0.5;
  s.addShape(pres.ShapeType.ellipse, { x: cx - w/2, y: cy - h/2, w, h,
    fill: { color: fill || T.CARD }, line: { color: T.AMBER, width: 1.4 } });
  if (txt != null) s.addText(String(txt), { x: cx - w/2, y: cy - h/2, w, h, fontFace: T.B,
    fontSize: 13, bold: true, color: T.CREAM, align: "center", valign: "middle", margin: 0 });
}

// строка веток: [n] × [n] × … = result   (дерево-по-местам, порядок ВАЖЕН)
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
  s.addText("= " + result, { x: ex, y, w: 2.4, h: bw, fontFace: T.H, fontSize: 26, bold: true,
    color: T.AMBER, align: "left", valign: "middle", margin: 0 });
}

// «снять порядок»:  dividend ÷ divisor = quotient  (крупно)
function divRow(s, x, y, dividend, divisor, quotient) {
  s.addText(`${dividend}  ÷  ${divisor}  =  ${quotient}`, { x, y, w: 11.3, h: 1.0,
    fontFace: T.H, fontSize: 34, bold: true, color: T.AMBER, align: "center", valign: "middle", margin: 0 });
}

// полный граф на n вершинах по кругу — все C(n,2) рёбер. Возвращает число рёбер.
function completeGraph(s, cx, cy, r, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  let edges = 0;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    seg(s, pts[i].x, pts[i].y, pts[j].x, pts[j].y, T.TEAL, 1.1); edges++;
  }
  pts.forEach(p => node(s, p.x, p.y, null, T.AMBER, 0.26));
  return edges;
}

// столбики дополнения: всего − «без нужного» = «хотя бы один»
function complementBars(s, x, y, total, none, result) {
  const scale = 2.9 / total, bw = 1.5, gap = 1.5;
  const bars = [
    { v: total, c: T.CARD, cap: "всего" },
    { v: none, c: T.RED, cap: "без золота" },
    { v: result, c: T.AMBER, cap: "хотя бы 1" },
  ];
  const baseY = y + 3.1;
  bars.forEach((b, i) => {
    const bx = x + i * (bw + gap), h = Math.max(b.v * scale, 0.3);
    s.addShape(pres.ShapeType.rect, { x: bx, y: baseY - h, w: bw, h,
      fill: { color: b.c }, line: { color: T.CREAM, width: 1.2 } });
    s.addText(String(b.v), { x: bx, y: baseY - h - 0.5, w: bw, h: 0.45, fontFace: T.H, fontSize: 24,
      bold: true, color: T.CREAM, align: "center", margin: 0 });
    s.addText(b.cap, { x: bx - 0.2, y: baseY + 0.1, w: bw + 0.4, h: 0.4, fontFace: T.B, fontSize: 13,
      color: T.MUTED, align: "center", margin: 0 });
    if (i < 2) s.addText(i === 0 ? "−" : "=", { x: bx + bw, y: baseY - 1.2, w: gap, h: 0.6,
      fontFace: T.H, fontSize: 30, bold: true, color: T.AMBER, align: "center", valign: "middle", margin: 0 });
  });
}

// 1 · ТИТУЛ (загадка, картинка) — имя приёма НЕ писать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-01.png"));
  K.panel(pres, s, 0.55, 4.5, 7.4, 2.5, 8);
  s.addText("АКАДЕМИЯ ЧИСЕЛ · ДЕЛО №2", { x: 0.95, y: 4.72, w: 6.8, h: 0.35,
    fontFace: T.B, fontSize: 13, bold: true, color: T.AMBER, charSpacing: 2.5, margin: 0 });
  s.addText("Стёрли места — сколько троек?", { x: 0.95, y: 5.1, w: 6.9, h: 0.9,
    fontFace: T.H, fontSize: 32, bold: true, color: T.CREAM, margin: 0, valign: "middle" });
  s.addText("На пьедестале нет золота-серебра-бронзы. Просто «трое лучших».", { x: 0.95, y: 6.05, w: 6.8, h: 0.8,
    fontFace: T.B, fontSize: 15, color: T.MUTED, margin: 0 });
  s.addNotes("10 секунд. Имя приёма НЕ произносить — загадка должна повиснуть.\n⛔ На уроке шарить ОКНО, не экран — в заметках ответы.");
}

// 2 · РАЗМИНКА: станок С1
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 2);
  K.title(pres, s, "Станок · умножение налегке", "⏱ 10 примеров за 60 секунд — личный рекорд");
  s.addText("×11:  43·11   61·11   85·11\n×5:   48·5    126·5\n×25:  28·25   52·25\nразбиение:  6·54   8·37   7·46\nмини-станок C:  C(4,2)  C(5,2)  C(6,2)",
    { x: 1.0, y: 2.25, w: 11.2, h: 3.4, fontFace: T.H, fontSize: 24, bold: true, color: T.CREAM, lineSpacingMultiple: 1.28, margin: 0 });
  s.addNotes("Показать все сразу, засечь ВЕСЬ набор. Время — в доску рекордов.\nОтветы: 473, 671, 935, 240, 630, 700, 1300, 324, 296, 322;  C(4,2)=6, C(5,2)=10, C(6,2)=15.");
}

// 3 · РАЗМИНКА: две задачи (из пройденного)
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 3);
  K.title(pres, s, "Разминка · две задачи", "из пройденного");
  s.addText("Правило произведения.  2 куртки и 3 шапки — сколько комплектов?\n(A) 2   (B) 3   (C) 5   (D) 6   (E) 9\n\nУглы.  Углы треугольника как 2 : 3 : 5. Наибольший?\n(A) 60°   (B) 72°   (C) 80°   (D) 90°   (E) 108°",
    { x: 1.0, y: 2.3, w: 11.2, h: 3.4, fontFace: T.B, fontSize: 20, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Не объяснять, завалила — пометить и дальше. Ответы: (D) 6 (дерево 2×3); (D) 90° (часть 18°, наиб 5 частей).");
}

// 4 · ЗАВЯЗКА (картинка) — вариантов НЕ показывать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-02.png"));
  K.panel(pres, s, 6.7, 0.5, 6.1, 6.5, 6);
  s.addText("Команда на выезд", { x: 7.05, y: 1.05, w: 5.5, h: 0.7,
    fontFace: T.H, fontSize: 30, bold: true, color: T.AMBER, margin: 0, valign: "middle" });
  s.addText("Тренер берёт троих гимнасток из шести.\nМест и ролей нет — просто трое едут.\n\nСколькими способами составить команду?",
    { x: 7.05, y: 1.9, w: 5.4, h: 3.6, fontFace: T.B, fontSize: 19, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Дать карточки с именами А–Е, пусть набирает тройку, и МОЛЧАТЬ. Скорее всего нарисует дерево-по-местам 6·5·4=120. Пауза.\nПо мотивам счётных задач 2024 AMC 8. Варианты ответа пока НЕ показывать.");
}

// 5 · ВЕКТОР — наивный путь (боль): дерево-по-местам
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 5);
  K.title(pres, s, "Дерево-по-местам", "1-е кресло: 6 · 2-е: 5 · 3-е: 4");
  branchStrip(s, 1.4, 2.7, [6, 5, 4], "×", "120");
  s.addText("Но АБВ, АВБ, БАВ, БВА, ВАБ, ВБА — это одна и та же команда…", { x: 1.0, y: 5.0, w: 11.3, h: 0.7,
    fontFace: T.B, fontSize: 20, italic: true, color: T.AMBER, align: "center", margin: 0 });
  s.addNotes("120 упорядоченных троек. Показать одну тройку в 6 перестановках. Отсюда — поворот.");
}

// 6 · ПОВОРОТНЫЙ ВОПРОС
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 6);
  K.panel(pres, s, 1.2, 2.3, 10.9, 2.9, 10);
  s.addText("«Поменяй трёх выбранных местами — команда та же.\nСколькими способами переставить тройку? Сколько раз её посчитали?»",
    { x: 1.6, y: 2.5, w: 10.1, h: 2.5, fontFace: T.H, fontSize: 26, bold: true, color: T.CREAM, valign: "middle", lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Держать вопрос. Веди к 3! = 6. «Порядок важен → умножай; не важен → дели».");
}

// 7 · ВЕКТОР — одна тройка = 3! перестановок → делим
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 7);
  K.title(pres, s, "Одну тройку — 3! = 6 перестановок");
  const perms = ["АБВ", "АВБ", "БАВ", "БВА", "ВАБ", "ВБА"];
  perms.forEach((p, i) => {
    const bx = 1.2 + i * 1.9;
    s.addShape(pres.ShapeType.roundRect, { x: bx, y: 2.3, w: 1.6, h: 0.7,
      fill: { color: T.CARD }, line: { color: T.MUTED, width: 1.2 }, rectRadius: 0.06 });
    s.addText(p, { x: bx, y: 2.3, w: 1.6, h: 0.7, fontFace: T.B, fontSize: 18, bold: true,
      color: T.CREAM, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("↓  всё это ОДНА команда", { x: 1.0, y: 3.25, w: 11.3, h: 0.6,
    fontFace: T.B, fontSize: 18, italic: true, color: T.MUTED, align: "center", margin: 0 });
  divRow(s, 1.0, 4.1, 120, 6, 20);
  s.addText("каждую команду посчитали 6 раз → делим на 3! = 6", { x: 1.0, y: 5.35, w: 11.3, h: 0.6,
    fontFace: T.B, fontSize: 17, italic: true, color: T.AMBER, align: "center", margin: 0 });
  s.addNotes("Аннотацией Zoom вычеркнуть повторы. 120 ÷ 6 = 20.");
}

// 8 · ИМЯ ПРИЁМА (картинка) — раскрываем название
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-03.png"));
  K.panel(pres, s, 0.5, 4.3, 8.2, 2.7, 6);              // героиня справа → текст вниз-влево
  s.addText("Приём: СНЯТЬ ПОРЯДОК", { x: 0.85, y: 4.5, w: 7.6, h: 0.7,
    fontFace: T.H, fontSize: 27, bold: true, color: T.AMBER, valign: "middle", margin: 0 });
  s.addText("Посчитай упорядоченно (дерево): 6·5·4 = 120.\nПорядок не важен → раздели на k! = 3! = 6:  C(6,3) = 120 : 6 = 20.",
    { x: 0.85, y: 5.35, w: 7.6, h: 1.5, fontFace: T.B, fontSize: 18, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Здесь даём ИМЯ приёма (не раньше). C(6,3)=120/3!=20. Ответ основной: (B) 20.");
}

// 9 · ВЕКТОР — формула сочетания
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 9);
  K.title(pres, s, "Сочетание C(n, k)");
  s.addText("C(n, k)  =  n·(n−1)·…·(n−k+1)  /  k!", { x: 1.0, y: 2.5, w: 11.3, h: 1.0,
    fontFace: T.H, fontSize: 32, bold: true, color: T.CREAM, align: "center", margin: 0 });
  s.addText("сверху — k убывающих множителей · снизу — k!", { x: 1.0, y: 3.6, w: 11.3, h: 0.6,
    fontFace: T.B, fontSize: 18, italic: true, color: T.MUTED, align: "center", margin: 0 });
  s.addText("Порядок важен → умножай ветки.\nПорядок не важен → то же, делённое на k!.",
    { x: 1.0, y: 4.5, w: 11.3, h: 1.4, fontFace: T.B, fontSize: 22, color: T.AMBER, align: "center", lineSpacingMultiple: 1.25, margin: 0 });
  s.addNotes("Спроси: «поменяю двоих выбранных — тот же набор?» Да → дели на k!.");
}

// 10 · ДИСТРАКТОРЫ
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 10);
  K.title(pres, s, "Откуда неверные ответы");
  s.addText("120  =  6·5·4 — не сняла порядок  (самая частая)\n60  =  поделила на 2, а не на 3!\n40  =  поделила на 3, а не на 3! = 6\n15  =  выбирала двоих, а не троих\n20  =  верно",
    { x: 1.0, y: 2.4, w: 11.2, h: 3.2, fontFace: T.B, fontSize: 21, color: T.CREAM, lineSpacingMultiple: 1.3, margin: 0 });
  s.addNotes("Разобрать каждый. Особо 120 и 60.");
}

// 11 · ВЕКТОР — КЛОН
{
  const s = pres.addSlide(); K.bg(s); K.badge(pres, s, 11);
  K.title(pres, s, "Клон · 2 из 5 в дуэт", "ролей нет — важен только состав пары");
  branchStrip(s, 2.2, 2.7, [5, 4], "×", "20");
  divRow(s, 1.0, 4.2, 20, 2, 10);
  s.addText("пару можно переставить 2! = 2 способами → делим на 2.  C(5,2) = 10", { x: 1.0, y: 5.5, w: 11.3, h: 0.6,
    fontFace: T.B, fontSize: 18, italic: true, color: T.AMBER, align: "center", margin: 0 });
  s.addNotes("Её руками. Ответ (C) 10.");
}

// 12 · МАСКИРОВКА (картинка) — рукопожатия = полный граф
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-04.png"));
  K.panel(pres, s, 0.5, 0.4, 12.3, 2.5, 6);            // верхняя треть спокойна (safe-зона сверху)
  s.addText("Маскировка: рукопожатия — тот же выбор двоих", { x: 0.9, y: 0.55, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 24, bold: true, color: T.AMBER, margin: 0 });
  s.addText("Каждая из 6 обменялась с каждой. Обмен А↔Б — это пара {А,Б}.\nC(6,2) = 6·5 / 2 = 15.  (30 = посчитала каждый обмен дважды)",
    { x: 0.9, y: 1.25, w: 8.4, h: 1.5, fontFace: T.B, fontSize: 17, color: T.CREAM, lineSpacingMultiple: 1.15, margin: 0 });
  const e = completeGraph(s, 11.0, 1.65, 0.95, 6);     // K6 в правой части панели
  s.addNotes("Сама распознаёт «это выбор двоих». Вектор — полный граф на 6 вершинах, рёбер: " + e + ". Ответ (B) 15.");
}

// 13 · ГРАНИЦА (картинка) — «хотя бы один» через дополнение
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-05.png"));
  K.panel(pres, s, 0.5, 0.4, 7.4, 6.6, 5);             // золото справа-сверху не закрывать → панель слева
  s.addText("Граница: «хотя бы один» золотой", { x: 0.85, y: 0.6, w: 6.9, h: 0.6,
    fontFace: T.H, fontSize: 23, bold: true, color: T.AMBER, margin: 0 });
  s.addText("3 значка из 4 обычных + 2 золотых.\nВ лоб не выбрать — считай через противоположное:",
    { x: 0.85, y: 1.35, w: 6.9, h: 1.2, fontFace: T.B, fontSize: 17, color: T.CREAM, lineSpacingMultiple: 1.15, margin: 0 });
  complementBars(s, 1.1, 2.6, 20, 4, 16);
  s.addText("всего − без золота = 20 − 4 = 16", { x: 0.85, y: 6.35, w: 6.9, h: 0.5,
    fontFace: T.B, fontSize: 17, italic: true, color: T.AMBER, align: "center", margin: 0 });
  s.addNotes("«Хотя бы один = всего − ни одного». Casework для проверки: 12+4=16, дополнение короче. Ответ (C) 16.");
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
  s.addText("Пара для разминки: 2 из 4 подруг (без ролей). Сколькими способами?", { x: 0.9, y: 4.55, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 22, bold: true, color: T.AMBER, margin: 0 });
  branchStrip(s, 0.9, 5.3, [4, 3], "×", "12 : 2! = 6");
  s.addText("(A) 4   (B) 6   (C) 8   (D) 12   (E) 16", { x: 7.7, y: 5.45, w: 5.0, h: 0.7,
    fontFace: T.B, fontSize: 18, color: T.CREAM, valign: "middle", margin: 0 });
  s.addNotes("Решает вслух, сама. Подсказки лесенкой (см. 04). Ответ (B) 6.\nДовесок: роли → 4·3=12. Запасная 2 из 3 = 3 («дал слишком трудную, моя ошибка»).");
}

// 16 · ПЕЧАТЬ (эмблема) — карточка в тетрадь
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-07.png"));
  K.panel(pres, s, 6.5, 0.6, 6.3, 6.3, 6);
  s.addText("Карточка в тетрадь", { x: 6.85, y: 1.0, w: 5.7, h: 0.6,
    fontFace: T.B, fontSize: 15, bold: true, color: T.AMBER, charSpacing: 2, margin: 0 });
  s.addText("СНЯТЬ ПОРЯДОК", { x: 6.85, y: 1.55, w: 5.7, h: 0.7,
    fontFace: T.H, fontSize: 26, bold: true, color: T.CREAM, margin: 0 });
  s.addText("Порядок важен → умножай ветки.\nПорядок НЕ важен → дели на k!:\n   C(n,k) = n·(n−1)·… / k!\n\n⚠ «Хотя бы один» = всего − ни одного.",
    { x: 6.85, y: 2.4, w: 5.6, h: 4.2, fontFace: T.B, fontSize: 18, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("Писать РУКОЙ. Хвалить метод: «сразу увидела, что порядок не важен», а не «молодец, верно».");
}

// 17 · КРЮЧОК (картинка) — не отвечать
{
  const s = pres.addSlide();
  K.artOrBg(s, path.join(IMG, "img-08.png"));
  K.panel(pres, s, 0.5, 4.4, 12.3, 2.6, 6);
  s.addText("Следующее дело", { x: 0.9, y: 4.6, w: 11.5, h: 0.6,
    fontFace: T.H, fontSize: 24, bold: true, color: T.AMBER, margin: 0 });
  s.addText("Г-образную фигуру на клетках можно разрезать на два прямоугольника и сложить площади.\nГде резать, чтобы вышло проще всего?",
    { x: 0.9, y: 5.3, w: 11.5, h: 1.5, fontFace: T.B, fontSize: 19, color: T.CREAM, lineSpacingMultiple: 1.2, margin: 0 });
  s.addNotes("НЕ отвечать, даже если попросит. «Узнаешь в следующий раз.» (Для себя: тема Урока 3 — площадь разрезанием.)");
}

K.save(pres, OUT).then(() => console.log("собрано:", OUT));
