const typeDefs = `
    type Book {
        bookId: String
        title: String
        authors: [String]
        desctription: String
        link: String
        image: String
    }

    input BookInput {
        bookId: String!
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(id: ID!): User    
        allUsers: [User]
        book(id: ID!): Book
        allBooks: [Book]
        me: User        
    }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(title: String!, author: String, description: String, link: String): User
    saveBook(book: BookInput!): User
    removeUser(userId: ID!): Auth
    removeBook(bookId: ID!): Auth
    userLogin(email: String!, password: String!): Auth
    }
`