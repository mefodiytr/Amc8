# Запуск на GitHub + Claude Code

Этот репозиторий — самодостаточный конвейер материалов AMC 8. Кладётся на GitHub, открывается в Claude Code, дальше CC генерит уроки по `syllabus-plan.md`.

## 1. Залить на GitHub

Репозиторий уже инициализирован (есть первый коммит). Создай пустой репозиторий на GitHub (без README), затем:

```bash
git remote add origin https://github.com/<ТВОЙ_ЛОГИН>/amc8-pipeline.git
git branch -M main
git push -u origin main
```

Если хочешь начать историю с нуля — удали папку `.git` и сделай `git init` заново.

## 2. Открыть в Claude Code

```bash
git clone https://github.com/<ТВОЙ_ЛОГИН>/amc8-pipeline.git
cd amc8-pipeline
```

Открой папку в Claude Code — он сам подхватит `CLAUDE.md` в корне (это его инструкция). Установи зависимости:

```bash
pip install python-pptx        # проверялка деки  (Debian: + --break-system-packages)
npm install                    # pptxgenjs для .pptx
# для OCR буклетов (шаг 00): Debian — apt-get install poppler-utils tesseract-ocr; Windows — poppler+tesseract в PATH
```

## 3. Запустить (харнесс, по одному уроку за раз)

Проще всего — кинуть в Claude Code промт-вводную `HARNESS.md`: он сам развернёт урок, прогонит шаги, самопроверится и остановится на картинках. Вручную то же самое:

Расписание уже посчитано в `syllabus.txt` (старт вс 19.07.2026; 1/нед летом, 2/нед с сентября).

Для урока №N из плана:

```bash
# пример: урок 1 — Подсчёт-1, проход 1
python scaffold.py modul-a-podschet urok-01-podschet-1-p1
```

Затем в Claude Code скорми промты по порядку, каждый раз передавая строку урока из плана (проход, полоса сложности, станок):

```
_prompts/02-lesson-core.md
_prompts/03-tasks.md
_prompts/04-qc.md          ⛔ шлюз: без него урок не готов
_prompts/05-slide-texts.md
_prompts/06-image-prompts.md
_prompts/07-build-deck.md
```

Картинки генеришь по `06-image-prompts.md`, кладёшь в `<урок>/img/`, затем `node deck.js`.

**По одному за раз** (как решили): собрал урок → провёл → собрал следующий. Не гони все 36 сразу — так проще править и держать качество.

## Ветка на урок (опционально)

Удобно вести каждый урок в своей ветке:
```bash
git checkout -b urok-01
# ... сгенерировали, проверили ...
git add -A && git commit -m "Урок 01: Подсчёт-1 (проход 1)"
git push -u origin urok-01
```

## Что где

- `CLAUDE.md` — мозг: правила + карта конвейера (CC читает первым).
- `syllabus-plan.md` + `syllabus.txt` — календарный план на 36 уроков.
- `_system/` — правила (скелет, станок, концовка, стиль, QC, Zoom).
- `_prompts/` — команды CC по порядку (00 приёмник PDF, 01…07).
- `_templates/`, `lib/deckkit.js`, `tools/` — заготовки, библиотека дек, скрипты.
- `examples/delo-3/` — эталонный собранный урок.
