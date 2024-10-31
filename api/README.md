# VERITONE-BACKEND

RThis backend application provides API endpoints for performing CRUD (Create, Read, Update, Delete) operations on a database named "veritone" with a single table "cart." It's designed to manage items in the cart.

## Getting Started

These instructions will help you set up and run the backend service on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- Npm
- Sequelize
- PgAdmin

## Installations

#### Install dependencies

```bash
 npm install

```

## Start server

```bash
 npm run dev
```

## Usage

1. **Create an Item in Cart**:

   Send a POST request to `http://localhost:3000/api/cart` with a JSON request body containing the item details you want to add to the cart.

   Example:

   ```json
   POST http://localhost:3000/api/cart
   {
       "name": "Tomato",
       "description": "I need fresh and juicy tomato",
       "quantity": 2
   }
   ```

   ## Service Structure

   The project is organized into the following directories:

- **controllers**: Contains route handlers for each endpoint.

- **routes**: Defines the API routes.

- **services**: Implements the database logic for CRUD operations.

- **models**: Contains the Sequelize models for the database table.

- **config**: Stores configuration files.
