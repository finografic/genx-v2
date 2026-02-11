import { defaultHelpOptions } from 'config/help.config';
import type { HelpConfig } from 'types/help.types';

export const createHelp: HelpConfig = {
  main: {
    bin: 'genx create',
  },

  examples: {
    title: 'Examples',
    list: [
      {
        label: 'Create a new package interactively',
        description: 'genx create',
      },
    ],
  },

  footer: {
    title: 'Show Help',
    list: [
      {
        label: 'genx create --help',
        description: 'Show this help message',
      },
    ],
  },

  minWidth: defaultHelpOptions.minWidth,
};
