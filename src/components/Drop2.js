import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TetherDrop from 'tether-drop';

class Drop extends React.Component {

  constructor() {
    super();
    this.container = document.createElement('div');
    this.state = {
      isOpened: false,
      id: Math.random().toString(36).substr(2, 9)
    }
    this._isOpened = false
  }

  static defaultProps = {
    drop: {
      position: 'bottom left',
      openOn: 'click',
      constrainToWindow: true,
      constrainToScrollParent: true,
      classes: 'drop-theme-basic',
      hoverOpenDelay: 0,
      hoverCloseDelay: 50,
      focusDelay: 0,
      blurDelay: 50,
      tetherOptions: {},
    }
  };

  reposition() {
    if (this.drop) {
      this.drop.position();
    }
  }

  componentDidMount() {
    this.initDrop();
    this.props.setInstance && this.props.setInstance(this);
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.children[1] !== nextProps.children[1]){
      const content = this.getDropContent(nextProps);
      const component = React.cloneElement(content, content.props, this.bindCloseEvent(content));
      const domContent = ReactDOM.render(component, this.container);
      domContent.className += (' ' + this.state.id)
      $( `.${this.state.id}` ).replaceWith(domContent);
      this.drop.position();
    }
  }

  isOpen() {
    return this.drop && this.drop.isOpened();
  }

  close() {
    this._isOpened = false
    return this.drop && this.drop.close();
  }

  componentWillUnmount() {
    this.destroyDrop();
    this.props.setInstance && this.props.setInstance(null);
  }

  getDropContent(props) {
    const {children} = props;
    const dropContent = React.Children.map(children, (child) => {
      if (child.props.className.indexOf('drop-content') > -1) {
        return child;
      }
    })[0];
    if (!dropContent) {
      throw new Error('Child element with class drop-content must be specified');
    }
    return dropContent;
  }

  initDrop() {
    const outOptions = this.props.drop;
    const opts = Object.assign({
      target: this.refs.drop,
      beforeClose: (e) => !this._isOpened
    }, outOptions);

    opts.content = () => {
      const content = this.getDropContent(this.props);
      const component = React.cloneElement(content, content.props, this.bindCloseEvent(content));
      const domContent = ReactDOM.render(component, this.container);
      domContent.className += (' ' + this.state.id)
      return domContent;
    };
    this.drop = new TetherDrop(opts);
    this.drop.on('open', () => this._isOpened =  true)
  }

  bindCloseEvent(content) {
    const self = this;
    return React.Children.map(content, c => {
      if (c && c.props) {
        let props = null;
        let children = c.props.children ? this.bindCloseEvent(c.props.children) : null;
        if (c.props["data-close"]) {
          props = {
            onClick: () => {
              self.close();
              c.props.onClick && c.props.onClick();
            }
          };
        }
        if (children || props)
          return React.cloneElement(c, props, children);
      }
      return c
    });
  }

  destroyDrop() {
    if (this.drop) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.drop.close();
      this.drop.destroy()
    }
  }


  render() {
    let targetLink = null;
    React.Children.forEach(this.props.children, child => {
      if (child.props.className.indexOf('drop-target') > -1) {
        targetLink = child;
      }
    });

    return React.cloneElement(targetLink, {
      ref: 'drop'
    });
  }
}

Drop.propTypes = {
  drop: PropTypes.object,
  onClose: PropTypes.func
};

export default Drop