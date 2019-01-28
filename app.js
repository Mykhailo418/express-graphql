const express = require('express');
const path = require('path');
const expressGraphQL = require('express-graphql');
const customSchema = require('./schema/schema');
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema: customSchema
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port, () => {
  console.log('Listening ' + port);
})
