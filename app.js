const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var methodOverride = require("method-override");


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Ingredients = mongoose.model('Recipe', { 
									  ingredient: String,
									  measurement: String,
									  qty: Number
									});

// const newJob = new Title({ name: 'Thinker' });
// newJob.save().then(() => console.log('new job saved'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	Ingredients.find({}, (err, foundIngredients) => {
		if(err){
			console.log(err);
		} else {
			res.render('home', {ingredients: foundIngredients});
		}
	});
});

app.get("/new", (req, res) => {
	res.render('new');
});

app.post("/ingredient", (req, res) => {
	var ingredient = req.body.ingredient;
	var measurement = req.body.measurement;
	var qty = req.body.qty;
   
    var newIngredient = {ingredient: ingredient, measurement: measurement, qty: qty};
    Ingredients.create(newIngredient, function(err) {
        if(err) {
            console.log(err);
        } else {   
            res.redirect("/");
        }
    });
});

//show single job
app.get("/ingredient/:id", (req, res) => {
	Ingredients.findById(req.params.id, (err, foundIngredient) => {
		if(err){
			console.log(err);
		} else {
			console.log(foundIngredient);
			res.render("ingredient", {ingredient: foundIngredient});
		}
	});
	
});

app.get("/ingredient/:id/edit", (req, res) => {
	Ingredients.findById(req.params.id, (err, foundIngredient) => {
		if(err){
			console.log(err);
		} else {
			res.render("edit_ingredient", {ingredient: foundIngredient});
		}
	});
});

app.put("/ingredient/:id", (req, res) => {
	Ingredients.findByIdAndUpdate(req.params.id, req.body.ingredient, (err, updatedIngredient) => {
		if(err){
			console.log(req.params);
			console.log(err);
		} else {
			res.redirect(`/`);
		}
	})
});

app.delete("/ingredient/:id", (req, res) => {
	Ingredients.findByIdAndDelete(req.params.id, (err) => {
		if(err){
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});


app.get("*", (req, res) => {
	console.log("page not found");
});



app.listen(3000, () => {
	console.log("Server started on port 3000");
});