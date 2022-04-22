import request from "./request";
import {now} from "moment";

export async function accountVerify(account) {
    let requestBody = new FormData();
    requestBody.append("username", account.username);
    requestBody.append("password", account.password);

    let response = await fetch('/api/login', {
        body: requestBody,
        method: "POST"
    });
    return await response.json();
}

export async function registerDirectVerify(username, password) {
    let requestBody = new FormData();
    requestBody.append("username", username);
    requestBody.append("password", password);
    let response = await fetch('/api/login', {
        body: requestBody,
        method: "POST"
    });
    return await response.json();
}

export async function logout() {
    return await request(`/api/logout`, {
        methods: 'POST'
    })
}

export async function findPosts(id) {
    let postUrl = `/api/content/`
    if (id === undefined || id === 0) {
        postUrl += `global`
    } else {
        postUrl += `type?id=` + id
    }
    return await request(postUrl, {
        methods: 'GET'
    })
}

export async function findAllUser() {
    return await request(`/api/manage/allUser`, {
        methods: 'GET'
    })
}

export async function findUserInfo() {
    return await request(`/api/account/info`, {
        methods: 'GET'
    })
}

export async function checkAuthentication() {
    return await request(`/api/account/test`, {
        methods: 'GET'
    })
}

export async function findMenusWithChildren() {
    return await request(`/api/menu/global`, {
        methods: 'GET'
    })
}

export async function findTags() {
    return await request(`/api/menu/all`, {
        methods: 'GET'
    })
}

export async function register(requestBody) {
    return await request.post(`/api/reg`, {
        requestType: 'form',
        data: requestBody
    })
}

export async function findUserAccountInfo() {
    return await request(`/api/account/profile`, {
        methods: 'GET'
    })
}

export async function addPost(post, types) {
    let requestBody = new FormData();
    const type = types[1] ?? types[0]
    let typeEx = types[0]
    if (type === types[0]) {
        typeEx = 0
    }
    console.log(type, typeEx)
    requestBody.append("post", post);
    requestBody.append("type", type);
    requestBody.append("type_ex", typeEx);
    //选择Instant
    requestBody.append("sendTime", now())
    return await request.post(`/api/content/add`, {
        requestType: 'form',
        data: requestBody
    })
}

export async function follow(followed_username) {
    const url = `/api/opt/` + followed_username + `/follow`
    return await request(url, {
        methods: 'GET'
    })
}

export async function unfollow(followed_username) {
    const url = `/api/opt/` + followed_username + `/unfollow`
    return await request(url, {
        methods: 'GET'
    })
}

export async function getFollowInfo(followed_username) {
    const url = `/api/content/` + followed_username + `/getFollowInfo`
    return await request(url, {
        methods: 'GET'
    })
}

export async function favor(post_id) {
    const url = `/api/opt/` + post_id + `/favor`
    return await request(url, {
        methods: 'GET'
    })
}

export async function unfavor(post_id) {
    const url = `/api/opt/` + post_id + `/unfavor`
    return await request(url, {
        methods: 'GET'
    })
}

export async function getFavorInfo(post_id) {
    const url = `/api/content/` + post_id + `/getFavorInfo`
    return await request(url, {
        methods: 'GET'
    })
}

export async function thumbsup(post_id) {
    const url = `/api/opt/` + post_id + `/thumbsup`
    return await request(url, {
        methods: 'GET'
    })
}

export async function thumbsdown(post_id) {
    const url = `/api/opt/` + post_id + `/thumbsdown`
    return await request(url, {
        methods: 'GET'
    })
}

export async function getThumbsInfo(post_id) {
    const url = `/api/content/` + post_id + `/getThumbsInfo`
    return await request(url, {
        methods: 'GET'
    })
}

export async function findStarPost() {
    return await request(`/api/content/star`, {
        methods: 'GET'
    })
}

export async function getWebSocket() {
    let webSocket = new WebSocket(/*[[${webSocketUrl}]]*/ 'ws://localhost:8080/chat');
    /**
     * 当服务端打开连接
     */
    webSocket.onopen = function (event) {
        console.log('WebSocket打开连接');
    };

    /**
     * 当服务端发来消息：1.广播消息 2.更新在线人数
     */
    webSocket.onmessage = function (event) {
        console.log('WebSocket收到消息：%c' + event.data, 'color:green');
        //获取服务端消息
        let message = JSON.parse(event.data) || {};
        let $messageContainer = $('.message-container');
        //喉咙发炎
        if (message.type === 'SPEAK') {
            $messageContainer.append(
                '<div class="mdui-card" style="margin: 10px 0;">' +
                '<div class="mdui-card-primary">' +
                '<div class="mdui-card-content message-content">' + message.username + "：" + message.msg + '</div>' +
                '</div></div>');
        }
        $('.chat-num').text(message.onlineCount);
        //防止刷屏
        let $cards = $messageContainer.children('.mdui-card:visible').toArray();
        if ($cards.length > 5) {
            $cards.forEach(function (item, index) {
                index < $cards.length - 5 && $(item).slideUp('fast');
            });
        }
    };

    /**
     * 关闭连接
     */
    webSocket.onclose = function (event) {
        console.log('WebSocket关闭连接');
    };

    /**
     * 通信失败
     */
    webSocket.onerror = function (event) {
        console.log('WebSocket发生异常');
    };
    return webSocket;
}