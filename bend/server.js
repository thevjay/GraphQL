const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const colors = require('colors');
const cors = require('cors')

const app = express();

const port = process.env.PORT || 5000;

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}))

connectDB()
    .then((conn)=>{
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
        app.listen(port,()=>{
            console.log(`Server running on port ${port}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })