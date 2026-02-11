import { defaultHelpOptions } from 'config/help.config';
import type { HelpConfig } from 'types/help.types';

export const featuresHelp: HelpConfig = {
  main: {
    bin: 'genx features',
  },

  examples: {
    title: 'Examples',
    list: [
      {
        label: 'Add features to current directory',
        description: 'genx features',
      },
    ],
  },

  footer: {
    title: 'Show Help',
    list: [
      {
        label: 'genx features --help',
        description: 'Show this help message',
      },
    ],
  },

  minWidth: defaultHelpOptions.minWidth,
};
