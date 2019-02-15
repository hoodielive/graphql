import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
// Scalar types = String Boolean Int Float ID
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'uuid-12345'
    }, 
    name() {
      return 'Larry'
    }, 
    age() {
      return 9
    }, 
    employed() {
      return true
    }, 
    gpa() {
      return null 
    },
    title() {
      return 'The Mystery of GraphQL'
    },
    price() {
      return 15.99
    }, 
    releaseYear() {
      return null
    }, 
    rating() {
      return null
    }, 
    inStock() {
      return false
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