



const feedback_bar = document.getElementById('feedback_bar');


document.getElementById('login-form').addEventListener('submit', login_user)

function login_user(e) {
    e.preventDefault();
    data_ = {
        email: document.getElementById("email").value,
        password: document.getElementById("pass_word").value
    }
    
    fetch('http://127.0.0.1:5000/api/v2/auth/login',
    {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data_)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(function (error) {
            console.log({"error":error});
        });
}


document.getElementById('register-form').addEventListener('submit', register_user)

function register_user(e) {
    e.preventDefault();
    data_ = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        othernames: document.getElementById("othernames").value,
        email: document.getElementById("emai_l").value,
        password: document.getElementById("password").value,
        phonenumber: document.getElementById("phonenumber").value,
        username: document.getElementById("username").value
    }

    
    fetch('http://127.0.0.1:5000/api/v2/auth/register',
    {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data_)
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == '201')
            {
                window.location.href = "./index.html";
                
                alert('Your Account was successfully created. Now You Can Log-in');
                  
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}
