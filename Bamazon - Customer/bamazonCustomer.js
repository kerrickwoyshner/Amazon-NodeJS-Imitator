// Hello! This application is handy for reviewing inventory and making purchase in an Amazon-like application.
// run "source schema.sql" in the mysql command-line interface to get started
// The instructions are intuitive and walk you through each step of the application when you run it in Node.js

// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    else {
        searchBamazon();
    }
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
                " -- Quantity: " + response[i].stock_quantity + " \n");
        }
        promptCustomerForItem(response);
    });
}

// Prompt the customer for a product ID
function promptCustomerForItem(inventory) {
    // Prompts user for what they would like to purchase
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "Hi there! Please write the ID # of the item that you'd like to purchase [Quit with Q]",
                validate: function (val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function (val) {
            // Check if the user wants to quit the program
            checkIfShouldExit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);

            // If there is a product with the id the user chose, prompt the customer for a desired quantity
            if (product) {
                // Pass the chosen product to promptCustomerForQuantity
                promptCustomerForQuantity(product);
            }
            else {
                // Otherwise let them know the item is not in the inventory, re-run searchBamazon
                console.log("\nThat item is not in the inventory.");
                searchBamazon();
            }
        });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many would you like? [Quit with Q]",
                validate: function (val) {
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function (val) {
            // Check if the user wants to quit the program
            checkIfShouldExit(val.quantity);
            var quantity = parseInt(val.quantity);

            // If there isn't enough of the chosen product and quantity, let the user know and re-run searchBamazon
            if (quantity > product.stock_quantity) {
                console.log("\nSorry, my lazy boss has not gotten the new shipment yet. \n We will call you when it arrives!");
                searchBamazon();
            }
            else {
                // Otherwise run makePurchase, give it the product information and desired quantity to purchase
                makePurchase(product, quantity);
            }
        });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function (err, res) {
            // Let the user know the purchase was successful, calculate the cost of their purchase, and re-run searchBamazon
            console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            console.log("\nThat will be " + product.price * quantity + " currency units, please :)");
            searchBamazon();
        }
    );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {
            // If a matching product is found, return the product
            return inventory[i];
        }
    }
    // Otherwise return null
    return null;
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
        // Log a message and exit the current node process
        console.log("Goodbye!");
        process.exit(0);
    }
}