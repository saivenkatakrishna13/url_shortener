# 🔗 URL Shortener API & Client

> A scalable, full-stack URL shortening service built with the MERN stack. Designed with a focus on performance, modularity, and clean separation of concerns.



## 🏗 System Architecture

This repository operates as a monorepo containing both the client application and the RESTful API service. We enforce strict separation of concerns to ensure independent scalability and maintainability.

- **`/FRONTEND` (Client):** A React-based Single Page Application (SPA). Designed for a seamless, asynchronous user experience.
- **`/BACKEND` (Server):** A Node.js/Express REST API responsible for handling high-throughput redirection, URL hash generation, and database interactions.

## 💻 Tech Stack

- **Database:** MongoDB (via Mongoose ODM)
- **Backend:** Node.js, Express.js
- **Frontend:** React.js 

## 🚀 Developer Setup & Local Environment

To get this project running locally for development and testing, follow the steps below.

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18.x or higher recommended)
- Package Manager (npm or yarn)
- A running instance of MongoDB (Local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone [https://github.com/saivenkatakrishna13/url_shortener.git](https://github.com/saivenkatakrishna13/url_shortener.git)
cd url_shortener
