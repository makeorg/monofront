# @make.org/front

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
$ docker-compose -f docker-compose.dev.yaml --profile=assembly-ui-dev up -d
# and go to https://local.makeorg.tech:3000
```

Dev mode with SSR :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=assembly-ui-ssr up -d
# and go to https://local.makeorg.tech:3000
```

> After changes, you must rebuild your app in docker container :

```bash
# get the id of the running container
$ docker ps
# launch the build script in the container
$ docker exec -it CONTAINER_ID yarn workspace @make.org/assembly-ui build
# Restart the container
$ docker-compose -f docker-compose.dev.yaml up -d --profile=assembly-ui-ssr restart
```

## Environment variables

See: [.env.dist](.env.dist)

## Updating packages

[Lerna Update Wizard](https://github.com/Anifacted/lerna-update-wizard) is installed to manage packages across workspaces.

```bash
$ yarn lernaupdate
````
