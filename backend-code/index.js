const express = require('express')
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const upload = multer({dest: 'receipt_uploads/'})

const corsOptions = {
    origin: '*'
}

dotenv.config({ path: './.env' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
// Add this code before defining your routes
app.use('/receipt_uploads', express.static('receipt_uploads'));
app.use('/delivery_notes_uploads', express.static('receipt_uploads'));
app.use('/saphrone_participants_profile_pictures_uploads', express.static('receipt_uploads'));

const port = process.env.SERVER_PORT;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


try {
    db.connect();
    console.log('database connection is successful')
} catch (error) {
    console.log(error)
}



// Set up the endpoint for receipt image upload
app.post('/saveexpensereceipt', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    const file = req.file;
    const expenseId = req.body.expenseId;
  
    console.log(req.body);
    console.log(req.file);
  
    if (!file || !expenseId) {
      return res.status(400).json({ message: 'Missing file or expenseId' });
    }
  
    const imagePath = path.join('receipt_uploads/', file.filename);
  
    // Save the image source to the database
    const sqlInsert = "INSERT INTO expensesreceipts (expenditureid, receiptimage) VALUES (?, ?)";
    db.query(sqlInsert, [expenseId, imagePath], (err) => {
      if (err) {
        console.error('Error saving receipt to the database:', err);
        return res.status(500).json({ message: 'Error saving receipt' });
      }
  
      res.json({ message: 'Receipt uploaded and saved successfully' });
    });
  });



// Set up the endpoint for receipt image upload
app.post('/saveequatorialexpensereceipt', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    const file = req.file;
    const expenseId = req.body.expenseId;
  
    console.log(req.body);
    console.log(req.file);
  
    if (!file || !expenseId) {
      return res.status(400).json({ message: 'Missing file or expenseId' });
    }
  
    const imagePath = path.join('receipt_uploads/', file.filename);
  
    // Save the image source to the database
    const sqlInsert = "INSERT INTO equatorialexpensesreceipts (expenditureid, receiptimage) VALUES (?, ?)";
    db.query(sqlInsert, [expenseId, imagePath], (err) => {
      if (err) {
        console.error('Error saving receipt to the database:', err);
        return res.status(500).json({ message: 'Error saving receipt' });
      }
  
      res.json({ message: 'Receipt uploaded and saved successfully' });
    });
  });







//1. registration route for all supervisors by the system admin ---route is tested and it is working as expected
app.post('/registersupervisor', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const username = req.body.username
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const branch = req.body.branch
            const dob = req.body.dob
            const contact = req.body.contact
            const email = req.body.email
            const gender = req.body.gender
            const dateofregistration = new Date()
            const password = req.body.password

            // console.log(Id,username,firstname,lastname,gender)
            const saltRounds = 12;
            const encryptedPwd = bcrypt.hashSync(password, saltRounds);
            //missing code to check if user already exists
            db.query('SELECT * FROM users WHERE username = ?;', username, function (error, results) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    res.send('The username you are trying to register is already associated with an account.')
                } else {
                    const sqlInsert = "Insert into users(username,firstname,lastname,branch,dob,contact,email,gender,dateofregistration,password) values(?,?,?,?,?,?,?,?,?,?)"
                    db.query(sqlInsert, [username, firstname, lastname, branch, dob, contact, email, gender, dateofregistration, encryptedPwd], (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('success')
                            res.send('Registration successful');
                        }
                    })
                }
            })
        }

    })
})

//2. reset profile password route for all supervisors ---route is tested and it is working as expected
app.post('/passwordreset', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const username = req.body.username
            const password = req.body.password

            // console.log(Id,username,firstname,lastname,gender)
            const saltRounds = 10;
            const encryptedPwd = bcrypt.hashSync(password, saltRounds);
            //missing code to check if user already exists
            db.query('SELECT * FROM users WHERE username = ?;', username, function (error, results) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    const sqlInsert = "UPDATE users SET password = ?"
                    db.query(sqlInsert, encryptedPwd, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('success')
                            res.send('Password reset successful. Please log into the system with the new password.');
                        }
                    })
                } else {
                    res.send('The user profile you are trying to edit doesnot exist.')
                }
            })
        }

    })
})


//3. registration route for all items into database ---route is tested and it is working as expected
app.post('/registeritem', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.itemName
            const category = req.body.category
            //missing code to check if item already exists
            db.query('SELECT * FROM inventory WHERE name = ?;', name, function (error, results) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    res.send('This item is already registered.')
                } else {
                    const sqlInsert = "Insert into inventory(name, category) values(?, ?)"
                    db.query(sqlInsert, [name, category], (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('success')
                            res.send('Item registration successful.');
                        }
                    })
                }
            })
        }

    })
})


//4. deletion route for all items into database ---route is tested and it is working as expected
app.post('/deleteitem', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.itemName
            //missing code to check if item already exists
            db.query('SELECT * FROM inventory WHERE name = ?;', name, function (error, results) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    const sqlQuery = "DELETE FROM inventory WHERE name= ?;"
                    db.query(sqlQuery, name, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('success')
                            res.send('Item deletion successful.');
                        }
                    })
                } else {
                    res.send('This item you are trying to delete doesnot exist')
                }
            })
        }

    })
})

//5. fetching item list from database ---route is tested and it is working as expected
app.post('/itemlist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            let category = 'seed'
            db.query('SELECT * from inventory WHERE category = ?', category, (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved items.')
                }
            })
        }
    })
})

app.post('/allitemslist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * from inventory', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved items.')
                }
            })
        }
    })
})


//5. fetching item list from database ---route is tested and it is working as expected
app.post('/fetchprojectsequipment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * from materials;', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    console.log(results)
                    res.send(results)
                } else {
                    res.send('There are no saved items.')
                }
            })
        }
    })
})





//6. saving incoming and outgoing inventory records route for supervisors ---route is tested and it is working as expected
app.post('/saveinventoryrecord', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const branch = req.body.branch
            const role = req.body.role
            const department = req.body.department
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const itemName = req.body.itemname
            const reason = req.body.reason
            const additionalInfo = req.body.additionalinfo
            const sourceBranch = req.body.sourceBranch
            const broughtBy = req.body.broughtBy
            const destinationBranch = req.body.destinationBranch
            const recievedBy = req.body.recievedBy
            const quantity = req.body.quantity
            const actualquantity = req.body.actualquantity
            const damages = req.body.damages
            const expectedOutput = req.body.expectedOutput
            const measurementUnit = req.body.mstUnit
            const category = req.body.category
            const authorizedBy = req.body.authorizedBy
            const Id = `T-${sourceBranch}-${destinationBranch}-${Math.floor(Math.random() * 180000)}`

            if (branch === 'masanafu' && role === 'manager' && department === 'production') {
                db.query('SELECT * FROM inventorytransactions WHERE id = ?;', Id, function (error, results) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        res.send('Transaction Id is already used.Please try again.')
                    } else {
                        if (category === "incoming") {
                            db.query('SELECT * FROM mpstore WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (err, results) {
                                // If there is an issue with the query, output the error
                                if (err) throw err;
                                // If the account exists
                                if (results.length === 0) {
                                    const sqlStockCount = "Insert into mpstore(name,quantityinstock,measurementunits) values(?,?,?)"
                                    db.query(sqlStockCount, [itemName, actualquantity, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, damages, expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE mpstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else {
                                    console.log("Error while increasing the item quantity in stock.")
                                }
                            })
                        } else if (category === "outgoing") {
                            db.query('SELECT * FROM mpstore WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (error, results) {
                                // If there is an issue with the query, output the error
                                if (error) throw error;

                                if (parseFloat(results[0].quantityinstock) < parseFloat(actualquantity)) {
                                    res.send("The quantity of this item in the store is less than the quantity required for this transaction.Please restock this item and try again");
                                } else if (results.length === 0) {
                                    res.send("This item is not in store")
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE mpstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else {
                                    console.log("Error while decreasing the item quantity in stock.")
                                }
                            })
                        }
                    }
                })
            } else if (branch === 'masanafu' && role === "custodian" && department === "production") {
                db.query('SELECT * FROM inventorytransactions WHERE id = ?;', Id, function (error, results) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        res.send('Transaction Id is already used.Please try again.')
                    } else {
                        if (category === "incoming") {
                            db.query('SELECT * FROM mgeneralstore WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (err, results) {
                                // If there is an issue with the query, output the error
                                if (err) throw err;
                                // If the account exists
                                if (results.length === 0) {
                                    const sqlStockCount = "Insert into mgeneralstore(name,quantityinstock,measurementunits) values(?,?,?)"
                                    db.query(sqlStockCount, [itemName, actualquantity, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, damages, expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE mgeneralstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else {
                                    console.log("Error while increasing the item quantity in stock.")
                                }
                            })
                        } else if (category === "outgoing") {
                            db.query('SELECT * FROM mgeneralstore WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (error, results) {
                                // If there is an issue with the query, output the error
                                if (error) throw error;

                                if (parseFloat(results[0].quantityinstock) < parseFloat(actualquantity)) {
                                    res.send("The quantity of this item in the store is less than the quantity required for this transaction.Please restock this item and try again");
                                } else if (results.length === 0) {
                                    res.send("This item is not in store")
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE mgeneralstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else {
                                    console.log("Error while decreasing the item quantity in stock.")
                                }
                            })
                        }
                    }
                })
            } else if (branch === 'namungoona') {
                db.query('SELECT * FROM inventorytransactions WHERE id = ?;', Id, function (error, results) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        res.send('Transaction Id is already used.Please try again.')
                    } else {
                        if (category === "incoming") {
                            db.query('SELECT * FROM store WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (err, results) {
                                // If there is an issue with the query, output the error
                                if (err) throw err;
                                // If the account exists
                                if (results.length === 0) {
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, damages, expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success.Incoming inventory transaction has been saved.')
                                        }
                                    })
                                    const sqlStockCount = "Insert into store(name,quantityinstock,measurementunits) values(?,?,?)"
                                    db.query(sqlStockCount, [itemName, actualquantity, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else if (results.length > 0) {
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('success.Incoming inventory transaction has been saved.')
                                        }
                                    })
                                    let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE store SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                   
                                } else {
                                    console.log("Error while increasing the item quantity in stock.")
                                }
                            })
                        } else if (category === "outgoing") {
                            db.query('SELECT * FROM store WHERE name = ? AND measurementunits = ?;', [itemName, measurementUnit], function (error, results) {
                                // If there is an issue with the query, output the error
                                if (error) throw error;
                                if (parseFloat(results[0].quantityinstock) < parseFloat(actualquantity)) {
                                    res.send("The quantity of this item in the store is less than the quantity required for this transaction.Please restock this item and try again");
                                } else if (results.length === 0) {
                                    res.send("This item is not in store")
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(actualquantity);
                                    const sqlStockCount = "UPDATE store SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                    db.query(sqlStockCount, [newStockCount, itemName, measurementUnit], (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                    const sqlInsert = "Insert into inventorytransactions(Id,date,inventoryname,reason,additionalnotes,sourcebranch,broughtby,destinationbranch,recievedby,quantity,actualquantity,damages,expectedoutput,measurementunit,category,authorizedby,authorizedbyrole,branch,department) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                    db.query(sqlInsert, [Id, date, itemName, reason, additionalInfo, sourceBranch, broughtBy, destinationBranch, recievedBy, quantity, actualquantity, parseFloat(damages), expectedOutput, measurementUnit, category, authorizedBy, role, branch, department], (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        } else {
                                            console.log('success')
                                            res.send('Inventory record saved succesfully');
                                        }
                                    })
                                } else {
                                    console.log("Error while decreasing the item quantity in stock.")
                                }
                            })
                        }
                    }
                })
            } else {
                console.log('error')
            }
        }
    })
})

//route to fetch department data for order placement form depending on the chosen branch
app.post('/departmentData', (req, res) => {
    const branch = req.body.branch

    if (branch !== '') {
        db.query('SELECT department FROM departments WHERE branch = ?;', branch, (error, results) => {
            if (error) throw (error);

            if (results.length > 0) {
                console.log(results)
                res.send(results)
            } else {
                console.log('Failed Operation')
            }
        })
    } else {
        res.send('Please choose a branch.')
    }
})

//route to fetch role data for order placement form depending on the chosen department
app.post('/roleData', (req, res) => {
    const department = req.body.department

    if (department !== '') {
        db.query('SELECT role FROM users WHERE department = ?;', department, (error, results) => {
            if (error) throw (error);

            if (results.length > 0) {
                console.log(results)
                res.send(results)
            } else {
                console.log('Failed Operation')
            }
        })
    } else {
        res.send('Please choose a department.')
    }
})

//route to fetch personnel for order placement form
app.post('/personnelData', (req, res) => {
    const role = req.body.role

    if (role !== '') {
        db.query('SELECT username FROM users WHERE role = ?;', role, (error, results) => {
            if (error) throw (error);

            if (results.length > 0) {
                res.send(results)
            } else {
                console.log('Failed Operation')
            }
        })
    } else {
        res.send('Please choose a  role.')
    }
})

//7. View inventory records ---route is tested and it is working as expected
app.post('/inventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM inventorytransactions', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    console.log(results)
                    res.send(results)
                } else {
                    res.send({status:500, msg:'There are no records found.'})
                }
            })
        }
    })
})



//fetch stock taking records ---route is tested and it is working as expected
app.post('/stocktaking', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const branch = req.body.branch
            const department = req.body.department
            const role = req.body.role

            if (branch === 'masanafu' && department === 'production' && role === "manager" ) {
                db.query('SELECT * FROM mpstore;', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.status(204).send('There are no items that are out of stock.');
                    }
                })
            } else if (branch === 'masanafu' && department === 'production' && role === "custodian" ) {
                db.query('SELECT * FROM mgeneralstore;', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.status(204).send('There are no items that are out of stock.');
                    }
                })
            } else if (branch === 'namungoona') {
                db.query('SELECT * FROM store;', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.status(204).send('There are no items that are out of stock.');
                    }
                })  
            } else {
                console.log('Failed Operation due to empty parameters.')
            }
        }
    })
})




//   raw materials from other branches
app.post('/requestrawmaterials', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const requisitionId = `RFM-${Math.floor(Math.random() * 1800000)}`
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const orderId = req.body.orderId
            const requesterBranch = req.body.sourcebranch
            const requesterDepartment = req.body.orderedbydepartment
            const requesterRole = req.body.orderedbyrole
            const requestedBy = req.body.orderedby

            const requestedFromBranch = req.body.destinationbranch
            const recieversDepartment = req.body.recieverdepartment
            const recieversRole = req.body.recieverrole
            const recievedBy = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = "pending"

            const sqlInsert = "Insert into rawmaterialrequisitions(requisitionid,date,orderid,requesterbranch,requesterdepartment,requesterrole,requestedby,requestedfrombranch,recieverdepartment,recieverrole,recievedby,itemsrequested,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [requisitionId, date, orderId, requesterBranch, requesterDepartment, requesterRole, requestedBy, requestedFromBranch, recieversDepartment, recieversRole, recievedBy, itemsRequested,additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})




//   request project equipment
app.post('/requestprojectsequipment', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const requisitionId = `RFM-${Math.floor(Math.random() * 1800000)}`
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const orderId = req.body.orderId
            const requesterBranch = req.body.sourcebranch
            const requesterDepartment = req.body.orderedbydepartment
            const requesterRole = req.body.orderedbyrole
            const requestedBy = req.body.orderedby

            const requestedFromBranch = req.body.destinationbranch
            const recieversDepartment = req.body.recieverdepartment
            const recieversRole = req.body.recieverrole
            const recievedBy = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = "pending"

            const sqlInsert = "Insert into projectsequipmentrequisitions(requisitionid,date,orderid,requesterbranch,requesterdepartment,requesterrole,requestedby,requestedfrombranch,recieverdepartment,recieverrole,recievedby,itemsrequested,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [requisitionId, date, orderId, requesterBranch, requesterDepartment, requesterRole, requestedBy, requestedFromBranch, recieversDepartment, recieversRole, recievedBy, itemsRequested,additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})





























//   farm requests
app.post('/requestseeds', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const requisitionId = `RFM-${Math.floor(Math.random() * 1800000)}`
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const batchNo = req.body.batchNo
            const requesterBranch = req.body.sourcebranch
            const requesterDepartment = req.body.orderedbydepartment
            const requesterRole = req.body.orderedbyrole
            const requestedBy = req.body.orderedby

            const requestedFromBranch = req.body.destinationbranch
            const recieversDepartment = req.body.recieverdepartment
            const recieversRole = req.body.recieverrole
            const recievedBy = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = req.body.initialStatus

            const sqlInsert = "Insert into farmrequests(requisitionid,date,batchno,requesterbranch,requesterdepartment,requesterrole,requestedby,requestedfrombranch,recieverdepartment,recieverrole,recievedby,itemsrequested,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [requisitionId, date, batchNo, requesterBranch, requesterDepartment, requesterRole, requestedBy, requestedFromBranch, recieversDepartment, recieversRole, recievedBy, itemsRequested,additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send('Operation Successful');
                }
            })
        }
    })
})


//route to fetch batch data for stage update
app.post('/fetchdatafromfarm', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNo
            db.query('SELECT * FROM farm WHERE batchno = ? ORDER BY stagestartedon DESC LIMIT 1;', batchNo , (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    console.log('latest batch status', results)
                    res.send(results)
                } else {
                    res.send('No Data found.')
                }
            })
        }
    })
})

