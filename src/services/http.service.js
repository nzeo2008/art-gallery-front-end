import axios from 'axios';
import logger from './logger.service';
import { toast } from 'react-toastify';
import { token } from '../config';

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response && error.response.status >= 400 && error.response.status < 500;

	if (!expectedError) {
		logger.log(error);
		toast.error('Произошла ошибка');
	}

	return Promise.reject(error);
});

function getJwt() {
	return localStorage.getItem(token.key);
}

const defautHeaders = {
	headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${getJwt()}`,
	},
};

const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	patch: axios.patch,
	delete: axios.delete,
	defautHeaders,
};

export default httpService;
