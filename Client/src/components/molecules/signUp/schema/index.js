import * as yup from 'yup';

export const schema=()=>{
     return yup.object().shape({
        name: yup.string().required('Full name is required'),
        userName: yup.string().required('User name is required'),
        email: yup.string().required('Email is required').email('Email must be a valid email address'),
        password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
        
    
    });
}