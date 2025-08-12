# Country Information App

## Overview

The **Country Information App** is a full-stack web application that provides information about countries, including their population, region, capital, timezones, currencies, and languages. The app allows users to search for countries by name, filter them by region, and view detailed information about a specific country.

This project demonstrates the use of modern web development tools and practices, including React, TypeScript, Tailwind CSS, and Express.js.

---

## Features

### Client (Frontend)

- **Country List Page**: Displays a list of countries with search and filter functionality.
- **Country Detail Page**: Shows detailed information about a selected country.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly experience.
- **Search and Filter**: Users can search for countries by name and filter them by region.

### Server (Backend)

- **REST API**: Provides endpoints to fetch country data, filter by region, and search by various parameters.
- **Caching**: Implements caching to reduce redundant API calls to the external country data provider.
- **Error Handling**: Handles errors gracefully and provides meaningful error messages.

---

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling the application.
- **React Router**: For client-side routing.

### Backend

- **Express.js**: For building the REST API.
- **TypeScript**: For type-safe server-side development.
- **Axios**: For making HTTP requests to the external country data API.
- **dotenv**: For managing environment variables.

---

## Project Structure

### Client

```
client/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (e.g., Navbar, CountryCard)
│   ├── pages/            # Page components (e.g., CountryListPage, CountryDetailPage)
│   ├── services/         # API service functions
│   ├── types/            # TypeScript type definitions
│   ├── main.tsx          # Entry point for the React app
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # Vite environment types
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

### Server

```
server/
├── src/
│   ├── controllers/      # API controllers (e.g., countryControllers.ts)
│   ├── routes/           # API routes (e.g., countryRoutes.ts)
│   ├── services/         # Business logic and external API calls (e.g., countryServices.ts)
│   └── index.ts          # Entry point for the Express server
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .env                  # Environment variables (not included in the repository)
```

---

## API Endpoints

### Base URL

`http://localhost:5000`

### Endpoints

1. **GET /countries**  
   Fetches a list of all countries.

2. **GET /countries/region/:region**  
   Fetches countries filtered by region.

3. **GET /countries/:code**  
   Fetches details of a country by its code.

4. **GET /countries/search**  
   Searches for countries by name, capital, region, or timezone.

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd Country-Information-App
   ```

2. **Set Up the Server**

   ```bash
   cd server
   npm install
   cp .env.example .env  # Create a .env file and configure it
   npm run dev           # Start the server in development mode
   ```

3. **Set Up the Client**

   ```bash
   cd ../client
   npm install
   npm run dev           # Start the client in development mode
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`.

---

## Environment Variables

### Server

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
```

---

## Scripts

### Client

- `npm run dev`: Start the development server.
- `npm run build`: Build the production-ready app.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

### Server

- `npm run dev`: Start the server in development mode with `nodemon`.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start`: Start the compiled server.

---

## Future Enhancements

- Add unit and integration tests for both client and server.
- Implement pagination for the country list.
- Add support for more search filters (e.g., Time Zone).
- Improve error handling and user feedback.
