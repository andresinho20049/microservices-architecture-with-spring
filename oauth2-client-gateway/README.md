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
	
	@Autowired
	private ReactiveClientRegistrationRepository clientRegistrationRepository;
	
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
  port: 8000

spring:
  application:
    name: oauth2-client-gateway
  security:
    oauth2:
      client:
        registration:
          oidc-client:
            client-id: ${RESOURCE_CLIENT_ID:resourceClient}
            client-secret: ${RESOURCE_SECRET_ID:resourceSecret}
            authorization-grant-type: authorization_code
            redirect-uri: ${GATEWAY_HOST:http://localhost:8000}/login/oauth2/code/oidc-client
            provider: spring
            scope: openid,profile
            client-name: oidc-client
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
      routes:
      - id: resource
        uri: http://localhost:8001
        predicates:
        - Path=/api/**
        filters: 
        - DedupeResponseHeader=Access-Control-Allow-Credentials Access-Control-Allow-Origin
        - TokenRelay=
        - SaveSession
        - StripPrefix=1
      {...}
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

## Future Work
*   **Implement Redis-based Session Store**: \
Store user sessions using Redis to improve user experience and application reliability.
*   **Enhance User Experience**: \
 Continue to improve the usability and responsiveness of the application to ensure a seamless user experience.