import React from 'react';
import PropTypes from 'prop-types';
import ModalPopup from './ModalPopup';
import q from 'q';
/**
 * Попап для подтверждения операции
 */
class ConfirmPopup extends React.Component {

	open({title, text}={}) {
		this.setState({
			title, text
		});
		this.dialog._open();
		this.defer = q.defer();
		return this.defer.promise;
	}

  close() {
    this.dialog._close();
    this.defer && this.defer.resolve();
  }

	isOpen() {
		return this.dialog && this.dialog.isOpen();
	}

	handleOkClick() {
		this.close();
	}

	handleCancelClick() {
		this.dialog._close();
		this.defer && this.defer.reject({close: false});
	}

	handleCloseClick() {
		this.dialog._close();
		this.defer && this.defer.reject({close: true});
	}

	render() {
		const {
			title: stateTitle,
			text:stateText
		}=this.state || {};
		const {
			parentSelector,
			onAfterOpen,
			shouldCloseOnOverlayClick = false,
			title:propTitle,
			okName = 'Подтвердить',
			cancelName,
			disableClose = false,
			text:propText,
            className = '',
            btnsClassName = '',
		}=this.props;

		const title = stateTitle || propTitle;
		const text = stateText || propText;

		const classNames = ['popup_layer small', className].join(' ');
		return (
			<ModalPopup parentSelector={parentSelector}
						onAfterOpen={onAfterOpen}
						shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
						onRequestClose={::this.handleCloseClick}
						ref={dialog => this.dialog = dialog}>
				<div class={classNames}>
					{!disableClose && <a class="popup_close icon-close" onClick={::this.handleCloseClick}></a>}
					<div>
						{title && <h1>{title}</h1>}
						{text && <p>{text}</p>}
						<div class="popup_panel">
							<button class={`button ${btnsClassName}`} onClick={::this.handleOkClick}>{okName}</button>
							{cancelName && <button class={`button clean ${btnsClassName}`} onClick={::this.handleCancelClick}>{cancelName}</button>}
						</div>
					</div>
				</div>
			</ModalPopup>);
	}
}

ConfirmPopup.propTypes = {
	parentSelector: PropTypes.func,
	shouldCloseOnOverlayClick: PropTypes.bool,
	title: PropTypes.string,
	okName: PropTypes.string,
	cancelName: PropTypes.string,
	disableClose: PropTypes.bool,
	text: PropTypes.string,
	className: PropTypes.string,
};

export default ConfirmPopup;