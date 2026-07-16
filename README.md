# URL Shortening Service (API & Client)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/Frontend-React_18-blue.svg)]()
[![Node.js](https://img.shields.io/badge/Backend-Node.js_18+-green.svg)]()
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen.svg)]()

A highly scalable, full-stack URL shortening service engineered for low-latency redirection and high-throughput link generation. Built upon the MERN stack (MongoDB, Express, React, Node.js), this project enforces strict modularity and separation of concerns via a monorepo architecture.

**Live Environment:** [Production Deployment](https://url-shortener-three-bay.vercel.app/)

---

## 🏗 System Architecture

The repository is structured as a monorepo containing distinct client and server environments, facilitating independent CI/CD pipelines and horizontal scaling.

* **Frontend Client (`/FRONTEND`):** A Single Page Application (SPA) developed with React. It utilizes modern functional paradigms and hooks for asynchronous state management and seamless REST API consumption.
* **Backend API (`/BACKEND`):** A lightweight Node.js/Express service. It handles input validation, unique hash generation (collision-resistant), and database transactions via Mongoose.

## 💻 Technology Stack

| Tier | Technology | Purpose |
| :--- | :--- | :--- |
| **Presentation** | React.js, HTML5/CSS3 | Client-side rendering and responsive UI interface. |
| **Application** | Node.js, Express.js | Core API routing, request validation, and business logic. |
| **Data** | MongoDB, Mongoose | Persistent NoSQL data store and schema validation. |
| **Infrastructure** | Vercel | Cloud-native hosting and edge delivery. |

---

## 🚀 Local Development Setup

Follow these directives to provision a local development environment.

### Prerequisites

Ensure the following dependencies are installed in your local environment:
* **Node.js** (v18.x LTS or higher)
* **npm** or **yarn** package manager
* **MongoDB** (Local daemon running on port `27017` or an active MongoDB Atlas cluster)

### 1. Repository Initialization

Clone the repository and navigate to the project root:

```bash
git clone [https://github.com/saivenkatakrishna13/url_shortener.git](https://github.com/saivenkatakrishna13/url_shortener.git)
cd url_shortener
