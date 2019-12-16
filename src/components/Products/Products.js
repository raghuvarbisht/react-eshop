import React from 'react';
import PropTypes from 'prop-types';
import './Products.scss';


const Products = (props) => {
    function getDate (dateValue) {
        var todayDate = new Date();
        var createdDate = new Date(dateValue);
        return ((todayDate.getTime() - createdDate.getTime()) / 31536000000).toFixed(0);
    }
    const { id, image, created, name, status, species, gender, origin, location } = props;
    return (
        <div className="character-container">
            <div className="character">
                <div className="character-image">
                    <img src={image} className="image"/>
                    <div className="information">
                        <div className="name"> {name} </div>
                        <div className="created-ago">
                            <span>id : {id} </span>
                            <span> - created {getDate(created)} years ago</span>
                        </div>
                    </div>
                </div>
                <div className="character-details">
                    <div className="outer-div">
                        <div className="align-left label">status </div>
                        <div className="align-right description">{status} </div>
                    </div>
                    <div className="outer-div">
                        <div className="align-left label">species </div>
                        <div className="align-right description">{species} </div>
                    </div>
                    <div className="outer-div">
                        <div className="align-left label">gender </div>
                        <div className="align-right description">{gender} </div>
                    </div>
                    <div className="outer-div">
                        <div className="align-left label">Origin </div>
                        <div className="align-right description">{origin.name} </div>
                    </div>
                    <div className="outer-div">
                        <div className="align-left label">last location </div>
                        <div className="align-right description">{location.name} </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Products.propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    created: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
    origin: PropTypes.object,
    location: PropTypes.object
};
export default Products;
