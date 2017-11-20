import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Admin } from './components/containers'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app with Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
const intitialState = window.__INITIAL_STATE__

const app = (
	<Provider store={store.configure(intitialState)}>
		<Admin />
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))