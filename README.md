<!-- omit in toc -->
# Secret Santa App - Backend

<!-- omit in toc -->
## Index
- [About](#about)
- [Run Project](#run-project)
  - [Set .env file](#set-env-file)
  - [Run Project](#run-project-1)
- [Run Linter](#run-linter)
- [Endopints](#endopints)

## About
This a secret santa generator that assigns secret santa randomly to each participant and then sends an automated mail to each santa with the event details.
## Run Project
### Set .env file
Fill the .env file with your data. It is needed the JWT_SECRET. It is needed an email and its password to send the secret santa emails. Follow instructions on [Nodemailer](https://nodemailer.com/about/).
```
JWT_SECRET=YourJWTsecret
user=youremail@mail.com
pass=password
```
### Run Project
```bash
npm i
npm run start-dev
```

to seed database and create default users
```bash
npm run seed
```

## Run Linter

```bash
npm run lint:check
```

## Endopints

Check the following file to have more info about the endpoints.
```
api/secretsanta.html
```
