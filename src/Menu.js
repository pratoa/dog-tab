/*global chrome*/
import React, { Component } from 'react'
import Clock from 'react-live-clock'
import breeds from './resources/breeds.json'
import './Menu.css'

export default class DogImage extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light">
                {/* <a class="navbar-brand" href="https://www.github.com/pratoa/dog-tab">DogTab</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Breeds
                            </a>
                            <ul class="dropdown-menu checkbox-menu allow-focus" aria-labelledby="dropdownMenu1">
                                {
                                    breeds.map(breed =>  
                                        <li>
                                            <label>
                                                <input type="checkbox" value={breed} key={breed}/> {breed}
                                            </label>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
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