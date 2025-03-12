# Proxima Consulting HUB

This web portal was built using NextJs 15.1 and React 19, leveraging industry best practices to provide a secure and efficient user experience. The portal accesses secure resources through a Gateway built on Spring Boot, which acts as a client to an OAuth2 Authorization Server, implementing the popular BFF (Backend For Frontend) authentication flow.

## Authentication Flow
The authentication process is based on the Single Sign-On (SSO) concept, where the user is redirected to the OAuth2 server's login screen.

Upon successful login, the Authorization Server redirects the user to the portal's `/callback` route, where a fallback is configured to the gateway's `${gatewayHost}/login/oauth2/code/bff-client` endpoint.

Upon successful authentication, the gateway manages access tokens and issues session cookies to the browser.

![Diagram BFF](./public/imgs/microservices-architecture-with-spring-Page-2.drawio.svg)

## Security Considerations
The project adheres to secure authentication practices by only including session cookies in requests, which are passed between the client and server to maintain the user's login state. This approach provides several benefits:

* **Reduced vulnerability to JWT token theft:** By not passing the Authorization header with JWT, the risk of token theft is significantly mitigated since the token is not stored in plain text on the client side.

* **Improved session management:** Session cookies allow the server to keep a record of the user's session, allowing for more efficient management of user sessions and access control.

* **Improved security:** Using session cookies ensures that sensitive data such as access tokens are not transmitted in plain text, providing an additional layer of security against attacks.

The session cookies used in this project are:

* **Secure:** Set to `true` to ensure that the cookie can only be transmitted over a secure protocol (HTTPS).

* **HttpOnly:** Set to `true` to prevent JavaScript from accessing the cookie, which helps prevent cookie hijacking attacks.

* **SameSite:** Set to `None` to enable cross-origin requests, as required by the OAuth2 authorization flow.

### Middleware NextJs Security Solution
This NextJs middleware solution provides a robust security layer for protected routes in a NextJs application. It ensures that only authorized users can access secured pages, based on their role and authentication state.

**Key Features**
*   **Strong Authentication**: This middleware checks for valid authentication cookies (SESSION_BFF and SESSION_CLAIMS) on each request.
*   **Access Control**: It evaluates user permissions for each protected route, allowing only authorized users to access the page.
*   **Role-Based Access Control**: The solution supports role-based access control, ensuring that users with the required role are granted access to specific pages.
*   **Cookie Encryption**: Cookies are encrypted using AES, ensuring data security and confidentiality.

**Solution Architecture**

The solution consists of the following components:

1.  **Middleware**: The security middleware is responsible for intercepting requests, checking authentication cookies, and redirecting unauthorized users.
2.  **Page Authorization Hook**: This hook, `getPagesAuthorized`, retrieves a list of authorized pages for the current user and evaluates their permissions.
3.  **Cookie Encryption and Decryption**: The `encodeSecToBase64` and `decodeSecFromBase64` functions are utilized for secure cookie encryption and decryption.

#### Technical Details

```typescript
// Middleware NextJs Security Solution
export const config = {
    matcher: ["/secured/:path*"],
};

const middleware = (request: NextRequest) => {
    if (!request.cookies.has(SESSION_BFF) || !request.cookies.has(SESSION_CLAIMS)) return redirectError(request);

    const cookie = request.cookies.get(SESSION_CLAIMS);

    if(!cookie || !checksIfUserHasPermission(cookie.value, request.nextUrl.pathname)) return redirectError(request);

    return NextResponse.next();
};

const checksIfUserHasPermission = (cookieValue: string, pathname: string) => {

    try {
        const data = decodeSecFromBase64(cookieValue);
        const authState:AuthStateType = JSON.parse(data);

        const { getPagesAuthorized } = usePage();
        
        const pages = getPagesAuthorized(authState)
        const hasPage = pages.some(p => p.href === pathname);
        
        return hasPage;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const redirectError = (request: NextRequest) => {
    return NextResponse.redirect(new URL("/", request.url));
};

export default middleware;
```

**Benefits and Value Proposition**

*   **Enhanced Security**: Protects your application from unauthorized access, ensuring sensitive data remains secure.
*   **Role-Based Access Control**: Efficiently manage user permissions, reducing complexity and improving overall security.
*   **Cookie Encryption**: Secure cookies using AES encryption, preventing unauthorized access to sensitive information.
*   **Easy Integration**: Seamless integration with your existing NextJs application, minimizing disruption to your workflow.

