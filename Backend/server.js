/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const quizData = require("./data/quizData");
const tips = require("./data/tipsData");
const simData = require("./data/simulationData");

const PORT = 4000;
const app  = express();

app.use(cors());
app.use(express.json());

// ───── Quiz endpoints ──────────────────────────
app.get("/api/quiz/:topic", (req, res) => {
  const { topic } = req.params;
  const questions = quizData[topic] || [];
  res.json(questions);
});

app.post("/api/quiz/:topic/submit", (req, res) => {
  const { topic } = req.params;
  const { answers } = req.body;                // [ {id, selectedIdx}, … ]
  const questions   = quizData[topic] || [];

  let score = 0;
  questions.forEach(q => {
    const a = answers.find(x => x.id === q.id);
    if (a && a.selectedIdx === q.answer) score += 1;
  });
  res.json({ score, total: questions.length });
});

// ───── Simulation endpoints ─────────────────────
app.get("/api/sim/phishing", (_, res) => {
  res.json({ scenarios: simData.scenarios });
});

// ───── Tips endpoint ────────────────────────────
app.get("/api/tips", (_, res) => res.json(tips));

// ───── Start server ─────────────────────────────
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
