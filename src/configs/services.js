import request from "./request";
import {now} from "moment";

export async function getShortUrl(longUrl) {
    let requestBody = new FormData();
    requestBody.append("url", longUrl)
    return await request.post(`/api/s/c`, {
        requestType: 'form',
        data: requestBody
    })
}

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
    if (id === undefined || id === 0 || id === '0') {
        postUrl += `global`
    } else {
        postUrl += `type?id=` + id
    }
    return await request(postUrl, {
        methods: 'GET'
    })
}

export async function findPostsTime(id) {
    let postUrl = `/api/content/`
    if (id === undefined || id === 0 || id === '0') {
        postUrl += `global/time`
    } else {
        postUrl += `type/time?id=` + id
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

export async function saveTagStatus(tagStates) {
    let requestBody = new FormData();
    requestBody.append('tagStates', tagStates)
    return await request.post(`/api/opt/starTags`, {
        requestType: 'form',
        data: requestBody
    })
}

export async function tagStatus() {
    return await request(`/api/opt/staredTags`, {
        methods: 'GET'
    })
}

export async function addComment(requestBody) {
    return await request.post(`/api/content/addComment`, {
        requestType: 'form',
        data: requestBody
    })
}

export async function getCommentNum(id) {
    return await request(`/api/content/getCommentNum/` + id, {
        methods: 'GET'
    })
}

export async function getComment(id) {
    return await request(`/api/content/getComment/` + id, {
        methods: 'GET'
    })
}

export async function findPost(postId) {
    return await request(`/api/content/detail/` + postId, {
        methods: 'GET'
    })
}

export async function findAvatar(uid) {
    return await request(`/api/content/` + uid + `/avatar`, {
        methods: 'GET'
    })
}

export async function changeProfile(requestBody) {
    return await request.post(`/api/account/changeProfile`, {
        requestType: 'form',
        data: requestBody
    })
}

export async function getBanner() {
    return await request(`/api/zone/banner`, {
        methods: 'GET'
    })
}

export async function ccGetHistory(uid) {
    return await request(`/api/zone/` + uid + `/ccHistory`, {
        methods: 'GET'
    })
}

export async function cfGetHistory() {
    return await request(`/api/zone/cfHistory`, {
        methods: 'GET'
    })
}

export async function ctGetHistory() {
    return await request(`/api/zone/ctHistory`, {
        methods: 'GET'
    })
}

export async function postHistory() {
    return await request(`/api/zone/pHistory`, {
        methods: 'GET'
    })
}

export async function getPostNum() {
    return await request(`/api/zone/getPostNum`, {
        methods: 'GET'
    })
}

export async function getTodayPostNum() {
    return await request(`/api/zone/getTodayPostNum`, {
        methods: 'GET'
    })
}

export async function getFollowNum() {
    return await request(`/api/zone/getFollowNum`, {
        methods: 'GET'
    })
}

export async function getTodayFollowNum() {
    return await request(`/api/zone/getTodayFollowNum`, {
        methods: 'GET'
    })
}

export async function getFollowedNum() {
    return await request(`/api/zone/getFollowedNum`, {
        methods: 'GET'
    })
}

export async function getTodayFollowedNum() {
    return await request(`/api/zone/getTodayFollowedNum`, {
        methods: 'GET'
    })
}

export async function deletePost(post_id) {
    return await request(`/api/opt/` + post_id + `/deletePost`, {
        methods: 'GET'
    })
}

export async function getUserInfoZone(post_id, uid) {
    return await request(`/api/user/` + uid + `/` + post_id + `/info`, {
        methods: 'GET'
    })
}

export async function findUserInfoZone(uid) {
    return await request(`/api/user/` + uid + `/info`, {
        methods: 'GET'
    })
}

export async function getUserPostZone(uid) {
    return await request(`/api/user/` + uid + `/post`, {
        methods: 'GET'
    })
}

export async function banUser(uuid) {
    return await request(`/api/manage/1/` + uuid + `/ban`, {
        methods: 'GET'
    })
}

export async function unbanUser(uuid) {
    return await request(`/api/manage/0/` + uuid + `/ban`, {
        methods: 'GET'
    })
}

export async function delUser(uuid) {
    return await request(`/api/manage/` + uuid + `/del`, {
        methods: 'GET'
    })
}

export async function banPost(id) {
    return await request(`/api/manage/1/` + id + `/banpost`, {
        methods: 'GET'
    })
}

export async function unbanPost(id) {
    return await request(`/api/manage/0/` + id + `/banpost`, {
        methods: 'GET'
    })
}

export async function getAllPost() {
    return await request(`/api/manage/allPost`, {
        methods: 'GET'
    })
}

export async function forwardPost(id, uid) {
    return await request(`/api/content/` + id + `/` + uid + `/forward`, {
        methods: 'GET'
    })
}

export async function uidUni(uid) {
    return await request(`/api/verifyUID/` + uid, {
        methods: 'GET'
    })
}

export async function deleteUser() {
    return await request(`/api/user/cancellate`, {
        methods: 'GET'
    })
}

export async function updatePass(data) {
    return await request.post(`/api/account/changePass`, {
        requestType: 'form',
        data: data
    })
}

export async function getMesList() {
    return await request(`/api/mes/list`, {
        methods: 'GET'
    })
}

export async function dumpHelper() {
    return await request(`/api/mes/dumpHelper`, {
        methods: 'GET'
    })
}

export async function getChatList() {
    return await request(`/api/mes/chatlist`, {
        methods: 'GET'
    })
}

export async function addChatList(uid) {
    return await request(`/api/mes/`+uid+`/addchat`, {
        methods: 'GET'
    })
}

export async function addMessage(data) {
    return await request.post(`/api/mes/addmes`, {
        requestType: 'form',
        data: data
    })
}

export async function findMessage(uid) {
    return await request(`/api/mes/`+uid+`/findmes`, {
        methods: 'GET'
    })
}

export async function getUUID(uid) {
    return await request(`/api/mes/`+uid+`/getuuid`, {
        methods: 'GET'
    })
}

export async function getFollow() {
    return await request(`/api/zone/getFollow`, {
        methods: 'GET'
    })
}

export async function getFollowed() {
    return await request(`/api/zone/getFollowed`, {
        methods: 'GET'
    })
}