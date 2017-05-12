import YAML from 'js-yaml';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { App } from './components/App.jsx'
import _ from 'lodash'


let yaml = document.querySelector("#source");
let js = document.querySelector("#result");
let reactForm = document.querySelector(".app");

let SexyYamlType = new YAML.Type('!sexy', {
  kind: 'sequence', // See node kinds in YAML spec: http://www.yaml.org/spec/1.2/spec.html#kind//
  construct: function (data) {
    return data.map(function (string) { return 'sexy ' + string; });
  }
});
var SEXY_SCHEMA = YAML.Schema.create([ SexyYamlType ]);

function renderApp(){
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app'));
  }

export function handleDOMchanges() {
  let active_element = "react";
  renderApp()
  objUpdate()

  store.subscribe(renderApp);
  store.subscribe(objUpdate);

  yaml.addEventListener("input",_.debounce(YAMLupdate,500));
  yaml.addEventListener("click",function(){active_element = "yaml"});
  js.addEventListener("input",_.debounce(JSupdate,500));
  js.addEventListener("click",function(){active_element = "js"});
  reactForm.addEventListener("click",function(){active_element = "react"});


  function updateYAML(){
    yaml.value = YAML.safeDump(store.getState().obj);
    //console.log('updating Yaml');
  }

  function updateJS(){
    js.value = JSON.stringify(store.getState().obj,false,1);
    //console.log('updating JS');
  }

  function YAMLupdate(){
    let obj = YAML.load(yaml.value, { schema: SEXY_SCHEMA });
    store.dispatch({type:"YAML_UPDATE",obj:obj});
  }

  function JSupdate(){
    let obj = JSON.parse(js.value);
    store.dispatch({type:"JS_UPDATE",obj:obj});
  }


  function objUpdate(){
    if(active_element != "yaml"){updateYAML();}
    if(active_element != "js"){updateJS();}
  }
}
