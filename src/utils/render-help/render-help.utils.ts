import * as clack from '@clack/prompts';

import type { HelpConfig } from 'types/help.types';
import { renderCommandsNote } from './help-commands.utils';
import { renderExamplesNote } from './help-examples.utils';
import { renderFooterNote } from './help-footer.utils';
import { renderMainSignature } from './help-main.utils';

export function renderHelp({ main, commands, examples, footer, minWidth }: HelpConfig): void {
  console.clear();
  console.log('');

  // Main command signature
  clack.intro(renderMainSignature(main));

  // Commands box
  if (commands) {
    clack.note( ...renderCommandsNote({ commands, minWidth }));
  }

  // Examples box
  if (examples) {
    clack.note( ...renderExamplesNote({ examples, minWidth }));
  }

  // Help footer
  if (footer) {
    clack.note( ...renderFooterNote({ footer, minWidth }));
  }

  // Outro
  clack.outro('Use --help with a command for more details');
}
