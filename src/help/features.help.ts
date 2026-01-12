import { defaultHelpOptions } from 'config/help.config';
import type { HelpConfig } from 'types/help.types';

export const featuresHelp: HelpConfig = {
  main: {
    bin: 'finografic-create features',
  },

  examples: {
    title: 'Examples',
    list: [
      {
        label: 'Add features to current directory',
        description: 'finografic-create features',
      },
    ],
  },

  footer: {
    title: 'Show Help',
    list: [
      {
        label: 'finografic-create features --help',
        description: 'Show this help message',
      },
    ],
  },

  minWidth: defaultHelpOptions.minWidth,
};
