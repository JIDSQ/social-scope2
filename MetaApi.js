const axios = require("axios");
const FilterComments = require("./hooks");

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
    const idArray = data.map((item) => item.id);
    const arrayComments = [];

    for (const id of idArray) {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${id}/comments?access_token=${token}`
      );

      arrayComments.push(response.data);
    }

    const filter = FilterComments(arrayComments);

    return filter;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPostIDs, getAllComments, getFacebookID };
