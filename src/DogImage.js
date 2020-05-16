/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'
import Menu from './Menu'

export default class DogImage extends Component {
    constructor() {
        super();
        this.state = { url: "https://images.unsplash.com/photo-1530041686259-53d26f863313?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2206&q=80" };
    }

    // async componentDidMount() {
    //     let response = await getBackgroundImage();
    //     this.setState({ url: response });
    // }

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
        chrome.storage.local.get(['dogImages'], function(result) {
            var randomImg = Math.floor(Math.random() * result.dogImages.length);
            resolve(result.dogImages[randomImg].url);
         })
    });
}