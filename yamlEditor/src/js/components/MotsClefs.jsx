import { TextInput } from './TextInput.jsx'
import { SelectInput } from './SelectInput.jsx'
import { store } from '../redux/store.js'
import React from 'react'
import _ from 'lodash'

export function MotsClefs(){
  let resumes = _.get(store.getState().obj,"abstract",[]);
  let targetNewResume = resumes.length;
  return(
    <section>
      <TextInput title="MotsClefs"/>
    </section>
  )
}
