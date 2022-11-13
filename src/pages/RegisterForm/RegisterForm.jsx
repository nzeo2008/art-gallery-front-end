import React from 'react';
import Form from '../../components/FormInput/Form';
import FormInput from '../../components/FormInput/FormInput';
import { register } from '../../services/register.service';
import styles from './register.form.module.css';
import { schema } from './register.schema';
import { toastLoading, toastUpdate } from './../../services/toasts.service';

function RegisterForm(props) {
	const { isRegisterActive, setIsRegisterActive } = props;

	async function doSubmit(data, closeAndClear) {
		const id = toastLoading();

		try {
			const { name, email, password } = data;

			await register(name, email, password);

			toastUpdate(id, 'Регистрация прошла успешно', 'success');

			closeAndClear();
		} catch (ex) {
			if (ex.response && ex.response.status === 409) {
				toastUpdate(id, 'Пользователь с таким Email уже существует', 'error');
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<div className={isRegisterActive ? styles.shadow_box : styles.hidden}>
			<div className={isRegisterActive ? styles.container : styles.hidden}>
				<h1>Регистрация</h1>

				<Form
					initialValues={{
						name: '',
						email: '',
						password: '',
					}}
					initialErrors={{
						name: '',
						email: '',
						password: '',
					}}
					schema={schema}
					buttonName='Регистрация'
					setIsActive={setIsRegisterActive}
					doSubmit={doSubmit}
				>
					<FormInput
						label='Имя'
						name='name'
						id='register_name'
						placeholder='Введите имя'
					/>
					<FormInput
						label='Email'
						type='email'
						name='email'
						id='register_email'
						placeholder='Введите email'
					/>
					<FormInput
						label='Пароль'
						type='password'
						name='password'
						id='register_password'
						placeholder='Введите пароль'
					/>
				</Form>
				<div className={styles.black_box}></div>
			</div>
		</div>
	);
}

export default RegisterForm;
