import { CheckBoxInput } from './CheckBoxInput.jsx'
import React from 'react'
import _ from 'lodash'

export function Rubriques(props){
  let rubriques = _.get(props.state,"misc.rubriques",[]);
  return(
      <section className="group">
        <h1><i className="fa fa-check-square-o" aria-hidden="true"></i> Catégories</h1>
        {rubriques.map((o,i)=>(<Rubrique key={i} index={i} label={o.label} value={o.selected} updateMisc={props.updateMisc}/>))}
      </section>
    )
  }

  function Rubrique(props){
    return(
        <CheckBoxInput target={"rubriques["+props.index+"].selected"} title={props.label} value={props.value} updateMisc={props.updateMisc}/>
    )
  }
