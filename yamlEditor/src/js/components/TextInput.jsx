import React from 'react'
import _ from 'lodash'
import { store } from '../redux/store.js'

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:this.props.title,
        placeholder:this.props.placeholder || this.props.title,
        target : this.props.target,
        value: _.get(this.props.state, this.props.target, ""),
        element: this.props.element || 'input'
     };
     this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillReceiveProps(nextProp){
    this.setState({value:_.get(nextProp.state, this.props.target, "")})
  }

  handleTextChange(event) {
    this.props.updateState(event.target.value,this.props.target);
  }

  render() {
    return (
      <section className="reactForm">
        <label>{this.state.title} :</label>
        { this.state.element == "input" ? <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleTextChange.bind(this)}/> :
        this.state.element == "textArea" ? <textarea placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleTextChange.bind(this)}/> :
        null }
      </section>
    )
  }
}
