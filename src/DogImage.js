/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'
import Menu from './Menu'
import { getImages } from "./background/helpers.js";

export default class DogImage extends Component {
    constructor() {
        super();
        this.state = { currentImage: {} };
    }

    async componentDidMount() {
        let response = await getBackgroundImage();
        console.log(response);
        this.setState({ currentImage: response });
    }

    render() {
        return (
            <div className="dog-image" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.state.currentImage.url})`}}>
                <Menu currentImage={this.state.currentImage}/>
            </div>
        )
    }
}

async function getBackgroundImage() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['dogImages', 'dogCounter', 'views'], function(result) {
            resolve(result.dogImages[result.dogCounter]);

            if (result.dogCounter !== result.dogImages.length - 1) {
                chrome.storage.local.set({'dogCounter': result.dogCounter + 1}, function() {
                    console.log('Setting DogCounter to: ' + (result.dogCounter + 1));
                });
            } else {
                chrome.storage.local.set({'dogCounter': 0}, function() {
                    console.log('Setting DogCounter to: ' + 0);
                });
            }

            if (result.views === 180) {
                getImages();
            } else {
                chrome.storage.local.set({'views': result.views + 1}, function() {
                    console.log('Setting Views to: ' + (result.views + 1));
                });
            }
         })
    });
}