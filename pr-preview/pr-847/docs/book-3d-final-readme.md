# 📘 3D Book Viewer Component (CodyFrame + Vanilla JS)

An interactive, responsive, animated book mockup that uses **one single spread image** and simulates front/spine/back views with rotation and lighting.

---

## ✅ Features

- Manual drag-to-rotate
- Buttons to rotate front/back
- Dynamic lighting angle as you rotate
- Subtle bottom gradient shadows (ambient + grounded)
- Mobile + touch support

---

## 🗂 Folder Structure

```
scss/components/_book-3d.scss
js/book-3d-viewer.js
partials/book-3d.html
assets/books/gameon/gameonspread.jpg
index.html
```

---

## 🛠 How to Use

1. **Image**
   Place your full wrap image (6” back + 0.58” spine + 6” front) at:
   ```
   assets/books/gameon/gameonspread.jpg
   ```
   Recommended size: **1258px width**

2. **SCSS**
   Import the SCSS file in your main style sheet:
   ```scss
   @import 'components/book-3d';
   ```

3. **JavaScript**
   Add to your `<head>` or end of `<body>`:
   ```html
   <script type="module" src="js/book-3d-viewer.js"></script>
   ```

4. **HTML Partial**
   Drop the content of `book-3d.html` where you want the book to appear.

---

## 🧠 Advanced
- Modify lighting by adjusting `--light-angle` in JS

---

## 🧪 Tested In
- Chrome, Firefox, Safari
- iOS Safari, Android Chrome
- Responsive from mobile to desktop

---

## 🆓 License
MIT — free for personal and commercial use.
No attribution required.

Built with ❤️ by Daren Prince / CrownCode.ai
