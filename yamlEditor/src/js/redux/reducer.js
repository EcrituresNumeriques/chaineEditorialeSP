import _ from 'lodash';

export const reducer = function(state,action){
  //console.log(action);
  if(action.type == "YAML_UPDATE"){
    state.obj = action.obj;
    return state;
  }
  if(action.type == "JS_UPDATE"){
    state.obj = action.obj;
    return state;
  }
  if(action.type == "FORM_UPDATE"){
    _.set(state.obj, action.target, action.value);
    return state;
  }
  if(action.type == "MISC_UPDATE"){
    _.set(state.misc, action.target, action.value);
    return state;
  }
  return state;
};
