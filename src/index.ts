import express from "express";
import cors from "cors";
import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";

const app = express();

let PORT: number = 3000;
try {
  const configData = fs.readFileSync("config.json", "utf-8");
  const config = JSON.parse(configData);
  if (config.port) PORT = Number(config.port);
} catch (err) {
  console.warn(chalk.yellow("Warning: Could not load config.json, using default port 3000"));
}

app.use(cors());

let questions: string[][] = [];
try {
  const data = fs.readFileSync("questions.json", "utf-8");
  questions = JSON.parse(data);
} catch (err) {
  console.error(chalk.red("Error loading questions:"), err);
}

app.get("/", (req, res) => {
  if (questions.length === 0)
    return res.status(404).json({ error: "No questions found" });

  const randomIndex = Math.floor(Math.random() * questions.length);
  res.json(questions[randomIndex]);
});

app.listen(PORT, () => {
  const msg = `
${chalk.cyanBright.bold("Server Running")}
${chalk.blueBright(`Listening on port ${PORT}`)}
${chalk.cyanBright("Ready to accept requests...")}
`;

  console.log(
    boxen(msg, {
      padding: 1,
      borderColor: "blue",
      borderStyle: "round",
      align: "center",
    })
  );
});