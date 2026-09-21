# Akhil · Personal Portfolio

A premium cinematic 3D personal portfolio website for Akhil — AI Creator · Designer · Developer.

## Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript (ES6+)
- Google Fonts: Inter + Caveat
- No build step, no framework dependency

## Run it

Just open `index.html` in any modern browser, or serve the folder with any static server:

```bash
# python
python -m http.server 8080

# or node
npx serve .
```

Then open <http://localhost:8080>.

## File structure

```
akhil-portfolio/
├── index.html        # Main page (all sections)
├── styles.css        # Cinematic 3D dark theme
├── script.js         # Loader, scroll reveals, parallax, interactions
└── assets/
    ├── hero.png          # Hero portrait
    ├── avatar.png        # About card portrait
    ├── project-mockup.png # PaperJam / MyMusic preview
    ├── favicon.png       # Browser tab icon
    └── reference.png     # (kept for reference)
```

## Features

- Cinematic 3D dark theme with electric-indigo accent
- Cinematic hero with halo ring + parallax + tilt
- Light section with 3D profile card + handwritten accents
- 4 premium "What I Do" cards with tilt-on-hover
- PaperJam Player project showcase with browser mockup
- Dark contact section with Instagram & Email cards
- Fixed glass navigation, active-section indicator, mobile hamburger
- Loader animation, reveal-on-scroll, magnetic buttons, cursor light
- Fully responsive (desktop / laptop / tablet / mobile)
- Accessibility: semantic HTML, ARIA labels, keyboard nav, reduced-motion support