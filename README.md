# connect-chat
This project is a full-stack Chat App Project with realtime messaging fuctionality with socket.io


1. **Clone the Repository:**

   ```bash
   git clone https://github.com/LokeshSingh07/connect-chat

   ```

2. **Install dependencies:**

   Navigate to client directory and install frontend dependencies using npm

   ```
   npm install
   ```

   Similary navigate to api folder and install backend dependencies

   ```
   npm install
   ```

3. **ENV variables:**

   - create .env file in the client folder and add these variables

     #### VITE_BASE_URL= http://localhost:4000


   - create .env file in the api folder and add these variables

     #### PORT= 4000

     #### DB_URL= your db url



4. **Run project:**
   - Open terminal, navigate to client directory and run below command to start frontend
   ```
       npm run dev
   ```
   - Open another terminal, navigate to api directory and run this command to start backend server
   ```
       npm start
   ```



## Technologies Used

- **MongoDB:** NoSQL database for storing user data, listings.
- **Express.js:** Web application framework for building the backend server.
- **React.js:** JavaScript library for building the user interface.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Tailwind CSS:** A utility-first CSS framework
- **JWT:** JSON Web Tokens for secure user authentication.