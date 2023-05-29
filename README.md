### ======== Web-Squelizer Api (1.0) ====




`Baixar o Web-Squelizer-api.js`
````html
    <a href="./dir/Web-Squelizer-api.js" download> Baixar o Web-Squelizer-api.js versão 1.0 </a>
````

### `Description`
### Web-Squelizer: 
É uma API de conexão para `Banco de dados Web sql Locais` Nos navegadores.
Ou seja, permite conectar e salvar dados local no Web Sql 
Este Api permite `Criar e manipular os dados de forma fácil`, facilitando assim o tempo de codificação...

`Web-Squelizer` é suportado apenas em navegadores recentes, como `Microsoft Edge Chrome, opera, opera min, Mozilla Firefox` no 
`Windows, Maccos ou Linux`, e também em plataformas `mobiles` incluindo o `Phoenix e outros`

### ========== `USO` ===========

````js
const Websql = new WebSquelizer("Shops", (e)=>{ console.log(e)})
````
`Types é retorna os tipos de dado usados para criação`
````js
const Types = Websql.Types()
````
`Usando as opção do WebSquelizer para execução`
````js
const Op = Websql.OP()
````

````m
*   Criando A primeira tabela de produtos!
*   Para criar a uma table ou executar comandos sqlite usa a função Schema()
*   E adiciona o nome da tabela e o segundo parámetro querer um objectos ou seja colunas.
*   Este método ele criar o id como primary key
*
````
````js
const produtos = Websql.Schema("produtos",{
    name: Types.TEXT,
    preco: Types.TEXT,
    date: Types.TEXT
})
````
````m
*   Agora inserir os dados, Para inserir os dados chamamos a função Create() com os dados
*   Vamos usar a const produtos para podemos manipular a tabela produtos.
*   Esta const produtos ele carrega todas as funções, por isso vamos usar ele
````
## Create
````js
let data = {
    name: "Abacates",
    preco: "200,00kz",
    date: new Date()
}
// Criando ou inserindo dados...
produtos.create(data)

````

````m
*   Selecionando os elementos no banco de dados
*   Para selecionamos os dados usa a função findAll() É uma retorna os dados.
*   Nesta função poderás executar diferentes comandos do mysql
*
````
##  Usando ORDER BY findAll() Exemplo
````js
produtos.findAll({[Op.ORDERBY]: "id DESC"},(datas)=>{ 
    // esta função de callback retorna dados em um objecto ou um array
    console.log(datas)
    // desfazer o array usando o map()
    //datas.map((data)=>( console.log(data) ))
    // desfando usando for()
    for(let i=0; i < datas.length; i++){
        //console.log(datas[i])
        // para obter o valor da coluna 
        //console.log(datas[i].id)
    }
})
````
##   Usando where no findAll() Exemplo
````js
produtos.findAll({WHERE:{id: 1}},(datas)=>{ 
    // esta função de callback retorna dados em um objecto ou um array
    //console.log(datas)
    // desfazer o array usando o map()
    //datas.map((data)=>( console.log(data) ))
    // desfando usando for()
    for(let i=0; i < datas.length; i++){
        //console.log(datas[i])
        // para obter o valor da coluna 
        //console.log(datas[i].id)
    }
})
````
##  Usando ORDER BY findAll() Exemplo

````js
produtos.findAll({WHERE:{name:{[Op.LIKE]: "%AN%"}, [Op.ORDERBY]: {id: "DESC"} }},(datas)=>{ 
    // esta função de callback retorna dados em um objecto ou um array
    //console.log(datas)
    // desfazer o array usando o map()
    //datas.map((data)=>( console.log(data) ))
    // desfando usando for()
    for(let i=0; i < datas.length; i++){
        //console.log(datas[i])
        // para obter o valor da coluna 
        //console.log(datas[i].id)
    }
})
````
###  Usando where e AND no findAll() Exemplo
````js
produtos.findAll({WHERE:{id: 1}, [Op.AND]: {preco: "500,00kz"}, [Op.OR]: {name: "Bananas"}},(datas)=>{ 
    // esta função de callback retorna dados em um objecto ou um array
    //console.log(datas)
    // desfazer o array usando o map()
    //datas.map((data)=>( console.log(data) ))
    // desfando usando for()
    for(let i=0; i < datas.length; i++){
        //console.log(datas[i])
        // para obter o valor da coluna 
        //console.log(datas[i].id)
    }
})
````

###  Delete() ou deleteOne() Exemplo
````js
produtos.deleteOne({WHERE: {id: 1}}, (e)=>{ console.log(e)})

````
###  update()
````js
produtos.update({[Op.SET]: {name: "Bananas", preco: "500,00kz"}, WHERE:{id: 2} }, ()=>{})
````


# Contacta-me
Email: ([lucasveraz102000@gmail.com])
Facebook: [https://facebook.com/lveraz1]
Telegram: [https://t.me/muana_mayele]
WhatsApp: [https://wa.me/message/QVIXX2HAA2EQL1]
GitHub: [https://github.com/lukas102000?tab=repositories]
Linkedin: [https://www.linkedin.com/in/lucas-veraz-382185185]