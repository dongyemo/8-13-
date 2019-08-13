//获取文章分类信息
$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
        //console.log(res)
        let html = template('categorytpl',{data:res})
        //console.log(html)
        $('#category').html(html)
    }
})
//实现文章图片的上传
$('#feature').on('change',function(){
    //console.log(this.files[0])
    var formData = new FormData();
    
    formData.append('cover',this.files[0]);

    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            //console.log(res)
           // $('#preview').attr('src',res[0].cover);
            //把图片地址存储到隐藏域的value属性中，然后服务器会自动获得图片地址
            $('#thumbnail').val(res[0].cover);
        }
    })
})

//创建文章
$('#addForm').on('submit',function(){
    //alert('1')
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        url:'/posts',
        type:'post',
        data:formData,
        success:function(res){
            location.href='/admin/posts.html'
        }
    })
    return false;
})