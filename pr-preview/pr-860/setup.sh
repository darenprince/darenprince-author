#!/bin/bash

# === Root-Level Directories ===
mkdir -p components forms layout tokens utils
mkdir -p scss js test docs downloads member assets

# === Assets Subfolders ===
mkdir -p assets/brand assets/fonts assets/images assets/icons
mkdir -p assets/logos assets/screenshots

# === Downloads Subfolders ===
mkdir -p downloads/audio-teasers downloads/exclusive downloads/ebooks downloads/guides

# === SCSS Files and Structure ===
mkdir -p scss/base scss/utilities scss/components scss/themes scss/layout

# === Initial Files ===
touch index.html components.html
touch test/test.html
touch test/layout-debug.html
touch member/index.html

# === SCSS Files ===
touch scss/styles.scss
touch scss/base/_reset.scss
touch scss/base/_typography.scss
touch scss/base/_variables.scss
touch scss/base/_mixins.scss
touch scss/base/_globals.scss
touch scss/components/_buttons.scss
touch scss/components/_forms.scss
touch scss/layout/_grid.scss
touch scss/themes/_dark.scss
touch scss/themes/_light.scss
touch scss/utilities/_helpers.scss
touch scss/tokens/_colors.scss

# === Gitignore File ===
cat <<EOF > .gitignore
node_modules
dist
.env
.DS_Store
*.log
*.tmp
EOF

echo "✅ Full project structure scaffolded successfully."