//place orders from other branches
app.post('/placeorder', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const orderId = `OR-${Math.floor(Math.random() * 1800000)}`
            const sourceBranch = req.body.sourcebranch
            const orderedByDepartment = req.body.orderedbydepartment
            const orderedByRole = req.body.orderedbyrole
            const orderedBy = req.body.orderedby
            const destinationBranch = req.body.destinationbranch
            const recieverDepartment = req.body.recieverdepartment
            const recieverRole = req.body.recieverrole
            const deliveredTo = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = "pending"
            
            console.log(additionalInfo)
            const sqlInsert = "Insert into productorders(orderid,date,sourcebranch,orderedbydepartment,orderedbyrole,orderby,destinationbranch,recieverdepartment,recieverrole,deliveredto,itemsordered,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [orderId, date, sourceBranch, orderedByDepartment, orderedByRole, orderedBy, destinationBranch, recieverDepartment, recieverRole, deliveredTo, itemsRequested, additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})






//place projects orders
app.post('/placeprojectsorder', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const orderId = req.body.orderId
            const sourceBranch = req.body.sourcebranch
            const orderedByDepartment = req.body.orderedbydepartment
            const orderedByRole = req.body.orderedbyrole
            const orderedBy = req.body.orderedby 
            const destinationBranch = req.body.destinationbranch
            const recieverDepartment = req.body.recieverdepartment
            const recieverRole = req.body.recieverrole
            const deliveredTo = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = "pending"
            console.log(req.body.itemsrequested)
            const itemsRequestedJson = JSON.parse(itemsRequested)
            const orderedQuantity = itemsRequestedJson[0].itemQuantity


            
            //console.log(additionalInfo)
            const sqlInsert = "Insert into projectsorders(orderid,date,sourcebranch,orderedbydepartment,orderedbyrole,orderby,destinationbranch,recieverdepartment,recieverrole,deliveredto,itemsordered,orderedquantitynotdelivered,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [orderId, date, sourceBranch, orderedByDepartment, orderedByRole, orderedBy, destinationBranch, recieverDepartment, recieverRole, deliveredTo, itemsRequested, orderedQuantity, additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})






//route to save pre-exhibition data
app.post('/saveexhibitiondata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            if (req.body.status === "preexhibition") {
                const exhibitionName = req.body.exhibitionName
                const date = req.body.date
                const items = req.body.items
                const filledfrombranch = req.body.filledfrombranch
                const filledbydepartment = req.body.filledbydepartment
                const filledbyrole = req.body.filledbyrole
                const filledbyuser = req.body.filledbyuser
                const formType = req.body.status


                JSON.parse(items).map(item => {
                    db.query('SELECT * FROM mgeneralstore WHERE name = ? AND measurementunits = ?;', [item.itemName, item.mUnits], function (error, results) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;

                        if (results.length === 0) {
                            res.send("One of the items is not in store")
                            console.log('first ', results)
                        } else if (results.length > 0){
                            if (parseFloat(results[0].quantityinstock) < parseFloat(item.itemQuantity)){
                                res.send("The quantity of one of the items in the store is less than the quantity required. Please restock and try again");
                            }else{
                                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(item.itemQuantity);
                                console.log('third ', results, results[0].quantityinstock, parseFloat(results[0].quantityinstock), parseFloat(item.itemQuantity), newStockCount)
                                const sqlStockCount = "UPDATE mgeneralstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                db.query(sqlStockCount, [newStockCount, item.itemName, item.mUnits], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully', newStockCount, item.itemName, item.mUnits)
                                    }
                                })
                            }
                        }                                
                    })
                }) 
                const sqlInsert = "Insert into exhibitions(exhibitionname,date,itemsrecord,filledfrombranch,filledbydepartment,filledbyrole,filledbyuser,status) values(?,?,?,?,?,?,?,?)"
                    db.query(sqlInsert, [exhibitionName, date, items, filledfrombranch, filledbydepartment, filledbyrole, filledbyuser, formType], (err) => {
                        if (err) {
                            console.log(err)
                        }else{
                            res.send("Exhibition data has been saved successfully")
                        }
                    })

            } else if (req.body.status === "postexhibition") {
                const exhibitionName = req.body.exhibitionName
                const date = req.body.date
                const items = req.body.items
                const formType = req.body.status
                
                console.log('post-exhibition data', exhibitionName, date, items, formType)
                db.query('UPDATE exhibitions SET itemsrecord = ?, status = ? WHERE exhibitionname = ? AND date = ?;', [items, formType, exhibitionName, date], (error) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //update stock in general store

                    JSON.parse(items).map(item => {
                        db.query('SELECT * FROM mgeneralstore WHERE name = ? AND measurementunits = ?;', [item.itemName, item.mUnits], function (error, results) {
                            // If there is an issue with the query, output the error
                            if (error) throw error;
    
                            if (results.length === 0) {
                                res.send("Error while updating stock count in store")
                                console.log('first ', `${results[0].name}One of the items doesnot exist in the general store.`)
                            } else {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(item.itemQuantityReturned);
                                console.log('adding returned products back to store ', results, results[0].quantityinstock, parseFloat(results[0].quantityinstock), parseFloat(item.itemQuantity), newStockCount)
                                const sqlStockCount = "UPDATE mgeneralstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                                db.query(sqlStockCount, [newStockCount, item.itemName, item.mUnits], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send("Exhibition data has been saved successfully")
                                        console.log('item Quantity Returned has been successfully added back to the store.', newStockCount, item.itemName, item.mUnits)
                                    }
                                })
                            }                            
                         })
                    })
                })
            }

        }
    })
})





//5. fetching exhibition list from database ---route is tested and it is working as expected
app.post('/exhibitionlist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT exhibitionname FROM exhibitions;', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved exhibitions.')
                }
            })
        }
    })
})


//5. fetching exhibition list from database ---route is tested and it is working as expected
app.post('/fetchallexhibitiondata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM exhibitions;', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no exhibition data.')
                }
            })
        }
    })
})


// route to fetch exhibition data for the post-exhibition form
app.post('/exhibitiondata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const exName = req.body.exhibitionName
            const exDate = req.body.exhibitionDate
            db.query('SELECT * FROM exhibitions WHERE exhibitionname = ? AND date = ?;', [exName, exDate], (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No exhibition Data found.')
                }
            })
        }
    })
})



//route to get all orders with pending status from database
app.post('/pendingorders', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const initialStatus = 'pending'
            const branch = req.body.branch

                db.query('SELECT * FROM productorders WHERE status = ? AND destinationbranch = ?;', [initialStatus, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send('Error.Please contact system admin.')
                    }
                })           
        }
    })
})

//route to get all raw material requests with pending status from database
app.post('/pendingrawmaterialrequests', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const initialStatus = 'pending'
            const branch = req.body.branch
            db.query('SELECT * FROM rawmaterialrequisitions WHERE status = ? AND requestedfrombranch = ?;', [initialStatus, branch], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results)
                    res.send(results)
                } else {
                    res.send('User does not exist.Contact the system admin.')
                }
            })
        }
    })
})


//route to get all orders with 'sent to production unit' status from database
app.post('/approvedorders', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const initialStatus = 'sent to the production unit'
            const branch = req.body.branch
            const dept = req.body.dept
            const projStatus = 'pending'
            if(dept === 'projects'){
                    db.query('SELECT * FROM projectsorders WHERE status = ?;', projStatus, (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        console.log(results.length)
                        res.send(results)
                    } else {
                        res.send('There are no pending orders from the custodian.')
                    }
                })
            }else{
                db.query('SELECT * FROM productorders WHERE status = ? AND destinationbranch = ? ;', [initialStatus, branch], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no pending orders from the custodian.')
                }
            })
            }
            
        }
    })
})


//route to get all farm records which are still active
app.post('/fetchfarmrequisitions', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const status = 'pending'
            db.query('SELECT * FROM farmrequests WHERE status = ?;',status, (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no farm requisition records.')
                }
            })
        }
    })
})


//route to get all projects records which are still active
app.post('/fetchprojectsrequisitions', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const status = 'pending'
            db.query('SELECT * FROM projectsequipmentrequisitions WHERE status = ?;',status, (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no projects requisition records.')
                }
            })
        }
    })
})



//route to fetch data of chosen farm batch
app.post('/fetchfarmrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo  = req.body.batchNo
            db.query('SELECT * FROM farm WHERE batchno = ?;', batchNo , (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There is farm record matching the chosen batch no.')
                }
            })
        }
    })
})

//route to register new farm records
app.post('/registernewfarmbatch', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const items = req.body.items
            const stage = req.body.stage
            db.query('INSERT INTO farm(batchno, items, stage, status) VALUES(?, ?, ?);', [batchNo, items, stage], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('Registration failed.')
                }
            })
        }
    })
})


//route to update active farm records
app.post('/savebatchstage', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const items = req.body.items
            const stage = req.body.stage
            const date = req.body.date
            db.query('INSERT INTO farm (batchno, items, stage, stagestartedon) VALUES (?, ?, ?, ?);', [batchNo, items, stage, date], (error, results) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                } else {
                    res.send('Success.')
                }
            })
        }
    })
})


//route to get all farm records
app.post('/viewfarmrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM farm;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no farm records.')
                }
            })
        }
    })
})

//route to get all farm requests
app.post('/viewfarmrequeststatus', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM farmrequests;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no farm requests.')
                }
            })
        }
    })
})

//route to get data for batch number
app.post('/fetchbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchno = req.body.batchNo
            let status = 'approved'
            db.query('SELECT batchno, itemsrequested FROM farmrequests WHERE status = ? AND batchno = ?;', [status, batchno], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no data matching the provided batch number.')
                }
            })
        }
    })
})



//route to save materials
app.post('/registermaterial', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.equipmentName
            const unitPrice = req.body.unitPrice
            db.query('INSERT INTO materials (name, unitPrice) VALUES (?,?);', [name, unitPrice], (error, results) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})
//route to fetch material data from db
app.post('/fetchallmaterials', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM materials ;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})







//route to save shop invetory
app.post('/registershopinventory', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.productName
            const unitPrice = req.body.unitPrice
            db.query('INSERT INTO shopProducts (productName, unitPrice) VALUES (?,?);', [name, unitPrice], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})


//route to fetch product data from db
app.post('/fetchallmasanafushopinventory', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM shopProducts JOIN masanafuShopInventory ON shopProducts.productId = masanafuShopInventory.productId', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


//fetch all registered product names
app.post('/fetchallshopproducts', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM shopProducts', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to fetch product data from db
app.post('/fetchallshopinventory', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM shopProducts JOIN equatorialShopInventory ON shopProducts.productId = equatorialShopInventory.productId', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to fetch product data from db
app.post('/fetchallmassageshopinventory', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM shopProducts JOIN equatorialMassageInventory ON shopProducts.productId = equatorialMassageInventory.productId', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})














//route to save projects
app.post('/saveproject', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.equipmentName

            db.query('INSERT INTO machinery (name) VALUES (?);', name, (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//route to fetch project data from db
app.post('/fetchallprojects', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM machinery;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


//route to save projects
app.post('/registermachinerydata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const machineId = req.body.equipmentName
            const itemsRequired = req.body.itemsRequired
            db.query('INSERT INTO requirements (machineid, itemsrequired) VALUES (?,?);', [machineId, itemsRequired] , (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})


//route to fetch all projects order data
app.post('/fetchprojectsorderdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderId = req.body.orderId
            db.query('SELECT * FROM projectsorders WHERE orderid = ?;', orderId , (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }    
            })
        }
    })
})






//route to fetch all projects order data
app.post('/fetchordermaterialdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const machineryName = req.body.machineryName
            db.query('SELECT id FROM machinery WHERE name = ?;', machineryName , (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results)
                    const id = results[0].id
                    db.query('SELECT * FROM requirements WHERE machineid = ?;', id , (error, results) => {
                        if (error) console.log(error)

                        if (results.length > 0) {
                            console.log(results)
                            const itemsRequired = JSON.parse(results[0].itemsrequired);
                            const itemNames = itemsRequired.map(item => item.itemName);

                            const fetchUnitPrice = (itemName, index) => {
                            db.query('SELECT unitPrice FROM materials WHERE name = ?;', itemName, (error, unitPriceResults) => {
                                if (error) {
                                console.log(error);
                                return;
                                }

                                const unitPrice = unitPriceResults[0] ? unitPriceResults[0].unitPrice : null;
                                itemsRequired[index].unitPrice = unitPrice; // Add unitPrice to the respective item in itemsRequired array

                                if (index === itemNames.length - 1) {
                                // All unit prices fetched, update the results and send to frontend
                                results[0].itemsrequired = JSON.stringify(itemsRequired);
                                res.send(results);
                                }
                            });
                            };

                            itemNames.forEach((itemName, index) => {
                            fetchUnitPrice(itemName, index);
                            });
                        } else {
                            res.send('No data found.')
                        }    
                    })
                    //res.send(results)
                } else {
                    res.send('No data found.')
                }    
            })
        }
    })
})





















//route to start growth process for a batch
app.post('/registerbatch', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchno = req.body.batchNo
            const items = req.body.items
            const stage = req.body.stage
            const date = req.body.date
            db.query('INSERT INTO farm (batchno, items, stage, stagestartedon) VALUES (?, ?, ?, ?);', [batchno, items, stage, date], (error, results) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                }
            })
        }
    })
})

//route to get all order records from database
app.post('/orderrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const initialStatus = 'pending'
            const branch = req.body.branch
            db.query('SELECT * FROM productorders WHERE destinationbranch = ?;', branch, (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('User does not exist.Contact the system admin.')
                }
            })
        }
    })
})

app.post('/branchorderrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const initialStatus = 'pending'
            const branch = req.body.branch
            db.query('SELECT * FROM productorders WHERE sourcebranch = ?;', branch, (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to get all raw material requests  from database
app.post('/rawmaterialrequestsrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const branch = req.body.branch
            const dept = req.body.dept

            if(branch === 'masanafu' && dept === 'projects'){
                db.query('SELECT * FROM projectsequipmentrequisitions;', (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('No Data found.')
                    }
                })
            }else if(branch === 'masanafu' && dept === 'farm'){
                db.query('SELECT * FROM farmrequests;', (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('No Data found.')
                    }
                })
            }else{
                db.query('SELECT * FROM rawmaterialrequisitions WHERE requesterbranch = ? AND requesterdepartment = ?;', [branch, dept], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('No Data found.')
                    }
                })
            }              
        }
    })
})










//   farm requests
app.post('/buwamarequestseeds', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const requisitionId = `RFM-${Math.floor(Math.random() * 1800000)}`
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const batchNo = req.body.batchNo
            const requesterBranch = req.body.sourcebranch
            const requesterDepartment = req.body.orderedbydepartment
            const requesterRole = req.body.orderedbyrole
            const requestedBy = req.body.orderedby

            const requestedFromBranch = req.body.destinationbranch
            const recieversDepartment = req.body.recieverdepartment
            const recieversRole = req.body.recieverrole
            const recievedBy = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = req.body.initialStatus

            const sqlInsert = "Insert into buwamafarmrequests(requisitionid,date,batchno,requesterbranch,requesterdepartment,requesterrole,requestedby,requestedfrombranch,recieverdepartment,recieverrole,recievedby,itemsrequested,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [requisitionId, date, batchNo, requesterBranch, requesterDepartment, requesterRole, requestedBy, requestedFromBranch, recieversDepartment, recieversRole, recievedBy, itemsRequested,additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})



app.post('/buwamasavebatchstage', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const items = req.body.items
            const stage = req.body.stage
            const date = req.body.date
            db.query('INSERT INTO buwamafarm (batchno, items, stage, stagestartedon) VALUES (?, ?, ?, ?);', [batchNo, items, stage, date], (error, results) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                } else {
                    res.send('Success.')
                }
            })
        }
    })
})

//route to fetch batch data for stage update
app.post('/buwamafetchdatafromfarm', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNo
            db.query('SELECT * FROM buwamafarm WHERE batchno = ? ORDER BY stagestartedon DESC LIMIT 1;', batchNo , (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    console.log('latest batch status', results)
                    res.send(results)
                } else {
                    res.send('No Data found.')
                }
            })
        }
    })
})



//route to start growth process for a batch
app.post('/buwamaregisterbatch', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchno = req.body.batchNo
            const items = req.body.items
            const stage = req.body.stage
            const date = req.body.date
            db.query('INSERT INTO buwamafarm (batchno, items, stage, stagestartedon) VALUES (?, ?, ?, ?);', [batchno, items, stage, date], (error, results) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                }
            })
        }
    })
})

app.post('/buwamafarmfetchbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchno = req.body.batchNo
            let status = 'approved'
            db.query('SELECT batchno, itemsrequested FROM buwamafarmrequests WHERE status = ? AND batchno = ?;', [status, batchno], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no data matching the provided batch number.')
                }
            })
        }
    })
})

app.post('/buwamastartnewfarmbatch', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const requisitionId = `RFM-${Math.floor(Math.random() * 1800000)}`
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const batchNo = req.body.batchNo
            const requesterBranch = req.body.sourcebranch
            const requesterDepartment = req.body.orderedbydepartment
            const requesterRole = req.body.orderedbyrole
            const requestedBy = req.body.orderedby

            const requestedFromBranch = req.body.destinationbranch
            const recieversDepartment = req.body.recieverdepartment
            const recieversRole = req.body.recieverrole
            const recievedBy = req.body.deliveredto
            const itemsRequested = req.body.itemsrequested
            const additionalInfo = req.body.additionalInfo
            const initialStatus = req.body.initialStatus

            const sqlInsert = "Insert into buwamafarmrequests(requisitionid,date,batchno,requesterbranch,requesterdepartment,requesterrole,requestedby,requestedfrombranch,recieverdepartment,recieverrole,recievedby,itemsrequested,additionalinfo,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(sqlInsert, [requisitionId, date, batchNo, requesterBranch, requesterDepartment, requesterRole, requestedBy, requestedFromBranch, recieversDepartment, recieversRole, recievedBy, itemsRequested,additionalInfo, initialStatus], (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    res.send('Operation Successful');
                }
            })
        }
    })
})



//route to get all farm records
app.post('/buwamaviewfarmrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM buwamafarm', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                   // console.log(results.length)
                    res.send(results)
                } else {
                    res.send('There are no farm records.')
                }
            })
        }
    })
})



app.post('/buwamafetchallfarmbatchrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM buwamafarmrequests', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No Data found.')
                }
            })            
        }
    })
})


//route to reject product orders
app.post('/rejectorder', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderId = req.body.orderId
            const newStatus = req.body.newStatus
            const branch = req.body.branch
            const comment = req.body.comment
            db.query('UPDATE productorders SET status = ?,comment = ? WHERE orderid = ? AND destinationbranch = ?;', [newStatus, comment, orderId, branch], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('Error.Please contact  system admin.')
                }
            })
        }
    })
})


//route to reject raw material requests
app.post('/rejectrawmaterialrequest', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            if(req.body.department === 'farm'){
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE farmrequests SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment,requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact  system admin.')
                    }
                })
            }else if(req.body.department === 'projects'){
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE projectsequipmentrequisitions SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment,requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact  system admin.')
                    }
                })
            }else{
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE rawmaterialrequisitions SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment,requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact  system admin.')
                    }
                })
            }
        }
    })
})

//route to approve product orders and send them to the production unit
app.post('/approverawmaterialrequest', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            if(req.body.department === 'farm'){
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE farmrequests SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment, requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact  system admin.')
                    }
                })
            }else if(req.body.department === 'projects'){
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE projectsequipmentrequisitions SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment, requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact system admin.')
                    }
                })
            }else{
                const requisitionId = req.body.requisitionId
                const newStatus = req.body.newStatus
                const comment = req.body.comment
                const branch = req.body.branch

                db.query('UPDATE rawmaterialrequisitions SET status = ?,comment = ? WHERE requisitionid = ? AND requestedfrombranch = ?;', [newStatus, comment, requisitionId, branch], (error, results) => {
                    //if the query is faulty , throw the error
                    if (error) console.log(error);
                    //if account exists
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('Error.Please contact  systeapprovem admin.')
                    }
                })
            }
        }
    })
})




//route to approve product orders and send them to the production unit
app.post('/confirmorder', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderId = req.body.orderId
            const newStatus = req.body.newStatus
            const branch = req.body.branch
            const comment = req.body.comment
            db.query('UPDATE productorders SET status = ?, comment  = ? WHERE orderid = ? AND destinationbranch = ?;', [newStatus, comment,orderId, branch], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results)
                    // const orderObj = JSON.parse(results)
                    // res.send(orderObj)
                } else {
                    res.send('Error.Please contact  system admin.')
                }
            })
        }
    })
})










