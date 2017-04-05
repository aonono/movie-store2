var express=require('express')
var path=require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose=require('mongoose')
var mongoStore=require('connect-mongo')(session)
var port=process.env.PORT||3000
var app=express()
var dbUrl="mongodb://localhost/imooc"
mongoose.connect(dbUrl)

app.set('views','./app/views/pages')
app.set('view engine','jade')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(express.multipart())


app.use(session({
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment');//app.locals中的属性可以在jade模板中调用

app.listen(port)

if ('development' === app.get('env')) {//不理解
  app.set('showStackError', true)
  // app.use(express.logger(':method :url :status'))
  app.locals.pretty = true
  //mongoose.set('debug', true)
}

require('./config/routes')(app)

