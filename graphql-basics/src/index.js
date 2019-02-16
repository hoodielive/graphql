import { GraphQLServer } from 'graphql-yoga'
import { isError } from 'util';

// Scalar types = String Boolean Int Float ID
// Demo user data 
const users = [
  {
    id: '1', 
    'name': 'Larry', 
    email: 'larry@example.com',
    age: 93
  },
  {
    id: '2',
    'name': 'Osun', 
    'email': 'osun@ifa.com', 
  }, 
  {
    id: '3', 
    name: 'Klaus', 
    email: 'klaus@mikelson.com',
    age: 1000
  }
]

const posts = [
  {
    id: '1', 
    title: 'Earth Beauty', 
    body: 'Round', 
    published: true
  },
  {
    id: '2', 
    title: 'Venus Beauty', 
    body: 'Triangle' ,
    published: false
  }, 
  {
    id: '3', 
    title: 'Saturn',
    body: 'Deformed', 
    published: true
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]! 
    me: User!
    post: Post!
    posts(post: String): [Post]!
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
    users(parents, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      return posts
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