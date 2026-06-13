# Промт 0 — Инициализация (`0-init`)

**Запускается:** один раз, в самом начале.
**Читает:** план фабрики.
**Делает:** создаёт скелет `amc8/`, пишет файлы `_system/` и `_system/shablony/`.
**Выход:** каркас фабрики (этот слой).

---

## Задача

Создай дерево:

```
amc8/
├── _system/
│   ├── CLAUDE.md
│   ├── methodika.md
│   ├── profil-uchenicy.md
│   ├── format-amc8.md
│   ├── stil-kartinok.md
│   └── shablony/{shablon-uroka,shablon-zadach,shablon-prezentacii,shablon-kartinok}.md
└── _prompts/{0..7}-*.md
```

## Источники содержимого

- `CLAUDE.md`, `methodika.md`, `profil-uchenicy.md`, `format-amc8.md` ← базовый промт из
  `amc8_promty.md` (разнесён по файлам).
- `stil-kartinok.md` ← §7 плана + якорь из `amc8_bob_image_promty.md`.
- `shablony/*` ← формат эталонных файлов (`amc8_bob_slides.md`, `amc8_bob_image_promty.md`).

## Если референсных файлов нет

Синтезируй содержимое из плана фабрики, помечай такие места как «болванка / уточнить по
референсу». Когда настоящие `amc8_promty.md` / файлы Боба будут подложены — синхронизируй.

## Готово, когда

Все файлы `_system/` существуют и непротиворечивы. Дальше — `1-dekompoziciya-modulya`.
