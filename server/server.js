const express = require('express');
const cors = require('cors');
const client = require('./elasticsearch/client');
const data_manager = require('./data_management/retrieve_and_ingest_data');

const app = express();

const port = 8000;

app.use(cors());
app.use('/index', data_manager);

app.get('/search', (req, res) => {

    const myQuery = req.query.parameter;
  
    async function sendESCRequest() {
      const body = await client.search({
        "index": 'my_test',
        "body": {
          "size": 100, 
          "query": {
            "bool": {
              "should": [
                {
                  "match": {
                    "Poem Name": myQuery
                  }
                },
                {
                  "match": {
                    "Interpretation": myQuery
                  }
                },
                {
                  "match": {
                    "Poem Line": myQuery
                  }
                },
                {
                  "match": {
                    "Source Domain": myQuery
                  }
                },   
                {
                  "match": {
                    "Target Domain": myQuery
                  }
                },
                {
                  "match": {
                    "Metaphoric Terms": myQuery
                  }
                },   
                {
                  "match": {
                    "Metaphor Type": myQuery
                  }
                },        
                {
                  "match": {
                    "Poet": myQuery
                  }
                },   
                {
                  "match": {
                    "Year": myQuery
                  }
                }       
              ]
            }
          },
          "sort": [
            {
              "Metaphor Count": {
                "order": "desc"
              }
            },
            {
            "Has Metaphor": {
                "order": "desc"
              }
            }
          ],
          "aggs": {
            "MetaphorCount" : {
              "terms": {
                "field": "Has Metaphor"
              }
            },
            "PoemName" : {
              "terms": {
                "field": "Poem Name.keyword"
              } 
            } 
          }
        }
      });
      res.json({
        hits: body.hits.hits,
        aggregations: body.aggregations
      });
    }
    sendESCRequest();
  });

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));