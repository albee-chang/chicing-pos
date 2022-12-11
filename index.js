const account = document.querySelector(".account");
const password = document.querySelector(".password");
const login = document.querySelector(".logIn-btn");
//設定時間
const currentTime = document.querySelector(".currentTime");
let showTime = () => {
  let Today = new Date();
  currentTime.innerHTML = `<li>${Today.getFullYear()} 年 ${Today.getMonth() + 1}
  月 ${Today.getDate()} 日 ${Today.getHours()}:${Today.getMinutes()
    .toString()
    .padStart(2, 0)}</li>`;
};
setInterval(showTime, 1000);
let userData=[];
axios.get("http://localhost:3000/users/1")
.then(function (response){
  console.log(response.data);
  userData = response.data;
})
.catch(function(error){
  console.log(error);
})
login.addEventListener("click", function (e) {
  if (account.value == "" || password.value == "") {
    return;
  } else if (account.value == userData.account && password.value == userData.password) {
    alert("登入成功");
    entry();
  } else {
    alert("帳號或密碼錯誤");
  }
  account.value = "";
  password.value = "";
});

function entry() {
  window.location.href = "table.html";
}


