import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SearchInput = props => <input
	type="search"
	value={props.value}
	className={classnames(props.className)}
	placeholder={props.placeholder}
	onChange={props.onChange}
/>

SearchInput.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func
}

export default SearchInput;