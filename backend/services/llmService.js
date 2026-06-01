const axios = require("axios");

async function askLLM(message) {

  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.log("LLM unavailable. Returning fallback.");

    return "I can help with Software Engineering course guidance. Please ask about career advice, studying, or university life.";
  }
}

module.exports = askLLM;