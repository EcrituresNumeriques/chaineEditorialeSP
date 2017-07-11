import React from 'react'
import _ from 'lodash'
import { store } from '../redux/store.js'

export class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:this.props.title,
        placeholder:this.props.placeholder || this.props.title,
        value: this.dateDecode(_.get(store.getState().obj, this.props.target, "")),
        element: this.props.element || 'input'
     };
  }

  componentDidMount(){
    let context = this;
    this.setState({unsubscribe : store.subscribe(function(){
      let value = _.get(store.getState().obj, context.props.target, undefined);
      if(typeof(value) != "undefined" && context.state.value != value){
        context.setState({value:context.dateDecode(value)});
      }
    })});
  }

  componentWillUnmount(){
    this.state.unsubscribe();
  }

  dateEncode(date){
    return date.split("-").join("/");
  }

  dateDecode(date){
    return date.split("/").join("-");
  }

  handleTextChange(event) {
    let date = event.target.value.split("-");
    store.dispatch({type:"FORM_UPDATE",target:"date", value:this.dateEncode(event.target.value)});
    store.dispatch({type:"FORM_UPDATE",target:"year", value:date[0]});
    store.dispatch({type:"FORM_UPDATE",target:"month", value:date[1]});
    store.dispatch({type:"FORM_UPDATE",target:"day", value:date[2]});
  }

  render() {
    return (
      <section className="reactForm">
        <label>{this.state.title} :</label>
        <input type="date" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleTextChange.bind(this)}/>
      </section>
    )
  }
}
