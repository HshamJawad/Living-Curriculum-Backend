// force rebuild - haiku model
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateVisualPrompt(stepText) {
  const systemPrompt = `
You are an instructional designer specialized in TVET and competency-based training.

Generate a realistic visual illustration description for a single training step.
The illustration must:
- Show correct procedure
- Emphasize safety practices
- Include tools, posture, and environment
- Be suitable for vocational training
- Avoid any text labels inside the image

Return ONLY the visual description.
`;

  const response = await client.messages.create({
    model: "THIS_IS_A_TEST_MODEL_DO_NOT_EXIST",
    max_tokens: 300,
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: `${systemPrompt}\n\nTraining step:\n"${stepText}"`,
      },
    ],
  });

  return response.content[0].text.trim();
}
