import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-art.png';
import styles from './navbar.module.css';
import { useState } from 'react';
import LoginForm from '../../pages/LoginForm/LoginForm';
import RegisterForm from './../../pages/RegisterForm/RegisterForm';
import { logout } from './../../services/login.service';

function Navbar({ user }) {
	const [isRegisterActive, setIsRegisterActive] = useState(false);
	const [isLoginActive, setIsLoginActive] = useState(false);

	return (
		<>
			<div className={styles.navbar}>
				<Link to='/' className={styles.header_logo}>
					<img src={logo} alt='logo-art.png' />
				</Link>
				<div className={styles.low_header_container}>
					<Link to='/' className={styles.low_header_nav_link}>
						Главная
					</Link>
					<Link to='events' className={styles.low_header_nav_link}>
						События
					</Link>
					<Link to='exhibitions' className={styles.low_header_nav_link}>
						Выставки
					</Link>
					<Link to='artists' className={styles.low_header_nav_link}>
						Деятели искусства
					</Link>
					{user && user.isAdmin && (
						<Link to='admin' className={styles.low_header_nav_link}>
							Редактировать
						</Link>
					)}
				</div>
				<div className={styles.login_register}>
					{user ? (
						<Link to={'user-profile'} className={styles.low_header_nav_link}>
							{user.email}
						</Link>
					) : (
						<Link
							onClick={() => {
								setIsRegisterActive(true);
							}}
							className={styles.low_header_nav_link}
						>
							Регистрация
						</Link>
					)}

					{user ? (
						<Link
							onClick={() => {
								logout();
								window.location = '/';
							}}
							className={styles.low_header_nav_link}
						>
							Выйти
						</Link>
					) : (
						<Link
							onClick={() => {
								setIsLoginActive(true);
							}}
							className={styles.low_header_nav_link}
						>
							Вход
						</Link>
					)}
				</div>
			</div>
			<RegisterForm
				setIsRegisterActive={setIsRegisterActive}
				isRegisterActive={isRegisterActive}
			/>
			<LoginForm setIsLoginActive={setIsLoginActive} isLoginActive={isLoginActive} />
		</>
	);
}

export default Navbar;
