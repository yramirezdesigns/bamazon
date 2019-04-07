var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 8889,

  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please tell us what department!",
      choices: [
        "Find department",
        "Find label",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find department":
        department_name_Search();
        break;

      case "Find label":
        product_name_Search();
        break;

      case "Find label":
      price_Search();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function department_name_Search() {
  inquirer
    .prompt({
      name: "department_name",
      type: "input",
      message: "Find department"
    })
    .then(function(answer) {
      var query = 'SELECT COUNT(*) FROM products WHERE ?';
      connection.query(query, { department: answer.department }, function(err, res) {
        console.log(res);
        runSearch();
      });
    });
}

function product_name_Search() {
  var query = 'SELECT products FROM products GROUP BY product name HAVING count(*) > 1'
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product);
    }
    runSearch();
  });
}

function  price_Search() {
  inquirer
    .prompt([
      {
        name: "price",
        type: "input",
        message: "find by price: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending year: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = 'SELECT position, department, product FROM products'
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || department: " +
              res[i].department +
              " || product: " +
              res[i].product 
          );
        }
        runSearch();
      });
    });
}

// function department_name_Search() {
//   inquirer
//     .prompt({
//       name: "department",
//       type: "input",
//       message: "Find department"
//     })
//     .then(function(answer) {
//       console.log(answer.song);

//       var q = connection.query("SELECT * FROM top5000 WHERE ?", { year: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         console.log(q.sql);
//         runSearch();
//       });
//     });
// }
