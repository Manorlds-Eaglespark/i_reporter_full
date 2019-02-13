
function get_redflags() {
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
    {
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAxMTAyNjcsImlhdCI6MTU1MDA1MDI2Nywic3ViIjoyLCJhZG4iOiJGYWxzZSJ9.gVFIEfoqdOpbIWLWCQV0i9pMBmsQ6tCrpCl2Dm3e-Rc'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log({'data':data});
        })
        .catch(function (error) {
            console.log({"Error":error});
        });

}







function login_user() {
    data_ = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    let request = new Request('http://127.0.0.1:5000/api/v2/auth/login', {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(data_)
    });

    fetch(request)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(function (error) {
            console.log({"error":error});
        });
}