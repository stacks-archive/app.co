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

We use the [sequelize](https://github.com/sequelize/sequelize) package for ORM and database connection. To setup the database, make sure you
have [PostgreSQL](https://www.postgresql.org/) installed and run:

```bash
yarn db:create
```

Then to run migrations:

```bash
yarn db:migrate
```

### Running tests

Make sure you have created a test database (you only need to run this once):

~~~bash
NODE_ENV=test yarn db:create
~~~

Then, run tests:

~~~bash
yarn test
~~~