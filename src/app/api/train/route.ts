import { HtmlToTextTransformer } from '@langchain/community/document_transformers/html_to_text';
import { OpenAIEmbeddings } from '@langchain/openai';
import { WeaviateStore } from '@langchain/weaviate';
import { RecursiveUrlLoader } from 'langchain/document_loaders/web/recursive_url';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import weaviate, { ApiKey, WeaviateClient } from 'weaviate-ts-client';

export async function POST(req: Request) {
  // Document loaders with web loaders
  // const loader = new CheerioWebBaseLoader('https://www.supremetech.vn/');
  const loader = new RecursiveUrlLoader('https://www.supremetech.vn', {
    maxDepth: 8,
    timeout: 600,
  });
  const docs = await loader.load();

  // Document transformers
  const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
  // Remove HTML tags and convert to plain text
  const transformer = new HtmlToTextTransformer();
  const sequence = splitter.pipe(transformer);
  const newDocuments = await sequence.invoke(docs);

  // Create a vector store
  const weaviateClient = (weaviate as any).client({
    scheme: 'https',
    host: process.env.WEAVIATE_URL,
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || 'missing'),
  }) as WeaviateClient;

  // Initialize a embedding models
  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-3-small',
  });

  // Create a store for an existing index
  const weaviateStore = await WeaviateStore.fromDocuments(newDocuments, embeddings, {
    client: weaviateClient,
    indexName: process.env.WEAVIATE_INDEX_NAME || 'langchain',
  });
}
