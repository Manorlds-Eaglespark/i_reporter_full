


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



function logout_user(){
    localStorage.clear();
    window.location.href = "./index.html";
}