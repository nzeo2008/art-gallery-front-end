import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import Navbar from '../components/Navbar/Navbar';

function Layout({ events, user }) {
	return (
		<div className={styles.layout}>
			<Header />
			<Navbar user={user} />
			<Main>
				<Outlet />
			</Main>
			<Footer events={events} />
		</div>
	);
}

export default Layout;
