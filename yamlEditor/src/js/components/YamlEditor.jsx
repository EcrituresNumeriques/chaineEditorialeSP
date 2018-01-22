import React, { Component } from 'react';
import { TextInput } from './TextInput.jsx';
import { Resumes} from './Resumes.jsx';
import { Authors } from './Authors.jsx';
import { Dossier } from './Dossier.jsx';
import { Reviewers } from './Reviewers.jsx';
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
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
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
      //Need to decompile rubriques/MotsClefs
      this.setState(function(state){
        //set all rubriques to not selected then select from yaml
        state.misc.rubriques.map((r)=>(r.selected=false));
        state.obj.typeArticle.map(function(r){
          state.misc.rubriques.filter((o)=>(o.label==r)).map((o)=>(o.selected=true));
          return r;
        });
        //Set all controlled keyword to not selected then select from yaml
        state.misc.categories.map((c)=>(c.selected=false));
        state.obj.controlledKeywords.map(c=>c.label).map(function(c){
          state.misc.categories.filter((o)=>(o.label==c)).map((o)=>(o.selected=true));
          return c;
        });
        return state;
      });



    }
    //Update only the key changed, plus export the new state
    else{
      //console.log("changing key",target,value);
      this.setState((state)=>_.set(state, 'obj.'+target, value));
    }
  }
  updateMisc(value,target,type = undefined){
    //Update only the key changed, plus export the new state
      //console.log("changing key",target,value);
      this.setState((state)=>_.set(state, 'misc.'+target, value));
      //Need to calculate the next state.obj
      if(type=="rubriques"){
        this.setState((state)=>_.set(state,'obj.typeArticle',state.misc.rubriques.filter((r)=>(r.selected)).map(r=>r.label)));
      }
      else if(type=="controlledKeywords"){
        //Check if a controlled keyword match the search
        this.setState(function(state){
            let toSet = state.misc.categories.filter((c)=>(c.label==value));
            if(toSet.length > 0){
              toSet.map(c=>c.selected=true);
              state.misc.keywordSearch = "";
              state.obj.controlledKeywords = state.misc.categories.filter((c)=>c.selected).map((o)=>(Object.assign({},o))).map(function(o){delete o.selected;return o;});
            }
            return state;
          });
      }
      else if (type=="removeControlled") {
        this.setState(function(state){
            state.obj.controlledKeywords = state.misc.categories.filter((c)=>c.selected).map((o)=>(Object.assign({},o))).map(function(o){delete o.selected;return o;});
            return state;
          });
      }
  }
  addKeyword(values){
    //Update only the key changed, plus export the new state
      console.log("adding",this.state.misc.keyword_fr,this.state.misc.keyword_en);
      this.setState(function(state){
        //Padd arrays in case they are not the same length
        while(state.obj.keyword_en.length < state.obj.keyword_fr.length){
          state.obj.keyword_en.push("");
        }
        while(state.obj.keyword_fr.length < state.obj.keyword_en.length){
          state.obj.keyword_fr.push("");
        }

        //Add new keyword
        state.obj.keyword_fr.push(this.state.misc.keyword_fr || "");
        state.obj.keyword_en.push(this.state.misc.keyword_en || "");
        state.misc.keyword_fr = "";
        state.misc.keyword_en = "";
        return state;
      });
  }
  removeKeyword(index){
    //Update only the key changed, plus export the new state
      console.log("removing",index);
      this.setState(function(state){
        state.obj.keyword_fr.splice(index,1);
        state.obj.keyword_en.splice(index,1);
        return state;
      });
  }



  render(){
    return(
      <section>
        <TextInput target="id_sp" alias={[{target:'bibliography',prefix:'',suffix:'.bib'}]} title="Identifiant" placeholder="SPxxxx" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="title" title="Titre" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="subtitle" title="Sous-titre" state={this.state.obj} updateState={this.updateState} />
        <Date target="date" title="Date" state={this.state.obj} updateState={this.updateState} />
        <TextInput target="url_article_sp" title="URL sens public" placeholder="http://sens-public.org/articleXXXX.html" state={this.state.obj} updateState={this.updateState} />
        <Resumes state={this.state.obj} updateState={this.updateState} />
        <Dossier state={this.state.obj} updateState={this.updateState} />
        <Authors state={this.state.obj} updateState={this.updateState} />
        <Reviewers state={this.state.obj} updateState={this.updateState} />
        <ControlledKeywords state={this.state.misc} updateMisc={this.updateMisc} />
        <Keywords state={this.state} updateMisc={this.updateMisc} addKeyword={this.addKeyword} removeKeyword={this.removeKeyword} />
        <Rubriques state={this.state.misc} updateMisc={this.updateMisc} />
      </section>
    )
  }
}
