import React from 'react';
import styles from './login.form.module.css';
import Form from './../../components/FormInput/Form';
import FormInput from './../../components/FormInput/FormInput';
import { login } from '../../services/login.service';
import { schema } from './login.schema';
import { toastLoading, toastUpdate } from './../../services/toasts.service';

function LoginForm(props) {
	const { isLoginActive, setIsLoginActive } = props;

	const initialValues = {
		email: '',
		password: '',
	};

	const initialErrors = {
		email: '',
		password: '',
	};

	async function doSubmit(data, closeAndClear) {
		const id = toastLoading();

		try {
			const { email, password } = data;

			await login(email, password);

			setTimeout(() => {
				window.location = window.location.href;
			}, 1000);

			toastUpdate(id, 'Авторизация прошла успешно', 'success');
			closeAndClear();
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				toastUpdate(id, 'Ошибка авторизации', 'error');
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<div className={isLoginActive ? styles.shadow_box : styles.hidden}>
			<div className={isLoginActive ? styles.container : styles.hidden}>
				<h1>Войти</h1>
				<Form
					initialValues={initialValues}
					initialErrors={initialErrors}
					schema={schema}
					buttonName='Войти'
					setIsActive={setIsLoginActive}
					doSubmit={doSubmit}
				>
					<FormInput
						label='Email'
						type='email'
						name='email'
						id='login_email'
						placeholder='Введите email'
					/>
					<FormInput
						label='Пароль'
						type='password'
						name='password'
						id='login_password'
						placeholder='Введите пароль'
					/>
				</Form>
				<div className={styles.black_box}></div>
			</div>
		</div>
	);
}

export default LoginForm;
