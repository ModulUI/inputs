import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';

const Tbody = props => <tbody className={classnames(props.className)}>
	{props.search && <tr id="search">
		<td colSpan={props.columnsNumber}>
			<input
				type="search"
				value={props.search.value}
				className={props.search.inputClassName}
				placeholder={props.search.placeholder}
				onChange={props.search.onChange}
			/>
		</td>
	</tr>}

	{props.children}

	{props.isEmptyMessageRowShown && <tr className="no_search_results">
		<td colSpan={props.columnsNumber} className="light_block">{props.emptyMessage}</td>
	</tr>}

	{props.isLoadingRowShown && <tr className="loading_block_row">
		<td colSpan={props.columnsNumber} className="loading_block" />
	</tr>}

	{(props.loadNext && props.listLength < props.listTotalCount) && <Waypoint onEnter={props.loadNext} />}
</tbody>

Tbody.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	columnsNumber: PropTypes.number.isRequired,
	isLoadingRowShown: PropTypes.bool,
	isEmptyMessageRowShown: PropTypes.bool,
	emptyMessage: PropTypes.string,
	listLength: PropTypes.number,
	listTotalCount: PropTypes.number,

	search: PropTypes.shape({
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		inputClassName: PropTypes.string
	})
}

Tbody.defaultProps = {
	emptyMessage: 'По запросу ничего не найдено'
}

export default Tbody
