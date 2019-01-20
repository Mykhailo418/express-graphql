const express = require('express');
const expressGraphQL = require('express-graphql');
const customSchema = require('./schema/schema');
const app = express();
const port = 8080;

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema: customSchema
}));

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
  console.log('Listening ' + port);
})
