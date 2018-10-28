import React from 'react';
import MaskedInput from 'react-text-mask';


export default class MaskedInputControl extends React.Component {
	render() {
		return (
			<MaskedInput
				ref={(input) => {
                    this.input = input;
                }}
				{...this.props}
			/>	
		);
	}
	focus() {
        if (this.input) {
            if (this.input.hasOwnProperty('inputElement')) {
                this.input.inputElement.focus();
            }
        }
	}
}