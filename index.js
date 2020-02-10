const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

let highlights = [
  {
    id: '1',
    content: 'One day I will find the right words, and they will be simple.',
    title: 'Dharma Bums',
    author: 'Jack Kerouac'
  },
  {
    id: '2',
    content:
      'In the limits of a situation there is humor, there is grace, and everything else.',
    title: 'Arbitrary Stupid Goal',
    author: 'Tamara Shopsin'
  }
];

const resolvers = {
  Query: {
    highlights: () => highlights,
    highlight: (parent, args) => {
      return highlights.find(highlight => highlight.id === args.id);
    }
  },
  Mutation: {
    newHighlight: (parent, args) => {
      const highlight = {
        id: String(highlights.length + 1),
        title: args.title || '',
        author: args.author || '',
        content: args.content
      };
      highlights.push(highlight);
      return highlight;
    },
    updateHighlight: (parent, args) => {
      const index = highlights.findIndex(highlight => highlight.id === args.id);
      const highlight = {
        id: args.id,
        content: args.content,
        author: highlights[index].author,
        title: highlights[index].title
      };

      highlights[index] = highlight;
      return highlight;
    },
    deleteHighlight: (parent, args) => {
      const deletedHighlight = highlights.find(
        highlight => highlight.id === args.id
      );
      highlights = highlights.filter(highlight => highlight.id !== args.id);
      return deletedHighlight;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`📚 Highlights server ready at ${url}`);
});
