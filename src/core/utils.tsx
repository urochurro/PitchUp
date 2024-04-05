import axios, { AxiosResponse } from 'axios';

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  // if (password.length < 6) return 'Password must be at least 6 characters.';
  // if (password !== confirmPassword) return 'Passwords do not match.';


  return '';
};

export const confirmPassValidator = (password: string, confirmPassword: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password !== confirmPassword) return 'Passwords do not match.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const companyNameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Company Name cannot be empty.';

  return '';
};

export function fetchJobData(): Promise<any> {
  return axios.get("http://192.168.29.167:3000/getCandidateDetails/V92fc2631-3710-40d6-b78c-a427d17fbd56a")
    .then((response: AxiosResponse) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error: any) => {
      console.error('Error fetching data:', error);
      return {};
    });
}