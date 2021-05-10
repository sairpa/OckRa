import React, { Component } from 'react'
import './Card.css';
export default class Card extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="classalot">
                        <h1 className="heading" > <img src="/undraw_annotation_7das.svg" class="img-fluid image" alt="profile img"></img> &nbsp; DASHBOARD </h1>
                       {/* <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden color">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden color">Next</span>
                            </button>
        </div> */}

                        <div class="row m-3 ">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body color">
                            <h5 class="card-title">NOTIFICATIONS</h5>
                            <p class="card-text"></p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body color">
                            <h5 class="card-title">CLASSROOM ALLOTTED</h5>
                            <p class="card-text"></p>
                            
                        </div>
                    </div>
                </div>
        </div>
                    </div>
                </div>

            </div>
        )
    }
}
