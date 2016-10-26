var express		= require('express');
var Pastie  	= require('./../models/pastie.js');

module.exports = (function() {
	'use strict';

	var router = express.Router();

	router.get('/', function(req, res) {
		res.json({ message: 'API de ATI I para el laboratorio 6: AJAX.' });   
	});

	// CREATE PASTIE
	router.post('/pasties', function(req, res) {
		console.log('Creating Pastie');
		
		var pastie = new Pastie();
		pastie.content = req.body.content;
		pastie.privacy = req.body.privacy;
		pastie.author = req.body.author;
		pastie.title = req.body.title;

		//Save the pastie in the DB and check for errors.
		pastie.save(function(err) {
			if (err)
				res.send('Error creando pastie: ' + err);
			
			res.json("Pastie creado.");
		});
	});

	// LIST ALL PASTIES
	router.get('/pasties', function(req, res) {
		Pastie.find(function(err, pasties) {
			if (err)
				res.send('Error obteniendo pasties: ' + err);
			
			res.json(pasties);
		});
	});

	// GET PASTIE
	router.get('/pasties/:pastie_id', function(req, res) {
		Pastie.findById(req.params.pastie_id, function(err, pastie) {
			if (err)
				res.send('Error obteniendo pastie: ' + err);
			
			res.json(pastie);
		});
	});

	// UPDATE PASTIE
	router.put('/pasties/:pastie_id', function(req, res) {
		Pastie.findById(req.params.pastie_id, function(err, pastie) {
			if (err)
				res.send('Error actualizando pastie: ' + err);

			pastie.content = req.body.content;
			pastie.privacy = req.body.privacy;
			pastie.author = req.body.author;
			pastie.title = req.body.title;

			pastie.save(function(err) {
				if (err)
					res.send('Error actualizando pastie: ' + err);
				
				res.json("Pastie actualizado.");
			});
		});
	});

	// DELETE PASTIE
	router.delete('/pasties/:pastie_id', function(req, res) {
		Pastie.remove({
			_id: req.params.pastie_id
			}, function(err, pastie) {
				if (err)
					res.send(err);

				res.json({ message: 'Pastie eliminado.' });
		});
	});

	return router;
})();