import YAML from 'js-yaml';
import React from 'react';
import { render } from 'react-dom';
import YamlEditor from './components/YamlEditor.jsx';
import _ from 'lodash';
import {init} from './redux/init.js';


let yaml = document.querySelector("#source");
//let js = document.querySelector("#result");
let reactForm = document.querySelector(".app");

let SexyYamlType = new YAML.Type('!sexy', {
  kind: 'sequence', // See node kinds in YAML spec: http://www.yaml.org/spec/1.2/spec.html#kind//
  construct: function (data) {
    return data.map(function (string) { return 'sexy ' + string; });
  }
});
let SEXY_SCHEMA = YAML.Schema.create([ SexyYamlType ]);

function updateYAML(js){
  yaml.value = YAML.safeDump(js);
}

function YAMLupdate(){
  console.log("updating YAML");
  let jsObj = YAML.load(yaml.value, { schema: SEXY_SCHEMA });
  renderApp(jsObj);
}

function renderApp(jsObj){
  render(
      <YamlEditor yaml={jsObj} exportChange={updateYAML}/>,
    document.querySelector('.app'));
}

export function handleDOMchanges() {
  renderApp(init.obj)
  yaml.addEventListener("input",_.debounce(YAMLupdate,500));
  updateYAML(init.obj);
}

//Drag and drop module
let dropZone = document.querySelector('#drop');

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    let files = evt.dataTransfer.files;
    let reader = new FileReader();
    reader.onload = function(event) {
         yaml.value = event.target.result.replace(/[\-]{3}\n/g, "").replace(/\n[\-]{3}/g, "");
         yaml.dispatchEvent(new Event('input'));
         removeDragClass();
    };
    reader.readAsText(files[0],"UTF-8");
  }

//On dragover stance, specify copy of textfile
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }

//when entering the dragover stance, add CSS class
function addDragClass(){
    dropZone.className = "draghover";
  }
//when leaving the dragover stance, remove the CSS class
  function removeDragClass(){
    dropZone.className = "";
  }

  // Setup the dnd listeners.
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  dropZone.addEventListener('dragenter', addDragClass, false);
  dropZone.addEventListener('dragleave', removeDragClass, false);
  document.querySelector("#download").addEventListener('click',saveTextAsFile,false);

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
function saveTextAsFile()
{
    let textToWrite = "---\n"+yaml.value+"\n---"
    let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

    let fileNameToSaveAs = _.get(store.getState().obj,"id_sp","default");
    if(fileNameToSaveAs == ""){fileNameToSaveAs = "default"}
    fileNameToSaveAs += ".yaml";

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
