import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo';

const root = document.getElementById('root');

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:5000',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root
);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    ReactDOM.render(
      <ApolloProvider client={client}>
        <NextApp />
      </ApolloProvider>,
      root
    );
  });
}
