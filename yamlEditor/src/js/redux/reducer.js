import _ from 'lodash';
import { categories } from './categories';
import { rubriques } from './rubriques';

export const reducer = function(state,action){
  //console.log(action);
  if(action.type == "YAML_UPDATE"){
    state.obj = action.obj;
    state.misc.rubriques.map((o)=>(o.selected=false));
    state.misc.categories.map((o)=>(o.selected=false));
    state.misc.uncontrolledKeywords = [];
    state = compileKeywords(state);
    return state;
  }
  if(action.type == "JS_UPDATE"){
    state.obj = action.obj;
    state.misc.rubriques.map((o)=>(o.selected=false));
    state.misc.categories.map((o)=>(o.selected=false));
    state.misc.uncontrolledKeywords = [];
    state = compileKeywords(state);
    return state;
  }
  if(action.type == "FORM_UPDATE"){
    _.set(state.obj, action.target, action.value);
    return state;
  }
  if(action.type == "MISC_UPDATE"){
    _.set(state.misc, action.target, action.value);
    state = compileKeywords(state);
    return state;
  }
  return state;
};



function compileKeywords(state){
  //Compute selected controlled keywords
  let rubriques = state.misc.rubriques.filter(function(rubrique){
    return rubrique.selected === true;
  });
  let categories = state.misc.categories.filter(function(category){
    return category.selected === true;
  });
  state.misc.selectedCategories = categories;

  //Generate new keywords in state.obj
  let keywords = [...rubriques, ...categories,...state.misc.uncontrolledKeywords];
  state.obj.keyword_fr = [];
  state.obj.keyword_en = [];
  for(let i=0;i<keywords.length;i++){
    state.obj.keyword_fr.push(keywords[i].fr);
    state.obj.keyword_en.push(keywords[i].en);
  }
  console.log("update keywords");
  return state;
}
