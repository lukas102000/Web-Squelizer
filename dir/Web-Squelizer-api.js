class WebSquelizer {
    constructor (_databaseName, callback){
        this.storage = window.openDatabase(_databaseName, "1.0", "com.lucas_veraz", 32*7588*7588)
        if(_databaseName === "" || _databaseName === " " || _databaseName === "  "){
            callback("Name is not calable for types")
        } else{
            if(typeof(callback) === "function"){
                if(this.storage){
                    callback("Database conected...")
                }
                
            }
        }
        
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
                    let query = ""
                    let exe = ""
                    let order_by = ""
                    let ands= ""
                    let like2 =""
                    for(let i= 0; i < Object.keys(args).length; i++){
                        if(Object.keys(args)[i] === "ORDER BY"){
                            order_by = `${Object.keys(args)[i]} ${Object.values(args)[i]}`
                        } 
                        else if(Object.keys(args)[i] === "WHERE" || Object.keys(args)[i] === "AND" || Object.keys(args)[i] === "OR" ){
                            let key_man = Object.keys(args)[i]
                            let key_sub = Object.values(args)[i]
                            
                            for(let x=0; x < Object.keys(key_sub).length; x++){
                                let key_man = Object.keys(args)[i]
                                let key_sub2 = Object.keys(key_sub)[0]
                                if( typeof(Object.values(key_sub)[0]) === "object"){
                                    let keys_sub2 = Object.values(key_sub)[x]

                                    let like = Object.values(key_sub)[x]
                                    
                                    for(let z = 0; z < Object.values(key_sub).length; z++){
                                        //console.log(Object.keys(key_sub)[z])
                                        if(typeof(Object.values(key_sub)[z]) === "object"){
                                            let chose = Object.values(key_sub)[z]
                                            if(Object.keys(key_sub)[z] === "ORDER BY"){
                                                like2 = `${Object.keys(key_sub)[z]} ${Object.keys(chose)[0]} ${Object.values(chose)[0]}`
                                            }
                                            
                                        }
                                       

                                        //like2 += `${key_man} ${Object.keys(key_sub)[z]} ${Object.values(key_sub)[z]} `

                                    }

                                    if(Object.keys(like)[x] === "LIKE" || Object.keys(like)[x] === "ORDER BY"){
                                        for(let y =0; y < Object.values(keys_sub2).length; y++){
                                                query += `${key_man} ${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} '${Object.values(keys_sub2)[y]}' ${like2} ''`
                                                //console.log(`${key_man} ${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} '${Object.values(keys_sub2)[y]}'`)
                                        }

                                    }
                                }
                                else{
                                    if(key_man === "WHERE" || key_man === "AND" ||  key_man === "OR" ){
                                            query += `${key_man} ${ Object.keys(key_sub)[0]} = '${ Object.values(key_sub)[0]}'  `
                                    }
                                }                     
                            }
                        }
                       
                    }
                    let queryWhere1 = `${exe} ${query.slice(0, query.length -2)} ${ands} ${order_by}`
                    //console.log(like2)
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
        const deleteOne = (args, callback)=>{
            if( args === ""){
                let res = "Error line 119, only accepte objects type {}"
                if(typeof(callback) === "function"){
                    callback(res)
                }
            }else{
                if(typeof(args) === "object"){
                    let query = ""
                    let exe = ""
                    let order_by = ""
                    let ands= ""
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
                                    
                                    if(Object.keys(key_sub)[x] === "AND" || Object.keys(key_sub)[x] === "OR"){
                                        for(let y =0; y < Object.values(keys_sub2).length; y++){
                                            ands += `${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} = '${Object.values(keys_sub2)[y]}'` 
                                        }
                                    }
                                    else if(Object.keys(key_sub)[x] === "LIKE"){
                                        for(let y =0; y < Object.values(keys_sub2).length; y++){
                                            query += `${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} '${Object.values(keys_sub2)[y]}''`
                                        }
                                    }
                                }
                                else{
                                    query += `${Object.keys(key_sub)[x]} = '${Object.values(key_sub)[x]}', `
                                }                                
                            }
                        }
                       
                    }
                    let queryWhere1 = `${exe} ${query.slice(0, query.length -2)} ${ands} ${order_by}`
                    //console.log(queryWhere1)
                    this.storage.transaction((ex)=>{
                        ex.executeSql(`DELETE FROM ${_tableName} ${queryWhere1}`,[], results)
                    })
                    const results = (err, result)=>{
                        
                    }
                    
                }
            }
        }
        /*
        *  Update from item 
        */
        const update = (args, callback)=>{
            if( args === ""){
                let res = "Error line 119, only accepte objects type {}"
                if(typeof(callback) === "function"){
                    callback(res)
                }
            }else{
                if(typeof(args) === "object"){
                    let query = ""
                    let exe = ""
                    let exe2 = ""
                    let order_by = ""
                    let ands= ""
                    let set = ""
                    for(let i= 0; i < Object.keys(args).length; i++){
                        
                        if(Object.keys(args)[i] === "ORDER BY"){
                            order_by = `${Object.keys(args)[i]} ${Object.values(args)[i]}`
                        } 
                        else if(Object.keys(args)[i] === "SET"){
                            let key_man = Object.keys(args)[i]
                            let key_sub = Object.values(args)[i]
                            
                            for(let x=0; x < Object.keys(key_sub).length; x++){
                                exe = `${key_man}`
                                
                                set += `${Object.keys(key_sub)[x]} = '${Object.values(key_sub)[x]}', `                                
                            }
                        }
                        else if(Object.keys(args)[i] === "WHERE"){
                            let key_man = Object.keys(args)[i]
                            let key_sub = Object.values(args)[i]
                            for(let x=0; x < Object.keys(key_sub).length; x++){
                                exe2 = `${key_man}`
                                
                                if(typeof(Object.values(key_sub)[x]) === "object"){
                                    let keys_sub2 = Object.values(key_sub)[x]
                                    
                                    if(Object.keys(key_sub)[x] === "AND" || Object.keys(key_sub)[x] === "OR"){
                                        for(let y =0; y < Object.values(keys_sub2).length; y++){
                                            ands += `${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} = '${Object.values(keys_sub2)[y]}'` 
                                        }
                                    }
                                    else if(Object.keys(key_sub)[x] === "LIKE"){
                                        for(let y =0; y < Object.values(keys_sub2).length; y++){
                                            query += `${Object.keys(key_sub)[x]} ${Object.keys(keys_sub2)[y]} '${Object.values(keys_sub2)[y]}''`
                                        }
                                    }
                                }
                                else{
                                    query += `${Object.keys(key_sub)[x]} = '${Object.values(key_sub)[x]}', `
                                }                                
                            }
                        }
                       
                    }
                    let queryWhere1 = `${exe} ${set.slice(0, set.length -2)} ${exe2} ${query.slice(0, query.length -2)} ${ands}`
                    console.log(`UPDATE ${_tableName} ${queryWhere1}`)
                    this.storage.transaction((ex)=>{
                        ex.executeSql(`UPDATE ${_tableName} ${queryWhere1}`,[], results)
                    })
                    
                    const results = (err, result)=>{
                        let res = "Object updated..."
                        if(typeof(callback) === "function"){
                            callback(res)
                        }
                    }
                    
                }
            }
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
        const OR = "OR"
        const SET = "SET"
        const AND = "AND"
        const WHERE = "WHERE"
        return {LIKE, ORDERBY,OR, AND, SET, WHERE}
    }
    
}