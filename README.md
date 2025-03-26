# REST API Documentation  

This project is a REST API built with Node.js, Express, and TypeScript. It provides endpoints for managing authentication, products, and orders. Below is an overview of the frameworks, technologies, and libraries used, as well as instructions to deploy and run the application.  

## Technologies and Frameworks  

- **Node.js**: JavaScript runtime for building scalable server-side applications.  
- **Express**: Web framework for building RESTful APIs.  
- **TypeScript**: Superset of JavaScript that adds static typing.  
- **Prisma**: ORM (Object-Relational Mapping) for database management and migrations.  
- **PostgreSQL**: Relational database used for data storage.  
- **Swagger**: API documentation and testing tool.  

## Libraries  

- **bcryptjs**: For hashing passwords.  
- **jsonwebtoken**: For generating and verifying JWT tokens.  
- **class-validator**: For validating request DTOs.  
- **dotenv**: For managing environment variables.  
- **cors**: For enabling Cross-Origin Resource Sharing.  

## Features  

- **Authentication**: User registration and login with role-based access control (ADMIN, CLIENT).  
- **Product Management**: CRUD operations for products.  
- **Order Management**: Create and retrieve orders.  
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.  

## Prerequisites  

- Docker and Docker Compose installed.  
- Node.js and npm installed (for local development).  

## Deployment Instructions  

1. **Clone the Repository**  
    ```bash  
    git clone https://github.com/wolf606/dto-backend.git
    cd dto-backend  
    ```  

2. **Run the Application with Docker**  
    Create a Docker volume for the database:  
    ```bash
    docker volume create menus-db-vol
    ```

    Use Docker Compose to build and run the containers:  
    ```bash  
    docker-compose up --build  
    ```

3. **Access the Application**  
    - The API will be available at `http://localhost:3000`.  
    - Swagger documentation can be accessed at `http://localhost:3000/api-docs`.  

4. **Database Migrations**  
    Prisma migrations will automatically run when the container starts.  

## API Documentation  

The API is documented using Swagger. You can test the endpoints directly from the Swagger UI at `/api-docs`.  

## License  

This project is licensed under the MIT License.  
