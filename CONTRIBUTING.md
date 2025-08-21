# Contributing

## CSS Naming Convention
This project uses the **Block–Element–Modifier (BEM)** methodology for all CSS classes.

### Rules
- **Block**: standalone component name (`block`).
- **Element**: part of a block, separated by two underscores (`block__element`).
- **Modifier**: variation of a block or element, separated by two dashes (`block--modifier` or `block__element--modifier`).
- Use lowercase letters and hyphens. Avoid abbreviations that are not obvious.

### Examples
```html
<!-- Block with elements -->
<div class="search-bar">
  <form class="search-bar__form">
    <input class="search-bar__input" type="search" />
    <button class="search-bar__submit" type="submit">Search</button>
  </form>
</div>

<!-- Block with element and modifier -->
<ul class="search-results__filters">
  <li class="search-results__filter search-results__filter--active">All</li>
</ul>
```

Following these conventions keeps styles predictable and easy to maintain. Please update existing code to match the BEM pattern when you touch related files.
