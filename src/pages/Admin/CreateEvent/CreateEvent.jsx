import React from 'react';
import Form from '../../../components/FormInput/Form';
import FormInput from '../../../components/FormInput/FormInput';
import styles from './create.event.module.css';
import { schema } from './create.event.schema';
import { createData, createFormData, updateData } from '../../../services/admin.services';
import { toastLoading, toastUpdate } from './../../../services/toasts.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { api } from './../../../config';
import QuillTextEditor from './../../../components/Editor/Quill';

function CreateEvent() {
	const location = useLocation();
	const navigate = useNavigate();

	const initialValues = location.state
		? {
				_id: location.state.data._id,
				title: location.state.data.title,
				alias: location.state.data.alias,
				createdAt: format(parseISO(location.state.data.createdAt), 'yyyy-MM-dd'),
				article: location.state.data.article,
				category: location.state.data.category,
				images: location.state.data.images,
		  }
		: {
				title: '',
				alias: '',
				createdAt: '',
				article: '',
				category: '',
				images: '',
		  };

	const initialErrors = {
		_id: '',
		title: '',
		alias: '',
		createdAt: '',
		article: '',
		category: '',
		images: '',
	};

	async function doUpdate(data) {
		const id = toastLoading();
		try {
			const formData = await createFormData(data);
			await updateData(api.updateEventEndpoint, formData);

			toastUpdate(id, 'Событие успешно обновлено', 'success');

			navigate('/events', { replace: true });
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				toastUpdate(id, 'Обновление события не удалось', 'error');
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	async function doSubmit(data, resetForm) {
		const id = toastLoading();
		try {
			const formData = await createFormData(data);
			await createData(api.createEventEndpoint, formData);

			toastUpdate(id, 'Событие успешно создано', 'success');

			resetForm();
		} catch (ex) {
			if (ex.response && ex.response.status === 422) {
				toastUpdate(id, 'Данные неверно заполнены', 'error');
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<div className={styles.container}>
			<h2>Создать событие</h2>
			<Form
				initialValues={initialValues}
				initialErrors={initialErrors}
				renderCloseBtn={false}
				schema={schema}
				doSubmit={doSubmit}
				isClear={true}
				doUpdate={doUpdate}
				isUpdate={location.state && location.state.isUpdate}
				buttonName='Создать'
			>
				{location.state && location.state.isUpdate && (
					<FormInput label='Id' name='_id' id='event_id' isDisabled={true} />
				)}
				<FormInput
					label='Название'
					name='title'
					id='eventTitle'
					placeholder='Введите название'
				/>
				<FormInput label='Alias' name='alias' id='eventAlias' placeholder='Введите alias' />
				<FormInput label='Дата создания' type='date' name='createdAt' id='eventCreatedAt' />
				<FormInput
					label='Категория'
					name='category'
					id='eventCategory'
					placeholder='Введите категорию'
				/>
				<QuillTextEditor label='Описание' name='article' />
				<FormInput
					label='Изображения'
					type='file'
					name='images'
					id='eventImages'
					accept='image/*'
					isNoValue={true}
					isMultiple={false}
				/>
			</Form>
		</div>
	);
}

export default CreateEvent;
