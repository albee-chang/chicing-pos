//設定時間
const currentTime = document.querySelector(".currentTime");
let Today = new Date();
let showTime = () => {
  let yy = Today.getFullYear();
  let mm = Today.getMonth() + 1;
  let dd = Today.getDate();
  let hours = Today.getHours();
  let minutes = Today.getMinutes();
  currentTime.innerHTML = `<li>${yy} 年 ${mm}
  月 ${dd} 日 ${hours}:${minutes.toString().padStart(2, 0)}</li>`;
};
setInterval(showTime, 1000);
//變更使用者帳號密碼
const changebtnUserId=document.querySelector(".changebtnUserId");
const changebtnUserPassword=document.querySelector(".changebtnUserPassword");
const userid = document.querySelector(".userid");
const userpassword = document.querySelector(".userpassword");
let userData=[];
function getUserList(){
  axios.get("http://localhost:3000/users")
  .then(function (response){
    console.log(response.data);
    userData = response.data;
  })
  .catch(function(error){
    console.log(error);
  })
}
getUserList();
changebtnUserId.addEventListener("click",function(e){
  if(userid.value==""){
    alert("變更無效");
    return;
  }else{
    alert("更新成功");
    userid.placeholder = userid.value;
    userid.value ="";
  }
  axios.patch("http://localhost:3000/users/1",
    {
      "account": `${userid.placeholder}`   
    }).then(function(response){
    alert("axios更新");
    getUserList();
    return;
  })
});  
  changebtnUserPassword.addEventListener("click",function(e){
    if(userpassword.value==""){
      alert("變更無效");
      return;
    }else{
      alert("更新成功");
      userpassword.placeholder = userpassword.value;
      userpassword.value ="";
    }
    axios.patch("http://localhost:3000/users/1",
      {
        "password": `${userpassword.placeholder}`   
      }).then(function(response){
      alert("axios更新");
      console.log(userData);
      return;
    })
  
});





const tabGroup = document.querySelectorAll(".tabGroup .backpagebtn");
const contents = document.querySelectorAll(".content");
//使用querySelectorAll 要先用forEach去找要的資料，再綁監聽看點到哪裡
tabGroup.forEach((backpagebtn, index) => {
  backpagebtn.addEventListener("click", function (e) {
    //先把全部的 active 拿掉，再把 active 加進點到的tab裡面
    tabGroup.forEach((tab) => {
      tab.classList.remove("active");
    });
    e.target.classList.add("active");

    //content 內容切換
    contents.forEach((content) => {
      content.classList.remove("active");
    });
    contents[index].classList.add("active");
  });
});

//contant data
const tab1 = document.querySelector("#tab1");
const billContent = document.querySelector(".billContent");
let billsContent=[];
function getBillsList(){
  axios.get("http://localhost:3000/bills")
  .then(function(response){
    console.log(response.data);
billsContent = response.data;
let str=`<tr>
<th width="250px"></th>
<th width="250px">桌號</th>
<th width="250px">金額</th>
<th width="250px">時間</th>
</tr>`;
billsContent.forEach((element,index) => {
 str+=`<tr>
<td class="col-3">${index+1}</td>
<td class="col-3">${element.tableId}</td>
<td class="col-3">$ ${element.total}</td>
<td class="col-3">${element.time}</td>
</tr>`;
});
tab1.innerHTML = `<table>`+str+`</table>`;
  })
  .catch(function(error){
    console.log(error);
  })
}
getBillsList();


const tab2 = document.querySelector("#tab2");

let allDish=[];
function getAllDishList(){
  axios.get("http://localhost:3000/products").then(function (response) {
    console.log(response.data);
    allDish=response.data;    
    allDish.forEach(item=>{
      if(item.category == "rice"){
        item.category = "飯類";
      }else if(item.category == "sideDish"){
        item.category = "小菜";
      }else if(item.category == "soup"){
        item.category = "熱湯";
      }else if(item.category == "drink"){
        item.category = "飲料";
      }
    })
    }).then(function(response){
      let str=`<tr>
<th width="250px">項目</th>
<th width="250px">分類</th>
<th width="250px">品名</th>
<th width="250px">售價</th>
</tr>`;
      allDish.forEach((item,index) =>{
        str+=`<tr>
<td class="col-3">${index+1}</td>
<td class="col-3">${item.category}</td>
<td class="col-3">${item.name}</td>
<td class="col-3">$ ${item.price}</td>
</tr>`;
      })
      tab2.innerHTML = `<table>`+str+`</table>`;
  }).catch(function(error){
    console.log(error);
  })
}
getAllDishList();