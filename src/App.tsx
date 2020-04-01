import React, { useState, useEffect } from 'react';
import './App.css';
import { IParticlesParams } from "react-particles-js";
import Particles from "react-particles-js";

let options: IParticlesParams  = {
	    particles: {
	        number: {
				value: 80,
				density: {
					enable: true,
					value_area: 1100
				}
	
			},
	        size: {
	            value: 2
			},
			line_linked: {
				distance: 200
			},
			move: {
				speed: 1.5,
				out_mode: 'out'
			},
	    },
	    interactivity: {
	        events: {
	            onhover: {
	                enable: true,
	                mode: "repulse"
	            }
	        }
	    }
	}

function Time() {
	const [time, setTime] = useState(new Date());

	const tick = () => {
		setTime(new Date());
	}
	
	useEffect(() => { 
		var timer = setInterval( () => tick(), 1000 );
		return function cleanup() {
			clearInterval(timer);
		};
	})

	let regexTime = (time.toLocaleTimeString()).replace(/:\d+ /, ' ');;
	return (
		<>{regexTime}</>
	);
}
	  

function SearchBar() {
	const [value, setValue] = useState('');


	const enterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.which === 13 /* Enter */) {
		  event.preventDefault();
		  window.location.href = `https://www.google.com/search?q=${value}`
		}
	  }
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}
	
	return (
			<form>
				<div className="searchBorder">
				<input type="text" className="searchbar" placeholder="Search internet"  onChange={handleChange } onKeyPress={enterKey} />
				</div>
			</form>
	
	);
}
	  


function App() {

  return (
    <div className="App">
      <header className="App-header">
	  <Particles 
	  			
				params={options}
				canvasClassName={'particles-js'}
               />
      </header>
	  <div className="grid">
			<div className="timedate">
				<h1 id="time">The time is <Time/>.</h1>
				<SearchBar/>
			</div>
			
	  </div>

    </div>
  );
}


export default App;
