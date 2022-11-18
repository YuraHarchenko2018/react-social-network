import axios from "axios";

const getAxiosInstance = () => {
    let JwtToken = localStorage.getItem('jwtToken') || ''
    return axios.create({
        baseURL: 'http://localhost:9000/',
        timeout: 1000,
        headers: {
            'Authorization': 'Bearer ' + JwtToken
        },
    })
}

export const usersAPI = {
    /**
     * @param {number} currentPage
     * @param {number} pageSize
     */
    async getUsers(currentPage = 1, pageSize = 5) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`)

        let users = response.status === 200 ? response.data[0].users : []
        let totalCount = response.status === 200 ? response.data[0].totalCount : []

        return {
            users, 
            totalCount
        };
    },

    /**
     * @param {number} followId
     */
    async follow(followId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post('follow', {
            followId: followId,
        });
        return response.data;
    },

    /**
     * @param {number} followId
     */
    async unfollow(followId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post('unfollow', {
            followId: followId,
        });
        return response.data;
    }
}

export const profileAPI = {
    /**
     * @param {number} userId
     */
    async getProfile(userId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.get(`profile/${userId}`)
        const profileData = response.data[0]
        return profileData;
    },

    /**
     * @param {string} status
     */
    async setStatus(status) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post('profile/status', { status: status });
        return response.data;
    },
}

export const authAPI = {
    /**
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post(`auth/login`, {
            email,
            password,
        }, {})
        
        let jwtToken = response.status === 201 ? response.data.access_token : ''
        let userId = response.status === 201 ? response.data.metadata.sub : 1

        return {
            jwtToken,
            userId
        }
    },

    /**
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @param {number} age
     */
    async signUp(name, email, password, age) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post(`registration`, {
            name, 
            email,
            password,
            age
        }, {})
        
        let jwtToken = response.status === 201 ? response.data.access_token : ''
        let userId = response.status === 201 ? response.data.metadata.sub : 1

        return {
            jwtToken,
            userId
        }
    },
    
    async me() {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.get(`auth/me`)
        
        let userAuthData = response.status === 200 ? response.data.user : {}
        let isOccurError = response.status === 200 ? false : true
        let isLoginIn    = response.status === 200 ? true : false

        return {
            userId: userAuthData?.userId,
            isOccurError: isOccurError,
            isLoginIn: isLoginIn,
        }
    },
}

export const postsAPI = {
    /**
     * @param {number} userId
     */
    async getUserPosts(userId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.get(`/posts/${userId}`)

        let posts = response.status === 200 ? response.data.posts : []
        return posts;
    },
    
    async getPosts() {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.get(`/posts`)
        let newsPost = response.status === 200 ? response.data : []
        return newsPost;
    },

    /**
     * @param {string} postText
     */
    async addPost(postText) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post('posts', {
            text: postText,
        });
        return response.data;
    },

    /**
     * @param {number} postId
     * @param {string} postText
     */
    async updatePost(postId, postText) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.patch('posts', {
            id: postId,
            text: postText,
        });
        return response.data;
    },

    /**
     * @param {number} postId
     */
    async deletePost(postId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.delete(`posts/${postId}`);
        return response.data;
    },

    /**
     * @param {number} postId
     */
    async likePost(postId) {
        const axiosInstance = getAxiosInstance()
        const response = await axiosInstance.post(`posts/set/like`, { postId });
        return response.data;
    },
}