import type { Feature } from '../feature.types';
import { applyAiRules } from './ai-rules.apply';
import { detectAiRules } from './ai-rules.detect';

/**
 * AI Rules feature definition.
 */
export const aiRulesFeature: Feature = {
  id: 'aiRules',
  label: 'AI Rules (Copilot, Claude Code, Cursor)',
  hint: 'recommended',
  detect: detectAiRules,
  apply: applyAiRules,
};
