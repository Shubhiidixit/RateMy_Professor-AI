import axios from 'axios';

export const generateRatingExplanation = async (professorName) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const prompt = `Provide a summary of student reviews for Professor ${professorName}. Focus on teaching style, strengths, and weaknesses.`;

  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].text.trim();
};
