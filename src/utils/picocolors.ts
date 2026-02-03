/**
 * Picocolors with ESM interop.
 * CJS "export =" is exposed as namespace.default when imported as ESM,
 * so we normalize to a single `pc` object for use across the app.
 */
import * as pcNamespace from 'picocolors';

export const pc = (pcNamespace as { default?: typeof pcNamespace }).default ?? pcNamespace;
