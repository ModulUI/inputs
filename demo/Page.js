import React, {Component} from 'react';
import PhoneInput from '../src/components/PhoneInput'
import AmountInput from '../src/components/AmountInput'
import DateFormat from '../src/components/DateFormat'
import AmountFormat from '../src/components/AmountFormat'
import DatePicker from '../src/components/DatePicker'
import DatePickerRange from '../src/components/DatePickerRange'
import Select from '../src/components/Select'
import {ModalPopup, ConfirmPopup, ContentPopup} from '../src/dialogs'
import {NotifyService, notifyFactory} from '../src/components/notify'

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {notifications: []};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push({pathname: `/${this._input.value}`});
    }

    handleChangeDateRange(dates) {
        this.setState(dates);
    }

    handleSelect(val) {
        this.setState({selected: val})
    }

    handleOpenContentPopup() {
        this.content.open();
    }

    handleOpenPopup() {
        this.confirm.open();
    }

    handleAlert() {
        alert('Тест')
    }

    handleShowNotify(notify) {
        this.setState({
            notifications: [...this.state.notifications, notify]
        })
    }

    handleRemoveNotify(id) {
        this.setState({
            notifications: this.state.notifications.filter(s => s.uid != id)
        })
    }

    render() {
        const {dateFrom, dateTo, selected, notifications}=this.state || {};
        const options = [{value: 1, label: 'option 1'}];
        return (
            <section className="section_content full_width">
                <div className="jumbotron row">

                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="form_group">
                                <div className="input_group_title">
                                    <PhoneInput class="form-control"/>
                                    <span class="input_title">Phone</span>
                                </div>
                            </div>
                            <div className="form_group">
                                <div className="input_group_title">
                                    <AmountInput class="form-control"/>
                                    <span class="input_title">Amount</span>
                                </div>
                            </div>
                            <div className="form_group">
                                <div className="input_group_title">
                                    <DatePicker class="form-control"/>
                                    <span class="input_title">Date</span>
                                </div>
                            </div>
                            <div className="form_group">
                                <div className="input_group_title">
                                    <DatePickerRange dateFrom={dateFrom}
                                                     dateTo={dateTo}
                                                     onChange={(dates) => this.handleChangeDateRange(dates)}
                                                     class="form-control"/>
                                </div>
                            </div>
                            <div className="form_group" style={{width: '200px'}}>
                                <div className="input_group_title w100">
                                    <div className="input_title">Select</div>
                                    <Select options={options} value={selected} className="w100"
                                            onChange={(val) => this.handleSelect(val)}/>
                                </div>
                            </div>

                            <div className="form_group">
                                <span class="label label-danger">Date format: <DateFormat
                                    value={new Date()}
                                    format="d mmmm:R yyyy HH:ss"/></span>
                            </div>
                            <div className="form_group">
                                <span class="badge badge-secondary">Amount format: <AmountFormat
                                    value={100000.12}/></span>
                            </div>
                        </form>
                </div>
                <div className="m_top_10">
                    <h3>Попапы</h3>
                    <div>
                        <button class="button " onClick={::this.handleOpenPopup}>Confirm dialog</button>
                        <button class="button second" style={{marginLeft: '10px'}}
                                onClick={::this.handleOpenContentPopup}>Content dialog
                        </button>
                        <ConfirmPopup ref={p => this.confirm = p} text={"Some text"} okName={"ОК"}
                                      cancelName={"Cancel"}/>
                        <ContentPopup ref={p => this.content = p} closeName={"Закрыть"}>
                            Контент попапа с <b>версткой</b> <br/> <br/>
                            <button class="btn btn-primary" onClick={::this.handleAlert}>Алерт</button>
                        </ContentPopup>
                    </div>
                </div>

                <div className="m_top_20">
                    <h3>Нотификаторы</h3>
                    <div>
                        <button class="button small second"
                                onClick={() => this.handleShowNotify(notifyFactory.success('Success message'))}>Success
                        </button>
                        <button class="button small error" style={{marginLeft: '10px'}}
                                onClick={() => this.handleShowNotify(notifyFactory.error('Error message'))}>Error
                        </button>
                        <button class="button small clean" style={{marginLeft: '10px'}}
                                onClick={() => this.handleShowNotify(notifyFactory.info('Info message'))}>Info
                        </button>
                        <button class="button small warning" style={{marginLeft: '10px'}}
                                onClick={() => this.handleShowNotify(notifyFactory.warning('Warn message'))}>Warn
                        </button>
                        <NotifyService notifications={notifications}
                                       onRemove={::this.handleRemoveNotify}/>
                    </div>
                </div>

            </section>
        );
    }
}

Page.contextTypes = {
    router: React.PropTypes.object.isRequired,
}