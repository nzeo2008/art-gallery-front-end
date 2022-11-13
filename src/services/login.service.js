import httpService from './http.service.js';
import { api } from '../config';
import jwtDecode from 'jwt-decode';
import { token } from '../config';

const tokenKey = token.key;

export async function login(email, password) {
	const result = await httpService.post(
		api.loginEndpoint,
		{ email, password },
		httpService.defautHeaders
	);

	const { data } = result;

	localStorage.setItem(tokenKey, data.jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}
