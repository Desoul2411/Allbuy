# Allbuy
## Структура проекта
### Base
Содержит глобальные правила "box-sizing", сброс CSS или стили для печати - всё, что должно быть задано в самом начале CSS, но еще не зависит от конкретного проекта.
- _reset.scss 
- _typography.scss   

### Abstracts
Здесь мы определяем переменные для шрифта, цветов, отступов, медиа-запросов и всего остального, что будем использовать при вёрстке.
- _variables.scss    
- _functions.scss    
- _mixins.scss      

### Elements
В основном не используя классы, мы переопределяем основные стили браузера для оформления заголовков, кнопок, ссылок, списков и т.д., благодаря чему можем быть уверены, что все компоненты в проекте будут иметь одну и ту же базу.
- _forms.scss
- _headings.scss
- _buttons.scss
- _images.scss
- _links.scss
- _lists.scss

### Components
Здесь мы разрабатываем повторяющиеся компоненты интерфейса.
- _product-card.scss
- _modal-window.scss

### Pages
Здесь будут стили для уникальных компонентов страницы.
- _home.scss
- _cart.scss
- _about.scss


### Utilities 
Папка "utilities" содержит служебные и другие полезные классы и, самое главное, состояния и модификаторы, такие как .is-active или .visually-hidden. Эти стили переопределяют стили предыдущих слоёв и часто устанавливаются через JavaScript.
- _modifiers.scss
- _states.scss

## БЭМ
### Примеры:
#### Блоки
```html
<header class="header"></header>
<form class="search-form"></form>
<div class="logo"></div>
```
#### Элементы
```html
<form class="search-form">
    <!-- Элемент `input` блока `search-form` -->
    <input class="search-form__input">
    <!-- Элемент `button` блока `search-form` -->
    <button class="search-form__button">Найти</button>
</form>
```
#### Модификаторы
```html
<button class="search-form__button--sm">Найти</button>

```

## Gulp
`gulp build` - собрать проект
`gulp dev` - сборка проекта в режиме разработки (watch + browserSync)
`gulp lint` - проверка js 
`gulp styles` - сборка/обновление только стилевых файлов
`gulp clean` - очистка public