//route to mark product orders as complete by the production manager
app.post('/markascompleted', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderId = req.body.orderId
            const newStatus = req.body.newStatus
            const branch = req.body.branch
            const dept = req.body.dept

            if(branch === 'masanafu' && dept === 'projects'){
                db.query('UPDATE projectsorders SET status = ? WHERE orderid = ? ;', [newStatus,orderId], error => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        }
    })
})
























//route to mark product orders as complete by the production manager
app.post('/ordercompleted', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const tdate = new Date()
            const month = pad(tdate.getMonth() + 1)
            const dd = pad(tdate.getDate())
            const date = `${tdate.getFullYear()}-${month}-${dd}`
            const productionId = `PROD-${Math.floor(Math.random() * 1800000)}`
            const orderId = req.body.orderId
            const newStatus = req.body.newStatus
            const branch = req.body.branch

            db.query('UPDATE productorders SET status = ? WHERE orderid = ? AND destinationbranch = ?;', [newStatus, orderId, branch], (error) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //saving to production records table
                const sqlInsert = "Insert into productionrecords(productionid,orderid,date,branch) values(?,?,?,?)"
                db.query(sqlInsert, [productionId, orderId, date, branch], (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Success');
                    }
                })

                // db.query('SELECT * FROM productorders WHERE orderid = ?', orderId , (err, results)=> {
                //     if(err) console.log(err)

                //     if(results.length === 0){
                //         res.send('Error while sending items to general store')
                //     }else if(results.length > 0){
                //         const items = results[0].itemsordered

                //         JSON.parse(items).map(item => {
                //             db.query('SELECT * FROM mgeneralstore WHERE name = ? AND measurementunits = ?;', [item.itemName, item.mUnits], function (err, results) {
                //                 // If there is an issue with the query, output the error
                //                 if (err) throw err;
                //                 // If the account exists
                //                 if (results.length === 0) {
                //                     const sqlStockCount = "Insert into mgeneralstore(name,quantityinstock,measurementunits) values(?,?,?)"
                //                     db.query(sqlStockCount, [item.itemName, item.itemQuantity, item.mUnits], (err) => {
                //                         if (err) {
                //                             console.log(err)
                //                         } else {
                //                             console.log('item quantity in stock has been updated successfully')
                //                         }
                //                     })
                //                 } else if (results.length > 0) {
                //                     let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(item.itemQuantity);
                //                     const sqlStockCount = "UPDATE mgeneralstore SET quantityinstock = ? WHERE name = ? AND measurementunits = ?"
                //                     db.query(sqlStockCount, [newStockCount, item.itemName, item.mUnits], (err) => {
                //                         if (err) {
                //                             console.log(err)
                //                         } else {
                //                             console.log('item quantity in stock has been updated successfully')
                //                         }
                //                     })
                //                 } else {
                //                     console.log("Error while increasing the item quantity in stock.")
                //                 }
                //             })
                //         })
                //     }
                // })
            })
        }
    })
})



//route to get all order records from database
app.post('/productionrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const branch = req.body.branch
            db.query('SELECT productionrecords.productionid, productionrecords.orderid,productionrecords.date,productorders.itemsordered FROM productionrecords INNER JOIN productorders ON  productionrecords.orderid = productorders.orderid;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    console.log(results)
                    res.send(results)
                } else {
                    res.send('Error.')
                }
            })
        }
    })
})




//login route for supervisors and admin ---route is tested and it is working as expected
app.post('/login', (req, res) => {
    const branch = req.body.branch
    const username = req.body.username
    const department = req.body.department
    const role = req.body.role
    const password = req.body.password
    // console.log(`parameters passed are ${department} and ${username} and ${password}`)

    //check if the parameters are not empty
    if (branch === 'masanafu' || branch === 'equatorial') {
        if (department !== '' && role !== '' && username !== '' && password !== '') {
            //query that will seek out the details if they exist in that particular department
            db.query('SELECT * FROM users WHERE branch= ? AND username= ? AND role= ? AND department = ?;', [branch, username, role, department], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, (error, response) => {
                        if (error) throw error;
                        if (response) {
                            const token = jwt.sign({
                                username: results[0].username,
                                userpassword: results[0].password,
                            }, 'SECRETKEY', {
                                expiresIn: '1d'
                            }
                            );
                            res.send({
                                token,
                                user: results[0].username,
                                branch: branch,
                                department: department,
                                role: role,
                                redirectPath: `/${role}dashboard`
                            })
                        } else {
                            res.send('Incorrect details.Please try again.');
                        }
                    })
                } else {
                    res.send('User does not exist.Contact the system admin.')
                }
            })
        }
    }else if (branch !== '' && username !== '' && password !== '') {
        //query that will seek out the details if they exist in that particular department
        db.query('SELECT * FROM users WHERE branch= ? AND username= ?;', [branch, username], (error, results) => {
            //if the query is faulty , throw the error
            if (error) console.log(error);
            //if account exists
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (error, response) => {
                    if (error) throw error;
                    if (response) {
                        const token = jwt.sign({
                            username: results[0].username,
                            userpassword: results[0].password,
                        }, 'SECRETKEY', {
                            expiresIn: '1d'
                        }
                        );
                        res.send({
                            token,
                            user: results[0].username,
                            branch: results[0].branch,
                            department: results[0].department,
                            role: role,
                            redirectPath: `/${branch}dashboard`
                        })
                    } else {
                        res.send('Incorrect details.Please try again.');
                    }
                })
            } else {
                res.send('User does not exist.Contact the system admin.')
            }
        })
    }
})




//route to save order projects delivery data
app.post('/saveprojectsorderdelivery', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderid = req.body.orderId
            const quantitydelivered = req.body.itemQuantityDelivered
            const deliverydate = req.body.deliveryDate
            //const orderbalance = req.body.date
            const munits = req.body.mUnits

            db.query('SELECT orderedquantitynotdelivered FROM projectsorders WHERE orderid = ?', [orderid], (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    console.log(results)
                    const orderedQuantity = parseInt(results[0].orderedquantitynotdelivered)
                     const newQuantity = orderedQuantity - parseInt(quantitydelivered)
                     db.query('INSERT INTO projectsrecords (orderid, quantitydelivered, deliverydate, orderbalance, munits) VALUES (?, ?, ?, ?, ?);', [orderid, quantitydelivered, deliverydate, newQuantity, munits], error => {
                         //if the query is faulty , throw the error
                         if (error) {
                             console.log(error);
                             res.send('Error')
                         } else {
                             res.send('Success')
                             db.query('UPDATE projectsorders SET orderedquantitynotdelivered = ? WHERE orderid = ? ;', [newQuantity,orderid], error => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                         }
                     })
                }
            })
        }
    })
})


//route to fetch order projects deliveries
app.post('/fetchorderprojectsdeliveries', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const orderid = req.body.orderId

            db.query('SELECT * FROM projectsrecords WHERE orderid = ?', [orderid], (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    res.send(results)
                }
            })
        }
    })
})



//route to fetch all projects records
app.post('/fetchallprojectsrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT projectsorders.itemsordered, projectsorders.orderedquantitynotdelivered,projectsrecords.orderid,projectsrecords.deliverydate FROM projectsorders JOIN projectsrecords ON projectsorders.orderid = projectsrecords.orderid', (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    res.send(results)
                }
            })
        }
    })
})




//route to save masanafu shop expenditures
app.post('/savemasanafushopexpense', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.expenditureDate
            const expenditureCategory = req.body.expenditureCategory
            const expenditureName = req.body.expenditureName
            const desc = req.body.expenditureDesc
            const cost = req.body.expenditureTotalCost
            const amountPaid = req.body.amountPaid
            const balance = req.body.balance
            const paymentMethod = req.body.paymentMethod
            const paymentStatus = req.body.paymentStatus
            const createdat = new Date()

            db.query('INSERT INTO masanafushopexpenditure (date, expenditurecategory, expenditurename, expendituredescription, expenditurecost, amountspent, balance, paymentmethod, paymentstatus, createdat) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [ date, expenditureCategory, expenditureName, desc, cost, amountPaid, balance, paymentMethod, paymentStatus, createdat], (error, results) => {
                if (error){
                    console.log(error)
                }else{
                    res.send('success')
                }
            })
        }
    })
})


//route to fetch expenses data 
app.post('/fetchexpendituredata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const expenseId = req.body.expenseId

            db.query('SELECT * FROM masanafushopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to update expenditure data
app.post('/updateexpendituredata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const expenseId = req.body.expenditureId
            const amountPaid = req.body.amountPaid
            const date = req.body.date
            const notes = req.body.additionalInfo
            const paymentMethod = req.body.paymentMethod
            console.log(paymentMethod)
            let paymentStatus;
            db.query('SELECT expenditurecost, amountspent, balance, paymentstatus FROM masanafushopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    console.log(results)
                     const amountSpent = parseFloat(results[0].amountspent) + parseFloat(amountPaid)
                     const newBalance = parseFloat(results[0].balance) - amountPaid
                     
                     if(newBalance === 0){
                        paymentStatus = 'fully paid'
                     }else if(newBalance !== 0){
                        paymentStatus = 'partially paid'
                     }

                     db.query('INSERT INTO masanafushopexpensespayments (paymentdate, expenseid, additionalnotes, amountpaid, paymentmethod) VALUES (?, ?, ?, ?, ?);', [date, expenseId, notes, amountPaid, paymentMethod], error => {
                         //if the query is faulty , throw the error
                         if (error) {
                             console.log(error);
                             res.send('Error')
                         } else {
                             res.send('Success')
                             db.query('UPDATE masanafushopexpenditure SET amountspent = ?, balance = ?, paymentstatus = ? WHERE expenditureid = ? ;', [amountSpent, newBalance, paymentStatus, expenseId], error => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                         }
                     })
                }
            })
        }
    })
})



//route to fetch receipt data 
app.post('/fetchreceiptdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber

            db.query('SELECT * FROM externalreceipts WHERE receiptnumber = ?', [receiptNumber], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No receipt data found.')
                }
            })
        }
    })
})

//mark external receipts as delivered
app.post('/markreceiptasdelivered', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber;
            const newStatus = 'delivered';
            const items = req.body.items;

            // Array to store items with insufficient stock
            const insufficientStockItems = [];

            // Check stock availability for each item
            const itemsSold = JSON.parse(items);
            const promises = itemsSold.map((item) => {
                return new Promise((resolve, reject) => {
                    db.query('SELECT quantityinstock FROM masanafuShopInventory WHERE productId = ?', [item.id], (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            const quantityInStock = results[0]?.quantityinstock || 0;
                            if (quantityInStock >= item.quantity) {
                                resolve();
                            } else {
                                insufficientStockItems.push(item.id);
                                resolve();
                            }
                        }
                    });
                });
            });

            // Process the sale if all items have sufficient stock
            Promise.all(promises)
                .then(() => {
                    if (insufficientStockItems.length > 0) {
                        // Some items have insufficient stock
                        res.status(400).send(`Insufficient stock for items: ${insufficientStockItems.join(', ')}`);
                    } else {
                        // All items have sufficient stock, proceed with the sale
                                // Update the stock quantities
                                const updatePromises = itemsSold.map((item) => {
                                    return new Promise((resolve, reject) => {
                                        db.query('UPDATE masanafuShopInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                                            if (error) {
                                                reject(error);
                                            } else {
                                                resolve();
                                            }
                                        });
                                    });
                                });

                                // Wait for all stock updates to complete
                                Promise.all(updatePromises)
                                    .then(() => {
                                        // Now update the receipt delivery status in externalreceipts table
                                        db.query('UPDATE externalreceipts SET receiptdeliverystatus = ? WHERE receiptnumber = ? ;', [newStatus, receiptNumber], error => {
                                            if (error) {
                                                console.log(error);
                                                res.status(500).send('Error occurred during receipt update');
                                            } else {
                                                res.send({ status: '200', msg: 'success' });
                                            }
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        res.status(500).send('Error occurred during stock update');
                                    });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send('Error occurred during stock check');
                });
        }
    });
});






//mark external receipts as delivered
app.post('/equatorialmarkreceiptasdelivered', (req, res) => {
    function pad(num) {
        var s = "" + num;
        if (num < 10) {
            s = "0" + num;
        }
        return s;
    }
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber;
            const newStatus = 'delivered';
            const items = req.body.items;

            // Array to store items with insufficient stock
            const insufficientStockItems = [];

            // Check stock availability for each item
            const itemsSold = JSON.parse(items);
            const promises = itemsSold.map((item) => {
                return new Promise((resolve, reject) => {
                    db.query('SELECT quantityinstock FROM equatorialShopInventory WHERE productId = ?', [item.id], (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            const quantityInStock = results[0]?.quantityinstock || 0;
                            if (quantityInStock >= item.quantity) {
                                resolve();
                            } else {
                                insufficientStockItems.push(item.id);
                                resolve();
                            }
                        }
                    });
                });
            });

            // Process the sale if all items have sufficient stock
            Promise.all(promises)
                .then(() => {
                    if (insufficientStockItems.length > 0) {
                        // Some items have insufficient stock
                        res.status(400).send(`Insufficient stock for items: ${insufficientStockItems.join(', ')}`);
                    } else {
                        // All items have sufficient stock, proceed with the sale
                                // Update the stock quantities
                                const updatePromises = itemsSold.map((item) => {
                                    return new Promise((resolve, reject) => {
                                        db.query('UPDATE equatorialShopInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                                            if (error) {
                                                reject(error);
                                            } else {
                                                resolve();
                                            }
                                        });
                                    });
                                });

                                // Wait for all stock updates to complete
                                Promise.all(updatePromises)
                                    .then(() => {
                                        // Now update the receipt delivery status in externalreceipts table
                                        db.query('UPDATE externalreceipts SET receiptdeliverystatus = ? WHERE receiptnumber = ? ;', [newStatus, receiptNumber], error => {
                                            if (error) {
                                                console.log(error);
                                                res.status(500).send('Error occurred during receipt update');
                                            } else {
                                                res.send({ status: '200', msg: 'success' });
                                            }
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        res.status(500).send('Error occurred during stock update');
                                    });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send('Error occurred during stock check');
                });
        }
    });
});




//save shop restock data
app.post('/saveshoprestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
         let category = req.body.category

            db.query('INSERT INTO masanafushopinventoryrecords (date, recordcategory, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?,?);', [date, category, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    if(category === 'outgoing'){
                        db.query('SELECT * FROM masanafuShopInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                res.send('This item is not in stock')
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                                const sqlStockCount = "UPDATE masanafuShopInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }else{
                        db.query('SELECT * FROM masanafuShopInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into masanafuShopInventory(productid,quantityinstock,munits) values(?,?,?)"
                                db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE masanafuShopInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }
                }
            })

        }
    })
})

//fetch shop items
app.post('/shopitemlist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * from shopProducts;', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    console.log(results)
                    res.send(results)
                } else {
                    res.send('There are no saved items.')
                }
            })
        }
    })
})


//7. View shop inventory records
app.post('/fetchshopinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafushopinventoryrecords JOIN shopProducts ON masanafushopinventoryrecords.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View shop stock 
app.post('/fetchshopstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafuShopInventory JOIN shopProducts ON masanafuShopInventory.productId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})

//7. Save Shop Sale and update stock levels
app.post('/cartcheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const branch = req.body.branch;
        const items = req.body.items;
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Array to store items with insufficient stock
        const insufficientStockItems = [];
  
        // Check stock availability for each item
        const itemsSold = JSON.parse(items);
        const promises = itemsSold.map((item) => {
          return new Promise((resolve, reject) => {
            db.query('SELECT quantityinstock FROM masanafuShopInventory WHERE productId = ?', [item.id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                const quantityInStock = results[0]?.quantityinstock || 0;
                if (quantityInStock >= item.quantity) {
                  resolve();
                } else {
                  insufficientStockItems.push(item.id);
                  resolve();
                }
              }
            });
          });
        });
  
        // Process the sale if all items have sufficient stock
        Promise.all(promises)
          .then(() => {
            if (insufficientStockItems.length > 0) {
              // Some items have insufficient stock
              res.send({ status: '400', msg: `Insufficient stock for items Id: ${insufficientStockItems.join(', ')}` })
            } else {
              // All items have sufficient stock, proceed with the sale
              db.query('INSERT INTO masanafuShopSales (receiptNumber, saleDate, customerNames, customerContact, itemsSold, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);', [receiptNumber, date, customerNames, customerContact, items, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.send({ status: '500', msg: 'Error occurred during sale.' });
                } else {
                  // Update the stock quantities
                  const updatePromises = itemsSold.map((item) => {
                    return new Promise((resolve, reject) => {
                      db.query('UPDATE masanafuShopInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve();
                        }
                      });
                    });
                  });
  
                  // Wait for all stock updates to complete
                  Promise.all(updatePromises)
                    .then(() => {
                      res.send({ status: '200', msg: 'Sale Record Saved.' });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send('Error occurred during stock update');
                    });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error occurred during stock check');
          });
      }
    });
  });



//7. fetch all shop sales
app.post('/fetchallshopsales', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafuShopSales', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no sales records found.`)
                    }
                })
        }
    })
})

//7. fetch all shop expenses
app.post('/fetchallshopexpenses', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafushopexpenditure', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no expenditure records found.`)
                    }
                })
        }
    })
})

//route to fetch receipt data 
app.post('/fetchsalereceiptdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber

            db.query('SELECT * FROM masanafuShopSales WHERE receiptNumber = ?', [receiptNumber], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No receipt data found.')
                }
            })
        }
    })
})



//route to update sale data
app.post('/updatesaledata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNo = req.body.receiptNo
            const amountPaid = req.body.amountPaid
            const date = req.body.date
            const notes = req.body.additionalInfo
            const paymentMethod = req.body.paymentMethod
            console.log(paymentMethod)
            let paymentStatus;
            db.query('SELECT totalAmount, balance, paymentstatus FROM masanafuShopSales WHERE receiptNumber = ?', [receiptNo], (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    console.log(results)
                     const newBalance = results[0].balance - parseFloat(amountPaid)
                     
                     if(newBalance === 0){
                        paymentStatus = 'fullypaid'
                     }else if(newBalance !== 0){
                        paymentStatus = 'partiallypaid'
                     }

                     db.query('INSERT INTO masanafushopsalespayments (receiptNumber, paymentdate, amountPaid, notes, paymentMethod) VALUES (?, ?, ?, ?, ?);', [receiptNo, date, amountPaid, notes, paymentMethod], error => {
                         //if the query is faulty , throw the error
                         if (error) {
                             console.log(error);
                             res.send('Error')
                         } else {
                             res.send('Success')
                             db.query('UPDATE masanafuShopSales SET balance = ?, paymentstatus = ? WHERE receiptNumber = ? ;', [newBalance, paymentStatus, receiptNo], error => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                         }
                     })
                }
            })
        }
    })
})

