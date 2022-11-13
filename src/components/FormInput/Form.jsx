import React from 'react';
import styles from './form.module.css';
import { useState, useRef } from 'react';

function Form(props) {
	const {
		children,
		initialValues,
		initialErrors,
		schema,
		setIsActive,
		doSubmit,
		renderCloseBtn = true,
		isClear = false,
		isUpdate,
		doUpdate,
		buttonName,
	} = props;

	const inputRef = useRef(null);
	const [data, setData] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);

	function closeAndClear() {
		const prevData = { ...initialValues };
		setIsActive(false);
		setData(prevData);
	}

	function clearData() {
		const prevData = { ...initialValues };
		inputRef.current.value = null;
		setData(prevData);
	}

	function validate() {
		const options = { abortEarly: false };
		const { error } = schema.validate(data, options);
		if (!error) return null;
		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	}

	function validateProperty(name, value) {
		const { error } = schema.extract(name).validate(value);
		return error ? error.details[0].message : null;
	}

	function handleUpdate(e) {
		e.preventDefault();

		const errors = validate();
		if (errors) return;

		doUpdate(data);
	}

	function handleSubbmit(e) {
		e.preventDefault();

		const errors = validate();
		if (errors) return;

		if (isClear) {
			return doSubmit(data, clearData);
		}

		doSubmit(data, closeAndClear);
	}

	function handleChange(e) {
		const { name, value, files } = e.target ? e.target : e;

		const errorMessage = validateProperty(name, value);

		if (errorMessage)
			setErrors((prevState) => ({
				...prevState,
				[name]: errorMessage,
			}));
		else
			setErrors((prevState) => ({
				...prevState,
				[name]: '',
			}));

		if (files) {
			return setData((prevState) => ({
				...prevState,
				[name]: value,
				images: files,
			}));
		}

		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	return (
		<form className={styles.form}>
			<FormContext.Provider
				value={{
					data,
					errors,
					handleChange,
					inputRef,
				}}
			>
				{children}
			</FormContext.Provider>
			{isUpdate ? (
				<button
					className={validate() ? styles.subbmit_button_disabled : styles.subbmit_button}
					onClick={(e) => handleUpdate(e)}
					disabled={validate()}
				>
					Обновить
				</button>
			) : (
				<button
					className={validate() ? styles.subbmit_button_disabled : styles.subbmit_button}
					onClick={(e) => handleSubbmit(e)}
					disabled={validate()}
				>
					{buttonName}
				</button>
			)}
			{renderCloseBtn && (
				<button
					className={styles.close_button}
					onClick={(e) => {
						e.preventDefault();
						setIsActive(false);
						setData(initialValues);
						setErrors(initialErrors);
					}}
				>
					X
				</button>
			)}
		</form>
	);
}

export const FormContext = React.createContext({
	data: {},
	inputRef: null,
	errors: {},
	handleChange: () => {},
});

export default Form;
