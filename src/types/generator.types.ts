import type { PackageConfig } from '@finografic/core';

export interface GeneratorContext {
  cwd: string;
  targetDir: string;
  config: PackageConfig;
  features: {
    aiRules: boolean;
    vitest: boolean;
    githubWorkflow: boolean;
  };
}
