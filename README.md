# CT Movers

Website for our crew. Party setups, moving help, yard work, odd jobs.

It's a single page of plain HTML, CSS, and JavaScript. No build step, no frameworks, nothing to install. Open `index.html` in a browser and it works.

```
index.html       the whole site
css/styles.css   all the styling
js/main.js       mobile menu, photo placeholders, the quote form
img/             put photos here (see img/README.md for filenames)
```

## Before you publish: the edit checklist

Everything you need to change is marked with `EDIT ME` in `index.html`. Search for it. Here's the list:

1. **Phone number.** Search for `12035550123` and `555-0123` and replace every one with your real number. The first is the link format (digits only, starts with 1), the second is what people see.
2. **Email.** Replace `hello@example.com` in `index.html` and at the top of `js/main.js`.
3. **Instagram.** Replace `yourhandle` and `instagram.com/yourhandle`, or delete that `<li>` if you don't have one.
4. **Your rate.** The pricing card says `$25/hr per person` with a 2-hour minimum. Change the number and the "$100" example to match.
5. **Your town.** The FAQ "How far will you travel?" and the "Based in Connecticut" line in the contact section. Name the actual towns, it helps with Google.
6. **The crew.** Names, grades, one-liners in the "Meet the crew" section. Copy and paste a card to add a person, delete one to remove.
7. **Reviews.** The three dashed cards are placeholders. Replace with real quotes from real customers, or delete the whole `<section id="reviews">` until you have some.
8. **Photos.** See below.

## Adding photos

Drop image files into `img/` with these exact names and they show up automatically. Until a file exists, the site shows a clean "photo coming soon" placeholder, so nothing looks broken.

| File | Where it shows | Best shape |
|---|---|---|
| `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` | The three polaroids at the top | Landscape, 4:3 |
| `job-1.jpg` … `job-6.jpg` | "Recent jobs" gallery | Mixed. `job-1` is tall, `job-5` is wide, the rest are square-ish |
| `crew-1.jpg` … `crew-4.jpg` | Crew cards | Square, face centered |
| `og-image.jpg` | Preview when someone texts the link | 1200×630 |

Keep them under ~400 KB each so the page loads fast on phones. [Squoosh](https://squoosh.app) is a free tool for that. Also update the `alt` text and `data-label` on each image in `index.html` so they describe the actual photo.

## Making the form actually send

The quote form works two ways:

- **Out of the box:** it opens the visitor's email app with everything pre-filled. Works, but a little clunky on some phones.
- **Better:** sign up at [formspree.io](https://formspree.io) (free tier is fine), create a form, and paste the endpoint URL into `FORM_ENDPOINT` at the top of `js/main.js`. Submissions then land in your inbox directly.

## Putting it online (free)

The easiest route is GitHub Pages:

1. Push this repo to GitHub (already done if you're reading this there).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**, pick your main branch and the `/ (root)` folder, hit Save.
4. A minute later the site is live at `https://<your-username>.github.io/CTMovers/`.

If you want a real domain later (like `ctmovers.com`), buy one and point it at GitHub Pages under the same Settings → Pages screen. Namecheap and Cloudflare are both fine for that.

## Working on it locally

Open `index.html` in a browser. That's it. If you want live reload while editing, run any static server, e.g. `npx serve .` or `python3 -m http.server`.
