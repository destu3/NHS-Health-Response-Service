# IP2 Coursework Project

## Group Members

- Destiny
- Ahmed
- Lewis
- Kaloyan

## Vite Dev Server

### Starting the Client Web Application

To start the Client Web Application, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

2. Open your terminal and navigate to the root directory of the project.

   ```
   cd /path/to/project/root
   ```

3. Navigate to the `client` directory.

   ```
   cd client
   ```

4. Install all dependencies using the following command:

   ```
   npm i
   ```

5. Start the vite dev server using the following command:
   ```
   npm run dev
   ```

## Web Server

### Starting the Web Server Locally

To start the web server application locally, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

2. Open your terminal and navigate to the root directory of the project.

   ```
   cd /path/to/project/root
   ```

3. Navigate to the `server` directory.

   ```
   cd server
   ```

4. Create a file in the root directory of the server folder called ".env" and put the following code in it

   ```
   connection_password=ZdpUsb0NBgIaeHy4
   APP_ENV=development
   db_connection_string=mongodb+srv://uduebholod:ZdpUsb0NBgIaeHy4@cluster.2fhlwmn.mongodb.net/nhs_app?retryWrites=true&w=majority
   dev_port=3000
   secret_key=this-is-a-jwt-secret-and-it-is-very-long
   token_expires_in=90d
   ```

5. Install all dependencies using the following command:

   ```
   npm i
   ```

6. Start the server using the following command:
   ```
   npm start
   ```
7. Once the server has started, you can access the API endpoints at `http://127.0.0.1:3000/`.
