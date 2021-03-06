import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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
    published: true,
    author: '1'
  },
  {
    id: '2', 
    title: 'Venus Beauty', 
    body: 'Triangle' ,
    published: false,
    author: '1'
  }, 
  {
    id: '3', 
    title: 'Saturn',
    body: 'Deformed', 
    published: true,
    author: '2'
  }
]

const comments = [
  {
    id: '1', 
    text: "What a dope post! lol",
    author: '1',
    post: '3',
  },
  {
    id: '2', 
    text: "I disagree with everyone of your posts! lol",
    author: '1',
    post: '3',
  },
  {
    id: '3', 
    text: "What an asshole? LOL",
    author: '2',
    post: '2',
  },
  {
    id: '4', 
    text: "Right on brother!",
    author: '2',
    post: '1',
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]! 
    me: User!
    post: Post!
    posts(query: String): [Post]!
    comments(query: String): [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateUserInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
      if (!args.query) {
        return posts
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return comments
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
  }, 
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.data.email 
      })

      if (emailTaken) {
        throw new Error('Email taken.') 
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }
      users.push(user)

      return user
    }, 
    createPost(parent, args, ctx, info) { const userExists = users.some((user) => user.id === args.data.author) 
      if (!userExists) {
        throw new Error('User not found.') 
      }

      const post = {
        id: uuidv4(), 
        ...args.data
      }
      posts.push(post)

      return post
    }, 
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author)
      const postExists = posts.some((post) => post.id === args.data.post && post.published)

      if (!userExists || !postExists) {
        throw new Error('User nor Post exists.') 
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }
      comments.push(comment)

      return comment
    }
  },
  Post: {
    author(parents, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.data.author
      })
    }, 
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.data.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.data.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.data.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.data.author
      })
    }, 
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.data.post
      })
    }
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up...')
})
