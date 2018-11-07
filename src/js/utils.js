/**
 * 获取Cookie
 * @param {String} name cookie name
 **/
function getCookie(name){
  var cookies = document.cookie.split("; ");

  //遍历匹配
  for(var i=0; i<cookies.length; i++) {
    var arr = cookies[i].split("=");
    if (arr[0] == name){
      return arr[1];
    }
  }
  return "";
}


/**
 * Ajax with JSON
 * @param {String} method HTTP method. Invalid value: "GET", "POST"
 * @param {URL} url request URL
 * @param {Object} headers HTTP headers: {"name": "value"}
 * @param {Object} data HTTP data
 * @param {Function} handle handler for status 200, handle(data)
 * @param {Function} handle_err handler for error, handle_err(status)
 */
function ajax(method, url, headers, data, handle, handle_err){
  var xhr = new XMLHttpRequest;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  if(headers){
    for(var key in headers){
      xhr.setRequestHeader(key, headers[key]);
    }
  }
  if(data){
    xhr.send(JSON.stringify(data));
  }

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        handle(data);
      }else{
        handle_err(xhr.status);
      }
    }
  }
}


/**
 * Ajax with JSON to Django based backend
 * @param {String} method HTTP method. Invalid value: "GET", "POST"
 * @param {URL} url request URL
 * @param {Object} headers HTTP headers: {"name": "value"}
 * @param {Object} data HTTP data
 * @param {Function} handle handler for status 200, handle(data)
 * @param {Function} handle_err handler for error, handle_err(status)
 */
function ajax_django(method, url, headers, data, handle, handle_err){
  headers["X-REQUESTED-WITH"] = "XMLHttpRequest";
  headers["X-CSRFToken"] = getCookie("csrftoken");
  ajax(method, url, headers=headers, data=data, handle, handle_err);
}
