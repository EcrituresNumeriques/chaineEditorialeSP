import { CheckBoxInput } from './CheckBoxInput.jsx'
import { store } from '../redux/store.js'
import React from 'react'
import _ from 'lodash'

export function Keywords(){
  let selected = _.get(store.getState().misc,"selectedCategories",[]);
  let uncontrolledKeywords = _.get(store.getState().misc,"uncontrolledKeywords",[]);
  let categories = _.get(store.getState().misc,"categories",[]);
  return(
      <section className="group">
        <h1><i className="fa fa-tag" aria-hidden="true"></i> Mots clés</h1>
        <datalist id="keywordsFR">
          {categories.map((o,i)=>(<option key={"keywordsFR"+i} value={o.fr}/>))}
        </datalist>
        <datalist id="keywordsEN">
          {categories.map((o,i)=>(<option key={"keywordsEN"+i} value={o.en}/>))}
        </datalist>
        {selected.map((o,i)=>(<Keyword key={"keywords"+i} index={i} object={o} controlled={true} />))}
        {uncontrolledKeywords.map((o,i)=>(<Keyword key={"keywords"+i} index={i} object={o} controlled={false} />))}
        <InputKeyword />
      </section>
    )
  }

  function Keyword(props){
    return(
      <div className="keywords">
        <input className={props.controlled ? "controlled":"free"} type="text" placeholder="FR" value={props.object.fr} readOnly="true"/>
        <input className={props.controlled ? "controlled":"free"} type="text" placeholder="EN" value={props.object.en} readOnly="true"/>
        <i className="fa fa-minus-circle" aria-hidden="true" data-id={props.index}></i>
      </div>
    )
  }

class InputKeyword extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  checkValue(event) {
    let Categories = store.getState().misc.categories;
    for(let i=0;i<Categories.length;i++){
      if(Categories[i].fr===event.target.value){
        store.dispatch({type:"MISC_UPDATE",target:"categories["+i+"].selected", value:true});
        event.target.value="";
      }
    }
    //let answer = event.target.checked;
  }

  render() {
    return(
      <div className="keywords">
        <input type="text" placeholder="mot clé" list="keywordsFR" onBlur={this.checkValue.bind(this)}/>
        <input type="text" placeholder="keyword" list="keywordsEN"/>
        <i className="fa fa-check validate" aria-hidden="true" data-id={this.props.index}></i>
      </div>
    )
  }
}
