'use server';
/**
 * @fileOverview AI-powered style recommendations for user profiles.
 *
 * - getAIStyleRecommendations - A function that suggests themes and color schemes based on profile content.
 * - AIStyleRecommendationsInput - The input type for the getAIStyleRecommendations function.
 * - AIStyleRecommendationsOutput - The return type for the getAIStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleRecommendationsInputSchema = z.object({
  bio: z.string().describe('The user biography text.'),
  existingLinks: z.array(z.string()).describe('An array of existing links in the profile.'),
  preferredThemes: z.array(z.string()).optional().describe('An optional array of preferred themes.'),
});
export type AIStyleRecommendationsInput = z.infer<typeof AIStyleRecommendationsInputSchema>;

const AIStyleRecommendationsOutputSchema = z.object({
  themeSuggestion: z.string().describe('A suggested theme name.'),
  colorSchemeSuggestion: z.object({
    primaryColor: z.string().describe('A suggested primary color in hex format (e.g., #29ABE2).'),
    backgroundColor: z.string().describe('A suggested background color in hex format (e.g., #F0F2F5).'),
    accentColor: z.string().describe('A suggested accent color in hex format (e.g., #64B5F6).'),
  }).describe('A suggested color scheme.'),
  reasoning: z.string().describe('Explanation of why the theme and color scheme were suggested.'),
});
export type AIStyleRecommendationsOutput = z.infer<typeof AIStyleRecommendationsOutputSchema>;

export async function getAIStyleRecommendations(input: AIStyleRecommendationsInput): Promise<AIStyleRecommendationsOutput> {
  return aiStyleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStyleRecommendationsPrompt',
  input: {schema: AIStyleRecommendationsInputSchema},
  output: {schema: AIStyleRecommendationsOutputSchema},
  prompt: `You are an AI style assistant that provides theme and color scheme recommendations based on user profile content.

Analyze the following user profile information and suggest a theme and color scheme that matches their style.

Bio: {{{bio}}}
Existing Links: {{#each existingLinks}}{{{this}}}, {{/each}}
Preferred Themes: {{#if preferredThemes}}{{#each preferredThemes}}{{{this}}}, {{/each}}{{else}}No preferred themes{{/if}}

Provide a brief explanation of why you are suggesting the theme and color scheme.

Respond with JSON:
Theme Suggestion:
Color Scheme Suggestion:
Reasoning:`,
});

const aiStyleRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiStyleRecommendationsFlow',
    inputSchema: AIStyleRecommendationsInputSchema,
    outputSchema: AIStyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
