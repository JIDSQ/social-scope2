const { Configuration, OpenAIApi } = require('openai');

async function chatGPTCountRepetition(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
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

//rank the comment as positive, negative and neutral and list out positive negative and neutral comment
async function chatGPTSentimentAnalysis(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content:
          'Count the number of comment and classify whether each comment is negative, positive, or neutral the comment in the prompt is in the format ["comment 1","comment 2" ...] then list out all the positive comments and the top five negative, and neutral comment seperately. Provide JSON format response with keys for total, positive, negative and neutral positive_comments, top_negative_comments, and top_neutral_comments. Provide count only and the list of comments. No explanations. The total number of comment must be equal to the sum of the number of positive. negative and neutral comments. The sample format of the response should be {total: "total number of comments", positive:"total number of positive comments", negative:"total number of negative comments", neutral:"total number of neutral comments", positive_comments:[List of positive comments], top_negative_comments:[List of top negative comments], top_neutral _comments:[List of top neutral comments]}',
      },
      {
        role: 'user',
        content: JSON.stringify(comments),
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data.choices[0].message.content;
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
        role: 'system',
        content:
          'Classify whether someones comments is negative or positive and filter only the negative sentiment comments in the prompt separated by commas and rank them based on the frequent use of words or phrase',
      },
      {
        role: 'user',
        content: comments.toString(),
      },
      {
        role: 'assistant',
        content: `If there is no negative comments just reply 'no negative comment' otherwise, rank it in a format {"negative comment1": frequency of occurrence, "negative comment2": frequency of occurrence, ... } reply only the format inside the {} no additional word or phrase just what inside the {}`,
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
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
        role: 'system',
        content:
          'You are an Social Marketing Expert and you give suggestion based on the negative comments to a service offer and do not give suggestion based on passed conversation.',
      },

      {
        role: 'user',
        content: `${comments}`,
      },

      {
        role: 'assistant',
        content:
          'If there is no negative comments keep your suggestion center on the positive comment, if there is bad comment center your suggestion around the negative comments.',
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

//Posotve comment list
async function chatGPTListPositiveComments(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content: `You are an Social Marketing Expert that reads comments on a social media platform and list out all the positive comment`,
      },
      { role: 'user', content: JSON.stringify(comments) },
      {
        role: 'assistant',
        content: `The response should be always only in the format [positive comment 1, positive comment 1 ] no additional data outside the []`,
      },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

async function chatGPT_Government_Projects_Suggestion(comments) {
  let parseKeys = Object.keys(JSON.parse(comments));
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content: `Give a list of different government project suggestion based on the negative comment listed by the user that can help in solving the problem. The suggestion must include the title of the project,  a short 2 to 3 sentences description, an estimated cost of the project in Philippine currency and the estimated time-frame for the project. The response must only follow the format: [{ 'Title': 'title of the project', 'Description': 'Description', 'Budget': 'Estimated budget', 'Time-frame' : 'Estimated time-frame'},] the response must only the one inside [ ] remove any additional wordings outside the [ ]`,
      },
      { role: 'user', content: `${parseKeys.flat(1)}` },
    ];

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
  chatGPTListPositiveComments,
  chatGPT_Government_Projects_Suggestion,
  chatGPTSentimentAnalysis,
};
