import React, { useEffect, useRef, useState } from 'react';

import './styles.scss';
import { Layout } from 'components/layout';
import HttpService from 'services/http';
import { Button } from 'ui/Button';
import { toast } from 'react-toastify';
import { SUCCESS_MESSAGE } from 'constants/messages';
import { OrderForm } from './OrderForm';

const orderStatuses = {
	accepted: 'Հաստատված է',
	rejected: 'Մերժված է',
};

export const OrdersPage = () => {
	const [ordersList, setOrdersList] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [orderDetailIndex, setOrderDetailIndex] =
		useState();
	const editablePaperIndex = useRef(null);

	const loadPapersList = async () => {
		try {
			const res = await HttpService.get('/order');
			setOrdersList(res.orders);
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
		setOrderDetailIndex();
	};

	const acceptOrder = async orderId => {
		try {
			const res = await HttpService.post(
				`/order/${orderId}/accept`
			);

			if (res.isSuccess) {
				toast.success('Պատվերը հաստատվեց');
				setOrdersList(
					ordersList.map(order => {
						if (order.id === orderId) return order;

						return {
							...order,
							status: 'accepted',
						};
					})
				);
			}
		} catch (ex) {}
	};

	const rejectOrder = async orderId => {
		try {
			const res = await HttpService.post(
				`/order/${orderId}/reject`
			);

			if (res.isSuccess) {
				toast.success('Պատվերը մերժվեց');
				setOrdersList(
					ordersList.map(order => {
						if (order.id === orderId) return order;

						return {
							...order,
							status: 'rejected',
						};
					})
				);
			}
		} catch (ex) {}
	};

	const formatOrderDetailData = order => {
		return {
			...order,
			cover: {
				templateId: order.cover.templateId._id,
				id: order.cover.id._id,
			},
			templates: order.templates.map(template => ({
				...template,
				paperId: template.paperId._id,
				templateId: template.templateId._id,
			})),
		};
	};

	return (
		<Layout>
			{orderDetailIndex !== undefined && (
				<OrderForm
					onClose={onCloseForm}
					editableData={formatOrderDetailData(
						ordersList[orderDetailIndex]
					)}
					viewMode={true}
				/>
			)}
			<div className='page-container'>
				<div className='page-inner-wrapper'>
					<div className='papers-list'>
						{ordersList.map((order, ind) => (
							<div
								key={order._id}
								className={`paper-card ${
									order.status === 'pending'
										? 'reversed'
										: ''
								}`}
								onClick={() => {
									setOrderDetailIndex(ind);
								}}
							>
								<div
									className={`card-header ${order.status}`}
								>
									{order.status === 'pending' ? (
										<>
											<Button
												onClick={e => {
													e.stopPropagation();
													rejectOrder(order._id);
												}}
												className='outline'
											>
												Մերժել
											</Button>
											<Button
												onClick={e => {
													e.stopPropagation();
													acceptOrder(order._id);
												}}
											>
												Հաստատել
											</Button>
										</>
									) : (
										orderStatuses[order.status]
									)}
								</div>
								<div className='info-row'>
									<span>Գին</span>
									<span>{order.price}֏</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};
