/*global chrome*/
import React, { Component } from 'react'
import Clock from 'react-live-clock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEye } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'
import { getTimeFormat, saveTimeFormat } from './background/helpers'

export default class DogImage extends Component {

    constructor() {
        super();
        this.state = { topSites: [],
                       timeFormat: "h:mm A"
                    };
        this.changeTimeFormat = this.changeTimeFormat.bind(this)
    }

    async componentDidMount() {
        let sites = await getTopSites();
        this.setState({ topSites: sites});
        let timeFormat = await getTimeFormat();
        this.setState({ timeFormat: timeFormat});
    }

    changeTimeFormat() {
        if (this.state.timeFormat === "HH:mm") {
            this.setState({ timeFormat: "h:mm A"});
            saveTimeFormat("h:mm A");
        } else {
            this.setState({ timeFormat: "HH:mm"});
            saveTimeFormat("HH:mm");
        }
    }

    render() {
        return (
            <div>
                <div className="buttons-box">
                    <ul>
                         <li className="dropdown">
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
                         <li className="dropdown">
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
                </div>
                <div className="time-box">
                    <div className="time-container">
                        <Clock key={this.state.timeFormat} format={this.state.timeFormat} ticking={true} className="current-time"/>
                        <Clock format={'dddd, MMM Do, YYYY'} ticking={true} className="current-date"/>
                    </div>
                </div>
            </div>
        )
    }
}

async function getTopSites() {
    return new Promise((resolve) => {
        chrome.topSites.get((result) => {
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
