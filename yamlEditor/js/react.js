"use strict";

var init = {};

var reducer = function reducer(state, action) {
  if (action.type == "toggleMaterialize") {
    state.skillz[0].materialize = !state.skillz[0].materialize;
    state.count += action.count;
    console.log(state.skillz[0].materialize);
    return state;
  }
  return state;
};

var store = Redux.createStore(reducer, init);

function Identifiant() {
  return React.createElement(
    "section",
    null,
    React.createElement(
      "h1",
      null,
      "Identifiant"
    ),
    React.createElement("input", { type: "text", placeholder: "SPXXXX" })
  );
}

function Titre() {
  return React.createElement(
    "section",
    null,
    React.createElement(
      "h1",
      null,
      "Titre"
    ),
    React.createElement("input", { type: "text", placeholder: "titre" }),
    React.createElement(
      "h1",
      null,
      "Sous-titre"
    ),
    React.createElement("input", { type: "text", placeholder: "sous-titre" }),
    React.createElement(
      "h1",
      null,
      "R\xE9sum\xE9"
    ),
    React.createElement("textarea", { name: "resume", placeholder: "R\xE9sum\xE9" })
  );
}

function App() {
  var array = store.getState().skillz;
  return React.createElement(
    "div",
    null,
    React.createElement(Identifiant, null),
    React.createElement(Titre, null)
  );
}
function render() {
  ReactDOM.render(React.createElement(App, { state: init }), document.querySelector('.app'));
}
document.addEventListener("DOMContentLoaded", function (event) {
  render();
  store.subscribe(render);
});

