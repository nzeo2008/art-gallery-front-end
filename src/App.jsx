import React, { useEffect, useState, useCallback } from 'react';
import Layout from './layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About/About';
import NotFoundPage from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Exhibitions from './pages/Exhibitions/Exhibitions';
import Artists from './pages/Artists/Artists';
import Location from './pages/Location/Location';
import Admin from './pages/Admin/Admin';
import { ToastContainer, Flip } from 'react-toastify';
import Event from './pages/Events/Event';
import { getData } from './services/admin.services';
import { api } from './config';
import Exhibition from './pages/Exhibitions/Exhibition';
import Artist from './pages/Artists/Artist';
import ProtectedRoute from './services/ProtectedRoute/ProtectedRoute';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from './services/login.service';
import ExhibitionsCategory from './pages/Category/ExhibitionsCategory';
import EventsCategory from './pages/Category/EventsCategory';
import ArtistsCategory from './pages/Category/ArtistsCategory';
import Tags from './pages/Tags/Tags';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
	const [events, setEvents] = useState([]);
	const [exhibitions, setExhibitions] = useState([]);
	const [artists, setArtists] = useState([]);

	const fetchEventsData = useCallback(async () => {
		const { data: eventsData } = await getData(api.searchEventEndpoint, { title: '' });

		setEvents(eventsData);
	}, []);

	const fetchExhibitionsData = useCallback(async () => {
		const { data: exhibitionsData } = await getData(api.searchExhibitionEndpoint, {
			title: '',
		});

		setExhibitions(exhibitionsData);
	}, []);

	const fetchArtistsData = useCallback(async () => {
		const { data: artistsData } = await getData(api.searchArtistEndpoint, {
			name: '',
		});

		setArtists(artistsData);
	}, []);

	const user = getCurrentUser();

	useEffect(() => {
		fetchEventsData();
		fetchExhibitionsData();
		fetchArtistsData();
	}, [fetchEventsData, fetchArtistsData, fetchExhibitionsData]);

	return (
		<>
			<ToastContainer
				position='top-right'
				hideProgressBar={false}
				newestOnTop={false}
				autoClose={5000}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Flip}
			/>

			<Routes>
				<Route path='/' element={<Layout events={events} user={user} />}>
					<Route index element={<Home exhibitions={exhibitions} events={events} />} />
					<Route
						path='events'
						element={<Events events={events} user={user} setEvents={setEvents} />}
					/>
					<Route path='events/:alias' element={<Event user={user} events={events} />} />
					<Route
						path='exhibitions'
						element={
							<Exhibitions
								exhibitions={exhibitions}
								user={user}
								setExhibitions={setExhibitions}
							/>
						}
					/>
					<Route
						path='exhibitions/:alias'
						element={<Exhibition exhibitions={exhibitions} />}
					/>
					<Route path='category/events/:category' element={<EventsCategory />} />
					<Route
						path='category/exhibitions/:category'
						element={<ExhibitionsCategory />}
					/>
					<Route path='category/artists/:category' element={<ArtistsCategory />} />
					<Route
						path='artists'
						element={<Artists artists={artists} user={user} setArtists={setArtists} />}
					/>
					<Route path='artists/:_id' element={<Artist artists={artists} />} />
					<Route path='tags/:tags' element={<Tags />} />
					<Route path='about' element={<About />} />
					<Route path='user-profile' element={<UserProfile user={user} />} />
					<Route
						path='admin'
						element={
							<ProtectedRoute>
								<Admin />
							</ProtectedRoute>
						}
					/>
					<Route path='location' element={<Location />} />
					<Route path='not-found' element={<NotFoundPage />} />
				</Route>
				<Route
					path='*'
					element={<Navigate to={'/not-found'} element={<NotFoundPage />} />}
				/>
			</Routes>
		</>
	);
}

export default App;
