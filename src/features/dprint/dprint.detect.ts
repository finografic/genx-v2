import { resolve } from 'node:path';

import { fileExists } from 'utils/fs.utils';
import type { FeatureContext } from '../feature.types';

/**
 * Detect if dprint feature is already present in the target directory.
 */
export async function detectDprint(context: FeatureContext): Promise<boolean> {
  const dprintConfigPath = resolve(context.targetDir, 'dprint.jsonc');
  return fileExists(dprintConfigPath);
}
