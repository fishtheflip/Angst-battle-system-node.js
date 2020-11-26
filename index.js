const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const Setup = require('./models/setup');
const SysemAng = require('./models/system');
const { response } = require('express');


//===============================//
//Set up handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
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



app.listen(3001, ()=>{
    console.log('server is running');
});

//=============================//
app.use(express.static( path.join(__dirname + '/public')));
app.use(express.urlencoded({extended:true}));
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
    const battles = await Setup.getAll();
    response.render('battle.hbs',{
        title:'Battle List',
        battles

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
    const setup = new Setup(request.body.red, request.body.blue, request.body.rounds);
    await setup.save();
    console.log(request.body);
});

app.get('/angsyst/:id/edit', async (req, res)=>{
    
    if(!req.query.allow){
        return res.redirect('/');
    }
        const battle = await Setup.getById(req.params.id);
        res.render('index', {
        title: 'Edit',
        battle
        });
});



app.post('/angsyst/edit', (request, response)=>{
    console.log(request.body);
    if(request.body.id === ''){
        response.redirect('/angsyst');
    }
    if(request.body.rounds == '1'){
        console.log('hook');
    }
    if(request.body.id){
        const systang = new SysemAng(request.body.id, request.body.bboyRed, request.body.bboyBlue , request.body.a1, request.body.a2, request.body.a3,
            request.body.b1, request.body.b2, request.body.b3 );
            systang.sum();
            
        response.redirect('/results');
    }
});



