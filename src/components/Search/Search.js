import React from "react";
import PropTypes from 'prop-types';
import './Search.scss';

class Search extends React.Component {
    constructor (props) {
        super(props);
        this.getTypeValue = this.getTypeValue.bind(this);
    }

    getTypeValue (event) {
        let searchValue = event.target.value;
        this.props.searchHandler(searchValue);
    }
    render () {
        let { title } = this.props;
        return (
            <div className="search-section">
                <div className="search-title">Search by {title}</div>
                <div>
                    <input type="text" className="search-box" onChange={this.getTypeValue}/>
                    <button className="search-button" >Search</button>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    title: PropTypes.string,
    searchHandler: PropTypes.func
};
export default Search;
