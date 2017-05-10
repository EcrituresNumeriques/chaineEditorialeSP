import React from 'react'
import { TextInput } from './TextInput.jsx'
import { SelectInput } from './SelectInput.jsx'
import { Resumes} from './Resumes.jsx'

export function App(){
  return(
    <section>
      <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" />
      <TextInput target="title" title="Titre" />
      <TextInput target="subtitle" title="Sous-titre" />
      <Resumes/>
    </section>
  )
}
