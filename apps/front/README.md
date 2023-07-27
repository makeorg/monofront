# @make.org/front 
## Before starting
:guardsman: Access to make.org tech env are restricted through VPN. Check this with make.org tech team before launching these commands.

:ok_hand: Check `local.makeorg.tech` is setted in hosts

Requirements :
Please refers to [*getting started* section](../../README.md#getting-started)

## Useful docker commands
Please refers to <a href="https://docs.docker.com/engine/reference/commandline/docker/" target="_blank">Docker CLI (open in a new tab)</a> and <a href="https://docs.docker.com/compose/reference/" target="_blank">Docker Compose CLI (open in a new tab)</a> commands.

## Running dev instances

Dev mode :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=app-dev up -d
# and go to https://localhost:3000
```

Dev mode with SSR :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=app-ssr up -d
# and go to https://localhost:3000
```
> After changes, you must rebuild your app in docker container :
```bash
# get the id of the running container
$ docker ps
# launch the build script in the container
$ docker exec -it CONTAINER_ID yarn workspace @make.org/front build
# Restart the container
$ docker-compose -f docker-compose.dev.yaml up -d --profile=app-ssr restart
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
FRONT_URL=https://make.org

# Tracking
FB_PIXEL_ID=
FB_CONVERSION_TOKEN=

# Content api url
CONTENT_API_URL_SERVER_SIDE=

# Twitter
TW_PIXEL_ID=
TW_API_KEY=
TW_API_SECRET=
TW_ACCESS_TOKEN=
TW_TOKEN_SECRET=
```

## Updating packages
[Lerna Update Wizard](https://github.com/Anifacted/lerna-update-wizard) is installed to manage packages across workspaces.

```bash
$ yarn lernaupdate
```


## Specificities
### Results page
Check [RESULTS.MD](./server/staticData/RESULTS.MD).

## Accessibility page
See page: [ACCESSIBILITY.MD](../../docs/accessibility.md).

Run accessibility test: 
```bash
yarn workspace @make.org/front accessibility
```

Fix accessibility: 
```bash
yarn workspace @make.org/front accessibility:fix
```


