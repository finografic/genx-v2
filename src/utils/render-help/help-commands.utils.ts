import pc from 'picocolors';

import { defaultHelpOptions } from 'config/help.config';
import type { HelpNote, HelpNoteOptions, HelpNoteReturn } from 'types/help.types';
import { padLines, padValue } from './help-padding.utils';

interface CommandsNoteProps {
  commands: HelpNote;
  minWidth?: number;
  options?: HelpNoteOptions;
}

export function renderCommandsNote({ commands, minWidth, options }: CommandsNoteProps): HelpNoteReturn {
  const title = commands.title;
  const labelWidth = options?.labels.minWidth ?? defaultHelpOptions.labels.minWidth;

  const content = commands.list.map((command) => {
    const label = pc.cyanBright(command.label);
    const paddedLabel = padValue(label, labelWidth);
    return `${paddedLabel}  ${command.description}`;
  }).join('\n');

  const formattedContent = minWidth ? padLines(content, minWidth) : content;

  return [ formattedContent, title, { format: (line: string) => line } ];
}
