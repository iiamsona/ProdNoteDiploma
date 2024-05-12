import React, { useEffect, useRef, useState } from 'react';

import './styles.scss';
import { Layout } from 'components/layout';
import HttpService from 'services/http';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import { Button } from 'ui/Button';
import { PaperForm } from './PaperForm';
import { toast } from 'react-toastify';
import { SUCCESS_MESSAGE } from 'constants/messages';
import { Switcher } from 'ui/Switcher';

export const PapersPage = () => {
	const [papersList, setPapersList] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const editablePaperIndex = useRef(null);

	const loadPapersList = async () => {
		try {
			const res = await HttpService.get('/paper');
			setPapersList(res.papers);
		} catch (ex) {}
	};

	useEffect(() => {
		loadPapersList();
	}, []);

	const handleUpdatePaperClick = ind => {
		editablePaperIndex.current = ind;
		setIsFormOpen(true);
	};

	const handleCreatePaperClick = () => setIsFormOpen(true);

	const onCloseForm = () => {
		setIsFormOpen(false);
		editablePaperIndex.current = null;
	};

	const addPaper = async data => {
		try {
			const res = await HttpService.post('/paper', data);

			if (res.isSuccess) {
				loadPapersList();
				onCloseForm();
				toast.success(SUCCESS_MESSAGE);
			}
		} catch (ex) {}
	};

	const updatePaper = async data => {
		try {
			const res = await HttpService.put(
				`/paper/${data._id}`,
				data
			);

			if (res.isSuccess) {
				setPapersList(
					papersList.map(paper => {
						if (paper._id === data._id) return data;

						return paper;
					})
				);

				onCloseForm();
				toast.success(SUCCESS_MESSAGE);
			}
		} catch (ex) {}
	};

	const togglePaperStatus = async paper => {
		try {
			const res = await HttpService.post(
				`/paper/${paper._id}/${
					paper.isDeactivated ? 'activate' : 'deactivate'
				}`
			);

			if (res.isSuccess) {
				setPapersList(
					papersList.map(item => {
						if (paper._id !== item._id) return item;

						return {
							...item,
							isDeactivated: !item.isDeactivated,
						};
					})
				);
			}
		} catch (ex) {}
	};

	return (
		<Layout>
			{isFormOpen && (
				<PaperForm
					onClose={onCloseForm}
					editableData={
						papersList[editablePaperIndex.current]
					}
					handleSubmit={
						editablePaperIndex.current !== null
							? updatePaper
							: addPaper
					}
				/>
			)}
			<div className='page-container'>
				<div className='page-header'>
					<Button onClick={handleCreatePaperClick}>
						Ավելացնել
					</Button>
				</div>
				<div className='page-inner-wrapper'>
					<div className='papers-list'>
						{papersList.map((paper, ind) => (
							<div key={paper._id} className='paper-card'>
								<div className='card-header'>
									<EditIcon
										color='#cdcf48'
										onClick={() =>
											handleUpdatePaperClick(ind)
										}
									/>
									<Switcher
										checked={!paper.isDeactivated}
										onChange={() =>
											togglePaperStatus(paper)
										}
									/>
								</div>
								<div className='info-row'>
									<span>Տիպ</span>
									<span>{paper.type}</span>
								</div>
								<div className='info-row'>
									<span>Գին</span>
									<span>{paper.price}</span>
								</div>
								<div className='info-row'>
									<span>Երկարություն</span>
									<span>{paper.width}</span>
								</div>
								<div className='info-row'>
									<span>Լայնություն</span>
									<span>{paper.height}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};
