import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { fileExists } from 'utils/fs.utils';
import type { FeatureContext } from '../feature.types';
import { AI_RULES_FILES } from './ai-rules.constants';

/**
 * Detect if AI Rules feature is already present in the target directory.
 * Checks for copilot-instructions.md, instructions dir, CLAUDE.md, and .cursor/rules.
 */
export async function detectAiRules(context: FeatureContext): Promise<boolean> {
  const [copilotFile, instructionsDir, claudeFile, cursorDir] = AI_RULES_FILES;
  return (
    fileExists(resolve(context.targetDir, copilotFile))
    && existsSync(resolve(context.targetDir, instructionsDir))
    && fileExists(resolve(context.targetDir, claudeFile))
    && existsSync(resolve(context.targetDir, cursorDir))
  );
}
