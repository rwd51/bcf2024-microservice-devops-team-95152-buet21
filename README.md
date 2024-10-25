# Train Ticketing
 Service

<p align='center'>
<img alt="VaxHub" src="assets/vaxhub-logo.png" />
</p>

The site is live at http://143-42-79-74.ip.linodeusercontent.com/.

## Project  Overview

Scalable Microservice for Bangladesh Railway Ticketing System

In response to the overwhelming traffic during peak ticket sales periods, I developed a robust and scalable microservice architecture for the Bangladesh Railway ticketing system. This solution leverages cloud-based technologies and containerization to ensure high availability and performance, even under extreme load conditions.

This project utilizes `Jest, Supertest, Github Actions, Docker and Kubernetes` for test automation, continuous integration and deployment.

## System Architecture Diagram
<p align='center'>
<img alt="VaxHub" src="assets/diagram.png" />
</p>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Frontend](#frontend)
- [Database](#database)
- [Continuous Monitoring](#continuous-monitoring)
- [Autoscaling with Kubernetes on Linode](#autoscaling-with-kubernetes-on-linode)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- Docker
- Kubernetes (for deployment)
- ORM for Database Management(Prisma)
- RabbitMQ(for asyncronuous communicaion)

## Installation

To install the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/rwd51/bcf2024-microservice-devops-team-95152-buet21
cd repository
```

2. Install the dependencies:

```bash
npm install
```

## Usage

To run the project locally, execute the following command for each microservice:

```bash
npm start 
```

This will start the application and make it accessible at `http://localhost:3001`, `http://localhost:3002`, ....., `http://localhost:3005`


## Testing

This project uses [Jest](https://jestjs.io/) as the testing framework and [Supertest](https://www.npmjs.com/package/supertest) for making HTTP requests to test the API endpoints. The test code is located in the `tests` directory.

To run the tests, use the following command(for each microservice)

```bash
npm test
```

## Continuous Integration and Deployment

### GitHub Actions

This project utilizes [GitHub Actions](https://github.com/features/actions) for automating the CI/CD pipeline. The workflow files are located in the `.github/workflows` directory.

The CI/CD pipeline includes the following steps:


1. **Unit Testing and integration testing**: The unit tests are executed using Jest to verify the correctness of the code.

2. **Build and Package**: The application is built and packaged into a Docker image.

3. **Containerization**: The Docker image is pushed to the container registry to be deployed on Kubernetes cluster(Azure Cloud)

### Docker Deployment

To deploy the application using Docker and Kubernetes, follow these steps:

1. Build the Docker image:

```bash
docker build -t your-image-name .
```

2. Push the Docker image to a container registry of your choice:

```bash
docker push your-registry/your-image-name:tag
```

3. Deploy the application on Kubernetes:

```bash
kubectl apply -f deployment.yaml
```

Ensure that you have a valid `deployment.yaml` file with the necessary Kubernetes deployment configuration.

## Frontend

The frontend of this project is built using [MUI](https://mui.com/). 

Here is the [frontend](https://github.com/azraihan/cse_fest_2024_devops_frontend) repository.

## Database

This project uses [PostgreSQL](https://www.postgresql.org/) as the database. To set up the database, follow these steps:

1. Install PostgreSQL on your local machine or use a hosted PostgreSQL service.

2. Create a new database.

3. Configure the database connection in your project's configuration file.

```bash
npm init -y
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

The command creates the following:

prisma/schema.prisma: the Prisma schema file where you define your database models.
.env: a file where you store your database connection URL.

4. In your .env file, define your database connection string. For example, if you’re using PostgreSQL, it might look like this:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```
5. Define Models in schema.prisma

In the schema.prisma file, define the models for your database. Here’s an example of how you could define a User and Post model:

```bash
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```
The User model has fields for id, name, email, and a one-to-many relationship with Post.
The Post model has fields for id, title, content, published, and a foreign key authorId that links to the User.

This is a dummy schema. Generate Schema as your wish.

## Continuous Monitoring

This project utilizes [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for continuous monitoring. Prometheus is a monitoring and alerting toolkit, while Grafana is a visualization tool for analyzing and monitoring metrics.

To set up continuous monitoring, follow these steps:

1. Install and configure Prometheus for scraping and storing metrics.

2. Set up Grafana and configure it to connect to Prometheus as a data source.

3. Import predefined dashboards or create custom dashboards in Grafana to visualize the metrics collected by Prometheus.

By setting up continuous monitoring with Prometheus and Grafana, you can monitor the performance, health, and other metrics of your application in real-time.

## Autoscaling with Kubernetes on Azure

In this project, we leverage Kubernetes for orchestration, Docker for containerization, and deploy our solutions on Azure Cloud. Kubernetes provides a powerful platform for managing containerized applications, while Docker simplifies the packaging and deployment of these applications.

To implement autoscaling in our Azure-based environment, follow these steps:

1. Create an Azure Kubernetes Service (AKS) cluster: Set up an AKS cluster to facilitate easy deployment and management of your containerized applications.

2. Configure autoscaling parameters: Define the minimum and maximum number of replicas, set target CPU or memory utilization thresholds, and establish scaling policies tailored to your application’s needs.

3. Deploy your application: Utilize Docker to containerize your application and deploy it onto the AKS cluster. Configure the necessary autoscaling rules based on performance metrics relevant to your application.

With these configurations in place, Kubernetes will dynamically adjust the number of replicas based on the defined autoscaling rules, enabling your application to efficiently scale up or down in response to varying demand. This approach ensures optimal resource utilization and maintains application performance while minimizing costs.

Feel free to modify any part of the description to better fit your project’s specifics!


## Contributors
| Name                                                                                                      | Description     |
|-----------------------------------------------------------------------------------------------------------|-----------------|
| [![GitHub azraihan](https://img.shields.io/badge/GitHub-azraihan-purple?logo=github&logoColor=white)](https://github.com/azraihan)             | Frontend, Load Testing, Monitoring, Logging |
| [![GitHub rwd51](https://img.shields.io/badge/GitHub-rwd51-purple?logo=github&logoColor=white)](https://github.com/rwd51)                   | System Design, DevOps Pipeline|
| [![GitHub mehedi-107](https://img.shields.io/badge/GitHub-mehedi-107-purple?logo=github&logoColor=white)](https://github.com/mehedi-107) | Microservice Developing|
