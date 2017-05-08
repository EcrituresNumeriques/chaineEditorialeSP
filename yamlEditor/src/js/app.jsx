import YAML from 'js-yaml';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { store } from './redux/store.js'
import { TextInput } from './components/TextInput.jsx'
import _ from 'lodash'
import '../css/demo.css'

function Metadonnees(){
  return(
    <section>
      <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" />
      <TextInput target="title" title="Titre" />
      <TextInput target="subtitle" title="Sous-titre" />
      <Resumes/>
    </section>
  )
}

function Resumes(){
  let resumes = _.get(store.getState().obj,"abstract",[]);
  return(
    <section>{resumes.map((o,i)=>(<Resume key={i} index={i}/>))}</section>
  )
}
function Resume(props){
  return(
    <section>
      <TextInput target={"abstract["+props.index+"].text"} title="Résumé" element="textArea"/>
      <LanguageSelect target={"abstract["+props.index+"].lang"}/>
    </section>
  )
}
function LanguageSelect(){
  return(
    <p>lang</p>
  )
}


function keywords(){
  return(
    <section>

    </section>
  )
}

function App(){
  return(
    <div>
      <Metadonnees />

    </div>
  )
}
function renderApp(){
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app'));
}

var yaml = document.querySelector("#source");
var js = document.querySelector("#result");


document.addEventListener("DOMContentLoaded", function(event) {

  renderApp()
  store.subscribe(renderApp)
});



console.log(YAML.safeDump({test:"ok"}));
