/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'

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
            <div className="dog-image" style={{backgroundImage: `url(${this.state.url})`}}></div>
        )
    }
}

async function getBackgroundImage() {
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get(['dogImages'], function(result) {
            var randomImg = Math.floor(Math.random() * result.dogImages.length);
            resolve(result.dogImages[randomImg].url);
         })
    });
}