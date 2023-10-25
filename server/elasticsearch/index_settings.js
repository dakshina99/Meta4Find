const indexSettings = {
    "analysis": {
      "analyzer": {
        "default": {
          "type": "standard"
        },
        "custom_sinhala_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["edgeNgram", "stop"],
          "char_filter": ["comma_delimited_filter"]
        },
        "betterFuzzy": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "edgeNgram"]
        }
      },
      "filter": {
        "edgeNgram": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 50,
          "side": "front"
        },
        "stop": {
          "type": "stop",
          "stopwords": [
            "ගත්කරු",
            "රචකයා",
            "ලියන්නා",
            "ලියන",
            "රචිත",
            "ලියපු",
            "ලියව්ව",
            "රචනා",
            "රචක",
            "ලියන්",
            "ලිවූ",
            "ලියූ",
            "කියූ",
            "ලියවුණු",
            "කියව්ව",
            "කියපු",
            "කියවපු",
            "කළ",
            "වර්ගය",
            "වර්ගයේ",
            "වර්ගයේම",
            "වැනි",
            "නම් වූ",
            "නැමැති",
            "නැමති",
            "නමැති",
            "නමති",
            "කවි",
            "කාව්‍ය",
            "කව",
            "කාව",
            "රූපක",
            "ගැන",
            "පිළිබඳ",
            "පිළිබඳව",
            "කියවෙන"
          ]
        }
      },
      "char_filter": {
        "comma_delimited_filter": {
          "type": "pattern_replace",
          "pattern": ",",
          "replacement": " "
        }
      }
    }
  };