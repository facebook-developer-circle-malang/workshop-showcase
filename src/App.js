import React, { Component } from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, Card, Icon } from 'semantic-ui-react'
import workshop1 from './showcase/workshop-01'
import uuid from 'uuid'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import Showcase from './Showcase'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.github.com/graphql',
    opts: {
      headers: {
        Authorization: 'bearer a92a4957bd87937c1cd4bd8f9e95921b35b58e3c'
      }
    }
  }),
});

class App extends Component {
  render() {
    const showcase1 = (
      <div>
        <Header as='h3' icon textAlign='center' style={{ marginTop: '30px' }}>
          <Header.Content>
            {workshop1.title}
          </Header.Content>
        </Header>
        <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
          {workshop1.showcases.map(show => <Showcase {...show} />)}
        </Card.Group>
      </div>
    )

    return (
      <ApolloProvider client={client}>
        <Container fluid style={{ padding: '20px' }}>
          <Header as='h2' icon textAlign='center' style={{ marginTop: '30px' }}>
            <Header.Content>
              Workshop Showcase
            </Header.Content>
          </Header>
          {showcase1}
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
