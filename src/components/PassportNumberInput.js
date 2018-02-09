import React from 'react';
import PropTypes from 'prop-types';

const getPlainNumber = value => {
    if (value === undefined || value === null) { return ''; }
    const tempNumber = value.replace ? value : value.toString();
    return tempNumber.replace(/[^0-9]+/g, '').substring(0, 7);
};

class PassportNumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewValue: '',
        };
    }

    setFocus() {
        this.el && this.el.focus();
    }

    componentDidMount() {
        this.setState({viewValue: this.parseValue(this.props.value)});
    }

    componentWillReceiveProps(props) {
        const newValue = this.parseValue(props.value);
        if (props && newValue !== this.state.viewValue) {
            this.setState({viewValue: newValue});
        }
    }

    calculateStartCaret(start, value) {
        const lastLength = (this.state.viewValue || '').length;
        switch (start) {
            case 4:
                const delta = lastLength > value.length ? 0 : 1;
                return start + delta;
            default:
                return start;
        }
    }

    parseValue(value) {
        const plainNumber = getPlainNumber(value);
        if (plainNumber.length === 0) { return ''; }
        let number = plainNumber;
        if (plainNumber.length > 3) { number = `${ plainNumber.substring(0, 3) } ${ plainNumber.substring(3, 6) }`; }
        return number;
    }

    handleChange(event) {
        const val = event.target.value;
        const viewValue = this.parseValue(val);
        const startPos = this.calculateStartCaret(this.el.selectionStart, viewValue);

        this.setState({viewValue}, () => {
            this.setSelectionRange(startPos);
            this.props.onChange(viewValue, event);
        });
    }

    setSelectionRange(startPos) {
        if ((startPos || startPos === 0) && this.el.selectionStart !== startPos) {
            this.el.setSelectionRange(startPos, startPos);
        }
    }

    render() {
        const props = {...this.props};
        delete props.onChange;
        delete props.value;

        return (
            <input {...props}
                maxLength={7}
                ref={input => this.el = input}
                value={this.state.viewValue}
                onChange={::this.handleChange} />
        );
    }
}

PassportNumberInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
};

export default PassportNumberInput;