import { GraphQLServer } from 'graphql-yoga'

// Scalar types = String Boolean Int Float ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hallo, ${args.name}!`
      } 
      else {
        return 'Hallo!'
      }
    },
    me() {
      return {
        id: '123098',
        name: 'Hood King', 
        email: 'hoodking@example.com', 
        age: 28
      }
    },
    post() {
      return {
        id: '9039', 
        title: 'Lwa Egun Awo',
        body: 'This is a sample posting', 
        published: true
      }
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