const express = require("express");
const router = express.Router();
const client = require("../elasticsearch/client");
const csvtojson = require('csvtojson');
const indexSettings = require("../elasticsearch/index_settings");
const customMappings = require("../elasticsearch/custom_mappings");


router.get("/data", async function (req, res) {

  indexData = async () => {
    try {
      console.log("Reading data from the local CSV file");

      const data = await csvtojson().fromFile(__dirname + '/../../corpus/190507U.csv');

      console.log(data);

      console.log("Data loaded successfully!");

      console.log(
        "Creating the Elasticsearch index with custom analyzers and mappings");

      // await client.indices.create({
      //   "index": "my_test",
      //   "body": {
      //     "settings": indexSettings,
      //     "mappings": customMappings
      //   }
      // });

      console.log("Indexing data...");

      for (const record of data) {
        await client.index({
          "index": "my_test",
          "body": record
        });
      }

      console.log("Data has been indexed successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  
  res.json("Running Application...");
  indexData();
});

module.exports = router;
