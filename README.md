# vanilla-spa

## Description

A fun vanilla TypeScript project that mimics a file explorer for a mock file system. The project is implemented using TypeScript and doesn't have any runtime dependencies. It only relies on a few development-time dependencies for bundling, serving, and testing.

The project UI is designed to be intuitive and user-friendly, allowing users to navigate through the mock file system with ease. The UI has two main panels, the sidebar for navigation, and the main table for viewing the contents of the active folder.

The sidebar contains the folder tree and has collapse,expand and selection capabilities.

The main section contains a simple HTML table that shows a row for each entry in the active folder. The folder rows are links so clicking on them selects the clicked folder as active. The table is sortable by clicking on the column headers.

## Demo

The project is deployed here https://hmersin.github.io/vanilla-spa/

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

### Technical Details

The data is provided as a simple json file with nested files/folders (see below).

```
interface ITreeNode {
  type: NodeType;
  name: string;
  modified: string; // timestamp in epoch format
  size: number;
  children?: ITreeNode[];
}
```

### Bundler

Frontend uses [vitejs](https://vitejs.dev/) bundler for its performance. The repo uses [vitest](https://vitest.dev/) for unit tests and cypressjs for e2e tests.

### State Manamgement

The project doesn't require a fully fledged state management system as it only has two values to describe the state:

- The actively selected folder: The source of truth is the url where the active hash shows the currently selected folder, so the app reacts to hash-change events.

- Table sortKey and sortDirection: We keep the sort state in the class variables, and each hash-change resets the values.

## Running locally

Make sure you have nodejs >= v18.14.2 installed on your computer.

to check your node version, use

```
node -v
```

Clone the repo to local

```
git clone git@github.com:hmersin/vanilla-spa.git

cd vanilla-spa
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
