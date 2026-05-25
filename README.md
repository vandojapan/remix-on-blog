# Route Notes

React Router v7 Framework Mode と Vite で作った JavaScript ブログサイトです。

## Features

- React Router v7 Framework Mode
- Vite
- JavaScript / JSX
- CSS Modules
- Responsive layout
- Dark mode toggle
- Resource route API and `fetch()` data loading
- Loading indicator, 404 page, and error boundary

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deploying to Cloudflare Pages

Deploy from this directory:

```bash
npm run deploy
```

For Cloudflare Pages Git integration, use these settings:

- Build command: `npm run build`
- Build output directory: `build/client`

## Routes

- `/`
- `/blog`
- `/blog/:id`
- `/api/posts`
- `/api/posts/:id`

## microCMS

The server API routes can read posts from microCMS when these environment variables are set:

- `MICROCMS_API_KEY`
- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_ENDPOINT` defaults to `blogs`

On Cloudflare Pages, set `MICROCMS_API_KEY` as an environment variable. Keep it server-side only; the app reads it from resource routes and never exposes it to client code.

## Styling

Styles are split into global CSS variables in `app/app.css` and component/page-level CSS Modules.
