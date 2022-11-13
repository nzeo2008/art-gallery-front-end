import React from 'react';
import styles from './admin.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateEvent from './CreateEvent/CreateEvent';
import { useState, useReducer, useEffect } from 'react';
import CreateArtist from './CreateArtist/CreateArtist';
import CreateExhibition from './CreateExhibition/CreateExhibition';
import { scrollOnTop } from './../../services/common.service';

function Admin() {
	const location = useLocation();

	const initialState = location.state ? (
		location.state.from === 'event' ? (
			<CreateEvent />
		) : location.state.from === 'artist' ? (
			<CreateArtist />
		) : (
			<CreateExhibition />
		)
	) : (
		<CreateEvent />
	);

	const [currentState, setCurrentState] = useState('event');

	useEffect(() => {
		if (location.state) {
			const { state } = location;
			setCurrentState(state.from);
			scrollOnTop();
		}
	}, [location]);

	const [state, dispatch] = useReducer(reducer, initialState);

	function reducer(state, action) {
		switch (action.type) {
			case 'event':
				setCurrentState(action.type);
				return <CreateEvent />;
			case 'exhibition':
				setCurrentState(action.type);
				return <CreateExhibition />;
			case 'artist':
				setCurrentState(action.type);
				return <CreateArtist />;
			default:
				return '';
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<div className={styles.sidebar_header}>
					<FontAwesomeIcon className={styles.icon} icon={faFile} />
					<h3>Создание</h3>
				</div>
				<NavLink
					onClick={() => dispatch({ type: 'event' })}
					className={currentState === 'event' ? styles.active : ''}
				>
					Создать событие
				</NavLink>
				<NavLink
					onClick={() => dispatch({ type: 'exhibition' })}
					className={currentState === 'exhibition' ? styles.active : ''}
				>
					Создать выставку
				</NavLink>
				<NavLink
					onClick={() => dispatch({ type: 'artist' })}
					className={currentState === 'artist' ? styles.active : ''}
				>
					Создать деятеля искусства
				</NavLink>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.main_content}>{state}</div>
			</div>
		</div>
	);
}

export default Admin;
