import React from 'react';
import PropTypes from 'prop-types';
import Tr from './Tr';
import Td from './Td';
import classnames from 'classnames';

const Tbody = props => <tbody className={classnames(props.className)}>
	{props.children}

	{props.isEmptyMessageRowShown && <Tr className="no_search_results">
		<Td colSpan={props.fullRowColSpan} className="light_block">{props.emptyMessage}</Td>
	</Tr>}

	{props.isLoadingRowShown && <Tr className="loading_block_row">
		<Td colSpan={props.fullRowColSpan} className="loading_block" />
	</Tr>}

</tbody>

Tbody.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	fullRowColSpan: PropTypes.string,
	isLoadingRowShown: PropTypes.bool,
	isEmptyMessageRowShown: PropTypes.bool,
	emptyMessage: PropTypes.string
}

export default Tbody;