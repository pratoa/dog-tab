/*global chrome*/
import React, { Component } from 'react'
import './DogImage.css'
import Menu from './Menu'

export default class DogImage extends Component {
    constructor() {
        super();
        this.state = { url: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNDQzNH0" };
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