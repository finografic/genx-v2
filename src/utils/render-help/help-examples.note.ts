import pc from 'picocolors';

import { defaultHelpOptions } from 'config/help.config';
import type { HelpNote, HelpNoteOptions, HelpNoteReturn } from 'types/help.types';
import { padLines } from './padding.utils';

interface ExamplesNoteProps {
  examples: HelpNote;
  minWidth?: number;
  options?: HelpNoteOptions;
}

export function renderExamplesNote(
  { examples, minWidth = defaultHelpOptions.minWidth }: ExamplesNoteProps): HelpNoteReturn {

  const title = examples.title;
  const content = examples.list.map((example) => {
    const parts: string[] = [];

    if (example.label) {
      parts.push(pc.dim(`# ${example.label}`));
    }

    parts.push(pc.white(example.description));

    return parts.join('\n');
  }).join('\n\n');

  const formattedContent = minWidth ? padLines(content, minWidth) : content;

  return [ formattedContent, title, { format: (line: string) => line } ];
}