//route to save chicken feeds inventory
app.post('/registerchickenfeeds', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.productName
            const unitPrice = req.body.unitPrice
            db.query('INSERT INTO masanafuchickenfeeds (productName, unitPrice) VALUES (?,?);', [name, unitPrice], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//7. View chicken feeds stock
app.post('/fetchchickenfeedstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafuchickenfeedsinventory JOIN masanafuchickenfeeds ON masanafuchickenfeedsinventory.productId = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})

//7. View chicken feeds stock
app.post('/buwamafetchchickenfeedstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM buwamachickenfeedsinventory JOIN masanafuchickenfeeds ON buwamachickenfeedsinventory.productId = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})

//route to fetch all chicken feeds from db
app.post('/fetchallchickenfeeds', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM masanafuchickenfeeds', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


app.post('/fetchallbuwamalivestockfeeds', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const feeds = 'FEEDS'
            db.query('SELECT * FROM buwamaitems WHERE category = ?', feeds, (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})




//save chicken feeds restock data
app.post('/savechickenfeedsrestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes

            db.query('INSERT INTO 	masanafuchickenfeedsinventoryrecords (date, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?);', [date, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    db.query('SELECT * FROM masanafuchickenfeedsinventory WHERE productid = ?;', [itemid], function (err, results) {
                        // If there is an issue with the query, output the error
                        if (err) throw err;
                        // If the account exists
                        if (results.length === 0) {
                            const sqlStockCount = "Insert into masanafuchickenfeedsinventory(productid,quantityinstock,munits) values(?,?,?)"
                            db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else if (results.length > 0) {
                            let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                            const sqlStockCount = "UPDATE masanafuchickenfeedsinventory SET quantityinstock = ? WHERE productid = ?"
                            db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else {
                            console.log("Error while increasing the item quantity in stock.")
                        }
                    })
                }
            })

        }
    })
})

//save chicken feeds restock data
app.post('/buwamasavechickenfeedsrestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes

            db.query('INSERT INTO 	buwamachickenfeedsinventoryrecords (date, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?);', [date, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    db.query('SELECT * FROM buwamachickenfeedsinventory WHERE productid = ?;', [itemid], function (err, results) {
                        // If there is an issue with the query, output the error
                        if (err) throw err;
                        // If the account exists
                        if (results.length === 0) {
                            const sqlStockCount = "Insert into buwamachickenfeedsinventory(productid,quantityinstock,munits) values(?,?,?)"
                            db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else if (results.length > 0) {
                            let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                            const sqlStockCount = "UPDATE buwamachickenfeedsinventory SET quantityinstock = ? WHERE productid = ?"
                            db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else {
                            console.log("Error while increasing the item quantity in stock.")
                        }
                    })
                }
            })

        }
    })
})


//7. View shop inventory records
app.post('/fetchmasanafuchickenfeedsinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafuchickenfeedsinventoryrecords JOIN masanafuchickenfeeds ON masanafuchickenfeedsinventoryrecords.itemid = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        //console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. View shop inventory records
app.post('/fetchbuwamachickenfeedsinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM buwamachickenfeedsinventoryrecords JOIN masanafuchickenfeeds ON buwamachickenfeedsinventoryrecords.itemid = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        //console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})




//7. View chicken medicines stock
app.post('/fetchchickenmedicinestock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM masanafuchickenmedicineinventory JOIN masanafuchickenmedicine ON masanafuchickenmedicineinventory.productId = 	masanafuchickenmedicine.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})

//7. View chicken medicines stock
app.post('/buwamafetchchickenmedicinestock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM buwamachickenmedicineinventory JOIN masanafuchickenmedicine ON buwamachickenmedicineinventory.productId = 	masanafuchickenmedicine.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})


//route to fetch all chicken medicine from db
app.post('/fetchallchickenmedicines', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM masanafuchickenmedicine', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


//save chicken medicine restock data
app.post('/savechickenmedicinerestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes

            db.query('INSERT INTO 	masanafuchickenmedicineinventoryrecords (date, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?);', [date, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    db.query('SELECT * FROM masanafuchickenmedicineinventory WHERE productid = ?;', [itemid], function (err, results) {
                        // If there is an issue with the query, output the error
                        if (err) throw err;
                        // If the account exists
                        if (results.length === 0) {
                            const sqlStockCount = "Insert into masanafuchickenmedicineinventory (productid,quantityinstock,munits) values(?,?,?)"
                            db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else if (results.length > 0) {
                            let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                            const sqlStockCount = "UPDATE masanafuchickenmedicineinventory SET quantityinstock = ? WHERE productid = ?"
                            db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else {
                            console.log("Error while increasing the item quantity in stock.")
                        }
                    })
                }
            })

        }
    })
})

//save chicken medicine restock data
app.post('/buwamasavechickenmedicinerestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes

            db.query('INSERT INTO buwamachickenmedicineinventoryrecords (date, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?);', [date, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    db.query('SELECT * FROM buwamachickenmedicineinventory WHERE productid = ?;', [itemid], function (err, results) {
                        // If there is an issue with the query, output the error
                        if (err) throw err;
                        // If the account exists
                        if (results.length === 0) {
                            const sqlStockCount = "Insert into buwamachickenmedicineinventory (productid,quantityinstock,munits) values(?,?,?)"
                            db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else if (results.length > 0) {
                            let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                            const sqlStockCount = "UPDATE buwamachickenmedicineinventory SET quantityinstock = ? WHERE productid = ?"
                            db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('item quantity in stock has been updated successfully')
                                }
                            })
                        } else {
                            console.log("Error while increasing the item quantity in stock.")
                        }
                    })
                }
            })

        }
    })
})

//route to save chicken medicine inventory
app.post('/registerchickenmedicine', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const name = req.body.productName
            const unitPrice = req.body.unitPrice
            db.query('INSERT INTO masanafuchickenmedicine (productName, unitPrice) VALUES (?,?);', [name, unitPrice], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//7. View chicken medicine inventory records
app.post('/fetchmasanafuchickenmedicinesinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	masanafuchickenmedicineinventoryrecords JOIN masanafuchickenmedicine ON masanafuchickenmedicineinventoryrecords.itemid = masanafuchickenmedicine.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        //console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View chicken medicine inventory records
app.post('/fetchbuwamachickenmedicinesinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	buwamachickenmedicineinventoryrecords JOIN masanafuchickenmedicine ON buwamachickenmedicineinventoryrecords.itemid = masanafuchickenmedicine.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        //console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//route to save new masanafu chicken batches
app.post('/savenewchickenbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const quantity = req.body.quantity
            const unitPrice = req.body.unitPrice
            const totalSpent = req.body.totalSpent
            const notes = req.body.notes
            db.query('INSERT INTO masanafuchickenfarmbatches (batchnumber, date, numberofchicken, chickenunitprice, totalspent, notes, chickenalive) VALUES (?, ?, ?, ?, ?, ?, ?);', [batchNo, date, quantity, unitPrice, totalSpent, notes, quantity], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})



//route to save new masanafu chicken batches
app.post('/buwamasavenewchickenbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const quantity = req.body.quantity
            const unitPrice = req.body.unitPrice
            const totalSpent = req.body.totalSpent
            const notes = req.body.notes

            db.query('INSERT INTO buwamachickenfarmbatches (batchnumber, date, numberofchicken, chickenunitprice, totalspent, notes, chickenalive) VALUES (?, ?, ?, ?, ?, ?, ?);', [batchNo, date, quantity, unitPrice, totalSpent, notes, quantity], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})


//route to save new masanafu chicken batches deathes
app.post('/savechickendeaths', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const quantity = req.body.quantity
            const notes = req.body.notes
            db.query('INSERT INTO chickenbatchmortalities (date, batchnumber, numberofchickendead,  notes) VALUES (?, ?, ?, ?);', [date, batchNo, quantity, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('SELECT chickenalive, chickendead FROM masanafuchickenfarmbatches WHERE batchnumber = ?', [batchNo], (error, results) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }

                        if(results.length > 0){
                            let newChickenAlive = results[0].chickenalive-quantity
                            let newChickenDead = parseInt(results[0].chickendead)+parseInt(quantity)
                            db.query('UPDATE masanafuchickenfarmbatches SET chickenalive = ? , chickendead = ? WHERE batchnumber = ?', [newChickenAlive, newChickenDead, batchNo], (error) => {
                                //if the query is faulty , throw the error
                                if (error) {
                                    console.log(error);
                                }else{
                                    
                                    res.send({
                                        status: 200,
                                        msg: 'success'                               
                                    })
                                }
                                
                            })
                        }else{
                            res.send('No record Found')
                        }
                        
                    })
                }
                
            })
        }
    })
})


//route to save new masanafu chicken batches deathes
app.post('/buwamasavechickendeaths', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const quantity = req.body.quantity
            const notes = req.body.notes
            db.query('INSERT INTO buwamachickenbatchmortalities (date, batchnumber, numberofchickendead,  notes) VALUES (?, ?, ?, ?);', [date, batchNo, quantity, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('SELECT chickenalive, chickendead FROM buwamachickenfarmbatches WHERE batchnumber = ?', [batchNo], (error, results) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }

                        if(results.length > 0){
                            let newChickenAlive = results[0].chickenalive-quantity
                            let newChickenDead = parseInt(results[0].chickendead)+parseInt(quantity)
                            db.query('UPDATE buwamachickenfarmbatches SET chickenalive = ? , chickendead = ? WHERE batchnumber = ?', [newChickenAlive, newChickenDead, batchNo], (error) => {
                                //if the query is faulty , throw the error
                                if (error) {
                                    console.log(error);
                                }else{
                                    
                                    res.send({
                                        status: 200,
                                        msg: 'success'                               
                                    })
                                }
                                
                            })
                        }else{
                            res.send('No record Found')
                        }
                        
                    })
                }
                
            })
        }
    })
})


//7. View chicken health records
app.post('/fetchchickenhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchNo = req.body.batchNumber             
                    db.query('SELECT * FROM chickenbatchhealth JOIN masanafuchickenmedicine ON chickenbatchhealth.medicinename = masanafuchickenmedicine.productId WHERE chickenbatchhealth.batchnumber = ?', [batchNo],(error, results) => {
                        if (error) throw (error);
                        if (results.length > 0) {
                            //console.log(results)
                            res.send(results)
                        } else {
                            res.send(`There are no records found.`)
                        }
                    })
        }
    })
})




//7. View chicken health records
app.post('/buwamafetchchickenhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber             
            db.query('SELECT * FROM buwamachickenbatchhealth JOIN masanafuchickenmedicine ON buwamachickenbatchhealth.medicinename = masanafuchickenmedicine.productId WHERE buwamachickenbatchhealth.batchnumber = ?', [batchNo],(error, results) => {
                if (error) throw (error);
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})




//7. View all chicken health records
app.post('/fetchallchickenhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {             
                    db.query('SELECT * FROM chickenbatchhealth JOIN masanafuchickenmedicine ON chickenbatchhealth.medicinename = masanafuchickenmedicine.productId', (error, results) => {
                        if (error) throw (error);
                        if (results.length > 0) {
                            //console.log(results)
                            res.send(results)
                        } else {
                            res.send(`There are no records found.`)
                        }
                    })
        }
    })
})


//7. View all chicken health records
app.post('/buwamafetchallchickenhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {             
                    db.query('SELECT * FROM buwamachickenbatchhealth JOIN masanafuchickenmedicine ON buwamachickenbatchhealth.medicinename = masanafuchickenmedicine.productId', (error, results) => {
                        if (error) throw (error);
                        if (results.length > 0) {
                            res.send(results)
                        } else {
                            res.send(`There are no records found.`)
                        }
                    })
        }
    })
})




