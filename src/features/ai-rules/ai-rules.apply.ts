import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { copyDir, copyTemplate, errorMessage, fileExists, spinner, successMessage } from 'utils';
import { getTemplatesPackageDir } from 'utils/package-root.utils';
import type { FeatureApplyResult, FeatureContext } from '../feature.types';
import { AI_RULES_FILES } from './ai-rules.constants';

/**
 * Apply AI Rules feature to an existing package.
 * Copies .github/copilot-instructions.md and .github/instructions/ from template.
 */
export async function applyAiRules(context: FeatureContext): Promise<FeatureApplyResult> {
  const applied: string[] = [];

  const copilotDest = resolve(context.targetDir, AI_RULES_FILES[0]);
  const instructionsDest = resolve(context.targetDir, AI_RULES_FILES[1]);

  const copilotExists = fileExists(copilotDest);
  const instructionsExist = existsSync(instructionsDest);

  if (copilotExists && instructionsExist) {
    return { applied, noopMessage: 'AI rules already installed. No changes made.' };
  }

  // Get template directory
  const fromDir = fileURLToPath(new URL('.', import.meta.url));
  const templateDir = getTemplatesPackageDir(fromDir);

  const copySpin = spinner();
  copySpin.start('Copying AI rules...');

  try {
    // Copy copilot-instructions.md
    const copilotSource = resolve(templateDir, AI_RULES_FILES[0]);

    if (!copilotExists) {
      await copyTemplate(copilotSource, copilotDest, {
        SCOPE: '',
        NAME: '',
        PACKAGE_NAME: '',
        YEAR: new Date().getFullYear().toString(),
        DESCRIPTION: '',
        AUTHOR_NAME: '',
        AUTHOR_EMAIL: '',
        AUTHOR_URL: '',
      });
      applied.push(AI_RULES_FILES[0]);
    }

    // Copy instructions directory
    const instructionsSource = resolve(templateDir, AI_RULES_FILES[1]);

    if (!instructionsExist) {
      await copyDir(instructionsSource, instructionsDest, {
        SCOPE: '',
        NAME: '',
        PACKAGE_NAME: '',
        YEAR: new Date().getFullYear().toString(),
        DESCRIPTION: '',
        AUTHOR_NAME: '',
        AUTHOR_EMAIL: '',
        AUTHOR_URL: '',
      });
      applied.push(AI_RULES_FILES[1]);
    }

    copySpin.stop('AI rules copied');

    for (const item of applied) {
      successMessage(`Created ${item}`);
    }
  } catch (err) {
    copySpin.stop('Failed to copy AI rules');
    const error = err instanceof Error ? err : new Error('Unknown error');
    errorMessage(error.message);
    return { applied, error };
  }

  return { applied };
}
