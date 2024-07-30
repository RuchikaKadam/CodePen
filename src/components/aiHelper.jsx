import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;

export const getAiResponse = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error.response ? error.response.data : error.message);
    return 'Error fetching AI response';
  }
};
