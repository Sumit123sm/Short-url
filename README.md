# URL Shortener (MERN)

A simple URL shortener with QR code generation. The backend stores links in MongoDB and serves redirects. The frontend lets users create short links, copy them, and view a QR code.

## Features
- Create short URLs
- Redirect to original URL
- Click tracking
- QR code generation for each short URL

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Project Structure
```
backend/
  index.js
  package.json
  .env
frontend/
  src/
  public/
  package.json
```

## Prerequisites
- Node.js 18+ (recommended)
- MongoDB connection string

## Environment Variables
Create a file named `.env` in `backend/`:
```
DATABASE_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
```

## Install
From the project root:

### Backend
```
cd backend
npm install
```

### Frontend
```
cd ../frontend
npm install
```

## Run
### Backend
```
cd backend
npm start
```
The server runs on `http://localhost:3000`.

### Frontend
```
cd ../frontend
npm run dev
```
Vite runs on `http://localhost:5173` by default.

## API
- `POST /api/short`
  - Body: `{ "originalUrl": "https://example.com" }`
  - Response: `{ "message": "URL Generated", "shortUrl": "http://localhost:3000/<id>", "qrCodeImg": "data:image/png;base64,..." }`

- `GET /:shortUrl`
  - Redirects to the original URL

## Notes
- The backend builds short URLs using `http://localhost:3000/<id>`.
- CORS is enabled for local development.

## Screenshots
Add screenshots to this section if you want to showcase the UI.

## License
MIT
