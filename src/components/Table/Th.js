import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Th = props => {
	const
		fieldIsEqualSortField = props.field && props.sortField && props.field === props.sortField,
		by = (fieldIsEqualSortField ? (props.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'),

		finalClassName = classnames(
			props.className,

			{
				'icon-sort-up': fieldIsEqualSortField && props.sortDirection === 'asc',
				'icon-sort-down': fieldIsEqualSortField && props.sortDirection !== 'asc',
			}
		);

	return <th className={finalClassName}>
		<span onClick={props.onClick ? () => props.onClick(props.field, by) : undefined}>
			{props.children}
		</span>
	</th>
}

Th.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	field: PropTypes.string,
	sortField: PropTypes.string,
	sortDirection: PropTypes.string,
}

export default Th;