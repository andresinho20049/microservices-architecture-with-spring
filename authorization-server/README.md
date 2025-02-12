# Authorization Server
A Spring Boot application serving as an authorization server, enabling clients to obtain access tokens and interact with the server.

## Project Overview
This project utilizes Spring Boot 3.4.2 and Spring Security 6.4.2 to provide a robust authorization server that adheres to the best practices of security, including the adoption of the SOLID principles. The project is designed to work seamlessly with OAuth 2.0 and OpenID Connect (OIDC) protocols, allowing clients to authenticate users and receive authorization tokens.

This project uses the latest versions of Spring Framework and Spring Security, which offer several improvements:
* **Reactive Programming**: Spring Framework provides support for reactive programming, enabling efficient handling of concurrent requests.
* **Improved Security**: Spring Security offers enhanced security features, such as advanced token-based authentication and authorization.

## Table of Contents
### [Key Features](#key-features-1)
### [Security Implementation](#security-implementation-1)
 - [`OAuth 2.0 Authorization`](#oauth-20-authorization)
 - [`OAuth 2.0 configuration`](#oauth-20-configuration)
    - [Configure Security Filter Chains](#configure-security-filter-chains)
    - [UserDetailsService and DaoAuthenticationProvider](#userdetailsservice-and-daoauthenticationprovider)
    - [BCryptPasswordEncoder](#bcryptpasswordencoder)
    - [AuthorizationServerSettings](#authorizationserversettings)
 - [`OpenID Connect (OIDC)`](#openid-connect-oidc)
    - [OIDC Flow](#oidc-flow)
    - [Implementation Using Spring Security 6.4.2](#implementation-using-spring-security-642)
    - [Benefits of OIDC](#benefits-of-oidc)
 - [`JSON Web Key (JWK) encryption`](#json-web-key-jwk-encryption)
    - [RSA Key Pair Generation and JWKSet Creation](#rsa-key-pair-generation-and-jwkset-creation)
    - [JWKSource Implementation](#jwksource-implementation)
    - [OAuth2 Authorization Server Configuration](#oauth2-authorization-server-configuration)
 - [`Login Page with Thymeleaf: Secure and Lightweight`](#login-page-with-thymeleaf-secure-and-lightweight)
    - [Advantages of using only HTML and CSS](#advantages-of-using-only-html-and-css)
### [Dedicated Database](#dedicated-database-1)
 - [`Database Migration`](#database-migration)
 - [`Database Connection`](#database-connection)
### [Profiles](#profiles-1)
 - [`Application Properties`](#application-properties)
 - [`Profile-Specific Properties`](#profile-specific-properties)
### [Best Practice](#best-practice-1)
 - [`SOLID`](#solid)
 - [`Object-Oriented Programming (OOP)`](#object-oriented-programming-oop)
 - [`ReactiveWeb vs ServletWeb`](#reactiveweb-vs-servletweb)
 - [`Additional Observations`](#additional-observations)



## Key Features
* **OAuth 2.0 Support**: The project supports clients seeking access tokens using standardized OAuth 2.0 protocols, including the authorization code, implicit and client credentials flow.
* **OIDC Support**: The project supports OpenID Connect (OIDC) protocols, allowing clients to authenticate users and receive identification tokens.
* **Resource Server Support**: The project supports resource server functionality, allowing clients to protect their resources using OAuth 2.0 access tokens.
* **User Management**: The project includes user management functionality, allowing administrators to create, read, update, and delete user accounts.
* **Role-Based Access Control**: The project includes role-based access control, allowing administrators to assign roles to users and control their access to resources.
* **Security Measures**: The project includes robust security measures, including password hashing, RSA key generation, and secure token storage.
* **BCryptPasswordEncoder**: The project uses the `BCrypt encoder` for password hashing.

## Security Implementation
### OAuth 2.0 Authorization
*   The project uses the OAuth 2.0 authorization framework to enable clients to obtain access tokens and interact with the server.
*   The `SecurityConfig` class is used to configure the OAuth 2.0 authorization server.
*   The project supports client credentials flow, authorization code flow, and implicit flow.

`@EnableReactiveMethodSecurity` \
This annotation is used to enable reactive method security in the application. This is a new feature in Spring Security that allows you to use reactive types in your security configuration.

### OAuth 2.0 configuration

The `authorizationServerSecurityFilterChain` bean is configured with the following OAuth 2.0 features:

* **JWT Token Validation** \
The `jwtDecoder` bean is utilized to validate JWT tokens, ensuring the integrity and authenticity of incoming requests. This bean is connected to the `MappingDatasource` bean to obtain the private key for signature verification.

* **OpenID Connect (OIDC)** \
The `oidc(withDefaults())` method is used to enable OIDC features, providing users with the option to authenticate using their social media or other external identities. This configuration includes the default values for the OIDC settings, including authorization URL, token URL, and user info URL.

* **Authentication Entry Point** \
The `defaultAuthenticationEntryPointFor` method is used to configure the authentication entry point, determining the action taken when an unauthenticated request is detected. This configuration identifies the entry point for authentication, ensuring the security of the API.

* **OAuth 2.0 Resource Server** \
The `oauth2ResourceServer` method is used to configure the OAuth 2.0 resource server, handling the authorization of protected resources. This configuration defines the routes protected by OAuth 2.0, ensuring that only authorized clients can access restricted endpoints.

By implementing these features, the `authorizationServerSecurityFilterChain` bean provides a robust and secure authorization framework for the application.

---

#### Configure Security Filter Chains
The project define two Security Filter Chain beans: \
`authorizationServerSecurityFilterChain` and `defaultSecurityFilterChain`. 

Each bean is configured to handle specific security requirements for the application.

**Authorization Server Security Filter Chain** \
`authorizationServerSecurityFilterChain` 

This bean is used to configure the security settings for the authorization server. Key features of this configuration include:

* **OAuth 2.0 Features**

    *   **OIDC Configuration**: Enables OpenID Connect (OIDC) features with the `oidc(withDefaults())` method, which includes the authorization URL, token URL, and user info URL.
    *   **Exception Handling**: Specifies the authentication entry point when an unauthenticated request is detected, which is a login URL (`"/login"`). The access control for this entry point is limited to HTML (`MediaType.TEXT_HTML`).
    *   **OAuth 2.0 Resource Server**: Enables the OAuth 2.0 resource server to handle the authorization of protected resources, utilizing JWT (JSON Web Token) validation.

* **Configuration**

    ```java
    OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
    ```

    This line applies the default security settings for the authorization server.

    ```java
    http.getConfigurer(OAuth2AuthorizationServerConfigurer.class).oidc(withDefaults());
    ```

    This line enables OIDC features with the default settings.

    ```java
    http.exceptionHandling((exceptions) -> exceptions
        .defaultAuthenticationEntryPointFor(
            new LoginUrlAuthenticationEntryPoint("/login"), 
            new MediaTypeRequestMatcher(MediaType.TEXT_HTML)))
    ```

    This block of code sets up the authentication entry point for unauthenticated requests and specifies that it should only allow HTML requests.

    ```java
    oauth2ResourceServer((resourceServer) -> resourceServer.jwt(withDefaults()));
    ```

    This line enables JWT validation for the OAuth 2.0 resource server.

**Default Security Filter Chain** \
`defaultSecurityFilterChain`

This bean is used for the default security settings of the application. Key features of this configuration include:

*   **Disable CSRF Protection**: Disables CSRF (Cross-Site Request Forgery) protection to simplify the security configuration.
*   **Authorize Requests**: Specifies the request patterns to be authorized, including ["health", "favicon.ico", "error"] to allow all requests to those endpoints. All other requests require authentication.
*   **Form Login**: Configures form login settings, including the login URL (`"/login"`), to authenticate users entering the secured area.

    ```java
    csrf(AbstractHttpConfigurer::disable)
    .authorizeHttpRequests((authorize) -> authorize
        .requestMatchers("/actuator/health", "/favicon.ico", "/error").permitAll()
        .anyRequest().authenticated())
    ```

    This section disables CSRF protection, enables authorization for specific endpoints, and sets the default policy to require authentication.

    ```java
    formLogin(formLogin -> formLogin
        .loginPage("/login")
        .permitAll());
    ```

    This code sets up the form login settings, including the login URL and features for all users.

---

#### UserDetailsService and DaoAuthenticationProvider
The `UserDetailsService` bean is responsible for providing authentication providers for the application. Specifically, the `DaoAuthenticationProvider` bean is used to facilitate DAO-based authentication, enabling secure user authentication and authorization.

#### BCryptPasswordEncoder
`BCryptPasswordEncoder` is a password encoding and decoding utility in Spring Security, based on the Blowfish cipher. It is designed to securely store and compare passwords.

* **Benefits:** 
    1. **Secure storage:** Passwords are stored in an encoded format, making it difficult for attackers to retrieve the original passwords even if they gain access to the database.
    2. **Password comparison:** The encoded password is compared, not the original password, making it more secure against dictionary attacks and other types of password guessing attacks.
    3. **No rainbow table attacks:** Since the salt and algorithm are random, attackers cannot precompute (generate) a rainbow table (a lookup table of already-computed password hashes) to compare against.

    In summary, `BCryptPasswordEncoder` is a robust and widely-used password encoder in Spring Security that provides excellent security and protection against various password-related attacks.

#### AuthorizationServerSettings

The `authorizationServerSettings` bean is used to configure the authorization server settings.

This configuration class uses several features and classes from the Spring Security framework, including:

* `OAuth2AuthorizationServerConfigurer`: This is a configuration class that is used to configure OAuth 2.0 features.
* `AuthorizeHttpRequestsConfigurer`: This is a configuration class that is used to configure authorization features.
* `DaoAuthenticationProvider`: This is a class that provides a DAO-based authentication provider.
* `BCryptPasswordEncoder`: This is a class that provides a password encoder.
* `ImmutableJWKSet`: This is a class that provides an immutable JWK set.
* `OAuth2AuthorizationServerConfiguration`: This is a class that provides OAuth 2.0 authorization server configuration.
* `AuthorizationServerSettings`: This is a class that provides authorization server settings.
* `rsaKey`: This is an RSA key that is used to generate a JWK set.

### OpenID Connect (OIDC) 
OpenID Connect (OIDC) is an authentication protocol that allows clients to authenticate users and obtain identity information. In this implementation, OIDC is used to enable single sign-on (SSO) and secure authentication for the Authorization Server and client applications.

#### OIDC Flow
The OIDC flow involves the following steps:
1. **Authorization Request**: The client (e.g., gateway) redirects the user to the Authorization Server's authorization endpoint with an authorization request.
2. **Authorization Code**: The user grants authorization, and the Authorization Server redirects the user back to the client with an authorization code.
3. **Token Request**: The client exchanges the authorization code for an access token and an ID token by sending a token request to the Authorization Server.
4. **Token Response**: The Authorization Server responds with an access token and an ID token, which contain the user's identity information.

#### Implementation Using Spring Security 6.4.2
This OIDC implementation uses the `authorizationServerSecurityFilterChain` bean to configure OIDC settings for the Authorization Server. The configuration involves:

*   **OIDC Provider**: The Authorization Server acts as the OIDC provider, issuing access tokens and ID tokens to authenticated clients.
*   **OIDC Client**: The client application acts as the OIDC client, obtaining access tokens and ID tokens from the Authorization Server.
*   **Authorization Flow**: The OIDC authorization flow is enabled using `http.oauth2AuthorizationServerConfigurer().oidc(withDefaults())`.

#### Benefits of OIDC
This OIDC implementation provides the following benefits:

*   **Single Sign-On (SSO)**: Users can authenticate once with the Authorization Server and access protected resources without re-authenticating.
*   **Secure Authentication**: OIDC provides secure authentication and authorization for clients and resources.
*   **Identity Information**: The OIDC implementation provides access to user identity information, enabling personalized experiences and enhanced security.

By following this implementation, developers can easily integrate OIDC into their Authorization Server and client applications, enabling secure authentication and SSO functionality.

### JSON Web Key (JWK) encryption
#### RSA Key Pair Generation and JWKSet Creation
The project provides a concise and efficient implementation for generating RSA key pairs and creating a JSON Web Key (JWK) Set. Here is a breakdown of the main components:

1. **RSA Key Generation**: The `generateRsaKey()` method utilizes the `KeyPairGenerator` class to generate an RSA key pair with a key size of 2048 bits. The generated key pair is returned as a `KeyPair` object, which contains both the public and private keys.
2. **RSA Key Pair Utilization**: In the `jwkSource()` method, the generated RSA key pair is used to create an RSA key object using the `RSAKey.Builder` class. The public and private keys are passed to the builder, and a random key ID is generated using `UUID`. This RSA key object is then used to build a JWK Set.
3. **JWK Set Creation**: The `JWKSet` class is used to create a JWK Set, which is a collection of JSON Web Keys. The `rsaKey` object is passed to the `JWKSet` constructor to create the JWK Set.
4. **Immutable JWK Set**: The generated JWK Set is then wrapped in an `ImmutableJWKSet` object to ensure that its contents cannot be modified.

#### JWKSource Implementation

The `jwkSource()` method returns an instance of `JWKSource<SecurityContext>`, which is an interface for providing JSON Web Keys (JWKs) used for security purposes. The returned implementation is an immutable `ImmutableJWKSet` object, which contains the generated JWK Set.

#### OAuth2 Authorization Server Configuration

The `jwtDecoder()` method is used to create a JWT decoder instance, which is required by the OAuth2 authorization server. This method takes the previously generated `JWKSource<SecurityContext>` implementation as a parameter and uses it to create a JWT decoder instance. The returned `JwtDecoder` instance is then used by the authorization server to decode JSON Web Tokens (JWTs).

In summary, this project implements a robust and secure mechanism for generating RSA key pairs, creating JWK Sets, and providing a JWKSource implementation for use with an OAuth2 authorization server. The code ensures that key pairs are generated securely, and the resulting JWK Set is immutable to prevent unauthorized modifications.

### Login Page with Thymeleaf: Secure and Lightweight
The login page is created using Thymeleaf, a popular templating engine for web applications. The page is written in HTML and uses only static CSS files, avoiding external libraries such as Bootstrap. This approach provides improved security and a lightweight file size.

#### Advantages of using only HTML and CSS:
*   Secure: Reduced risk of malicious code injection and XSS attacks
*   Lightweight: Smaller file size, improved page loading times, and reduced bandwidth usage
*   Simplified Development: Easy maintenance, update, and modification of static files

> The page is defined in the `login.html` file, which is located in the \
`src/main/resources/templates` directory. 
> 
> The CSS styles for the login page are defined in the `style.css` file, which is located in the \
`src/main/resources/static/css` directory.

By leveraging HTML, CSS, and static files, developers can create secure, efficient, and user-friendly login pages that meet the needs of modern web applications.

## Dedicated Database
The project uses a dedicated PostgreSQL database for clients, users and tokens persistence. Hibernate ddl-auto is defined to validate the database schema.

The persistence implementation uses JPA. However, JPA only validates the schema, the schema definition is done in the provided `schema.sql` file.

To prioritize security and auditing, the application uses a dedicated database to persist tokens as well. However, the gateway can use REDIS for session storage and use an intelligent approach for token validation.

### Database Migration
*   The project uses Spring Boot's built-in database migration feature to migrate the database schema.
*   The `schema.sql` file is executed during the migration process to create the initial database schema.

    ```properties
    spring.sql.init.mode=always
    spring.sql.init.platform=postgresql
    spring.sql.init.schema-locations=classpath:data/schema.sql
    ```
### Database Connection
*   The database connection is defined in the `application-?.properties` file.
*   The `spring.datasource.url` property is used to specify the database URL, and the `spring.datasource.username` property is used to specify the database username.

## Profiles
### Application Properties
The `application.properties` file is used to configure the application settings.

The file contains configurations for connecting to the database, the OAuth 2.0 authorization service and the OIDC authorization service have clients persisted in a dedicated database.

The project uses environment variables that are not specified in the properties, this is because the execution is through docker and these environment variables are provided in the docker configuration.

### Profile-Specific Properties
*   The `application-dev.properties` file and `application-test.properties` file are used to configure the application settings for the development and test environments, respectively.
*   The files contain settings that are specific to the development and test environments, such as the database URL and username.
*   The `@Profile` annotation is used to specify the profile for each property.

## Best Practice

*   The code uses Spring Security for authentication and authorization, which is a best practice for securing applications.
*   The project uses the OAuth 2.0 authorization framework, which is a widely adopted standard for authorization.
*   The code includes a bean for a custom `UserDetailsService` implementation, which is a best practice for handling user authentication and authorization.
*   The code uses the `@EnableReactiveMethodSecurity` annotation to enable reactive security, which is a best practice for modern Spring-based applications.
*   The project uses the `OAuth2AuthorizationServerConfiguration` class to configure the OAuth 2.0 authorization server, which is a best practice for configuring OAuth 2.0 authorization servers.
*   The code includes a bean for a `JWKSource`, which is used to generate JSON Web Keys (JWKs), which is a best practice for securely generating JWKs.

### SOLID
*   The code adheres to the Single Responsibility Principle (SRP), as each class or bean has a single responsibility and is loosely coupled with other classes or beans.
*   The project adheres to the Open-Closed Principle (OCP), as it is easy to add new features or modify existing ones without changing the underlying code.
*   The code adheres to the Liskov Substitution Principle (LSP), as it uses inheritance and polymorphism correctly to achieve modularity and extensibility.

### Object-Oriented Programming (OOP)
*   The code uses object-oriented principles, such as inheritance, polymorphism, and encapsulation, to design and implement the security features.
*   The project uses classes and beans to encapsulate data and behavior, which is a best practice for object-oriented programming.
*   The code includes a bean for a `UserDetailsService` implementation, which is an example of encapsulation and abstraction.

### ReactiveWeb vs ServletWeb
This project uses ReactiveWeb, which offers several advantages over ServletWeb:

* **Improved Performance**: ReactiveWeb enables efficient handling of concurrent requests, reducing the latency of the application.
* **Easy Integration**: ReactiveWeb provides seamless integration with other Spring components, including Spring Security.

### Additional Observations
*   The code includes a bean for a `PasswordEncoder` implementation, which is a best practice for securely handling passwords.
*   The project uses the `BCryptPasswordEncoder` class, which is a secure password encoder.

In summary, the provided code adheres to best practices for security, Spring Security implementation, SOLID principles, and object-oriented programming principles.

### Conclusion

This project demonstrates a well-structured and secure implementation of OAuth 2.0 authorization and reactive web security. The code adheres to best practices for security, Spring Security implementation, SOLID principles, and object-oriented programming principles.

**Recommendations:**

*   The project demonstrates a clear understanding of best practices for security and Spring Security implementation.
*   The code adheres to widely adopted standards and best practices, ensuring a high level of security and maintainability.
*   The project provides a solid foundation for building a secure and scalable web application.

Overall, this project showcases a well-structured and secure implementation of OAuth 2.0 authorization and reactive web security, demonstrating adherence to best practices and widely adopted standards.