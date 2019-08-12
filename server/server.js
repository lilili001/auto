const express = require('express');
const app = express();

let webpack = require('webpack');
let middle = require('webpack-dev-middleware');
let config =  require('../build/webpack.dev')  ;
let compiler = webpack(config);
app.use(middle(compiler));

app.get('/api/user',(req,res)=>{
    res.json({name:'珠峰架构'})
});
app.listen(3000);