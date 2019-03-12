/**
 * Created by jophy on 2017/7/3.
 */

// let jwt = require('jwt-simple')
// let EnvConfig = require('@/../config')
// let Config = process.env.NODE_ENV === 'production'
//   ? EnvConfig.build.env
//   : EnvConfig.dev.env

// promise ajax
exports.getAjaxPromise = function (option) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: option.url,
            type: option.type || 'get',
            async: option.async || true,
            data: option.data || '',
            dataType: option.dataType || 'json',
            contentType: 'application/json',
            timeout: option.timeout || 30000,
            xhrFields: {withCredentials: true},
            headers: option.headers || {},
            beforeSend: function (request) {
                request.setRequestHeader("x-authorization-token", option.token || '')
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}

// object is empty
exports.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}


exports.objReverse = function (json, valueIsInt = 0) {
    var ret = {};
    for (var key in json) {
        if (valueIsInt) {
            ret[json[key]] = parseInt(key)
        } else {
            ret[json[key]] = key
        }
    }
    return ret;
}


exports.arrayObjSort = function (order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

// timestamp to datetime
exports.timeConverter = function (UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    //var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    date < 10 ? date = '0' + date : ''
    hour < 10 ? hour = '0' + hour : ''
    min < 10 ? min = '0' + min : ''
    sec < 10 ? sec = '0' + sec : ''
    var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

exports.timeConverterToDate = function (UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '-' + month + '-' + date;
    return time;
}

// exports.generateToken = function(cookieObj){
//   let jwt = require('jwt-simple')
//   SecretOrPrivateKey = 'JophyYao'
//   Authorization = 'HS384'
//   Key = 'Jophy'
//
//   let tm = new Date().getTime()
//
//   let username = ''
//   try{
//     username = cookieObj.get('name') || ''
//   }catch(err){
//     return ''
//   }
//
//   let uid = cookieObj.get('uid') || ''
//   let bu_list = cookieObj.get('bu_list')
//   let group = ''
//   let department = ''
//   // if (bu_list && bu_list.length > 0) {
//   //   group = cookieObj.get('bu_list')[0]['name']
//   //   department = cookieObj.get('bu_list')[1]['name']
//   // }
//   group = cookieObj.get('group')
//   department = cookieObj.get('department')
//
//   let payload = {
//     'username': username,
//     'uid': uid,
//     'timestamp': tm,
//     'group': group,
//     'department': department,
//     'key': Key,
//     'url': window.location.href
//   };
//
//   let token = jwt.encode(payload, SecretOrPrivateKey, Authorization)
//   return token
// }

// generate api token
exports.generateToken = function () {
    let self = this
    SecretOrPrivateKey = 'JophyYao'
    Authorization = 'HS384'
    Key = 'Jophy'

    let tm = new Date().getTime()

    let decoded = self.webtokenDecode(localStorage.getItem('DcimWebToken'))

    let username = decoded.username
    let uid = decoded.uid
    let group = decoded.group
    let department = decoded.department

    let payload = {
        'username': username,
        'uid': uid,
        'timestamp': tm,
        'group': group,
        'department': department,
        'key': Key,
        'url': window.location.href   //生成token时的url
    };

    let token = jwt.encode(payload, SecretOrPrivateKey, Authorization)
    return token
}


exports.webtokenEncode = function (options) {
    let Authorization = 'HS384'
    let SecretOrPrivateKey = 'JophyYao'

    let tm = new Date().getTime()

    let username = options.name
    let uid = options.uid
    let group = options.group
    let department = options.department

    let payload = {
        'username': username,
        'uid': uid,
        'timestamp': tm,
        'group': group,
        'department': department
    };

    let token = jwt.encode(payload, SecretOrPrivateKey, Authorization)
    return token

}

exports.webtokenDecode = function (token) {
    let Authorization = 'HS384'
    let Secret = 'JophyYao'
    let decoded = jwt.decode(token, Secret, true, Authorization) || {}
    return decoded
}


exports.setLocalStorage = function () {
    let self = this
    let authPromise = new Promise(function (resolve, reject) {
        $.ajax({
            type: 'get',
            //url: `${Config.APIHOST}/get/auth`,
            url: `http://dcim.elenet.me/get/auth`,
            dataType: 'json',
            async: false,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            success: function (data) {
                resolve(data)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = `http://passport.elenet.me/authorize?client=nginx&next=/&state=abcd&redirect=${Config.LOGIN}/_auth/redirect`
            }
        })
    })

    authPromise.then(function (data) {
        if (!data.hasOwnProperty('uid') && Config.ENV === 'dev') {   // env is dev
            data = {
                uid: "zhijie.yao@ele.me",
                type: 0,
                name: "姚志捷",
                mobile: "18001666775",
                secret: null,
                owner: {
                    id: 3226886,
                    name: "姚志捷",
                    number: "E063946",
                    ssoId: 61425
                },
                roles: [
                    {
                        id: 4,
                        namespace: "cmdb",
                        name: "entity-admin",
                        desc: "实体管理权限"
                    }
                ],
                apps: [],
                expireAt: 1504422337898,
                desc: null,
                owner_uid: "zhijie.yao@ele.me",
                bu_list: [
                    {
                        id: 2163,
                        name: "基础运维组",
                        bu_type_id: 1350,
                        manager_id: 23384,
                        manager_name: "徐巍",
                        parent_id: 1209,
                        status: 1,
                        created_at: 1443062023000,
                        updated_at: 1469601627000
                    },
                    {
                        id: 1209,
                        name: "技术运营部",
                        bu_type_id: 1350,
                        manager_id: 14767,
                        manager_name: "程炎岭",
                        parent_id: 5334,
                        status: 1,
                        created_at: 1431422951000,
                        updated_at: 1502444407000
                    },
                    {
                        id: 5334,
                        name: "CI核心基础设施部",
                        bu_type_id: 1350,
                        manager_id: 58614,
                        manager_name: "王胤",
                        parent_id: 111,
                        status: 1,
                        created_at: 1489028421000,
                        updated_at: 1489028421000
                    },
                    {
                        id: 111,
                        name: "技术&创新中心",
                        bu_type_id: 1350,
                        manager_id: 4787,
                        manager_name: "张雪峰",
                        parent_id: 5,
                        status: 1,
                        created_at: 1431421878000,
                        updated_at: 1469601700000
                    }
                ]
            }
        }
        //console.log('reset local storage', data['status'], data)

        if (!data.hasOwnProperty('uid') || !data['uid']) {
            window.location.href = `http://passport.elenet.me/authorize?client=nginx&next=/&state=abcd&redirect=${Config.LOGIN}/_auth/redirect`
        }

        localStorage.setItem('CreateTime', parseInt(new Date().getTime() / 1000))
        let token = self.webtokenEncode({
            'uid': data['uid'],
            'name': data['name'],
            'group': '',
            'department': ''
        })
        localStorage.setItem('DcimWebToken', token)

    })
}

// 获取页面权限列表
exports.getPageAuthorize = function (pagename) {
    let self = this
    let authorize = self.getAjaxPromise({
        url: `${Config.APIHOST}/get/authorize/${pagename}`,
        token: self.generateToken(),
        async: false
    })
    authorize.then(function (data) {
        //return data
    })
    return authorize
}

//记录用户访问
exports.saveWebUserAccess = function (url, pagename) {
    let self = this
    let access = self.getAjaxPromise({
        url: `${Config.APIHOST}/dcim/common/save/web/access/history`,
        type: 'POST',
        token: self.generateToken(),
        data: {
            'url': url,
            'pagename': pagename
        }
    })
    access.then(function (data) {

    })
}

exports.readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

