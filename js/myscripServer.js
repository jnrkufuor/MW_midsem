var array=[];
var long;
var lat;
var map;
jQuery(document).ready(function ($) {
    if(window.performance)
    {
        if(performance.navigation.type  == 1 )
        {
            if(sessionStorage.user!=null)
                $('.logo').html("<i class='fa fa-user-o' aria-hidden='true'></i> "+sessionStorage.user);
            window.location="#dashboard";
        }
    }
});

jQuery(document).ready(function ($) {
    $('.login').click(function (event) {
        event.preventDefault();
        var username=$('#username').val();
        var password= $('#pword').val();
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=1&password='+password+'&username='+username,
            error: function () {
                // alert('error, failed to get id');
            },
            dataType: 'json',
            success: function (response) {

                if(response.message=="false")
                {
                    $('.message').html("<i class='fa fa-meh-o' aria-hidden='true'></i> Invalid Username/Password"); 
                }
                else
                {
                    var options = {
                        enableHighAccuracy: true,
                        maximumAge: 3600000
                    }
                    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
                    sessionStorage.user=response.USERNAME;
                    sessionStorage.id=response.uid;
                    sessionStorage.lat= response.Lat;
                    sessionStorage.long= response.Lon;
                    sessionStorage.phone=response.phone;
                    console.log(response.phone);
                    initMap();
                    window.location="#dashboard";
                    $('#username').val("");
                    $('#pword').val("");
                    $('.logo').html("<i class='fa fa-user-o' aria-hidden='true'></i> "+sessionStorage.user);
                }
            },
        });
    });
});

jQuery(document).ready(function ($) {
    $('.back-sign').click(function (event) {
        event.preventDefault();
        $('#s_username').val("");
        $('#s_pword').val("");
        $('#firstname').val("");
        $('#lastname').val("");
        $('#phone').val("");
        $('.message_signUp').html("");
        $('.message_cpool').html("");
    });
});

jQuery(document).ready(function ($) {
    $('.back-cpool').click(function (event) {
        event.preventDefault();
        $('.message_cpool').html("");
    });
});

jQuery(document).ready(function ($) {
    $('.log-btn').click(function (event) {
        event.preventDefault();

    });
});

jQuery(document).ready(function ($) {
    $('.signup').click(function (event) {
        event.preventDefault();
        var username=$('#s_username').val();
        var password= $('#s_pword').val();
        var fname=$('#firstname').val();
        var lname= $('#lastname').val();
        var phone=$('#phone').val();
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=2&password='+password+'&username='+username+'&lname='+lname+'&fname='+fname+'&phone='+phone,
            error: function () {

            },
            success: function (html) {

                if(html==true)
                {
                    $('.message_signUp').html("<i class='fa fa-smile-o' aria-hidden='true'></i> Successfully Added");
                    $('#s_username').val("");
                    $('#s_pword').val("");
                    $('#firstname').val("");
                    $('#lastname').val("");
                    $('#phone').val("");
                }
                else
                {
                    $('.message_signUp').html("<i class='fa fa-meh-o' aria-hidden='true'></i> Could Not Add You");
                }


            },
        });
    });
});

jQuery(document).ready(function ($) {
    $('.cpool').click(function (event) {
        event.preventDefault();
        var type=$('#car').val();
        var dest= $('#dest').val();
        var capacity=$('#capacity').val();
        var time= $('#time').val();
        var cpool=sessionStorage.id;
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=3&type='+type+'&dest='+dest+'&capacity='+capacity+'&time='+time+'&username='+cpool,
            error: function () {
                // alert('error, failed to get id');
            },
            success: function (html) {
                if(html==true) 
                {
                    $('.message_cpool').html("<i class='fa fa-smile-o' aria-hidden='true'></i> Created Pool");
                    $('#car').val("");
                    $('#dest').val("");
                    $('#capacity').val("");
                    $('#time').val("");

                }
                else
                {
                    $('.message_cpool').html("<i class='fa fa-meh-o' aria-hidden='true'></i> Could Not Create Pool");

                }
            },
        });
    });
});



