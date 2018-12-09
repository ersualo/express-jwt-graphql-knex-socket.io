import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import Knex from '../config/knex';

const Story = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    text: {
      type: GraphQLString
    },
    author: {
      type: Author,
      async resolve(parent, args) {
        let author;
        await Knex.select('*').from('author').where('id', '=', parent.author).then((results) => {
          author = results[0];
        });
        return author;
      }
    }
  })
});

const Author = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    stories: {
      type: new GraphQLList(Story),
      async resolve(parent, args) {
        let stories;
        await Knex.select('*').from('story').where('author', '=', parent.id).then((results) => {
          stories = results;
        });
        return stories;
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    author: {
      type: Author,
      args : {
        id : {
          type : new GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent, {id}) {
          let author;
          await Knex.select('*').from('author').where('id', '=', id).limit(1).then((results) => {
            author =  results;
          }).catch((error) => {
            return error;
          });
          return author[0];
      }
    },
    authors : {
      type : new GraphQLList(Author),
      async resolve(parent, id){
        let authors;
        await Knex.select('*').from('author').then((results) => {
            authors = results;
        });
        return authors;
      }
    },
    story: {
      type: Story,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent, {id}) {
          let story;
          await Knex.select('*').from('story').where('id', '=', id).limit(1).then((results) => {
            story =  results[0];
          }).catch((error) => {
            return error;
          });
          return story;
      }
    },
    stories :{
        type : new GraphQLList(Story),
        async resolve(parent, id){
            let stories;
            await Knex.select('*').from('story').then((results) => {
                stories = results;
            });
            return stories;
        }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});
export default Schema;
