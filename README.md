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
GitHub's fine-grained tokens can only reach repos owned by the token creator's account (or an org). They can't reach someone else's personal repo you're only a collaborator on, so **Todd creates the token**:

1. Signed in as `toddsampson`, open https://github.com/settings/personal-access-tokens/new. (Or go to Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.)
2. **Token name:** e.g. `Brinley CMS`. **Expiration:** up to 1 year. **Resource owner:** `toddsampson`.
3. **Repository access:** *Only select repositories* → `brinley-crochets-website`.
4. **Permissions → Repository permissions → Contents:** **Read and write**. Metadata (read-only) is added automatically. Leave everything else as *No access*.
5. Click **Generate token**, copy it (it's only shown once), and give it to Brinley privately.
6. She pastes it on the `/admin` sign-in screen. Her browser remembers it.

Her edits are committed as Todd. When the token expires, generate a new one the same way. To cut off access, delete the token on the same settings page.

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
