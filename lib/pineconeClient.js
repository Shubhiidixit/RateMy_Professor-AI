import { PineconeClient } from 'pinecone-client';

export const pineconeClient = new PineconeClient({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
});

export const queryPinecone = async (query) => {
    const index = pineconeClient.Index('professor-ratings');
    const results = await index.query({ vector: query, topK: 5 });
    return results;
};
