import type { PackageConfig } from '@finografic/core';

import * as clack from '@clack/prompts';
import pc from 'picocolors';

import { promptAuthor } from 'utils/steps/steps.utils';
import { descriptionSchema, packageNameSchema, scopeSchema } from 'utils/validation.utils';
import { defaultsConfig } from 'config/defaults.config';

export function intro(message: string): void {
  clack.intro(pc.bgCyan(pc.black(` ${message} `)));
}

export function outro(message: string): void {
  clack.outro(pc.green(message));
}

export function errorMessage(message: string): void {
  clack.log.error(pc.red(message));
}

export function successMessage(message: string): void {
  clack.log.success(pc.green(message));
}

export function infoMessage(message: string): void {
  clack.log.info(pc.cyan(message));
}

/**
 * Prompt for package configuration.
 */
export async function promptPackageConfig(): Promise<PackageConfig | null> {
  const scope = await clack.text({
    message: 'Package scope (finografic or @finografic):',
    placeholder: defaultsConfig.scope,
    initialValue: defaultsConfig.scope,
    validate: (value) => {
      const result = scopeSchema.safeParse(value);
      return result.success ? undefined : result.error.issues[0].message;
    },
  });

  if (clack.isCancel(scope)) {
    clack.cancel('Operation cancelled');
    return null;
  }

  const name = await clack.text({
    message: 'Package name:',
    placeholder: 'my-package',
    validate: (value) => {
      if (value && value.includes('/')) {
        return 'Enter the package name only (no scope). Example: my-package';
      }
      const result = packageNameSchema.safeParse(value);
      return result.success ? undefined : result.error.issues[0].message;
    },
  });

  if (clack.isCancel(name)) {
    clack.cancel('Operation cancelled');
    return null;
  }

  const description = await clack.text({
    message: 'Package description:',
    placeholder: defaultsConfig.description,
    initialValue: defaultsConfig.description,
    validate: (value) => {
      const result = descriptionSchema.safeParse(value);
      return result.success ? undefined : result.error.issues[0].message;
    },
  });

  if (clack.isCancel(description)) {
    clack.cancel('Operation cancelled');
    return null;
  }

  const author = await promptAuthor(defaultsConfig.author);

  if (!author) {
    clack.cancel('Operation cancelled');
    return null;
  }

  return {
    name: name as string,
    scope: scope as string,
    description: description as string,
    author,
  };
}

/**
 * Prompt for optional features.
 */
export async function promptFeatures() {
  const features = await clack.multiselect({
    message: 'Select optional features:',
    options: [
      { value: 'aiRules', label: 'AI Rules (.github/copilot-instructions.md)', hint: 'recommended' },
      { value: 'vitest', label: 'Vitest testing setup', hint: 'recommended' },
      { value: 'githubWorkflow', label: 'GitHub release workflow', hint: 'recommended' },
    ],
    required: false,
  });

  if (clack.isCancel(features)) {
    clack.cancel('Operation cancelled');
    return null;
  }

  return {
    aiRules: (features as string[]).includes('aiRules'),
    vitest: (features as string[]).includes('vitest'),
    githubWorkflow: (features as string[]).includes('githubWorkflow'),
  };
}

/**
 * Show a spinner for async operations.
 */
export function spinner() {
  return clack.spinner();
}
