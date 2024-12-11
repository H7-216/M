const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuration de l'API OpenAI
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Route principale pour traiter les messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
      temperature: 0.7,
    });

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with the AI response.' });
  }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
