import React, { useContext } from 'react';
import { FormContext } from './../FormInput/Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './rich.text.editor.css';

function QuillTextEditor(props) {
	const { label, name } = props;

	const formContext = useContext(FormContext);
	const { data, handleChange, errors } = formContext;

	const toolbarOptions = [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],

		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }],
		[{ indent: '-1' }, { indent: '+1' }],

		[{ align: [] }],
	];

	return (
		<div className='my_editor'>
			<label>{label}</label>
			<ReactQuill
				theme='snow'
				modules={{ toolbar: toolbarOptions }}
				value={data[name]}
				onChange={(content, delta, source, editor) => {
					if (source === 'api') return;
					const text = { name, value: content };
					if (text.value === '<p><br></p>') text.value = '';
					handleChange(text);
				}}
			/>
			<div className='editor_error_message'>
				<h4>{errors[name]}</h4>
			</div>
		</div>
	);
}

export default QuillTextEditor;
