// First display all of the items for sale
// include ids/positions, names, prices

// Prompts the user with two questions:
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// log a message like "Insufficient Quantity! Try selecting a different item" and prevent the order from going through

// If the store has enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    searchBamazon();
});

function searchBamazon() {
    console.log("\nWelcome to Bamazon! Have a look at our wares...\n");
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log("Item: " + response[i].item_id +
                " -- Product: " + response[i].product_name +
                " -- Price: " + response[i].price +
                " -- Quantity: " + response[i].stock_quantity);
        }
        idSelect();
    });
}

function idSelect() {
    connection.query("SELECT * FROM products", function (err, idSelectResults) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "idChoice",
                    type: "input",
                    message: "Hi there! Please write the name of the Item ID # that you'd like to purchase"
                },
                {
                    name: "quantityChoice",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                if (idSelectResults[answer.idChoice].stock_quantity >= answer.quantityChoice) {
                    console.log("That'll be " + idSelectResults[answer.idChoice].price * answer.quantityChoice + " currency units, please.");
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: idSelectResults[answer.idChoice].stock_quantity - answer.quantityChoice
                            },
                            {
                                item_id: answer.idChoice
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your transaction is complete, have a nice day :)");
                            searchBamazon();
                        }
                    );
                } else {
                    console.log("Sorry, my lazy boss hasn't gotten the new shipment together yet.  We'll call you when it arrives!");
                    searchBamazon();
                }
            });
    });
};