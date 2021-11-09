# Getting Started with Create React App

Requirements :

- Docker
- node
- yarn

## Running dev instances

Dev mode :

```bash
$ docker-compose -f docker-compose.dev.yaml up -d app_make_dev
# and go to https://localhost:3000
```

Dev mode with SSR :

```bash
$ docker-compose -f docker-compose.dev.yaml up -d app_make_ssr
# and go to https://localhost:3000
```

Running cypress tests on local :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=app-test up
# when api mock and front are running, start cypress on host :
$ yarn cypress:front

```

## Running functional tests

Start test environment

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=front-test up -d
```

Run all tests
```bash
$ yarn cypress:front:run
```

or open Cypress
```bash
$ yarn cypress:front:open
```

Configure Cypress : [cypress.json](./cypress.json)

## Environment variables for production

```bash
# .env file

# PORT
PORT=8000

# API url
API_URL_SERVER_SIDE=https://api.make.org
API_URL_CLIENT_SIDE=https://api.make.org

# Front url
FRONT_URL=https://widget.make.org
```
