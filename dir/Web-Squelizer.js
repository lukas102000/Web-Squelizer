class WebSqlite {
    constructor (_databaseName){
        this.storage = window.openDatabase(_databaseName, "1.0", "com.lucas_veraz", 32*7588*7588)
    }
    /*
     *   Create the new table names and comluns
    */
    Schema = (_tableName, _objects)=>{
        if(_tableName === undefined){ console.log("error name of table is undefined")}
        else if(typeof(_objects) === "object"){
            let query = ""
            for(let i=0; i < Object.keys(_objects).length; i++){
                query += `${Object.keys(_objects)[i]} ${Object.values(_objects)[i]}, `
            }
            let createTable = query.slice(0, query.length - 2)
            this.storage.transaction((ex)=>{
                ex.executeSql(`CREATE TABLE IF NOT EXISTS ${_tableName} (id INTEGER PRIMARY KEY, ${createTable})`)
                console.log(`CREATE TABLE IF NOT EXISTS ${_tableName} (id INTEGER PRIMARY KEY, ${createTable})`)
            })            
        } else{ console.log("Error line 7, only accepte objects type {}")}
        /*
        *   Create new elemnets
        */
        const create = (items)=>{
            if(typeof(items) === "object"){
                let values = ""
                let keys = ""
                for(let i=0; i < Object.keys(items).length; i++){
                    values += `'${Object.values(items)[i]}', `
                    keys += `${Object.keys(items)[i]}, `
                }
                this.storage.transaction((ex)=>{
                    let query = `INSERT INTO ${_tableName} (${keys.slice(0, keys.length - 2)}) VALUES(${values.slice(0, values.length - 2)})`
                    ex.executeSql(query)
                    console.log(query)
                })
            } else{ console.log("Error line 24, only accepte objects type {}")}
        }   
        /*
        *   DROP THIS TABLES
        */
        const findAll = (args, callback)=>{
            
            if( args === ""){
                
                this.storage.transaction((ex)=>{
                    ex.executeSql(`SELECT * FROM ${_tableName} ORDER BY id`,[], results)
                })
                
                const results = (err, result)=>{
                    let res = []
                    for(let i=0; i <result.rows.length; i++){
                       res.push(result.rows[i])
                    }
                    if(typeof(callback) === "function"){
                        callback(res)
                    }
                }
            }else{
                if(typeof(args) === "object"){
                    console.log(args)
                    let query = ""
                    let exe = ""
                    let order_by = ""
                    for(let i= 0; i < Object.keys(args).length; i++){
                        
                        if(Object.keys(args)[i] === "ORDER BY"){
                            order_by = `${Object.keys(args)[i]} ${Object.values(args)[i]}`
                        } 
                        else if(Object.keys(args)[i] === "WHERE"){
                            let key_man = Object.keys(args)[i]
                            let key_sub = Object.values(args)[i]
                            
                            for(let x=0; x < Object.keys(key_sub).length; x++){
                                exe = `${key_man}`
                                
                                if(typeof(Object.values(key_sub)[x]) === "object"){
                                    let keys_sub2 = Object.values(key_sub)[x]
                                    
                                    for(let y =0; y < Object.values(keys_sub2).length; y++){
                                        query += `${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} '${Object.values(keys_sub2)[y]}'''`
                                    }
                                    
                                }
                                else{
                                    query += `${Object.keys(key_sub)[x]} = '${Object.values(key_sub)[x]}', `
                                }                                
                            }
                        }
                       
                    }
                    let queryWhere1 = `${exe} ${query.slice(0, query.length -2)} ${order_by}`

                    console.log(`${exe} ${query.slice(0, query.length -2)} ${order_by}`)

                    this.storage.transaction((ex)=>{
                        ex.executeSql(`SELECT * FROM ${_tableName} ${queryWhere1}`,[], results)
                    })
                    const results = (err, result)=>{
                        let res = []
                        for(let i=0; i <result.rows.length; i++){
                           res.push(result.rows[i])
                        }
                        if(typeof(callback) === "function"){
                            callback(res)
                        }
                    }
                    
                }
            }
            
            
        }
        /*
        *   Delete item 
        */
        const deleteOne = ()=>{

        }
        /*
        *  Update from item 
        */
        const update = ()=>{

        }
        /*
        *   DROP THIS TABLES
        */

        const drop = ()=>{
            this.storage.transaction((ex)=>{
                let query = `drop TABLE ${_tableName}`
                ex.executeSql(query)
            })
        }

         /*
        *  Manual query
        */
       const query = (args, callback)=>{
            this.storage.transaction((ex)=>{
                ex.executeSql(args,[], then)
            })
            const then = (err, result)=>{
                let res = []
                for(let i=0; i <result.rows.length; i++){
                   res.push(result.rows[i])
                }
                if(typeof(callback) === "function"){
                    callback(res)
                }
            }
       }

        return { 
            create, 
            drop,
            findAll,
            query,
            deleteOne,
            update,
            _tableName, 
            _objects}

    }
    /*
    *   SHOWS ALL TABLES
    */

    /*
    *   Types elements to create tables
    */
    Types = ()=>{
        const TEXT = "TEXT"
        const NUMBER = "INTEGER"
        const STRING = "CHAR"
        const BLOB = "BLOB"

        return { TEXT, NUMBER,STRING, BLOB}
    }
    OP = ()=>{
        const LIKE = "LIKE"
        const ORDERBY= "ORDER BY"
        return {LIKE, ORDERBY}
    }
    
}

// user methods 
const sqlite = new WebSqlite ("MyDb")
const Types = sqlite.Types()
const Op = sqlite.OP()

const users = sqlite.Schema("users", {
    name: Types.TEXT,
    email: Types.TEXT,
    number: Types.NUMBER,
    password: Types.TEXT
})
//users.DROP()

let data = { 
    name: "admin",
    email: "admin@gmail.com",
    number: "945197584",
    password: "1234"
}

users.findAll({
    WHERE: {name: {[Op.LIKE]: "luca%"}}
}, (datas)=>{ console.log(datas)})


//users.create(data)