import { createStore } from 'redux'
import { reducer } from './reducer.js'
import { init } from './init.js'


export let store = createStore(reducer,init);
