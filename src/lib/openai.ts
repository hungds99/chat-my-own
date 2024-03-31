import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// // Ask OpenAI for a streaming chat completion given the prompt
// const response = await openai.chat.completions.create({
//   model: 'gpt-3.5-turbo',
//   stream: true,
//   messages,
// });
// // Convert the response into a friendly text-stream
// const stream = OpenAIStream(response);
