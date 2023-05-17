

let titile = document . getElementById("title");
let price = document . getElementById("price");
let taxes = document . getElementById("taxes");
let ads = document . getElementById("ads");
let discount = document . getElementById("discount");
let total = document . getElementById("total");
let count = document . getElementById("count");
let category = document . getElementById("category");
let submit = document . getElementById("submit");
let mood ="create";
let tmp;



function getTotal(){
    if(price.value != ""){
        let result=(+price.value + +taxes.value + +ads.value) 
        - +discount.value
        total.innerHTML=result
        total.style.background ="#040";
    } else{
        total.innerHTML="";
        total.style.background ="rgb(31, 31, 34)";
    }
}
let datapro;

if(localStorage.product !=null){
    datapro= JSON.parse(localStorage.product) 
}
else{
    datapro = [];
}

submit.onclick= function(){
    let newpro= {
    titile:titile.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category: category.value.toLowerCase(),
    
}
if(titile.value !=""&&price.value!=""&&newpro.count< 100&&category.value!=""){
  if(mood==="create"){
  if(newpro.count > 1){
    for(let i = 0; i < newpro.count;i++){
        datapro.push(newpro);  
    }
}else{
    datapro.push(newpro); 
}
}else{
    datapro [tmp]=newpro;
    mood ="create"
    submit.innerHTML="create";
    count.style.display="blok";
}

localStorage.setItem("product",  JSON.stringify(datapro))

clearData()
showData()

}
}


function clearData(){
    titile.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value ="";
    total.innerHTML ="";
    count.value ="";
    category.value ="";
}


function showData()
{
    getTotal()
    let table ="";
    for (let i= 0;i < datapro.length ;i++ ){

        table +=`
        
        <tr>
        <td>${1+i}</th>
        <td>${datapro[i].titile}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
}
document.getElementById("tbody").innerHTML= table;
let btnDelete= document.getElementById("deletAll");

if(datapro.length > 0){
btnDelete.innerHTML=`
<button onclick="deleteAll()"> Delete All (${datapro.length})</button>
`
}
else{
    btnDelete.innerHTML="";
}
}
showData()



function deleteData(i){
   datapro.splice(i,1)
   localStorage.product=JSON.stringify(datapro);
   showData()
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}


    
function updateData(i){
        
        titile.value= datapro[i].titile;
        price.value= datapro[i].price;
        taxes.value= datapro[i].taxes;
        ads.value= datapro[i].ads;
        discount.value= datapro[i].discount;
        getTotal()
        count.style.display="none";
        category.value=datapro[i].category
        submit.innerHTML="Update";
        mood ="updeate";
        tmp=i;
        scroll({top:0,
        behavior:"smooth",})
}

let searchMood ="title";

function getSearchMood(id){

    let search = document. getElementById("search");

    if(id=="searchTitle"){
        searchMood ="title";
        search.placeholder="Search By Title";
}else{
    searchMood ="category";
    search.placeholder="Search By Category";
}
search.focus()
search.value="";
showData()
}



function searchData(value)
{
    let table="";

  if(searchMood =="title")
    {


    for(let i= 0 ;i < datapro.length;i++){
        if(datapro[i].titile.includes(value.toLowerCase())){
            
            table +=`
        
            <tr>
            <td>${1+i}</th>
            <td>${datapro[i].titile}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `

      }
    }

 }
 
 
 else{
    for(let i=0 ;i < datapro.length;i++ ){
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=
            `
        
            <tr>
            <td>${1+i}</th>
            <td>${datapro[i].titile}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `

    }

 }

  }
  document.getElementById("tbody").innerHTML= table;
}



