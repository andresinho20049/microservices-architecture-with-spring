[to go back](/README.md)

# Micro-Front-end Architecture with Microservices
Our project architecture allows for the creation of a UI in a Micro-Front-end architecture, where the front-end is separated into microservices. This approach offers several benefits.

**Key Components:**

*   **Authorization Server**: Handles authentication and authorization for the entire system.
*   **Gateway**: Acts as an entry point for client requests, routing traffic to the relevant microservices.
*   **Discovery Server**: Manages instance registration and discovery for microservices.
*   **Resource Server**: Houses the core business logic and data storage for microservices.
*   **Micro-Front-end Infrastructure**: A collection of smaller web applications, each responsible for a specific feature or page, working together to create a comprehensive user interface.

## UI's
*   **[HUB](proxima-consulting-hub/README.md)**