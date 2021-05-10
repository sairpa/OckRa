import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Card from './Card';
import Profile from './Profile';
import Feedback from './Feedback';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Logout from './Logout';


function App() {
  return (
    <Router>

    <div className="App">

      <Header />
      <main >
        <div class="row m-0">
          <div class="col-3 bg-light p-0">
            <Sidebar />{/*
            <Switch>
            <Route path="/Profile" component={Profile}/>
            <Route path="/Feedback" component={Feedback}/>
            </Switch>*/}
          </div>
          <Switch>
            <Route path="/" exact component={Card}/>
            <Route path="/Profile" exact component={Profile}/>
            <Route path="/Feedback" exact component={Feedback}/>
            <Route path="/Logout" exact component={Logout}/>
            
          </Switch>

          
         { /*<div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Card/></div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
          </div>
          </div>      */}  
          

      </div>
      </main>
    </div>
    </Router>
  );
}

export default App;
