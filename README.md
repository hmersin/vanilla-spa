# file-system-explorer

A fun vanilla typescript SPA app that mimics a file explorer. For its performance and modern approach we use https://vitejs.dev/ as the bundler and https://vitest.dev/ for unit tests. We also use cypressjs for e2e tests.

A deployed version of this file can be found here https://hmersin.github.io/vanilla-spa/


## Features

- Vanilla JS with minimum dependencies
- Two pane layout.
- Left pane will display an expandable folder tree.
- Right panel will display the contens of the selected folder.
- Accessiblity support via ARIA conventions
- Simple expressjs backend for providing the initial data
- Unit tests
- Cypress tests
- Client-side column-based sorting
- Dark mode support
- Collapse/Expand functionality with mouse-click and keyboard-arrow-press events

### Todo 

- Implement responsive design so we can support mobile devices

## Running locally

Clone the repo to local

```
git clone git@github.com:hmersin/file-system-explorer.git

cd file-system-explorer
```

```
npm ci
```

For development purposes, we run backend and the frontend dev-server in the same express process

```
npm run dev
```

The app will run on port 3000 and viewable at http://localhost:3000

## Running unit tests

```
npm run test
```

## Running cypress tests

Cypress tests will run against a running app, so you need to run the app in one terminal session and run the following command in the second terminal session

```
npm run e2e:ci
```
