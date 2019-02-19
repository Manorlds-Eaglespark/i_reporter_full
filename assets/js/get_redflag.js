




function get_redflag_detail() {
    let item_id = localStorage.getItem("item_id");
    const rf_container = document.getElementById('redflag_detail');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/red-flags/'+item_id,
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let redflag = data.data;

            document.getElementById("item_date").innerHTML = `${redflag.created_on}`;
            document.getElementById("item_status").innerHTML = `${redflag.status}`;
            document.getElementById("item_comment").innerHTML = `${redflag.comment}`;
            document.getElementById("item_location").innerHTML = `${redflag.location}`;
            document.getElementById("item_images").innerHTML = `${redflag.images}`;
            document.getElementById("item_videos").innerHTML = `${redflag.videos}`;
            document.getElementById("item_creator").innerHTML = `${redflag.created_by}`;

            if (redflag.created_by == localStorage.getItem('user_id')){
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
