# Ahmad Rashad Mojeeb — Job Profile

A portfolio/job profile site inspired by [Active Theory](https://activetheory.net/work), built with **Next.js 14**.

## Features

- **Work** — Aesthetic project cards with gradients and tech tags (SAFAYIPAK, SportSync, Vehicle Tracking, Text-to-Icon Generator, Multimodal RAG, Academic projects)
- **Scrolling marquee** — Tags: full-stack, generative AI, web apps, etc.
- **What are you looking for?** — About me, expertise, and link to GitHub repos
- **GitHub Repos** — Fetches and displays all your public repos from [github.com/ahmadrashad1](https://github.com/ahmadrashad1?tab=repositories)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Data source

Profile content is in `lib/data.js`; GitHub repos are loaded at runtime from the GitHub API.
