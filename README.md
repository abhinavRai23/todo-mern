# ToDo MERN

A full-stack notes application built with React, TypeScript, Vite, Express, MongoDB, and Upstash Redis rate limiting.

## Project Structure

- `frontend/` - React and TypeScript client
- `backend/` - Express API and MongoDB integration
- `backend/Todo/` - API request collection files

## Requirements

- Node.js 20.19 or newer
- A MongoDB database, such as MongoDB Atlas
- An Upstash Redis database

## Local Development

1. Install dependencies:

   ```bash
   npm run build
   ```

   This installs dependencies for both applications and creates the frontend production build.

2. Create `backend/.env`:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   UPSTASH_REDIS_REST_URL=your_upstash_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
   NODE_ENV=local
   PORT=5001
   ```

3. Start the frontend and backend in development mode:

   ```bash
   npm run dev
   ```

   The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5001`.

## Render Deployment

This project is configured for one Render Web Service. The Express server serves the built Vite frontend in production, and both the frontend and API are available from the same Render URL.

### Create the service

1. Push the project to a Git provider supported by Render.
2. In the Render dashboard, choose **New > Web Service** and select the repository.
3. Use the repository root as the service root directory.
4. Configure the service with:

   | Setting       | Value            |
   | ------------- | ---------------- |
   | Environment   | `Node`           |
   | Build Command | `npm run build`  |
   | Start Command | `npm start`      |
   | Node Version  | `20.19` or newer |

5. Add these environment variables in Render. Do not commit real credentials:

   | Variable                   | Value                     |
   | -------------------------- | ------------------------- |
   | `MONGODB_URI`              | MongoDB connection string |
   | `UPSTASH_REDIS_REST_URL`   | Upstash REST URL          |
   | `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token        |
   | `NODE_ENV`                 | `production`              |

   Render provides `PORT` automatically. The application falls back to port `5001` when it is not set.

6. Click **Create Web Service**. Render will build the frontend and start the Express server.

After deployment, open the Render service URL. The notes API is available under `/api/notes`:

- `GET /api/notes` - list notes
- `POST /api/notes` - create a note
- `GET /api/notes/:id` - fetch one note
- `PUT /api/notes/:id` - replace a note
- `PATCH /api/notes/:id` - update part of a note
- `DELETE /api/notes/:id` - delete a note

### Deployment checklist

- Add Render's outbound IP addresses to MongoDB Atlas Network Access, or use an appropriate secure IP range for your deployment.
- Confirm the Render service can connect to MongoDB Atlas.
- Confirm the Upstash REST URL and token are valid.
- Keep `backend/.env` local and out of version control.

## Available Scripts

Run these commands from the repository root:

- `npm run dev` - run frontend and backend development servers
- `npm run build` - install package dependencies and build the frontend
- `npm start` - start the production backend server

## License

ISC
