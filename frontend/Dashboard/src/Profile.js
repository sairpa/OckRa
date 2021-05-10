import './Profile.css';
function Profile() {
    return (

        <div className="App">
            <div className="container">



                <div className="profile">



                    <h1 className="heading" > <img src="/undraw_Profile_data_re_v81r.svg" class="img-fluid image" alt="profile img"></img> &nbsp;MY PROFILE </h1>

                    <form className="row g-3">
                        <div className="col-md-6 space">
                            <label htmlFor="inputEmail4" className="form-label">NAME</label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-md-6 space">
                            <label htmlFor="inputPassword4" className="form-label">ROLL NUMBER</label>
                            <input type="text" className="form-control" id="inputPassword4" />
                        </div>
                        <div className="col-md-6 space">
                            <label htmlFor="inputEmail4" className="form-label">MOBILE NUMBER</label>
                            <input type="number" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-md-6 space">
                            <label htmlFor="inputPassword4" className="form-label">BATCH </label>
                            <input type="text" className="form-control" id="inputPassword4" />
                        </div>
                        <div className="col-12 space">
                            <label htmlFor="inputAddress" className="form-label">EMAIL</label>
                            <input type="email" className="form-control" id="inputAddress" placeholder="@gmail.com" />
                        </div>
                        <div className="col-12 space">
                            <label htmlFor="inputAddress2" className="form-label">ADDRESS </label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="col-md-6 space">
                            <label htmlFor="inputCity" className="form-label">CITY</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        {/*
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">State</label>
    <select id="inputState" className="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>*/}
                        <div className="col-md-2 space">
                            <label htmlFor="inputZip" className="form-label">PINCODE</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        {/*
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck" />
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
    </div>*/}
                        <div className="col-12 button">
                            <button type="submit" className="btn btn-primary">UPDATE</button>
                        </div>
                    </form>



                </div>
            </div>

        </div>
    );
}

export default Profile;
