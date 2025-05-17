const chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', 'abcdefghijklmnopqrstuvwxyz', '?@!{}|'];

/**
 * Generate password
 */
export const generatePassword = (): string => {
  const passwordLength = 16;

  let result = '';

  for (let i = 0; i < passwordLength; i++) {
    const currentChars = chars[i % chars.length];

    result += currentChars.charAt(Math.floor(Math.random() * currentChars.length));
  }

  return result;
};
