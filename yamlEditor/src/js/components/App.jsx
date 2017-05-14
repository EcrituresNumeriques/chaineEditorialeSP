import React from 'react'
import { TextInput } from './TextInput.jsx'
import { SelectInput } from './SelectInput.jsx'
import { Resumes} from './Resumes.jsx'
import { Collaborateurs} from './Collaborateurs.jsx'
import { MotsClefs} from './MotsClefs.jsx'
import { Date} from './Date.jsx'
import { Rubriques} from './Rubriques.jsx'
import { Types} from './Types.jsx'

export function App(){
  return(
    <section>
      <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" />
      <TextInput target="title" title="Titre" />
      <TextInput target="subtitle" title="Sous-titre" />
      <Resumes/>
      <Collaborateurs/>
      <MotsClefs/>
      <Date target="date" title="Date"/>
      <Rubriques/>
      <Types/>
    </section>
  )
}
