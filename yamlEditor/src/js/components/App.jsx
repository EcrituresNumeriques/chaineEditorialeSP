import React, { Component } from 'react';
import { TextInput } from './TextInput.jsx';
import { SelectInput } from './SelectInput.jsx';
import { Resumes} from './Resumes.jsx';
import { Authors } from './Authors.jsx';
import { Dossier } from './Dossier.jsx';
import { Reviewers } from './Reviewers.jsx';
import { Collaborateurs} from './Collaborateurs.jsx';
import { MotsClefs} from './MotsClefs.jsx';
import { Date} from './Date.jsx';
import { Rubriques} from './Rubriques.jsx';
import { Keywords} from './Keywords.jsx';
import { Types} from './Types.jsx';
require('./../../logo.png')


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = props.yaml?props.yaml:{};
    this.updateState = this.updateState.bind(this);
  }

  componentWillReceiveProps(nextProp){
      //console.log("need to update");
      this.updateState(nextProp.yaml);
  }

  componentWillUpdate(NextProp, NextState){
    //just a check
    //console.log("newState",NextState);
  }

  updateState(value,target = undefined){
    //No target, update the whole state
    if(!target){
      this.setState(value);
    }
    //Update only the key
    else{
      this.setState({[target]:value});
    }
  }

  render(){
    return(
      <section>
        <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" state={this.state} updateState={this.updateState} />
        <TextInput target="title" title="Titre" state={this.state} updateState={this.updateState} />
        <TextInput target="subtitle" title="Sous-titre" state={this.state} updateState={this.updateState} />
        <Date target="date" title="Date" state={this.state} updateState={this.updateState} />
        <Resumes state={this.state} updateState={this.updateState} />
        <Dossier state={this.state} updateState={this.updateState} />
        <Authors state={this.state} updateState={this.updateState} />
        <Reviewers state={this.state} updateState={this.updateState} />
        <Keywords state={this.state} updateState={this.updateState} />
        <Rubriques state={this.state} updateState={this.updateState} />
      </section>
    )
  }
}
