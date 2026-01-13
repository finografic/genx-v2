import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { fileExists } from 'utils/fs.utils';
import type { FeatureContext } from '../feature.types';
import { AI_RULES_FILES } from './ai-rules.constants';

/**
 * Detect if AI Rules feature is already present in the target directory.
 */
export async function detectAiRules(context: FeatureContext): Promise<boolean> {
  const copilotInstructionsPath = resolve(context.targetDir, AI_RULES_FILES[0]);
  const instructionsDirPath = resolve(context.targetDir, AI_RULES_FILES[1]);
  return fileExists(copilotInstructionsPath) && existsSync(instructionsDirPath);
}
