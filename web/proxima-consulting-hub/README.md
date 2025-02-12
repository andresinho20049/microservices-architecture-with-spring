# Proxima Consulting HUB

This web portal was built using NextJs 15.1 and React 19, leveraging industry best practices to provide a secure and efficient user experience. The portal accesses secure resources through a Gateway built on Spring Boot, which acts as a client to an OAuth2 Authorization Server, implementing the popular BFF (Backend For Frontend) authentication flow.

## Authentication Flow
-------------------------

The authentication process is based on the Single Sign-On (SSO) concept, where the user is redirected to the OAuth2 server's login screen.

Upon successful login, the Authorization Server redirects the user to the portal's `/callback` route, where a fallback is configured to the gateway's `${gatewayHost}/login/oauth2/code/bff-client` endpoint.

Upon successful authentication, the gateway manages access tokens and issues session cookies to the browser.

## Security Considerations
The project adheres to secure authentication practices by only including session cookies in requests, which are passed between the client and server to maintain the user's login state. This approach provides several benefits:

* **Reduced vulnerability to JWT token theft:** By not passing the Authorization header with JWT, the risk of token theft is significantly mitigated since the token is not stored in plain text on the client side.

* **Improved session management:** Session cookies allow the server to keep a record of the user's session, allowing for more efficient management of user sessions and access control.

* **Improved security:** Using session cookies ensures that sensitive data such as access tokens are not transmitted in plain text, providing an additional layer of security against attacks.

The session cookies used in this project are:

* **Secure:** Set to `true` to ensure that the cookie can only be transmitted over a secure protocol (HTTPS).

* **HttpOnly:** Set to `true` to prevent JavaScript from accessing the cookie, which helps prevent cookie hijacking attacks.

* **SameSite:** Set to `None` to enable cross-origin requests, as required by the OAuth2 authorization flow.

## Web Performance Optimizations
The portal architecture combines the strengths of server-side rendering (SSR), client-side rendering (CSR), and static site generation (SSG) to deliver fast, SEO-friendly web content.

* **Server-Side Rendering (SSR):** The portal uses SSR pages to serve pre-rendered HTML to search engines and users, ensuring that web content is available for crawling and indexing.

* **Client-Side Rendering (CSR):** Dynamic and interactive elements are handled using CSR components, providing a seamless user experience and facilitating real-time updates.

* **Static Site Generation (SSG):** SSG is used to pre-render static pages, which are then served by the server. This approach reduces server load and allows for fast content delivery.

## Dynamic Page Rendering
To address the limitations of SSG, the portal implements a server-driven dynamic page rendering engine using WebHook or Pooling architectures. This approach allows the server to load SSG screens dynamically, providing a balance between server load and user experience.

## Implementation Details
* The project is built using NextJs 15.1 and React 19, following best practices for both technologies.
* The gateway is developed with Spring Boot, implementing an OAuth2 client.
* The authentication flow is based on the BFF architecture, providing a secure and efficient user experience.
* The portal's frontend architecture optimizes web performance through the combination of SSR, CSR, and SSG components.