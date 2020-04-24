const express = require('express');
const jwt = require('jsonwebtoken');
app = express();

 // app.use(tiempo); //middleware van arriba y se ejecutan primero

// app.set('port', process.env.PORT || 3000);
// app.use(asegurandoTOken);
app.get('/',(req, res) =>{
  res.json({
    message:'Hola Mundo'
  });

});

app.post('/api/token',(req, res) => {
  const user = {id:3};
  const token = jwt.sign({user}, 'my_token_secreto');
  res.json({
    token
  });
});

app.get('/api/protegida', asegurandoTOken,(req, res) => {
  // res.json({text:'seguro'});
  jwt.verify(req.token, 'my_token_secreto', (erro, data) =>{
    if(erro){
      res.sendStatus(403);
    }else{
      res.json({
        text:'protegido',
        data
      });
    }

  });
});

function asegurandoTOken(req, res, next){
  const header = req.headers['authorization'];
  if(typeof header != 'undefined'){
    const Header = header.split(" ");
    const token = Header[1];
    req.token = token;
    next()
  }else{
    res.sendStatus(403);
  }

}


// function mylogo(req, res, next){
// console.log('log');
// next();
// }

app.listen(3000,() => {
  console.log('server on port 3000');
});
