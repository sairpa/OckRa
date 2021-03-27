import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <img src="/ic_launcher.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
                            Student Dashboard
                    </a>
                </nav>

            </header>
        )
    }
}
