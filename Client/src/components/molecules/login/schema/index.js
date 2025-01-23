import * as yup from 'yup';

export const schema=()=>{
     return yup.object().shape({
        userName: yup.string().required('User Name is required'),
        password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
      });
}