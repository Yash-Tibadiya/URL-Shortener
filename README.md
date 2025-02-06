# URL Shortener

A simple URL shortener service using MongoDB, Express, NanoID for generating unique IDs, and Mongoose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Yash-Tibadiya/URL-Shortener.git
    ```
2. Navigate to the project directory:
    ```bash
    cd URL-Shortener
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. The server will run on `http://localhost:8000`.

## Endpoints

### Generate New Short URL

- **URL:** `/url`
- **Method:** `POST`
- **Handler:** `handleGenerateNewShortURL`

### Get Short URL

- **URL:** `/:shortId`
- **Method:** `GET`
- **Handler:** `handleGetShortURL`

### Get URL Analytics

- **URL:** `/url/analytics/:shortId`
- **Method:** `GET`
- **Handler:** `handleGetAnalytics`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
