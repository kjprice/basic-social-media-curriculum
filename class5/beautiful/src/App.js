import React from 'react';
import logo from './logo.svg';
import './App.css';

function onSubmit(evt) {
  console.log('yay'); 
  evt.preventDefault()
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-sm-4">
                One of three columns
              </div>
              <div className="col-sm-4">
                One of three columns
              </div>
              <div className="col-sm-4">
                One of three columns
              </div>
              <button type="button" className="btn btn-primary" onClick={() => alert('Hello')}>Primary</button>
            </div>

            <div className="container">
                <div className="row">
                  <div className="col">
                    <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                      Link with href
                    </a>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Button with data-target
                    </button>
                  </div>
                </div>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </div>
            </div>

          </div>
          <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            title="I am a link"
          >
            Learn React
          </a>
        </div>
      </div>

    </div>
  );
}

export default App;