jQuery(document).ready(function ($) {
    $('.jPool').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=4',
            error: function () {
                // alert('error, failed to get id');
            },
            dataType: 'json',
            success: function (response) {

                if(response.message=="false")
                {
                    $('.message-pools').html("There are No Available Pools");  
                }
                else
                {

                    for (var i=0;i<response.length;i++){
                        obj= {cartype:response[i].car_type,cap:response[i].capacity,carID:response[i].carId,driver:response[i].driver,full:response[i].isFull};
                        array.push(obj);
                        $('.list-group').append("<a href=''id='"+i+"' class='list-group-item '>"+
                                                "<h4 class='list-group-item-heading'>"+response[i].car_type+"</h4>"+
                                                "<p class='list-group-item-text'>"+response[i].firstname+" "+response[i].lastname+"</p>"+
                                                "<p class='list-group-item-text'>Stops at "+response[i].destination+"</p>"+
                                                "<p class='list-group-item-text'>Leaving at "+response[i].time+"</p>"+
                                                "<span class='badge'>"+response[i].isFull+"</span>"+
                                                "<p class='list-group-item-text'>Capacity:"+response[i].capacity+"</p>"+
                                                "</a><br>");
                    }
                    $('.list-group-item').click(function (event) {
                        var payment = prompt("Are You Paying In Cash Or Mobile Money", "");
                        if (payment != null) {
                            dialog($(this).attr("id"),payment);
                        }
                    });
                }
            },
        });
    });
});



jQuery(document).ready(function ($) {
    $('.log-btn').click(function (event) {
        sessionStorage.clear();
    });
});
jQuery(document).ready(function ($) {
    $('.j_back').click(function (event) {
        $('.list-group').html(" ");
    });
});


function dialog(i,payment)
{
    $.ajax({
        type: 'POST',
        url: '52.89.116.249/ajax/projectAjax.php?cmd=5&oid='+array[i].driver+'&cid='+array[i].carID+'&pay='+payment+'&pid='+sessionStorage.id+'&count='+array[i].full
        +'&cap='+array[i].cap+"&phone="+sessionStorage.phone,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.result==0)
            {
                alert(response.message);
            }
            else
            {
                alert(response.message);

            }
        },
    });
}





jQuery(document).ready(function ($) {
    $('.pJoin').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=6&id='+sessionStorage.id,
            error: function () {
                // alert('error, failed to get id');
            },
            dataType: 'json',
            success: function (response) {

                if(response.result==0)
                {
                    $('.message-join').html(response.message);  
                }
                else
                {
                    $('.table-responsive').html("<table class='j-font' bgcolor='rgb(41, 70, 71)'><tr><th>DateCreated</th><th>Car</th><th>FirstName</th><th>Lastname</th><th>Payment</th></tr>");

                    for(var i=0;i<response.length;i++){
                        $('.j-font').append("<tr class=''><td>"+response[i].date_created+"</td><td>"+response[i].car_type+"</td><td>"+response[i].firstname+"</td><td>"+response[i].lastname+"</td><td>"+response[i].payment+"</td></tr>");
                    }
                    $('.table-responsive').append("</table>"); 
                }
            },
        });
    });
});


function initMap() {
    var myCentre = new google.maps.LatLng(sessionStorage.lat,sessionStorage.long);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myCentre,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var marker = new google.maps.Marker({
        position: myCentre,
        map: map,
    });
    marker.setMap(map);
}

jQuery(document).ready(function ($) {
    $('.contacts').click(function (event) {
        navigator.contacts.pickContact(function(contact){
            console.log('The following contact has been selected:' + JSON.stringify(contact));
        },function(err){
            console.log('Error: ' + err);
        });

    });
});
jQuery(document).ready(function ($) {
    $('.geo').click(function (event) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        $("#map").attr("style","width:100%");

    });
});

function onSuccess(position) {

    lat= position.coords.latitude ;   
    long= position.coords.longitude ;
    $.ajax({
        type: 'POST',
        url: '52.89.116.249/ajax/projectAjax.php?cmd=7&id='+sessionStorage.id+"&lat="+lat+"&long="+long,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.result==0)
            {
                alert(response.message);
            }
            else
            {
                initMap();
            }
        },
    });
};
function onError(error) {
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

jQuery(document).ready(function ($) {
    $('.add').click(function (event) {
        $.ajax({
            type: 'POST',
            url: '52.89.116.249/ajax/projectAjax.php?cmd=8&id='+sessionStorage.id+'&message='+$(".info").val()+'&pic='+sessionStorage.image,
            error: function () {
                // alert('error, failed to get id');
            },
            dataType: 'json',
            success: function (response) {
                if(response.result==0)
                {
                    alert(response.message);
                }
                else
                {
                    alert(response.message);

                }
            },
        });
    });
});


jQuery(document).ready(function ($) {
    $('.add-pic').click(function (event) {
        navigator.camera.getPicture(onSuccess, onFail, 
                                    { quality: 50,
                                     destinationType: Camera.DestinationType.DATA_URL
                                    });
    });
});

function onSuccess(imageData){
    sessionStorage.image=imageData;

}

function onFail(message){
    alert("Was Not Able To Load Camera");
}


