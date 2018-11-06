/* 发送短信验证码 */
function smsVerify(phoneNumber){
  ajax("POST", "/sign-up/", headers={
    "X-REQUESTED-WITH": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken")
  }, data={"phone": phoneNumber}, function(data){
    if(!data.ok){
      alert(data.msg);
    }
  }, function(status){
    alert("HTTP code: "+status);
  });
}

document.querySelectorAll("input[type='text']")[1].onclick = function(){
  var phoneNumber = document.querySelector("input[type='tel']").value;
  if(phoneNumber){
    smsVerify(phoneNumber);
  }
}
