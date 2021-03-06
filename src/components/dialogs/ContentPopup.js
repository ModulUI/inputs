import React from 'react';
import PropTypes from 'prop-types';
import ModalPopup from './ModalPopup';
import q from 'q';
/**
 * Попап с контентом
 */
class ContentPopup extends React.Component {

    static defaultProps = {
        closeName: null,
        shouldCloseOnOverlayClick: false,
        disableClose: false,
        className: ''
    };

    open() {
        this.dialog._open();
        this.defer = q.defer();
        return this.defer.promise;
    }

    /*
	rainur 15.11.2017
	добавлен метод, что бы можно было добавить еще 1 обработчик.
	Например по кнопке Сохранить вызываем this.contentPopup.handleCloseMethod, вызывается reject, при закрытии же формы, вызывается resolve.
	*/
    handleCloseMethod() {
        this.dialog._close();
        this.defer && this.defer.reject();
    }

    close() {
        this.dialog._close();
        this.defer && this.defer.resolve();
    }

    handleCloseClick() {
        this.close();
    }

    render() {
        const {onAfterOpen, shouldCloseOnOverlayClick, closeName, disableClose, className, children}=this.props;

        const classNames = ['popup_layer popup_action_default', className].join(' ');
        return (
			<ModalPopup onAfterOpen={onAfterOpen}
						shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
						onRequestClose={::this.handleCloseClick}
						ref={dialog => this.dialog = dialog}>
				<div class={classNames}>
                    {!disableClose && <a class="popup_close icon-close" onClick={::this.handleCloseClick}></a>}
					<div>
                        {children}
                        {closeName && <div class="popup_panel center_xy">
							<button class="button small light" onClick={::this.handleCloseClick}>{closeName}</button>
						</div>}
					</div>
				</div>
			</ModalPopup>);
    }
}

ContentPopup.propTypes = {
    shouldCloseOnOverlayClick: PropTypes.bool,
    closeName: PropTypes.string,
    disableClose: PropTypes.bool,
    className: PropTypes.string,
};

export default ContentPopup;