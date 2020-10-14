/*global chrome*/
import React, { Component } from 'react'
import Clock from 'react-live-clock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faDog, faEye } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'

export default class DogImage extends Component {

    constructor() {
        super();
        this.state = { topSites: [],
                       timeFormat: "hh:mm A"
                    };
        this.changeTimeFormat = this.changeTimeFormat.bind(this)
    }

    async componentDidMount() {
        let sites = await getTopSites();
        this.setState({ topSites: sites});
    }

    changeTimeFormat() {
        if (this.state.timeFormat === "HH:mm") {
            this.setState({ timeFormat: "h:mm A"});    
        } else {
            this.setState({ timeFormat: "HH:mm"});
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <FontAwesomeIcon icon={faCog} size="2x" color="white" className="icon" role="button" data-toggle="dropdown"/>
                            <div className="dropdown-menu settings-dropdown">
                                <h4 class="dropdown-header">Settings</h4>
                                <div className="dropdown-item site-item" onClick={this.changeTimeFormat} value="Change Time">
                                    Change Time Format
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="settings-container">
                                    <p className="photo-by">Photo by <a href={this.props.currentImage.userUrl}>{this.props.currentImage.userName}</a> on <a href="https://unsplash.com/?utm_source=DogTab&utm_medium=referral">Unsplash</a></p>
                                </div>
                            </div>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <FontAwesomeIcon icon={faDog} size="2x" color="white" className="icon dropdown-toggle" role="button" data-toggle="dropdown"/>
                            <div className="dropdown-menu breeds-dropdown">
                                <h4 className="dropdown-header">Choose your favorite breeds!</h4>
                                <div className="breeds">
                                    {
                                        this.state.menuBreeds.map(breed =>
                                            <label>
                                                <input type="checkbox" value={breed.name} key={breed.name} onChange={this.clickOnBreed} checked={breed.isChecked}/> {breed.name}
                                            </label>
                                        )
                                    }
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item breeds-save" onClick={this.saveBreeds} value="Save">Save</button>
                            </div>
                        </li> */}
                        <li className="nav-item dropdown">
                            <FontAwesomeIcon icon={faEye} size="2x" color="white" className="icon" role="button" data-toggle="dropdown"/>
                            <div className="dropdown-menu site-dropdown">
                                <h4 class="dropdown-header">Most Visited Sites</h4>
                                {
                                   this.state.topSites.map(site =>
                                        <div className="site-container">
                                            <img src={site.favicon} alt="" className="site-item-favicon"/>
                                            <a className="dropdown-item site-item" value={site.title} key={site.title} href={site.url}> {site.title} </a>
                                        </div>
                                    )
                                }
                            </div>   
                        </li>
                    </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    <div className="time-container">
                        <Clock key={this.state.timeFormat} format={this.state.timeFormat} ticking={true} className="current-time"/>
                        <Clock format={'dddd, MMM Do, YYYY'} ticking={true} className="current-date"/>
                    </div>
                </div>
            </nav>
        )
    }
}

async function getTopSites() {
    return new Promise(function(resolve, reject) {
        chrome.topSites.get(function(result) {
            var urls = [];
            result.forEach(function (url) {
                url.baseUrl = url.url.match(/^https?:\/\/[^#?\/]+/)[0];
                url.favicon = url.baseUrl + "/favicon.ico";
                urls.push(url);
            });
            resolve(urls);
         });
    });
}
