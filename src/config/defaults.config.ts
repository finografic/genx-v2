export const defaultsConfig = {
  /** Default scope for new packages (accepts `finografic` or `@finografic`) */
  scope: '@finografic',

  /** Default description placeholder / initial value */
  description: 'A cool new package',

  /** Default author values for new packages */
  author: {
    name: 'Justin',
    email: 'justin.blair.rankin@gmail.com',
    url: 'http://finografic.github.com/cv-justin-rankin',
  },

  /**
   * Author prompt format (single prompt).
   * Example: `Name | email@example.com | https://example.com`
   */
  authorPromptDelimiter: '|',
} as const;
