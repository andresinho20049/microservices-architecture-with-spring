# Microservices Architecture with Spring Boot

This project demonstrates a scalable and secure microservices architecture built using Spring Boot, incorporating features like OAuth2 authorization, Spring Gateway, and Next.js using the BFF (Backend For Frontend) flow.

## :small_orange_diamond: Architecture Overview
<p align="center">
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" title = "GIT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" title = "DOCKER"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" title = "NEXTJS"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" title = "GIT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" title = "GIT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" title = "GIT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title = "TYPESCRIPT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title = "REACT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" title = "NEXTJS"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" title = "NEXTJS"/></code>
</p>

The system consists of four main components:
1. **Spring Authorization Server**: \
    Manages user authentication and authorization.
	* Built with: Spring Security and oauth2-authorization-server
	* Integrates with the Client Server for authentication and authorization checks
2. **Resource Server**: \
    Handles business logic and provides data access to clients.
	* Built with: Spring Web, oauth2-resource-server and oauth2-jose
	* i.e.: Exposes GraphQL endpoints for data retrieval and manipulation
3. **Client Server**: \
    Acts as an entry point for clients, routing incoming requests to the Resource Server.
	* Built with: Spring Web and oauth2-client
	* i.e.: Spring Gateway being a client of our authorization server
4. **Frontend (Next.js)**: \
    Handles frontend logic, interacting with the BFF (Backend For Frontend) through the Gateway Server.

### :octocat: Technology Used:
  - Java: 17
    - Maven: 3.9.9
    - Spring-Boot: 3.4.2
      - spring-boot-starter-web: 3.4.2
      - spring-boot-starter-oauth2-client: 3.4.2
      - spring-boot-starter-oauth2-resource-server: 3.4.2
      - spring-security-oauth2-authorization-server: 1.4.1
      - spring-boot-starter-security: 6.4.2
      - spring-security-oauth2-jose: 6.4.2
      - spring-cloud-starter-gateway: 4.2.0
      - spring-boot-starter-graphql: 1.3.3
  - NodeJs: 22.13.0
    - NextJs: 15.1
    - React: 19
  - Postgres: 15.10
  - Docker: 27.4.0

## :small_blue_diamond: Docker and Docker Compose

The system is built using Docker and Docker Compose for containerization and orchestration.

* **Dockerfile**: Located in each service's root directory, defines the base image and application settings.
* **docker-compose.yml**: Defines the services, their dependencies, and configuration files, used to orchestrate.

### Advantages of Using Docker and Docker Compose
Our team used Docker and Docker Compose to containerize our application, achieving several benefits:

1. **Isolation and Portability**: \
Containers isolate applications from each other and are highly portable.
2. **Efficient Resource Utilization**: \
Containers allocate resources efficiently by creating multiple containers on a single host.
3. **Simplified Deployment**: \
Docker Compose defines a `docker-compose.yml` file that describes the application's composition, making deployment easy.


## :key: Benefits of Authorization Servers and Resource Server Architecture

In today’s digital landscape, applications are becoming increasingly complex, with multiple services and resources interacting with each other. To address this complexity, a scalable and secure architecture is essential.

### Advantages of Authorization Servers
Authorization servers serve as the central hub for authentication and authorization decisions. They validate user credentials, ensure appropriate permissions, and provide access control lists (ACLs) to restrict access to sensitive resources. The advantages of using an authorization server include:

1. **Single point of failure**: \
With a centralized authorization server, there is only one point of failure, making it easier to manage and maintain security.

2. **Decoupling**: \
Authorization servers can be decoupled from specific resources, allowing for greater flexibility in terms of scalability and deployment.

3. **Reusability**: \
By separating authentication and authorization logic, developers can reuse the same authorization server across multiple applications, reducing code duplication.

### Advantages of Resource Servers
Resource servers are responsible for providing access to specific data or services. They communicate with the authorization server to obtain permissions before serving requests. The benefits of using resource servers include:

1. **Security**: \
By separating authentication and authorization logic, resources can focus on providing secure access to sensitive data without compromising security.

2. **Decoupling**: \
Resource servers can be decoupled from specific applications, allowing for greater flexibility in terms of scalability and deployment.

3. **Scalability**: \
Resource servers can be scaled independently, ensuring that applications can handle increased traffic and demand.

### Benefits of Horizontal Scaling
One of the most significant advantages of this architecture is its ability to scale horizontally without compromising security.

The development of demands can be scaled, with the possibility of developing new resources focusing only on the solution and the business, without the need to create new security implementations for each new resource.

With new resources in microservices architecture, services can be scaled horizontally to meet high demands. 

**This allows for:**
* Scalability without expanding infrastructure
* Use of cloud-native solutions and serverless services
* Cost-effective billing based on usage

### Elimination of code duplication
Another significant advantage is the elimination of code duplication. By separating the authentication and authorization logic, developers can focus on providing value to users without duplicating code. This approach also allows:

1. **Easier maintenance**: \
Simplify maintenance tasks by reducing the complexity of code bases.

2. **Faster development**: \
Focus on developing new resources and services without worrying about repetitive coding.

## Spring Framework Stacks: Traditional vs Reactive

The Spring Framework offers two primary development stacks for building web applications: 
the traditional **Servlet Stack** and the **Reactive Stack**. 
Both approaches have distinct characteristics that impact performance, scalability, and resource utilization.

