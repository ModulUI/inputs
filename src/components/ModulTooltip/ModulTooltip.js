import React from 'react';
import PropTypes from 'prop-types'
import './bootstrap.tooltip'

class ModulTooltip extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        preventHideOnFocus: PropTypes.bool,
        getContent: PropTypes.func.isRequired,
        dataFor: PropTypes.string.isRequired,
        delay: PropTypes.number,
        placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
        trigger: PropTypes.string,
        container: PropTypes.string,
        autoShow: PropTypes.number,
        hideOnClickOutside: PropTypes.bool
    };

    static defaultProps = {
        trigger: 'hover',
        placement: 'right',
        html: false,
        className: '',
        preventHideOnFocus: false,
        container: '',
        autoShow: 0,
        hideOnClickOutside: false
    };

    getOptions(props) {
        const {
            className, getContent, preventHideOnFocus,
            delay, placement, html, trigger, container,
            content
        }=props;

        const template = `<div class="tooltip ${className}" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`;

        return {
            title: () =>{
                if(content!=null && content!=undefined)
                    return content;
                if(getContent)
                getContent()
            },
            preventHideOnFocus: preventHideOnFocus,
            delay: delay ? {hide: delay} : 0,
            placement: placement,
            html: html || false,
            trigger: trigger,
            container: container,
            template: template
        };
    }

    componentDidMount() {
        this.init(this.props);
        console.log('componentDidMount');
        document.addEventListener('click', ::this.handleClickOutside, true);
    }

    handleClickOutside(e) {
        const domNode = this.element && this.element[0];
        if (this.props.hideOnClickOutside && (!domNode || !domNode.contains(e.target))) {
            this.hide();
        }
    }

    componentWillReceiveProps(props) {
        //this.init(props);
        const element = this._getTip(props.dataFor);
        if (this._equalInstance(element, this.element)) {
            this._setContent();
        }
        else {
            this.init(props);
        }
    }

    _equalInstance(a, b) {
        if (a && a.length > 0 && b && b.length > 0)
            return a[0] == b[0];
        return false;
    }

    _getTip(dataFor) {
        return $(`[data-mtip=${dataFor}]`);
    }

    _setContent() {
        this.element && this.element.tooltip('setContent');
    }

    init(props) {
        const element = this._getTip(props.dataFor);
        const options = this.getOptions(props);
        //this.destroy();
        this.element = element.tooltip(options);
        this.runAutoShow(props);
    }

    runAutoShow(props) {
        if (props.autoShow && props.autoShow > 0) {
            setTimeout(() => this.element.tooltip('show'), props.autoShow)
        }
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        this.element && this.element.tooltip('destroy');
    }

    show() {
        this.element && this.element.tooltip('show');
    }

    hide() {
        this.element && this.element.tooltip('hide');
    }
}

export default ModulTooltip;