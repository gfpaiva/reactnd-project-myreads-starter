import React from 'react';
import PropTypes from 'prop-types';

const Order = ( { orderHandler, controlOrder } ) => {
	return (
		<div>
			<select value={controlOrder || 'select'} onChange={(e) => orderHandler(e)}>
				<option value="select" disabled>Order By</option>
				<option value="pageCount,asc">Page Count ascending</option>
				<option value="pageCount,desc">Page Count descending</option>
			</select>

		</div>
	);

};

Order.propTypes = {
	orderHandler: PropTypes.func.isRequired,
	controlOrder: PropTypes.string
}

export default Order;
