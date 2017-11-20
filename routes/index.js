const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const React = require('react')
const ReactDOMServer  = require('react-dom/server')

const serverIndex = require('../public/dist/es5/server-index')
const containers  = require('../public/dist/es5/components/containers')
const store       = require('../public/dist/es5/stores')

const renderComponent = function(initialState, component){
	const renderedComponent = React.createElement(component)
	const entry = React.createElement(serverIndex, { component:renderedComponent, store:initialState })
	const html  = ReactDOMServer.renderToString(entry)
	return html
	
}
 
router.get('/', function(req, res){
	let initial = { }

	if( req.vertexSession != null && req.vertexSession.user != null ){
		turbo.fetchOne('user', req.vertexSession.user.id)
		.then(data => {
			initial['user'] = {
				currentUser: data
			}
			const initialState =  store.configure(initial)
			const html = renderComponent(initialState, containers.Admin)

			res.render('index', {
				react: html,
				initialState: JSON.stringify(initialState.getState())
			})
			return
		})
		.catch(err => {

		})

		const initialState =  store.configure(initial)
		const html = renderComponent(initialState, containers.Admin)
		res.render('index', {
			react: html,
			initialState: JSON.stringify(initialState.getState())
		})
		return
	}
})

router.get('/auth', function(req, res){
	res.render('auth')
})
module.exports = router
