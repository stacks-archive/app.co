app.co
----

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