import {extend} from 'umi-request'
// import {useRouter} from "vue-router";

const request = extend({
    // prefix: '/api'
});

// const router = useRouter()

// request.interceptors.response.use(async (response, options) => {
//     const data = await response.clone().json() as ({ success?: boolean } | undefined);
//     if (Math.floor(response.status / 100) !== 2 || !data || !data.success) {
//         throw Object.assign(new Error(), {data, response})
//     }
//     return response;
// });

export default request