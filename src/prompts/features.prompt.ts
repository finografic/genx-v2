import * as clack from '@clack/prompts';

import { cancel } from 'utils/prompts.utils';

export interface FeaturesConfig {
  aiRules: boolean;
  vitest: boolean;
  githubWorkflow: boolean;
};

export async function promptFeatures(): Promise<FeaturesConfig | null> {
  const features = await clack.multiselect({
    message: 'Select optional features:',
    options: [
      { value: 'aiRules', label: 'AI Rules (.github/copilot-instructions.md)', hint: 'recommended' },
      { value: 'vitest', label: 'Vitest testing setup', hint: 'recommended' },
      { value: 'githubWorkflow', label: 'GitHub release workflow', hint: 'recommended' },
    ],
    required: false,
  });

  if (clack.isCancel(features)) return cancel();

  const selected = new Set(features);

  return {
    aiRules: selected.has('aiRules'),
    vitest: selected.has('vitest'),
    githubWorkflow: selected.has('githubWorkflow'),
  };
}
