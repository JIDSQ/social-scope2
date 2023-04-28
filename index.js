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
  chatGPTPositiveComments,
  chatGPT_Government_Projects_Suggestion,
} = require("./GptAnalysis");
const { getPostIDs, getAllComments, getFacebookID } = require("./MetaApi");
const { FetchAllComments } = require("./hooks");

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
    const PositiveComments = await chatGPTPositiveComments(comments);

    const allComments = await FetchAllComments(comments);

    const countPositive = await chatGPTPositive(allComments);
    const countNeutral = await chatGPTNeutral(allComments);
    const countNegative = await chatGPTNegative(allComments);
    const countRepeatComments = await chatGPTCountRepetition(allComments);
    const rankNegativeComments = await chatGPTTopNegativeComments(allComments);
    const governmentSuggestions = await chatGPT_Government_Projects_Suggestion(
      rankNegativeComments
    );
    const suggestion = await chatGPTRequested(allComments);

    const payload = {
      facebook: response?.data,
      comments: allComments,
      total_comments: allComments?.length,
      top_positive_comments: PositiveComments,
      comments_positive: countPositive,
      comments_neutral: countNeutral,
      comments_negative: countNegative,
      comments_negative_repetition: countRepeatComments,
      top_negative_comments: rankNegativeComments,
      suggestion: suggestion,
      governmentSuggestions: governmentSuggestions,
    };

    res.status(200).send(payload);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
