




function get_intervention_detail() {
    let item_id = localStorage.getItem("item_id");
    const i_container = document.getElementById('intervention_detail');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('https://ireporter256version2.herokuapp.com/api/v2/interventions/'+item_id,
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
         }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let intervention = data.data,
            location = `${intervention.location}`,
            videos = `${intervention.videos}`,
            images = `${intervention.images}`;

            document.getElementById("item_date").innerHTML = `${intervention.created_on}`;
            document.getElementById("item_status").innerHTML = `${intervention.status}`;
            document.getElementById("item_comment").innerHTML = `${intervention.comment}`;
            document.getElementById("item_location").innerHTML = location;
        
          
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


document.getElementById('go_back').addEventListener('click', goBack)
function goBack(){
    window.history.back();
}





