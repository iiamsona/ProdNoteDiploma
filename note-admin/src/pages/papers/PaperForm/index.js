import React, { useState } from 'react';

import './styles.scss';
import { Input } from 'ui/Input';
import { Button } from 'ui/Button';
import { REQUIRED_ERROR_MESSAGE } from 'constants/messages';

const initialValues = {
	type: '',
	price: '',
	width: '',
};

export const PaperForm = ({
	onClose,
	editableData,
	handleSubmit,
}) => {
	const formType = editableData ? 'Փոփոխել' : 'Ավելացնել';
	const [formData, setFormData] = useState(
		editableData || initialValues
	);
	const [errors, setErrors] = useState({});

	const validateField = value => {
		if (!value) return REQUIRED_ERROR_MESSAGE;
	};

	const handleFieldChange = (value, fieldName) => {
		const errorMessage = validateField(value);

		setFormData({ ...formData, [fieldName]: value });

		if (errorMessage !== errors[fieldName])
			setErrors({
				...errors,
				[fieldName]: errorMessage,
			});
	};

	const onSubmit = () => {
		const newErrors = {};

		for (const key in initialValues) {
			const errorMessage = validateField(formData[key]);

			if (errorMessage) newErrors[key] = errorMessage;
		}

		setErrors(newErrors);
		if (!Object.keys(newErrors).length)
			handleSubmit(formData);
	};

	return (
		<div className='modal-form-wrapper' onClick={onClose}>
			<div
				className='form-container'
				onClick={e => e.stopPropagation()}
			>
				<div className='form-header'>{formType} Թուղթ</div>
				<Input
					placeholder='Տիպ'
					value={formData.type}
					errorMessage={errors.type}
					name='type'
					onChange={handleFieldChange}
				/>
				<Input
					placeholder='Գին'
					errorMessage={errors.price}
					value={formData.price}
					name='price'
					onChange={handleFieldChange}
				/>
				<Input
					placeholder='Երկարություն'
					value={formData.width}
					errorMessage={errors.width}
					name='width'
					onChange={handleFieldChange}
				/>
				<div className='actions-container'>
					<Button onClick={onClose} className='outline'>
						Փակել
					</Button>
					<Button onClick={onSubmit}>{formType}</Button>
				</div>
			</div>
		</div>
	);
};

/*
size - milimeters

bloknoti layn, erk
layn - 12
erk - 25


tuxt - {
	erkarutyun - 1500
	laynutyun - 1000 (1) fixed
	gin - 240
}
price for one tuxt - (240 / (1500 / 12) * 1000 / 25 ) + ((nshvac guyneri gin(hardcode back model) * 12 * 25) / 1000^2)
1 bloknot = ((price for one tuxt  * ejeri qanak)  + kazmi modeli gin) * 1.20
sum = 1 bloknot
	txti gin * 


	apply this logic to all templates
*/
