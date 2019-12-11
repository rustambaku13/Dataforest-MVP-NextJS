
$(document).ready(function(){
    tg.hide();
})

function generate_next_canvas(canvas,origin){
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.drawImage(origin, 0, 0);
}

function myclose(){
    tg.hide();
    onpage=1;
}
function next(){
    if(onpage==0 || page_size==1){
        tg.hide();
        ov.hide();
    }
    else if (onpage < page_size){
        $("#id_value").val("");
        if(onpage==2){
            $('.uk-offcanvas-close').remove();
        }
        ov.show();
        onpage++;
        generate_next_canvas(target.find("canvas")[0].getContext('2d'),task_box.find("canvas")[onpage-2])
        id = task_box.find(".filepond--file-wrapper").find("input[type=hidden]").eq(onpage-2).val();
        $("#label_img_id").val(id);  
        tg.show();
         

    }
    else{
        window.location.href= '/tasks';
    }
    
}
function prev(){
    if(onpage==2){
        onpage--;
        tg.hide();
    }
    else if(onpage>=3){
        onpage--;
        generate_next_canvas(target.find("canvas")[0].getContext('2d'),task_box.find("canvas")[onpage-2])
        id = task_box.find(".filepond--file-wrapper").find("input[type=hidden]").eq(onpage-2).val();
        $("#label_img_id").val(id);  
        tg.show();
    }

}

$("#label_add_form").submit(function(){
    
    $.ajax({
        type: $(this).attr('method'),
        data: $(this).serialize(),
        headers:{
            "X-CSRFToken": csrftoken
        },
        url: $(this).attr('action'),
        success: function() {
          errors.text("");
          next();
        },
        error:function(jqXHR,textStatus, errorText){
            errors.text(jqXHR.responseText.substring(2,jqXHR.responseText.length-2));
            
            
        }
        
      });
      return false;
})




