const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {

    Query: {
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('books');
        },
        allUsers: async () => {
            return User.find().populate('books');
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ bookId });
        },
        allBooks: async () => {
            return Book.find();
        },
        me: async (parent, context) => {
            if(context.user) {
                const data = await User.findById(context.userId)
                return data;
            }

            throw new AuthenticationError('Not logged in')
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, { title, author, description, link }) => {
            const book = await Book.create({ title, author, description, link });
            return book;
        },
        removeUser: async (parent, { userId }) => {
            await User.findByIdAndDelete(userId);
            return;
        },
        removeBook: async (parent, { bookId }) => {
            await Book.findByIdAndDelete(bookId);
            return;
        },
        userLogin: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found');
            }
            const pw = await user.isCorrectPassword(password);

            if (!pw) {
                throw new AuthenticationError('Incorrect password, try again');
            }
            const token = signToken(user);
            return { token, user }
        }
    }
};

module.exports = resolvers;