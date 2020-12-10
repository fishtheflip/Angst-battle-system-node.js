const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const Setup = require('./models/setup');
const SysemAng = require('./models/system');
const { response } = require('express');
const mongoose = require('mongoose');
const SetupMongo = require('./models/setupmongo');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const AuthMongo = require('./models/auth');
const session = require('express-session');

const password = 'JY60nWULAdmFI5OU';
const url = 'mongodb+srv://fishtheflip:JY60nWULAdmFI5OU@clusterang.mvcqt.mongodb.net/battles';

//Set up handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');


//==============================//
let a = 'Name10';
let b = 'Name20';
let winner = '';
let looser = '';
let totalA ='';
let totalB ='';


//==============================//
async function start(){
    try{
        await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
        // const candidate = await UserSchema.findOne();
        
        app.listen(3001, ()=>{
            console.log('server is running');
        });
    } catch (e) {
        console.log(e);
    }


}

start();



//=============================//
app.use(express.static( path.join(__dirname + '/public')));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'secretstring',
    resave:false,
    saveUninitialized: false
}))
//=============================//


app.get('/angsyst', (request, response)=>{
    response.render('index.hbs',{
        title: 'Setup',
        bboyRed: a,
        bboyBlue: b,
        nameState: 'Round'
    });
});
app.get('/', (request, response)=>{
    response.render('firstform.hbs',{
        title:'Add'

    });
});
app.get('/battle', async(request, response)=>{
    // const battles = await Setup.getAll();
    const battles = await SetupMongo.find({rounds:2});
    
    response.render('battle.hbs',{
        title:'Battle List',
        battles

    });
});

app.post('/auth', async (req,res)=>{
    req.session.isAuth = true;
    const cand = req.body.name;
    const isExist = await SetupMongo.find({name: `${cand}`});
    
    
    if(isExist.length === 1){
        console.log(' NOT Empty');
    }

})

app.get('/auth', (req,res)=>{
    res.render('auth.hbs',{
        title:'Auth'
    });
});

app.get('/results', async (req, res)=>{
    const results = await SysemAng.getAll();
    res.render('results.hbs',{
        title: 'Results',
        results
    });
});

app.get('/result', (request, response)=>{
    response.render('result.hbs',{
            title:'Results',
            nameW: winner,
            nameL: looser,
            scoreA: totalA,
            scoreB: totalB
    })
})

app.post('/', async (request, response)=>{
    response.redirect('/battle');
    // const setup = new Setup(request.body.red, request.body.blue, request.body.rounds);
    const setup = new SetupMongo({
        red: request.body.red,
        blue: request.body.blue,
        rounds: request.body.rounds
    });

    try{
        await setup.save();
        console.log(request.body);
    } catch (e){
        console.log(e);
    }


});

app.get('/angsyst/:id/edit', async (req, res)=>{
    
    if(!req.query.allow){
        return res.redirect('/');
    }
        const battle = await SetupMongo.findById(req.params.id);
        res.render('index', {
        title: 'Edit',
        counter:1,
        battle
        });
});



app.post('/angsyst/edit', async (request, response)=>{
    console.log(request.body);
    // if(request.body.id === ''){
    //     response.redirect('/angsyst');
    // }
    if(request.body.rounds == '1'){
        console.log('hook');
    }
    if(request.body.id){
        const systang = new SysemAng(request.body.id, request.body.bboyRed, request.body.bboyBlue , request.body.a1, request.body.a2, request.body.a3,
            request.body.b1, request.body.b2, request.body.b3 );
            systang.sum();
            response.redirect(`/angsyst/${request.body.id}/edit?allow=true`);
        
    }
});



