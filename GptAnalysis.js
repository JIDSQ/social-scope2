const { Configuration, OpenAIApi } = require("openai");

async function chatGPTPositive(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `count the total number of positive comments in the prompt separated by commas and give only the number: ${comments} `,
      temperature: 0.7,
      max_tokens: 3475,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTNeutral(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `count the total number of neutral comments in the prompt separated by commas and give only the number: ${comments} `,
      temperature: 0.7,
      max_tokens: 3475,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTNegative(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `count the total number of negative comments in the prompt separated by commas and give only the number: ${comments} `,
      temperature: 0.7,
      max_tokens: 3475,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTCountRepetition(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `count the total number of negative sentiment's frequent comments in the prompt separated by commas and give only the number:  ${comments} `,
      temperature: 0.7,
      max_tokens: 3475,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTTopNegativeComments(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          "You are an Social Marketing Expert that classify whether someones comments is negative or positive and filter only the negative sentiment comments in the prompt separated by commas and rank them based on the frequent use of words or phrase",
      },
      {
        role: "user",
        content: `${comments[0]}`,
      },
      {
        role: "assistant",
        content: `If there is no negative comments just reply 'no negative comment' otherwise, rank it in a format {"negative comment1": frequency of occurrence, "negative comment2": frequency of occurrence, ... } reply only the format inside the {} no additional word or phrase just what inside the {}`,
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTRequested(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          "You are an Social Marketing Expert and you give suggestion based on the negative comments to a service offer and do not give suggestion based on passed conversation.",
      },

      {
        role: "user",
        content: `${comments}`,
      },

      {
        role: "assistant",
        content:
          "If there is no negative comments keep your suggestion center on the positive comment, if there is bad comment center your suggestion around the negative comments.",
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPTPositiveComments(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          "You are an Social Marketing Expert that get a prompt in the format {Post 1:[Comment 1, Comment 2, ...], ...} and you will get the context of the post in maximum of 3 words and count the number of positive comment that specific post receive",
      },

      { role: "user", content: `${comments}` },

      {
        role: "assistant",
        content:
          "Your response should only be {Post Context: Number of positive comments, Post Context: Number of positive comments} it should be inside {} and do not put the whole post on the context",
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  chatGPTPositive,
  chatGPTNeutral,
  chatGPTNegative,
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
  chatGPTPositiveComments,
};
