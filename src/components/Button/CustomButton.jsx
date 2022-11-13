import React from 'react';

function CustomButton(props) {
	const { style, name, disabled, handleClick } = props;

	return (
		<button
			className={style}
			onClick={(e) => {
				e.preventDefault();
				handleClick();
			}}
			disabled={disabled}
		>
			{name}
		</button>
	);
}

export default CustomButton;
