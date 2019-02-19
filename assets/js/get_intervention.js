




function get_intervention_detail() {
    let item_id = localStorage.getItem("item_id");
    const i_container = document.getElementById('intervention_detail');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/interventions/'+item_id,
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
         }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let intervention = data.data;

            document.getElementById("item_date").innerHTML = `${intervention.created_on}`;
            document.getElementById("item_status").innerHTML = `${intervention.status}`;
            document.getElementById("item_comment").innerHTML = `${intervention.comment}`;
            document.getElementById("item_location").innerHTML = `${intervention.location}`;
            document.getElementById("item_images").innerHTML = `${intervention.images}`;
            document.getElementById("item_videos").innerHTML = `${intervention.videos}`;
            document.getElementById("item_creator").innerHTML = `${intervention.created_by}`;

            if (intervention.created_by == localStorage.getItem('user_id')){
                document.getElementById("only_creater").style.display = "block"
            }
            else{
                document.getElementById("only_creater").style.display = "none"
            }
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
