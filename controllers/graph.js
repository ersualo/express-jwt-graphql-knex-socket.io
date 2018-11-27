import {graphql} from 'graphql';
import Schema from '../graphschema/Schema';
import express from 'express';

module.exports = function(router) {

	router.post('/api', (req, res) => {
    console.log('req.body', req.body);
		res.setHeader('Content-Type', 'application/json');
		graphQLHandler(req, res);
	});

    return router;
};

async function graphQLHandler(req, res) {
  const {query, variables = {}} = req.body;
  const result = await graphql(
    Schema,
    query,
    {
      db: req.db,
      userId: '1'
    },
    variables
  );
  res.send(result);
}
