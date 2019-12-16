import React, { Component } from "react";
import PropTypes from 'prop-types';
import './Sidefilter.scss';

class Sidefilter extends Component {
    constructor (props) {
        super(props);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
    }

    selectChangeHandler (event) {
        let speciesObj = { name: event.target.value, checked: event.target.checked };
        this.props.sideFilterHandler(speciesObj, this.props.title);
    }
    render () {
        let { items } = this.props;

        return (
            <div className="option" key={items}>
                <input type="checkbox"
                    onChange={this.selectChangeHandler}
                    checked={items.checked}
                    value={items.name}/>
                <span>{items.name}</span>
            </div>
        );
    }
}
Sidefilter.propTypes = {
    title: PropTypes.string,
    items: PropTypes.object,
    sideFilterHandler: PropTypes.func
};

export default Sidefilter;
