# Brinley Crochets

A crochet pattern blog at **https://brinleycrochets.com**: an [Astro](https://astro.build) static site styled with Tailwind, edited through [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin`, and deployed to GitHub Pages by GitHub Actions on every push to `main`.

## For Brinley: editing the site

Go to **https://brinleycrochets.com/admin** and click **Sign In Using Access Token**. ("Sign in with GitHub" isn't set up, so use the token button.)

Each time you click **Save**, the CMS commits your change to GitHub and the website updates about a minute later.

- **New post:** go to Posts, then New Post. Add a title, date, categories, a thumbnail image, a short excerpt and the post text.
  - **YouTube videos:** under *YouTube Videos*, click Add and paste the video link (from YouTube's Share button or the address bar).
  - **Pattern PDFs:** under *Pattern PDFs*, click Add, name the pattern and upload the PDF. It shows up in a "Download the Pattern" box at the end of the post.
  - **Draft:** turn this on to save a post without showing it on the site.
- **Categories:** add, rename or delete them under *Categories*.
- **Top menu:** in *Site Settings*, under *Top Menu Categories*, choose which categories show in the menu bar and drag them into order. "All Posts" is always first.
- **About Me, tagline and social links** are also in *Site Settings*.

### One-time access setup
1. Brinley creates a free GitHub account. Todd adds her as a collaborator: repo **Settings → Collaborators → Add people**.
2. She creates a token at https://github.com/settings/personal-access-tokens/new:
   - **Repository access:** Only select repositories → `toddsampson/brinley-crochets-website`
   - **Permissions:** Contents → **Read and write**
   - **Expiration:** up to 1 year. Make a new token when it expires.
3. She pastes the token on the `/admin` sign-in screen. The browser remembers it.

## For developers

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run typecheck
```

**Local editing:** run `npm run dev`, open http://localhost:4321/admin, click **Work with Local Repository** (Chrome or Edge) and choose this folder. Changes are written straight to disk, so commit and push them yourself.

### Layout

| Path | What's there |
|---|---|
| `src/content/posts/*.md` | Blog posts. The filename becomes the URL: `/posts/<filename>/` |
| `src/content/categories/*.md` | Categories. The filename is the slug: `/category/<slug>/` |
| `src/data/site.json` | Site title, about text, social links, and the ordered `navCategories` list |
| `public/uploads/` | Images and PDFs uploaded through the admin |
| `public/admin/` | Sveltia CMS (`index.html` and `config.yml`) |
| `src/utils/posts.ts` | Post queries, pagination (12 per page) and YouTube ID parsing |

Don't add a `src/pages/admin/` route. Its build output would overwrite `public/admin/index.html`. In dev, `/admin/` is served by a small rewrite in `astro.config.mjs`.

### Domain and DNS (Cloudflare)

`public/CNAME` and the GitHub Pages custom domain are both set to `brinleycrochets.com`. In Cloudflare DNS, add these records:

| Type | Name | Content |
|---|---|---|
| A | `@` | 185.199.108.153 |
| A | `@` | 185.199.109.153 |
| A | `@` | 185.199.110.153 |
| A | `@` | 185.199.111.153 |
| CNAME | `www` | toddsampson.github.io |

Set every record to **DNS only** (grey cloud) so GitHub can issue the HTTPS certificate. Then turn on **Enforce HTTPS** under repo Settings → Pages.
