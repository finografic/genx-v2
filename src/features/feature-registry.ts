import { aiRulesFeature } from './ai-rules';
import { dprintFeature } from './dprint';
import type { Feature, FeatureId } from './feature.types';
import { vitestFeature } from './vitest';

/**
 * Registry of all available features.
 * Add new features here as they are implemented.
 */
export const features: Feature[] = [
  dprintFeature,
  vitestFeature,
  aiRulesFeature,
  // TODO: Add other features as they are migrated:
  // githubWorkflowFeature,
];

/**
 * Get a feature by its ID.
 */
export function getFeature(id: FeatureId): Feature | undefined {
  return features.find((f) => f.id === id);
}

/**
 * Get all feature IDs.
 */
export function getFeatureIds(): FeatureId[] {
  return features.map((f) => f.id);
}
