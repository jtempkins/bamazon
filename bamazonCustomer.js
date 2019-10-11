var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connectionObject = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sh1loh123!",
  database: "bamazon_db"
};

var connection = mysql.createConnection(connectionObject);
connection.connect(function(err){
   if(err) throw err;
   console.log("connected as id " + connection.threadId);
})

var itemList = (function(itemList) {
    connection.query("SELECT * FROM products", function(err, result)
    {
      if (err) throw err;
      console.log(result);
    }
   
    )}
)
itemList()




connection.end()