import React from 'react';
import PropTypes from 'prop-types'
import TooltipModel from './TooltipModel'

class ModulTooltip extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        preventHideOnFocus: PropTypes.bool,
        getContent: PropTypes.func,
        content: PropTypes.string,
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


    componentDidMount() {
        this.tooltip = new TooltipModel(this.props);
        if (this.props.hideOnClickOutside) {
            document.addEventListener('click', ::this.handleClickOutside, true);
        }
    }

    handleClickOutside(e) {
        console.log('dom click');
        if (!this.tooltip)
            return;

        if (this.tooltip.equalDataFor(e.target)) //клик по элементу к которому привязан тултип
            return;

        if (this.props.hideOnClickOutside && !this.tooltip.containNode(e.target)) //не клик по тултипу
        {
            this.tooltip.hide();
        }
    }

    componentWillReceiveProps(props) {
        this.tooltip.update(props);
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.tooltip.destroy();
    }

    show() {
        this.tooltip.show();
    }

    hide() {
        this.tooltip.hide();
    }
}

export default ModulTooltip;