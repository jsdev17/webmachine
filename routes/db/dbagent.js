'use strict';

///////////////////////////////////////////////////////////////
//////// process db http message for clients and sales ///////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const api =         			require('../../api')

const dbagent = (router) => {

	router.use(bodyParser.json());

	router.delete("/:id", function(req, res, next) {
 	 console.log("-----------DB AGENTS ROUTE -----------")
 	 api.deleteAgent(req.token, req.params.id, req.conn, function(response){
 		 res.status(200).send(response)
		 next()
 	  })
   })

	router.get('/', function(req, res, next) {		
		api.getAgents(req.token, req.conn, function(response){
			res.status(200).send(response)
			next()
			})
		})

	 router.post('/', function(req, res, next) {
		  console.log("-----------DB AGENTS ROUTE -----------")
			if (req.body) {
		     api.updateAgent(req.token, req.body, req.conn, function(response){
		       res.status(200).send(response)
					 next()
		      })
		    }
		    else {
					let err = new Error('Error Post DBA - Please Provide All Required Data')
		      res.status(403).send(err.message)
					next(err)
		   }
		 })

	 router.put('/', function(req, res, next) {
		  console.log("-----------DB AGENTS ROUTE -----------")
			if (req.body) {
		     api.addAgent(req.token, req.body, req.conn, function(response) {
		       res.status(200).send(response)
					 next()
		      })
		    }
		    else {
					let err = new Error('Error Put DBA - Please Provide All Required Data')
		      res.status(403).send(err.message)
					next(err)
		   }
		 })

}

module.exports = dbagent
