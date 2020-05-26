/*global chrome*/
import React, { Component } from 'react'
import Clock from 'react-live-clock'
import breeds from './resources/breeds.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faDog, faEye } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'

// var sites = ["Apple", "Orange", "Coconut"];

export default class DogImage extends Component {

    constructor() {
        super();
        this.state = { topSites: []};
    }

    async componentDidMount() {
        let response = await getTopSites();
        this.setState({ topSites: response });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <FontAwesomeIcon icon={faCog} size="2x" color="white" className="icon"/>
                        </li>
                        <li className="nav-item dropdown">
                            <FontAwesomeIcon icon={faDog} size="2x" color="white" className="icon dropdown-toggle" role="button" data-toggle="dropdown"/>
                            <ul className="breeds-dropdown dropdown-menu checkbox-menu allow-focus" aria-labelledby="dropdownMenu1">
                                {
                                    breeds.map(breed =>  
                                        <li key={breed}>
                                            <label>
                                                <input type="checkbox" value={breed} key={breed}/> {breed}
                                            </label>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>
                        <li className="nav-tem dropdown">
                            <FontAwesomeIcon icon={faEye} size="2x" color="white" className="icon" role="button" data-toggle="dropdown"/>
                            <div className="dropdown-menu site-dropdown">
                                <h4 class="dropdown-header">Most Visited Sites</h4>
                                {
                                   this.state.topSites.map(site => 
                                        <a className="dropdown-item site-item" value={site.title} key={site.title} href={site.url}> {site.title} </a>
                                    )
                                } 
                            </div>   
                        </li>
                    </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    <div>
                        <Clock format={'hh:mm A'} ticking={true} className="current-time"/>
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
            console.log(result);
            resolve(result);
         })
    });
}