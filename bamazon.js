var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Pandab3ar",
    database: "bamazon"
});

// APP STARTS HERE
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayTable();
});



function displayTable() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

        console.table(res);
        askUserQuestions();

    });
}


function askUserQuestions() {
    inquirer
        .prompt([{
            name: "buy",
            type: "input",
            message: "Please enter the ID of the item you would like to buy",
        }, {
            name: "quantity",
            type: "input",
            message: "Please enter the quantity of the item you would like to buy",
        }]).then(function(answer) {
            console.log(answer.buy)
            console.log(answer.quantity)
            makePurchase(answer)
        });
}

function makePurchase(answer) {
    connection.query("UPDATE products SET Stock_Quantity = Stock_Quantity - ? WHERE Item_id = ?", [answer.buy, answer.quantity], function(err, res) {
        if (err) throw err;
        console.log("Purchase Made!");

    })
}

function that makes query to make sure
if row item quantity is greater than or equal to amount they want to buy

console.log
if insuficient quantity
only call make purchase
if enough in stock(quantity from the res)

quatity they buy from current quantity




// // function to handle posting new items up for auction
// function postAuction() {
//     // prompt for info about the item being put up for auction
//     inquirer
//         .prompt([{
//                 name: "item",
//                 type: "input",
//                 message: "What is the item you would like to submit?"
//             },
//             {
//                 name: "category",
//                 type: "input",
//                 message: "What category would you like to place your auction in?"
//             },
//             {
//                 name: "startingBid",
//                 type: "input",
//                 message: "What would you like your starting bid to be?",
//                 validate: function(value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function(answer) {
//             // when finished prompting, insert a new item into the db with that info
//             connection.query(
//                 "INSERT INTO auctions SET ?", {
//                     item_name: answer.item,
//                     category: answer.category,
//                     starting_bid: answer.startingBid,
//                     highest_bid: answer.startingBid
//                 },
//                 function(err) {
//                     if (err) throw err;
//                     console.log("Your auction was created successfully!");
//                     // re-prompt the user for if they want to bid or post
//                     start();
//                 }
//             );
//         });
// }

// function bidAuction() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM products", function(err, results) {
//         if (err) throw err;
//         // once you have the items, prompt the user for which they'd like to bid on
//         inquirer
//             .prompt([{
//                     name: "choice",
//                     type: "rawlist",
//                     choices: function() {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].Product_name);
//                         }
//                         return choiceArray;
//                     },
//                     message: "What product would you like to buy?"
//                 },
//                 {
//                     name: "buy",
//                     type: "input",
//                     message: "How many would you like to buy?"
//                 }
//             ])
//             .then(function(answer) {
//                 // get the information of the chosen item
//                 var chosenItem;
//                 for (var i = 0; i < results.length; i++) {
//                     if (results[i].Product_name === answer.choice) {
//                         chosenItem = results[i];
//                     }
//                 }
//                 checkQuantity(chosenItem, answer.buy);


//                 // determine if bid was high enough
//                 // if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                 //     // bid was high enough, so update db, let the user know, and start over
//                 //     connection.query(
//                 //         "UPDATE auctions SET ? WHERE ?", [{
//                 //                 highest_bid: answer.bid
//                 //             },
//                 //             {
//                 //                 id: chosenItem.id
//                 //             }
//                 //         ],
//                 //         function(error) {
//                 //             if (error) throw err;
//                 //             console.log("Bid placed successfully!");
//                 //             start();
//                 //         }
//                 //     );
//                 // } else {
//                 // bid wasn't high enough, so apologize and start over
//                 // console.log("Your bid was too low. Try again...");
//                 start();
//                 // }
//             });
//     });
// }

// start();

// // ELECT Product_name, Stock_Quantity FROM products WHERE Product_name = '" + someVar + "'
// // Stock_Quantity > 0

// function checkQuantity(Product_name, Quantity) {
//     // query the database for all items being sold

//     // SELECT Product_name, Stock_Quantity FROM bamazon.products WHERE Product_name="soap"

//     connection.query("SELECT Stock_Quantity FROM products WHERE Product_name = '" + Product_name + "'", function(err, results) {
//         // if (err) throw err;
//         // once you have the items, prompt the user for which they'd like to buy
//         inquirer
//             .prompt([{
//                     name: "choice",
//                     type: "rawlist",
//                     choices: function() {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].item_name);
//                         }
//                         return choiceArray;
//                     },
//                     message: "What product would you like to buy?"
//                 },
//                 {
//                     name: "buy",
//                     type: "input",
//                     message: "How many would you like to buy?"
//                 }
//             ])
//             .then(function(answer) {
//                 // get the information of the chosen item
//                 var chosenItem;
//                 for (var i = 0; i < results.length; i++) {
//                     if (results[i].item_name === answer.choice) {
//                         chosenItem = results[i];
//                     }
//                 }

//                 // determine if bid was high enough
//                 if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                     // bid was high enough, so update db, let the user know, and start over
//                     connection.query(
//                         "UPDATE auctions SET ? WHERE ?", [{
//                                 highest_bid: answer.bid
//                             },
//                             {
//                                 id: chosenItem.id
//                             }
//                         ],
//                         function(error) {
//                             if (error) throw err;
//                             console.log("Bid placed successfully!");
//                             start();
//                         }
//                     );
//                 } else {
//                     // bid wasn't high enough, so apologize and start over
//                     console.log("Your bid was too low. Try again...");
//                     start();
//                 }
//             });
//     });
// }

// updateProduct();
// stockQuant = res[i].Stock_Quantity - StockQuant;
// console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + stockQuant);




// console.log("-----------------------------------");
// console.log(res.affectedRows + " item purchased!\n" + "Your total is " + total + "\n");

// if (err) throw err;
// Log all results of the SELECT statement