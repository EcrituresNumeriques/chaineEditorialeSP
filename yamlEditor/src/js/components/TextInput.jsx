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
        value: _.get(store.getState().obj, this.props.target, ""),
        element: this.props.element || 'input'
     };
  }

  componentDidMount(){
    let context = this;
    this.setState({unsubscribe : store.subscribe(function(){
      let value = _.get(store.getState().obj, context.props.target, undefined);
      if(typeof(value) != "undefined" && context.state.value != value){
        context.setState({value:value});
      }
    })});
  }

  componentWillUnmount(){
    this.state.unsubscribe();
  }


  handleTextChange(event) {
    store.dispatch({type:"FORM_UPDATE",target:this.state.target, value:event.target.value});
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
