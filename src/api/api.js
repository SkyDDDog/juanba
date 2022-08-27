import service from "@/utils/request";
export function getTodoList(data) {
    return service.request({
        method: "get",
        url: `/api/todo/get/${data.userId}?sort=${data.sort}`,
    }) 
   }
export function getHot(data) {
    return service.request({
        method: "get",
        url: `/api/posts/hot`
    }) 
   }
export function getPost(data) {
    return service.request({
        method: "get",
        url:`/api/posts/${data.sort}/${data.pageNum}/${data.pageSize}?userId=${data.userId} `
    }) 
   }   
   export function getPost2(data) {
    return service.request({
        method: "get",
        url:`/api/posts/${data.sort}/${data.pageNum}/${data.pageSize}`
    }) 
   }  
export function getsearch(data) {
    return service.request({
        method: "get",
        url: `/api/posts/all/${data.pageNum}/${data.pageSize}?userId=${data.userId}`
    }) 
   }   
export function getrecommodate(data) {
    return service.request({
        method: "get",
        url: `/api/posts/rec/${data.pageNum}/${data.pageSize}`
    }) 
   }   
export function  getdocument(data) {
    return service.request({
        method: "get",
        url: `/api/doc/${data.kind}/${data.pageNum}/${data.pageSize}`
    }) 
   }
export function  getdocumentHot(data) {
    return service.request({
        method: "get",
        url: `/api/doc/hot`
    }) 
   }
export function  getdocumentDetails(data) {
    console.log('111', data)
    return service.request({
        method: "get",
        url: `/api/doc/${data.docId}?userId=${data.userId}`
    }) 
   } 
export function  getInfo(data) {
    return service.request({
        method: "get",
        url: `/api/posts/${data.postId}?userId=${data.userId}`
    }) 
   } 
export function getCode (data) {
    return service.request({
        url: `/api/user/getCode/${data.key}`,
        method: 'get',
        data: data,
        responseType: 'arraybuffer' //这里特殊注明返回格式是文件流
    });
}
export function  VerCode(data) {
    return service.request({
        method: "get",
        url: `/api/user/checkCode/${data.code}/${data.key}`
    }) 
   } 
export function  SendEmail(data) {
    return service.request({
        method: "get",
        url: `/api/mail/send/${data.email}`
    }) 
   }
export function  VerEmail(data) {
    return service.request({
        method: "get",
        url: `/api/mail/cmp/${data.email}/${data.VerCode}`
    }) 
   } 
export function  Register(data) {
    return service.request({
        method: "post",
        url: `/api/user/register`,
        data
    }) 
   }
export function  Vermail(data) {
    console.log(data)
    return service.request({
        method: "get",
        url: `/api/mail/cmp/${data.email}/${data.VerCode}`
    }) 
   }
// export function  Login(data) {
//     console.log(data)
//     return service.request({
//         method: "post",
//         url: `/user/login`,
//         data
//     }) 
//    }
export function Login(data){
    console.log('登录数据', data)
    return service.request({
        method:"post",
        url:`/api/user/login`,
        data
    })
}
export function getAnswer(data){
    return service.request({
        method:"get",
        url:`/api/answer/post/${data.postId}/${data.pageNum}/${data.pageSize}?userId=${data.userId}`,
        data
    })
}
export function modifytodo(data){
    return service.request({
        method:"get",
        url:`/api/todo/upd/${data.id}/${data.content}`,
        data
    })
}
export function answerComment(data){
    return service.request({
        method:"get",
        url:`/api/comment/answer/${data.answerId}/${data.pageNum}/${data.pageSize} `,
        data
    })
}
export function LikeAnswer(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/like/${data.userId}/${data.answerId}`,
        data
    })
}
export function FinishedTodo(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/todo/do/${data.id}`,
        data
    })
}
export function DeleteTodo(data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`/api/todo/${data.id}`,
        data
    })
}
export function settingPassword(data){
    console.log(data)
    return service.request({
        method:"post",
        url:`/api/user/updPwd`,
        data
    })
}
export function getAnswer2(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/answer/${data.id}?userId=${data.userId}`,
        data
    })
}
export function storeAnswer(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/collect/post/${data.sort}/${data.userId}/${data.targetId}`,
        data
    })
}
export function getMessage(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/${data.userId}`,
        data
    })
}
export function upMessage(data){
    console.log('上传个人信息数据',data)
    return service.request({
        method:"post",
        url:`/api/user/upd`,
        data
    })
}
export function postContent(data){
    console.log(data)
    return service.request({
        method:"post",
        url:`/api/posts/${data.userId}/${data.title}?content=${data.content}`,
        data
    })
}
export function myRelease(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/myPost/${data.userId}/${data.sort}/${data.pageNum}/${data.pageSize}`,
    })
}
export function myHistory(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/myHistory/${data.sort}/${data.userId}/${data.pageNum}/${data.pageSize}`,
    })
}
export function myJoin(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/myJoin/${data.userId}/${data.pageNum}/${data.pageSize}`,
    })
}
export function unCollect(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/unCollect/post/${data.sort}/${data.userId}/${data.targetId}`,
    })
}
export function myStore(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/user/collection/${data.sort}/${data.userId}/${data.pageNum}/${data.pageSize}`,
    })
}
export function commentAnswer(data){
    console.log(data)
    return service.request({
        method:"post",
        url:`/api/comment/${data.postId}/${data.answerId}/${data.userId}/${data.content}`,
        data
    })
}
export function closeFocus(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/todo/focus/off/${data.todoId}/${data.time}`,
    })
}
export function getFocus(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/todo/focus/${data.sort}/${data.userId}`,
    })
}
export function addTodo(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/todo/add/${data.userId}/${data.content}`,
    })
}
export function search(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/posts/search/${data.sort}/${data.pageNum}/${data.pageSize}/${data.content}?userId=${data.userId}`,
    })
}
export function report(data){
    console.log(data)
    return service.request({
        method:"post",
        url:`/api/report/${data.sort}/${data.userId}/${data.targetId}?reason=${data.reason}`,
        data
    })
}
export function getList(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/report/getList/${data.pageNum}/${data.pageSize}`,
    })
}
export function bnaUser(data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`/api/report/banUser/${data.userId}`,
    })
}
export function userList(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/report/userList/${data.pageNum}/${data.pageSize}`,
    })
}
export function dealReport(data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`/api/report/dealReport/${data.result}/${data.reportId}`,
    })
}
export function banUser(data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`/api/report/banUser/${data.userId}`,
    })
}
export function getSysMsg(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/msg/getSysMsg/${data.userId}`,
    })
}
export function unbanUser(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/report/unbanUser/${data.userId}`,
    })
}
export function preview(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/doc/preview/${data.id}`,
    })
}
export function commentT(data){
    console.log(data)
    return service.request({
        method:"post",
        url:`/api/comment/${data.postId}/${data.userId}/${data.content}`,
        data
    })
}
export function download(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/doc/download/${data.id}`,
    })
}
export function video(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/video/all/${data.pageNum}/${data.pageSize}`,
    })
}
export function videoDetails(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/video/${data.id}?userId=${data.userId}`,
    })
}
export function videodownload(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/api/video/download/${data.id}`,
    })
}
