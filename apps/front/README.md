# @make.org/front 

- Result pages: [./docs/RESULTS.md](./docs/RESULTS.md)
- Accessibility report: [./docs/ACCESSIBILITY.md](./docs/ACCESSIBILITY.md)
- Tracking reference: [./docs/TRACKING.md](./docs/TRACKING.md)


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


### i18n

Check translations

```bash
$ yarn workspace @make.org/front translation
```

List unused keys in translation files

```bash
$ yarn workspace @make.org/front translation:unused-keys -d ./i18n -l fr
$ yarn workspace @make.org/front translation:unused-keys -d ./client/pages/Static/i18n -l fr
```

List keys without translation in code

```bash
$ yarn workspace @make.org/front translation:orphan-keys -d ./client/pages/Static/i18n -d ./i18n -l fr
```

This scripts uses `grep` command. A linux system is require.

### Tracking documentation

Check tracking documentation

```bash
$ yarn workspace @make.org/front documentation
```

## Accessibility

Run accessibility test: 
```bash
yarn workspace @make.org/front accessibility
```

Fix accessibility: 
```bash
yarn workspace @make.org/front accessibility:fix
```


## Environment variables for production

Create a new ```.env``` file.

See [.env.local](./.env.local) for usage.

## Updating packages
[Lerna Update Wizard](https://github.com/Anifacted/lerna-update-wizard) is installed to manage packages across workspaces.

```bash
$ yarn lernaupdate
```

