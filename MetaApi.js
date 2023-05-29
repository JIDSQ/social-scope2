const axios = require('axios');
const { FilterComments } = require('./hooks');

async function getFacebookID(token) {
  //Facebook Graph API
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v16.0/me?fields=id%2Cname&access_token=${token}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getPostIDs(fb_id, token) {
  //Facebook Graph API
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v16.0/${fb_id}/posts?access_token=${token}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getAllComments(data, token) {
  try {
    const idArray = data.map((item) => {
      const id = item?.id;
      const message = item?.message;

      return { id, message };
    });

    const arrayComments = [];

    for (const { id, message } of idArray) {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${id}/comments?access_token=${token}`
      );

      const filter = FilterComments([response.data]);
      arrayComments.push({
        context: message,
        message: filter,
      });
    }

    return arrayComments;
  } catch (error) {
    console.log(error);
  }
}

async function getFollower(page_id, token) {
  //Facebook Graph API
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v16.0/${page_id}?fields=fan_count&access_token=${token}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPostIDs, getAllComments, getFacebookID, getFollower };
