import React from 'react'
import _ from 'lodash'

export function CheckBoxInput(props) {
    return (
      <section className="reactForm">
        <input type="checkbox" className="icheckbox" checked={props.value} onChange={(e)=>props.updateMisc(e.target.checked,props.target,"rubriques")}/>
        <label className="lcheckbox">{props.title}</label>
      </section>
    )
}
