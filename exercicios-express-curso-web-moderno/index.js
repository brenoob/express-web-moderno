const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')

app.get('/usuario', usuarioApi.salvar)
app.post('/usuario', usuarioApi.obter)

require('./api/produto')(app, 'com param')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(saudacao('pedro'))

app.use((req, res, next) => {
    console.log('antes');
    next()
})
app.get('/clientes/relatorio',(req,res) => {
    res.send(`cliente relatorio: completo = ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo',(req, res) => {
    // let corpo = ""
    // req.on('data', function(parte){
    //     corpo += parte
    // })
    // req.on('end', function() {
    //     res.send(corpo)
    // })
    res.send(req.body)
})

app.get('/clientes/:id',(req, res) => {
    res.send(`cliente ${req.params.id} selecionado`)
})


app.get('/opa',(req, res, next) => {
    console.log('durante');
    res.json({
        data:[
            {id:7, name:'carla', position:1},
            {id:75, name:'ana', position:2},
            {id:27, name:'maria', position:3}
        ],
        count:30,
        skip:0,
        limit:3,
        status:200
    })
    next()
    // res.json({
    //     name:"pedro",
    //     age:33,
    //     city:"sâo paulo"
    // })
    // res.send("estou</br> <b>bem</b>")
})

app.use((req, res) => {
    console.log('depois');
})

app.listen(3000, () => {
    console.log('backend rodando');
})