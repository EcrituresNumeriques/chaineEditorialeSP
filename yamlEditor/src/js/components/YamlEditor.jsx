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
import _ from 'lodash';
import {init} from '../redux/init.js';
require('./../../logo.png')


export default class YamlEditor extends Component {
  constructor(props){
    super(props);
    this.state = {obj:_.get(props,'yaml',{}),misc:init.misc};
    this.updateState = this.updateState.bind(this);
    this.updateMisc = this.updateMisc.bind(this);
  }

  componentWillReceiveProps(nextProp){
      this.updateState(nextProp.yaml);
  }

  componentWillUpdate(nextProp,nextState){
    this.props.exportChange(nextState.obj);
  }

  updateState(value,target = undefined){
    //No target, update the whole state, don't export
    if(!target){
      this.setState({obj:value});
    }
    //Update only the key changed, plus export the new state
    else{
      //console.log("changing key",target,value);
      this.setState((state)=>_.set(state, 'obj.'+target, value));
    }
  }
  updateMisc(value,target,type){
    //Update only the key changed, plus export the new state
      //console.log("changing key",target,value);
      this.setState((state)=>_.set(state, 'misc.'+target, value));
      //Need to calculate the next state.obj
      if(type=="rubriques"){
        this.setState((state)=>_.set(state,'obj.typeArticle',state.misc.rubriques.filter((r)=>(r.selected)).map(r=>r.label)));
      }
  }

  render(){
    return(
      <section>
        <TextInput target="id_sp" alias={[{target:'bibtex',prefix:'',suffix:'.bib'}]} title="Identifiant" placeholder="SPxxxx" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="title" title="Titre" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="subtitle" title="Sous-titre" state={this.state.obj} updateState={this.updateState} />
        <Date target="date" title="Date" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="url_article_sp" title="URL sens public" placeholder="http://sens-public.org/articleXXXX.html" state={this.state.obj} updateState={this.updateState} />
        <Resumes state={this.state.obj} updateState={this.updateState} />
        <Dossier state={this.state.obj} updateState={this.updateState} />
        <Authors state={this.state.obj} updateState={this.updateState} />
        <Reviewers state={this.state.obj} updateState={this.updateState} />
        <ControlledKeywords state={this.state.obj} updateState={this.updateState} />
        <Keywords state={this.state.obj} updateState={this.updateState} />
        <Rubriques state={this.state} updateState={this.updateState} updateMisc={this.updateMisc} />
      </section>
    )
  }
}
