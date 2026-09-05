# Todo API

A RESTful TODO API built with Node.js, Express.js, and MongoDB Atlas. It provides CRUD operations for creating, retrieving, updating, and deleting TODO items.

## Setup and Run Locally

### Prerequisites

Install or create the following before running the project:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Postman](https://www.postman.com/) for testing the API

You can verify Node.js and npm installation with:

```bash
node --version
npm --version
```

Node.js version 18 or higher is required.

### 1. Clone the Repository

Clone the GitHub repository:

```bash
git clone https://github.com/HarshiniDevarapalli/Todo-Api.git
```

Navigate into the project directory:

```bash
cd Todo-Api
```

### 2. Install Dependencies

Install all project dependencies using:

```bash
npm install
```

The project uses the following dependencies:

- **Express.js** – Web framework for building the REST API
- **Mongoose** – MongoDB object modeling and database interaction
- **dotenv** – Loads environment variables from the `.env` file
- **Morgan** – HTTP request logging
- **Nodemon** – Automatically restarts the server during development

### 3. Configure MongoDB Atlas

The API uses MongoDB Atlas for persistent data storage.

1. Create a MongoDB Atlas account and create a cluster.
2. Create a database user with a username and password.
3. Add your IP address to the Atlas Network Access IP Access List.
4. For local development, allow your current IP address.
5. Copy the MongoDB connection string from Atlas.

The connection string will look similar to:

```text
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project:

```text
Todo-Api/
├── .env
├── .env.example
├── package.json
└── src/
```

Add the following to `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

For example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
```

Do not commit the actual `.env` file to GitHub. The repository contains a `.env.example` file showing the required environment variables.

### 5. Start the Application

For development, run:

```bash
npm run dev
```

For a normal/production start, run:

```bash
npm start
```

The server will start on the port specified by the `PORT` environment variable.

By default:

```text
http://localhost:5000
```

You should see messages similar to:

```text
Server running on port 5000
MongoDB connected successfully
```

### 6. Test the API

The API can be tested using Postman.

Import the following collection into Postman:

```text
Todo API.postman_collection.json
```

The collection contains requests for all available API endpoints and uses the following variable:

```text
{{base_url}}
```

For local testing, set:

```text
base_url = http://localhost:5000
```

For testing the deployed API, set:

```text
base_url = https://todo-api-kyyv.onrender.com
```

#### Test the Health Check

Send:

```http
GET {{base_url}}/health
```

Expected response:

```json
{
  "status": "OK"
}
```

#### Create a TODO

Send:

```http
POST {{base_url}}/todos
```

with the following JSON body:

```json
{
  "title": "Complete Todo API assignment",
  "description": "Finish documentation and submission",
  "completed": false
}
```

A successful request returns:

```text
201 Created
```

The response contains the created TODO and its generated ID.

#### Get All TODOs

Send:

```http
GET {{base_url}}/todos
```

A successful request returns:

```text
200 OK
```

and a JSON array containing the stored TODOs.

#### Get a TODO by ID

Copy the `_id` returned from the Create Todo request and send:

```http
GET {{base_url}}/todos/<todo_id>
```

For example:

```http
GET {{base_url}}/todos/6a9b00781c436779cd5c23cd
```

A successful request returns:

```text
200 OK
```

#### Update a TODO

Using the same TODO ID, send:

```http
PUT {{base_url}}/todos/<todo_id>
```

with a JSON body such as:

```json
{
  "title": "Updated Todo",
  "description": "Updated description",
  "completed": true
}
```

A successful request returns:

```text
200 OK
```

and the updated TODO.

#### Delete a TODO

Using the TODO ID, send:

```http
DELETE {{base_url}}/todos/<todo_id>
```

A successful request returns:

```text
200 OK
```

with:

```json
{
  "message": "Todo deleted successfully"
}
```

After deletion, requesting the same TODO ID returns:

```text
404 Not Found
```

## Live Hosted URL

The deployed API is available at:

https://todo-api-kyyv.onrender.com

Health check:

https://todo-api-kyyv.onrender.com/health

## API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/` | API status | 200 OK |
| GET | `/health` | Health check | 200 OK |
| POST | `/todos` | Create a new TODO | 201 Created |
| GET | `/todos` | Get all TODOs | 200 OK |
| GET | `/todos/:id` | Get a TODO by ID | 200 OK |
| PUT | `/todos/:id` | Update a TODO | 200 OK |
| DELETE | `/todos/:id` | Delete a TODO | 200 OK |

## Postman Collection

The exported Postman Collection v2.1 is included in the repository:

```text
Todo API.postman_collection.json
```

The collection contains:

- Health Check
- Create Todo
- Get Todos
- Get Todo By ID
- Update Todo
- Delete Todo
- Root / API Status

The collection uses the `{{base_url}}` variable.

### Postman Shared Collection

The collection is also available through the following shared link:

https://harshinidevarapalli-2481892.postman.co/workspace/Harshini's-Workspace~f09e01c0-7546-4f3f-878e-277880a83adc/collection/57965144-830fcf5e-efa8-494d-8aea-c8a5ee2e3185?action=share&source=copy-link&creator=57965144

## GitHub Repository

https://github.com/HarshiniDevarapalli/Todo-Api
