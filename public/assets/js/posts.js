//向服务器拿文章列表数据
$.ajax({
    url:'/posts',
    type:'get',
    success:function(res){
       console.log(res)
       let html = template('posts-tpl',{data:res})
      // console.log(html)
      $('#posts-tpl1d').html(html)

      //分页模板
      let page = template('pageTpl',res);
      $('#pageBox').html(page)
    }
})

//处理日期时间格式
function formateDate(date){
    //将日期时间字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth() + 1) + '-'+date.getDate();
}

function changePage(page){
    //alert(page)
    $.ajax({
        url:'/posts',
        type:'get',
        data:{page},
        success:function(res){
           console.log(res)
           let html = template('posts-tpl',{data:res})
          // console.log(html)
          $('#posts-tpl1d').html(html)
    
          //分页模板
          let page = template('pageTpl',res);
          $('#pageBox').html(page)
        }
    })
}