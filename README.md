# Inventory Management Client – React, React Router Data APIs, Valibot and Tailwind CSS

[![CI](https://github.com/TarekM-7/inventory-management-client/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TarekM-7/inventory-management-client/actions/workflows/ci.yml)

A web app to manage the screw inventory of a manufacturing plant's warehouse, built with **React 19** and **TypeScript**. The warehouse keeper picks a screw, types a quantity and presses Enter to record an exit or an entry; the stock, the latest movements and the full history update on their own. Data loading and form submissions go through **React Router's data APIs**, requests are sent with **Axios**, every response and every form is validated with **Valibot**, and the interface is styled with **Tailwind CSS** to look like the plant's paper forms.

It is the frontend of [inventory-management-api](https://github.com/TarekM-7/inventory-management-api), a Node.js REST API with PostgreSQL. This is a practice project I built after Project 10 of the Udemy course [React de Principiante a Experto](https://www.udemy.com/course/react-de-principiante-a-experto-creando-mas-de-10-aplicaciones/): it repeats the course's React client pattern with a new domain, and fixes what the course left out, like showing errors on screen and handling the loading and empty states. The company in the header, **Troqueles Demo**, is fictional.

![The Registrar screen under a "Troqueles Demo" header with a red stripe and three tabs: on the left, four screws with their Odoo name, code and stock, the first one selected in blue, and a table of the latest entries and exits; on the right, the selected screw with the Salida and Entrada buttons, a large quantity field, an optional note and a dark "Registrar salida" button](docs/screenshot.png)

## Features

- Record a stock exit or entry in three steps: pick the screw, type the quantity, press Enter. **Exit** is selected by default, because it is the most frequent movement.
- An exit bigger than the stock is refused by the API, and the app shows "No hay suficientes piezas en existencia." under the quantity, keeping what was typed.
- After each movement, the stock and the latest movements update without reloading, and the form clears itself with the cursor ready for the next one.
- A products page with each screw's Odoo name, code and stock, and the total of pieces.
- Create and edit screws. Errors appear in Spanish next to each field, including a code that already exists (the API's `409`).
- Delete a screw after confirming inside the page, without the browser's `confirm()`. A screw that already has movements cannot be deleted, and the app says why.
- A history of every movement, newest first, 20 per page, filterable by screw. The page and the filter live in the URL, so they survive a reload and can be linked from the products page.
- Loading, empty and error states on every screen: the page dims while it loads, and a failed request shows a clear message instead of a blank screen.
- Every response from the API is validated before it is shown, and every form is validated before it is sent.
- Any route can be reloaded or opened directly, in development and in production.
- Continuous integration: every push to `main` and every pull request runs the format check, the lint and the build.
- A production setup on a Windows PC, served by PM2 next to the API and started again when the user logs in.

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) 7
- [Vite](https://vite.dev/)
- [React Router 8](https://reactrouter.com/) as a data router: loaders, actions and fetchers
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) for HTTP requests
- [Valibot](https://valibot.dev/) to validate the data at runtime
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting, and [Prettier](https://prettier.io/) for formatting
- [GitHub Actions](https://docs.github.com/actions) for continuous integration, and [PM2](https://pm2.keymetrics.io/) to serve the build in production

## How It Works

Each route declares a **loader**, which reads data before the page renders, and an **action**, which runs when one of its forms is submitted:

| Route                     | Screen          | Loader                                              | Action                                     |
| ------------------------- | --------------- | --------------------------------------------------- | ------------------------------------------ |
| `/`                       | Registrar       | `registerMovementLoader`: screws + last 8 movements | `registerMovementAction`                   |
| `/productos`              | Productos       | `getProducts`                                       | –                                          |
| `/productos/nuevo`        | Nuevo tornillo  | –                                                   | `newProductAction`                         |
| `/productos/:id/editar`   | Editar tornillo | `getProductById`                                    | `editProductAction`                        |
| `/productos/:id/eliminar` | –               | –                                                   | `deleteProductAction`, from a `useFetcher` |
| `/historial`              | Historial       | `historyLoader`: reads `?tornillo=` and `?pagina=`  | –                                          |

All the screens render inside a shared `Layout` (the header and the tabs) through `<Outlet />`, and any other URL shows a "Página no encontrada" page. The URLs are in Spanish because the warehouse keeper reads them; the code is in English.

Recording a movement goes from the form to the API and back without leaving the page:

```
<Form method="post"> ──Enter──▶ registerMovementAction
                                  ├─ Valibot checks the form: empty, not a whole number, < 1 or > 999,999?
                                  │     → return { errors } → the message appears under the field
                                  └─ MovementService → Axios → POST /api/products/:id/movements
                                        ├─ 409, not enough stock → return { errors: { quantity } }
                                        ├─ any other error → errorElement → a clear message on screen
                                        └─ 201 → return { ok, savedAt }
                                  ▼
                              the loader runs again → fresh stock and latest movements
                              <Form key={savedAt}>  → a new key draws an empty form
```

Every request from the client goes through a service, and every response through a Valibot schema:

```
loader / action
  └─ services (ProductService, MovementService)
        ├─ api.ts: an Axios instance with baseURL = VITE_API_URL
        └─ Valibot parse: the response must match its schema, or the loader fails
              ▼
        errorElement → "No se pudo conectar con la API" / "La API respondió con un error N"
```

Loaders and actions never catch errors just to log them: an error that the user cannot fix goes up to the route's `errorElement`, and only the expected ones, like a `409`, are turned into a message for a field. Loaders and actions live in their own files (`src/loaders`, `src/actions`) or are passed straight to the router, because a view file that also exports a function breaks Vite's fast refresh.

The look follows the plant's paper forms: a header with the logo, the company and an "Área / Fecha" box, a red stripe, and gray title cells. The colors and fonts are declared once in `src/index.css` with Tailwind's `@theme`. Red is only used for the brand: exits are graphite, entries are blue, and warnings are amber. Codes and quantities use a monospaced font, so `0` and `O` never look alike.

### From a commit to production

```
development folder           GitHub Actions                  production folder (~/apps)
  edit, npm run dev
  git commit, git push  ──→  npm ci
                             format:check, lint
                             npm run build
                             ✅ green           ──→  git pull, npm ci, npm run build
                                                     (pm2 serve reads the new dist/)
```

In production, the build in `dist/` is served by PM2 on port `4200` with `--spa`, so any route answers with `index.html`, and the API runs next to it on port `4100`. `VITE_API_URL` is written into the JavaScript when the app is built, so the production copy has its own `.env.local` and is built in its own folder.

## Project Structure

```
inventory-management-client/
├── .github/workflows/ci.yml   # Format check, lint and build on every push and pull request
├── docs/                      # README screenshot
├── public/                    # Favicon
├── src/
│   ├── actions/               # Route actions: create, edit and delete screws, record a movement
│   ├── assets/logo.svg        # The fictional company's logo
│   ├── components/            # Header, tabs, forms, tables, pagination, loading and error states
│   ├── layouts/Layout.tsx     # Header + tabs + <Outlet />
│   ├── loaders/               # Route loaders that need more than one request or the URL
│   ├── services/              # Axios instance and the API calls, validated with Valibot
│   ├── types/index.ts         # Valibot schemas and the types inferred from them
│   ├── utils/index.ts         # Number and date formatting for Mexico
│   ├── views/                 # One screen per route
│   ├── index.css              # Tailwind and the design colors and fonts
│   ├── main.tsx               # Entry point: mounts the router
│   └── router.tsx             # Routes, loaders, actions and error elements
├── .env.example               # VITE_API_URL
├── .prettierrc                # Same Prettier rules as the API
└── vite.config.ts             # Vite with React and Tailwind
```

## What I Learned

- **Designing before coding.** I compared three visual directions before writing any component, and picked the one that looks like the plant's paper forms: it reads as a plant tool, not a web app. Red became a brand-only color, because in an inventory red reads as "error".
- **CORS is enforced by the browser, not the API.** I added `cors` to the API with a single allowed origin. I learned that a blocked `GET` still runs on the server, only its response is hidden, that `cors()` without options allows every site, and that `localhost` and `127.0.0.1` are different origins.
- **Tools change between the course and today.** Vite's template now ships Oxlint instead of ESLint, and React Router 8 removed `react-router-dom`. Choosing ESLint in the generator left TypeScript 7 next to a plugin that only supports TypeScript 6, so I recreated the project instead of forcing the install.
- **Errors belong on the screen.** The course swallowed errors with `console.log`, so a failed request looked like an empty list. Here a service lets the error go up to the route's `errorElement`, and an action only catches what the user can fix, like a repeated code or an exit bigger than the stock.
- **Validating at runtime.** `useLoaderData() as Product[]` promises a type without checking it. A Valibot schema checks the real response, and the TypeScript type is inferred from that same schema, so they never disagree. `parse` throws for data that should never be wrong; `safeParse` returns the issues of a form, which are expected.
- **Every step should be checkable.** When I wrote a table before connecting its loader, the app broke and I could not tell if I had made a mistake. Since then each step leaves the app working: first the data (checked in the Network tab), then the screen, then the error and loading states, and one commit per step.
- **React's `key` is a reset button.** A new `key` makes React draw a component from scratch. That is how the movement form clears itself after a successful save but keeps the typed values after an error, and how the history's `<select>` follows the URL.
- **Forms are more than inputs.** The Salida and Entrada buttons only change state, so a hidden input sends the type to the action. A button without `type` inside a form submits it, so every button that only changes state is `type="button"`. `useFetcher` sends a form without leaving the page, and a `Form method="get"` puts the filter in the URL.
- **Tailwind and TypeScript do not catch everything.** A misspelled class like `felx-col`, a space inside `grid-cols-[...]` or a message copied from another field are all valid code. The only way to see them is to look at the screen, so every step ends with something to check.
- **Production is a build, not a server.** The client in production is just files. `pm2 serve --spa` serves them next to the API with the same PM2 that keeps the API alive, and without `--spa` any reload on `/productos` gives a `404`. `VITE_API_URL` is baked into the build, so changing it means building again.
- **A public repository is public forever.** I almost committed a real company's logo. Removing it later would not have been enough, because it stays in the history, so I rewrote that commit, recreated the repository, and switched to a fictional company.

## Getting Started

Requirements: [Node.js](https://nodejs.org/) 24 and the [inventory-management-api](https://github.com/TarekM-7/inventory-management-api) running locally, with `FRONTEND_URL=http://localhost:5173` in its `.env`.

1. Clone the repository and install the dependencies:

    ```bash
    git clone https://github.com/TarekM-7/inventory-management-client.git
    cd inventory-management-client
    npm install
    ```

2. Copy `.env.example` to `.env.local`. It points to the API at `http://localhost:4000`; change it if your API runs somewhere else:

    ```bash
    cp .env.example .env.local
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The app runs on `http://localhost:5173`. Open it with that exact address: the API only allows requests from `FRONTEND_URL`.

Other scripts:

```bash
npm run build          # Check the types and build the app into dist/
npm run lint           # Lint with Oxlint
npm run format         # Format the project with Prettier
npm run format:check   # Check the format without changing files
npm run preview        # Serve the build locally
```

> `VITE_API_URL` is written into the JavaScript at build time. After changing `.env.local`, restart `npm run dev` or run `npm run build` again.

### Running in production

Production runs from its own clone, next to the production API, on a Windows PC. The commands are for Git Bash; [PM2](https://pm2.keymetrics.io/) is installed once with `npm install -g pm2`.

1. In the production API's `.env`, set `FRONTEND_URL=http://localhost:4200` and restart it with `pm2 restart inventory-api`.
2. Clone the repository into its own folder and install it:

    ```bash
    mkdir -p ~/apps && cd ~/apps
    git clone https://github.com/TarekM-7/inventory-management-client.git
    cd inventory-management-client
    npm ci
    ```

3. Create its `.env.local` with the production API, and build it:

    ```bash
    echo "VITE_API_URL=http://localhost:4100" > .env.local
    npm run build
    ```

4. Serve the build with PM2, and save the process list:

    ```bash
    pm2 serve dist 4200 --spa --name inventory-client
    pm2 save
    ```

    The app runs on `http://localhost:4200`. The same `pm2-resurrect.cmd` in the Windows Startup folder that starts the API starts it again when you log in.

To update it after a push, once the CI is green:

```bash
cd ~/apps/inventory-management-client && git pull && npm ci && npm run build
```

No restart is needed: `pm2 serve` reads the files in `dist/` on every request. When a change needs a new API too, update the API first.

## What's Next

Things I want to improve, found while using the app:

- [ ] **Less flickering on repeated clicks.** Clicking a tab, a button or a page link several times in a row makes some parts of the screen flash while the data loads again.
- [ ] **A screw list that does not grow forever.** In Registrar, the "Elige el tornillo" list gets as tall as the number of screws; with many of them, it should scroll inside its own box or be searchable.
- [ ] **Long notes in "Últimos movimientos".** A long note stretches the table across the page; it should wrap or be cut with the full text available on hover.
- [ ] **Long notes in Historial.** The same problem in the history table, which also needs a cleaner layout for long notes.
- [ ] **A responsive Registrar screen.** The two columns have a fixed `640px` form, so on a smaller window or screen they do not fit. Using Tailwind's breakpoints (`md:`, `lg:`, which are media queries), the form should move below the screw list on narrow screens.
- [ ] **Softer corners.** Buttons, inputs, tabs and boxes have square corners, which makes the interface look harsh. A small border radius (Tailwind's `rounded` or `rounded-md`) on them would keep the plant-form look but make it feel less stiff.

## Acknowledgements

The React client pattern comes from the Udemy course linked above. This project applies it to a new domain, and I wrote the implementation while learning.
