import { TextInput } from './TextInput.jsx'
import { SelectInput } from './SelectInput.jsx'
import { store } from '../redux/store.js'
import React from 'react'
import _ from 'lodash'

export function Resumes(){
  let resumes = _.get(store.getState().obj,"abstract",[]);
  return(
    <section>{resumes.map((o,i)=>(<Resume key={i} index={i}/>))}</section>
  )
}

function Resume(props){
  return(
    <section className="group">
      <TextInput target={"abstract["+props.index+"].text"} title="Résumé" element="textArea"/>
      <SelectInput target={"abstract["+props.index+"].lang"} title="Language" placeholder="Choisir la langue du résumé" options={['fr','en','it']}/>
    </section>
  )
}
