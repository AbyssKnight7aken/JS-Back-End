const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();


// Add handlebars to express
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');


// Add third party middlewares
const bodyparser = express.urlencoded({ extended: false });
app.use(bodyparser);

app.use(express.static('public'));

// Add middlewares
app.use((req, res, next) => {
    console.log(`HTTP Request ${req.method}: ${req.path}`);
    next();
})

// Express router / actions

// Home 
app.get('/', (req, res) => {
    const allCats = () => { return require('./cats.json'); }
    const { search } = req.query;
    let cats = allCats();
    if (search) {
        cats = cats.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()));
    }
    res.render('home', { cats, search });
});


// Add Cat
app.get('/add-cat', (req, res) => {
    res.render('addCat', { breeds: require('./breeds.json') });
});

app.post('/add-cat', (req, res) => {
    const cats = require('./cats.json');
    const uniqid = require('uniqid');
    let form = new formidable.IncomingForm();

    form.parse(req, (err, body, files) => {
        if (err) {
            console.log(err);
            throw err;
        }
        let oldpath = files.upload.filepath;
        let newPath = path.normalize(path.join(__dirname, './public/images/' + files.upload.originalFilename));

        fs.copyFile(oldpath, newPath, function (err) {
            if (err) {
                console.log(err, 'Error!');
            }
            console.log('Files was uploaded successfully!');
        });
        const newCat = {
            "id": uniqid(),
            "name": body.name,
            "description": body.description,
            "breed": body.breed,
            "price": body.price,
            "image": files.upload.originalFilename
        };

        files.upload.originalFilename == ''
            ? newCat.image = 'default-cat.png'
            : newCat.image = files.upload.originalFilename

        cats.push(newCat);

        fs.writeFile('./cats.json', JSON.stringify(cats), 'utf-8', (err) => {
            if (err) {
                console.log('Unsuccessful file save!');
                return;
            }
            console.log('Created!');
        })
    });
    res.redirect('/');
});

// Add Breed
app.get('/add-breed', (req, res) => {
    res.render('addBreed');
});

app.post('/add-breed', (req, res) => {
    const breeds = require('./breeds.json');
    breeds.push(req.body.breed);
    fs.writeFile('./breeds.json', JSON.stringify(breeds), 'utf-8', (err) => {
        if (err) {
            console.log('Unsuccessful file save!');
            return;
        }
    })
    res.redirect('/');
});


// Edit Cat
app.get('/:catId/edit', (req, res) => {
    const cats = require('./cats.json');
    const cat = cats.find(x => x.id == req.params.catId);
    res.render('editCat', { cat, breeds: require('./breeds.json') });
});

app.post('/:catId/edit', (req, res) => {
    const cats = require('./cats.json');
    let form = new formidable.IncomingForm();

    form.parse(req, (err, body, files) => {

        if (err) {
            console.log(err);
            throw err;
        }
        const cat = cats.find(x => x.id == body.catId);
        const index = cats.indexOf(cat);

        const updatedCAt = Object.assign(cat, {
            "name": body.name,
            "description": body.description,
            "breed": body.breed,
            "price": body.price
        });

        if (files.upload.originalFilename != '') {
            const oldImagePath = path.normalize(path.join(__dirname, `./public/images/${cat.image}`));

            if (cat.image != '') {
                if (cat.image != 'default-cat.png') {
                    fs.unlinkSync(oldImagePath);
                }

                let oldpath = files.upload.filepath;
                let newPath = path.normalize(path.join(__dirname, './public/images/' + files.upload.originalFilename));

                fs.copyFile(oldpath, newPath, function (err) {
                    if (err) {
                        console.log(err, 'Error!');
                    }
                    console.log('Files was uploaded successfully!');
                });
            }
            updatedCAt.image = files.upload.originalFilename;
        }

        console.log(`updated cat - ${{ updatedCAt }}`);

        cats.splice(index, 1, updatedCAt);

        fs.writeFileSync('./cats.json', JSON.stringify(cats), 'utf-8', (err) => {
            if (err) {
                console.log('Unsuccessful file save!');
                return;
            }
        });

        console.log('updated');
    });
    res.redirect('/');
});


// Delete Cat
app.get('/:catId/delete', (req, res) => {
    const cats = require('./cats.json');
    let form = new formidable.IncomingForm();
    const cat = cats.find(x => x.id == req.params.catId);
    const index = cats.indexOf(cat);
    if (cat) {
        form.parse(req, (err, body, files) => {

            if (err) {
                console.log(err);
                throw err;
            }
            const imagePath = path.normalize(path.join(__dirname, `./public/images/${cat.image}`));
            console.log(imagePath);

            if (cat.image != 'default-cat.png') {
                fs.unlinkSync(imagePath);
                console.log(`${cat.image} deleted!`);
            }

            cats.splice(index, 1);
            fs.writeFileSync('./cats.json', JSON.stringify(cats), 'utf-8', (err) => {
                if (err) {
                    console.log('Unsuccessful file save!');
                    return;
                }
            });
            console.log(`${cat.name} is deleted!`);
        });
    }

    res.redirect('/');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));