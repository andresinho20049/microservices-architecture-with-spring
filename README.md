# Microservices Architecture with Spring Boot :sparkles:
This project demonstrates a scalable and secure microservices architecture built using Spring Boot, incorporating features like OAuth2 authentication/authorization, Gateway, Resource Serve and Login in the web portal using BFF (Backend For Frontend) flow.

## Table of Contents

1. [Architecture Overview](#small_orange_diamond-architecture-overview)
    1. [Advantages](#advantages)
    2. [Technology Used](#technology-used)
4. [Getting Started](#rocket-getting-started)
5. [Advantages of Using Docker and Docker Compose](#whale2-advantages-of-using-docker-and-docker-compose)
6. [Analysis of the Authentication BFF Flow](#loop-analysis-of-the-authentication-bff-flow)
7. [Benefits of this Architecture with Authorization and Resource Servers](#passport_control-benefits-of-this-architecture-with-authorization-and-resource-servers)
    1. [Key Business Benefits](#key-business-benefits)
    2. [Advantages of Authorization Servers](#advantages-of-authorization-servers)
    3. [Advantages of Resource Servers](#advantages-of-resource-servers)
    4. [Benefits of Horizontal Scaling](#benefits-of-horizontal-scaling)
    5. [Elimination of Code Duplicated](#elimination-of-code-duplication)
    6. [Boilerplate Project](#boilerplate-project)
13. [References](#bell-some-references)
14. [Copyright](#copyright-copyright)

## :small_orange_diamond: Architecture Overview
<p align="center">
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" title = "GIT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" title = "DOCKER"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" title = "OAUTH2"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" title = "JAVA"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" title = "SPRING"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" title = "GRAPHQL"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title = "TYPESCRIPT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title = "REACT"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" title = "NEXTJS"/></code>
  <code><img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" title = "POSTGRESQL"/></code>
</p>

This project is composed of the following modules:

**Authorization Server:** \
Secure OAuth2 server built on Spring 3.4.2 and Spring Security 6.4.2. \
Managing client, user authentication and profile management, token issuance, and update in a dedicated database. 

Includes Role-Based Access Control (RBAC) with fine-grained permissions for secure authorization.

**Gateway:** \
Centralized authentication, improved security, and scalability in one architecture.
* Verifies user identities via Authorization Server
* Routes authenticated requests to protected resources

**Resource Servers:** \
Resource servers can be any service your business needs. In this architecture, they are placed behind the gateway to ensure that authentication and authorization settings are performed when providing access to a resource.

This could be a service, data access, or a web console.

**Web Portal:** \
Uses the BFF (Backend For Frontend) flow to authenticate users and access resources.

### Advantages:
* **Decoupled Architecture:** Enables the inclusion of microservices with different technologies.
* **Horizontal Scalability:** Allows for the scaling of resources independently, ensuring high availability.
* **Security:** Prioritizes security throughout the project flow, without the need to implement new validations for each resource created.
* **Code Reusability:** Separates authentication and authorization logic, allowing for reusability across multiple applications.
* **Cloud-Native Solutions:** Enables the use of cloud-native solutions and serverless services, providing cost-effective billing based on usage.

### Technology used:
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
- NodeJs: 23.7.0
    - NextJs: 15.1
    - React: 19
- Postgres: 17
- Docker: 27.5.1

## :rocket: Getting Started:

To set up the project, follow these steps:

1. **Clone the repository:** \
`git clone https://github.com/andresinho20049/microservices-architecture-with-spring`
2. **Create the environment file:** \
inside the folder, Rename `.env.example` to `.env` and configure with your preferences.
3. **Run Docker Compose:** \
Execute `docker compose --env-file=./.env up`

**Note:** The first execution may take longer than a minute due to the initial image download.

Once the project is running, you can access the web portal at `http://localhost:3000` and start testing the features and services.

## :whale2: Advantages of Using Docker and Docker Compose
Our team used Docker and Docker Compose to containerize our application, achieving several benefits:
1. **Simplified Development and Deployment Process**:
	* **Consistent Environments**: Docker provides a consistent environment for your application to run in, regardless of the underlying infrastructure or operating system.
	* **Easy to Set Up and Run**: With Docker, you can easily create and manage containers that include all the dependencies required by your application. This simplifies the development process and ensures that your application is fully functional on any platform.
2. **Improved Portability and Collaboration**:
	* **Cross-Platform Compatibility**: Docker containers are platform-agnostic, which means they can run seamlessly on any operating system (Windows, Linux, macOS) or cloud provider (AWS, Azure, Google Cloud).
	* **Easy Sharing and Replication**: With Docker Compose, you can share your application configuration with others, making it easier to collaborate and replicate environments.
3. **Efficient Resource Utilization and Scalability**:
	* **Lightweight Containers**: Docker containers are incredibly lightweight, which means they use significantly fewer resources (CPU, memory) than traditional virtual machines.
	* **Easier Scaling**: With Docker Compose, you can easily scale your application horizontally by adding or removing containers as needed. This makes it easier to handle sudden spikes in traffic and ensure that your application remains responsive.

By using Docker and Docker Compose, developers can simplify their development process, improve collaboration and portability, and optimize resource utilization, making it an essential tool for modern software development workflows.

## :loop: Analysis of the authentication BFF flow:
1. When the user click on the portal login button or access the web server `/login` route, a _fallback_ is created to the gateway `${gatewayHost}/oauth2/authorization/bff-client`
2. If the user does not have an active session, the gateway redirects to the Authorization Server login screen
3. After successful login, the Authorization Server has a redirect configured to the web server on the `/callback` route
4. This web server route has a _fallback_ configured to the gateway: `${gatewayHost}/login/oauth2/code/bff-client`
5. Then the gateway authenticate the user and returns a _session cookie_.

This is the **BFF** (Backend For Frontend) login flow.

The resource servers will not be exposed to the internet and, to access them, the request must be directed to the gateway that will have the necessary configurations to access the project's resources.

The advantages of this approach include the possibility of scaling the project in a microservices architecture, ensuring security on all new resource servers implemented and without the need to develop new security validations for each new service.

If the resource servers need to communicate with each other, they can use a messaging service and avoid coupling in the project structure.

## :passport_control: Benefits of this Architecture with Authorization and Resource Servers

In today’s digital landscape, applications are becoming increasingly complex, with multiple services and resources interacting with each other. To address this complexity, a scalable and secure architecture is essential.

### Key Business Benefits:

* **Scalability and Flexibility:** Meet growing demand, deploy resources to different environments with minimal effort, and improve collaboration between teams.
* **Improved Security:** Reduce vulnerability, enhance compliance, and protect sensitive data with a decoupled architecture.
* **Faster Time-to-Market:** Reduce cycle time, improve collaboration, and deploy new features and services faster.
* **Cost Savings:** Efficient resource utilization, reduce waste, minimize costs associated with over-provisioning or under-provisioning.
* **Better Maintenance and Support:** Easier troubleshooting, improved support, and reduced complexity in maintaining individual services.

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

4. **Web Services Architectures**: \
This project allows the use of different Web Services architectures in the resource servers, such as:
    * REST
    * GraphQL
    * gRPC
    * WebSocket
    * MQTT/AMQP

5. **Messaging Services**: \
This project enables the use of messaging services between resources, making the project structure decoupled and allowing for easier scaling and maintenance.

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

### Boilerplate Project:
This project can be used as a boilerplate for future microservices architecture projects, providing a scalable and secure foundation for building complex applications.

## :bell: Some references
Take a look at our other projects and see how they can help you build a more efficient and automated workflow:
  * [Chatbot Lumin](https://github.com/andresinho20049/chatbot-lumin) \
  Lumin is a ChatBot built on Streamlit, using Langchain for AI power. 
  * [Dockerized Jenkins](https://github.com/andresinho20049/dockerized-jenkins) \
  A Dockerized version of Jenkins for streamlined CI/CD pipeline management
  * [iac-aws-ecs-with-terraform](https://github.com/andresinho20049/iac-aws-ecs-with-terraform) \
  A Infrastructure as Code (IaC) solution using Terraform for AWS ECS management

## :copyright: Copyright
**Developed by** [Andresinho20049](https://andresinho20049.vercel.app/) \
**Project**: Microservices Architecture with Spring Boot \
**Description**: \
This microservices architecture project, built with Spring Boot, demonstrates a scalable and secure solution for managing user authentication, authorization, and resource access. The project features a decoupled architecture, efficient resource utilization, and horizontal scaling capabilities, making it an ideal solution for modern applications. With Docker and Docker Compose, the project ensures ease of use and deployment, allowing for rapid development and testing of new features and services.

[Go Back](#microservices-architecture-with-spring-boot-sparkles)