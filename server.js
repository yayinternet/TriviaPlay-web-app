	const bodyParser = require('body-parser');
	const express = require('express');

	const MongoClient = require('mongodb').MongoClient;
	const ObjectID = require('mongodb').ObjectID;

	const app = express();
	const jsonParser = bodyParser.json();

	app.use(express.static('public'));

	let db = null;
	let collection = null;
	let testname;

	async function main() {
	  const DATABASE_NAME = 'cs193x-db';
	  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

	  // The "process.env.MONGODB_URI" is needed to work with Heroku.
	  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
	  collection = db.collection('scores');

	  // The "process.env.PORT" is needed to work with Heroku.
	  const port = process.env.PORT || 3000;
	  await app.listen(port);
	  console.log(`Server listening on port ${port}!`);
	};

	main();

	/*retrieve data from the website*/
	async function onGet(req, res) {
		const routeParams = req.params;
		const testEmail = routeParams.email;
		const query = {
			email: testEmail
		};

		const response = await collection.findOne(query);
			if (response === null){
				let arr=[];
				let isContained = {
					contained: false
				};
				arr.push(isContained);
				arr.push(response);
			res.json(arr);
		}else{
			let arr=[];
			let isContained = {
					contained: true
				};
				arr.push(isContained);
				arr.push(response);
			res.json(arr);
		}
	}
	app.get('/get/:email',jsonParser, onGet);

	

	/*check if a person is on the database, if on the database, then patch, else post*/
	/*posts data to the website*/
	async function onPost(req, res) {
		const body = req.body;
		const name = body.name;
		const email = body.email;
		const score = body.points;
		const query ={
			name: name
		};
	    const doc = {
	 	name: name,
	 	email: email,
	 	points: score
	    };
	    const params = { upsert: true};
	    const response = await collection.update(query, doc, params);
	    res.json({});
	}


	app.post('/save', jsonParser, onPost);



	async function onGetAll(req, res){
		const cursor = await collection.find();
		const list = await cursor.toArray();
		while (await cursor.hasNext()){
			const result = await cursor.next();
			console.log(`Name: ${result.name}, Email:${result.email}, Score:${result.points}$`);
		}
		res.json(list);
	}

	app.get('/getall', jsonParser,onGetAll);
	////////////////////////////////////////////////////////////////////////////////


