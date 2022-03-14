# Results pages
## Introduction

Results page provides results of each consultation.\
This page should be automate in a near future.\
For now, the data team extracts a JSON file composed with the consultation results.\
A node API endpoint has been setted to serve this JSON file.
This endpoint is fetched when the user loads the page.

## JSON files

Files are placed in [this folder](./questionResults).
To work well, the JSON file has to follow a special naming convention with `questionSlug`.
Example :
```
question slug : stop-pauvrete
file name : stop-pauvrete.json
```
:warning: Of course the question must be configurated in Make.org's back office.

## API endpoint
The endpoint is defined by an Express API :
- [ExpressApiService](../../../../api/ExpressApiService.ts)
- [ExpressService](../../../../utils/services/Express.ts)
- The JSON / file serving in [../api/question.ts](../api/question.ts)
- A route in [routes.ts line 135](../routes.ts#L135)

:warning: This Express service needs to be refactored as the `front` is the only app using it.

## Data fetching and React hydratation
The data served by the Express API endpoint is fetched in [the results page](../../client/pages/Consultation/Results.tsx#L67).
This data will be stored in [the state of the page](../../client/pages/Consultation/Results.tsx#L72).

## Development mode
The Express service needs an Express server to unable the API.\
We are using different [Docker](../../Dockerfile) images depending what we need to do / work on (dev mode with hot reload, dev mod with ssr, functionnal testing, production build, ...)

To enable the Express server, you need to build and run the `app-ssr` profile. (check [README.MD](../../README.md#L22)).

