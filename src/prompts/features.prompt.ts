import * as clack from '@clack/prompts';

import { cancel } from 'utils/prompts.utils';

export interface FeaturesConfig {
  vitest: boolean;
  githubWorkflow: boolean;
  aiRules: boolean;
  dprint: boolean;
}

export async function promptFeatures(): Promise<FeaturesConfig | null> {
  const features = await clack.multiselect({
    message: 'Select optional features:',
    options: [
      {
        value: 'dprint',
        label: 'dprint formatting (extends @finografic/dprint-config)',
        hint: 'recommended',
      },
      { value: 'vitest', label: 'Vitest testing setup', hint: 'recommended' },
      { value: 'githubWorkflow', label: 'GitHub release workflow', hint: 'recommended' },
      {
        value: 'aiRules',
        label: 'AI Rules (.github/copilot-instructions.md)',
        hint: 'recommended',
      },
    ],
    required: false,
  });

  if (clack.isCancel(features)) return cancel();

  const selected = new Set(features);

  return {
    dprint: selected.has('dprint'),
    vitest: selected.has('vitest'),
    githubWorkflow: selected.has('githubWorkflow'),
    aiRules: selected.has('aiRules'),
  };
}
