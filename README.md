TODO


## Installation 

- Check Yarn version in [.yvmrc](https://gitlab.com/makeorg/platform/front/-/blob/preproduction/.yvmrc) and prefer using YVM to manage your Yarn version
- clone repo from [gitlab](https://gitlab.com/makeorg/platform/monofront)
- add `127.0.0.1       local.makeorg.tech` to hosts file in `/etc/hosts`
- Install [lerna](https://github.com/lerna/lerna) on your machine with `npm install -g lerna`
- Run `lerna bootstrap` to install dependencies


## Development Mode
:guardsman: Access to make.org tech env are restricted through VPN. Check this with make.org tech team before launching these commands.
*  :ok_hand: Check `local.makeorg.tech` is setted in hosts
*  :construction_worker: run dev script for desired application with the [scope](https://github.com/lerna/lerna/tree/main/core/filter-options#--scope-glob) argument : `lerna run --scope=@make.org/front dev --stream` or `lerna run --scope=@make.org/widget dev --stream`
*  :see_no_evil: visit `https://local.makeorg.tech:3000`
*  :scream_cat: authorize unsecure certificate

## Unit testing
*  To launch test `yarn test`
*  To enable watch mode: `yarn test --watch`
> then touch the o key to re-launch test only on files changed
*  To upadte snapshot mode: `yarn test --updateSnapshot`

## Linter
To launch linter `yarn eslint ./apps ./ui ./components ./utils ./api ./store`

## Detect duplications
To launch jscpd `yarn jscpd`

## Prepush 
Before push the following command will be executed `yarn prepush`
Following commands are runned on prepush :
  - `yarn eslint ./`
  - `yarn tsc --noEmit`
  - `yarn test`
  - `yarn jscpd`