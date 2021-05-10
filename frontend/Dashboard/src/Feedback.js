import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Card from './Card';
import './Feedback.css';


function Feedback() {
    return (

        <div className="App">
            <div className="container">
                <div className="feedback">
                    <h1 className="head"><img src="/undraw_feedback_h2ft.svg" class="img-fluid image" alt="feedback img"></img> &nbsp;FEEDBACK</h1>
                    <div class="mb-3 space">
                        <label for="exampleFormControlInput1" class="form-label">SUBJECT</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
                    </div>
                    <div class="mb-3 space">
                        <label for="exampleFormControlTextarea1" class="form-label">CONTENT</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                    </div>
                    <div className="col-12 button">
                        <button type="submit" className="btn btn-primary button">SUBMIT</button>
                    </div>
                </div>
            </div>


        </div>




    );
}

export default Feedback;