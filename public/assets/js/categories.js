//点击事件
$('#cateForm').on('submit',function(){
    //alert('q')
    var formData = $(this).serialize();
    //console.log(formData)
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success:function(){
            location.reload();
        }
    })

    return false;
})

//从服务器获取数据渲染右侧页面
$.ajax({
    url:'/categories/',
    get:'get',
    success:function(res){
    //console.log(res)
    var  html = template('cateTpl',{data:res})
    //console.log(html)
    $('#cateBox').html(html)
    }
})

//点击编辑按钮把信息同步到左侧
//因为编辑按钮在动态模板内，所以要给其设置委托绑定
//因为是动态模板生成多，多以模板内的触发事件不能设置id
$('#cateBox').on('click','.edit',function(){
    let id = $(this).attr('data-id')
    //alert('1')
    //获取服务器信息
    $.ajax({
        url:'/categories/'+id,
        type:'get',
        success:function(res){
            console.log(res)
            let html = template('cateChangeTpl',res)
            //console.log(html)
            $('#cateChange').html(html)
        }
    })
})

//打印后获取左侧信息
$('#cateChange').on('submit','#cateForm',function(){
    //alert('1')
    let formData = $(this).serialize()
    let id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
        url:'/categories/'+id,
        type:'put',
        data:formData,
        success:function(res){
            location.reload()
        }
    })



    return false
})


//删除功能
$('#cateBox').on('click','.del',function(){
    //alert('1')
    if(confirm('是否删除数据')){
        let id=$(this).attr('data-id');
        console.log(id)
        $.ajax({
            url:'/categories/'+id,
            type:'delete',
            success:function(res){
                location.reload();
            }
    
        })
    }
 
})