import { toast } from 'react-toastify';

export function toastLoading() {
	return toast.loading('Пожалуйста подождите...');
}

export function toastUpdate(id, message, type) {
	setTimeout(() => {
		toast.update(id, {
			render: message,
			type: type,
			isLoading: false,
			autoClose: 2000,
		});
	}, 100);
}
