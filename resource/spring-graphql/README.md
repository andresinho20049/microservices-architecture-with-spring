[to go back](/resource/README.md)

# Microservice Solution: GraphQL API
This microservice solution provides a secure, scalable, and efficient GraphQL API for managing companies, employees, positions, paychecks, projects, and timesheets. The API is built using Spring Boot and Spring GraphQL, leveraging Java 17 and supporting database connectivity through R2DBC.

## Architecture
The solution consists of a single microservice, developed using Spring Boot, which provides a GraphQL API for the following use cases:

*   Retrieve company data (e.g., company details, employees, positions, projects)
*   Create, update, and delete employees, positions, paychecks, projects, and timesheets

This microservice is part of a larger microservices architecture that includes an Authorization Server, Gateway, and Discovery Service. However, the focus of this document is on the GraphQL API and its benefits.

### Technical Requirements
*   Java 17
*   Spring Boot 3.4.2
    *   Spring GraphQL
    *   R2DBC
    *   Eureka Service Registry
*   PostgreSQL 17

### Advantages of GraphQL
1.  **Query Optimization**: GraphQL enables the client to request only the necessary data, reducing the amount of data transferred over the wire.
2.  **Faster Development**: With GraphQL, you can define the schema in a single file, making it easier to manage and evolve.
3.  **Improved Error Handling**: GraphQL provides built-in error handling and validation, reducing the complexity of error management.
4.  **Single API Endpoint**: GraphQL exposes a single API endpoint for querying and mutating data, simplifying the client-side development.

## Schema
The GraphQL schema is defined in multiple files to promote scalability and organization:

*   `schema.graphqls`: Defines the schema and its types.
*   `company.graphqls`: Defines the `Company` type and its fields.
*   `employee.graphqls`: Defines the `Employee`, `Paycheck` and `Position` type and its fields.
*   `project.graphqls`: Defines the `Project` type and its fields.
*   `timesheet.graphqls`: Defines the `Timesheet` type and its fields.

```graphql
# schema.graphqls
schema {
  query: Query
  mutation: Mutation
}

type Query {
  companyById(id: ID!): Company
  employeeByCompanyId(companyId: ID!): [Employee]
  projectByCompanyId(companyId: ID!): [Project]
  positionByCompanyId(companyId: ID!): [Position]
  paycheckByCompanyId(companyId: ID!): [Paycheck]
  timesheetByCompanyId(companyId: ID!): [Timesheet]
}

type Mutation {
  createEmployee(employee: EmployeeInput!): Employee
  createPosition(position: PositionInput!): Position
  createPaycheck(paycheck: PaycheckInput!): Paycheck
  createProject(project: ProjectInput!): Project
  createTimesheet(timesheet: TimesheetInput!): Timesheet

  updateEmployee(id: ID!, employee: EmployeeInput!): Employee
  updatePosition(id: ID!, position: PositionInput!): Position
  updatePaycheck(id: ID!, paycheck: PaycheckInput!): Paycheck
  updateProject(id: ID!, project: ProjectInput!): Project
  updateTimesheet(id: ID!, timesheet: TimesheetInput!): Timesheet
}
```

```graphql
# company.graphqls
type Company {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  name: String!
  shortName: String!
  taxId: String!
  description: String
  positions: [Position!]!
  employees: [Employee!]!
  projects: [Project!]!
}
```

```graphql
# employee.graphqls
type Position {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  name: String!
  company: Company!
  employees: [Employee!]!
}

type Employee {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  name: String!
  birthDate: String
  position: Position!
  hireDate: String!
  terminationDate: String
  note: String
  company: Company!
  paychecks: [Paycheck!]!
  timesheets: [Timesheet!]!
}

type Paycheck {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  employee: Employee!
  payDate: String!
  grossEarn: Float!
  deduction: Float!
  netPay: Float!
  company: Company!
}
```

```graphql
# project.graphqls
type Project {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  name: String
  description: String
  projectStart: String!
  projectEnd: String
  company: Company!
  timesheets: [Timesheet!]!
}
```

```graphql
# timesheet.graphqls
type Timesheet {
  id: ID!
  createdAt: String!
  updatedAt: String!
  updatedUsername: String!
  employee: Employee!
  project: Project!
  periodStart: String!
  periodEnd: String!
  company: Company!
}
```

## Eureka Service Registry
The solution uses Eureka as a Service Discovery Service to manage and register microservices. Eureka provides the following features:

*   **Service Registration**: The microservice registers itself with Eureka, including its instance details and metadata.
*   **Service Discovery**: Clients can query Eureka to discover available instances of the microservice, allowing for load balancing and re-direction.

## Benefits of OAuth2-Based Resource Server
In the context of distributed systems and microservices architecture, it's essential to separate concerns and ensure secure communication between services. The OAuth2-based resource server approach offers several benefits:

### Secure Microservice
By leveraging an OAuth2-based resource server, you can ensure that only authorized clients are granted access to the microservice. This adds an extra layer of security and reduces the attack surface, as you don't need to implement security mechanisms within the microservice.

### Decoupling Concerns
OAuth2 authentication and authorization are decoupled from the microservice's business logic, allowing you to focus on developing and innovating the main functionality of the microservice, while the authorization and authentication are handled by the OAuth2 library.

### Simplified Development
With an OAuth2-based resource server, you can code a secure solution more quickly, as you have a preimplemented authorization mechanism that your clients don't need to implement into their systems. This reduces the complexity of security development and lets you focus on developing the core functionalities.

### Client Authentication and Authorization
OAuth2 ensures that clients can authenticate and be authorized, even if the client code isn't secure. Only the parties that have been pre-authorized by the Authorization Server through access grants and have the correct credentials will be able to access the sensitive data or function.

The benefits of OAuth2 for a Resource Server can be summarized as follows:
*    **Improved Security** : Builds in a two-factor authentication mechanism that secures the server.
*    **Less Maintenance** : Provides a separated service of authorization and access control with increased scalability.
*    **Decoupling** : Allows services to access the server using security and does not build in mechanisms with complexity.

## Conclusion
In this document, we explored the implementation of a distributed system architecture using Spring Boot, Eureka Service Registry, and OAuth2-based authentication and authorization. This approach provides a scalable, secure, and maintainable solution for microservices-based applications.

The use of Eureka Service Registry enables automatic service discovery, load balancing, and instance management, while OAuth2-based authentication and authorization ensures secure communication between services and clients. By leveraging these technologies, we can:

*   Achieve secure communication between services and clients
*   Decouple concerns between authentication, authorization, and business logic
*   Simplify development and reduce security complexities

In a world where security and scalability are paramount, this architecture provides a solid foundation for building robust and maintainable distributed systems. By separating concerns, improving security, and reducing maintenance, this approach enables teams to focus on developing innovative solutions without compromising on security or scalability.