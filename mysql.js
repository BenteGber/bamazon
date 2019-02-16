const log = console.log

const mysql = require('mysql')


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: 'fantasy_costco'
});

// const startConnection = () => {
//     connection.connect((err) => {
//         if (err) throw err
//     })
// }

let column = '*'
//Function to get products from database
const getProducts = () => {
    connection.query(
        "SELECT * FROM products", (err, results) => {
            if (err) throw err;
            let products = results.map((el) => { return { id: el.id, name: el.item_name, price: el.price, description: el.description } })
            return products
        }
    )
    connection.end()
}
const getItem = (id) => {
    connection.query(
        "SELECT * FROM products WHERE id =" + id, (err, results) => {
            if (err) throw err;
            return results[0].item_name
        }
    )
    connection.end()
}

const addUser = (user) => {
    connection.query('INSERT INTO users SET ?',
        user, (err) => {
            if (err) throw err;
        })
}
const purchaseItem = (id, purchaseQuantity) => {
    connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: purchaseQuantity
            },
            {
                id: id
            }
        ],
        (err) => {
            if (err) throw err;
        }
    )
}

module.exports = {
    connection: connection,
    getProducts: getProducts,
    addUser: addUser,
    getItem: getItem,
    purchaseItem: purchaseItem

}