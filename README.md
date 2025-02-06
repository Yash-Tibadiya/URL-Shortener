# URL Shortener

A simple URL shortener built using Node.js, Express, MongoDB, Mongoose, and Nanoid.

## Features

- Generate a short URL for a given long URL
- Redirect to the original URL using the short ID
- Get analytics for a short URL

## Tech Stack

- **Node.js**: Backend runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing URL mappings
- **Mongoose**: ODM for MongoDB
- **Nanoid**: Library for generating unique short IDs

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

- The server will run on `http://localhost:8000`.

## API Endpoints

### 1. Generate a Short URL

- **Endpoint:** `POST /url`
- **Description:** Generates a new short URL for a given long URL.
- **Request Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortId": "abcd1234",
    "url": "https://example.com",
    "shortUrl": "http://localhost:8000/abcd1234"
  }
  ```

### 2. Redirect to Original URL

- **Endpoint:** `GET /:shortId`
- **Description:** Redirects the user to the original URL associated with the given short ID.
- **Example:** `GET http://localhost:8000/abcd1234`
- **Response:** Redirects to `https://example.com`

### 3. Get URL Analytics

- **Endpoint:** `GET /url/analytics/:shortId`
- **Description:** Retrieves analytics for a given short URL, such as the number of clicks.
- **Response:**
  ```json
  {
    "totalClicks": 1,
    "analytics": [
      {
        "timestamp": 1738827690864,
        "_id": "67a467aad60745295b38d639"
      }
    ]
  }
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
