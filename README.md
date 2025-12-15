# Streaming Website

A frontend-focused streaming web application that aggregates and displays live animal cam streams from multiple sources.
Built as a learning project to explore React + TypeScript architecture, client-side routing, and handling unreliable external data in a clean, user-friendly UI.

**Live Demo:** https://stream-app-568744696610.us-west1.run.app/

---

## Features

- Displays a curated list of live animal camera streams
- Client-side routing for navigating stream views
- Responsive layout optimized for desktop and mobile
- Graceful loading and fallback states when data is unavailable

---

## Tech Stack

### Frontend
- **TypeScript**
- **React**
- **React Router**
- **CSS**

### Data & Backend Support
- **Python** (web scraping)
- **BeautifulSoup**
- **SQL**
- **Bun** (runtime)

---

## Future Improvements

- Stream filtering and search functionality
- Pagination
- Improved error messaging and retry behavior for failed data loads
- Better accessibility support
- Performance optimizations for large stream lists
- Automated tests

---

## Running Locally

```bash
git clone https://github.com/pomimon/streaming-website.git
cd streaming-website
bun install
bun run dev