## Web Performance Optimizations
The portal architecture combines the strengths of server-side rendering (SSR), client-side rendering (CSR), and static site generation (SSG) to deliver fast, SEO-friendly web content.

* **Server-Side Rendering (SSR):** The portal uses SSR pages to serve pre-rendered HTML to search engines and users, ensuring that web content is available for crawling and indexing.

* **Client-Side Rendering (CSR):** Dynamic and interactive elements are handled using CSR components, providing a seamless user experience and facilitating real-time updates.

* **Static Site Generation (SSG):** SSG is used to pre-render static pages, which are then served by the server. This approach reduces server load and allows for fast content delivery.

Here's the documentation in doc.md format:

## Static Site Generation with Dynamic Components using Tailwind
This document explains how to use Static Site Generation (SSG) with dynamic components using Tailwind in a Next.js project.

### Dynamic Accordion Component

In Next.js, we can create dynamic components without managing state using the `details` element and Tailwind's `group` or named group ex.: `group/accordion` class. This approach enables the creation of dynamic accordion components with a server-side-rendered layout.

```tsx
// src/components/server/accordion/accordion.tsx
<section className="p-2 rounded-2xl w-full">
    {
        items.map((item, idx) => (
            <details key={idx} className="group/accordion py-1.5 border-b border-gray-300">
                <summary className="[&>svg]:group-open/accordion:rotate-90 ...">
                    {item.title}
                    <SvgArrowToggle />
                </summary>
                <article className="animate-slide-in">
                    {item.content}
                </article>
            </details>
        ))    
    }
</section>
```

### SSR with Dynamic Behaviors

We can use Tailwind's `peer` utility to add customizations with CSS from user conditions or events. This enables the creation of SSR components with dynamic behaviors.

```tsx
// src/components/server/switch/switch-animated.tsx
<div>
    <input type="checkbox" className="peer sr-only" id={`${formfieldName}-toggle`} checked={checked} onChange={onChange} {...props} />
    <label htmlFor={`${formfieldName}-toggle`} className="relative flex h-4 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-accent peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-accent">
        <span className="sr-only">Enable</span>
    </label>
</div>
```

Tailwind's `peer` utility allows us to add customizations with CSS from user conditions or events. This utility enables the creation of SSR components with dynamic behaviors.

Tailwind's `peer` utility uses the CSS :checked and :focus-visible pseudo-classes to apply styles based on user interactions. This enables us to create dynamic components that respond to user actions.

In this example, we use Tailwind's `peer` utility to add customizations with CSS based on the checked state of the input checkbox.

By using Tailwind's `peer` utility, we can create SSR components with dynamic behaviors, enabling a more responsive and user-friendly experience.

With this approach, we can create dynamic components that update on the server-side, reducing the need for client-side JavaScript and improving page loading times.

## Redux
Redux is a state management library that helps to manage global state by providing a centralized store. It is widely used in modern web applications to manage complex state flows. In this documentation, we will discuss the benefits of using Redux and how it is organized in our project.

### Benefits of Using Redux
1.  **One-way data flow**: Redux ensures a one-way data flow, making it easier to reason about the state of the application. This is achieved through the use of a single source of truth, the store, and the use of pure reducers to update the state.
2.  **Global state management**: Redux provides a centralized store for global state management, making it easier to share state between components. This is achieved through the use of selectors to extract specific pieces of state from the store.
3.  **Debugging**: Redux provides a clear and concise way to debug state changes, making it easier to diagnose issues. This is achieved through the use of the Redux DevTools, which provide a visualization of the state and the actions dispatched to it.
4.  **Reusability**: Redux encourages code reusability by separating concerns and promoting modular design. This is achieved through the use of features and slices, which are independent and reusable components of state management.

### Organization of Redux in Our Project
Our Redux organization follows the standard structure suggested by Redux. We have a `store` folder at the root of our project, which contains the following subfolders:

*   `features`: Contains feature-specific Redux slices and APIs. This folder is organized by feature, with each feature having its own subfolder.
*   `hooks`: Contains reusable Redux hooks for easy state management. These hooks are designed to be used throughout our application.
*   `service`: Contains APIs and utility functions for state management.

```js
//Folder Redux
> store
|    > features
|    |    > auth 
|    |    |    auth-api.ts 
|    |    |    auth-slice.ts 
|    |    |    auth-types.ts
|    |    > graphql
|    |    |    graphql-actions.ts 
|    |    |    graphql-api.ts 
|    |    |    graphql-slice.ts
|    |    |    graphql-types.ts 
|    hooks.ts
|    Service.ts 
|    store.ts 
```

