# 20 · Стиль и персонаж для картинок (GPT Image)

Единая визуальная система «Академия Чисел» на все модули. Проверена на реальной генерации. Вставляй **оба блока** в каждый промт без изменений; ниже — только сцену.

**Три правила поверх всего:**
1. **Математика — вектором, не картинкой.** Сетки, фигуры, диаграммы, доски рисуются кодом в деке (`lib/deckkit.js`). Картинка несёт эмоцию и сюжет. В картинке НЕТ математического содержания.
2. **В кадре ни одного слова.** Русский текст модель рисует с ошибками. Подписи накладываются поверх при сборке деки. В сцене оставляй чистую **safe-зону** под текст.
3. **Промты — на английском** (модель точнее держит композицию). Скачивать кнопкой, не скриншотить. 16:9, максимальное разрешение.

---

## STYLE LOCK v2

```text
STYLE LOCK — "Academy of Numbers"

Art style: cinematic painterly anime-style illustration, semi-realistic, high production value. Rich glossy rendering, dramatic volumetric lighting, warm golden bloom and glow. Expressive large eyes, appealing stylized character art. NOT flat vector, NOT 3D render, NOT photorealistic.

Palette (strict): deep navy / midnight indigo background, warm glowing amber-gold as the single dominant accent, small cool teal highlights (stained glass, gems), cream-white for cloth. Gold is the "clue" color — it always marks what matters.

Signature frame: an ornate golden filigree border with decorative corner flourishes framing the whole image, like an illuminated storybook page. Present in every image of this series.

Signature motifs: glowing golden numerals with soft bloom; a brass wheel engraved with the digits 0–9; a brass magnifying glass; a cork evidence board strung with red thread; ribbons of golden light curling through the air; drifting gold sparks.

Mood: fairytale detective mystery inside a magical academy at night. Warm, wondrous, inviting — never grim.

Age-appropriate: the heroine is a young teenage student. Modest academy clothing, athletic build, no sexualization.

Avoid: any existing franchise character or logo; watermarks; letters, words, or written text of any kind; distorted lettering; gore; money or dollar signs; flat vector look; muddy dark noir.
```

## CHARACTER LOCK — героиня «Дека»

```text
CHARACTER — "Deka", the student-detective of the Academy of Numbers.

Appearance: a young teenage girl with warm tan skin and light freckles across her nose. Large expressive amber-brown eyes. Black hair with one bold golden-blonde streak in her front fringe, worn in a high ponytail with a long braid falling over her shoulder, held by a gold band.

Outfit: a navy-blue detective cloak with a high collar, gold embroidered trim and a warm tan-gold lining that flares when she moves. Beneath it: a high-collar cream-white blouse with ruffled cuffs, a navy pleated skirt, dark leggings, and cream lace-up boots she can fight in. A brown leather utility belt hung with small golden digit charms. A round golden compass-and-magnifier pendant on a chain at her throat.

Character: athletic, poised, sharp, curious, a little mischievous. Trained in martial arts and gymnastics — she moves like it. She solves the case herself; she is never the one being rescued.
```

---

## Как строится промт сцены

```
[STYLE LOCK v2]
[CHARACTER LOCK]           ← опустить, если в сцене нет героини (эмблемы, паттерны)

<описание сцены: что делает Дека, метафора приёма, обстановка>

Composition: <где героиня>. Keep the <зона> calm for text overlay.
No text, no letters, no digits.
16:9.                       ← или 1:1 для эмблемы
```

**Сколько кадров на урок:** до 10. Типовой набор для урока: обложка-загадка · завязка (боль наивного пути) · поворотный момент · метафора приёма (главный кадр, 4–6 попыток) · маскировка · граница · финал (одна на арене) · эмблема приёма (1:1, в тетрадь) · крючок. Плюс, при желании, фон-паттерн.

**Safe-зоны:** держи одну из третей кадра спокойной и тёмной. При сборке деки текст ложится именно туда. Куда встала героиня по факту — проверяется на готовом кадре (модель иногда зеркалит), и панель кладётся напротив.

## Что НЕ генерировать

Сетки замощения, вложенные квадраты, координатные плоскости, графики, шахматные доски, любые точные чертежи — только вектором в деке. Схемы из официальных задач AMC (маршруты, диаграммы) — брать скриншотом из буклета, не рисовать.
