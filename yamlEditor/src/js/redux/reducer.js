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

    //Compute selected controlled keywords
    let rubriques = state.misc.rubriques.filter(function(rubrique){
      return rubrique.selected === true;
    });
    let categories = state.misc.categories.filter(function(category){
      return category.selected === true;
    });

    //Generate new keywords in state.obj
    let keywords = [...rubriques, ...categories];
    state.obj.keyword_fr = [];
    state.obj.keyword_en = [];
    for(let i=0;i<keywords.length;i++){
      state.obj.keyword_fr.push(keywords[i].fr);
      state.obj.keyword_en.push(keywords[i].en);
    }

    //console.log(keywords,state.misc);
    return state;
  }
  return state;
};
