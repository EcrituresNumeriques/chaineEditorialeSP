"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var init = {
  obj: {
    "controlledKeywordsd": [{
      "label": null,
      "uriRameau": null,
      "idRameau": null,
      "wikidata": null
    }],
    "journal": "Sens public",
    "issnnum": "2104-3272",
    "director": [{
      "forname": "Marcello",
      "surname": "Vitali-Rosati",
      "gender": "male",
      "orcid": "0000-0001-6424-3229",
      "viaf": null,
      "foaf": null,
      "isni": null
    }],
    "redacteurDossier": [{
      "forname": null,
      "surname": null,
      "orcid": null,
      "viaf": null,
      "foaf": null,
      "isni": null
    }, {
      "forname": null,
      "surname": null,
      "orcid": null,
      "viaf": null,
      "foaf": null,
      "isni": null
    }],
    "year": null,
    "month": null,
    "day": null,
    "date": null,
    "dossier": [{
      "title": null,
      "id": null
    }],
    "publisher": "Département des littératures de langue française",
    "prod": "Sens Public",
    "prodnum": "Sens Public",
    "diffnum": "Érudit",
    "rights": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    "title": null,
    "subtitle": null,
    "typeArticle": null,
    "authors": [{
      "forname": null,
      "surname": null,
      "orcid": null,
      "viaf": null,
      "foaf": null,
      "isni": null,
      "wikidata": null
    }, {
      "forname": null,
      "surname": null,
      "orcid": null,
      "viaf": null,
      "foaf": null,
      "isni": null,
      "wikidata": null
    }],
    "abstract": [{
      "lang": null,
      "text": null
    }, {
      "lang": null,
      "text": null
    }],
    "keyword_fr": null,
    "keyword_en": null,
    "url_article_sp": null,
    "id_sp": null,
    "translator": [{
      "forname": null,
      "surname": null
    }],
    "lang": "fr",
    "orig_lang": null,
    "translations": [{
      "lang": null,
      "titre": null,
      "url": null
    }, {
      "lang": null,
      "titre": null,
      "url": null
    }],
    "articleslies": [{
      "url": null,
      "titre": null,
      "auteur": null
    }],
    "reviewers": [{
      "forname": null,
      "name": null,
      "orcid": null,
      "viaf": null,
      "foaf": null,
      "isni": null
    }],
    "bibliography": null,
    "link-citations": true,
    "nocite": null
  }
};

var reducer = function reducer(state, action) {
  if (action.type == "YAML_UPDATE") {
    state.obj = action.obj;
    console.log('update triggered');
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
  var titre = store.getState().obj.title;
  return React.createElement(
    "section",
    null,
    React.createElement(TextInput, { target: "title", title: "Titre" }),
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

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    console.log(_this.props);
    _this.state = {
      title: _this.props.title,
      target: _this.props.target,
      value: store.getState().obj[_this.props.target]
    };
    return _this;
  }

  _createClass(TextInput, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        null,
        React.createElement(
          "h1",
          null,
          this.state.title
        ),
        React.createElement("input", { type: "text", placeholder: this.state.title, value: this.state.value })
      );
    }
  }]);

  return TextInput;
}(React.Component);

function keywords() {
  return React.createElement("section", null);
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

