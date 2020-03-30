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
				<h1>The time is <Time/>.</h1>
			</div>
	  </div>

    </div>
  );
}


export default App;
