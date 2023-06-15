const { Configuration, OpenAIApi } = require('openai');

async function chatGPTPositive(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
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
      model: 'text-davinci-003',
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
      model: 'text-davinci-003',
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

//rank the comment as positive, negative and neutral
async function chatGPTSentimentAnalysis(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content:
          'Count the number of comment and classify whether each comment is negative, positive, or neutral the comment in the prompt is in the format ["comment 1","comment 2" ...] . Provide JSON format response with keys for total, positive, negative and neutral. Provide count only. No explanations. The total number of comment must be equal to the sum of the number of positive. negative and neutral comments',
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

async function chatGPTPositiveComments(comments) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content: `You are an Social Marketing Expert that reads the context of the post and the comment on each post in the format {"context" : the first social media post, "message" : [comment on 1st social media post, comment on 1st social media post, comment on 1st social media post]}, {"context" : the second social media post, "message" : [comment on 2nd social media post, comment on 2nd social media post, comment on 2nd social media post, and so on]}, and so on after reading the post and the comments in each post get the thought of the post and count the positive comment on each post. The response should include the context of each post and the number of positive comment in each post`,
      },
      { role: 'user', content: JSON.stringify(comments) },
      {
        role: 'assistant',
        content: `The response should be always only in the format { "context of the post" : "number of positive comment, number only", "context of the second post" : "number of positive comment in the second post", and so on} do not add additional response that is not in the format I set.`,
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
        content: `The response should be always only in the format {positive comment 1, positive comment 1 } no additional data outside the {}`,
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
        content: `You are an Social Marketing Expert that give a list of different government project suggestion that can help in solving the problem. The suggestion must include the title of the project,  a short 2 to 3 sentences description, an estimated cost of the project in Philippine currency and the estimated time-frame for the project. The response must only follow the format: [{ 'Title': 'title of the project', 'Description': 'Description', 'Budget': 'Estimated budget', 'Time-frame' : 'Estimated time-frame'},] the response must only the one inside [ ] remove any additional wordings outside the [ ]`,
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
  chatGPTPositive,
  chatGPTNeutral,
  chatGPTNegative,
  chatGPTCountRepetition,
  chatGPTTopNegativeComments,
  chatGPTRequested,
  chatGPTPositiveComments,
  chatGPTListPositiveComments,
  chatGPT_Government_Projects_Suggestion,
  chatGPTSentimentAnalysis,
};
