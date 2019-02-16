function get_redflags() {
    const rf_table = document.getElementById('redflag_table');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
    {
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAxMTAyNjcsImlhdCI6MTU1MDA1MDI2Nywic3ViIjoyLCJhZG4iOiJGYWxzZSJ9.gVFIEfoqdOpbIWLWCQV0i9pMBmsQ6tCrpCl2Dm3e-Rc'
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
    {
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
            
            let location = `${redflag.location}`;

            td1.innerHTML = `${redflag.id}`;
            td2.innerHTML = `<a href="redflag_detail.html" onclick="get_id(${redflag.id})">${redflag.created_on}</a>`;
            td3.innerHTML = `${redflag.status}`;
            td4.innerHTML = `${redflag.comment}`;
            td5.innerHTML = location.substring(1, location.length-1);
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
