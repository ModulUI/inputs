import React from 'react'
import PropTypes from 'prop-types'
import {dateHelper} from 'modul-helpers'
import Drop from './Drop'
import DatePicker from './DatePicker'

const PERIOD = {
    TODAY: 'TODAY',
    YESTERDAY: 'YESTERDAY'
};
const PERIOD_LABEL = {
    TODAY: 'Сегодня',
    YESTERDAY: 'Вчера'
};
const PERIOD_DEFAULT = [
    PERIOD.TODAY,
    PERIOD.YESTERDAY
];

function getDateByPeriod(period) {
    const dates = {
        [PERIOD.YESTERDAY]: dateHelper.getYesterday(),
        [PERIOD.TODAY]: new Date()
    };
    return dates[period];
}


class DatePickerDrop extends React.Component {
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        ignoreDropCloseAttr: '',
        className: 'light small',
        periods: null
    };
    static PERIODS = PERIOD;
    initDropInstance(drop) {
        const {setDropInstance} = this.props;
        if (setDropInstance) setDropInstance(drop);
    }

    handleSelectPeriod(period) {
        const date = getDateByPeriod(period);
        this.props.onChange(date);
        this.props.onBlur(date);
    }

    handleChangeDate(date) {
        this.props.onChange(date);
    }

    handleSelectDate() {
        const date = this.drop.getValue();
        this.props.onChange(date);
        this.props.onBlur(date);
    }

    render() {
        const {
            ignoreDropCloseAttr, date, className, placeholder,
            periods = PERIOD_DEFAULT,
            position = "bottom left",
        } = this.props;

        const dateStr = date ? dateHelper.dateFormat(date, 'd mmmm:R') : '';
        const list = periods;

        let title = placeholder || 'Выберите дату';
        if (!placeholder && date) title = `за ${dateStr}`;

        return (<Drop drop={{position: position}}
					  setInstance={::this.initDropInstance}>
			<a className={'drop-target icon-date button ' + className}>{title}</a>
			<div className="drop-content-another" data-ignore={ignoreDropCloseAttr}>
				<div className="drop-content-inner dashboard-period-choose">

					<ul className="drop-menu">
                        {list.map((item, i) => <li key={i}><a data-close="true" onClick={() => this.handleSelectPeriod(PERIOD[item])}>{PERIOD_LABEL[item]}</a></li>)}
					</ul>
					<div className="drop-date-choose">
						<div className="filter_date_value">
							<DatePicker ref={d => this.drop = d}
										value={date}
										onChange={::this.handleChangeDate}
										className="filter_date_input date_from"/>
							<button data-close="true"
									className="button small"
									onClick={::this.handleSelectDate}>Ок
							</button>
						</div>
					</div>
				</div>
			</div>
		</Drop>);
    }
}

DatePickerRange.propTypes = {
    setDropInstance: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    ignoreDropCloseAttr: PropTypes.string,
    date: PropTypes.any,
    position: PropTypes.string,
    periods: PropTypes.array,
    placeholder: PropTypes.string
};

export default DatePickerDrop;
