import * as api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notify = (msg) => {
    toast(msg)
};

export const signin = (formData, navigate) => async (dispatch) => {

    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        notify(error['message'])
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log(error)
    }
};