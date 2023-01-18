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
let userData = [];
axios
  .get(`${path}users/1`)
  .then(function (response) {
    console.log(response.data);
    userData = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
login.addEventListener("click", function (e) {
  if (account.value == "" || password.value == "") {
    Swal.fire({
      icon: 'warning',
      title: '請輸入帳號或密碼',
      showConfirmButton: true,
      timer: 1500
    }).then(result =>{
      return;
    })
    
  } else if (
    account.value == userData.account &&
    password.value == userData.password
  ) {
    Swal.fire({
      icon: 'success',
      title: '登入成功',
      showConfirmButton: true,
      timer: 1500
    }).then(result =>{
      entry();
    })
    
    
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops !',
      text: '',
      footer: '<a href="">帳號或密碼錯誤</a>'
    })
  }
  account.value = "";
  password.value = "";
});

function entry() {
  window.location.href = "table.html";
}
