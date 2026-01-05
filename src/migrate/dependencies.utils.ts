import type { DependencyRule, DependencySection } from 'types/dependencies.types';
import type { PackageJson } from 'types/package-json.types';

export interface DependencyChange {
  name: string;
  from?: string;
  to: string;
  operation: 'add' | 'update' | 'noop';
  section: DependencySection;
}

export function planDependencyChanges(
  packageJson: PackageJson,
  rules: DependencyRule[],
): DependencyChange[] {
  const changes: DependencyChange[] = [];

  for (const rule of rules) {
    const section = packageJson[rule.section] ?? {};
    const current = section[rule.name as keyof typeof section];

    if (!current) {
      changes.push({
        name: rule.name,
        to: rule.version,
        operation: 'add',
        section: rule.section,
      });
      continue;
    }

    if (current !== rule.version) {
      changes.push({
        name: rule.name,
        from: current,
        to: rule.version,
        operation: 'update',
        section: rule.section,
      });
    }
  }

  return changes;
}

/**
 * Apply dependency changes to package.json.
 */
export function applyDependencyChanges(
  packageJson: PackageJson,
  changes: DependencyChange[],
): PackageJson {
  const next = { ...packageJson };

  for (const change of changes) {
    if (!next[change.section]) {
      next[change.section] = {};
    }
    const section = next[change.section] as Record<string, string>;
    section[change.name] = change.to;
  }

  return next;
}
