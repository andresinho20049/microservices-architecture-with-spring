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