# Subscription Tracker API

This is a simple API for managing users, subscriptions, and authentication. It is built using Node.js and Express.

## Features

- **Authentication**: Sign up, sign in, and sign out users.
- **User Management**: Create, update, delete, and retrieve user information.
- **Subscription Management**: Manage subscriptions, including creating, updating, canceling, and retrieving subscriptions.
- **Upcoming Renewals**: Retrieve a list of upcoming subscription renewals.

## Project Structure
```
```
- **/routes**: Contains route definitions for users, subscriptions, and authentication.
- **/controllers**: Houses the logic for handling requests and responses.
- **/models**: Defines the data models and schemas for the application.
- **/middlewares**: Includes middleware functions for authentication and error handling.
- **/config**: Contains configuration files, such as database and environment settings.
- **/utils**: Utility functions and helpers used across the application.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/subscription-tracker-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd subscription-tracker-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Access the API at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/signup`: Register a new user.
- `POST /auth/signin`: Log in a user.
- `POST /auth/signout`: Log out a user.

### Users
- `GET /users`: Retrieve all users.
- `GET /users/:id`: Retrieve a specific user by ID.
- `PUT /users/:id`: Update user information.
- `DELETE /users/:id`: Delete a user.

### Subscriptions
- `POST /subscriptions`: Create a new subscription.
- `GET /subscriptions`: Retrieve all subscriptions.
- `GET /subscriptions/:id`: Retrieve a specific subscription by ID.
- `PUT /subscriptions/:id`: Update subscription details.
- `DELETE /subscriptions/:id`: Cancel a subscription.

### Upcoming Renewals
- `GET /subscriptions/upcoming-renewals`: Retrieve a list of subscriptions with upcoming renewals.

