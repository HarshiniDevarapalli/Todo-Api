# Todo API

A RESTful TODO API built with Node.js, Express.js, and MongoDB Atlas. It provides CRUD operations for creating, retrieving, updating, and deleting TODO items.

## Setup and Run Locally

### Prerequisites

- Node.js v18 or higher
- npm
- MongoDB Atlas account

### Installation

Clone the repository:

```bash
git clone https://github.com/HarshiniDevarapalli/Todo-Api.git
cd Todo-Api
```

Install dependencies:

```bash
npm install
```

### Dependencies

- **Express.js** – Web framework for building the REST API
- **Mongoose** – MongoDB object modeling and database interaction
- **dotenv** – Loads environment variables from `.env`
- **Morgan** – HTTP request logging
- **Nodemon** – Automatically restarts the server during development

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Start the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Live Hosted URL

https://todo-api-kyyv.onrender.com

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/todos` | Create a new TODO |
| GET | `/todos` | Get all TODOs |
| GET | `/todos/:id` | Get a TODO by ID |
| PUT | `/todos/:id` | Update a TODO |
| DELETE | `/todos/:id` | Delete a TODO |

## Postman Collection

The exported Postman collection is included in the repository:

`Todo API.postman_collection.json`

The collection uses the `{{base_url}}` variable and is configured with the live hosted URL.

Postman shared collection:

https://harshinidevarapalli-2481892.postman.co/workspace/Harshini's-Workspace~f09e01c0-7546-4f3f-878e-277880a83adc/collection/57965144-830fcf5e-efa8-494d-8aea-c8a5ee2e3185?action=share&source=copy-link&creator=57965144

## GitHub Repository

https://github.com/HarshiniDevarapalli/Todo-Api
