import YAML from 'js-yaml';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { store } from './redux/store.js'
import { TextInput } from './components/TextInput.jsx'
import { SelectInput } from './components/SelectInput.jsx'
import { Resumes} from './components/Resumes.jsx'
import _ from 'lodash'
import '../css/demo.css'
import { yaml, js } from './DOMselector.js'

function App(){

  return(
    <section>
      <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" />
      <TextInput target="title" title="Titre" />
      <TextInput target="subtitle" title="Sous-titre" />
      <Resumes/>
    </section>
  )
}

function keywords(){
  return(
    <section>

    </section>
  )
}

function renderApp(){
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app'));
}


function updateYAML(){
  yaml.value = YAML.safeDump(store.getState().obj);
  //console.log('updating Yaml');
}
function updateJS(){
  js.value = JSON.stringify(store.getState().obj,false,1);
  //console.log('updating JS');
}

function formUpdate(){
  console.log("updating from react form");
  updateYAML();
  updateJS();
}



document.addEventListener("DOMContentLoaded", function(event) {
  renderApp()
  formUpdate()
  store.subscribe(renderApp);
  store.subscribe(_.debounce(formUpdate,500));
});
