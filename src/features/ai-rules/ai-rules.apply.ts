import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { copyDir, copyTemplate, errorMessage, fileExists, spinner, successMessage } from 'utils';
import { getTemplatesDir } from 'utils/package-root.utils';
import type { FeatureApplyResult, FeatureContext } from '../feature.types';
import { AI_RULES_FILES } from './ai-rules.constants';

/**
 * Apply AI Rules feature to an existing package.
 * Copies Copilot instructions, GitHub instructions, CLAUDE.md, and Cursor rules from template.
 */
export async function applyAiRules(context: FeatureContext): Promise<FeatureApplyResult> {
  const applied: string[] = [];

  const [copilotFile, instructionsDir, claudeFile, cursorDir] = AI_RULES_FILES;

  const copilotDest = resolve(context.targetDir, copilotFile);
  const instructionsDest = resolve(context.targetDir, instructionsDir);
  const claudeDest = resolve(context.targetDir, claudeFile);
  const cursorDest = resolve(context.targetDir, cursorDir);

  const copilotExists = fileExists(copilotDest);
  const instructionsExist = existsSync(instructionsDest);
  const claudeExists = fileExists(claudeDest);
  const cursorExists = existsSync(cursorDest);

  if (copilotExists && instructionsExist && claudeExists && cursorExists) {
    return { applied, noopMessage: 'AI rules already installed. No changes made.' };
  }

  // Get template directory
  const fromDir = fileURLToPath(new URL('.', import.meta.url));
  const templateDir = getTemplatesDir(fromDir);

  const templateVars = {
    SCOPE: '',
    NAME: '',
    PACKAGE_NAME: '',
    YEAR: new Date().getFullYear().toString(),
    DESCRIPTION: '',
    AUTHOR_NAME: '',
    AUTHOR_EMAIL: '',
  };

  const copySpin = spinner();
  copySpin.start('Copying AI rules...');

  try {
    // Copy copilot-instructions.md
    if (!copilotExists) {
      await copyTemplate(resolve(templateDir, copilotFile), copilotDest, templateVars);
      applied.push(copilotFile);
    }

    // Copy instructions directory
    if (!instructionsExist) {
      await copyDir(resolve(templateDir, instructionsDir), instructionsDest, templateVars);
      applied.push(instructionsDir);
    }

    // Copy CLAUDE.md
    if (!claudeExists) {
      await copyTemplate(resolve(templateDir, claudeFile), claudeDest, templateVars);
      applied.push(claudeFile);
    }

    // Copy .cursor/rules directory
    if (!cursorExists) {
      await copyDir(resolve(templateDir, cursorDir), cursorDest, templateVars);
      applied.push(cursorDir);
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
