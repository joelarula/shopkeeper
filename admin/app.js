const express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs');

const app = express();
const PORT = 5555;

app.use(express.static('static'));
app.use(express.static('filestore'));

var scFile = fs.readFileSync('schema.graphql', 'utf8');
var schema = buildSchema(scFile);

var root = {
    categories: () => {
      return ["1","2","3"];
    },
  };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));