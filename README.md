# Expresss / Postgres Project

This is a sample project combining a frontend form with a Postgres backend, wired together using express routes.

- [ts-node](https://github.com/TypeStrong/ts-node)
- [express](https://expressjs.com/)
- [sequelize](https://sequelize.org/docs/v6/getting-started/)


To get started, run the following:

```bash
npm install
npm run frontend:build
npm run start
```

### ENV

You'll need some `.env` values for this project, specifically...
```bash
DB_HOST= # your host
DB_NAME= # your DB name 
DB_UNAME= # your DB username
DB_PASS= # your DB password
DB_TABLE_PERSONAL_INFO= # the (unused) name of a DB table
```