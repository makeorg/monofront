# @make.org/widget

- Widget integration: [./docs/integration.md](./docs/integration.md).

## Before starting

:guardsman: Access to make.org tech env are restricted through VPN. Check this with make.org tech team before launching these commands.

:ok_hand: Check `local.makeorg.tech` is setted in hosts

Requirements :
Please refers to [_getting started_ section](../../README.md#getting-started)

## Useful docker commands

Please refers to <a href="https://docs.docker.com/engine/reference/commandline/docker/" target="_blank">Docker CLI (open in a new tab)</a> and <a href="https://docs.docker.com/compose/reference/" target="_blank">Docker Compose CLI (open in a new tab)</a> commands.

## Running dev instances

Dev mode :

```bash
$ docker-compose -f docker-compose.dev.yaml up -d --profile=widget-dev up -d
# and go to https://localhost:3000
# or go to https://local.makeorg.tech:3000/demo?WIDGET_PARAMS (iframe demo)
```

Dev mode with SSR :

```bash
$ docker-compose -f docker-compose.dev.yaml up -d --profile=widget-ssr up -d
# and go to https://localhost:3000
# or go to https://local.makeorg.tech:3000/demo?WIDGET_PARAMS (iframe demo)
```

> After changes, you must rebuild your app in docker container :

```bash
# get the id of the running container
$ docker ps
# launch the build script in the container
$ docker exec -it CONTAINER_ID yarn workspace @make.org/widget build
# Restart the container
$ docker-compose -f docker-compose.dev.yaml up -d --profile=widget-ssr restart
```

## Running functional tests

Start test environment

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=widget-test up -d
```

Run all tests

```bash
$ yarn cypress:widget:run
```

or open Cypress

```bash
$ yarn cypress:widget:open
```

Configure Cypress : [cypress.json](./cypress.json)

## Environment variables for production

See: [./.env.local](./.env.local)

## Running controversial and popular sequences in Dev mode

In Dev mode, update sequenceKind param in initDevState in :

```bash
Apps/widget/initDevState
```

with corresponding param :

```bash
standard / consensus / controversy
```

## i18n

Check translations

```bash
$ yarn workspace @make.org/widget translation
```

List unused keys in translation files

```bash
$ yarn workspace @make.org/widget  translation:unused-keys -d ./i18n -l fr
```

List keys without translation in code

```bash
$ yarn workspace @make.org/widget  translation:orphan-keys -d ./i18n -l fr
```


