
function get_redflags() {
    const rf_table = document.getElementById('redflag_table');
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
    {
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAxMTAyNjcsImlhdCI6MTU1MDA1MDI2Nywic3ViIjoyLCJhZG4iOiJGYWxzZSJ9.gVFIEfoqdOpbIWLWCQV0i9pMBmsQ6tCrpCl2Dm3e-Rc'
        }
    })
        .then(res => res.json())
        .then(data => {

            let redflags = data.redflags;
            return redflags.map(function(redflag) {
            let tr = createNode('tr'),
                td1 = createNode('td'),
                td2 = createNode('td'),
                td3 = createNode('td'),
                td4 = createNode('td'),
                td5 = createNode('td'),
                td6 = createNode('td'),
                td7 = createNode('td');

                td1.innerHTML = `${redflag.id}`
                td2.innerHTML = `${redflag.created_on}`;
                td3.innerHTML = `${redflag.status}`;
                td4.innerHTML = `${redflag.comment}`;
                td5.innerHTML = `${redflag.location}`;
                td6.innerHTML = `${redflag.images}`;
                td7.innerHTML = `${redflag.videos}`;

              append(tr, td1);
              append(tr, td2);
              append(tr, td3);
              append(tr, td4);
              append(tr, td5);
              append(tr, td6);
              append(tr, td7);
              append(rf_table, tr);
            });
            
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





function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el); 
  }