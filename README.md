# ======== Web-Squelizer Api (1.0) ====

### `Download project master`
(https://github.com/lukas102000/Web-Squelizer/archive/refs/heads/master.zip)
### Use in HTLM
Use online in html
````m
    <script src="https://github.com/lukas102000/Web-Squelizer/blob/master/dir/Web-Squelizer-api.js"> </script>
````
Get from dir
````m
    <script src="./Web-Squelizer/dir/Web-Squelizer-api.js"> </script>
````

### `Description`
### Web-Squelizer: 
It is a connection API for `Local SQL Web Databases` in browsers.
That is, it allows you to connect and save local data in Web Sql
This API allows `Easily create and manipulate data`, thus facilitating coding time...

`Web-Squelizer` is only supported on recent browsers such as `Microsoft Edge Chrome, opera, opera min, Mozilla Firefox` on
`Windows, Maccos or Linux`, and also on `mobile` platforms including `Phoenix and others`

### ========== `USE` ===========
## Initializing WebSquelizer() method
````m
* The new WebSquelizer() method
* used to initialize a new database
* after it has two parameters: name and callback function(e).
* When initializing give a name to the new database, check that the name is not the same as the others...
````
````js
const Websql = new WebSquelizer("Shops", (e)=>{ console.log(e)})
````
`Types is returns the data types used for creation`
````js
const Types = Websql.Types()
````
`Using WebSquelizer options for execution`
````js
const Op = Websql.OP()
````
## Schema
````m
* Creating The First Product Table!
* To create a table or execute sqlite commands use the Schema() function
* And add the name of the table and the second parameter to want an object ie columns.
* This method creates id as primary key
*
````
````js
const products = Websql.Schema("products",{
     name: Types.TEXT,
     price: Types.TEXT,
     date: Types.TEXT
})
````
## Create
````m
* Now insert the data, To insert the data we call the Create() function with the data
* Let's use the products const so we can manipulate the products table.
* This const products it carries all functions, so let's use it
````
````js
let date = {
     name: "Avocados",
     price: "200.00kz",
     date: newDate()
}
// Creating or inserting data...
products.create(date)

````
## Using findAll() Example
````m
* Selecting the elements in the database
* To select the data use the function findAll() It returns the data.
* In this function you can execute different mysql commands
*
````
## Using ORDER BY findAll() Example
````js
products.findAll({[Op.ORDERBY]: "id DESC"},(dates)=>{
     // this callback function returns data in an object or an array
     console.log(dates)
     // undo the array using map()
     //datas.map((data)=>( console.log(data) ))
     // undo using for()
     for(let i=0; i < data.length; i++){
         //console.log(dates[i])
         // to get the column value
         //console.log(data[i].id)
     }
})
````
## Using where in findAll() Example
````js
products.findAll({WHERE:{id: 1}},(dates)=>{
     // this callback function returns data in an object or an array
     //console.log(dates)
     // undo the array using map()
     //datas.map((data)=>( console.log(data) ))
     // undo using for()
     for(let i=0; i < data.length; i++){
         //console.log(dates[i])
         // to get the column value
         //console.log(data[i].id)
     }
})
````
## Using ORDER BY findAll() Example

````js
products.findAll({WHERE:{name:{[Op.LIKE]: "%AN%"}, [Op.ORDERBY]: {id: "DESC"} }},(dates)=>{
     // this callback function returns data in an object or an array
     //console.log(dates)
     // undo the array using map()
     //datas.map((data)=>( console.log(data) ))
     // undo using for()
     for(let i=0; i < data.length; i++){
         //console.log(dates[i])
         // to get the column value
         //console.log(data[i].id)
     }
})
````
### Using where and AND in findAll() Example
````js
products.findAll({WHERE:{id: 1}, [Op.AND]: {price: "500.00kz"}, [Op.OR]: {name: "Bananas"}},(dates)=>{
     // this callback function returns data in an object or an array
     //console.log(dates)
     // undo the array using map()
     //datas.map((data)=>( console.log(data) ))
     // undo using for()
     for(let i=0; i < data.length; i++){
         //console.log(dates[i])
         // to get the column value
         //console.log(data[i].id)
     }
})
````

### Delete() or deleteOne() Example
````js
products.deleteOne({WHERE: {id: 1}}, (e)=>{ console.log(e)})

````
### update()
````js
products.update({[Op.SET]: {name: "Bananas", price: "500.00kz"}, WHERE:{id: 2} }, ()=>{})
````
### DROP Tbale
````js
produtos.drop()
````
### Query()
````m
*   Query() is a function to execute mysql command in string,
*   and, has the callback function to get datas.
````
````js
produtos.query("SELECT * FROM produtos", (data)=>{
    console.log(data)
})
````





# Contacta-me
Email: ([lucasveraz102000@gmail.com])
Facebook: [https://facebook.com/lveraz1]
Telegram: [https://t.me/muana_mayele]
WhatsApp: [https://wa.me/message/QVIXX2HAA2EQL1]
GitHub: [https://github.com/lukas102000?tab=repositories]
Linkedin: [https://www.linkedin.com/in/lucas-veraz-382185185]