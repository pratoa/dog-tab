/*global chrome*/
import React, { Component } from 'react'
import breeds from './resources/breeds.json'

export default class DogImage extends Component {
    render() {
        return (
            <div className="custom-select">
                <select className="dog-dropdown">
                    {
                        breeds.map(breed => <option value={breed} key={breed}> {breed} </option>)
                    }
                </select>
            </div>
        )
    }
}