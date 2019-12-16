import React from "react";
import Sidefilter from "../components/Sidefilter/Sidefilter";
import Products from "../components/Products/Products";
import Search from "../components/Search/Search";
import Sort from "../components/Sort/Sort";
import './Home.scss';
import axios from 'axios';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            productList: [],
            genderList: [],
            speciesList: [],
            originList: [],
            searchString: '',
            sortOrder: 'asc'
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.sideFilterHandler = this.sideFilterHandler.bind(this);
    }

    componentDidMount () {
        const url = "https://rickandmortyapi.com/api/character/";
        axios.get(url).then(response => response.data)
            .then((data) => {
                let genderArr = [];
                let speciesArr = [];
                let originArr = [];
                data.results.map((product, id) => {
                    if (!(speciesArr.some((item) => {
                        return item.name === product.species;
                    }))) {
                        speciesArr.push({ name: product.species, checked: false });
                    }

                    if (!(genderArr.some((item) => {
                        return item.name === product.gender;
                    }))) {
                        genderArr.push({ name: product.gender, checked: false });
                    }

                    if (!(originArr.some((item) => {
                        return item.name === product.origin.name;
                    }))) {
                        originArr.push({ name: product.origin.name, checked: false });
                    }
                });
                this.setState({ productList: data.results });
                this.setState({ speciesList: speciesArr });
                this.setState({ genderList: genderArr });
                this.setState({ originList: originArr });
            });
    }

    searchHandler (searchText) {
        if (searchText.length > 0) {
            this.setState({ searchString: searchText });
        } else {
            this.setState({ searchString: '' });
        }
    }

    sortHandler (sortOrder) {
        this.setState({ sortOrder: sortOrder });
    }

    sideFilterHandler (itemObj, title, flag = false) {
        let actionObject = [];
        if (title === 'Species') {
            actionObject = this.state.speciesList;
        } else if (title === 'Gender') {
            actionObject = this.state.genderList;
        } else if (title === 'Origin') {
            actionObject = this.state.originList;
        }
        actionObject = actionObject.map((item) => {
            let temp = Object.assign({}, item);
            if (temp.name === itemObj.name) {
                temp.checked = flag ? false : itemObj.checked;
            }
            return temp;
        });
        if (title === 'Species') {
            this.setState({ speciesList: actionObject });
        } else if (title === 'Gender') {
            this.setState({ genderList: actionObject });
        } else if (title === 'Origin') {
            this.setState({ originList: actionObject });
        }
    }

    seletedFilterHandler (objectList) {
        return objectList.filter((itemFilter) => {
            return itemFilter.checked;
        }).map(function (item) {
            return item.name;
        });
    }

    removeItem (item, title) {
        this.sideFilterHandler(item, title, true);
    }

    render () {
        let productList = this.state.productList;
        let speciesList = this.state.speciesList;
        let genderList = this.state.genderList;
        let originList = this.state.originList;


        let searchString = this.state.searchString.toLowerCase();
        /** seacrh using textbox section  */
        if (this.state.searchString.length > 0) {
            productList = productList.filter((product) => {
                return (product.name.toLowerCase()).includes(searchString);
            });
        } else {
            productList = this.state.productList;
        }
        /** seacrh using textbox end  */


        /**side filter section logic start */
        let speciesArray = this.seletedFilterHandler(speciesList);
        let genderArray = this.seletedFilterHandler(genderList);
        let originArray = this.seletedFilterHandler(originList);

        if (speciesArray.length > 0) {
            productList = productList.filter((product) => {
                return speciesArray.includes(product.species);
            });
        }
        if (genderArray.length > 0) {
            productList = productList.filter((product) => {
                return genderArray.includes(product.gender);
            });
        }
        if (originArray.length > 0) {
            productList = productList.filter((product) => {
                return originArray.includes(product.origin.name);
            });
        }
        /**side filter section logic end */
        /**sorting section start */

        productList = productList.sort((a, b) => {
            if (this.state.sortOrder === 'desc') {
                return b.id - a.id;
            } else {
                return a.id - b.id;
            }
        });

        /**sorting section end */

        return (
            <div className="container">
                <div className="row">
                    <div className="left-section">
                        <div className="filter-container">
                            <div className="header-title">Filters</div>
                            <div className="filter-section">
                                <div className="title">Species</div>
                                <div className="option-list">
                                    {
                                        speciesList.map((species, index) => {
                                            return (
                                                <Sidefilter
                                                    key={index}
                                                    sideFilterHandler={this.sideFilterHandler}
                                                    title="Species"
                                                    items={species}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="title">Gender</div>
                                <div className="option-list">
                                    {
                                        genderList.map((gender, index) => {
                                            return (
                                                <Sidefilter
                                                    key={index}
                                                    sideFilterHandler={this.sideFilterHandler}
                                                    title="Gender"
                                                    items={gender}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="title">Origin</div>
                                <div className="option-list">
                                    {
                                        originList.map((origin, index) => {
                                            return (
                                                <Sidefilter
                                                    key={index}
                                                    title="Origin"
                                                    sideFilterHandler={this.sideFilterHandler}
                                                    items={origin}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="right-section">
                        <div className="custom-section">
                            <div className="selected-filter-item">
                                <div className="title">Selected Filters</div>
                            </div>
                            <div className="selected-filter-item ">
                                <div className="filter-items">
                                    {
                                        speciesList.map((species, speciesIndex) => {
                                            if (species.checked) {
                                                return (
                                                    <div className="filter-item" key={speciesIndex}>{species.name}
                                                        <span
                                                            title="remove"
                                                            className="removeIcon"
                                                            onClick={() => {
                                                                this.removeItem(species, 'Species');
                                                            }}>x
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        })
                                    }

                                    {
                                        genderList.map((gender, genderIndex) => {
                                            if (gender.checked) {
                                                return (
                                                    <div className="filter-item"
                                                        key={genderIndex}>{gender.name}
                                                        <span
                                                            title="remove"
                                                            className="removeIcon"
                                                            onClick={() => {
                                                                this.removeItem(gender, 'Gender');
                                                            }}>x</span>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                    {
                                        originList.map((origin, originIndex) => {
                                            if (origin.checked) {
                                                return (
                                                    <div className="filter-item"
                                                        key={originIndex}>{origin.name}
                                                        <span title="remove" className="removeIcon"
                                                            onClick={() => {
                                                                this.removeItem(origin, 'Origin');
                                                            }}>x</span>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="search-filter-container mt-4">
                                <Search title="Name" searchHandler={this.searchHandler}/>
                                <Sort sortHandler={this.sortHandler}/>
                            </div>
                        </div>
                        <div className="product-container">

                            { productList.length === 0 && <p className="not-found">Record not found.</p>}
                            {
                                productList.map((product, id) => {
                                    return (
                                        <Products
                                            key={product.id}
                                            id={product.id}
                                            image={product.image}
                                            name={product.name}
                                            created={product.created}
                                            status={product.status}
                                            species={product.species}
                                            type={product.type}
                                            gender={product.gender}
                                            origin={product.origin}
                                            location={product.location}

                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
