


function get_user_detail() {
    let user_id = 2;
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/users/'+user_id,
    {
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAzMDA0MTUsImlhdCI6MTU1MDI5MzIxNSwic3ViIjoyLCJhZG4iOiJGYWxzZSJ9.5AbekCM-quMiebNR1hmFaPfEcxVOv0Ax6-X2yXrl6xI'
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let user = data.data;

            document.getElementById("name").innerHTML = `${user.firstname}` + ` ${user.lastname}` + ` ${user.othernames}`;
            document.getElementById("phonenumber").innerHTML = `${user.phonenumber}`;
            document.getElementById("email").innerHTML = `${user.email}`;
            document.getElementById("username").innerHTML = `${user.username}`;
        }
    else
        {
            feedback_bar.innerHTML = `${data.error}`
        }
        
        console.log({'data':data});
    })
    .catch(function (error) {
        console.log({"Error":error});
    });

}
