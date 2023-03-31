# Gyeongmin-Lee-IS24-full-stack-competition-req97073

IS-24 Full Stack Developer Position Code Challenge

## Prerequisites

- Docker

## Running the App

Follow these steps to build and run the app using Docker:

1. Clone the repository:

```
git clone https://github.com/gyeongmin-lee/Gyeongmin-Lee-IS24-full-stack-competition-req97073.git
cd Gyeongmin-Lee-IS24-full-stack-competition-req97073
```

2. Build the Docker images and start the app:

```
docker compose up --build
```

3. Open a web browser and go to http://localhost:8080 to access the app (API documentation is available at http://localhost:3000/api/api-docs).

## Running the App without Docker

1. Clone the repository:

```
git clone https://github.com/gyeongmin-lee/Gyeongmin-Lee-IS24-full-stack-competition-req97073.git
cd Gyeongmin-Lee-IS24-full-stack-competition-req97073
```

2. Start the API server:

```
cd server
npm install
npm run dev
```

3. In a new terminal, start the client app:

```
# From the root directory of the repository
cd client
npm install
npm run dev
```

4. Open a web browser and go to http://localhost:8080 to access the app (API documentation is available at http://localhost:3000/api/api-docs).

## Screenshots

![Main Screen](./.github/screenshots/01_main.png?raw=true "Main Screen")
_Main Screen_

![Add Product Screen](./.github/screenshots/02_add.png?raw=true "Add Screen")
_Add Product Screen_

![Edit Product Screen](./.github/screenshots/03_edit.png?raw=true "Edit Screen")
_Edit Product Screen_

## Technologies Used

- React
- Typescript
- Node.js
- Express
- Chakra UI
- Docker
- Swagger
