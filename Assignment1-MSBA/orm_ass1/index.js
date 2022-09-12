const { type } = require("express/lib/response");
const Sequelize = require("sequelize");
const {Model} = require("sequelize")
const express = require("express")
const app = express();
var cors = require('cors')

// For parsing application/json
app.use(express.json());

const sequelize = new Sequelize('micro_service_college', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection();


// model
const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      cost:Sequelize.INTEGER,
      date:Sequelize.DATE,
      color:Sequelize.STRING,
      url:Sequelize.STRING,
      remarks:Sequelize.STRING
})
/**
 * create data base
 */


// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

app.use(cors())

app.post("/api/product", async (req, res)=>{
    let {name, color, cost, date, url, remarks} = req.body;
    try{
        await Product.create({name:name, color:color, cost:cost, date:date, url:url, remarks:remarks});
    }catch(err){
        res.send({status:500, msg:"post success", err:JSON.stringify(err)});
    }
    res.send({status:200, msg:"post success", data:{}});
})


app.get("/api/product", async(req, res)=>{
    try{
        const products = await Product.findAll();
        res.send({status:200, msg:"post success", data:products});

    }catch(err){
        res.send({status:500, msg:"get success", err:JSON.stringify(err)});
    }
})

app.get("/api/productById", async(req, res)=>{
    try{
        const product = await Product.findByPk(req.query.id);
        res.send({status:200, msg:"get success", data:product});

    }catch(err){
        res.send({status:500, msg:"post success", err:JSON.stringify(err)});
    }
})


app.listen(5000, ()=>{
    console.log("server running on port 5000");
})
