var app = require('express')();
var bodyParser = require('body-parser');
var db = require('./queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.json({msg:"testing"})
    
})

app.get('/users',db.getUsers);
app.get('/users/:id',db.getUserById);
app.post('/users',db.createUser);
app.put('/users/:id',db.updateUser);
app.delete('/users/:id',db.deleteUser);

app.listen(3000,function(){
    console.log("listening port 3000");
})