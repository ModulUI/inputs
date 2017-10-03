import React from 'react'
import {dateHelper} from 'modul-helpers'
import PropTypes from 'prop-types'
const DateFormat = ({value, format = "clever", def = '', className = ''}) => {
    let formatDate = value;
    if (value && typeof value === 'string') {
        formatDate = dateHelper.stringToDate(value);
        if (isNaN(formatDate.getTime()))
            formatDate = new Date(value);
    }

    if (formatDate && formatDate instanceof Date)
        return (<span className={className}>{dateHelper.dateFormat(formatDate, format)}</span>);
    return (<span>{def}</span>);
};

DateFormat.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    format: PropTypes.string,
    def: PropTypes.string
};

export  default DateFormat;