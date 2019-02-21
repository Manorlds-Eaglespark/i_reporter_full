




function get_redflag_detail() {
    let item_id = localStorage.getItem("item_id");
    const rf_container = document.getElementById('redflag_detail');
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('https://ireporter256version2.herokuapp.com/api/v2/red-flags/'+item_id,
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
            let redflag = data.data,
            location = `${redflag.location}`,
            videos = `${redflag.videos}`,
            images = `${redflag.images}`;

            document.getElementById("item_date").innerHTML = `${redflag.created_on}`;
            document.getElementById("item_status").innerHTML = `${redflag.status}`;
            document.getElementById("item_comment").innerHTML = `${redflag.comment}`;
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