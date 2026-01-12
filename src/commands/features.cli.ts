import { featuresHelp } from 'help/features.help';
import pc from 'picocolors';
import { promptFeatures } from 'prompts/features.prompt';

import {
  ensureDprintConfig,
  errorMessage,
  infoMessage,
  intro,
  outro,
  successMessage,
} from 'utils';
import { isDevelopment, safeExit } from 'utils/env.utils';
import { renderHelp } from 'utils/render-help/render-help.utils';
import { validateExistingPackage } from 'utils/validation.utils';

// NOTE: This command never prompts directly.
// All user input is collected via promptFeatures().

/**
 * Add optional features to an existing @finografic package.
 */
export async function addFeatures(
  argv: string[],
  context: { cwd: string },
): Promise<void> {
  if (argv.includes('--help') || argv.includes('-h')) {
    renderHelp(featuresHelp);
    return;
  }

  intro('Add features to existing @finografic package');

  const debug = isDevelopment() || process.env.FINOGRAFIC_DEBUG === '1';
  if (debug) {
    infoMessage(`execPath: ${process.execPath}`);
    infoMessage(`argv[1]: ${process.argv[1] ?? ''}`);
  }

  // 1. Validate we're in an existing package
  const targetDir = context.cwd;
  const validation = validateExistingPackage(targetDir);
  if (!validation.ok) {
    errorMessage(validation.reason || 'Not a valid package directory');
    safeExit(1);
    return;
  }

  // 2. Prompt for features
  const features = await promptFeatures();
  if (!features) {
    safeExit(0);
    return;
  }

  // 3. Apply selected features
  const applied: string[] = [];

  if (features.dprint) {
    const result = await ensureDprintConfig(targetDir);
    if (result.wrote) {
      applied.push('dprint');
      successMessage(`Created ${result.path}`);
    } else {
      infoMessage(`dprint.jsonc already exists at ${result.path}`);
    }
  }

  // NOTE: Future features and feature side-effects can be added here:
  // if (features.vitest) { ... }
  // if (features.githubWorkflow) { ... }
  // if (features.aiRules) { ... }

  // 4. Done!
  if (applied.length > 0) {
    outro('Features added successfully!');
    console.log(pc.dim('Applied features:'), pc.cyan(applied.join(', ')));
  } else {
    outro('No new features to add');
  }
}
