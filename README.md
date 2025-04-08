# Movie Management API

A RESTful API built with Express.js and TypeScript for managing movies, with user authentication and file import capabilities.

## Architecture

### Tech Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker

### Project Structure
```
src/
├── controllers/         # Request handlers
├── models/             # Database models
├── repositories/       # Data access layer
├── routes/            # API route definitions
├── services/          # Business logic
├── middlewares/       # Express middlewares
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── public/           # Static files
└── database/         # Database configuration
```

### Key Components
1. **Authentication System**
   - JWT-based authentication
   - Session management
   - Protected routes middleware

2. **Movie Management**
   - CRUD operations for movies
   - File import functionality
   - Text file parsing utility

3. **User Management**
   - User registration
   - User login
   - Password hashing

## Setup and Installation

### Prerequisites
- Node.js (v20 or higher)
- pnpm package manager
- Docker

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
PORT=8000
JWT_SECRET=your-secret-key
```

4. Start the development server:
```bash
pnpm run dev
```

### Docker Deployment

1. Run a specific container:
```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 panhead32/webby_lab_test
```
## Pages
- `/index.html` - Web interface for uploading movies list

## API Endpoints

### Authentication
- `POST /api/v1/users` - Register a new user
- `POST /api/v1/sessions` - Login and get JWT token

### Movies
- `GET /api/v1/movies` - List all movies
- `POST /api/v1/movies` - Create a new movie
- `GET /api/v1/movies/:id` - Get movie by ID
- `PUT /api/v1/movies/:id` - Update movie
- `DELETE /api/v1/movies/:id` - Delete movie
- `POST /api/v1/movies/import` - Import movies from file

## File Import Format

Movies can be imported from a text file with the following format:
```
Title: Movie Title
Release Year: 2021
Format: DVD
Stars: Actor 1, Actor 2, Actor 3

Title: Another Movie
...
```

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token generation
- `APP_PORT`: Port for Docker container (default: 8050)

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- Input validation
- CORS enabled
- Environment variable configuration

## Error Handling

The API uses a centralized error handling middleware that:
- Catches and formats errors
- Provides appropriate HTTP status codes
- Returns consistent error response format

## License

ISC 