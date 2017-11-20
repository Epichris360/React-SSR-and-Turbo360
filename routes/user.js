const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */

router.post('/register', (req, res) => {
    turbo.createUser({username: req.body.username, password: req.body.password})
    .then(data => {
        res.json({
            confirmation:'success',
            data: data
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
	
})

router.post('/login', (req, res) => {
	turbo.login({username: req.body.username, password: req.body.password})
    .then(data => {
        req.vertexSession.user = { id: data.id }
        res.json({
            confirmation:'success',
            data: data
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
})

router.get("/currentUser", (req, res) => {
    if( req.vertexSession == null || req.vertexSession.user == null ){
        res.json({
            confirmation: 'fail',
            message: 'There is no user logged in'
        })
    }

    turbo.fetchOne('user', req.vertexSession.user.id)
    .then(data => {
        res.json({
            confirmation: 'success',
            user: data
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })

    
})


module.exports = router
