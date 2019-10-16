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

//outputs a full list of items in the database//
var itemList = (function() {
    connection.query("SELECT * FROM products", function(err, result)
    {
      if (err) throw err;
      console.table(result);
      purchaseItem();
    }
   
    )}
);

function purchaseItem() {
    //itemList();
    inquirer
      .prompt([{
        name: "item_id",
        type: "input",
        message: "Enter item id for product you'd like to purchase."
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }])
      .then(function(answer) {
        //   console.log(answer);
        var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.item_id }, function(err, result) {
          if (err) throw err;
          for (var i = 0; i < result.length; i++) {
            console.log("item_id: " + result[i].item_id + " || product_name: " + result[i].product_name + " || price: " + result[i].price);

         
        }
// determine if there is enough stock to fulfill order
if (result[i].stock_quantity < parseInt(answer.stock_quantity)) {
    // not enough stock
    console.log("Sorry, we can't fulfill your order, try back again later.")


}
else 
// (result[i].stock_quantity > parseInt(answer.stock_quantity))
// function updateStock() {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - parsInt(answer.stock_quantity) WHERE item_id = [results[i].item_id]", function(err, result){ 

    // console.log("New stock total is " + stock_quantity)


    // var mysqlUpdate = 
    // connection.query(
//  "UPDATE products SET stock_quantity=stock_quantity - answer.stock_quantity WHERE item_id=result[i].item_id";
 
//  function(err, res) {
    console.log("Your order total is " + result[i].price)
}
//  }
     

// updateStock();
     );
    

});
})};   

itemList()