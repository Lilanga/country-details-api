## Country details API Test repo

This is sample repository using NodeJS to connect to mysql database and use jwt authentication. Using winston for logging and morgan for trace http traffic requests.

use `npm run debug` for starting debug mode and use vs-code debugger config to attach ide to the process.
### API routes
`/api/users` routes
- POST `/signup` for signing up new users.
- POST `/token` for generationg new user tokens
- POST `/token-refresh` for refreshing existing tokens
- GET `/:email` retrive user details using email, Authentication needed
- DELETE `/:email` remove user from data store using email, Authentication needed

`/api/country` routes
- POST `/` for creating new country, Auntentication needed.
- GET `/:name` for retriving country by name, Auntentication needed.
- GET `/` retrive all countries, Authentication needed
- DELETE `/::name` remove country from data store using name, Authentication needed


### Environment variables for local tests and docker container
for local testing, you can use .env file
- PORT: application port
- SECRET: secret for jwt auth token
- REFRESHTOKENSECRET: secret for jwt refresh token
- TOKENLIFE: jwt auth token lifespan
- REFRESHTOKENLIFE: jwt refresh token lifespan
- HOST: database host
- USER: database user
- PASSWORD: database password
- DB: database name
- DIALECT: database dialect (using `mysql` for this solution)

### TODO
- Swagger documentation
- Better error handling
- Unit testing