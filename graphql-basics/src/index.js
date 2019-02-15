import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
// Scalar types = String Boolean Int Float ID
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my query!'
    },
    name() {
      return 'Larry'
    },
    location() {
      return 'I live in a higher state of consciousness!'
    },
    bio() {
      return 'I love women'
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up...')
})