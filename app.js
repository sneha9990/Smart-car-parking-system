const express = require('express')
var exphbs = require('express-handlebars') ;

const app = express()
const path = require('path')
const port = 80

app.use(express.static(path.join(__dirname , 'views')))
app.use('/' , require(path.join(__dirname , 'router/slots.js')))

// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// require('./app/index')(app);

// app.get('/', (req, res) => {
//    res.render('home')
// })

// app.get('/hello/:name' , (req,res)=>{
//   res.send('Hellooo ' + req.params.name)
// })

// app.get('/about' , (req,res) => {
//   // res.sendFile(path.join(__dirname , 'index.html'))
//   res.json({"slot1" : 33})
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports =app ;