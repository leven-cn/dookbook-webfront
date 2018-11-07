var inputElements = document.querySelectorAll("input[type='text']");

// 验证昵称是否已存在
var nicknameFlag = true;
inputElements[0].oninput = function(){
  if(this.value && nicknameFlag){
    ajax_django("POST", "/sign-up/", headers={}, data={"nickname": this.value}, function(data){
      if(!data.ok){
        alert(data.msg);
      }
    }, function(status){
      alert("HTTP code: "+status);
    });

    nicknameFlag = false;
    setTimeout(function(){
      nicknameFlag = true;
    }, 400);
  }
}

// 验证短信验证码
var smsFlag = true;
inputElements[1].onclick = function(){
  var phoneNumber = document.querySelector("input[type='tel']").value;
  if(phoneNumber && smsFlag){
    ajax_django("POST", "/sign-up/", headers={}, data={"phone": phoneNumber}, function(data){
      if(!data.ok){
        alert(data.msg);
      }
    }, function(status){
      alert("HTTP code: "+status);
    });

    smsFlag = false;
    setTimeout(function(){
      smsFlag = true;
    }, 6000);
  }
}
