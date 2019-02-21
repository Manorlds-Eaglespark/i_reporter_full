

const login_url = 'https://ireporter256version2.herokuapp.com/api/v2/auth/login';

function login_user() {

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    fetch(login_url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    })
    .then((response) => response.json())
        .then((data) => {
            if(username === "admin" && password === "sup3rpsW"){
                localStorage.setItem('token', data.token)
                window.location.replace('./admin.htm')
                alert("You have successfully logged in as admin");

            }
            else if(data.message == "You have successfully logged in"){
            alert(data.message)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', username)

            window.location.replace('./forum.htm')
            }
            else{
                alert(data.error);
            }
        
        })
}
