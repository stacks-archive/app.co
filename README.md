app.co
----

### Website 

The website is a [next.js](https://github.com/zeit/next.js/) application. To begin, install the required dependencies:

```bash
yarn
```

To run the development server:

```bash
yarn dev
```

To build for production:

```bash
yarn build
```

### Database Setup

We use the sequelize package for ORM and database connection. To setup the database, make sure you
have PostgreSQL installed and run:

~~~bash
node_modules/.bin/sequelize db:create
~~~

Then to run migrations:

~~~bash
node_modules/.bin/sequelize db:migrate
~~~
