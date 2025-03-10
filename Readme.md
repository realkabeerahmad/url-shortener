# URL Shortener API

This project is a simple URL shortener service built with Node.js and TypeScript.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/url-shortener.git
   cd url-shortener
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project
#### Production Mode
To start the project in production mode:
```sh
npm start
```

#### Development Mode
To run the project in development mode:
1. Create a `nodemon.json` file with the following content:
   ```json
   {
       "watch": ["src"],
       "ext": ".ts,.js",
       "exec": "ts-node ./src/server.ts"
   }
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

---

## 📌 API Endpoints

### Base URL (Localhost)
```
http://127.0.0.1:5001/
```

### **1. Create a Short URL**
**Endpoint:** `POST /`

#### **Request Body**
```json
{
    "fullUrl": "https://example.com"
}
```

#### **Response**
```json
{
  "message": "Short URL created successfully",
  "data": {
    "_id": "unique-id",
    "fullUrl": "https://example.com",
    "clicks": 0,
    "shortUrl": "generated-short-url",
    "createdAt": "2024-03-09T00:00:00Z",
    "updatedAt": "2024-03-09T00:00:00Z",
    "__v": 0
  }
}
```

---

### **2. Retrieve All Short URLs**
**Endpoint:** `GET /`

#### **Request**
_No request body required._

#### **Response**
```json
{
  "message": "Fetched all short URLs",
  "data": [
    {
      "_id": "unique-id",
      "fullUrl": "https://example.com",
      "clicks": 0,
      "shortUrl": "generated-short-url",
      "createdAt": "2024-03-09T00:00:00Z",
      "updatedAt": "2024-03-09T00:00:00Z",
      "__v": 0
    }
  ]
}
```

---

### **3. Redirect to Full URL**
**Endpoint:** `GET /:shortUrl`

#### **Request**
_No request body required._

#### **Response**
Redirects the user to the corresponding full URL.

---

### **4. Delete a Short URL**
**Endpoint:** `DELETE /:_id`

#### **Request**
_No request body required._

#### **Response**
```json
{
  "message": "URL deleted",
  "data": {
    "_id": "unique-id",
    "fullUrl": "https://example.com",
    "clicks": 0,
    "shortUrl": "generated-short-url",
    "createdAt": "2024-03-09T00:00:00Z",
    "updatedAt": "2024-03-09T00:00:00Z",
    "__v": 0
  }
}
```

---

## 🛠 Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB

## 📌 Notes
- Ensure MongoDB is running before starting the project.
- Update `.env` file to configure database connection.

## 📜 License
This project is licensed under the MIT License.

