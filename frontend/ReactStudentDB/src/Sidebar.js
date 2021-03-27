import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (

            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fas fa-home"></i>&nbsp;Home</a>
                <a class="nav-link text-body" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-user"></i>&nbsp;Profile</a>
                <a class="nav-link text-body" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fas fa-book-open"></i>&nbsp;Feedback</a>
                <a class="nav-link text-body" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
            </div>


        )
    }
}
