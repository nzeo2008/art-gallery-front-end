import Form from './../../../components/FormInput/Form';
import FormInput from './../../../components/FormInput/FormInput';
import { schema } from './create.exhibition.schema';
import styles from './create.exhibition.module.css';
import React, { useState, useEffect } from 'react';
import { toastLoading, toastUpdate } from './../../../services/toasts.service';
import { createData, createFormData, getData, updateData } from '../../../services/admin.services';
import SearchBox from '../../../components/SearchBox/SearchBox';
import CustomButton from '../../../components/Button/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { api } from './../../../config';
import QuillTextEditor from '../../../components/Editor/Quill';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { numWords } from '../../../services/common.service';

function CreateExhibition() {
	const [isOpen, setIsOpen] = useState(false);
	const [confirmData, setConfirmData] = useState([]);
	const [selectedArtists, setSelectedArtists] = useState([]);
	const [state, setState] = useState([]);
	const [artists, setArtists] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

	const initialValues = location.state
		? {
				_id: location.state.data._id,
				title: location.state.data.title,
				alias: location.state.data.alias,
				city: location.state.data.city,
				description: location.state.data.description,
				tags: location.state.data.tags.toString(),
				startDate: format(parseISO(location.state.data.startDate), 'yyyy-MM-dd'),
				endDate: format(parseISO(location.state.data.endDate), 'yyyy-MM-dd'),
				category: location.state.data.category,
				images: location.state.data.images,
		  }
		: {
				title: '',
				alias: '',
				city: '',
				description: '',
				tags: '',
				startDate: '',
				endDate: '',
				category: '',
				images: '',
		  };

	const initialErrors = {
		_id: '',
		title: '',
		alias: '',
		city: '',
		description: '',
		tags: '',
		startDate: '',
		endDate: '',
		category: '',
		images: '',
	};

	useEffect(() => {
		if (location.state) {
			setConfirmData([...location.state.data.artists]);
		}
		fetchData();
	}, [location.state]);

	async function fetchData() {
		const res = await getData(api.searchArtistEndpoint, { name: '' });
		const { data } = res;
		setState(data);
	}

	function clearAndFetchData() {
		setArtists([]);
		setSelectedArtists([]);
		setState([]);
		setConfirmData([]);
		fetchData();
	}

	function handleCloseAndClear() {
		clearAndFetchData();
		setIsOpen(!isOpen);
	}

	function handleClose() {
		setIsOpen(!isOpen);
	}

	function updateDataForSearchbox() {
		if (location.state) {
			const result = state.filter((n) => {
				return !location.state.data.artists.some((n2) => n._id === n2._id);
			});
			setState(result);
		}
		setSelectedArtists(confirmData);
	}

	async function doUpdate(data) {
		const id = toastLoading();
		try {
			const newData = { ...data, artists: confirmData };
			const formData = await createFormData(newData);

			await updateData(api.updateExhibitionEndpoint, formData);

			toastUpdate(id, 'Выставка успешно обновлена', 'success');

			navigate('/exhibitions', { replace: true });
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				toastUpdate(id, 'Обновление выставки не удалось', 'error');
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	async function doSubmit(data, resetForm) {
		const id = toastLoading();
		try {
			const newData = { ...data, artists: confirmData };

			const formData = await createFormData(newData);
			await createData(api.createExhibitionEndpoint, formData);

			toastUpdate(id, 'Выставка успешно создана', 'success');
			resetForm();
			clearAndFetchData();
		} catch (ex) {
			if (ex.response && ex.response.status === 422) {
				toastUpdate(id, 'Данные неверно заполнены', 'error');
				console.log(ex.response);
			} else {
				toastUpdate(id, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<div className={styles.container}>
			<h2>Создать выставку</h2>
			<Form
				initialValues={initialValues}
				initialErrors={initialErrors}
				renderCloseBtn={false}
				schema={schema}
				buttonName='Создать'
				doSubmit={doSubmit}
				isClear={true}
				doUpdate={doUpdate}
				isUpdate={location.state && location.state.isUpdate}
			>
				{location.state && location.state.isUpdate && (
					<FormInput label='Id' name='_id' id='exhibition_id' isDisabled={true} />
				)}
				<FormInput
					label='Название'
					name='title'
					id='exhibitionTitle'
					placeholder='Введите название'
				/>
				<FormInput
					label='Alias'
					name='alias'
					id='exhibitionAlias'
					placeholder='Введите alias'
				/>
				<FormInput
					label='Город'
					name='city'
					id='exhibitionCity'
					placeholder='Введите город'
				/>
				<FormInput
					label='Категория'
					name='category'
					id='exhibitionCategory'
					placeholder='Введите категорию'
				/>
				<FormInput
					label='Дата начала'
					type='date'
					name='startDate'
					id='exhibitionStartDate'
				/>
				<FormInput
					label='Дата окончания'
					type='date'
					name='endDate'
					id='exhibitioEndnDate'
				/>
				<QuillTextEditor label='Описание' name='description' />
				<FormInput
					label='Теги'
					name='tags'
					id='exhibitionTags'
					placeholder='Введите теги, используя запятую'
				/>

				{isOpen && (
					<SearchBox
						onClose={handleClose}
						setConfirmData={setConfirmData}
						selectedArtists={selectedArtists}
						setSelectedArtists={setSelectedArtists}
						state={state}
						setState={setState}
						artists={artists}
						setArtists={setArtists}
						onCloseAndClear={handleCloseAndClear}
					/>
				)}
				<div className={styles.add_artist_container}>
					<CustomButton
						name='Добавить'
						handleClick={handleClose}
						style={
							confirmData.length
								? styles.add_artist_button_no_hover
								: styles.add_artist_button
						}
						disabled={confirmData.length}
					/>
					<div className={styles.data_length_container}>
						<div>
							{confirmData.length !== 0 ? (
								<p>
									{numWords(confirmData.length, [
										`Был выбран ${confirmData.length} деятель искусства`,
										`Были выбраны ${confirmData.length} деятеля искусства`,
										`Было выбрано ${confirmData.length} деятелей искусства`,
									])}
								</p>
							) : (
								<p>Не выбрано ни одного деятеля искусства</p>
							)}
						</div>
						<div className={styles.icon}>
							<FontAwesomeIcon
								icon={faEllipsis}
								onClick={() => {
									handleClose();
									updateDataForSearchbox();
								}}
							/>
						</div>
					</div>
				</div>
				<FormInput
					label='Изображения'
					type='file'
					name='images'
					id='eventImages'
					accept='image/*'
					isNoValue={true}
				/>
			</Form>
		</div>
	);
}

export default CreateExhibition;
