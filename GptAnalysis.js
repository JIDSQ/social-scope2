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
    // const toStringComments = comments.toString()
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          "You are an Social Marketing Expert that classify whether someones comments is negative or positive and filter only the negative sentiment comments in the prompt separated by commas, rank them based on the frequent use of words or phrase",
      },
      {
        role: "user",
        content: `${comments}`,
      },
      {
        role: "assistant",
        content:
          "If there is no negative comments just reply 'no negative comment'. Give only the exact answer no more explanations",
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

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `pretend you are a social media marketing provide suggestions for improvement for posting based on all the negative sentiments separated by commas:${comments} `,
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

module.exports = {
  chatGPTPositive,
  chatGPTNeutral,
  chatGPTNegative,
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
};
