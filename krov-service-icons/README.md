# Кров-Сервис — SVG-иконки

64 отдельных SVG для нового дизайна. Включены все основные символы из макета и состояния интерфейса: дом, лист, карта, площадь, спальни, хранение, коммуникации, сравнение, избранное, Telegram, фильтры, калькулятор, документы, стройка, стрелки и меню.

Иконки нарисованы заново в SVG в стиле макета. Это согласованный векторный набор, а не точная трассировка каждого пикселя сгенерированной картинки. Символ home — интерфейсная иконка, не замена официального логотипа. Telegram — упрощённый символ для кнопки связи.

Параметры: viewBox="0 0 24 24", stroke-width="1.75", fill="none", stroke="currentColor", stroke-linecap="round", stroke-linejoin="round". Иконки масштабируются без потери качества. Размер в интерфейсе:20px обычно,16px в компактных строках,24px в блоках,44px минимальная область нажатия у отдельной кнопки.

## Файлы

- icons/ —64 отдельных файла.
- krov-service-sprite.svg —общий спрайт, id символов начинаются с ks-.
- preview.html —просмотр всего набора и переключение цвета, работает локально.
- preview.svg —векторный обзор всего набора.
- manifest.json —названия, подписи и ids для Cursor.

## Использование спрайта на сайте

Положи krov-service-sprite.svg в public/icons/. Пример:

```html
<svg class="icon" aria-hidden="true" focusable="false">
  <use href="/icons/krov-service-sprite.svg#ks-home"></use>
</svg>
```

```css
.icon { width:20px; height:20px; flex:none; color:#203C32; }
.icon--orange { color:#F47B20; }
.icon--white { color:#FFFFFF; }
```

Если используешь внешний спрайт, открывай сайт через http/https; ограничения file:// могут мешать внешним use. В preview.html символы встроены и работают локально.

## Отдельные SVG

```html
<img src="/icons/home.svg" width="24" height="24" alt="Дом">
```

Для смены цвета через CSS вставляй SVG inline или используй спрайт. currentColor внутри внешнего SVG, подключённого через img, не наследует цвет родительской страницы. Через img по умолчанию иконка будет чёрной.

## React

```jsx
function Icon({name, size=20, className=""}) {
  return <svg width={size} height={size} className={className}
    aria-hidden="true" focusable="false">
    <use href={`/icons/krov-service-sprite.svg#ks-${name}`} />
  </svg>;
}
// <button aria-label="Добавить в избранное"><Icon name="heart" /></button>
```

Кнопка только с иконкой должна иметь доступное название. Если текст подписи уже рядом, SVG делать aria-hidden. Для важного самостоятельного SVG использовать role="img" и aria-label. Статус нельзя передавать одним цветом.

## Cursor

Используй эти файлы вместо emoji и случайных библиотек. Сохраняй линию1.75 на сетке24, не добавляй тени непосредственно к glyph. Круглые фоновые кнопки, оранжевые плашки и рамки создавай CSS вокруг SVG. Параметры сайта возьми из ранее выданного krov-service-cursor-prompt.md.
