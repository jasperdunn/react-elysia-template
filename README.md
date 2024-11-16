# React Client + Elysia Server template

[Elysia](https://elysiajs.com) with [Eden](https://elysiajs.com/eden/overview.html) allows us to have a fully typed client api within [React](https://react.dev).
This template uses [Biome](https://biomejs.dev) instead of prettier and eslint and `bun` instead of `npm`.

Refresh the page to see the random number persist after clicking the button.

## Setup

- Bun - https://bun.sh/docs/installation

## Commands

### Install deps across both client and server

```sh
bun i
```

### Start the client and server

```sh
bun dev
```

### Add or remove a package

```sh
cd apps/<client | server>
bun <add | remove> <package-name>
```

### Build the client and server for production

```sh
bun run build
```
