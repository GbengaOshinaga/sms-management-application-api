# SMS Management Application API

SMS Management Application API is an application that simulates the sending and receiving af SMS messages. It is built with Adonis Js and powered by Postgres.

## Getting Started
 - You should install the adonis cli: `npm i -g @adonis/cli`
 - Clone the repository: `git clone https://github.com/GbengaOshinaga/sms-management-application-api.git`
 - CD into the project folder
 - Run `npm install`
 - Generate application key: `adonis key:generate`
 - Create a .env file
 - Start the app: `adonis serve`

## API Docs
Most endpoints require authentication to be accessed. A token generated on login or sign up should be used to make requests to such endpoints

Sign Up - POST /signup

Login - POST /login

#### Authenticated Endpoints
Send a message - POST /messages

Get received messages - GET /messages

Get sent messages - GET /sent-messages

Mark messages as read - PATCH /messages/:message-id

Delete user - DELETE /user/:user-id
