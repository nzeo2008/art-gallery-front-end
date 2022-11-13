import FormInput from './../../../components/FormInput/FormInput';
import Form from './../../../components/FormInput/Form';
import styles from './create.artist.module.css';
import { schema } from './create.artist.schema';
import { createData, createFormData, updateData } from '../../../services/admin.services';
import { toastLoading, toastUpdate } from './../../../services/toasts.service';
import { api } from './../../../config';
import QuillTextEditor from '../../../components/Editor/Quill';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateArtist() {
	const location = useLocation();
	const navigate = useNavigate();

	const initialValues = location.state
		? {
				_id: location.state.data._id,
				name: location.state.data.name,
				surname: location.state.data.surname,
				nickname: location.state.data.nickname,
				tags: location.state.data.tags.toString(),
				bio: location.state.data.bio,
				category: location.state.data.category,
				images: location.state.data.images,
		  }
		: {
				name: '',
				surname: '',
				nickname: '',
				tags: '',
				bio: '',
				category: '',
				images: '',
		  };

	const initialErrors = {
		_id: '',
		name: '',
		surname: '',
		nickname: '',
		tags: '',
		bio: '',
		category: '',
		images: '',
	};

	async function doUpdate(data) {
		const id = toastLoading();
		try {
			const formData = await createFormData(data);
			await updateData(api.updateArtistEndpoint, formData);

			toastUpdate(id, 'Событие успешно обновлено', 'success');

			navigate('/artists', { replace: true });
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
			await createData(api.createArtistEndpoint, formData);
			toastUpdate(id, 'Деятель искусства успешно создан', 'success');
			resetForm();
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				toastUpdate(id, 'Неверно заполнены данные', 'error');
				console.log(ex.response);
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<div className={styles.container}>
			<h2>Создать деятеля искусства</h2>
			<Form
				initialValues={initialValues}
				initialErrors={initialErrors}
				renderCloseBtn={false}
				schema={schema}
				buttonName='Создать'
				isClear={true}
				doSubmit={doSubmit}
				doUpdate={doUpdate}
				isUpdate={location.state && location.state.isUpdate}
			>
				{location.state && location.state.isUpdate && (
					<FormInput label='Id' name='_id' id='event_id' isDisabled={true} />
				)}
				<FormInput label='Имя' name='name' id='artistName' placeholder='Введите имя' />
				<FormInput
					label='Фамилия'
					name='surname'
					id='artistSurname'
					placeholder='Введите фамилию'
				/>
				<FormInput
					label='Никнейм'
					name='nickname'
					id='artistNickname'
					placeholder='Введите никнейм'
				/>
				<FormInput
					label='Категория'
					name='category'
					id='artistCategory'
					placeholder='Введите категорию'
				/>

				<FormInput
					label='Теги'
					name='tags'
					id='artistTags'
					placeholder='Введите теги, используя запятую'
				/>
				<QuillTextEditor label='Биография' name='bio' />
				<FormInput
					label='Изображения'
					type='file'
					name='images'
					id='artworks'
					accept='image/*'
					isNoValue={true}
				/>
			</Form>
		</div>
	);
}

export default CreateArtist;
