import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';
import Schema from '../graphschema/Schema';
import express from 'express';

export default graphqlHTTP({
  schema: Schema,
  graphiql: true
});
