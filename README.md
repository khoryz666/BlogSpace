# BlogSpace

A full-stack blog project used for learning.

This is my first project, and I will write all the actual code myself. The usage of AI should only be as guidance but not giving direct answers. 

- Frontend: HTML, CSS, JavaScript (deployed on Vercel as a static site)
- Backend: Go HTTP server (running on a Raspberry Pi)
- Content: Markdown posts in 3 languages (en, zh, ms)

## Architecture

- **Frontend (Vercel)**
  - Pure HTML + CSS + JavaScript.
  - Renders:
    - A list of posts.
    - Single post pages.
  - Talks to backend using `fetch`:
    - `GET https://api.example.com/api/posts?lang=en`
    - `GET https://api.example.com/api/posts/{lang}/{slug}`

- **Backend (Raspberry Pi)**
  - Go HTTP server.
  - Reads Markdown files from `backend/content/posts/<lang>/<slug>.md`.
  - Converts Markdown to HTML.
  - Returns JSON responses for:
    - List of posts.
    - Single post content.

## API Design (Draft)

- **List posts**

  - `GET /api/posts?lang=en`
  - Example response:

 
  [
    {
      "slug": "hello-world",
      "title": "Hello World",
      "date": "2025-01-01",
      "excerpt": "Short intro text..."
    }
  ]
  - **Single post**

  - `GET /api/posts/{lang}/{slug}`
  - Example response:

 
  {
    "slug": "hello-world",
    "title": "Hello World",
    "date": "2025-01-01",
    "html": "<p>Rendered HTML from markdown...</p>"
  }
## Folder Structure (Planned)

BlogSpace/
  frontend/
    index.html      // Home page: lists posts
    post.html       // Single post page
    styles.css      // Styling for the site
    main.js         // Frontend logic
  backend/
    go.mod          // Go module definition
    main.go         // Go HTTP server
    content/
      posts/
        en/
          hello-world.md
        zh/
        ms/ 

1. **Backend (local dev on PC)**
   - Run Go server with `go run main.go`.
   - Test endpoints at `http://localhost:8080/api/...`.

2. **Frontend (local dev)**
   - Open `frontend/index.html` in the browser.
   - For now, it will show static content and some test JS.
   - Later it will call `http://localhost:8080/api/...`.

3. **Deployment (later)**
   - Frontend → Vercel (connected to this GitHub repo).
   - Backend → Raspberry Pi (Go binary running as a service).

## TODO (Learning Steps)

- [ ] Implement simple `/api/health` in Go that returns `{"status":"ok"}`.
- [ ] Make frontend call `/api/health` and show the result.
- [ ] Add Markdown posts and an API to list them.
- [ ] Add multiple languages (en, zh, fr) on both backend and frontend.
- [ ] Move backend to Raspberry Pi.
- [ ] Configure Vercel to host `frontend/`.

After that:

When you’re back, we can:
Connect frontend to /api/health in main.js so you see real data from Go.
Start implementing Markdown reading and a real /api/posts endpoint.
Plan how to move the backend to your Raspberry Pi.
For now, if you follow the steps above, you’ll have a clean, well‑commented skeleton safely stored in GitHub.

Goodnight - 20251224 0158