//route to save egg production record
app.post('/savebatcheggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const totalEggsCollected = req.body.totalEggsCollected
            const totalGoodEggsCollected = req.body.totalGoodEggsCollected
            const totalDamagedEggsCollected = req.body.totalDamagedEggsCollected
            const totalEggTraysCollected = req.body.totalEggTraysCollected
            const notes = req.body.notes

            db.query('INSERT INTO eggproductionrecords (batchnumber, collectiondate, totaleggscollected, totalgoodeggscollected, totaldamagedeggscollected, totaleggtrays, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [batchNo, date, totalEggsCollected, totalGoodEggsCollected, totalDamagedEggsCollected, totalEggTraysCollected, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})



app.post('/buwamasavebatcheggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const totalEggsCollected = req.body.totalEggsCollected
            const totalGoodEggsCollected = req.body.totalGoodEggsCollected
            const totalDamagedEggsCollected = req.body.totalDamagedEggsCollected
            const totalEggTraysCollected = req.body.totalEggTraysCollected
            const notes = req.body.notes

            db.query('INSERT INTO buwamaeggproductionrecords (batchnumber, collectiondate, totaleggscollected, totalgoodeggscollected, totaldamagedeggscollected, totaleggtrays, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [batchNo, date, totalEggsCollected, totalGoodEggsCollected, totalDamagedEggsCollected, totalEggTraysCollected, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//7. View chicken egg production records
app.post('/fetchbatcheggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	eggproductionrecords WHERE batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/buwamafetchbatcheggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	buwamaeggproductionrecords WHERE batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View all egg production records
app.post('/fetchalleggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	eggproductionrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//route to save chicken health record
app.post('/savechickenhealthrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const reason = req.body.reason
            const tdate = req.body.date
            const nextDateOfAdministration =  req.body.nextDateOfAdministration
            const medicineId = req.body.medicineId
            const drugAmount = req.body.medicineQuantity
            const diseaseName = req.body.diseaseName
            const notes = req.body.notes
            db.query('INSERT INTO chickenbatchhealth (batchnumber, reason, treatmentdate, nextdateofadministration, medicinename, medicinequantityused, diseasename, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [batchNo, reason, tdate, nextDateOfAdministration, medicineId, drugAmount, diseaseName, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE masanafuchickenmedicineinventory SET quantityinstock = quantityinstock - ? WHERE productid = ?', [drugAmount, medicineId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


//route to save chicken health record
app.post('/buwamasavechickenhealthrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const reason = req.body.reason
            const tdate = req.body.date
            const nextDateOfAdministration =  req.body.nextDateOfAdministration
            const medicineId = req.body.medicineId
            const drugAmount = req.body.medicineQuantity
            const diseaseName = req.body.diseaseName
            const notes = req.body.notes
            db.query('INSERT INTO buwamachickenbatchhealth (batchnumber, reason, treatmentdate, nextdateofadministration, medicinename, medicinequantityused, diseasename, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [batchNo, reason, tdate, nextDateOfAdministration, medicineId, drugAmount, diseaseName, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE buwamachickenmedicineinventory SET quantityinstock = quantityinstock - ? WHERE productid = ?', [drugAmount, medicineId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})

//route to save chicken feeding record
app.post('/savebatchfeedingrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const  feedsId = req.body.feedsId
            const quantity = req.body.quantity
            const notes = req.body.notes
            const munits = req.body.munits

            db.query('INSERT INTO batchfeedingrecords (batchnumber, date, feedsid, feedsquantity, munits, notes) VALUES (?, ?, ?, ?, ?, ?)', [batchNo, date, feedsId, quantity, munits, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE masanafuchickenfeedsinventory SET quantityinstock = quantityinstock - ? WHERE productid = ?', [quantity, feedsId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


app.post('/buwamasavebatchfeedingrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const  feedsId = req.body.feedsId
            const quantity = req.body.quantity
            const notes = req.body.notes
            const munits = req.body.munits

            db.query('INSERT INTO buwamabatchfeedingrecords (batchnumber, date, feedsid, feedsquantity, munits, notes) VALUES (?, ?, ?, ?, ?, ?)', [batchNo, date, feedsId, quantity, munits, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) { 
                    console.log(error);
                }else{
                    db.query('UPDATE buwamachickenfeedsinventory SET quantityinstock = quantityinstock - ? WHERE productid = ?', [quantity, feedsId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


app.post('/buwamasavelivestockbatchfeedingrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const  feedsId = req.body.feedsId
            const quantity = req.body.quantity
            const notes = req.body.notes
            const munits = req.body.munits

            db.query('INSERT INTO buwamalivestockbatchfeedingrecords (batchnumber, date, feedsid, feedsquantity, munits, notes) VALUES (?, ?, ?, ?, ?, ?)', [batchNo, date, feedsId, quantity, munits, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE buwamaGeneralStoreInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [quantity, feedsId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


//7. View batch feeding records
app.post('/fetchbatchfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                
                db.query('SELECT * FROM batchfeedingrecords JOIN masanafuchickenfeeds ON batchfeedingrecords.feedsid = masanafuchickenfeeds.productId WHERE batchfeedingrecords.batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/buwamafetchbatchfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                
                db.query('SELECT * FROM buwamabatchfeedingrecords JOIN masanafuchickenfeeds ON buwamabatchfeedingrecords.feedsid = masanafuchickenfeeds.productId WHERE buwamabatchfeedingrecords.batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/buwamafetchlivestockbatchfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                
                db.query('SELECT * FROM buwamalivestockbatchfeedingrecords JOIN buwamaitems ON buwamalivestockbatchfeedingrecords.feedsid = buwamaitems.productId WHERE buwamalivestockbatchfeedingrecords.batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View all batch feeding records
app.post('/fetchallfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM batchfeedingrecords JOIN masanafuchickenfeeds ON batchfeedingrecords.feedsid = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})





//route to save batch fcr record
app.post('/savebatchfcrvalue', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const totalFeedsConsumed = req.body.totalFeedsConsumed
            const totalEggsProduced = req.body.totalEggsProduced
            const fcrValue = req.body.fcrValue
            const notes = req.body.notes

            db.query('INSERT INTO chickenbatchfcrrecords (batchnumber, totalfeedsconsumed, totaleggsproduced, fcrvalue, notes) VALUES (?, ?, ?, ?, ?)', [batchNo, totalFeedsConsumed, totalEggsProduced, fcrValue, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE masanafuchickenfarmbatches SET status = ? WHERE batchnumber = ?', ['completed', batchNo], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


//7. View all egg production records
app.post('/fetchallbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	masanafuchickenfarmbatches', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View all egg production records
app.post('/buwamafetchallbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	buwamachickenfarmbatches', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. fetch all fcr values
app.post('/fetchallbatchfcrdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	chickenbatchfcrrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/buwamafetchallbatchfcrdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	buwamachickenbatchfcrrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. fetch all fcr values
app.post('/fetchallbatchhealthdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	chickenbatchhealth', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. fetch all fcr values
app.post('/fetchallbatchmortalitydata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	chickenbatchmortalities', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. fetch all fcr external receipts
app.post('/fetchallexternalreceiptsdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	externalreceipts', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})




//7. fetch all fcr external receipts
app.post('/fetchmasanafuexpensesreceipts', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	expensesreceipts', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//save massage restock data
app.post('/saveequatorialmassagerestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
            let category = req.body.category

            db.query('INSERT INTO equatorialmassageinventoryrecords (date, recordcategory, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?,?);', [date, category, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    if(category === 'outgoing'){
                        db.query('SELECT * FROM equatorialMassageInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                res.send('This item is not in stock')
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatorialMassageInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }else{
                        db.query('SELECT * FROM equatorialMassageInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into equatorialMassageInventory(productid,quantityinstock,munits) values(?,?,?)"
                                db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatorialMassageInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }
                }
            })

        }
    })
})

//7. View massage department stock 
app.post('/fetchequatorialmassagedepartmentstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialMassageInventory JOIN shopProducts ON equatorialMassageInventory.productId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                       // console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})


//route to save shop invetory
app.post('/registermassageservices', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const serviceId = `S-${Math.floor(Math.random()*100)}`
            const name = req.body.productName
            const unitPrice = req.body.unitPrice
            db.query('INSERT INTO massageServices (productId, productName, unitPrice) VALUES (?,?,?);', [serviceId, name, unitPrice], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//route to fetch product data from db
app.post('/fetchallmassageservices', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM massageServices;', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


//7. View shop inventory records
app.post('/fetchequatorialmassageinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialmassageinventoryrecords JOIN shopProducts ON equatorialmassageinventoryrecords.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})




app.post('/equatorialmassagecartcheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const branch = req.body.branch;
        const items = req.body.items;
        const services = req.body.services;
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Array to store items with insufficient stock
        const insufficientStockItems = [];
  
        // Check stock availability for each item
        const itemsSold = JSON.parse(items);
        const servicesOffered = JSON.parse(services)

        const itemsToCheck = itemsSold.filter((cartItem) => {
            const isService = servicesOffered.some((service) => service.Id === cartItem.id);
            return !isService;
          });// Exclude services from stock check
        
        const promises = itemsToCheck.map((item) => {
          return new Promise((resolve, reject) => {
            db.query('SELECT quantityinstock FROM equatorialMassageInventory WHERE productId = ?', [item.id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                const quantityInStock = results[0]?.quantityinstock || 0;
                if (quantityInStock >= item.quantity) {
                  resolve();
                } else {
                  insufficientStockItems.push(item.id);
                  resolve();
                }
              }
            });
          });
        });
  
        // Process the sale if all items have sufficient stock
        Promise.all(promises)
          .then(() => {
            if (insufficientStockItems.length > 0) {
              // Some items have insufficient stock
              res.send({ status: '400', msg: `Insufficient stock for items Id: ${insufficientStockItems.join(', ')}` })
            } else {
              // All items have sufficient stock, proceed with the sale
              db.query('INSERT INTO equatorialMassageSales (receiptNumber, saleDate, customerNames, customerContact, itemsSold, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [receiptNumber, date, customerNames, customerContact, items, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.send({ status: '500', msg: 'Error occurred during sale.' });
                } else {
                  // Update the stock quantities
                  const updatePromises = itemsToCheck.map((item) => {
                    if (item.type !== 'service') { // Exclude services from stock update
                      return new Promise((resolve, reject) => {
                        db.query('UPDATE equatorialMassageInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                          if (error) {
                            reject(error)
                          } else {
                            resolve()
                          }
                        });
                      });
                    } else {
                      return Promise.resolve(); // Resolve immediately for services
                    }
                  });
  
                  // Wait for all stock updates to complete
                  Promise.all(updatePromises)
                    .then(() => {
                      res.send({ status: '200', msg: 'Sale Record Saved.' });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send('Error occurred during stock update');
                    });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error occurred during stock check');
          });
      }
    });
  });
  //

  
//7. fetch all massage sales
app.post('/fetchallequatorialmassagerecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialMassageSales', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no sales records found.`)
                    }
                })
        }
    })
})


app.post('/fetchallequatorialmassageservicesrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialMassageServicesRecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no sales records found.`)
                    }
                })
        }
    })
})

//7. fetch all equatorial projects sales
app.post('/fetchallequatorialprojectsrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialProjectsSales', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no sales records found.`)
                    }
                })
        }
    })
})


//7. create external receipt
app.post('/issueequatorialprojectsexternalreceipts', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('INSERT INTO externalreceipts (receiptnumber, receiptdate, itemsattached, receiptissuedfrombranch, receiptissuedfromdepartment, receiptissuedby, receiptdeliveredtobranch, receiptdeliveredtodepartment, receiptdeliveredtopersonnel, receiptpaymentstatus, receiptdeliverystatus, additionalinfo, clientfirstname, clientmiddlename, clientlastname, clientcontact, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.receiptNo, req.body.date, req.body.items, req.body.receiptIssuedFromBranch, req.body.receiptIssuedFromDept, req.body.servedBy, req.body.receiptIssuedToBranch, req.body.receiptIssuedToDept, req.body.receiptIssuedToPersonnel, req.body.paymentStatus, 'pending', req.body.additionalInfo, req.body.firstName, req.body.middleName, req.body.lastName, req.body.customerContact, req.body.transactionId] ,(error) => {
                    if (error) {
                        console.log(error)
                        res.send(`Error while saving external receipt.`)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'                               
                        })
                    }
                })
        }
    })
})

//route to save project inventory
app.post('/registernewprojectitem', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const projectId = `PJ-${Math.floor(Math.random()*100)}`
            const name = req.body.productName
            const unitPrice = req.body.unitPrice

            db.query('INSERT INTO ProjectsItems (productId, productName, unitPrice) VALUES (?,?,?);', [projectId, name, unitPrice], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//route to fetch product data from db
app.post('/fetchallprojectsdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM ProjectsItems', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})


//7. View shop inventory records
app.post('/fetchequatorialprojectsinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialProjectsInventoryrecords JOIN ProjectsItems ON equatorialProjectsInventoryrecords.itemid = ProjectsItems.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. View massage department stock 
app.post('/fetchequatorialprojectsdepartmentstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialProjectsInventory JOIN ProjectsItems ON equatorialProjectsInventory.productId = ProjectsItems.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                       // console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})


//save projects restock data
app.post('/saveequatorialprojectsdepartmentstockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
            let category = req.body.category

            db.query('INSERT INTO equatorialProjectsInventoryrecords (date, recordcategory, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?,?);', [date, category, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('Success')
                    if(category === 'outgoing'){
                        db.query('SELECT * FROM equatorialProjectsInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                res.send('This item is not in stock')
                            } else if (results.length > 0 && parseFloat(results[0].quantityinstock) > parseFloat(quantity)) {
                                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatorialProjectsInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.It seems the quantity being taken out is more than the item stock count.")
                            }
                        })
                    }else{
                        db.query('SELECT * FROM equatorialProjectsInventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into equatorialProjectsInventory(productid,quantityinstock,munits) values(?,?,?)"
                                db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatorialProjectsInventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }
                }
            })

        }
    })
})



app.post('/equatorialprojectscartcheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const branch = req.body.branch;
        const items = req.body.items;
        const services = req.body.services;
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Array to store items with insufficient stock
        const insufficientStockItems = [];
  
        // Check stock availability for each item
        const itemsSold = JSON.parse(items);

        const promises = itemsSold.map((item) => {
          return new Promise((resolve, reject) => {
            db.query('SELECT quantityinstock FROM equatorialProjectsInventory WHERE productId = ?', [item.id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                const quantityInStock = results[0]?.quantityinstock || 0;
                if (quantityInStock >= item.quantity) {
                  resolve();
                } else {
                  insufficientStockItems.push(item.id);
                  resolve();
                }
              }
            });
          });
        });
  
        // Process the sale if all items have sufficient stock
        Promise.all(promises)
          .then(() => {
            if (insufficientStockItems.length > 0) {
              // Some items have insufficient stock
              res.status(400).send(`Insufficient stock for items: ${insufficientStockItems.join(', ')}`);
            } else {
              // All items have sufficient stock, proceed with the sale
              db.query('INSERT INTO equatorialProjectsSales (receiptNumber, saleDate, customerNames, customerContact, itemsSold, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);', [receiptNumber, date, customerNames, customerContact, items, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale');
                } else {
                  // Update the stock quantities
                  const updatePromises = itemsSold.map((item) => {
                    if (item.type !== 'service') { // Exclude services from stock update
                      return new Promise((resolve, reject) => {
                        db.query('UPDATE equatorialProjectsInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                          if (error) {
                            reject(error);
                          } else {
                            resolve();
                          }
                        });
                      });
                    } else {
                      return Promise.resolve(); // Resolve immediately for services
                    }
                  });
  
                  // Wait for all stock updates to complete
                  Promise.all(updatePromises)
                    .then(() => {
                      res.send({ status: '200', msg: 'success' });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send('Error occurred during stock update');
                    });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error occurred during stock check');
          });
      }
    });
  });


//route to fetch receipt data 
app.post('/fetchequatorialprojectsreceiptdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber

            db.query('SELECT * FROM equatorialProjectsSales WHERE receiptnumber = ?', [receiptNumber], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No receipt data found.')
                }
            })
        }
    })
})

//route to save projects payment plan
app.post('/saveclientpaymentplan', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber
            const paymentPlan = req.body.paymentPlan

            db.query('INSERT INTO equatorialprojectsclientpaymentplans (receiptNumber, paymentPlan) VALUES (?,?)', [receiptNumber, paymentPlan], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})


//route to fetch all projects payment plans
app.post('/fetchprojectsclientpaymentplans', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialprojectsclientpaymentplans JOIN equatorialProjectsSales ON equatorialprojectsclientpaymentplans.receiptNumber = equatorialProjectsSales.receiptNumber', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                       // console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})


//route to save client payment
app.post('/saveclientpayment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const receiptNumber = req.body.receiptNumber
                const date  = req.body.paymentdate
                const amountPaid = req.body.amountPaid
                const notes = req.body.notes
                const paymentMethod = req.body.paymentMethod


                db.query('INSERT INTO equatorialprojectssalespayments (receiptNumber, paymentdate, amountPaid, notes, paymentMethod) VALUES (?, ?, ?, ?, ?)',[receiptNumber, date, amountPaid, notes, paymentMethod], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        db.query('SELECT * FROM equatorialProjectsSales WHERE receiptNumber = ? ', [receiptNumber] ,(error, results) => {
                            if (error) throw (error);
        
                            if (results.length > 0) {
                               let newBalance = parseFloat(results[0].balance) - parseFloat(amountPaid)
                               let newPaymentStatus;
                               //update the balance and status of sales table
                               if(newBalance > 0){
                                newPaymentStatus='partiallypaid'
                               }else{
                                newPaymentStatus='fullypaid'
                               }
                               db.query('UPDATE equatorialProjectsSales SET balance = ?, paymentStatus = ? WHERE receiptNumber = ? ;', [newBalance, newPaymentStatus, receiptNumber], error => {
                                    if (error) {
                                        console.log(error)
                                    }else{
                                        res.send({
                                            status: 200,
                                            msg: 'success'
                                        })
                                    }
                                })

                            } else {
                                res.send(`There are no sale record found.`)
                            }
                        })
                    }

                })
        }
    })
})


app.post('/fetchequatorialshopstock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialShopInventory JOIN shopProducts ON equatorialShopInventory.productId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                       // console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no stock records found.`)
                    }
                })
        }
    })
})

app.post('/fetchequatorialshopinventoryrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialshopinventoryrecords JOIN shopProducts ON equatorialshopinventoryrecords.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//save massage restock data
app.post('/saveequatorialshoprestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            const itemsDelivered = JSON.parse(req.body.items)
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
            let category = req.body.category



            const insertRecord = (date, category, itemId, quantity, units, source, externalSourceDetails, notes) => {
                console.log(date)
                db.query('INSERT INTO equatorialshopinventoryrecords (date, recordcategory, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?,?);', [date, category, itemId, quantity, units, source, externalSourceDetails, notes], (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        if(category === 'outgoing'){
                            db.query('SELECT * FROM equatorialShopInventory WHERE productid = ?;', [itemId], function (err, results) {
                                // If there is an issue with the query, output the error
                                if (err) throw err;
                                // If the account exists
                                if (results.length === 0) {
                                    res.send('This item is not in stock')
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                                    const sqlStockCount = "UPDATE equatorialShopInventory SET quantityinstock = ? WHERE productid = ?"
                                    db.query(sqlStockCount, [newStockCount, itemId], (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.status(500).send('Error updating item quantity in stock');
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                } else {
                                    console.log("Error while increasing the item quantity in stock.")
                                    res.status(500).send('Error while increasing the item quantity in stock');
                                }
                            })
                        }else{
                            db.query('SELECT * FROM equatorialShopInventory WHERE productid = ?;', [itemId], function (err, results) {
                                // If there is an issue with the query, output the error
                                if (err) throw err;
                                // If the account exists
                                if (results.length === 0) {
                                    const sqlStockCount = "Insert into equatorialShopInventory(productid,quantityinstock,munits) values(?,?,?)"
                                    db.query(sqlStockCount, [itemId, quantity, units], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                } else if (results.length > 0) {
                                    let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                    const sqlStockCount = "UPDATE equatorialShopInventory SET quantityinstock = ? WHERE productid = ?"
                                    db.query(sqlStockCount, [newStockCount, itemId], (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('item quantity in stock has been updated successfully')
                                        }
                                    })
                                } else {
                                    console.log("Error while increasing the item quantity in stock.")
                                }
                            })
                        }
                    }
                });
            }

            // Iterate through each item in itemDelivered
         itemsDelivered.forEach((item) => {
            let id = `SR-${Math.floor(Math.random() * 10000)}`; // Declare `id` here

            // Insert the record into equatoriallabellinginventoryrecords
            insertRecord(date, category, item.itemId, item.itemQuantity, item.mUnits, source, externalSourceDetails, notes);
        });

        // Send a success response
        res.send({ status: '200', msg: 'success' });
        }
    })
})

app.post('/equatorialshopcartcheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const branch = req.body.branch;
        const items = req.body.items;
        const services = req.body.services;
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Array to store items with insufficient stock
        const insufficientStockItems = [];
  
        // Check stock availability for each item
        const itemsSold = JSON.parse(items);

        const promises = itemsSold.map((item) => {
          return new Promise((resolve, reject) => {
            db.query('SELECT quantityinstock FROM equatorialShopInventory WHERE productId = ?', [item.id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                const quantityInStock = results[0]?.quantityinstock || 0;
                if (quantityInStock >= item.quantity) {
                  resolve();
                } else {
                  insufficientStockItems.push(item.id);
                  resolve();
                }
              }
            });
          });
        });
  
        // Process the sale if all items have sufficient stock
        Promise.all(promises)
          .then(() => {
            if (insufficientStockItems.length > 0) {
              // Some items have insufficient stock
              res.send({ status: '400', msg: `Insufficient stock for items: ${insufficientStockItems.join(', ')}` })
            } else {
              // All items have sufficient stock, proceed with the sale
              db.query('INSERT INTO equatorialShopSales (receiptNumber, saleDate, customerNames, customerContact, itemsSold, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [receiptNumber, date, customerNames, customerContact, items, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale');
                } else {
                  // Update the stock quantities
                  const updatePromises = itemsSold.map((item) => {
                    if (item.type !== 'service') { // Exclude services from stock update
                      return new Promise((resolve, reject) => {
                        db.query('UPDATE equatorialShopInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [item.quantity, item.id], (error) => {
                          if (error) {
                            reject(error);
                          } else {
                            resolve();
                          }
                        });
                      });
                    } else {
                      return Promise.resolve(); // Resolve immediately for services
                    }
                  });
  
                  // Wait for all stock updates to complete
                  Promise.all(updatePromises)
                    .then(() => {
                      res.send({ status: '200', msg: 'success' });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send('Error occurred during stock update');
                    });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error occurred during stock check');
          });
      }
    });
  });

  app.post('/fetchequatorialsalereceiptdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNumber = req.body.receiptNumber

            db.query('SELECT * FROM equatorialShopSales WHERE receiptNumber = ?', [receiptNumber], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No receipt data found.')
                }
            })
        }
    })
})

//route to update sale data
app.post('/updateequatorialshopsaledata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const receiptNo = req.body.receiptNo
            const amountPaid = req.body.amountPaid
            const date = req.body.date
            const notes = req.body.additionalInfo
            const itemIn = req.body.itemIn
            const quantityIn = req.body.quantityIn
            const unitsIn = req.body.unitsIn
            const paymentMethod = req.body.paymentMethod
            const transactionId = req.body.transactionId
            let paymentStatus;

            db.query('SELECT totalAmount, balance, paymentstatus FROM equatorialShopSales WHERE receiptNumber = ?', [receiptNo], (error, results) => {
                if (error) throw error;
                if(results.length > 0){
                    console.log(results)
                     const newBalance = results[0].balance - parseFloat(amountPaid)
                     
                     if(newBalance === 0){
                        paymentStatus = 'fullypaid'
                     }else if(newBalance !== 0){
                        paymentStatus = 'partiallypaid'
                     }

                     db.query('INSERT INTO equatorialshopsalespayments (receiptNumber, paymentdate, itemin, quantityin, units, amountPaid, notes, paymentMethod, transactionId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [receiptNo, date, itemIn, quantityIn, unitsIn, amountPaid, notes, paymentMethod, transactionId], error => {
                         //if the query is faulty , throw the error
                         if (error) {
                             console.log(error);
                             res.send('Error')
                         } else {
                             res.send('Success')
                             db.query('UPDATE equatorialShopSales SET balance = ?, paymentstatus = ? WHERE receiptNumber = ? ;', [newBalance, paymentStatus, receiptNo], error => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                         }
                     })
                }
            })
        }
    })
})

app.post('/saveequatorialshopexpense', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.expenditureDate
            const expenditureCategory = req.body.expenditureCategory
            const expenditureName = req.body.expenditureName
            const desc = req.body.expenditureDesc
            const cost = req.body.expenditureTotalCost
            const amountPaid = req.body.amountPaid
            const balance = req.body.balance
            const paymentMethod = req.body.paymentMethod
            const paymentStatus = req.body.paymentStatus
            const createdat = new Date()

            db.query('INSERT INTO equatorialshopexpenditure (date, expenditurecategory, expenditurename, expendituredescription, expenditurecost, amountspent, balance, paymentmethod, paymentstatus, createdat) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [ date, expenditureCategory, expenditureName, desc, cost, amountPaid, balance, paymentMethod, paymentStatus, createdat], (error) => {
                if (error){
                    console.log(error)
                }else{
                    res.send('success')
                }
            })
        }
    })
})

