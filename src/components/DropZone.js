import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


class DropZone extends React.Component {
  render() {
    const { getRef, ...props } = this.props;
    return (
      <Dropzone
        ref={(e) => {
          if (typeof this.props.getRef === 'function') {
            getRef(e);
          }
        }}
        {...props}
      />
    );
  }
}

export default DropZone;
