const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const {
  chatGPTPositive,
  chatGPTNeutral,
  chatGPTNegative,
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
  chatGPTPositiveComments,
  chatGPT_Government_Projects_Suggestion,
} = require('./GptAnalysis');
const {
  getPostIDs,
  getAllComments,
  getFacebookID,
  getFollower,
} = require('./MetaApi');
const { FetchAllComments } = require('./hooks');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.get('/analysis', async (req, res) => {
  try {
    const fb_id = req.query.id;
    const token = req.query.token;

    const { data } = await getPostIDs(fb_id, token);
    const { fan_count } = await getFollower(fb_id, token);
    console.log(fan_count);
    const response = await getFacebookID(token);
    const comments = await getAllComments(data.data, token);
    const allComments = await FetchAllComments(comments);

    const PositiveComments = await chatGPTPositiveComments(comments);
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
      follower: fan_count,
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

app.post('/exchange-token', async (req, res) => {
  const { shortLivedToken } = req.body;
  const appId = process.env.appId;
  const appSecret = process.env.appSecret;
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v16.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
    );
    const { access_token: longLivedToken } = response.data; // Use the longLivedToken to make API requests
    console.log(longLivedToken);
    res.status(200).send({ longLivedToken: longLivedToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
