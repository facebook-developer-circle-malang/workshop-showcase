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
          <a href="https://github.com/facebook-developer-circle-malang/workshop-showcase">
            <img
              style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
              src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
              alt="Fork me on GitHub"
              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            />
          </a>
          <Header as='h2' icon textAlign='center' style={{ marginTop: '30px' }}>
            <Image src={devcLogo} style={{ width: '500px' }} />
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
