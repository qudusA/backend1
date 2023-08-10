const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const db = require('./util/data');



const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')
const errorRoute = require('./routes/404')

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'view')

// db.execute('SELECT * FROM products').then(data=>{console.log(data[0])}).catch(err=>{console.log(err)})

app.use(express.static(path.join(rootDir, 'public')))
app.use(bodyParser.urlencoded({extended: false}))



app.use(adminRoute)
app.use(shopRoute)
app.use(errorRoute)


const port = 3001;
app.listen(port, (()=>{
    console.log(`server connected on http://localhost${port}`)
}))