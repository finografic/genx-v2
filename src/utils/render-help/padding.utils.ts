/**
 * Strip ANSI color codes from a string to get its visible length.
 */
export function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

/**
 * Pad a line to a minimum width by adding spaces at the end.
 * Only pads if the visible (ANSI-stripped) length is less than minWidth.
 */
export function padValue(value: string, minWidth: number): string {
  const visibleLength = stripAnsi(value).length;
  if (visibleLength >= minWidth) {
    return value;
  }
  const padding = ' '.repeat(minWidth - visibleLength);
  return value + padding;
}

/**
 * Pad all lines in a multi-line string to a minimum width.
 */
export function padLines(content: string, minWidth: number): string {
  if (!minWidth) {
    return content;
  }

  return content
    .split('\n')
    .map((line) => padValue(line, minWidth))
    .join('\n');
}
