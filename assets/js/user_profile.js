


function get_user_detail() {

    document.getElementById("user_identifier_profile").innerHTML = `${localStorage.getItem('first_name')}` + ` ${localStorage.getItem('last_name')}`;
    
    feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/users/'+localStorage.getItem('user_id'),
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
     }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let user = data.data;

            document.getElementById("name").innerHTML = `${user.firstname}` + ` ${user.lastname}` + ` ${user.othernames}`;
            document.getElementById("phonenumber").innerHTML = `${user.phonenumber}`;
            document.getElementById("email").innerHTML = `${user.email}`;
            document.getElementById("username").innerHTML = `${user.username}`;

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







function get_user_stats() {
    let user_id = localStorage.getItem('user_id');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/users/'+user_id+'/stats',
    {   
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let stats = data.data;
            
            document.getElementById("new_redflag").innerHTML = `${stats.new_redflags}`;
            document.getElementById("investigated_redflag").innerHTML = `${stats.investigated_redflags}`;
            document.getElementById("resolved_redflag").innerHTML = `${stats.resolved_redflags}`;
            document.getElementById("rejected_redflag").innerHTML = `${stats.rejected_redflags}`;
            document.getElementById("total_redflag").innerHTML = `${stats.redflag_total}`;
            document.getElementById("new_intervention").innerHTML = `${stats.new_interventions}`;
            document.getElementById("investigated_intervention").innerHTML = `${stats.investigated_interventions}`;
            document.getElementById("resolved_intervention").innerHTML = `${stats.resolved_interventions}`;
            document.getElementById("rejected_intervention").innerHTML = `${stats.rejected_redflags}`;
            document.getElementById("total_intervention").innerHTML = `${stats.interventions_total}`;
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





function get_user_incidents() {
    let user_id = localStorage.getItem('user_id');
    const rf_table = document.getElementById('redflag_table');
    const i_table = document.getElementById('interventions_table');
    const feedback_bar = document.getElementById('feedback_bar');
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

