




function get_interventions() {
    const i_table = document.getElementById('interventions_table');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/interventions',
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
                td3 = createNode('td'),
                td4 = createNode('td'),
                td5 = createNode('td'),
                td6 = createNode('td'),
                td7 = createNode('td');
            
            let location = `${intervention.location}`;

                td1.innerHTML = `${intervention.id}`;
                td2.innerHTML = `<a href="intervention_detail.html" onclick="get_id(${intervention.id})">${intervention.created_on}</a>`;
                td3.innerHTML = `${intervention.status}`;
                td4.innerHTML = `${intervention.comment}`;
                td5.innerHTML = location.substring(1, location.length-1);
                td6.innerHTML = `${intervention.images}`;
                td7.innerHTML = `${intervention.videos}`;

              append(tr, td1);
              append(tr, td2);
              append(tr, td3);
              append(tr, td4);
              append(tr, td5);
              append(tr, td6);
              append(tr, td7);
              append(i_table, tr);
            });
        }
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

