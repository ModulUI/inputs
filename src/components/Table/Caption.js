import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Caption = props => <caption className={classnames(props.className)}>
	{props.children}
</caption>

Caption.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
}

export default Caption;