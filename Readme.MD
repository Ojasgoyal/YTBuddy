<!-- write a markdown file for our project -->
<!-- In your README file, also list down your API endpoints as well as your database schema. -->

# YTBuddy – YouTube Companion Dashboard

YTBuddy is a mini full-stack dashboard that integrates with the YouTube Data API and allows creators to manage a specific uploaded video. Users can edit metadata, manage comments, add private notes, and track all important actions through an event logging system.

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- shadcn/ui
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google OAuth 2.0
- YouTube Data API v3

**Deployment**
- Vercel

---

## Features

- Google OAuth login
- Fetch video details
- Edit title and description
- Add and delete comments
- Reply to comments
- Add, delete, and search notes
- Persistent UI state
- Event logging for all major actions

---

## API Endpoints

### Auth
- `GET /auth/google`
- `GET /auth/google/callback`
- `GET /auth/status`
- `POST /auth/logout`

### Video
- `GET /api/video/:videoId`
- `PATCH /api/video/:videoId`

### Comments
- `GET /api/comments/:videoId`
- `POST /api/comments/:videoId`
- `POST /api/comments/reply`
- `DELETE /api/comments/:commentId`

### Notes
- `GET /api/notes/:videoId`
- `POST /api/notes`
- `DELETE /api/notes/:noteId`

### Events
- `GET /api/events`
- `GET /api/events/:videoId`

---

## Database Schema

### User
```js
{
  email: String,
  name: String,
  tokens: Object
}
```
### Note
```js
{
  userId: ObjectId,
  videoId: String,
  content: String
}
```
### Event Log
```js
{
  userId: ObjectId,
  videoId: String,
  action: String,
  metadata: Object
}
```

Author
Built By Ojas