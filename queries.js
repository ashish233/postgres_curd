var Pool = require('pg').Pool;
const pool = new Pool({
    user:'me',
    host:'localhost',
    database:'api',
    password:'password',
    port:5432
})

const getUsers = (req,res )=>{
    pool.query('SELECT * FROM users ORDER BY id ASC',(err,results)=>{
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);


    })

}

const getUserById = (req,res) =>{
    console.log(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1',[parseInt(req.params.id)],(err,results)=>{
        console.log(err);
        console.log(results);
        if(err){
            throw err
        }
        res.status(200).json(results.rows);
    })
}

const createUser = (req,res)=>{
      var {name,email } =req.body;
      pool.query('INSERT INTO users (name,email) VALUES ($1,$2)',[name,email],(err,results)=>{
        if(err) throw err
        res.status(201).send(`User added with ID: ${results.insertId}`);

      })


}

const updateUser = (req,res)=>{
    let id = parseInt(req.params.id);
    let {name,email} = req.body;
    console.log(req.body);
    pool.query('UPDATE  users SET name = $1,email = $2  WHERE id = $3',[name,email,id],(err,results)=>{
        if(err) throw err
        res.status(200).send('Users updated')
    })

}

const deleteUser = (req,res) =>{
    let id = parseInt(req.params.id);
    pool.query('DELETE from users WHERE id=$1',[id],(err,results)=>{
        if(err) throw err;
        res.status(200).send(`Deleted user id :${id}`)
    })
    
}


module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}