import React, { useContext, useEffect } from 'react';
import {
	Routes as CoreRoutes,
	Route,
} from 'react-router-dom';

import { AuthPage } from '../pages/auth';
import { AuthContext } from 'store/auth';
import {
	Navigate,
	useNavigate,
} from 'react-router-dom/dist';
import { PapersPage } from 'pages/papers';
import { CoversPage } from 'pages/covers';
import { TemplatesPage } from 'pages/templates';
import { OrdersPage } from 'pages/orders';

export const Routes = () => {
	const [token] = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token && !localStorage.getItem('token'))
			navigate('/auth');
	}, [token, navigate]);

	return (
		<CoreRoutes>
			{!token && (
				<Route path='/auth' element={<AuthPage />} />
			)}

			<Route
				index
				path='/papers'
				element={<PapersPage />}
			/>
			<Route
				index
				path='/templates'
				element={<TemplatesPage />}
			/>
			<Route
				index
				path='/covers'
				element={<CoversPage />}
			/>
			<Route
				index
				path='/orders'
				element={<OrdersPage />}
			/>
			<Route path='*' element={<Navigate to='/covers' />} />
		</CoreRoutes>
	);
};
