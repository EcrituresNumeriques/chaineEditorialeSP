let init = {};


const reducer = function(state,action){
  if(action.type == "toggleMaterialize"){
    state.skillz[0].materialize = !state.skillz[0].materialize;
    state.count += action.count;
    console.log(state.skillz[0].materialize)
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
  return(
    <section>
      <h1>Titre</h1>
      <input type="text" placeholder="titre"/>
      <h1>Sous-titre</h1>
      <input type="text" placeholder="sous-titre" />
      <h1>Résumé</h1>
      <textarea name="resume" placeholder="Résumé"></textarea>
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
