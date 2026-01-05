export type DependencySection = 'dependencies' | 'devDependencies';

export interface DependencyRule {
  name: string;
  version: string;
  section: DependencySection;
}
