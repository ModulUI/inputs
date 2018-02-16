import React, {Component} from 'react';
import PhoneInput from '../src/components/PhoneInput'
import AmountInput from '../src/components/AmountInput'
import DateFormat from '../src/components/DateFormat'
import AmountFormat from '../src/components/AmountFormat'
import NumberFormat from '../src/components/NumberFormat'
import NumberInput from '../src/components/NumberInput'
import DatePicker from '../src/components/DatePicker'
import DatePickerRange from '../src/components/DatePickerRange'
import ModulTooltip from '../src/components/ModulTooltip'
import Select from '../src/components/Select'
import {ModalPopup, ConfirmPopup, ContentPopup} from '../src/dialogs'
import {NotifyService, notifyFactory} from '../src/notify'
import Autosuggest from '../src/Autosuggest';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {notifications: [], message: 'Тест 1'};
        //this.getTooltipContent.bind(this);
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.setState({message: 'Тест ' + new Date()});
        // }, 2000);
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

    getTooltipContent() {
        return 'test ' + new Date();
    }

    render() {
        const {dateFrom, dateTo, selected, notifications, message}=this.state || {};
        const options = [{value: 1, label: 'option 1'}];
        return (
            <section className="section_content full_width">
                <div className="jumbotron row">

                    <form role="form" onSubmit={this.handleSubmit}>
                        <div className="form_group">
                            <div className="input_group_title">
                                <NumberInput class="form-control"/>
                                <span class="input_title">Number</span>
                            </div>
                        </div>
                        <div className="form_group">
                            <div className="input_group_title">
                                <NumberInput precision={3} float={true} class="form-control"/>
                                <span class="input_title">Float</span>
                            </div>
                        </div>
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
                                {/*<Select options={options} value={selected} className="w100"*/}
                                        {/*onChange={(val) => this.handleSelect(val)}/>*/}
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
                        <div className="form_group">
                                <span class="badge badge-secondary">Number format: <NumberFormat
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

                <div className='m_top_20 w40'>
                    <h3>Автодополнение</h3>
                    <Autosuggest
                        name='autosuggest'
                        options={[
                            { value: 'Уфа' },
                            { value: 'Москва' },
                            { value: 'Екатеринбург' },
                            { value: 'Казань' },
                        ]}
                        loading={true}
                        value='Самара'
                        className=''
                        getOptionsValue={(data) => data.value}
                        onFetchRequested={(val) => console.log('Запросить', val)}
                        onClearRequested={() => console.log('Очистить список')}
                        onSelected={(data) => console.log('Выбран из списка', data)}
                        onClearValue={() => { console.log('Перед очисткой поля'); return true }}
                        renderOptions={(options, query) => <span>+{options.value}</span>}
                        onChange={(val) => console.log('onChange', val)}
                        onBlur={(e) => console.log('onBlur', e)}
                        onFocus={(e) => console.log('onFocus', e)}
                    />
                </div>

                <div className="m_top_20 m_bot_100">
                    <h3>Тултипы</h3>

                    {/*<span data-mtip="test">наведи на меня</span>*/}
                    {/*<ModulTooltip getContent={() => 'Тестовы тултип'} dataFor="test"/>*/}

                    {/*<br/>*/}
                    {/*<span data-mtip="test2">наведи на меня</span>*/}
                    {/*<ModulTooltip getContent={() => 'Тестовы тултип'} placement="top" dataFor="test2"/>*/}

                    <br/>
                    <span data-mtip="test3">динамический контент</span>
                    <ModulTooltip placement="bottom"
                                  getContent={::this.getTooltipContent}
                                  dataFor="test3"/>


                    <div className="form_group">
                        <div className="input_group_title">
                            <NumberInput precision={3}
                                         float={true}
                                         class="form-control"
                                         data-mtip="test4"/>
                            <span class="input_title">По клику</span>
                        </div>
                    </div>

                    <ModulTooltip placement="right"
                                  trigger="click"
                                  content="Click outside hide"
                                  hideOnClickOutside={true}
                                  dataFor="test4"/>

                    <div className="form_group">
                        <div className="input_group_title">
                            <NumberInput precision={3}
                                         float={true}
                                         class="form-control"
                                         data-mtip="test5"/>
                            <span class="input_title">По фокусу</span>
                        </div>
                    </div>

                    <ModulTooltip placement="top"
                                  trigger="focus"
                                  content="on focus"
                                  hideOnClickOutside={true}
                                  dataFor="test5"/>

                    <br/>
                    <br/>

                    <span data-mtip="test6">динамический контент с возможность сфокуситься на тултипе</span>
                    <ModulTooltip placement="bottom"
                                  preventHideOnFocus={true}
                                  delay={100}
                                  getContent={::this.getTooltipContent}
                                  dataFor="test6"/>

                </div>


            </section>
        );
    }
}

Page.contextTypes = {
    router: React.PropTypes.object.isRequired,
}