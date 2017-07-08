const API_URL_USER = 'http://www.yibele.com/v1/user';
const API_URL_ACT = 'http://www.yibele.com/v1/activity';


function act(type, params = '', method = null) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API_URL_ACT}/${type}/${params}`,
            method: method ? "GET" : method,
            success: resolve, //function (res){console.log(res)}
            fail: reject
        })
    })
}

function postA(type,data) {
    return new Promise((resolve,reject) => {
        wx.request({
            url : `${API_URL_ACT}/${type}`,
            data : data,
            method :"POST",
            header : {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success :resolve,
            fail : reject
        })
    })
}

function user(type, params = '', method ,data,header = null) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API_URL_USER}/${type}/${params}`,
            method: method ? "GET" : method,
            data : data,
            header: header,
            success: resolve,
            fail: reject
        })
    })
}

function postAct(type,data) {
    return postA(type,data).then(d=>d.data);
}

function getAct(type, params) {
    return act(type, params)
        .then(res => res.data)
}

function getUser(type, params) {
    return user(type, params)
        .then(res => res.data);
}


module.exports = {
    getAct: getAct,
    getUser: getUser,
    postAct: postAct
}
