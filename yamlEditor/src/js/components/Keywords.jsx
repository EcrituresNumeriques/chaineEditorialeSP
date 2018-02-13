import React from 'react'
import _ from 'lodash'

export function Keywords(props){
  let keyword_fr = _.get(props.state,"obj.keyword_fr",'');
  let keyword_en = _.get(props.state,"obj.keyword_en",'');

  if(!Array.isArray(keyword_en)){keyword_en = keyword_en == '' ? []:keyword_en.split(',')}
  else{props.updateState(keyword_en.join(','),'keyword_en')}
  if(!Array.isArray(keyword_fr)){keyword_fr = keyword_fr == '' ? []:keyword_fr.split(',')}
  else{props.updateState(keyword_en.join(','),'keyword_fr')}

  //If imported, add in misc state
  if(props.state.misc.keywords_fr.length != keyword_fr.length){props.updateMisc(keyword_fr,'keywords_fr');}
  if(props.state.misc.keywords_en.length != keyword_en.length){props.updateMisc(keyword_en,'keywords_en');}

  let uncontrolledKeywords = [];
  for(let i=0;i<keyword_fr.length || i<keyword_en.length;i++){
    uncontrolledKeywords.push({fr:_.get(keyword_fr,"["+i+"]",""),en:_.get(keyword_en,"["+i+"]","")});
  }
  return(
      <section className="group">
        <h1><i className="fa fa-tag" aria-hidden="true"></i> Mots clés</h1>
        {uncontrolledKeywords.map((o,i)=>(<Keyword key={"keywords"+i} index={i} object={o} removeKeyword={props.removeKeyword} updateMisc={props.updateMisc}/>))}
        <InputKeyword state={props.state.misc} addKeyword={props.addKeyword} updateMisc={props.updateMisc}/>
      </section>
    )
  }

  function Keyword(props){


      return(
        <div className="keywords">
          <input className="free" type="text" placeholder="FR" value={props.object.fr} onChange={(e)=>props.updateMisc(e.target.value,'keywords_fr[' + props.index + ']','uncontrolledKeywords')}/>
          <input className="free" type="text" placeholder="EN" value={props.object.en} onChange={(e)=>props.updateMisc(e.target.value,'keywords_en[' + props.index + ']','uncontrolledKeywords')}/>
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
