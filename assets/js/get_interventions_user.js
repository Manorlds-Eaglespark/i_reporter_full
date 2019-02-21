




function get_user_interventions() {
    const i_table = document.getElementById('interventions_table');
    const feedback_bar = document.getElementById('feedback_bar');
    let user_id = localStorage.getItem('user_id');
   
    fetch('http://127.0.0.1:5000/api/v2/users/'+user_id+'/interventions',
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
    {
        let interventions = data.data;
        return interventions.map(function(intervention) {
            let tr = createNode('tr'),
                td1 = createNode('td'),
                td2 = createNode('td'),
                td3 = createNode('td');
            
            let location = `${intervention.location}`;

            td1.innerHTML = `<a href="intervention_detail.html" onclick="get_id(${intervention.id})">${intervention.created_on}</a>`;
            td2.innerHTML = `${intervention.status}`;
            td3.innerHTML = `${intervention.comment}`;

            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(i_table, tr);
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

