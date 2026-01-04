import pc from 'picocolors';

import { defaultHelpOptions } from 'config/help.config';
import type { HelpNote, HelpNoteOptions, HelpNoteReturn } from 'types/help.types';
import { padLines } from './padding.utils';

interface FooterNoteProps {
  footer: HelpNote;
  minWidth?: number;
  options?: HelpNoteOptions;
}

export function renderFooterNote(
  { footer, minWidth = defaultHelpOptions.minWidth }: FooterNoteProps): HelpNoteReturn {

  const title = footer.title;
  const content = footer.list
    .map((item) =>
      item.description
        ? `${pc.white(item.label)}  ${item.description}`
        : `${pc.white(item.label)}`,
    ).join('\n');

  const formattedContent = minWidth ? padLines(content, minWidth) : content;

  return [ formattedContent, title, { format: (line: string) => line } ];
}
