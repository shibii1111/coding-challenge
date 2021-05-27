import './App.css';
import {Button, TextField} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import Axios from "axios";
import { useState } from 'react';

function App() {
  const [ninjaName, setNinjaName] = useState([])
  const buzzWordsList = []
  const endPointURL = process.env.API_URL

  /* Connects the API, uses the current value of the Autocomplet and feeds it to the API URL to retrieve the proper result */
  const getNinja = () => {
    let buzzWordSearched = document.getElementById('buzzSearch').value;
    if (!buzzWordSearched){
      alert("Nice try!")
    }
    else{     
      /* Feed the search with the buzz words*/ 
      Axios.get(endPointURL + "?buzz_word="+buzzWordSearched).then(
        (response) => {
          if (response.data[0] !== undefined){
            if(response.data[0].buzz_word === "Konami"){
              alert("The password is : konamicode")
              window.open(process.env.ITCH_URL);
              setNinjaName("");
              document.getElementById('buzzSearch').value = "";
            }
            else{
              setNinjaName(response.data[0].first_name + " " + response.data[0].last_name)
            }
          }
          else{
            /* Some safety to avoid trying to get a word that isn't part of the buzz words list */
            alert("buzzword doesn't exist!");
            setNinjaName("");
            document.getElementById('buzzSearch').value = "";
          }
        }
      ); 
   }   
  };
  
  /* Retrieves the buzz words from ther API and append them in an array to feed the Autocomplete aka the search */
  const getBuzzWords = () => {
    Axios.get(endPointURL).then(
      (response) => {
        for (const i in response.data){
          buzzWordsList.push(response.data[i].buzz_word)
        }
      }
    )
  }

  return (
    <div className="App" onLoad={getBuzzWords()}>
      <div className="mainBody">    
        <div className="gameboy">     
          <Autocomplete
              id="buzzSearch"
              className="searchBuzzWord"
              options={buzzWordsList}
              style={{ width: 220, backgroundColor: "white", justifyContent: "center"}}
              renderInput={(params) => <TextField {...params}  variant="outlined" color="primary"/>}
          />
          <Button className="submitButton" style={{ backgroundColor: "#fd8140"}} variant="contained"  onClick={getNinja} >Submit</Button>
          <p className="ninjaNameResult">
          { ninjaName }
          </p>
        </div>  
      </div>
    </div>
  );
}

export default App;
