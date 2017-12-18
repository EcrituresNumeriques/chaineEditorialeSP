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
import { ControlledKeywords} from './ControlledKeywords.jsx';
import { Keywords} from './Keywords.jsx';
import { Types} from './Types.jsx';
import _ from 'lodash';
require('./../../logo.png')


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = props.yaml || {};
    this.updateState = this.updateState.bind(this);
  }

  componentWillReceiveProps(nextProp){
      this.updateState(nextProp.yaml);
  }

  componentWillUpdate(nextProp,nextState){
    this.props.exportChange(nextState);
  }

  updateState(value,target = undefined){
    //No target, update the whole state, don't export
    if(!target){
      this.setState(value);
    }
    //Update only the key changed, plus export the new state
    else{
      //console.log("changing key",target,value);
      this.setState((state)=>_.set(state, target, value));
    }
  }

  render(){
    return(
      <section>
        <TextInput target="id_sp" alias={[{target:'bibtex',prefix:'',suffix:'.bib'}]} title="Identifiant" placeholder="SPxxxx" state={this.state} updateState={this.updateState} />
        <TextInput target="title" title="Titre" state={this.state} updateState={this.updateState} />
        <TextInput target="subtitle" title="Sous-titre" state={this.state} updateState={this.updateState} />
        <Date target="date" title="Date" state={this.state} updateState={this.updateState} />
        <TextInput target="url_article_sp" title="URL sens public" placeholder="http://sens-public.org/articleXXXX.html" state={this.state} updateState={this.updateState} />
        <Resumes state={this.state} updateState={this.updateState} />
        <Dossier state={this.state} updateState={this.updateState} />
        <Authors state={this.state} updateState={this.updateState} />
        <Reviewers state={this.state} updateState={this.updateState} />
        <ControlledKeywords state={this.state} updateState={this.updateState} />
        <Keywords state={this.state} updateState={this.updateState} />
        <Rubriques state={this.state} updateState={this.updateState} />
      </section>
    )
  }
}
