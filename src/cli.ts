#!/usr/bin/env node

import process from 'node:process';

import { createPackage } from './commands/create.cli.js';
import { migratePackage } from './commands/migrate.cli.js';
import { showCreateHelp } from './help/create.help.js';
import { showMigrateHelp } from './help/migrate.help.js';
import { showRootHelp } from './help/root.help.js';
import { safeExit } from './utils/env.utils.js';

type CommandHandler = (args: string[], ctx: { cwd: string }) => Promise<void> | void;
type HelpHandler = () => void;

async function main(): Promise<void> {
  const cwd = process.cwd();
  const argv = process.argv.slice(2);

  // `finografic-create --help` (or `pnpm dev.cli --help`) should show root help
  if (argv[0] === '--help' || argv[0] === '-h') {
    showRootHelp();
    return;
  }

  const command = argv[0] ?? 'create';
  const args = argv.slice(1);

  /* ────────────────────────────────────────────────────────── */
  /* Command registry                                            */
  /* ────────────────────────────────────────────────────────── */

  const commands: Record<string, CommandHandler> = {
    create: async () => {
      await createPackage({ cwd });
    },

    migrate: async () => {
      await migratePackage(argv, { cwd });
    },

    help: () => {
      showRootHelp();
    },
  };

  const helpHandlers: Record<string, HelpHandler> = {
    create: showCreateHelp,
    migrate: showMigrateHelp,
  };

  /* ────────────────────────────────────────────────────────── */
  /* Guards                                                      */
  /* ────────────────────────────────────────────────────────── */

  // --help / -h always wins (for subcommands)
  if (args.includes('--help') || args.includes('-h')) {
    helpHandlers[command]?.() ?? showRootHelp();
    return;
  }

  // Unknown command
  if (!commands[command]) {
    console.error(`Unknown command: ${command}`);
    showRootHelp();
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