app.post('/fetchequatorialexpendituredata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const expenseId = req.body.expenseId

            db.query('SELECT * FROM equatorialshopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                if (error) throw error;

                if(results.length > 0){
                    res.send(results)
                }else{
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to update expenditure data
app.post('/updateequatorialexpendituredata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const expenseId = req.body.expenditureId
            const updateType = req.body.updateType
            const amountPaid = req.body.amountPaid
            const date = req.body.date
            const notes = req.body.additionalInfo
            const updatedPaidAmount = req.body.newPaidAmount
            const newExpenseAmount = req.body.newExpenseAmount
            const paymentMethod = req.body.paymentMethod
            console.log(paymentMethod)
            let paymentStatus;
            if (updateType === 'expenseTotalCost'){
                console.log(1)
                db.query('SELECT expenditurecost, amountspent, balance, paymentstatus FROM equatorialshopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                    if (error) throw error;
                    if(results.length > 0){
                        const newBalance = newExpenseAmount - results[0].amountspent

                        if(newBalance === 0){
                            paymentStatus = 'fully paid'
                            }else if(newBalance !== 0){
                            paymentStatus = 'partially paid'
                        }
                        db.query('UPDATE equatorialshopexpenditure SET expenditurecost = ?, balance = ?, paymentstatus = ? WHERE expenditureid = ? ;', [newExpenseAmount, newBalance, paymentStatus, expenseId], error => {
                            if (error) {
                                console.log(error)
                            }
                                res.send('Success')
                        })
                    }
                })
            }else if(updateType === 'payBalance'){
                console.log(2)
                db.query('SELECT expenditurecost, amountspent, balance, paymentstatus FROM equatorialshopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                    if (error) throw error;
                    if(results.length > 0){
                        const amountSpent = parseFloat(results[0].amountspent) + parseFloat(amountPaid)
                        const newBalance = parseFloat(results[0].balance) - amountPaid

                        if(newBalance === 0){
                            paymentStatus = 'fully paid'
                            }else if(newBalance !== 0){
                            paymentStatus = 'partially paid'
                        }
                        let calcBalance = newExpenseAmount - results[0].balance
                        if (calcBalance === 0 ){
                            paymentStatus = 'fully paid'
                            }else{
                            paymentStatus = 'partially paid'
                        }

                        db.query('INSERT INTO equatorialshopexpensespayments (paymentdate, expenseid, additionalnotes, amountpaid, paymentmethod) VALUES (?, ?, ?, ?, ?);', [date, expenseId, notes, amountPaid, paymentMethod], error => {
                            //if the query is faulty , throw the error
                            if (error) {
                                res.send('Error')
                            } else {
                                db.query('UPDATE equatorialshopexpenditure SET amountspent = ?, balance = ?, paymentstatus = ? WHERE expenditureid = ? ;', [amountSpent, newBalance, paymentStatus, expenseId], error => {
                                   if (error) {
                                       console.log(error)
                                   }
                               })
                               res.send('Success')
                            }
                        })
                    }
                })
            }else if (updateType === 'alreadypaidamount') {
                console.log(3)
                db.query('SELECT expenditurecost, amountspent, balance, paymentstatus FROM equatorialshopexpenditure WHERE expenditureid = ?', [expenseId], (error, results) => {
                    if (error) throw error;
                    if(results.length > 0){
                        const newBalance = parseFloat(results[0].expenditurecost) - updatedPaidAmount

                        if(newBalance === 0){
                            paymentStatus = 'fully paid'
                            }else if(newBalance !== 0){
                            paymentStatus = 'partially paid'
                        }
                        let calcBalance = newExpenseAmount - results[0].balance
                        if (calcBalance === 0 ){
                            paymentStatus = 'fully paid'
                            }else{
                            paymentStatus = 'partially paid'
                        }

                        db.query('UPDATE equatorialshopexpenditure SET amountspent = ?, balance = ?, paymentstatus = ? WHERE expenditureid = ? ;', [updatedPaidAmount, newBalance, paymentStatus, expenseId], error => {
                            if (error) {
                                console.log(error)
                            }else{
                                db.query('UPDATE equatorialshopexpensespayments SET amountpaid = ? WHERE paymentdate = ? ;', [updatedPaidAmount, date], error => {
                                    if (error) {
                                        console.log(error)
                                    }
                                    res.send('success')
                                })   
                            }
                        })                
                    }
                })
            }
        }
    })
})

//7. fetch all fcr external receipts
app.post('/fetchequatorialexpensesreceipts', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	equatorialexpensesreceipts', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchallequatorialshopexpenses', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialshopexpenditure', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no expenditure records found.`)
                    }
                })
        }
    })
})


app.post('/fetchallequatorialshopsales', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialShopSales', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no sales records found.`)
                    }
                })
        }
    })
})


app.post('/fetchallbranchessalesrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const fetchEquatorialShopSales = new Promise((resolve, reject) => {
          db.query('SELECT * FROM equatorialShopSales', (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
  
        const fetchEquatorialProjectsSales = new Promise((resolve, reject) => {
          db.query('SELECT * FROM equatorialProjectsSales', (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
  
        const fetchMasanafuShopSales = new Promise((resolve, reject) => {
          db.query('SELECT * FROM masanafuShopSales', (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
  
        Promise.all([fetchEquatorialShopSales, fetchEquatorialProjectsSales, fetchMasanafuShopSales])
          .then(([equatorialShopSales, equatorialProjectsSales, masanafuShopSales]) => {
            let allResults = [];
            allResults = allResults.concat(equatorialShopSales, equatorialProjectsSales, masanafuShopSales);
            res.send(allResults);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while fetching records.');
          });
      }
    });
  });


//route to save client payment
app.post('/saveclientsubscription', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const {firstName, middleName, lastName, clientContact, amountPaid, notes} = req.body.data
                const subscriptionId = `SUB-${Math.floor(Math.random()*1000)}`
                const date = req.body.date
                const clientNames = `${firstName.toUpperCase().trim()} ${middleName.toUpperCase().trim()} ${lastName.toUpperCase().trim()}`
                
                db.query('INSERT INTO equatorialmassagesubscriptions (subscriptionId, subscriptiondate, clientnames, clientcontact, amountPaid, balance, notes, subscriptionstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[subscriptionId, date, clientNames, clientContact, amountPaid, amountPaid, notes, 'active'], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})

app.post('/fetchallequatorialmassagesubscriptions', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialmassagesubscriptions', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/saveclientsubscriptionusage', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date  =  req.body.date
            const subscriptionId = req.body.subscriptionId
            const serviceId = req.body.serviceId
            const amountSpent = req.body.amountSpent

            db.query('SELECT * FROM equatorialmassagesubscriptions WHERE subscriptionId = ?;', subscriptionId, function (error, results) {
                if (error) throw error;
                if (results.length > 0 && results[0].subscriptionstatus !== 'inactive') {
                    const newBalance = results[0].balance - parseFloat(amountSpent)
                    let newSubscriptionStatus;
                    if(newBalance === 0 || newBalance < 0){
                        newSubscriptionStatus = 'inactive'
                        db.query('INSERT INTO equatorialmassagesubscriptionusage (subscriptionId, serviceDate,  serviceOfferedId, amountSpent) VALUES (?, ?, ?, ?)',[subscriptionId, date, serviceId, amountSpent], (error) => {
                            if (error){
                                throw (error)
                            }else{
                                db.query('UPDATE equatorialmassagesubscriptions SET balance = ? WHERE subscriptionId = ?;', [newBalance, subscriptionId], error => {
                                    if (error) {
                                        console.log(error)
                                    }else{
                                        db.query('UPDATE equatorialmassagesubscriptions SET balance = ?, subscriptionstatus = ? WHERE subscriptionId = ? ;', [newBalance, newSubscriptionStatus, subscriptionId], error => {
                                            if (error) {
                                                console.log(error)
                                            }else{
                                                res.send({
                                                    status: 200,
                                                    msg: 'success'
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        db.query('INSERT INTO equatorialmassagesubscriptionusage (subscriptionId, serviceDate,  serviceOfferedId, amountSpent) VALUES (?, ?, ?, ?)',[subscriptionId, date, serviceId, amountSpent], (error) => {
                            if (error){
                                throw (error)
                            }else{
                                db.query('UPDATE equatorialmassagesubscriptions SET balance = ? WHERE subscriptionId = ? ;', [newBalance, subscriptionId], error => {
                                    if (error) {
                                        console.log(error)
                                    }else{
                                        res.send({
                                            status: 200,
                                            msg: 'success'
                                        })
                                    }
                                })

                            }
                        })
                    }
                    
                } else {
                    res.send('No data found.')
                }
            })
        }

    })
})


app.post('/fetchallsubscriptionsusagerecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialmassagesubscriptionusage JOIN massageServices ON equatorialmassagesubscriptionusage.serviceOfferedId = massageServices.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//route to save client payment
app.post('/submitmassageincome', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const timestamp = Date.now();
                const submissionId = `SM-${timestamp}-${Math.floor(Math.random() * 1000000)}`
                const date = req.body.date
                const submittedBy = req.body.submittedBy
                const submissionStatus = 'unconfirmed'
                const amountSubmitted = req.body.massageAmount
                const productsAmount = req.body.productsAmount
                const receivedBy = req.body.deliveredTo
                
                db.query('INSERT INTO equatorialmassagemoneysubmission (submissionId, submissionDate, massageamount, productamount, submittedBy, receivedBy, submissionstatus) VALUES (?, ?, ?, ?, ?, ?, ?)',[submissionId, date, amountSubmitted, productsAmount, submittedBy, receivedBy, submissionStatus], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})

//route to save client payment
app.post('/confirmincomesubmission', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const submissionId = req.body.submissionId
                const submissionStatus = 'recieved'

                db.query('UPDATE equatorialmassagemoneysubmission SET submissionstatus = ? WHERE submissionId = ?',[submissionStatus, submissionId], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})

app.post('/rejectincomesubmission', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const submissionId = req.body.submissionId
                const submissionStatus = 'not recieved'
 
                db.query('UPDATE equatorialmassagemoneysubmission SET submissionstatus = ? WHERE submissionId = ?',[submissionStatus, submissionId], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})

app.post('/fetchallincomesubmissionrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialmassagemoneysubmission', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/savesupplydata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const supplyId = `SP-${Math.floor(Math.random()*100)}`
                const supplierNames = req.body.supplierNames
                const date = req.body.date
                const itemsSupplied = req.body.itemsSupplied
                const totalSupplyCost = req.body.totalSupplyCost
                const balance = req.body.balance
                const branchSupplied = req.body.branchSupplied
                const paymentMethod = req.body.paymentMethod
                const paymentStatus = req.body.paymentStatus
                const transactionId = req.body.transactionId
                const chequeNumber = req.body.chequeNumber
                const receivedBy = req.body.receivedBy
                const notes = req.body.notes
                const units = req.body.units
                const quantitySupplied = req.body.quantitySupplied
   
                db.query('INSERT INTO suppliers (supplyId, suppliernames, supplydate, branchsupplied, itemssupplied, quantitysupplied, units, totalsupplycost, balance, paymentmethod, paymentstatus, transactionId, chequenumber, receivedBy, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[supplyId, supplierNames, date, branchSupplied, itemsSupplied, quantitySupplied, units, totalSupplyCost, balance, paymentMethod, paymentStatus, transactionId, chequeNumber, receivedBy, notes], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})


app.post('/fetchallsupplyrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM suppliers', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchallsupplierpaymentrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM supplierpaymentrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/savesupplierpayment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            return res.status(403).send("You are not authorized to perform this action.");
        }

        const date = req.body.date;
        const supplyId = req.body.supplyId;
        const itemName = req.body.itemName
        const quantity = req.body.quantity
        const units = req.body.units
        const amountPaid = req.body.amountPaid;
        const paymentMethod = req.body.paymentMethod;
        const transactionId = req.body.transactionId;
        const chequeNumber = req.body.chequeNumber;
        const paidBy = req.body.paidBy;
        const notes = req.body.notes;

        db.query('SELECT * FROM suppliers WHERE supplyId = ?;', supplyId, function (error, results) {
            if (error) {
                return res.status(500).send("Error retrieving supplier data.");
            }

            if (results.length > 0 && results[0].paymentstatus !== 'pending') {
                const newBalance = results[0].balance - parseFloat(amountPaid);
                let newStatus = newBalance <= 0 ? 'fully paid' : 'partially paid';

                db.query('INSERT INTO supplierpaymentrecords (paymentDate, supplyId, itemName, Quantity, Units, amountPaid, paymentmethod, transactionId, chequenumber, PaidBy, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, supplyId, itemName, quantity, units, amountPaid, paymentMethod, transactionId, chequeNumber, paidBy, notes], (error) => {
                    if (error) {
                        return res.status(500).send("Error saving payment record.");
                    }

                    db.query('UPDATE suppliers SET balance = ?, paymentstatus = ? WHERE supplyId = ?;', [newBalance, newStatus, supplyId], (error) => {
                        if (error) {
                            return res.status(500).send("Error updating supplier data.");
                        }

                        return res.send({
                            status: 200,
                            msg: 'success'
                        });
                    });
                });
            } else {
                res.send('No data found.');
            }
        });
    });
});


app.post('/equatorialmassageservicescheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const services = req.body.services;
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Process the sale if all items have sufficient stock
        db.query('INSERT INTO equatorialMassageServicesRecords (receiptNumber, saleDate, customerNames, customerContact, servicesOffered, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [receiptNumber, date, customerNames, customerContact, services, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale.');
                } else {
                  res.send({ status: '200', msg: 'success' })
                }
              });
            }
          })
})


app.post('/fetchallservicesalesrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialMassageServicesRecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/saveexhibitionincomerecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const date = req.body.date
        const exId = req.body.exId
        const amountRecieved = req.body.amountRecieved
        const deliveredBy = req.body.deliveredBy
        const recievedBy = req.body.recievedBy
  
        // Process the sale if all items have sufficient stock
        db.query('INSERT INTO exhibitionincome (date, exhibitionId, amountRecieved, DeliveredBy, RecievedBy) VALUES (?, ?, ?, ?, ?);', [date, exId, amountRecieved, deliveredBy, recievedBy], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale.');
                } else {
                res.send({ status: '200', msg: 'success' })
                }
              });
            }
          })
})

app.post('/fetchallexhibitionincomedata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM exhibitionincome JOIN exhibitions ON exhibitionincome.exhibitionId = exhibitions.id', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})
app.post('/fetchallequatorialgeneralstoreinventroyrestockrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialgeneralstorerestockrecords JOIN shopProducts ON equatorialgeneralstorerestockrecords.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/fetchallequatorialgeneralstoreinventoryreleaserecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialcustodianreleasedinventory JOIN shopProducts ON equatorialcustodianreleasedinventory.itemreleasedId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchaequatorialgeneralstorestock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialgeneralstoreinventory JOIN shopProducts ON equatorialgeneralstoreinventory.productId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/releaseinventorytodepartment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const date = req.body.date
        const itemReleased = req.body.itemSupplied
        const quantity = req.body.quantitySupplied
        const units = req.body.units
        const deptDeliveredTo = req.body.deptDeliveredTo
        const recievedBy = req.body.recievedBy
        const notes = req.body.notes
        
        db.query('SELECT * FROM equatorialgeneralstoreinventory WHERE productid = ?;', [itemReleased], function (err, results) {
            // If there is an issue with the query, output the error
            if (err) throw err;
            // If the account exists
            if (results.length === 0) {
                res.send('This item is not in stock')
            } else if (results.length > 0) {
                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                const sqlStockCount = "UPDATE equatorialgeneralstoreinventory SET quantityinstock = ? WHERE productid = ?"
                db.query(sqlStockCount, [newStockCount, itemReleased], (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('Error updating item quantity in stock');
                    } else {
                        db.query('INSERT INTO equatorialcustodianreleasedinventory (releasedate, itemreleasedId, quantityreleased, units, departmentreleasedto, recievedby, notes) VALUES (?, ?, ?, ?, ?, ?, ?);', [date, itemReleased, quantity, units, deptDeliveredTo, recievedBy, notes], (error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send('Error occurred during saving.');
                              } else {
                              res.send({ status: '200', msg: 'success' })
                              }
                        })
                    }
                })
            } else {
                console.log("Error while increasing the item quantity in stock.")
                res.status(500).send('Error while increasing the item quantity in stock');
            }
        })

               
        }
         })
})


//save shop restock data
app.post('/equatorialgeneralstorerestock', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
            let deliveryNoteNumber = req.body.deliveryNoteNumber

            db.query('INSERT INTO equatorialgeneralstorerestockrecords (date, deliverynotenumber, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [date, deliveryNoteNumber, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {  
                        db.query('SELECT * FROM equatorialgeneralstoreinventory WHERE productid = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into equatorialgeneralstoreinventory(productid,quantityinstock,munits) values(?,?,?)"
                                db.query(sqlStockCount, [itemid, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send({ status: '200', msg: 'success' })
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatorialgeneralstoreinventory SET quantityinstock = ? WHERE productid = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send({ status: '200', msg: 'success' })
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                }
            })

        }
    })
})



app.post('/labellingdepartmentstorerestock', upload.single('file'), (req, res) => {
    // Verify the JWT token for authorization
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            // Get the uploaded file
            const file = req.file;

            if (!file) {
                // Return an error response if the file is missing
                return res.status(400).json({ message: 'Missing file or expenseId' });
            }

            // Extract data from the request
            const date = req.body.date;

            // Now, `id` contains a unique value
            const itemDelivered = JSON.parse(req.body.items);
            const restockSource = req.body.restockSource;
            const companyBranch = req.body.companyBranch;
            const deliveredBy = req.body.deliveredBy;
            const externalSourceDetails = req.body.externalSourceDetails;
            const notes = req.body.notes;
            const deliveryNoteNumber = req.body.deliveryNoteNumber;

            // Construct the path for the uploaded image
            const imagePath = path.join('delivery_notes_uploads/', file.filename);

            // Helper function to insert records into the equatoriallabellinginventoryrecords table
            const insertRecord = (id, date, itemId, quantity, units, restocksource, externalsourcedetails, companybranch, deliveredby, notes, deliverynotenumber, deliverynoteimage) => {
                db.query('INSERT INTO equatoriallabellinginventoryrecords (restockId, date, itemId, quantity, units, restocksource, externalsourcedetails, companybranch, deliveredby, notes, deliverynotenumber, deliverynoteimage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, date, itemId, quantity, units, restocksource, externalsourcedetails, companybranch, deliveredby, notes, deliverynotenumber, deliverynoteimage], (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        db.query('SELECT * FROM equatoriallabellinginventory WHERE itemid = ?;', [itemId], (err, results) => {
                            if (err) {
                                throw err;
                            }
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into equatoriallabellinginventory(itemid,quantityinstock,munits) values(?,?,?)";
                                db.query(sqlStockCount, [itemId, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('item quantity in stock has been updated successfully');
                                    }
                                });
                            } else if (results.length > 0) {
                                const newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE equatoriallabellinginventory SET quantityinstock = ? WHERE itemid = ?";
                                db.query(sqlStockCount, [newStockCount, itemId], (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('item quantity in stock has been updated successfully');
                                    }
                                });
                            } else {
                                console.log("Error while increasing the item quantity in stock.");
                            }
                        });
                    }
                });
            };

            // Iterate through each item in itemDelivered
            itemDelivered.forEach((item) => {
                let id = `LR-${Math.floor(Math.random() * 10000)}`; // Declare `id` here

                // Insert the record into equatoriallabellinginventoryrecords
                insertRecord(id, date, item.itemId, item.itemQuantity, item.mUnits, restockSource, externalSourceDetails, companyBranch, deliveredBy, notes, deliveryNoteNumber, imagePath);
            });

            // Send a success response
            res.send({ status: '200', msg: 'success' });
        }
    });
});



