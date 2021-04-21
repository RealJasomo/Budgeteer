import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from './context/AuthContext';

 const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_GRAPHQL
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
   </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);