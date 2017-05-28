import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import uuid from 'uuid'
import moment from 'moment-timezone'
import ContentLoader, { Rect } from 'react-content-loader'
import imgPlaceholder from './image-placeholder.png'

class Showcase extends React.Component {

  render() {
    const { data } = this.props

    if (!data.repository) {
      return (
        <Card key={uuid.v4()}>
          <Image fluid src={imgPlaceholder} />
          <Card.Content>  
            <ContentLoader>
              <Rect x={20} y={80} height={10} radius={5} width={300} />
              <Rect x={20} y={100} height={10} radius={5} width={250} />
            </ContentLoader>
          </Card.Content>
        </Card>
      )
    }

    return (
      <Card key={uuid.v4()}>
        <Image fluid src={data.repository.owner.avatarUrl} />
        <Card.Content>  
          <Card.Header>
            <a href={data.repository.url} target="_blank" rel="noopener noreferrer">{data.repository.name}</a>
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Last updated {moment(data.repository.updatedAt).toNow()} ago
            </span>
          </Card.Meta>
          <Card.Description>
            {data.repository.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            size='mini'
            content='Star'
            icon='star'
            label={{ as: 'a', basic: true, content: data.repository.stargazers.totalCount }}
            labelPosition='right'
            onClick={() => window.open(data.repository.owner.avatarUrl, '_blank')}
          />
          <Button
            size='mini'
            content='Fork'
            icon='fork'
            label={{ as: 'a', basic: true, content: data.repository.forks.totalCount }}
            labelPosition='right'
            onClick={() => window.open(data.repository.url, '_blank')}
          />
        </Card.Content>
      </Card>
    )
  }

}

export default graphql(gql`
  query Repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      name
      createdAt
      updatedAt
      description
      url
      license
      owner {
        avatarUrl
      }
    }
  }
`, {
  options: props => ({
    variables: {
      owner: props.github.split('/')[0],
      name: props.github.split('/')[1],
    },
  })
})(Showcase)
