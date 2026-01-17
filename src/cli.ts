#!/usr/bin/env node

import process from 'node:process';

import { renderHelp } from 'utils/render-help/render-help.utils.js';
import { createPackage } from './commands/create.cli.js';
import { addFeatures } from './commands/features.cli.js';
import { migratePackage } from './commands/migrate.cli.js';
import { rootHelp } from './help/root.help.js';
import { safeExit } from './utils/env.utils.js';

type CommandHandler = (argv: string[], context: { cwd: string }) => Promise<void> | void;

async function main(): Promise<void> {
  const cwd = process.cwd();
  const argv = process.argv.slice(2);

  /* ────────────────────────────────────────────────────────── */
  /* Root help only                                              */
  /* ────────────────────────────────────────────────────────── */

  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    renderHelp(rootHelp);
    return;
  }
  const command = argv[0];
  const args = argv.slice(1);

  /* ────────────────────────────────────────────────────────── */
  /* Command registry                                            */
  /* ────────────────────────────────────────────────────────── */

  const commands: Record<string, CommandHandler> = {
    create: async (argv, context) => {
      await createPackage(argv, context);
    },

    migrate: async (argv, context) => {
      await migratePackage(argv, context);
    },

    features: async (argv, context) => {
      await addFeatures(argv, { targetDir: context.cwd });
    },

    help: () => {
      renderHelp(rootHelp);
    },
  };

  /* ────────────────────────────────────────────────────────── */
  /* Guards                                                      */
  /* ────────────────────────────────────────────────────────── */

  if (!commands[command]) {
    console.error(`Unknown command: ${command}`);
    renderHelp(rootHelp);
    safeExit(1);
    return;
  }

  /* ────────────────────────────────────────────────────────── */
  /* Execute                                                     */
  /* ────────────────────────────────────────────────────────── */

  await commands[command](args, { cwd });
}

/* ────────────────────────────────────────────────────────── */
/* Bootstrap                                                    */
/* ────────────────────────────────────────────────────────── */

main().catch((error) => {
  console.error(error);
  safeExit(1);
});