app.post('/fetchlabellingdepartmentinventoryrestockingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatoriallabellinginventoryrecords JOIN shopProducts ON equatoriallabellinginventoryrecords.itemId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/transferlabelledinventorytocustodian', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const date = req.body.date;
        const itemsDelivered = JSON.parse(req.body.itemsDelivered);
        const deliveredTo = req.body.deliveredto;
        const otherDestInfo = req.body.otherDestInfo;
        const dnn = req.body.deliveryNoteNumber;
        const notes = req.body.notes;
  
        // Array to store items with insufficient stock
        const insufficientStockItems = [];
  
        const stockCheckPromises = itemsDelivered.map((item) => {
          return new Promise((resolve, reject) => {
            db.query('SELECT equatoriallabellinginventory.quantityinstock, shopProducts.productName FROM equatoriallabellinginventory JOIN shopProducts ON equatoriallabellinginventory.itemid = shopProducts.productId WHERE itemid = ?', [item.itemId], (error, results) => {
              if (error) {
                reject(error);
              } else {
                const quantityInStock = results[0]?.quantityinstock || 0;
                if (quantityInStock >= item.itemQuantity) {
                  resolve();
                } else {
                  insufficientStockItems.push(results[0].productName);
                  resolve();
                }
              }
            });
          });
        });
  
        // Process the transfer if all items have sufficient stock
        Promise.all(stockCheckPromises)
          .then(() => {
            if (insufficientStockItems.length > 0) {
              // Some items have insufficient stock
              res.send({ status: 400 , msg: `Insufficient stock for items: ${insufficientStockItems.join(', ')}` });
            } else {
              const insertPromises = itemsDelivered.map((item) => {
                return new Promise((resolve, reject) => {
                  let id = `DI-${Math.floor(Math.random() * 10000)}`;
                  // Insert the record into labelledinventorydeliveryrecords
                  db.query('INSERT INTO labelledinventorydeliveryrecords (deliveryId, date, itemId, deliverynotenumber, quantitydelivered, units, deliveredto, otherdestinationinfo, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, date, item.itemId, dnn, item.itemQuantity, item.mUnits, deliveredTo, otherDestInfo, notes], (error) => {
                      if (error) {
                        console.log(error);
                        reject(error);
                      } else {
                        resolve();
                      }
                    });
                });
              });
  
              // Process updates after all inserts are done
              const updatePromises = itemsDelivered.map((item) => {
                return new Promise((resolve, reject) => {
                  db.query('UPDATE equatoriallabellinginventory SET quantityinstock = quantityinstock - ? WHERE itemid = ?', [item.itemQuantity, item.itemId], (error) => {
                    if (error) {
                      console.log(error);
                      reject(error);
                    } else {
                      resolve();
                    }
                  });
                });
              });
  
              // Wait for all inserts to complete before updating quantities
              Promise.all(insertPromises)
                .then(() => {
                  // Process updates and respond after all inserts are done
                  Promise.all(updatePromises)
                    .then(() => {
                      res.send({ status: 200, msg: 'Inventory transfer successful.' });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send('Error occurred during stock update.');
                    });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).send('Error occurred during record insert.');
                });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error occurred during stock check.');
          });
      }
    });
  });
  

app.post('/fetchlabelledinventorytransferrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM labelledinventorydeliveryrecords JOIN shopProducts ON labelledinventorydeliveryrecords.itemId = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})




app.post('/savelabellingdailyoutput', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const date = req.body.date
        const itemsLabelled = JSON.parse(req.body.itemsDelivered)
        const recordedBy = req.body.recordedBy
        const dnn = req.body.dnn
        const notes = req.body.notes

        // Helper function to insert records into the equatoriallabellinginventoryrecords table
        const insertRecord = (id, date, itemId, quantity, units, recordedby, notes, dnn) => {
            db.query('INSERT INTO equatoriallabellingdailyoutput (id, date, itemid, quantity, units, recordedby, notes, deliverynotenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, date, itemId, quantity, units, recordedby, notes, dnn], (error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send({ status: '200', msg: 'success' })
                }
            });
        };

     // Iterate through each item in itemDelivered
     itemsLabelled.forEach((item) => {
        let id = `DO-${Math.floor(Math.random() * 10000)}`; // Declare `id` here

        // Insert the record into equatoriallabellinginventoryrecords
        insertRecord(id, date, item.itemId, item.itemQuantity, item.mUnits, recordedBy, notes, dnn);
    });


      }
    })
})


app.post('/fetchlabellingdailyoutputrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatoriallabellingdailyoutput JOIN shopProducts ON equatoriallabellingdailyoutput.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/equatoriallabellingstocktaking', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatoriallabellinginventory JOIN shopProducts ON equatoriallabellinginventory.itemid = shopProducts.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchequatorialreceiptpaymentdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialshopsalespayments', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/equatorialsavenewnct', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            let date = req.body.date
            let names = req.body.customerNames
            let contact = req.body.customerContact
            let itemInId = req.body.itemIn
            let itemInQuantity = req.body.quantityIn
            let unitsIn = req.body.unitsIn
            let itemOutId = req.body.itemOut
            let itemOutQuantity = req.body.quantityOut
            let unitsOut = req.body.unitsOut
            let authorizedBy = req.body.authorizedBy
            let notes = req.body.notes
            let initialStatus = 'pending'

            db.query('SELECT * FROM equatorialShopInventory WHERE productid = ?;', [itemInId], function (err, results) {
                // If there is an issue with the query, output the error
                if (err) throw err;
                // If the account exists
                if (results.length === 0) {
                    const sqlStockCount = "Insert into equatorialShopInventory(productid,quantityinstock,munits) values(?,?,?)"
                    db.query(sqlStockCount, [itemInId, itemInQuantity, unitsIn], (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            db.query('INSERT INTO equatorialncts (date, clientnames, clientcontact, iteminid, quantityin, unitsin, itemoutid, quantityout, unitsout, notes, authorizedby, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, names, contact, itemInId, itemInQuantity, unitsIn, itemOutId, itemOutQuantity, unitsOut, notes, authorizedBy, initialStatus], (error) => {
                                if (error) {
                                    res.status(500).send('Error occurred during saving.');
                                  }
                            })
                        }
                    })
                } else if (results.length > 0) {
                    let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(itemInQuantity);
                    const sqlStockCount = "UPDATE equatorialShopInventory SET quantityinstock = ? WHERE productid = ?"
                    db.query(sqlStockCount, [newStockCount, itemInId], (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('item quantity in stock has been updated successfully')
                            db.query('INSERT INTO equatorialncts (date, clientnames, clientcontact, iteminid, quantityin, unitsin, itemoutid, quantityout, unitsout, notes, authorizedby, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, names, contact, itemInId, itemInQuantity, unitsIn, itemOutId, itemOutQuantity, unitsOut, notes, authorizedBy, initialStatus], (error) => {
                                if (error) {
                                    res.status(500).send('Error occurred during saving.');
                                  }
                            })
                        }
                    })
                } else {
                    console.log("Error while increasing the item quantity in stock.")
                }
            })

            db.query('SELECT * FROM equatorialShopInventory WHERE productid = ?;', [itemOutId], function (err, results) {
                // If there is an issue with the query, output the error
                if (err) throw err;
                // If the account exists
                if (results.length === 0) {
                        res.send({ status: '403', msg: 'The item you are trying to take out is not in stock.' })
                } else if (results.length > 0) {
                    let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(itemOutQuantity);
                    const sqlStockCount = "UPDATE equatorialShopInventory SET quantityinstock = ? WHERE productid = ?"
                    db.query(sqlStockCount, [newStockCount, itemOutId], (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send({ status: '200', msg: 'success' })
                        }
                    })
                } else {
                    console.log("Error while increasing the item quantity in stock.")
                }
            })
        }

    })
})

app.post('/fetchallnctrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM equatorialncts JOIN shopProducts ON equatorialncts.iteminid = shopProducts.productId', (error, results) => {
                if (error) throw error;

                if (results.length > 0) {
                    const itemoutids = results.map(record => record.itemoutid);

                    db.query('SELECT productId, productName FROM shopProducts WHERE productId IN (?)', [itemoutids], (error, productResults) => {
                        if (error) throw error;

                        const productMap = new Map();
                        productResults.forEach(product => {
                            productMap.set(product.productId, product.productName);
                        });

                        const mergedResults = results.map(record => {
                            const modifiedRecord = { ...record };
                            modifiedRecord.itemOut = productMap.get(record.itemoutid);
                            return modifiedRecord;
                        });

                        console.log(mergedResults)
                        res.send(mergedResults);
                    });
                } else {
                    res.send(`There are no records found.`);
                }
            });
        }
    });
});


app.post('/confirmnct', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const transactionId = req.body.transactionId
                const newStatus = 'approved'

                db.query('UPDATE equatorialncts SET status = ? WHERE transactionId = ?',[newStatus, transactionId], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})

app.post('/rejectnct', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const transactionId = req.body.transactionId
            const newStatus = 'rejected'
 
                db.query('UPDATE equatorialncts SET status = ? WHERE transactionId = ?',[newStatus, transactionId], (error) => {
                    if (error){
                        throw (error)
                    }else{
                        res.send({
                            status: 200,
                            msg: 'success'
                        })
                    }

                })
        }
    })
})


app.post('/saveclientprojectsorder', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
            const timestamp = new Date().getTime().toString(); // Example timestamp: "1647824898645"
            const reducedTimestamp = timestamp.substring(9, 14); // Extract 5 digits from index 9 to 13
            const random = Math.floor(Math.random() * 1000); // Example random number: 7453
            const orderId = `POE -${reducedTimestamp}-${random}`
            const fName = req.body.fName
            const lName = req.body.lName
            const contact1 = req.body.contactNo_1
            const contact2 = req.body.contactNo_2
            const address  = req.body.address
            const itemName  = req.body.itemname
            const quantity = req.body.quantity
            const units = req.body.units
            const totalPrice = req.body.totalprice
            const balance = req.body.balance
            const notes = req.body.notes
  
        // Process the sale if all items have sufficient stock
        db.query('INSERT INTO clientprojectorders (orderId, firstname, lastname, contact1, contact2, address, itemname, quantity, units, totalprice, balance, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [orderId, fName, lName, contact1, contact2, address, itemName, quantity, units, totalPrice, balance, notes], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale.');
                } else {
                res.send({ status: '200', msg: 'success' })
                }
              });
            }
          })
})

app.post('/fetchallclientprojectorders', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM clientprojectorders JOIN ProjectsItems ON clientprojectorders.itemname = ProjectsItems.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchclientprojectspayment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM clientprojectspayments', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/saveclientprojectspayment', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            return res.status(403).send("You are not authorized to perform this action.");
        }

        const date = req.body.date;
        const orderId = req.body.orderId;
        const itemName = req.body.itemName
        const quantity = req.body.quantity
        const units = req.body.units
        const amountPaid = req.body.amountPaid;
        const paymentMethod = req.body.paymentMethod;
        const transactionId = req.body.transactionId;
        const chequeNumber = req.body.chequeNumber;
        const paidBy = req.body.paidBy;
        const notes = req.body.notes;

        db.query('SELECT * FROM clientprojectorders WHERE orderId = ?;', orderId, function (error, results) {
            if (error) {
                return res.status(500).send("Error retrieving projects order data.");
            }

            if (results.length > 0 && results[0].balance > 0) {
                const newBalance = results[0].balance - parseFloat(amountPaid);

                db.query('INSERT INTO clientprojectspayments (paymentDate, orderId, itemName, Quantity, Units, amountPaid, paymentmethod, transactionId, chequenumber, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, orderId, itemName, quantity, units, amountPaid, paymentMethod, transactionId, chequeNumber, notes], (error) => {
                    if (error) {
                        return res.status(500).send("Error saving payment record.");
                    }

                    db.query('UPDATE clientprojectorders SET balance = ? WHERE orderId = ?;', [newBalance, orderId], (error) => {
                        if (error) {
                            return res.status(500).send("Error updating supplier data.");
                        }

                        return res.send({
                            status: 200,
                            msg: 'success'
                        });
                    });
                });
            } else {
                res.send('No data found.');
            }
        })
    })
})

app.post('/saveclientprojectsupgrade', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            return res.status(403).send("You are not authorized to perform this action.");
        }

        const date = req.body.date;
        const orderId = req.body.orderId;
        const itemName = req.body.itemName
        const quantity = req.body.quantity
        const units = req.body.units
        const totalPrice = req.body.totalPrice
        const balance = req.body.newBalance
        const notes = req.body.notes

        console.log(orderId, itemName , balance, notes)

        db.query('UPDATE clientprojectorders SET itemname = ?, quantity = ?, units = ?, totalprice = ?, balance = ? , notes = ? WHERE orderId = ?;', [itemName, quantity, units, totalPrice, balance, notes, orderId], (error) => {
            if (error) {
                return res.status(500).send("Error updating  data.");
            }else{
                return res.send({
                    status: 200,
                    msg: 'success'
                });
            }
            
        });
    })
})


app.post('/savechequedata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
            const timestamp = new Date().getTime().toString(); // Example timestamp: "1647824898645"
            const reducedTimestamp = timestamp.substring(9, 14); // Extract 5 digits from index 9 to 13
            const random = Math.floor(Math.random() * 1000); // Example random number: 7453
            const ChequeId = `C-${reducedTimestamp}-${random}`
            const chequeNumber = req.body.chequeNumber
            const drawerNames = req.body.drawerNames
            const drawerContact = req.body.drawerContact
            const bankName = req.body.bankName
            const paymentReason = req.body.reason
            const amount = req.body.amount
            const dateIssued = req.body.dateIssued
            const bankingDate = req.body.bankingDate
            const chequeIssuedBy = req.body.chequeIssuedBy
            const notes = req.body.notes
  
        // Process the sale if all items have sufficient stock
        db.query('INSERT INTO companycheques (chequeId, chequeNumber, DrawerNames, DrawerContact, BankName, PaymentReason, amount,  DateIssued, BankingDate, ChequeIssuedBy, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ChequeId, chequeNumber, drawerNames, drawerContact, bankName, paymentReason, amount, dateIssued, bankingDate, chequeIssuedBy, notes], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error saving cheque data.');
                } else {
                res.send({ status: '200', msg: 'success' })
                }
              });
            }
          }) 
})


app.post('/fetchallchequeData', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM companycheques', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

app.post('/fetchallequatorialcustodianrecievedrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM equatorialgeneralstorerestockrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/markchequeaspaid', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const chequeId = req.body.chequeId
            const newStatus = 'Paid'

            db.query('UPDATE companycheques SET status = ? WHERE chequeId = ? ', [newStatus, chequeId], error => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error while changing cheque status.');
                } else {
                    res.send({ status: '200', msg: 'success' });
                }
            });

        }
    })
})


app.post('/markchequeasbounced', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const chequeId = req.body.chequeId
            const newStatus = 'Bounced'

            db.query('UPDATE companycheques SET status = ? WHERE chequeId = ? ', [newStatus, chequeId], error => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error while changing cheque status.');
                } else {
                    res.send({ status: '200', msg: 'success' });
                }
            })

        }
    })
})


app.post('/fetchpreexhibitionlist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const status = 'preexhibition'
            db.query('SELECT * FROM exhibitions WHERE status = ?;',[status], (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved exhibitions.')
                }
            })
        }
    })
})

app.post('/fetchallexhibitionslist', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM exhibitions',(error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved exhibitions.')
                }
            })
        }
    })
})


app.post('/fetchallexhibitionsales', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const status = 'preexhibition'
            db.query('SELECT * FROM exhibitionsales JOIN exhibitions WHERE exhibitionsales.exhibitionId = exhibitions.id',[status], (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('There are no saved exhibitions.')
                }
            })
        }
    })
})

app.post('/exhibitioncheckout', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const exhibitionId = req.body.exhibitionId
        const receiptNumber = req.body.receiptNo;
        const total = req.body.total;
        const items = req.body.items
        const additionalInfo = req.body.additionalInfo;
        const paymentMethod = req.body.paymentMethod;
        const paymentStatus = req.body.paymentStatus;
        const balance = req.body.balance;
        const customerNames = req.body.customerNames;
        const customerContact = req.body.customerContact;
        const date = req.body.date;
        const transactionId = req.body.transactionId
  
        // Process the sale if all items have sufficient stock
        db.query('INSERT INTO exhibitionsales (receiptNumber,exhibitionId, saleDate, customerNames, customerContact, itemsSold, totalAmount, balance, paymentStatus, paymentMethod, additionalinfo, transactionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [receiptNumber, exhibitionId, date, customerNames, customerContact, items, total, balance, paymentStatus, paymentMethod, additionalInfo, transactionId], (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error occurred during sale.');
                } else {
                res.send({ status: '200', msg: 'success' })
                }
              });
            }
          })
})

//Saphrone Routes
app.post('/newsaphroneparticipantregistration', (req, res) => {
    const employeeId = `E-${Math.floor(Math.random() * 1000)}`
    const username = req.body.username
    const firstname = req.body.fName
    const lastname = req.body.lName
    const gender = req.body.gender
    const dateofregistration = req.body.dateofregistration
    const password = req.body.password

    // console.log(Id,username,firstname,lastname,gender)
    const saltRounds = 12;
    const encryptedPwd = bcrypt.hashSync(password, saltRounds);
    //missing code to check if user already exists
    db.query('SELECT * FROM saphroneparticipants WHERE username = ?;', username, function (error, results) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            res.send({
                status: 403,
                msg: 'This username is already in use.'
            })
        } else {
            const sqlInsert = "Insert into saphroneparticipants(employeeId,username,firstName,lastName,gender,password,registrationdate) values(?,?,?,?,?,?,?)"
            db.query(sqlInsert, [employeeId, username, firstname, lastname, gender, encryptedPwd, dateofregistration], (err) => {
                if (err) {
                    console.log(err)
                    res.send({
                        status: 403,
                        msg: "An error occured. Ensure all fields are filled in and try again."
                    });
                } else {
                    res.send({
                        status: 200,
                        msg: "Your registration has been successful. Please login with your credentials."
                    });
                }
            })
        }
    })
}) 
  

//2.login route for all saphrone competition participants
app.post('/saphroneparticipantlogin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query('SELECT * FROM saphroneparticipants WHERE username= ?;', username , (error, results) => {
        //if the query is faulty , throw the error
        if (error) console.log(error);
        //if account exists
        if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (error, response) => {
                    if (error) throw error;
                    if (response) {
                        const token = jwt.sign({
                            employeeId: results[0].employeeId
                        }, 'SECRETKEY', {
                            expiresIn: '1d'
                        }
                        )
                        res.send({
                            status: 200,
                            token:token,
                            employeeId: results[0].employeeId,
                            branch: results[0].branch,
                            userData: results[0]
                        })
                    } else {
                        res.send({
                            status: 403,
                            msg: 'Incorrect credentials.'
                        });
                    }
                })
        } else {
            res.send({
                status: 403,
                msg: 'User doesnot exist.'
            });
        }
    })
})
  

