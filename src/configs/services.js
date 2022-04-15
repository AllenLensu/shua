import request from "umi-request";

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

export async function findStarTags() {
    return await request(`/api/menu/star`, {
        methods: 'GET'
    })
}

export async function register(avatar) {
    let requestBody = new FormData();
    requestBody.append('file', avatar);
    return await request.post(`/api/reg/avatar`, {
        requestType: 'form',
        data: requestBody
    })
}