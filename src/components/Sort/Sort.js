import React from "react";
import PropTypes from 'prop-types';
import './Sort.scss';

class Sort extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sortOrder: 'asc'
        };
        this.getSortOrder = this.getSortOrder.bind(this);
    }

    getSortOrder (event) {
        this.setState({ sortOrder: event.target.value });
        this.props.sortHandler(event.target.value);
    }
    render () {
        return (
            <div className="sort-section">
                <div className="sort-select">
                    <div className="title"> Sort by ID</div>
                    <select
                        className="sorting-dropdown"
                        onChange={this.getSortOrder}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        );
    }
}

Sort.propTypes = {
    sortHandler: PropTypes.func
};
export default Sort;
