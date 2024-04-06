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
export function fetchJobs(userId): Promise<any> {
  return axios.get("http://10.0.0.10:3000/allJobs/"+userId)
    .then((response: AxiosResponse) => {
      const responseData = response.data;
      // console.log('Data fetched:', responseData);
      
      return responseData;
    })
    .catch((error: any) => {
      console.error('Error fetching data:', error);
      return {};
    });
}

export function fetchCandidateInfo(jobId): Promise<any> {
  return axios.get("http://10.0.0.10:3000/getCandidatesByJobRole/"+jobId)
    .then((response: AxiosResponse) => {
      const responseData = response.data;
      // console.log('Data fetched:', responseData);
      
      return responseData;
    })
    .catch((error: any) => {
      console.error('Error fetching data:', error);
      return {};
    });
}


export function fetchCandidateProfile(userId): Promise<any> {
  return axios.get("http://192.168.29.167:3000/getCandidateProfile/"+userId)
    .then((response: AxiosResponse) => {
      const responseData = response.data;      
      return responseData;
    })
    .catch((error: any) => {
      console.error('Error fetching data:', error);
      return {};
    });
}