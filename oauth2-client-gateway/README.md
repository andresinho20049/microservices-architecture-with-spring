[to go back](/README.md)

# OAuth2 Client & Gateway
The OAuth2 Client & Gateway is a security mechanism that enables secure authentication and authorization for web applications. It is a key component of the OAuth2 protocol, which allows applications to access resources on behalf of users securely.

## Features
* Secure authentication using Oauth2 protocol
* Oauth2 login with PKCE enabled
* Secure logout with multiple strategies (Session and SecurityContext)
* Rate limiting to control incoming API requests
* Circuit breaker pattern to prevent cascading failures

## Technical Details

* **Spring Boot Version:** 3.4.2 - The latest version of Spring Boot that provides a robust and reliable framework for building web applications.
* **Java Version:** Java 17 includes several security improvements that aim to protect the integrity and reliability of code. Key improvements include:
    * **Individual Plugin Control** : Allows developers to configure plugin permissions for each site, reducing the risk of malicious attacks.
    * **Sealed Classes and Interfaces** : Prevents code from being overloaded or tampered with, reducing the risk of errors.
    * **Class Hierarchy Restrictions** : Prevents unwanted code modifications, reducing the risk of errors.
    * **Permission to List Sealed Classes** : Allows developers to list classes that extend sealed classes, protecting code integrity.
* **WebFlux:** WebFlux is used to build a reactive web application that can handle multiple requests concurrently, providing high performance and scalability.
* **ReactiveClientRegistrationRepository:** This bean is responsible for registering and managing OAuth2 clients.
* **SecurityWebFilterChain:** This bean is responsible for configuring the security filter chain for the application.

## Security Configuration
This code is a configuration class for implementing Oauth2 security in a Spring Cloud Gateway application. The class is annotated with `@Configuration` and `@EnableWebFluxSecurity` to enable WebFlux security.

```java
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
	
	private ReactiveClientRegistrationRepository clientRegistrationRepository;

	public SecurityConfig(ReactiveClientRegistrationRepository clientRegistrationRepository) {
		this.clientRegistrationRepository = clientRegistrationRepository;
	}
	
	@Bean
	SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
	    DelegatingServerLogoutHandler logoutHandler = new DelegatingServerLogoutHandler(
	            new SecurityContextServerLogoutHandler(), new WebSessionServerLogoutHandler());
		
		http
			.csrf(csrf -> csrf.disable())
			.authorizeExchange(authorize -> authorize
				.pathMatchers("/login").permitAll()
				.anyExchange().authenticated())
			.oauth2Login(oauth2Login -> oauth2Login
				.authorizationRequestResolver(authorizationRequestResolver(clientRegistrationRepository)))
			.logout((logout) -> logout.logoutHandler(logoutHandler));
		
		return http.build();
	}
	
	private ServerOAuth2AuthorizationRequestResolver authorizationRequestResolver(ReactiveClientRegistrationRepository clientRegistrationRepository) {
		DefaultServerOAuth2AuthorizationRequestResolver authorizationRequestResolver = 
				new DefaultServerOAuth2AuthorizationRequestResolver(clientRegistrationRepository);
		
		authorizationRequestResolver
				.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
		
		return authorizationRequestResolver;
	}
	
}
```

### Security Web Filter Chain
The `securityWebFilterChain` method is used to configure the security web filter chain. \
It creates a `DelegatingServerLogoutHandler` that handles both security context and web session logout.

#### The method also configures the following:

*   **CSRF Protection**: CSRF protection is disabled for API requests to prevent compatibility issues.
*   **Authorize Exchange**: Authorization is required for all API requests except the login endpoint.
*   **Oauth2 Login**: Oauth2 login is enabled with an authorization request resolver.
*   **Logout Handler**: A logout handler is configured to handle both security context and web session logout.

### Authorization Request Resolver
The `authorizationRequestResolver` method is used to configure an authorization request resolver. It creates a `DefaultServerOAuth2AuthorizationRequestResolver` instance and configures it to use PKCE (Proof Key for Code Exchange).

The resolver is used to customize the authorization request to include the PKCE code challenge.

