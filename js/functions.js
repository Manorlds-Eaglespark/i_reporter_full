
function get_redflags() {
    fetch('http://127.0.0.1:5000/api/v2/red-flags')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(function (error) {
            console.log({"Error":error});
        });

}







async function login_user() {

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

    thisds = await fetch(request)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(function (error) {
            console.log({"error":error});
        });

    return thisds
}