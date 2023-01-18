

const express = require('express');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');
const errorMiddleware=require('./middleware/error');
const category=require('./routes/categoryRoute');
const brand=require('./routes/brandRoute');
const user=require('./routes/userRoute');
const store=require('./routes/storeRoute');
const product=require('./routes/productRoute');
const review=require('./routes/reviewRoute');

const path=require('path');



const connectDatabase=require('./config/database');

const dotenv=require('dotenv');

const app=express();

app.use(express.static(path.join(__dirname,'public')));

app.use(cors({
    origin:['https://clever-gaufre-442a0b.netlify.app','*'],
    methods:['GET','POST','PUT','DELETE'],
    
    credentials:true
}));
// app.use(cors({
//     origin: "http://localhost:3000"
// }))

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api/v1',category);
app.use('/api/v1',brand);
app.use('/api/v1',user);
app.use('/api/v1',store);
app.use('/api/v1',product);
app.use('/api/v1',review);

// headers('Access-Control-Allow-Origin: *')
// headers('Access-Control-Allow-Origin: POST, GET, OPTIONS, PUT, DELETE')
// headers('Access-Control-Allow-Origin: Content-Type, X-Auth-Token, Origin, Authorization')


// app.use(errorMiddleware);
const port=process.env.PORT || 9000;

if(process.env.NODE_ENV !=='PRODUCTION'){
    dotenv.config({path:'config/.env'})
}

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
    connectDatabase();
})