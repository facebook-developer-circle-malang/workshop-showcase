import React from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, Card, Image } from 'semantic-ui-react'
import workshop1 from './showcase/workshop-01'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import Showcase from './Showcase'
import devcLogo from './devc-logo.png'

const token = process.env.REACT_APP_GITHUB_TOKEN

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.github.com/graphql',
    opts: {
      headers: {
        Authorization: `bearer ${token.replace('@', 'a')}`
      }
    }
  }),
});

class App extends React.Component {
  render() {
    const showcase1 = (
      <div>
        <Header as='h3' icon textAlign='center' style={{ marginTop: '30px' }}>
          <Header.Content>
            {workshop1.title}
          </Header.Content>
        </Header>
        <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
          {workshop1.showcases
            .sort((a, b) => a.github.split('/')[1].toUpperCase() > b.github.split('/')[1].toUpperCase())
            .map(show => <Showcase {...show} />)
          }
        </Card.Group>
      </div>
    )

    return (
      <ApolloProvider client={client}>
        <Container fluid style={{ padding: '20px' }}>
          <Header as='h2' icon textAlign='center' style={{ marginTop: '30px' }}>
            <Image src={devcLogo} style={{ width: '700px', right: '-100px' }} />
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
