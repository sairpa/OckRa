import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        return (
            <div class="row m-3">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Notifications</h5>
                            <p class="card-text"></p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Classroom Allotted</h5>
                            <p class="card-text"></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
