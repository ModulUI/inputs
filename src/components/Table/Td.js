import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Td = props => <td className={classnames(props.className)} colSpan={props.colSpan}>
	{props.children}
</td>

Td.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	colSpan: PropTypes.string
}

export default Td;