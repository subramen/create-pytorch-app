import './App.css';
import React, { useState } from 'react'

const API_BASE_URL = '/api/'

function App() {
  const [output, setOutput] = useState('');

  function getPrediction(url) {
    const endpoint = API_BASE_URL+ "predict?url=" + url;
    if (url !== '') {
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setOutput(data['response']);
          console.log(JSON.stringify(data));
        })
        .catch(error => console.error(error));
    }
    return true;
  }
  
  function UserInput({ getPrediction }) {
    const [input, setInput] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (input !== '') getPrediction(input);
    };
  
    return (
      <div className="user-input">
        <h3 align="left">Enter an image url:</h3>
        <div className="wrap">
          <input type="text" className="search-bar" placeholder="Paste URL here" onChange={(e) => { setInput(e.target.value) }}/>
          <span className="btn_progress">
            <button onClick={handleSubmit}>Go</button>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <UserInput getPrediction={getPrediction} />
        {output !== ''? <div>{JSON.stringify(output)}</div> : null}
      </header>
    </div>
  );
}

export default App;
