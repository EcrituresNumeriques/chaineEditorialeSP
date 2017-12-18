import React from 'react'
import _ from 'lodash'

export function Keywords(props){
  let keywords_fr = _.get(props.state,"obj.keywords_fr",[]);
  let keywords_en = _.get(props.state,"obj.keywords_en",[]);
  let uncontrolledKeywords = [];
  for(let i=0;i<keywords_fr.length || i<keywords_en.length;i++){
    uncontrolledKeywords.push({fr:_.get(keywords_fr,"["+i+"]",""),en:_.get(keywords_en,"["+i+"]","")});
  }
  return(
      <section className="group">
        <h1><i className="fa fa-tag" aria-hidden="true"></i> Mots clés</h1>
        {uncontrolledKeywords.map((o,i)=>(<Keyword key={"keywords"+i} index={i} object={o} removeKeyword={props.removeKeyword}/>))}
        <InputKeyword state={props.state.misc} addKeyword={props.addKeyword} updateMisc={props.updateMisc}/>
      </section>
    )
  }

  function Keyword(props){


      return(
        <div className="keywords">
          <input className="free" type="text" placeholder="FR" value={props.object.fr} readOnly="true"/>
          <input className="free" type="text" placeholder="EN" value={props.object.en} readOnly="true"/>
          <i className="fa fa-minus-circle" aria-hidden="true" data-id={props.index} onClick={()=>props.removeKeyword(props.index)}></i>
        </div>
      )
  }


function InputKeyword(props){
    return(
      <div className="keywords">
        <input type="text" id="kwFR" placeholder="mot clé" value={_.get(props.state,"keyword_fr","")} onInput={(e)=>props.updateMisc(e.target.value,'keyword_fr')}/>
        <input type="text" id="kwEN" placeholder="Keyword" value={_.get(props.state,"keyword_en","")} onInput={(e)=>props.updateMisc(e.target.value,'keyword_en')}/>
        <i className="fa fa-check validate" aria-hidden="true" onClick={()=>props.addKeyword()}></i>
      </div>
    )
}
