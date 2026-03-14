# E-Commerce Backend API

A scalable backend for an e-commerce application built using **Node.js**, **Express.js**, and **PostgreSQL**.  
This API handles authentication, product management, and order processing for a single-vendor e-commerce platform.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **JWT Authentication**
- **dotenv**
- **bcrypt**
- **REST API Architecture**

---

## DOT ENV variable info

- **PORT** is for port
- **JWT_SECRET** is for JWt secret
- **DB_URL** is for PostgreSQL connection string

---
## Folder structure info

- index.js file is only for testing the postgreSQL connection, delete it it you want.

- **auth** folder contains the authMiddleware. 
- **config** folder contains postgreSQL connection configuration. 
- **controllers** folder contains required REST controllers i.e. userController, profile for sign-in and sign-up.
- **routes** folder contains the API routes



---
## API endpoints

- **/api/v1/test** : for testing the api if working
- **/api/v1/signup** : for signup
- **/api/v1/signin** : for signing in
- **/api/v1/profile** : for getting the user profile
