const storePortal = require('./mysql')
const inquirer = require('inquirer')

const log = console.log
// storePortal.getProducts()
let displayCounter = 0

const intro = 'Welcome to Fantasy Costco! I\'m Garfield the deals Warlock.'
const garfield = `ヽ༼ຈل͜ຈ༽⊃─☆*:・ﾟ`

const typewriter = (string, time = 100) => {
    let display = ''
    let counter = 0
    const addLetter = () => {
        setTimeout(() => {
            display += string[counter]
            counter++
            console.clear()
            log(display)
            if (display.length !== string.length) addLetter()
            else {
                log(garfield)
                startShopping()
            }
        }, time)
    }
    addLetter()
}

const startShopping = () => {
    inquirer.prompt({
        name: 'welcome',
        type: 'confirm',
        message: 'Would you like to do some shopping today?'
    }).then((answer) => {
        if (!answer.welcome) { log('Come back soon!') && process.exit() }
        else {
            displayProducts()
        }
    })
}

const displayProducts = () => {
    inquirer.prompt({
        name: 'selectProducts',
        message: 'What is the ID of the item you\'d like to purchase?',
        type: 'list',
        choices: [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(el => el + "")
    }).then((answer) => {
        storePortal.connection.query(
            "SELECT * FROM products WHERE id = " + answer.selectProducts, (err, results) => {
                let item = results[0];
                if (err) throw err;
                checkStock(item)
            }
        )
        // connection.end()
    })
}

const checkStock = (item) => {
    inquirer.prompt({
        name: 'howMuch',
        message: 'How many ' + item.item_name + "'s?",
        type: 'input',
    }).then((answer) => {
        if (item.stock_quantity > answer.howMuch) {
            storePortal.purchaseItem(item.item_id, answer.howMuch)
            log("Here you go come back soon!")
        } else {
            log('Looks like we don\'t have enough in the shop')
            startShopping()
        }
    })
}

typewriter(intro, 20);
