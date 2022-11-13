import React from 'react';
import styles from './form.input.module.css';
import { useContext } from 'react';
import { FormContext } from './Form';

function FormInput(props) {
	const {
		label,
		type = 'text',
		name,
		id,
		placeholder,
		accept,
		isNoValue = false,
		isMultiple = true,
		isDisabled = false,
	} = props;

	const formContext = useContext(FormContext);
	const { data, handleChange, errors, inputRef } = formContext;

	return (
		<>
			<div className={styles.form_element}>
				<label>{label}</label>
				{isNoValue ? (
					<input
						ref={inputRef}
						type={type}
						name={name}
						id={id}
						placeholder={placeholder}
						onChange={handleChange}
						accept={accept}
						multiple={isMultiple}
					/>
				) : (
					<input
						type={type}
						name={name}
						id={id}
						value={data[name]}
						placeholder={placeholder}
						onChange={handleChange}
						accept={accept}
						multiple
						disabled={isDisabled}
					/>
				)}
				<div className={styles.error_message}>
					<h4>{errors[name]}</h4>
				</div>
			</div>
		</>
	);
}

export default FormInput;
