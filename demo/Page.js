import React, {Component} from 'react';
import PhoneInput from '../src/components/PhoneInput'

export default class Page extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push({pathname: `/${this._input.value}`});
    }

    render() {
        return (
            <section className="jumbotron">
                <form
                    className="form-inline"
                    role="form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <div className="input-group">
                           <PhoneInput/>
                        </div>
                    </div>
                    {/*<button type="submit" className="btn btn-primary">*/}
                        {/*Go*/}
                    {/*</button>*/}
                </form>
            </section>
        );
    }
}

Page.contextTypes = {
    router: React.PropTypes.object.isRequired,
}