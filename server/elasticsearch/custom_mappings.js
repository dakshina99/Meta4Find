const customMappings = {
    "properties": {
      "Id": {
        "type": "keyword"
      },
      "Poem Name": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Poem Number": {
        "type": "integer"
      },
      "Poem Line": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer"
      },
      "Has Metaphor": {
        "type": "boolean"
      },
      "Metaphor Count": {
        "type": "integer"
      },
      "Metaphoric Terms": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Metaphor Type": {
        "type": "keyword"
      },
      "Source Domain": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Target Domain": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Interpretation": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Year": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "Poet": {
        "type": "text",
        "analyzer": "custom_sinhala_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      }
    }
  };