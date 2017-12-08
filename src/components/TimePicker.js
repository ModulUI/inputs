import React from 'react'
import moment from 'moment';
import RcTimePicker from './TimePicker/index';

//дополнить при необходимости
class TimePicker extends React.Component {
	static defaultProps = {
		format: "HH:mm:00"
	};

	constructor(props) {
		super(props);
		this.state = {
			value: moment(),
		};
	}

	setFocus() {
		this.input && this.input.focus();
	}

	handleValueChange = (val) => {
		if (val && val.format) {
			this.props.onChange(val.format(this.props.format));
		} else {
			this.props.onChange(null);
		}
	}

	onBlur = () => {
		this.props.onBlur();
	};

	onClosePopup = () => {
		this.props.onBlur(this.props.value);
	};

	render() {
		const {className, format, onFocus, onBlur, name, ...props}=this.props;
		const classNames = [className || ''].join(' ');
		return (
			<RcTimePicker
				onFocus={onFocus}
				name={name}
				className={classNames}
				onChange={this.handleValueChange}
				value={this.props.value ? moment(this.props.value, format) : null}
				showSecond={false}
				inputProps={{'data-for': props['data-for'], 'data-tip': props['data-tip'],  ref: input => this.input = input, className: classNames}}
				onClose={this.onClosePopup}
			/>
		);
	}
}

TimePicker.propTypes = {
};


export default TimePicker;