### Traditional Servlet Stack

This classic stack is based on synchronous programming with a blocking/IO architecture. Each request requires a response before proceeding, leading to increased latency and hardware consumption as thread pools are incremented for high API call traffic.

### Reactive Stack

Released in Spring Framework 5, the Reactive Stack prioritizes non-blocking/IO operations and efficient concurrency handling. By embracing this approach, applications can scale better with fewer resources, operating on the "less is more" principle. 

**The Reactive Stack features**:
* Non-blocking I/O architecture
* Servlet Container 3.1 support
* Netty Server integration
* Spring WebFlux Framework for reactive web development

### Key Differences

**Servlet stack**:
- Synchronous programming
- Blocking/IO architecture
- Increased latency and hardware consumption

**Reactive stack**:
- Asynchronous programming
- Non-blocking I/O architecture
- Efficient concurrency handling with fewer resources

### R2DBC: A Key Enabler

The R2DBC (Reactive Relational Database Connectivity) library bridges the gap between traditional JDBC and the Spring Framework Reactive Stack. By providing a reactive interface to relational databases, R2DBC enables developers to write asynchronous database operations that can be executed concurrently with other application tasks.

### Conclusion
In conclusion, the Spring Framework Reactive Stack represents a significant departure from traditional synchronous programming approaches. By embracing asynchronous programming and the "less is more" philosophy, applications can scale more efficiently, handle high concurrency levels, and reduce latency. With R2DBC as a key enabler, developers can now build highly performant reactive applications that are better suited to meet the demands of large-scale web traffic.

## :office: Business Solution Presentation

### Solution Overview
Our company aims to provide a comprehensive web portal for our consultancy firm, enabling efficient management of client relationships, employee tasks, and project resources. The portal will cater to three primary user types: Admin, Consultant, and Client.

#### Functional Requirements

1. **Registration and Management**
	* Register companies, projects, and employees
	* Track employee entries (payment, timesheet)
2. **Project Resource Allocation**
	* Calculate allocated hours linked to projects
3. **User Access Control**
	* Admin access to all registered companies
	* Consultant access to assigned companies
	* Client access to their own company

#### Non-Functional Requirements

1. **Security and Authentication**
	* Secure authentication using Authorization Server, Resource Server, Gateway, and Client Server architecture
	* Implement BFF (Backend For Frontend) flow for seamless frontend authentication
2. **Scalability and Performance**
	* Run all services in Docker containers with Docker Compose for efficient deployment and scaling
3. **Data Management**
	* Store data in Postgres database
	* Utilize PL/SQL for business logic, such as hourly rate calculation

### Technical Overview
1. **Backend**
	* Java Spring Boot framework for development
	* Authorization Server, Resource Server, Gateway, and Client Server architecture for secure authentication and access control
2. **Frontend**
	* Next.js for building the web portal's frontend
3. **Database**
	* Postgres database for storing user data and business logic implementation (PL/SQL)
4. **Infrastructure**
	* Docker containers for all services with Docker Compose for efficient deployment and scaling

### Resource Server Architecture

The Resource Server will utilize GraphQL as its primary data retrieval mechanism. This allows for a flexible and schema-driven approach to defining the structure of our data.

#### GraphQL Schema

Our GraphQL schema will define the following types:

* **Company**: represents a registered company, with fields such as `id`, `name`, and `address`
* **Project**: represents a project, with fields such as `id`, `name`, and `description`
* **Employee**: represents an employee, with fields such as `id`, `name`, and `email`
* **Timesheet**: represents a timesheet entry, with fields such as `id`, `employeeId`, and `projectId`

The schema will also define resolvers for each type, which will handle queries and mutations to the data.

### Benefits

1. Improved security and authentication features
2. Enhanced scalability and performance
3. Efficient data management and business logic implementation
4. Flexible and schema-driven approach to defining data structure using GraphQL

### Conclusion
Our proposed solution addresses the functional and non-functional requirements of the web portal, providing a secure, scalable, and efficient platform for managing client relationships, employee tasks, and project resources. The use of GraphQL in the Resource Server architecture will provide a flexible and schema-driven approach to defining our data structure, allowing us to efficiently manage and retrieve data as needed.

## :bell: Some references
Take a look at our other projects and see how they can help you build a more efficient and automated workflow:
  * [Chatbot Lumin](https://github.com/andresinho20049/chatbot-lumin) \
  An AI-powered chatbot built with me to provide 24/7 support and assistance
  * [Dockerized Jenkins](https://github.com/andresinho20049/dockerized-jenkins) \
  A Dockerized version of Jenkins for streamlined CI/CD pipeline management
  * [iac-aws-ecs-with-terraform](https://github.com/andresinho20049/iac-aws-ecs-with-terraform) \
  A Infrastructure as Code (IaC) solution using Terraform for AWS ECS management

## :copyright: Copyright
**Developed by** [Andresinho20049](https://andresinho20049.com.br/) \
**Project**: Microservices Architecture with Spring Boot \
**Description**: \
Transform Your Business with a Secure, Scalable, and Efficient Portal for Client Relationships, Employee Tasks, and Project Resources. \
A cutting-edge web portal that empowers businesses to manage client relationships, employee tasks, and project resources with ease, leveraging advanced security features, scalable performance, and efficient data management.