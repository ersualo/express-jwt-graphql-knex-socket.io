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
      type: User,
      async resolve(parent, args, {rootValue: {db}}) {
        console.log("author's resolve");
        let author;
        await Knex.select('*').from('user').where('id', '=', parent.author).then((results) => {
          author = results[0];
        });
        return author;
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    stories: {
      type: new GraphQLList(Story),
      async resolve(parent, args, {rootValue: {db}}) {
        console.log("User's resolver");
        let stories;
        await knex.select('*').from('story').where('author', '=', parent.Id).then((results) => {
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
    viewer: {
      type: User,
      async resolve(parent, args, {rootValue: {db, userId}}) {
        console.log("Query viewer resolve");
          let user;
          await Knex.select('*').from('user').where('id', '=', userId).limit(1).then((results) => {
            user =  results;
          }).catch((error) => {
            return error;
          });
          return user[0];
      }
    },
    user: {
      type: User,
      args : {
        id : {
          type : new GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent, {id}, {rootValue: {db}}) {
        console.log("Query user resolve");
          let user;
          await Knex.select('*').from('user').where('id', '=', id).limit(1).then((results) => {
            user =  results;
          }).catch((error) => {
            return error;
          });
          return user[0];
      }
    },
    users : {
      type : new GraphQLList(User)
    },
    story: {
      type: Story,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent, {id}, {rootValue: {db}}) {
        console.log("Query story resolve");
          let user;
          await Knex.select('*').from('story').where('id', '=', id).limit(1).then((results) => {
            user =  results;
          }).catch((error) => {
            return error;
          });
          return user[0];
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});
export default Schema;
