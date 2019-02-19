



function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el); 
  }


  function user_name_detail(){
    return document.getElementById("user_identifier_profile").innerHTML = `${localStorage.getItem('first_name')}` + ` ${localStorage.getItem('last_name')}`;
  }