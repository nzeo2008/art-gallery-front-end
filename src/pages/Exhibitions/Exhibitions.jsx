import React, { useState, useEffect, useCallback } from 'react';
import bannerLogo from '../../images/Exhibitions-Banner.jpg';
import Banner from '../../components/Banner/Banner';
import LostContent from './../LostContent/LostContent';
import _ from 'lodash';
import styles from './exhibitions.module.css';
import { api } from './../../config';
import { format, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { scrollOnTop } from './../../services/common.service';
import CustomButton from './../../components/Button/CustomButton';
import { toastLoading, toastUpdate } from './../../services/toasts.service';
import { deleteData } from '../../services/admin.services';
import ExhibitionCard from './ExhibitionsSections/ExhibitionCard';

function Exhibitions({ exhibitions, user, setExhibitions }) {
	const [mainExhibitions, setMainExhibitions] = useState([]);
	const [slicedState, setSlicedState] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(6);

	const navigate = useNavigate();

	const pageLimit = 6;

	async function nextPage() {
		setStartIndex(endIndex);
		setEndIndex(endIndex + pageLimit);
		setSlicedState(_.slice(exhibitions, startIndex, endIndex));
		scrollOnTop();
	}

	function handleUpdate(_id) {
		const [exhibition] = exhibitions.filter((exhibition) => {
			return exhibition._id === _id;
		});
		const data = { data: exhibition, isUpdate: true, from: 'exhibition' };
		navigate('/admin', { state: data });
	}

	async function handleDelete(_id) {
		const toastId = toastLoading();
		const updatedExhibitions = exhibitions.filter((exhibition) => exhibition._id !== _id);

		try {
			setExhibitions(updatedExhibitions);
			await deleteData(api.deleteExhibitionEndpoint, { _id });

			toastUpdate(toastId, 'Успешно удалено', 'success');
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				setExhibitions(exhibitions);
				toastUpdate(toastId, 'Деятеля искусства не удалось удалить', 'error');
			} else {
				setExhibitions(exhibitions);
				toastUpdate(toastId, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	const goBack = useCallback(() => {
		setStartIndex(0);
		setEndIndex(pageLimit);
		setSlicedState(_.slice(exhibitions, startIndex, endIndex));
		scrollOnTop();
	}, [startIndex, endIndex, exhibitions]);

	useEffect(() => {
		setMainExhibitions(_.slice(exhibitions, 0, 3));
		setSlicedState(_.slice(exhibitions, startIndex, endIndex));
		scrollOnTop();
	}, [exhibitions, goBack, startIndex, endIndex]);

	return (
		<>
			<Banner imagePath={bannerLogo} from='Выставки' altName='Location-Banner.jpg' />
			{exhibitions.length !== 0 ? (
				<main className={styles.container}>
					<section className={styles.main_section}>
						<div className={styles.main_exhibitions_container}>
							<h6>Наши</h6>
							<h1>Будущие выставки</h1>
							<div className={styles.main_content}>
								{mainExhibitions.map((mainExhibition) => {
									return (
										<div
											key={mainExhibition.alias}
											className={styles.main_image_container}
										>
											<img
												src={api.baseUrl + mainExhibition.images[0]}
												alt={mainExhibition.alias}
											/>
											<Link
												to={mainExhibition.alias}
												state={mainExhibition}
												className={styles.link}
											/>
											<div className={styles.main_info}>
												<span>
													{format(
														parseISO(mainExhibition.startDate),
														'dd/MM/yyyy'
													) +
														' - ' +
														format(
															parseISO(mainExhibition.endDate),
															'dd/MM/yyyy'
														)}
												</span>
												<h2>{mainExhibition.title}</h2>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>
					{slicedState.length !== 0 && (
						<section className={styles.all_exhibitions_container}>
							<div className={styles.exhibitions_container}>
								{slicedState.map((exhibition) => {
									return (
										<ExhibitionCard
											key={exhibition.alias}
											exhibition={exhibition}
											user={user}
											handleDelete={handleDelete}
											handleUpdate={handleUpdate}
										/>
									);
								})}
							</div>
							{exhibitions.length >= endIndex && (
								<CustomButton
									handleClick={nextPage}
									style={styles.button}
									name='Дальше'
								/>
							)}
							{exhibitions.length < endIndex && startIndex !== 0 && (
								<CustomButton
									handleClick={goBack}
									style={styles.button}
									name='Вернуться назад'
								/>
							)}
						</section>
					)}
				</main>
			) : (
				<LostContent />
			)}
		</>
	);
}

export default Exhibitions;
