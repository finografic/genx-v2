import { renderHelp } from 'utils/render-help/render-help.utils';
import { defaultHelpOptions } from 'config/help.config';
import type { HelpMainNote, HelpNote } from 'types/help.types';

const main: HelpMainNote = {
  bin: 'finografic-create',
  args: '<command> [options]',
} as const;

const commands: HelpNote = {
  title: 'Commands',
  list:  [
    { label: 'create', description: 'Scaffold a new @finografic package' },
    { label: 'migrate', description: 'Sync conventions to an existing package' },
    { label: 'help', description: 'Show this help message' },
  ],
  options: {
    labels: {
      minWidth: 8,
    },
  } } as const;

const examples: HelpNote = {
  title: 'Examples',
  list: [
    { label: 'Create a new package', description: 'finografic-create create' },
    { label: 'Migrate current directory (dry-run)', description: 'finografic-create migrate' },
    { label: 'Migrate a specific directory (apply changes)', description: 'finografic-create migrate ../my-package --write' },
    { label: 'Migrate only specific sections', description: 'finografic-create migrate --only=package-json,eslint --write' },
  ] } as const;

const footer: HelpNote = {
  title: 'ShowHelp',
  list: [
    { label: 'finografic-create help', description: '' },
    { label: 'finografic-create <command> --help', description: '' },
  ] } as const;

export function showRootHelp(): void {
  renderHelp(
    {
      main,
      commands,
      examples,
      footer,
      minWidth: defaultHelpOptions.minWidth,
    });
}
