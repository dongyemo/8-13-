/*
// 主要是用于操作用户的 
var userArr = new Array();
// 将用户列表展示出来 
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userArr = res;
        render(userArr);
    }
})

// 用于调用template方法 
function render(arr){   
   var str =  template('userTpl',{
        list:arr
    });
    // console.log(str);
    $('tbody').html(str);
}

// 添加用户功能 
$('#userAdd').on('click',function(){
    // console.log($('#userForm').serialize());
    // return;
    $.ajax({
        url:'/users',
        type:'post',
        data:$('#userForm').serialize(),
        success:function(res){
            userArr.push(res);
            render(userArr);
        }
    });
});

// 当用户选择文件的时候
$('#avatar').on('change', function () {
	// 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			// 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            // 将图片的地址添加到表单里面的隐藏域
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});


var userId;
// 编辑用户功能 
$('tbody').on('click','.edit',function(){
    // 保存当前被修改的这个用户的id
    userId = $(this).parent().attr('data-id');

    $('#userForm > h2').text('修改用户');

   // 先获取 当前被点击这个元素的祖先 叫tr 
    var trObj = $(this).parents('tr');

    // 获取图片的地址
    var imgSrc = trObj.children().eq(1).children('img').attr('src');
    // 将图片的地址写入到隐藏域 
    $('#hiddenAvatar').val(imgSrc);
    // 如果imgSrc有值 我们
    if(imgSrc){
        $('#preview').attr('src',imgSrc);
    }else{
        $('#preview').attr('src',"../assets/img/default.png");
    }

    // 将对应的内容写入到左边的输入框里面
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    if(status == '激活'){
        $('#jh').prop('checked',true);
    }else{
        $('#wjh').prop('checked',true);
    }

    var role = trObj.children().eq(5).text();

    if(role == '超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);
    }

    // 当我们点击编辑按钮时 将添加按钮隐藏 同时将修改按钮 显示出来 
    $('#userAdd').hide();
    $('#userEdit').show();


});

// 完成修改用户功能 
$('#userEdit').on('click',function(){
    //console.log($('#userForm').serialize());
    // 我们需要发送ajax给服务器时 需要传递Id 
    $.ajax({
        type:'put',
        url:'/users/'+userId,
        data:$('#userForm').serialize(),
        success:function(res){
            // 我们只是将数据库里面的数据给修改 但是我们将userArr这个数组里面的元素给修改
            // 我们要从userArr这个数组中 将要修改这个数组元素找出来 
            var index = userArr.findIndex(item=>item._id == userId);
            // 根据这个index找到数组的这个元素 将它的数据更新 
            userArr[index] = res;
            // 调用render方法 重新渲染页面 
            render(userArr);

            // 修改用户以后将表单数据还原
            $('#userForm > h2').text('添加新用户');
            $('#hiddenAvatar').val("");
            $('#preview').attr('src',"../assets/img/default.png");
            $('#userAdd').show();
            $('#userEdit').hide();
            $('#email').val("");
            $('#nickName').val("");
            $('#admin').prop('checked',false);
            $('#normal').prop('checked',false);
            $('#jh').prop('checked',false);
            $('#wjh').prop('checked',false);

        }
    });
});
*/






//添加功能
$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(){
            location.reload();
        },
        error:function(){
            alert('添加失败')
        }
    })


    return false;
})


//当用户选择文件添加头像时



$('#modifyBox').on('change','#avatar',function(){
   //console.log(this.files[0])
   var formData = new FormData();
   //第一个参数是属性名称（当图片上传之后服务器会返回一个对象，对象里面存储着图片的地址，这个地址对应的属性名称就是此处写的第一个参数）
   formData.append('avatar', this.files[0]);
   $.ajax({
       type:'post',
       url:'/upload',
       data:formData,
       //告诉$.ajax方法不要解析请求参数(不要解析formData对应的值，ajax默认会将请求参数修改为k=v的形式，二此处头像上传需要的是二进制文件)
       processData:false,
       //告诉$.ajax方法不要设置请求参数的类型（formData中已经设置过请求参数的类型）
       contentType:false,
       success:function(res){
           // console.log(res)   //输出的是图片地址
           $('#preview').attr('src',res[0].avatar)
           $('#hiddenAvatar').val(res[0].avatar)
       }

   })
})

//用户列表展示
//1.先拿到用户列表数据2.使用模板引擎实现数据和模板的拼接
$.ajax({
    url:'/users',
    type:'get',
    success:function(res){
       // console.log(res)  //用户列表信息
        //拼接,tem的第二个参数要是对象形式
        var html = template('userTpl',{list:res});
        //console.log(html)
        $('#userBox').html(html);

    }
})


//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url:'/users/'+id,
        type:'put',
        success:function(res){
            //console.log(res)
            var html = template('modifyTpl',res);
            //console.log(html)
            $('#modifyBox').html(html)
        }
    })
})

//修改后的用户信息上传
$('#modifyBox').on('submit','#modifyForm',function(){
    let formData = $(this).serialize();
   console.log('111'+formData)
    var id=$(this).attr('data-id');
  
    $.ajax({
        url:'/users/'+id,
        type:'put',
        data:formData,
        success:function(res){
            location.reload()
        }
    })
     return false;
 })


 //实现用户信息删除功能
 $('#userBox').on('click','.user-del',function(){
     //alert('1')
    if(confirm('您真的要删除嘛')){
         //由文档得知删除用户功能需要获得用户的Id，用户id在编辑按钮上绑定的有
    let id = $(this).parent().attr('data-id');
    //console.log(id)
    $.ajax({
       url:'/users/'+id,
       type:'delete',
       success:function(res){
        console.log(res)
        location.reload();
       } 
    })
    }

 })

 //实现批量删除功能

 //点击全选按钮时选中所有
 $('#selectAll').on('change',function(){
    // alert('1')
    var status = $(this).prop('checked')
    //alert(status)

    //当全选按钮被选中和隐藏的时候，批量删除按钮分属的状态
    if(status){
        $('#deleteMany').show();
    }else{
        $('#deleteMany').hide();
    }
    //获取所有用户的状态与全选按钮同步
    $('#userBox').find('input').prop('checked',status);
 })

 //当用户前面的复选框发生改变的时候控制全选按钮的选中状态
 $('#userBox').on('change','.userStatus',function(){
     //获取所有用户在所有用户里过滤出选中的用户
     //判断选中用户的数量是否等于全部用户
     var inputs = $('#userBox').find('input');
     if(inputs.length == inputs.filter(':checked').length){
         $('#selectAll').prop('checked',true);
     }else{
        $('#selectAll').prop('checked',false);
     }

     //如果选中的复选框数量大于0，显示批量删除
     if(inputs.filter(':checked').length > 0 ){
         $('#deleteMany').show();
     }else{
         $('#deleteMany').hide();
     }
 })