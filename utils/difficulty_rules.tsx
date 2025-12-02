function DifficultyRules(difficulty: string) {
    switch(difficulty) {
      case "easy":
      return `
        Difficulty Rules:
        - Questions must be basic recall or simple understanding.
        - No trick wording, no multi-step reasoning.
        - Options should include obvious wrong answers.
        - Explanations should be short and simple.
      `;

    case "medium":
      return `
        Difficulty Rules:
        - Requires reasoning or understanding of concepts.
        - Include 1 tricky distractor.
        - Explanations should be 2–3 sentences with logic.
      `;

    case "hard":
      return `
        Difficulty Rules:
        - Multi-step reasoning required.
        - All options should be believable.
        - At least 2 distractors must be close to the correct answer.
        - Explanation must break down why each wrong option is wrong.
      `;

    case "asian":
      return `
        Difficulty Rules (ASIAN MODE):
        - Extremely challenging questions requiring deep reasoning.
        - Every option must look correct at first glance.
        - Correct answer must require specific domain knowledge to identify.
        - Include trick patterns, edge cases, and concept combinations.
        - Explanations must be detailed (3–5 sentences), breaking complex logic.
        - DO NOT make it impossible, but MAKE IT PAINFULLY DIFFICULT.
      `;

    default:
        return "";
    }
}

export default DifficultyRules