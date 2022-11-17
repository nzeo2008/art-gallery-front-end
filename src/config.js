const connectionURL = 'https://art-gallery-back-end.onrender.com';

export const api = {
	registerEndpoint: `${connectionURL}/users/register`,
	loginEndpoint: `${connectionURL}/users/login`,
	saveEventToUserEndpoint: `${connectionURL}/users/save-event-to-user`,
	deleteEventFromUserEndpoint: `${connectionURL}/users/delete-event-from-user`,
	searchEventFromUserEndpoint: `${connectionURL}/users/search-event-from-user`,
	getUserDataEndpoint: `${connectionURL}/users/get-user-data`,

	createEventEndpoint: `${connectionURL}/events/create-event`,
	searchEventEndpoint: `${connectionURL}/events/search-event`,
	searchEventCategoryEndpoint: `${connectionURL}/events/search-category`,
	deleteEventEndpoint: `${connectionURL}/events/delete-event`,
	updateEventEndpoint: `${connectionURL}/events/update-event`,

	createArtistEndpoint: `${connectionURL}/artists/create-artist`,
	searchArtistEndpoint: `${connectionURL}/artists/search-artist`,
	searchArtistCategoryEndpoint: `${connectionURL}/artists/search-category`,
	searchArtistTagsEndpoint: `${connectionURL}/artists/search-tags`,
	deleteArtistEndpoint: `${connectionURL}/artists/delete-artist`,
	updateArtistEndpoint: `${connectionURL}/artists/update-artist`,

	createExhibitionEndpoint: `${connectionURL}/exhibitions/create-exhibition`,
	searchExhibitionEndpoint: `${connectionURL}/exhibitions/search-exhibition`,
	searchExhibitionCategoryEndpoint: `${connectionURL}/exhibitions/search-category`,
	searchExhibitionTagsEndpoint: `${connectionURL}/exhibitions/search-tags`,
	deleteExhibitionEndpoint: `${connectionURL}/exhibitions/delete-exhibition`,
	updateExhibitionEndpoint: `${connectionURL}/exhibitions/update-exhibition`,

	baseUrl: '',
};

export const token = {
	key: 'token',
};
