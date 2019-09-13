app.co
----

### Dependencies

- [next.js](https://github.com/zeit/next.js/)
- [redis](https://redis.io/)

An instance of Redis **must** be running before starting the development server.

### Instructions

```bash
yarn
```

To setup your environment variables for development, copy the `.env.sample` file to `.env`:

~~~bash
cp .env.sample .env
~~~

To run the development server:

```bash
yarn dev
```

To build for production:

```bash
yarn build
```