//Complete participant profile
app.post('/completeparticipantprofile', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    const employeeId = req.body.employeeId
    const contact1 = req.body.contact1
    const contact2 = req.body.contact2
    const address = req.body.address
    const branch = req.body.branch 

    if (!req.file) {
        console.log('No image detected')
        return res.status(400).json({ error: 'No file uploaded.' });
    }
  

    const imagePath = path.join('saphrone_participants_profile_pictures_uploads/', req.file.filename)
  
    // Save the image source to the database
    const sqlInsert = "UPDATE saphroneparticipants SET contact1 = ? , contact2 = ?, address = ?, branch = ?, profilepicture = ? WHERE employeeId = ?";
    db.query(sqlInsert, [contact1, contact2, address, branch, imagePath, employeeId], (err) => {
      if (err) {
        console.error('Error saving receipt to the database:', err);
        return res.status(500).json({ msg: 'Error updating your profile' });
      }else{
        res.send({ status: 200, msg: 'Your profile has been successfully updated.' });
      }
    });
  });

  //update participant password
  app.post('/updateparticipantpassword', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        const employeeId = req.body.employeeId
        const oldPwd = req.body.oldPwd
        const newPwd = req.body.newPwd
        

        db.query('SELECT * FROM saphroneparticipants WHERE employeeId = ?', employeeId , (error, results) => {
                if (error) {
                   console.log(error);
                   res.send({status:500, msg: 'User does not exist.'})
                } else if(results.length > 0){
                    bcrypt.compare(oldPwd, results[0].password, (error, response) => {
                        if (error) throw error;
                        if(response){
                            const saltRounds = 12;
                            const encryptedPwd = bcrypt.hashSync(newPwd, saltRounds);
                            const sqlInsert = "UPDATE saphroneparticipants SET password = ? WHERE employeeId = ?";
                            db.query(sqlInsert, [encryptedPwd, employeeId], (err) => {
                            if (err) {
                                console.error('Error:', err);
                                return res.status(500).json({ msg: 'Error while updating your password.' });
                            }else{
                                res.send({ status: 200, msg: 'Your password has been changed.' });
                            }
                            });
                        }
                    })
                }
              });
            }
          })
})


//fetch participant data
app.post('/fetchallparticipants', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        db.query('SELECT * FROM saphroneparticipants',(error, results) => {
                if (error) {
                   console.log(error);
                   res.send({status:500, msg: 'No users found.'})
                } else if(results.length > 0){
                   res.send(results)
                }
              });
            }
          })
})


//fetch paritcipant performance records
app.post('/fetchallparticipantperformancerecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        db.query('SELECT * FROM saphroneparticipantperformance JOIN saphroneparticipants WHERE saphroneparticipantperformance.employeeId = saphroneparticipants.employeeId',(error, results) => {
                if (error) {
                   console.log(error);
                   res.send({status:500, msg: 'No sales records found.'})
                } else if(results.length > 0){
                   res.send(results)
                }
              });
            }
          })
})


//fetch saphrone sales records
app.post('/fetchallsaphronesalesdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
      if (err) {
        res.status(403).send("You are not authorized to perform this action.");
      } else {
        db.query('SELECT * FROM saphroneperformancerecords JOIN saphroneparticipants WHERE saphroneperformancerecords.employeeId = saphroneparticipants.employeeId',(error, results) => {
                if (error) {
                   res.send({status:500, msg: 'No sales records found.'})
                } else if(results.length > 0){
                   res.send(results)
                }
              });
      }
    })
})


app.post('/saveparticipantsale', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const employeeId = req.body.employeeId;
            const date = req.body.date;
            const merchandisesold = req.body.amountsold;
            const points = req.body.points;

            // Insert data into saphroneperformancerecords table
            db.query('INSERT INTO saphroneperformancerecords (employeeId, date, merchandisesold) VALUES (?, ?, ?);', [employeeId, date, merchandisesold], (error) => {
                if (error) {
                    res.status(500).send('Error while saving record.');
                } else {
                    // Check if the employee exists in saphroneparticipantperformance table
                    db.query('SELECT * FROM saphroneparticipantperformance WHERE employeeId = ?;', [employeeId], (selectError, results) => {
                        if (selectError) {
                            res.status(500).send('Error while checking employee existence.')
                        } else {
                            if (results.length > 0) {
                                // Employee exists, update the existing record by adding points
                                const existingQty = results[0].merchandisesold
                                const existingPoints = results[0].points;
                                const newPoints = existingPoints + points;
                                let newQty = 0;
                                if (isNaN(existingQty) || isNaN(merchandisesold)) {
                                } else {
                                     newQty = parseFloat(existingQty) + parseFloat(merchandisesold);
                                }
                                db.query('UPDATE saphroneparticipantperformance SET merchandisesold = ?, points = ? WHERE employeeId = ?;', [newQty, newPoints, employeeId], (updateError) => {
                                    if (updateError) {
                                        res.status(500).send('Error while updating points.');
                                    } else {
                                        res.send({ status: '200', msg: 'success' });
                                    }
                                });
                            } else {
                                // Employee doesn't exist, insert a new record
                                db.query('INSERT INTO saphroneparticipantperformance (employeeId, merchandisesold, points) VALUES (?, ?, ?);', [employeeId, merchandisesold, points], (insertError) => {
                                    if (insertError) {
                                        res.status(500).send('Error while saving record.');
                                    } else {
                                        res.send({ status: '200', msg: 'success' });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

app.post('/deletechequedata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const chequeId = req.body.chequeId

            db.query('DELETE FROM companycheques WHERE chequeId = ?',chequeId, (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('Error')
                }
            })
        }
    })
})

app.post('/updatechequedata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const chequeId = req.body.chequeId
            const newNames = req.body.drawerNames
            const newContact = req.body.drawerContact
            const newBankName = req.body.bankName
            const newChequeNumber = req.body.chequeNumber
            const newReason = req.body.reason
            const newAmount = req.body.amount
            const newNotes = req.body.notes
            const newBankingDate = req.body.bankingDate

            db.query('UPDATE companycheques SET chequeNumber = ?, DrawerNames = ?, BankName = ?, PaymentReason = ?, amount = ?, BankingDate = ?, Notes = ? WHERE chequeId = ?',[newChequeNumber, newNames, newContact, newBankName, newReason, newAmount, newBankingDate, newNotes, chequeId], (error) => {
                if (error){
                    console.error('Error updating data:', error);
                    res.status(500).send({ status: 500, msg: "An error occurred while updating data" });
                } else{
                    console.log('success')
                    res.send({status: 200, msg:"Cheque Data has been successfully updated"})
                }
            })
        }
    })
})

//Buwama Routes
//route to save batch fcr record
app.post('/buwamasavebatchfcrvalue', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const totalFeedsConsumed = req.body.totalFeedsConsumed
            const totalEggsProduced = req.body.totalEggsProduced
            const fcrValue = req.body.fcrValue
            const notes = req.body.notes

            db.query('INSERT INTO buwamalivestockbatchfcrrecords (batchnumber, totalfeedsconsumed, totaleggsproduced, fcrvalue, notes) VALUES (?, ?, ?, ?, ?)', [batchNo, totalFeedsConsumed, totalEggsProduced, fcrValue, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE buwamachickenfarmbatches SET status = ? WHERE batchnumber = ?', ['completed', batchNo], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


//7. View all egg production records
app.post('/buwamafetchalleggproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	buwamaeggproductionrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. View all batch feeding records
app.post('/buwamafetchallfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM buwamabatchfeedingrecords JOIN masanafuchickenfeeds ON buwamabatchfeedingrecords.feedsid = masanafuchickenfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//////////////////////////////////LIVESTOCK///////////////////////////////////////////////////////////
//route to save new masanafu chicken batches
app.post('/buwamasavenewlivestockbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const animalName = req.body.animalName
            const quantity = req.body.quantity
            const unitPrice = req.body.unitPrice
            const totalSpent = req.body.totalSpent
            const notes = req.body.notes

            db.query('INSERT INTO buwamalivestockfarmbatches (batchnumber, date, animalName, numberofanimals, unitprice, totalspent, notes, animalsalive) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [batchNo, date, animalName, quantity, unitPrice, totalSpent, notes, quantity], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
            })
        }
    })
})


app.post('/buwamasavelivestockdeaths', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const quantity = req.body.quantity
            const notes = req.body.notes
            db.query('INSERT INTO buwamalivestockbatchmortalities (date, batchnumber, numberofanimalsdead,  notes) VALUES (?, ?, ?, ?);', [date, batchNo, quantity, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('SELECT animalsalive, animalsdead FROM buwamalivestockfarmbatches WHERE batchnumber = ?', [batchNo], (error, results) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }

                        if(results.length > 0){
                            let newChickenAlive = results[0].animalsalive-quantity
                            let newChickenDead = parseInt(results[0].animalsdead)+parseInt(quantity)
                            db.query('UPDATE buwamalivestockfarmbatches SET animalsalive = ? , animalsdead = ? WHERE batchnumber = ?', [newChickenAlive, newChickenDead, batchNo], (error) => {
                                //if the query is faulty , throw the error
                                if (error) {
                                    console.log(error);
                                }else{
                                    
                                    res.send({
                                        status: 200,
                                        msg: 'success'                               
                                    })
                                }
                                
                            })
                        }else{
                            res.send('No record Found')
                        }
                        
                    })
                }
                
            })
        }
    })
})


app.post('/buwamasavelivestockbatchmilkproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const totalEggsCollected = req.body.totalEggsCollected
            const totalGoodEggsCollected = req.body.totalGoodEggsCollected
            const totalDamagedEggsCollected = req.body.totalDamagedEggsCollected
            const notes = req.body.notes

            db.query('INSERT INTO buwamalivestockmilkproductionrecords (batchnumber, collectiondate, totalLitrescollected, exactlitrescollected, totalLitresLost, notes) VALUES (?, ?, ?, ?, ?, ?)', [batchNo, date, totalEggsCollected, totalGoodEggsCollected, totalDamagedEggsCollected, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})



app.post('/buwamafetchbatchallmilkproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	buwamalivestockmilkproductionrecords WHERE batchnumber = ?', [batchnumber] , (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


app.post('/buwamafetchallmilkproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                //const batchnumber = req.body.batchNumber
                db.query('SELECT * FROM	buwamalivestockmilkproductionrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})


//7. View all chicken health records
app.post('/buwamafetchalllivestockhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {             
                    db.query('SELECT * FROM buwamalivestockbatchhealth JOIN buwamalivestockmedicine ON buwamalivestockbatchhealth.medicinename = buwamalivestockmedicine.productId', (error, results) => {
                        if (error) throw (error);
                        if (results.length > 0) {
                            res.send(results)
                        } else {
                            res.send(`There are no records found.`)
                        }
                    })
        }
    })
})

app.post('/buwamafetchlivestockbatchhealthrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {   
                const batchNo = req.body.batchNo          
                    db.query('SELECT * FROM buwamalivestockbatchhealth JOIN buwamaitems ON buwamalivestockbatchhealth.medicinename = buwamaitems.productId WHERE buwamalivestockbatchhealth.batchnumber = ?',[batchNo] , (error, results) => {
                        if (error) throw (error);
                        if (results.length > 0) {
                            res.send(results)
                        } else {
                            res.send(`There are no records found.`)
                        }
                    })
        }
    })
})




app.post('/buwamafetchalllivestockbatchfcrdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM	buwamalivestockbatchfcrrecords', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        console.log(results)
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//route to fetch all chicken medicine from db
app.post('/fetchallbuwamalivestockmedicines', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const med = "MEDICINE"
            db.query('SELECT * FROM buwamaitems WHERE category = ?', [med], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})

//route to fetch all chicken feeds from db
app.post('/buwamafetchalllivestockfeeds', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM buwamalivestockfeeds', (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('No data found.')
                }
            })
        }
    })
})

//7. View all egg production records
app.post('/buwamafetchalllivestockbatchdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM	 buwamalivestockfarmbatches', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})

//7. View all batch feeding records
app.post('/buwamafetchalllivestockfeedingrecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
                db.query('SELECT * FROM buwamalivestockbatchfeedingrecords JOIN buwamalivestockfeeds ON buwamalivestockbatchfeedingrecords.feedsid = buwamalivestockfeeds.productId', (error, results) => {
                    if (error) throw (error);

                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send(`There are no records found.`)
                    }
                })
        }
    })
})

//7. Register Items
app.post('/buwamaregisteritem', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const category = req.body.category
            const name = req.body.name
            const unitPrice = req.body.unitPrice

            db.query('INSERT INTO buwamaitems (category, name, unitPrice) VALUES (?, ?, ?)', [category, name, unitPrice], (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})

//7. View all egg production records
app.post('/buwamafetchallitems', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM	 buwamaitems', (error, results) => {
                if (error) throw (error);

                
                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})


//buwama gs restock form
app.post('/buwamasavegeneralstorerestockdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const itemCategory = req.body.category
            const date = req.body.date
            let itemid = req.body.itemid
            let quantity = req.body.quantity
            let units = req.body.unit
            let source = req.body.source
            let externalSourceDetails = req.body.externalSourceDetails
            let notes = req.body.notes
         let category = req.body.recordCategory

            db.query('INSERT INTO buwamageneralstoreinventoryrecords (date, recordcategory, itemcategory, itemid, quantityin, munits, restocksource, externalsourcedetails, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [date, category, itemCategory, itemid, quantity, units, source, externalSourceDetails, notes], error => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                    res.send('Error')
                } else {
                    res.send('success')
                    if(category === 'outgoing'){
                        db.query('SELECT * FROM buwamaGeneralStoreInventory WHERE productId = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                res.send('This item is not in stock')
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) - parseFloat(quantity);
                                const sqlStockCount = "UPDATE  buwamaGeneralStoreInventory SET quantityinstock = ? WHERE productId = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                        res.send('success')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }else{
                        db.query('SELECT * FROM buwamaGeneralStoreInventory WHERE productId = ?;', [itemid], function (err, results) {
                            // If there is an issue with the query, output the error
                            if (err) throw err;
                            // If the account exists
                            if (results.length === 0) {
                                const sqlStockCount = "Insert into buwamaGeneralStoreInventory (productId,category,quantityinstock,munits) values(?,?,?,?)"
                                db.query(sqlStockCount, [itemid, itemCategory, quantity, units], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                    }
                                })
                            } else if (results.length > 0) {
                                let newStockCount = parseFloat(results[0].quantityinstock) + parseFloat(quantity);
                                const sqlStockCount = "UPDATE buwamaGeneralStoreInventory SET quantityinstock = ? WHERE productId = ?"
                                db.query(sqlStockCount, [newStockCount, itemid], (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('item quantity in stock has been updated successfully')
                                        res.send('success')
                                    }
                                })
                            } else {
                                console.log("Error while increasing the item quantity in stock.")
                            }
                        })
                    }
                }
            })

        }
    })
})

app.post('/fetchbuwamageneralstorerecords', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM	 buwamageneralstoreinventoryrecords JOIN buwamaitems ON buwamageneralstoreinventoryrecords.itemid = buwamaitems.productId', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})

app.post('/fetchbuwamastoredata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM	 buwamaGeneralStoreInventory JOIN buwamaitems ON buwamaGeneralStoreInventory.productId = buwamaitems.productId', (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})



app.post('/buwamasavelivestockbatchmmanureproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const date = req.body.date
            const totalManureCollected = req.body.totalManureCollected
            const notes = req.body.notes

            db.query('INSERT INTO buwamalivestockmanureproductionrecords (batchnumber, collectiondate, totalManurecollected, notes) VALUES (?, ?, ?, ?)', [batchNo, date, totalManureCollected, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    res.send({
                        status: 200,
                        msg: 'success'                               
                    })
                }
                
            })
        }
    })
})

//7. View all egg production records
app.post('/buwamafetchbatchallmanureproduction', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNumber = req.body.batchNumber
            db.query('SELECT * FROM	 buwamalivestockmanureproductionrecords WHERE batchnumber = ?',batchNumber,  (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send(`There are no records found.`)
                }
            })
        }
    })
})


//route to save masanafu shop expenditures
app.post('/savemasanafuchickenfarmexpense', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const date = req.body.expenditureDate
            const expenditureName = req.body.expenditureName
            const desc = req.body.expenditureDesc
            const cost = req.body.expenditureTotalCost
            const createdat = new Date()

            db.query('INSERT INTO masanafuchickenfarmexpenditure (date, expenditurename, expendituredescription, expenditurecost, createdat) VALUES( ?, ?, ?, ?, ? )', [ date, expenditureName, desc, cost, createdat], (error) => {
                if (error){
                    console.log(error)
                }else{
                    res.send('success')
                }
            })
        }
    })
})


app.post('/fetchmasanafuchickenfarmexpenses', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            db.query('SELECT * FROM masanafuchickenfarmexpenditure', (error, result) => {
                if (error){
                    console.log(error)
                }else{
                    res.send(result)
                }
            })
        }
    })
})


app.post('/buwamasavelivestockhealthrecord', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const batchNo = req.body.batchNumber
            const reason = req.body.reason
            const tdate = req.body.date
            const nextDateOfAdministration =  req.body.nextDateOfAdministration
            const medicineId = req.body.medicineId
            const drugAmount = req.body.medicineQuantity
            const diseaseName = req.body.diseaseName
            const notes = req.body.notes
            db.query('INSERT INTO buwamalivestockbatchhealth (batchnumber, reason, treatmentdate, nextdateofadministration, medicinename, medicinequantityused, diseasename, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [batchNo, reason, tdate, nextDateOfAdministration, medicineId, drugAmount, diseaseName, notes], (error) => {
                //if the query is faulty , throw the error
                if (error) {
                    console.log(error);
                }else{
                    db.query('UPDATE buwamaGeneralStoreInventory SET quantityinstock = quantityinstock - ? WHERE productId = ?', [drugAmount, medicineId], (error) => {
                        //if the query is faulty , throw the error
                        if (error) {
                            console.log(error);
                        }else{ 
                            res.send({
                                status: 200,
                                msg: 'success'                               
                            })
                        }
                        
                    })
                }
                
            })
        }
    })
})


app.post('/deleteshopitemdata', (req, res) => {
    jwt.verify(req.body.token, 'SECRETKEY', (err) => {
        if (err) {
            res.status(403).send("You are not authorized to perform this action.");
        } else {
            const itemId = req.body.productId

            db.query('DELETE FROM shopProducts WHERE productId = ?',itemId, (error, results) => {
                if (error) throw (error);

                if (results.length > 0) {
                    res.send(results)
                } else {
                    res.send('Error')
                }
            })
        }
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
