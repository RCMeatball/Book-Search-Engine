import gql from '@apollo/client';

export const LOGIN_USER = gql`
    mutation userlogin($email: String!. $password: String!) {
        login(email: $email. password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
              id
              username  
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookINput: BookInput!) {
        saveBook(bookInput: $bookInput) {
            id
            username
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                link
                image
            }
        }
    }
`;