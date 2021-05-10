import React, { Component } from 'react'

export default class Logout extends Component {
    render() {
        return (
            <div>
                
                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-body">
                            Hello, world! This is a toast message.
    <div className="mt-2 pt-2 border-top">
                                <button type="button" className="btn btn-primary btn-sm">Logout</button>
                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Cancel</button>
                            </div>
                        </div>
                    </div>

                

            </div>
        )
    }
}


