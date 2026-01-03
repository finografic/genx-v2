import { renderHelp } from 'utils/render-help/render-help.utils';
import { defaultHelpOptions } from 'config/help.config';
import type { HelpMainNote, HelpNote } from 'types/help.types';

const main: HelpMainNote = {
  bin: 'finografic-create create',
} as const;

const examples: HelpNote = {
  title: 'Examples',
  list: [
    { label: 'Create a new package interactively', description: 'finografic-create create' },
  ] } as const;

const footer: HelpNote = {
  title: 'Show Help',
  list: [
    { label: 'finografic-create create --help', description: 'Show this help message' },
  ],
} as const;

export function showCreateHelp(): void {
  renderHelp({
    main,
    examples,
    footer,
    minWidth: defaultHelpOptions.minWidth,
  });
}
