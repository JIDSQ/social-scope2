const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const {
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
  chatGPTListPositiveComments,
  chatGPT_Government_Projects_Suggestion,
  chatGPTSentimentAnalysis,
} = require('./GptAnalysis');

const {
  getPostIDs,
  getAllComments,
  getFacebookID,
  getFollower,
  getPageProfile,
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
    const profilePic = await getPageProfile(fb_id, token);
    const response = await getFacebookID(token);
    const comments = await getAllComments(data.data, token);
    const allComments = await FetchAllComments(comments);

    const countRepeatComments = await chatGPTCountRepetition(allComments);
    const rankNegativeComments = await chatGPTTopNegativeComments(allComments);

    const suggestion = await chatGPTRequested(allComments);

    const payload = {
      facebook: response?.data,
      comments: allComments,
      follower: fan_count,
      url: profilePic,
      comments_negative_repetition: countRepeatComments,
      top_negative_comments: rankNegativeComments,
      suggestion: suggestion,
    };

    res.status(200).send(payload);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/exchange-token', async (req, res) => {
  const { shortLivedToken } = req.body;
  const appId = process.env.appID;
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

app.get('/government_project', async (req, res) => {
  try {
    const fb_id = req.query.id;
    const token = req.query.token;

    const { data } = await getPostIDs(fb_id, token);
    const comments = await getAllComments(data.data, token);

    const allComments = await FetchAllComments(comments);
    const rankNegativeComments = await chatGPTTopNegativeComments(allComments);
    const governmentSuggestions = await chatGPT_Government_Projects_Suggestion(
      rankNegativeComments
    );

    if (governmentSuggestions.includes('[{')) {
      const payload = {
        governmentSuggestions: governmentSuggestions.substring(
          governmentSuggestions.indexOf('['),
          governmentSuggestions.indexOf(']') + 1
        ),
      };

      res.status(200).send(payload);
    } else {
      const payload = {
        governmentSuggestions: 'Reload',
      };
      res.status(200).send(payload);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/count_sentiment_analysis', async (req, res) => {
  try {
    const fb_id = req.query.id;
    const token = req.query.token;

    const { data } = await getPostIDs(fb_id, token);
    const comments = await getAllComments(data.data, token);

    const allComments = await FetchAllComments(comments);
    const Sentiment_analysis = await chatGPTSentimentAnalysis(allComments);

    if (Sentiment_analysis.includes('{')) {
      const payload = {
        sentiment_analysis: Sentiment_analysis.substring(
          Sentiment_analysis.indexOf('{'),
          Sentiment_analysis.indexOf('}') + 1
        ),
      };

      res.status(200).send(payload.sentiment_analysis);
    } else {
      const payload = {
        Sentiment_analysis: 'Reload',
      };
      res.status(200).send(payload);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/list_positive_comment', async (req, res) => {
  try {
    const fb_id = req.query.id;
    const token = req.query.token;

    const { data } = await getPostIDs(fb_id, token);
    const comments = await getAllComments(data.data, token);

    const ListPositiveComment = await chatGPTListPositiveComments(comments);

    if (ListPositiveComment.includes('[')) {
      const payload = {
        list_positive_comments: ListPositiveComment.substring(
          ListPositiveComment.indexOf('['),
          ListPositiveComment.indexOf(']') + 1
        ),
      };

      res.status(200).send(payload.list_positive_comments);
    } else {
      const payload = {
        list_positive_comments: 'Reload',
      };
      res.status(200).send(payload);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