This configuration class enables Oauth2 security in a Spring Cloud Gateway application. It configures a security web filter chain and an authorization request resolver to provide secure authentication and authorization for API requests.

## Configuration

This project is configured with the `application.yml`:

```yaml
server:
  port: ${GATEWAY_PORT:8080}
  reactive:
    session:
      cookie:
        name: SESSION_BFF

spring:
  application:
    name: oauth2-client-gateway
  security:
    oauth2:
      client:
        registration:
          bff-client:
            client-id: ${BFF_CLIENT_ID:bffClient}
            client-secret: ${BFF_SECRET_ID:bffSecret}
            authorization-grant-type: authorization_code
            redirect-uri: ${WEB_HOST:http://localhost:3000}/callback
            provider: spring
            scope: openid,profile
            client-name: bff-client
        provider:
          spring:
            issuer-uri: ${AUTHORIZATION_HOST:http://localhost:9000}
  cloud:
    gateway:
      globalcors:
        add-to-simple-url-handler-mapping: true
        cors-configurations:
          '[/**]':
            allow-credentials: true
            allowed-headers: '*'
            allowed-origins: ${ALLOWS_CORS_ORIGIN:http://localhost:3000}
            allowed-methods:
            - GET
            - POST
            - PUT
            - DELETE
            - OPTIONS
            - HEAD
            exposed-headers:
            - Access-Control-Allow-Origin
            - Access-Control-Allow-Headers
      default-filters:
      - TokenRelay=bff-client
      - SaveSession
      - DedupeResponseHeader=Access-Control-Allow-Credentials Access-Control-Allow-Origin
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
          
eureka:
  client:
    service-url:
      defaultZone: ${EUREKA_PROTOCOL:http}://${EUREKA_USER:eureka}:${EUREKA_PASS:eureka_pass}@${EUREKA_HOST:localhost}:${EUREKA_PORT:8761}/eureka
      fetch-registry: true
      register-with-eureka: true

logging:
  level:
    root: info
    '[com.andresinho20049]': debug
```

> **Required environment variables:**
> * `RESOURCE_CLIENT_ID`
> * `RESOURCE_SECRET_ID`
> * `BFF_CLIENT_ID`
> * `BFF_SECRET_ID`
> * `AUTHORIZATION_HOST`

## Benefits of Using Spring Cloud Gateway

* **Easy Management:** Spring Cloud Gateway provides easy management and configuration of APIs, making it suitable for complex and dynamic environments.
* **High Performance:** WebFlux provides high performance and scalability, making it suitable for large-scale applications.
* **Security:** Oauth2 authentication and rate limiting provide secure authentication and authorization for users.
* **Flexibility:** Spring Cloud Gateway provides flexibility in configuring and managing APIs, making it suitable for diverse applications.

## Using Eureka Server with Spring Cloud Gateway:
Eureka Server is a service discovery mechanism that enables microservices to register and discover each other at runtime. When used in conjunction with Spring Cloud Gateway, Eureka Server provides several advantages:

1.  **Decentralized Registration**: Eureka Server allows services to register themselves, enabling decentralized registration and making it easier to manage large-scale applications.
2.  **Instance Discovery**: Eureka Server automatically detects instances of registered services, ensuring that only active instances are used in routing decisions.
3.  **Load Balancing**: By actively monitoring and updating instance lists, Eureka Server facilitates load balancing and helps ensure that traffic is distributed efficiently.
4.  **Automatic Fault Tolerance**: If an instance becomes unavailable, Eureka Server marks it as down, allowing Spring Cloud Gateway to route requests around the failing instance automatically.
5.  **Enhanced Security**: By hosting service definitions and instance metadata in Eureka Server, Spring Cloud Gateway can enforce security-related obligations more effectively, such as authentication and authorization.

To leverage these advantages, an application using Spring Cloud Gateway with Eureka Server would first need to register its services with Eureka Server. Then, when routing decisions are made, Spring Cloud Gateway would use the Eureka Server's list of active instances to determine the appropriate target for the request.

## Future Work
*   **Implement Redis-based Session Store**: \
Store user sessions using Redis to improve user experience and application reliability.
*   **Enhance User Experience**: \
 Continue to improve the usability and responsiveness of the application to ensure a seamless user experience.
