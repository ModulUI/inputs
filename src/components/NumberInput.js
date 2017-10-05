import React from 'react';
import PropTypes from 'prop-types'
import {numberHelper} from 'modul-helpers'
const {parseNumber, cleanValue, noZero, trimValidLength} = numberHelper;

class NumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewValue: ''
        };
    }

    static defaultProps = {
        onChange: (value, event) => {
        }, /*no-op*/
        type: 'tel',
        float: false,
        precision: null
    };

    setFocus() {
        this.el && this.el.focus();
    }

    componentDidMount() {
        this.setState({viewValue: this.parseValue(this.props.value)});
    }

    componentWillReceiveProps(props) {
        if (props && !this.isEqualValues(this.state.viewValue, props.value)) {
            this.setState({viewValue: this.parseValue(props.value)});
        }
    }

    isEqualValues(oldValue, newValue) {
        const parseOld = parseNumber(oldValue);
        const parseNew = parseNumber(newValue);
        return parseNew == parseOld ||
            (parseOld && noZero(parseOld) && parseNew == 0);
    }

    // parseValue(val) {
    //     if (val === undefined || val === null)
    //         val = '';
    //
    //     if (!val.replace)
    //         val = val.toString();
    //     return cleanValue(val, this.props.float);
    // }
    parseValue(val) {
        if (val === undefined || val === null)
            val = '';

        if (!val.replace)
            val = val.toString();

        val = cleanValue(val, this.props.float);

        return this.props.float && this.props.precision
            ? trimValidLength(val, ',', this.props.precision) : val;
    }

    handleChange(event) {
        let val = event.target.value;
        const viewValue = this.parseValue(val);
        this.setState({viewValue}, () => {
            this.props.onChange(viewValue, event);
        });
    }

    render() {
        let props = {...this.props};
        delete props.onChange;
        delete props.value;
        delete props.float;
        delete props.precision;

        return (
            <input
                {...props}
                ref={input => this.el = input}
                value={this.state.viewValue}
                onChange={::this.handleChange}/>
        )
    }
}

NumberInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    float: PropTypes.bool, //с запятой или без
    precision: PropTypes.number
};

export default NumberInput;