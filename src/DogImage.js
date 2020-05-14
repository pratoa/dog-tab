/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'

export default class DogImage extends Component {
    render() {
        return (
            <div className="dog-image" style={{backgroundImage: `url(${getBackgroundImage()})`}}></div>
        )
    }
}

async function getBackgroundImage() {
    var images = [];
    var url = "";
    chrome.storage.local.get(['dogImages'], function(result) {
        images = result.dogImages;
        console.log(images);
        console.log(images.length);
        var randomImg = Math.floor(Math.random() * images.length);
        console.log(randomImg);
        console.log(images[randomImg].url);
        url = images[randomImg].url;
    });

    return await url;
}