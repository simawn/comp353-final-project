# COMP353 S2020 - Final Project

### Local Setup
1. Clone repo
2. Run `npm run setup`. If it doesn't work, run `npm install` in root folder. Then, cd into `client`, run `npm install` again

#### Option 1: Connecting to the school's DB
3. Create a `.env` file in the root folder with this content. Change password and session secret:
```
DB_NAME=jxc353_1
DB_USER=jxc353_1
DB_PASS=our db password
DB_HOST=localhost
DB_PORT=3307

SESSION_SECRET={Any complex string}
```

4. SSH tunnel into the db with this command: ` ssh -L 3307:jxc353.encs.concordia.ca:3306 username@login.encs.concordia.ca` (Notice the port number: 3307. It should match the port in the .env file). Leave that window open.

### Option 2: Connecting to your local DB
3. Create a `.env` file in the root folder with this content. Change variables if needed
```
DB_NAME=local db name
DB_USER=local db user
DB_PASS=local db password
DB_HOST=localhost
DB_PORT=3306

SESSION_SECRET={Any complex string}
```

### Starting the server and web app
Run `npm start`

### Other commands
Start server only: `npm run server`

Start web app only: `npm run client`

### Locations
Frontend: `http://localhost:3000/`

Backend: `http://localhost:5000/`
