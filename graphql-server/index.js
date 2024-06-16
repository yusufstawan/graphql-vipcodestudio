import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { books, members } from "./_db.js";

const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        author: String!
        published_at: String!
        category: String!
        total: Int!
    }

    type Member {
        id: ID!
        name: String!
        email: String!
        verified: Boolean!
    }

    type Query {
        books: [Book!]!
        book(id: ID!): Book!
        members: [Member!]!
        member(id: ID!): Member!
    }
`;

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    book: (_, args) => {
      return books.find((book) => book.id === args.id);
    },
    members: () => {
      return members;
    },
    member: (_, args) => {
      return members.find((member) => member.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`🚀 Server ready at: ${url}`);
