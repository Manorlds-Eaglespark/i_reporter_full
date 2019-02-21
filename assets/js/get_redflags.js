function get_redflags() {
    const rf_table = document.getElementById('redflag_table');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
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
                td4 = createNode('td');
            
            let location = `${redflag.location}`;

            td1.innerHTML = `${redflag.id}`;
            td2.innerHTML = `<a href="redflag_detail.html" onclick="get_id(${redflag.id})">${redflag.created_on}</a>`;
            td3.innerHTML = `${redflag.status}`;
            td4.innerHTML = `${redflag.comment}`;
          
            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tr, td4);
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
