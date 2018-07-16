import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const MassOperationsPanel = props => <div className={classnames('mass-operations-panel', props.className)}>
	<div class="item-selected">
		{props.caption}
		<span>{props.numberSelectedItems}</span>
	</div>

	<a class="reset" onClick={props.onResetClick}>Сбросить</a>

	{props.buttons.map(button => <a
		key={button.key}
		className={classnames('button', 'clean', 'small', button.className)}
		onClick={button.onClick}
	>
		{button.title}
	</a>)}
</div>

MassOperationsPanel.propTypes = {
	caption: PropTypes.string.isRequired,
	numberSelectedItems: PropTypes.number.isRequired,
	onResetClick: PropTypes.func.isRequired,

	buttons: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		title: PropTypes.string,
		onClick: PropTypes.string.isRequired,
		className: PropTypes.string
	})).isRequired
}

export default MassOperationsPanel
