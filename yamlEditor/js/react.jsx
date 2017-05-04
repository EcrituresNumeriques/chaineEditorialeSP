let init = {
  obj:{
   "controlledKeywords": [
    {
     "label": null,
     "uriRameau": null,
     "idRameau": null,
     "wikidata": null
    }
   ],
   "journal": "Sens public",
   "issnnum": "2104-3272",
   "director": [
    {
     "forname": "Marcello",
     "surname": "Vitali-Rosati",
     "gender": "male",
     "orcid": "0000-0001-6424-3229",
     "viaf": null,
     "foaf": null,
     "isni": null
    }
   ],
   "redacteurDossier": [
    {
     "forname": null,
     "surname": null,
     "orcid": null,
     "viaf": null,
     "foaf": null,
     "isni": null
    },
    {
     "forname": null,
     "surname": null,
     "orcid": null,
     "viaf": null,
     "foaf": null,
     "isni": null
    }
   ],
   "year": null,
   "month": null,
   "day": null,
   "date": null,
   "dossier": [
    {
     "title": null,
     "id": null
    }
   ],
   "publisher": "Département des littératures de langue française",
   "prod": "Sens Public",
   "prodnum": "Sens Public",
   "diffnum": "Érudit",
   "rights": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
   "title": "test",
   "subtitle": null,
   "typeArticle": null,
   "authors": [
    {
     "forname": null,
     "surname": null,
     "orcid": null,
     "viaf": null,
     "foaf": null,
     "isni": null,
     "wikidata": null
    },
    {
     "forname": null,
     "surname": null,
     "orcid": null,
     "viaf": null,
     "foaf": null,
     "isni": null,
     "wikidata": null
    }
   ],
   "abstract": [
    {
     "lang": null,
     "text": null
    },
    {
     "lang": null,
     "text": null
    }
   ],
   "keyword_fr": null,
   "keyword_en": null,
   "url_article_sp": null,
   "id_sp": null,
   "translator": [
    {
     "forname": null,
     "surname": null
    }
   ],
   "lang": "fr",
   "orig_lang": null,
   "translations": [
    {
     "lang": null,
     "titre": null,
     "url": null
    },
    {
     "lang": null,
     "titre": null,
     "url": null
    }
   ],
   "articleslies": [
    {
     "url": null,
     "titre": null,
     "auteur": null
    }
   ],
   "reviewers": [
    {
     "forname": null,
     "name": null,
     "orcid": null,
     "viaf": null,
     "foaf": null,
     "isni": null
    }
   ],
   "bibliography": null,
   "link-citations": true,
   "nocite": null
  }
}


const reducer = function(state,action){
  console.log(action.type);
  if(action.type == "YAML_UPDATE"){
    console.log(state.obj == action.obj);
    state.obj = action.obj;
    return state
  }
  if(action.type == "FORM_UPDATE"){
    state.obj[action.target] = action.value;
    return state
  }
  return state;
}

const {Provider} = ReactRedux;

let store = Redux.createStore(reducer,init);

function Metadonnees(){
  return(
    <section>
      <TextInput target="id_sp" title="Identifiant" placeholder="SPxxxx" />
      <TextInput target="title" title="Titre" />
      <TextInput target="subtitle" title="Sous-titre" />
      <h1>Résumé</h1>
      <textarea name="resume" placeholder="Résumé"></textarea>
    </section>
  )
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:this.props.title,
        placeholder:this.props.placeholder || this.props.title,
        target : this.props.target,
        value: store.getState().obj[this.props.target]
     };
  }

  componentDidMount(){
    let context = this;
    store.subscribe(function(){
      let value = store.getState().obj[context.state.target] || '';
      if(context.state.value != value){
        context.setState({value:value});
      }
    });
  }

  handleTextChange(event) {
    store.dispatch({type:"FORM_UPDATE",target:this.state.target, value:event.target.value});
  }

  render() {
    return (
      <section>
        <h1>{this.state.title}</h1>
        <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleTextChange.bind(this)}/>
      </section>
    )
  }
}

function keywords(){
  return(
    <section>

    </section>
  )
}

function App(){
  var array = store.getState().skillz;
  return(
    <div>
      <Metadonnees />

    </div>
  )
}
function render(){
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app'));
}

document.addEventListener("DOMContentLoaded", function(event) {
  render()
  store.subscribe(render)
});
