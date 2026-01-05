import { renderHelp } from 'utils/render-help/render-help.utils';
import { defaultHelpOptions } from 'config/help.config';
import type { HelpMainNote, HelpNote } from 'types/help.types';

const main: HelpMainNote = {
  bin: 'finografic-create migrate',
  args: '[path] [options]',
} as const;

const examples: HelpNote = {
  title: 'Examples',
  list: [
    { label: 'Dry run in current directory', description: 'finografic-create migrate' },
    { label: 'Dry run against a specific directory', description: 'finografic-create migrate ../my-package' },
    { label: 'Apply changes to a directory', description: 'finografic-create migrate ../my-package --write' },
    { label: 'Only update specific sections', description: 'finografic-create migrate --only=package-json,eslint --write' },
    { label: 'Update dependencies and Node version', description: 'finografic-create migrate --only=dependencies,node --write' },
    { label: 'Normalize file names and merge configs', description: 'finografic-create migrate --only=renames,merges --write' },
  ] } as const;

const footer: HelpNote = {
  title: 'Show Help',
  list: [
    { label: 'finografic-create migrate --help', description: 'Show this help message' },
  ] } as const;

export function showMigrateHelp(): void {
  renderHelp({
    main,
    examples,
    footer,
    minWidth: defaultHelpOptions.minWidth,
  });
}
