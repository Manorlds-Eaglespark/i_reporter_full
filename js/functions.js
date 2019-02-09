






function login_user() {

    data_ = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    let request = new Request('http://127.0.0.1:5000/api/v2/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data_)
    });


    console.log(data_);

    axios.post('http://127.0.0.1:5000/api/v2/auth/login', {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Origin':'*'
        },
        // mode: 'no-cors'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}