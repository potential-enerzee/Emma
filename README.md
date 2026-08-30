# An interactive love story

A playful, mobile-friendly romantic reveal built with plain HTML, CSS, and JavaScript. It opens with an animated hand-catching moment and an “uppies” video, followed by swipeable cards, nested photo scratches, a secret reveal, three rounds of “Crack the code, 🍯”, a mini quiz, an adventure-bag packing game, a press-and-hold unlock, and a final celebration.

## Make it yours

Open `config.js` and change:

- `herName` and `yourName`
- the opening message shown before and after she catches your hand
- the four reasons/memories
- the hidden scratch-card message
- the three “Crack the code” answers, clues, and delayed hint
- the quiz questions and answers
- the final question and success message

No other file needs to be edited for normal customization.

## Preview it locally

You can double-click `index.html`, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

1. Create a new repository on GitHub.
2. Upload the web files and optimized media in this folder to the repository's main branch.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then click **Save**.

GitHub will show the public link after a minute or two. Because the site has no build step or dependencies, it works directly on GitHub Pages.

## Files

- `index.html` — page structure
- `styles.css` — layout, colors, and animation
- `config.js` — all personal text
- `script.js` — swipe, scratch, Wordle, packing, quiz, hold, and celebration behavior
- `cat-dancing-cat.gif` — dancing celebration shown after P and E come together
- `videos/uppies.mp4` — browser-ready video shown after the opening catch
- `videos/potential-energy.mp4` — browser-ready video in the “Potential Energy” memory
- `videos/energy-action.mp4` — muted looping “energy in motion” video
- `monkey-laught.mp4` — looping monkey-laugh reward after the final word is guessed
- `images/web/` — metadata-free, optimized photos used in the “Our laugh” memory
- `images/web/little-things-*.jpg` — optimized photos used in “The little things” reel
- `images/web/simply-us-*.jpg` — ten optimized photos used across the four nested scratch reveals

Original phone videos and photos are intentionally ignored by Git because they may contain private device or location metadata. Publish the `.mp4` and the JPG files inside `images/web`, which have had that metadata removed.
