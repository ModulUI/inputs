import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Thead = props => <thead className={classnames(props.className)}>
	{props.children}
</thead>

Thead.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
}

export default Thead;