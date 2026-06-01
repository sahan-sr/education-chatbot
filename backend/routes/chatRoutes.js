const router = require("express").Router();

const CourseInfo = require("../models/CourseInfo");
const askLLM = require("../services/llmService");
const stringSimilarity = require("string-similarity");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();
    console.log("User message:", userMessage);

    const allDocs = await CourseInfo.find();
    console.log("Mongo docs:", allDocs);

    for (const doc of allDocs) {
      const words = userMessage.split(" ");

const matched = doc.keywords.some(keyword => {

  if (userMessage.includes(keyword)) {
    return true;
  }

  return words.some(word => {

    const similarity =
      stringSimilarity.compareTwoStrings(
        word,
        keyword
      );

    return similarity > 0.75;
  });

});

      console.log(
  "Checking:",
  doc.intent,
  matched
);

      if (matched) {
        return res.json({
          source: "database",
          reply: doc.answer
        });
      }
    }

    const llmReply = await askLLM(userMessage);

    return res.json({
      source: "llm",
      reply: llmReply
    });

  } catch (error) {

  console.error("FULL ERROR:");
  console.error(error.response?.data || error.message);

  res.status(500).json({
    error: error.message
  });
}
});

module.exports = router;