### Hooks

The `hooks` folder contains reusable Redux hooks for easy state management. These hooks are designed to be used throughout our application.

*   `useAppDispatch`: A hook that provides the `dispatch` function for easy state management. This hook allows you to dispatch actions directly from your components.
*   `useAppSelector`: A hook that provides the `getState` function for easy state management. This hook allows you to extract specific pieces of state from the store.
*   `useAppStore`: A hook that provides the `getStore` function for easy state management. This hook allows you to access the store directly from your components.

```ts
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
```

### Store.ts

The `store.ts` file contains the configuration for our Redux store. It uses the `configureStore` function from Redux Toolkit to create the store.

*   `configureStore`: A function that creates the Redux store with the specified configuration. This function is used to configure the store with the desired middleware and reducers.
*   `makeStore`: A function that creates a new Redux store instance with the specified configuration. This function is used to create a new store instance with the desired configuration.

```ts
import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/auth-api'
import authReducer from './features/auth/auth-slice'
import graphQlReducer from './features/graphql/graphql-slice'
import graphqlApi from './features/graphql/graphql-api'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      graphql: graphQlReducer,

      [authApi.reducerPath]: authApi.reducer,
      [graphqlApi.reducerPath]: graphqlApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, graphqlApi.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
```

### Components Folder

The `components` folder contains JSX components that use the Redux store. This folder is organized by feature, with each feature having its own subfolder.

*   `Layout`: A JSX component that renders the application layout. This component uses the Redux store to manage the authentication state.
*   `Page`: A JSX component that renders the application page. This component uses the Redux store to manage the GraphQL state.

**Example of usage**:
```ts
const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
useGetAuthDataQuery({skip: hasCookieClient(SESSION_BFF) && !isAuthenticated});
```

### RTK Query and Extra Reducers
RTK Query is a part of the Redux Toolkit package that simplifies state management by providing a way to fetch data from APIs and handle caching, retries, and error handling. Extra reducers are used to manage additional state not handled by RTK Query. In this document, we will explain how to use RTK Query and extra reducers together to manage complex state flows.

**RTK Query** \
RTK Query is a powerful tool for managing state flows in a Redux application. It provides a way to fetch data from APIs and handle caching, retries, and error handling. The `createApi` function is used to create an API instance that manages the state.

*   `createApi`: A function that creates an API instance that manages the state.
*   `reducerPath`: A string that specifies the path to the reducer.
*   `baseQuery`: A function that specifies the base query to use for API calls.
*   `endpoints`: An object that specifies the API endpoints to use for RTK Query.

**API Endpoints** \
API endpoints are used to specify the API calls to make when using RTK Query. The `endpoints` object is used to specify the API endpoints.

*   `query`: A function that specifies the API call to make.
*   `mutation`: A function that specifies the API call to make for a mutation.
*   `matcher`: A function that specifies the matcher to use for the API call.

**Extra Reducers** \
In Redux Toolkit, extraReducers is an optional configuration object that allows you to define additional reducers that respond to actions generated by other parts of your application, such as thunks, other slices or api.

**Example Code** \
Here is an example of how to use RTK Query and extra reducers together:

```ts
// src/store/features/auth/auth-api.ts
const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseGateway,
    endpoints: (builder) => ({
        getAuthData: builder.query<UserAuthenticatedType, {}>({
            query: () => ({
                url: "userinfo",
                method: "GET"
            }),
        }),
        logout: builder.mutation<void, {}>({
            query: () => ({
                url: "logout",
                method: "POST"
            })
        })
    })
})
export const { useGetAuthDataQuery, useLogoutMutation } = authApi;
export default authApi;
```

```ts
// src/store/features/auth/auth-slice.ts
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<AuthStateType>) => {
        builder
        .addMatcher(authApi.endpoints.getAuthData.matchFulfilled, (state, {payload, meta}) => {
            //@ts-ignore
            const isOk = meta?.baseQueryMeta?.response?.ok;
            if(isOk) {
                state.isAuthenticated = !!payload;
                state.user = payload;
                setCookieClient(SESSION_CLAIMS, state);
            }
        })
        .addMatcher(authApi.endpoints.getAuthData.matchRejected, (state, {payload, meta}) => {
            //@ts-ignore
            const isUnauthorized = meta?.baseQueryMeta?.response?.status === 401;
            if(isUnauthorized) {
                state.isAuthenticated = false;
                state.user = null;
                deleteCookie(SESSION_CLAIMS);
            }
        })
        .addMatcher(authApi.endpoints.logout.matchPending, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            deleteCookie(SESSION_CLAIMS);
            location.reload();
        })
    }
})
```

