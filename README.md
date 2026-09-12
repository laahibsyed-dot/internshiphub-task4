# InternshipHub — Full Stack Development TASK-4

A beginner-friendly, production-minded internship portal built as the final capstone.

## Tech stack

- Frontend: semantic HTML5, CSS3, vanilla JavaScript
- Backend: Node.js + Express
- Storage: JSON file for demo applications
- No external UI framework or database is required

## What was improved for TASK-4

### 1. Complete user journey
- Responsive landing page
- Search by title, company, location, domain, type, and skills
- Domain and work-type filters
- Internship detail modal
- Save/unsave roles with browser storage
- Application form with client + server validation
- Success, loading, empty, and error states
- Mobile navigation
- Keyboard-friendly modal and Escape-to-close

### 2. Production engineering
- `GET /api/health` health-check endpoint
- `GET /api/internships` data endpoint
- `POST /api/applications` validated application endpoint
- Structured JSON logging with timestamps and log levels
- Request size limit
- Safe static-file serving
- Environment-aware port (`PORT`)
- No credentials committed to source control

### 3. Accessibility
- Semantic landmarks and heading hierarchy
- Skip-to-content link
- Labels associated with form controls
- `aria-live` status updates
- `role="alert"` for failures
- Accessible mobile menu state
- Accessible buttons and modal
- Visible focus indicators
- Reduced-motion support

### 4. Performance
- No external libraries on the frontend
- Deferred JavaScript
- Small static assets
- DOM fragments used for card rendering
- No unnecessary page reloads
- API data fetched once and filtered client-side

## Run locally

Requires Node.js 18+.

```bash
npm install
npm start
```

Open:

`http://localhost:3000`

Development mode:

```bash
npm run dev
```

## API checks

Health:

`GET /api/health`

Internships:

`GET /api/internships`

Application:

`POST /api/applications`

Example body:

```json
{
  "internshipId": 1,
  "name": "Demo User",
  "email": "demo@example.com"
}
```

## Regression / acceptance checklist

- [x] Landing page loads
- [x] Search filters results
- [x] Domain filter works
- [x] Work-type filter works
- [x] Clear filters resets the list
- [x] Internship modal opens and closes
- [x] Escape closes modal
- [x] Save role persists in browser
- [x] Application validates name/email
- [x] API rejects invalid applications
- [x] Successful application is stored in demo JSON
- [x] API health endpoint returns `status: ok`
- [x] Loading state is shown while fetching
- [x] Empty state is shown for zero matches
- [x] API error state has a retry action
- [x] Mobile navigation works
- [x] Keyboard focus indicators are visible
- [x] Reduced-motion preference is respected

## Accessibility / performance / security verification

Recommended final checks before submission:

1. Open browser DevTools and test at 360px, 768px, and desktop widths.
2. Run Lighthouse for Performance, Accessibility, Best Practices, and SEO.
3. Use keyboard only: Tab, Shift+Tab, Enter, Space, Escape.
4. Test invalid and valid application inputs.
5. Visit `/api/health` directly.
6. Inspect server terminal logs after loading the page and submitting an application.
7. Confirm no `.env`, `node_modules`, or application data is committed.

## Engineering decisions

**Why vanilla JavaScript?**  
The project is an internship capstone and the small UI does not need a framework. Vanilla JS keeps the dependency surface small and makes the DOM/API flow easy to explain.

**Why an API instead of hard-coded frontend data?**  
The portal now has a clear frontend/backend boundary. The UI consumes `/api/internships`, while applications go through a server-side validation endpoint.

**Why JSON storage?**  
It is intentionally simple for a beginner capstone and local demonstration. A production deployment should replace it with PostgreSQL/MySQL or another managed database.

**Why health checks and structured logs?**  
They make failures easier to detect and explain. `/api/health` gives a simple operational signal, while JSON logs provide timestamped events that can be searched in a hosting platform.

## Deployment

Deploy the Node/Express project to a Node-compatible host such as Render, Railway, Fly.io, or another platform that supports long-running Node services.

Set the start command to:

```bash
npm start
```

The server reads the hosting platform's `PORT` environment variable.

## Submission

Use the deployed application URL as the single proof link. Keep the repository public or view-only so the evaluator can inspect:

- application
- README
- source code
- API endpoints
- engineering decisions

Optional: record a 2-minute walkthrough showing search, filters, details, save, application submission, mobile layout, and `/api/health`.
