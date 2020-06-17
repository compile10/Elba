import React, { useState, useEffect } from 'react';
import './App.css';
import { IParticlesParams } from "react-particles-js";
import Particles from "react-particles-js";

interface SearchResult {
	website: string;
	searchValue: string;
};

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

	const searchWebsites = (searchTerms: Array<SearchResult>): void => {
		while(searchTerms.length !== 0) {
			let searchTerm: SearchResult = searchTerms.pop()!;
			console.log(searchTerm);
			switch(searchTerm.website){
				case "dcc":
					window.open(`https://duckduckgo.com/?q=${searchTerm.searchValue}`);
					break;
				case "g":
					window.open(`https://www.google.com/search?q=${searchTerm.searchValue}`);
					break;
				default:
					break;
			}
		}
	}

	const checkFlags = (enteredValue: string): Array<SearchResult> => {
		let commands: Array<string> = enteredValue.split(" && ");
		let searchesToExecute: Array<SearchResult> = [];
		while(commands.length !== 0) {
			let regexFlags = /-(\w+)\s([\w|\d|\s]*)/g;
			let commandString = commands.pop();
			let foundFlags = regexFlags.exec(commandString as string);
			if(foundFlags == null || foundFlags.length <= 2){
				continue;
			}
			let flagSite: string = foundFlags![1];
			switch(flagSite){
				case "dcc":
					console.log("dsasdasda 12132231");
					searchesToExecute.push({website: flagSite, 
						                    searchValue: foundFlags![2]});
					break;
				case "g":
					searchesToExecute.push({website: flagSite, 
						                    searchValue: foundFlags![2]});
					break;
				default:
					break;
			}
		}
		return searchesToExecute;
        
	}

	const enterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.which === 13 /* Enter */) {
		  event.preventDefault();
		  let termsToSearch: Array<SearchResult> = checkFlags(value);
		  searchWebsites(termsToSearch);
		  setValue("");
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
