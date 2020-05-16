/*global chrome*/
import React, { Component } from 'react'
import breeds from './resources/breeds.json'

export default class DogImage extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="https://www.github.com/pratoa/dog-tab">DogTab</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Breeds
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                    breeds.map(breed => <a value={breed} key={breed} class="dropdown-item" href="#"> {breed} </a>)
                                }
                                
                            {/* <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a> */}
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
            // <div className="custom-select">
            //     <select className="dog-dropdown">
            //         {
            //             breeds.map(breed => <option value={breed} key={breed}> {breed} </option>)
            //         }
            //     </select>
            // </div>
        )
    }
}