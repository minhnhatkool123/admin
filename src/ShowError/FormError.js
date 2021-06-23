import React from 'react';

export default function FormError({ errorMessage, id }) {
	return (
		<div className='error__title' id={id}>
			<small>{errorMessage}</small>
		</div>
	);
}
