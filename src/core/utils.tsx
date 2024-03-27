export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string, confirmPassword: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  // if (password !== confirmPassword) return 'Passwords do not match.';


  return '';
};

export const confirmPassValidator = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return 'Passwords do not match.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
