import httpService from './http.service';
import { api } from '../config';

export function register(name, email, password) {
	return httpService.post(
		api.registerEndpoint,
		{ name, email, password },
		httpService.defautHeaders
	);
}
