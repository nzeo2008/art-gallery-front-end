import httpService from './http.service';

export async function createData(endpoint, formData) {
	return httpService.post(endpoint, formData, httpService.defautHeaders);
}

export async function getData(endpoint, params) {
	return httpService.get(endpoint, {
		params: params,
	});
}

export async function updateData(endpoint, formData) {
	return httpService.patch(endpoint, formData, httpService.defautHeaders);
}

export async function deleteData(endpoint, params) {
	const { headers } = httpService.defautHeaders;

	return httpService.delete(endpoint, { params: params, headers });
}

export async function createFormDataForEvents(data) {
	const formData = new FormData();
	const { email, array: event } = data;

	formData.append('email', email);

	for (let i = 0; i < event.length; i++) {
		for (let key in event[i]) {
			if (Array.isArray(event[i][key])) {
				for (let item of event[i][key]) {
					formData.append(`event[${i}][${key}][]`, item);
				}
			} else {
				formData.append(`event[${i}][${key}]`, event[i][key]);
			}
		}
	}
	return formData;
}

export async function createFormData(data) {
	const { images, ...updatedData } = data;
	const formData = new FormData();

	if (data.tags && data.artists) {
		const { tags, artists, ...newData } = updatedData;

		const updatedTags = tags.split(',');

		updatedTags.forEach((tag) => formData.append('tags[]', tag.trim()));

		for (let i = 0; i < artists.length; i++) {
			for (let key in artists[i]) {
				if (Array.isArray(artists[i][key])) {
					for (let item of artists[i][key]) {
						formData.append(`artists[${i}][${key}][]`, item);
					}
				} else {
					formData.append(`artists[${i}][${key}]`, artists[i][key]);
				}
			}
		}

		for (let image of images) {
			formData.append('images', image);
		}

		for (let key in newData) {
			formData.append(key, newData[key]);
		}

		return formData;
	} else if (data.tags) {
		const { tags, ...newData } = updatedData;

		const updatedTags = tags.split(',');

		updatedTags.forEach((tag) => formData.append('tags[]', tag.trim()));

		for (let image of images) {
			formData.append('images', image);
		}

		for (let key in newData) {
			formData.append(key, newData[key]);
		}

		return formData;
	} else {
		for (let image of images) {
			formData.append('images', image);
		}

		for (let key in updatedData) {
			formData.append(key, data[key]);
		}

		return formData;
	}
}
