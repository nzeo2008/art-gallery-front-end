export const api = {
	registerEndpoint: 'http://localhost:3001/users/register',
	loginEndpoint: 'http://localhost:3001/users/login',
	saveEventToUserEndpoint: 'http://localhost:3001/users/save-event-to-user',
	deleteEventFromUserEndpoint: 'http://localhost:3001/users/delete-event-from-user',
	searchEventFromUserEndpoint: 'http://localhost:3001/users/search-event-from-user',
	getUserDataEndpoint: 'http://localhost:3001/users/get-user-data',

	createEventEndpoint: 'http://localhost:3001/events/create-event',
	searchEventEndpoint: 'http://localhost:3001/events/search-event',
	searchEventCategoryEndpoint: 'http://localhost:3001/events/search-category',
	deleteEventEndpoint: 'http://localhost:3001/events/delete-event',
	updateEventEndpoint: 'http://localhost:3001/events/update-event',

	createArtistEndpoint: 'http://localhost:3001/artists/create-artist',
	searchArtistEndpoint: 'http://localhost:3001/artists/search-artist',
	searchArtistCategoryEndpoint: 'http://localhost:3001/artists/search-category',
	searchArtistTagsEndpoint: 'http://localhost:3001/artists/search-tags',
	deleteArtistEndpoint: 'http://localhost:3001/artists/delete-artist',
	updateArtistEndpoint: 'http://localhost:3001/artists/update-artist',

	createExhibitionEndpoint: 'http://localhost:3001/exhibitions/create-exhibition',
	searchExhibitionEndpoint: 'http://localhost:3001/exhibitions/search-exhibition',
	searchExhibitionCategoryEndpoint: 'http://localhost:3001/exhibitions/search-category',
	searchExhibitionTagsEndpoint: 'http://localhost:3001/exhibitions/search-tags',
	deleteExhibitionEndpoint: 'http://localhost:3001/exhibitions/delete-exhibition',
	updateExhibitionEndpoint: 'http://localhost:3001/exhibitions/update-exhibition',

	baseUrl: 'http://localhost:3001/static/',
};

export const token = {
	key: 'token',
};
