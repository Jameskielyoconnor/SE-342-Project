const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'inventory_manager',
});

app.get('/items', (req, res) => {
    db.query("SELECT * FROM items", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/create', (req, res) => {
    console.log(req.body.itemDesciption)
    const itemDesciption = req.body.itemDesciption
    const itemQuantity = req.body.itemQuantity
    const itemMinPar = req.body.itemMinPar
    const itemMaxPar = req.body.itemMaxPar
    const wage = req.body.wage

    db.query(
        'INSERT INTO items (itemDescription, itemQuantity, itemMinPar, itemMaxPar) VALUES (?,?,?,?)',
        [itemDesciption, itemQuantity, itemMinPar, itemMaxPar], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else
            res.send ('values inserted');
        }
     );
});


app.put("/update", (req, res) => {
    const id = req.body.itemID
    const quantity = req.body.itemQuantity;
    db.query(
      "UPDATE items SET itemQuantity = ? WHERE itemID = ?",
      [quantity, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    db.query("DELETE FROM items WHERE itemID = ? ", id, (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log('your server works')
})