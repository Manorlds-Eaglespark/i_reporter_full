function get_user_redflags() {

    const rf_table = document.getElementById('redflag_table');
    const feedback_bar = document.getElementById('feedback_bar');
    let user_id = localStorage.getItem('user_id');

    fetch('http://127.0.0.1:5000/api/v2/users/'+user_id+'/red-flags',
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == '200')
        {
            let redflags = data.data;
            var counter = 0;
            return redflags.map(function(redflag) {
                let tr = createNode('tr'),
                    td1 = createNode('td'),
                    td2 = createNode('td'),
                    td3 = createNode('td');
        
                td1.innerHTML = `<a href="redflag_detail.html" onclick="get_id(${redflag.id})">${redflag.created_on}</a>`;
                td2.innerHTML = `${redflag.status}`;
                td3.innerHTML = `${redflag.comment}`;
               
                append(tr, td1);
                append(tr, td2);
                append(tr, td3);
                append(rf_table, tr);
            }); }
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


function get_id(id){
            localStorage.setItem("item_id", id)
}

function logout_user(){
    localStorage.clear();
    window.location.href = "./index.html";
}