let init = {
  obj:{
   "controlledKeywordsd": [
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
   "title": null,
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
};


const reducer = function(state,action){
  if(action.type == "YAML_UPDATE"){
    state.obj = action.obj;
    console.log('update triggered');
    return state
  }
  return state;
}

let store = Redux.createStore(reducer,init);

function Identifiant(){
  return(
    <section>
    <h1>Identifiant</h1>
    <input type="text" placeholder="SPXXXX" />
    </section>
  )
}

function Titre(){
  var titre = store.getState().obj.title;
  return(
    <section>
      <TextInput target="title" title="Titre" />
      <h1>Sous-titre</h1>
      <input type="text" placeholder="sous-titre" />
      <h1>Résumé</h1>
      <textarea name="resume" placeholder="Résumé"></textarea>
    </section>
  )
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
        title:this.props.title,
        target : this.props.target,
        value: store.getState().obj[this.props.target]
     };
  }

  render() {
    return (
      <section>
        <h1>{this.state.title}</h1>
        <input type="text" placeholder={this.state.title} value={this.state.value}/>
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
      <Identifiant />
      <Titre />

    </div>
  )
}
function render(){
  ReactDOM.render(<App state={init}/>,document.querySelector('.app'));
}

document.addEventListener("DOMContentLoaded", function(event) {
  render()
  store.subscribe(render)
});
