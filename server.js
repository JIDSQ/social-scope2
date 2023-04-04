const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const {
  chatGPTPositive,
  chatGPTNeutral,
  chatGPTNegative,
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
} = require("./GptAnalysis");
const { getPostIDs, getAllComments, getFacebookID } = require("./MetaApi");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.get("/analysis", async (req, res) => {
  try {
    const fb_id = req.query.id;
    const token = req.query.token;

    const { data } = await getPostIDs(fb_id, token);

    const response = await getFacebookID(token);

    const comments = await getAllComments(data.data, token);

    const countPositive = await chatGPTPositive(comments);
    const countNeutral = await chatGPTNeutral(comments);
    const countNegative = await chatGPTNegative(comments);
    const countRepeatComments = await chatGPTCountRepetition(comments);
    const rankNegativeComments = await chatGPTTopNegativeComments(comments);
    const suggestion = await chatGPTRequested(comments);

    const payload = {
      facebook: response.data,
      comments: comments,
      total_comments: comments.length,
      comments_positive: countPositive,
      comments_neutral: countNeutral,
      comments_negative: countNegative,
      comments_negative_repetition: countRepeatComments,
      top_negative_comments: rankNegativeComments,
      suggestion: suggestion,
    };

    res.status(200).send(payload);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
