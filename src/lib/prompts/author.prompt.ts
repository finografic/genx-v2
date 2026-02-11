import * as clack from '@clack/prompts';

import { emailSchema } from 'utils/validation.utils';

export type Author = {
  name: string;
  email: string;
};

type AuthorField = 'name' | 'email';

export async function promptAuthor(
  defaults: Author,
): Promise<Author | null> {
  const fields = await clack.autocompleteMultiselect<AuthorField>({
    message: 'Select author fields to edit',
    options: [
      { value: 'name', label: 'Name', hint: defaults.name },
      { value: 'email', label: 'Email', hint: defaults.email },
    ],
    placeholder: 'Type to filter fields...',
    initialValues: ['name', 'email'],
  });

  if (clack.isCancel(fields)) {
    clack.cancel('Operation cancelled');
    return null;
  }

  // Defensive but explicit: clack returns AuthorField[]
  const selected = new Set(fields);

  let name = defaults.name;
  let email = defaults.email;

  if (selected.has('name')) {
    const value = await clack.text({
      message: 'Author name:',
      initialValue: name,
    });

    if (clack.isCancel(value)) return cancel();
    name = value;
  }

  if (selected.has('email')) {
    const value = await clack.text({
      message: 'Author email:',
      initialValue: email,
      validate: (v) =>
        emailSchema.safeParse(v).success
          ? undefined
          : 'Invalid email address',
    });

    if (clack.isCancel(value)) return cancel();
    email = value;
  }

  return { name, email };
}

function cancel(): null {
  clack.cancel('Operation cancelled');
  return null;
}
