import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
///
import { setContext } from 'apollo-link-context';
// const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'; // <-- add the URL of the GraphQL server here
const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here

// const token = localStorage.getItem('token');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTMyY2Y2YzY0MTg3MDU2NDNjOWE1YjMiLCJlbWFpbCI6InN1cGVyQWRtaW4iLCJpc0FkbWluIjpmYWxzZSwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE1ODA1NTQ0MzgsImV4cCI6MTU4MDU3MjQzOH0.jRFZg08BMIkFplR3z-TuON4vC0Mu0lcbaPlgYGdBnZM';
export function provideApollo(httpLink: HttpLink, apollo: Apollo) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }));

  // this to handel any error and console log
  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.forEach(({ message, locations, path }) =>
  //       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
  //     );
  //   if (networkError) console.log(`[Network error]: ${networkError.name}`);
  // });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
