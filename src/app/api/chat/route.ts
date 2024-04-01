import type { Document } from '@langchain/core/documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableLambda, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { WeaviateStore } from '@langchain/weaviate';
import { StreamingTextResponse } from 'ai';
import weaviate, { ApiKey } from 'weaviate-ts-client';

export async function POST(req: Request) {
  console.debug('Received request to chat with OpenAI');
  const { messages, question } = await req.json();

  // Use OpenAI for model completion to allow lang chain to generate answers
  const llm = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  });

  // Create a retriever in your own data using vector store
  if (
    !process.env.WEAVIATE_INDEX_NAME ||
    !process.env.WEAVIATE_API_KEY ||
    !process.env.WEAVIATE_URL
  ) {
    throw new Error(
      'WEAVIATE_INDEX_NAME, WEAVIATE_API_KEY and WEAVIATE_URL environment variables must be set',
    );
  }
  // Connect to Weaviate
  console.debug('Connecting to Weaviate...');
  const weaviateClient = weaviate.client({
    scheme: 'https',
    host: process.env.WEAVIATE_URL,
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
  });
  const vectorStore = await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
    client: weaviateClient,
    indexName: process.env.WEAVIATE_INDEX_NAME,
    textKey: 'text',
    metadataKeys: ['source', 'title'],
  });
  const vectorStoreRetriever = vectorStore.asRetriever({});
  console.debug('Connected to Weaviate');

  // Create a chain retriever
  const answerGenerationPrompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

  console.debug('Retrieving answer for question: ', question);
  const retrievalChain = RunnableSequence.from([
    RunnableLambda.from((input: any) => input.question),
    {
      context: vectorStoreRetriever.pipe((documents: Document[]) => {
        return documents
          .map((document) => {
            return `<doc>\n${document.pageContent}\n</doc>`;
          })
          .join('\n');
      }),
      question: new RunnablePassthrough(),
    },
    answerGenerationPrompt,
    llm,
    new StringOutputParser(),
  ]);
  console.debug('Starting retrieval chain');

  const stream = await retrievalChain.stream({
    question: question,
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
