import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';


export default class AutosuggestInput extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        loading: PropTypes.bool,
        value: PropTypes.string,
        className: PropTypes.string,
        getOptionsValue: PropTypes.func,
        onFetchRequested: PropTypes.func,
        onClearRequested: PropTypes.func,
        onSelected: PropTypes.func,
        onClearValue: PropTypes.func,
        renderOptions: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func
    };
    static defaultProps = {
        value: ''
    };

    constructor(props) {
        super(props);

        this.state = {value: props.value};
    }

    /**
     * Устанавливает внешний вид результатов поиска
     * @param suggestion
     * @returns {*}
     */
    getSuggestionValue(suggestion) {
        return this.props.getOptionsValue && this.props.getOptionsValue(suggestion) || suggestion.value;
    }

    /**
     * Вызывается когда нужно обновить список результатов поиска
     *    - только если поле ввода было изменено
     * @param value
     */
    onSuggestionsFetchRequested({value}) {
        if (this.state.value !== value)
            this.props.onFetchRequested && this.props.onFetchRequested(value);
    }

    /**
     * Вызовется когда нужно очистить список подсказок
     */
    onSuggestionsClearRequested() {
        this.props.onClearRequested && this.props.onClearRequested();
    }

    /**
     * Вызовется когда был выбран один из вариантов подсказки
     * @param e
     * @param suggestion
     * @param suggestionValue
     * @param method
     */
    onSuggestionSelected(e, {suggestion, suggestionValue, method}) {
        this.props.onSelected && this.props.onSelected({
            options: suggestion,
            value: suggestionValue,
            method
        })
    }

    /**
     * Вызывется при нажатии на крестик для очистки поля
     *    - вернуть boolean
     *    - по умолчанию поле очищается
     */
    onClearValue() {
        if (this.props.onClearValue)
            this.props.onClearValue() && this.setState({value: ''});
        else
            this.setState({value: ''});
    }

    /**
     * Используется для изменения вида отображения подсказок
     * @param suggestion
     * @param query
     * @returns {*}
     */
    renderSuggestion(suggestion, {query}) {
        return this.props.renderOptions && this.props.renderOptions(suggestion, query) || <span>{suggestion.value}</span>;
    }

    /**
     * При вводе в поле поиска
     * @param e
     * @param newValue
     */
    onChangeInput(e, {newValue}) {
        this.setState({value: newValue});
        this.props.onChange && this.props.onChange(newValue);
    }

    /**
     * При потере фокуса
     * @param e
     */
    onBlurInput(e) {
        this.props.onBlur && this.props.onBlur(e);
    }

    /**
     * При получении фокуса
     * @param e
     */
    onFocusInput(e) {
        this.props.onFocus && this.props.onFocus(e);
        e.preventDefault();
    }

    /**
     * Поле ввода
     * @param input
     * @returns {*}
     */
    renderInputComponent(input) {
        return (
            <div className='react-autosuggest__input-box'>
                <input
                    {...input}
                />
                {this.props.loading &&
                <div
                    className='loading_block'
                />}
                {!!this.state.value &&
                <a
                    className='input_clear icon-close'
                    onClick={::this.onClearValue}
                />}
            </div>
        );
    }

    render() {
        const {
            options,
            ...props
        } = this.props;

        const inputProps = {
            ...props,
            value: this.state.value,
            onChange: ::this.onChangeInput,
            onBlur: ::this.onBlurInput,
            onFocus: ::this.onFocusInput
        };

        return (
            <Autosuggest
                ref={el => this.input = el && el.input}

                // Required
                inputProps={inputProps}
                suggestions={options}
                renderSuggestion={::this.renderSuggestion}
                getSuggestionValue={::this.getSuggestionValue}
                onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={::this.onSuggestionsClearRequested}

                // Options
                onSuggestionSelected={::this.onSuggestionSelected}
                renderInputComponent={::this.renderInputComponent}
            />
        )
    }

}