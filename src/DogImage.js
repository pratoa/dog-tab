/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'
import Menu from './Menu'

export default class DogImage extends Component {
    constructor() {
        super();
        this.state = { url: "" };
    }

    async componentDidMount() {
        let response = await getBackgroundImage();
        this.setState({ url: response });
    }

    render() {
        return (
            <section className="dog-image" style={{backgroundImage: `url(${this.state.url})`}}>
                <Menu />
            </section>
        )
    }
}

async function getBackgroundImage() {
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get(['dogImages', 'dogCounter'], function(result) {
            resolve(result.dogImages[result.dogCounter].url);

            if (result.dogCounter !== result.dogImages.length - 1) {
                chrome.storage.local.set({'dogCounter': result.dogCounter + 1}, function() {
                    console.log('Setting DogCounter to: ' + (result.dogCounter + 1));
                });
            } else {
                chrome.storage.local.set({'dogCounter': 0}, function() {
                    console.log('Setting DogCounter to: ' + 0);
                });
            }
         })
    });
}