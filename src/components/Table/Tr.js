import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tr = props => <tr
	className={classnames(props.className)}
	onClick={props.onClick}
	id={props.id}
>
	{props.children}
</tr>

Tr.propTypes = {
	id: PropTypes.string,
	children: PropTypes.any,
	className: PropTypes.string,
	onClick: PropTypes.func
}

export default Tr;