# Jira Invoice Mananger API

## TODO

* Limit web requests to 1 per second
* Write a test script
* Write comments describing each major part of the code
* Come up with a better way of handling invoice number generation
* Come up with a way of handling updating an invoice that doesn't change the invoiceId, but still deletes the invoice items that are no longer bound to the invoice
* Write a delete invoice mutation? (haven't decided if this functionality should be available)

## Setup

### Database

Start your SQL server of choice, and create a new database. Import the .sql file at the root of this project into the new database.
Create a new database user in your SQL server with read/write access to the newly created database. Optionally you can skip this step and grant the application access to an existing user that has the correct permissions.

### Redis

The recommended way to install Redis is to compile it from sources. It is also possible to install Redis from your operating system's package manager, although the version available may not be the latest stable release. Please follow the commands below to download, compile and install Redis from sources:

```
wget http://download.redis.io/redis-stable.tar.gz

tar xvzf redis-stable.tar.gz

cd redis-stable

make

sudo make install
```

Start Redis with `redis-server`, it is now possible to use `redis-cli` to interact with your Redis server.

### Configuration

Ensure you have npm installed on your system and a stable internet connection. Then run `npm install` in the root of the project. Open up `src/index.ts` in your text editor. Scroll down to the `DB_CONFIG` object. Edit the `port`, `username`, `password` and `database` properties to match the details of the previously created database and user.
Exit your text editor and run `npm run build` in the root of the project. You can now run `npm run start` to start the server.

## Interacting with the API

Once the server has successfully started, copy the URL listed in your console into your browser to access the GraphQL Playground. In order for the authentication process to function correctly, you will need to navigate to the GraphQL Playground settings by clicking the cog in the top right of the screen. In the settings, change the value of `request.credentials` to `include`. You can now successfully run GraphQL queries against the API.

## Auth Process

You will need to run a register mutation in order to create an account:

```
mutation {
  register(
    user: {
      firstName: "FIRST_NAME",
      lastName: "LAST_NAME",
      password: "PASSWORD",
      email: "EMAIL"
    }
  ) {
    id
    firstName
    lastName
    email
  }
}
```

You are now able to run the login mutation to create a session and access the rest of the APIs functionality:

```
mutation {
  login(
    email: "EMAIL",
    password: "PASSWORD"
  ) {
    id
    firstName
    lastName
    email
  }
}
```

From here, you will need to follow the Jira APIs 3-legged authorization flow in order to allow the application to access your jira site(s). To start this process, run the getAuthUrl query:

```
query {
  getAuthUrl
}
```

Paste the URL that this query returns into a new tab in your browser. This will direct you to a page where you will be able to select a site that you will allow the application to access. When you allow the application access, it will redirect you to http://localhost:3000 (the development URL of the front-end). Once you have been redirected open the network tab of chrome devtools and inspect the failed request. Copy the code and the state parameters from the query string of the request.
In order to exchange the authorization code that you have just been issued for an access token, you will now need to run the exchangeAuthCode mutation passing in the code and state values you just copied:

```
mutation {
  exchangeAuthCode(
    code: "CODE",
    state: "STATE"
  ) {
    message
  }
}
```

This mutation should return a message indicating that the exchange was successful. You have now successfully allowed the application to access your Jira site. This process can be run any number of times to add more Jira sites to the application.