This code example shows how to use **RTK Query** and **extra reducers** together to manage the state. The `authApi` is created using the `createApi` function, and the `getAuthData` and `logout` endpoints are specified using the endpoints object. The `extraReducers` function is used to specify the extra reducers to **update the state**.

### Redux Conclusion

In this documentation, we have covered the benefits of using Redux and its organization in our project. We have discussed the structure folders, and how they contribute to a clear and maintainable state management system. By following this organization, we can ensure that our state management is robust, scalable, and easy to maintain.

## GraphQL Service with Recursive Functions
The GraphQL service developed utilizes recursive functions to perform dynamic queries to the service and display the data efficiently. The strategy used allows the service to be adapted to different data structures and be modular, which simplifies maintenance and evolution of the system.

### Recursive Functions
Recursive functions are the backbone of the GraphQL service, as they enable the system to traverse the input objects and return the data efficiently.

```ts
const propertiesToString = (data: {[key:string]:any}) => {
    ...
}

const bodyToString = (data: {[key:string]:any}):string => {

    if(!data) return "";

    const joinStr = " "

    const fields = [];
    const properties = Object.keys(data);

    for (const property of properties) {
        if (typeof data[property] === "object" && Object.keys(data[property]).length > 0) {
            if(checkIfHasAttr(data[property]))
                fields.push(`${property} { ${bodyToString(data[property])} }`);
        } else if (typeof data[property] !== "object" && !!data[property]) {
            fields.push(property);
        }
    } 
    
    return fields.join(joinStr);
}

const checkIfHasAttr = (data: {[key:string]:any}):boolean => {
    ...
}
```

These functions are used to transform the input objects into a data structure that can be easily processed and displayed to the user.

### GraphiQL
The React components were developed to display the data returned by the GraphQL service.

```tsx
export const GraphiQlContent = () => {
    ...
}

export const GraphiQlContentItem = ({title, content}:GraphiQlContentItemProps<T>) => {
    ...
}

export const GraphiQlContentItemCard = ({title, content}:GraphiQlContentItemCardProps) => {
    ...
}

export const GraphiQlContentItemShow = ({title, content}:GraphiQlContentItemShowProps) => {
    ...
}
```

These components utilize the recursive functions to transform the data returned by the GraphQL service into a data structure that can be easily displayed to the user.

### Example Usage
The examples below demonstrate how the system will use the recursive functions to transform the data returned by the GraphQL service.

```tsx
export const GraphiQlContent = () => {

    const { query } = useAppSelector(state => state.graphql);

    const company: Company = query["companyById"];
    const employees: Employee[] = query["employeeByCompanyId"];

    return (
        <main className="flex flex-col w-full h-full gap-4 justify-center items-center">
            <GraphiQlContentItem title="companyById" content={company} />
            <GraphiQlContentItem title="employeeByCompanyId" content={employees} />
        </main>
    )

}
```

In this example, the system will utilize the recursive functions to transform the data returned by the GraphQL service into a data structure that can be easily displayed to the user.

## Conclusion
Our web application is built using NextJs, following a microservices architecture to ensure scalability and security. This documentation provides details on the application's functionality, including the directory structure, state management, authentication API, GraphQL, RTK Query, and other features.

**Key Components**
1.  **State Management**: We utilize Redux with RTK Query for efficient data management and seamless communication with our central gateway, ensuring a scalable and maintainable architecture.
2.  **GraphQL & API**: Our application boasts a dynamic hook that intelligently generates API requests for any object structure, streamlining interactions with our central gateway.
3.  **Authorization and Access Control**: NextJs' integrated middleware enforces restricted access to secure routes, safeguarding sensitive data and ensuring that only authorized users can access it. Role validation further enhances the security of our application.
4.  **User Validation**: We employ encrypted cookies to validate user identities and restrict access to secure routes, maintaining the highest standards of user authentication and security.
5.  **Server-Side Rendering (SSR) and Tailwind**: Leveraging the power of SSR, our application delivers faster page loading times, improved SEO, and enhanced dynamic behaviors. When paired with Tailwind, a popular CSS framework, SSR unlocks new possibilities for creating interactive, responsive, and search engine-friendly web applications that prioritize user experience and accessibility.