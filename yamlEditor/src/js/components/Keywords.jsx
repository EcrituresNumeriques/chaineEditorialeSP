import React from 'react'
import _ from 'lodash'

export function Keywords(props){
  let keywords_fr = _.get(props.state,"keywords_fr",[]);
  let keywords_en = _.get(props.state,"keywords_en",[]);
  return(
      <section className="group">
        <h1><i className="fa fa-tag" aria-hidden="true"></i> Mots clés</h1>
        {uncontrolledKeywords.map((o,i)=>(<Keyword key={"keywords"+i} index={i} object={o} controlled={false} />))}
        <InputKeyword />
      </section>
    )
  }

  class Keyword extends React.Component{

    constructor(props) {
      super(props);
    }

    removeKeyword(controlled){
      if(this.props.controlled){
       store.dispatch({type:"MISC_UPDATE",target:"controlledKeywords["+this.props.index+"].selected", value:false});
      }
      else{
        let uncontrolledKeywords = store.getState().misc.uncontrolledKeywords;
        uncontrolledKeywords.splice(this.props.index, 1);
        store.dispatch({type:"MISC_UPDATE",target:"uncontrolledKeywords", value:uncontrolledKeywords});
      }
    }

    render() {
      return(
        <div className="keywords">
          <input className={this.props.controlled ? "controlled":"free"} type="text" placeholder="FR" value={this.props.object.label} readOnly="true"/>
          <i className="fa fa-minus-circle" aria-hidden="true" data-id={this.props.index} onClick={this.removeKeyword.bind(this)}></i>
        </div>
      )
    }
  }


class InputKeyword extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  checkValueFR(event) {
    let Categories = store.getState().misc.categories;
    for(let i=0;i<Categories.length;i++){
      if(Categories[i].label===event.target.value){
        store.dispatch({type:"MISC_UPDATE",target:"categories["+i+"].selected", value:true});
        event.target.value="";
      }
    }
  }

  addKeyword(event){
    //Add uncontrolled keyword
    let index = store.getState().misc.uncontrolledKeywords.length;
    store.dispatch({type:"MISC_UPDATE",target:"uncontrolledKeywords["+index+"]", value:{label:event.target.parentNode.querySelector("#kwFR").value}});
    event.target.parentNode.querySelector("#kwFR").value = "";
  }

  render() {
    return(
      <div className="keywords">
        <input type="text" id="kwFR" placeholder="mot clé" onBlur={this.checkValueFR.bind(this)}/>
        <input type="text" id="kwEN" placeholder="Keyword" onBlur={this.checkValueFR.bind(this)}/>
        <i className="fa fa-check validate" aria-hidden="true" data-id={this.props.index} onClick={this.addKeyword.bind(this)}></i>
      </div>
    )
  }
}
