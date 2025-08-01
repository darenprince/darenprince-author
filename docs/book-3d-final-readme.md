# 📘 3D Book Viewer Component (CodyFrame + Vanilla JS)

An interactive, responsive, animated book mockup that uses **one single spread image** and simulates front/spine/back views with rotation, lighting, and zoom.

---

## ✅ Features

- Manual drag-to-rotate with smooth inertia
- Buttons to toggle between front/back
- Dynamic lighting angle as you rotate
- Hover tilt animation
- Subtle bottom gradient shadows (ambient + grounded)
- Auto-spin on idle (after 3s)
- Zoom modal with close button + ESC support
- Mobile + touch support

---

## 🗂 Folder Structure

```
scss/components/_book-3d.scss
js/book-3d-inertia-light-slowspin.js
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
   <script type="module" src="js/book-3d-inertia-light-slowspin.js"></script>
   ```

4. **HTML Partial**  
   Drop the content of `book-3d.html` where you want the book to appear.

---

## 🧠 Advanced

- Modify lighting by adjusting `--light-angle` in JS
- Tune inertia in `book-3d-inertia-light-slowspin.js` (`velocity *= 0.93`)
- Adjust hover tilt angle or remove idle spin
- Replace zoom modal with full-page view if needed

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