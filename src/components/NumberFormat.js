import React from 'react'
import PropTypes from 'prop-types'
import {validateHelper, numberHelper} from 'modul-helpers'
import accounting from 'accounting';

accounting.settings = {
	number: {
		decimal: ","
	}
};

const NumberFormat = ({value, className = '', def = ''}) => {
	if (validateHelper.isEmpty(value))
		return def ? (<span className={className}>{def}</span>) : null;
	const precision = getPrecision(value);
	const formatted = accounting.formatNumber(value, precision, " ");
	return (<span className={className}>{formatted}</span>);
};

function getPrecision(value) {
	const valueStr = clean(value);
	const pos = valueStr.indexOf(',');
	return pos > -1 ? valueStr.length - pos - 1 : 0;
}

function clean(val) {
	let value = val;
	if (!value.replace)
		value = value.toString();
	return numberHelper.cleanValue(value);
}

NumberFormat.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	def: PropTypes.string,
	className: PropTypes.string
};

export  default NumberFormat;