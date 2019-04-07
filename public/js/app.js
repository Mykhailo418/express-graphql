import React from 'react';
import {render} from 'react-dom';
import store from './redux/store';
import Root from './components/Root';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
	link: new HttpLink(),
  cache: new InMemoryCache({
		dataIdFromObject: o => o._id
	})
});

render(
	 <ApolloProvider client={client}>
			<Root store={store} />
	</ApolloProvider>,
	document.getElementById('container')
);
