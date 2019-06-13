# Url Scissors

Url Scissors is a simple app working as url shortener. You can enter long url, and after pressing the button get short URL that will redirect you to the long url you entered.

### Live version
Live version is deployed at: https://url-scissors.firebaseapp.com/

### Backend stack
- Node.js
- TypeScript
- PostgreSQL (with [slonik](https://www.npmjs.com/package/slonik))

### Frontend stack
- React
- TypeScript
- [linaria](https://www.npmjs.com/package/linaria)

### How to start locally

#### 1. Start backend
- clone this repo: https://github.com/radoslaw-medryk/url-scissors-core
- `npm install`
- `npm run db` (requires docker, run in another terminal window)
- `npm run start`

#### 2. Start frontend
- clone this repo: https://github.com/radoslaw-medryk/url-scissors-app
- `npm install`
- `npm run start`
- visit `http://localhost:8080/`
