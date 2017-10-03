import React, {Component} from 'react';
import PhoneInput from '../src/components/PhoneInput'
import AmountInput from '../src/components/AmountInput'
import DateFormat from '../src/components/DateFormat'
import DatePicker from '../src/components/DatePicker'

export default class Page extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push({pathname: `/${this._input.value}`});
    }

    render() {
        return (
            <section className="jumbotron">
                <div class="row">
                    <div class="col-md-6">
                        <form
                            className="form-vertical"
                            role="form"
                            onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span class="input-group-addon" id="basic-addon1">Phone</span>
                                    <PhoneInput class="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span class="input-group-addon" id="basic-addon1">Amount</span>
                                    <AmountInput class="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span class="input-group-addon" id="basic-addon1">Date picker</span>
                                    <DatePicker class="form-control"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-secondary">Date format: <DateFormat value={new Date()} format="d mmmm:R yyyy HH:ss" /></span>
                    </div>
                </div>
            </section>
        );
    }
}

Page.contextTypes = {
    router: React.PropTypes.object.isRequired,
}