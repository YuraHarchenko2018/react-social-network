import axios from 'axios'

export const getAxiosInstance = () => {
  const JwtToken = localStorage.getItem('jwtToken') || ''
  return axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${JwtToken}`,
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

    const users = response.status === 200 ? response.data[0].users : []
    const totalCount = response.status === 200 ? response.data[0].totalCount : []

    return {
      users,
      totalCount,
    }
  },

  async searchUsers(searchParam) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`/users/search?search=${searchParam}`)

    const users = response.status === 200 ? response.data[0].users : []
    return users
  },

  async searchFriends(searchParam) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`/users/friends/search?search=${searchParam}`)

    const users = response.status === 200 ? response.data[0].users : []
    return users
  },

  /**
     * @param {number} currentPage
     * @param {number} pageSize
     */
  async getFriends(currentPage = 1, pageSize = 10) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`/users/friends?page=${currentPage}&count=${pageSize}`)

    const users = response.status === 200 ? response.data.users : []
    const totalCount = response.status === 200 ? response.data.totalCount : []

    return {
      users,
      totalCount,
    }
  },

  /**
     * @param {number} followId
     */
  async follow(followId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('follow', {
      followId,
    })
    return response.data
  },

  /**
     * @param {number} followId
     */
  async unfollow(followId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('unfollow', {
      followId,
    })
    return response.data
  },
}

export const profileAPI = {
  /**
   * @param {number} userId
   */
  async getProfile(userId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`profile/${userId}`)
    const profileData = response.data[0]
    return profileData
  },

  /**
     * @param {object} file
     * @param {string} name
     * @param {string} age
     */
  async updateUserInfo(file, name, age) {
    const formData = new FormData()

    formData.append('avatar', file)
    formData.append('userName', name)
    formData.append('userAge', age)

    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('users/updateInfo', formData)

    const updateResult = response.data
    return updateResult
  },

  /**
     * @param {string} status
     */
  async setStatus(status) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('profile/status', { status })
    return response.data
  },
}

export const authAPI = {
  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('auth/login', {
      email,
      password,
    }, {})

    const jwtToken = response.status === 201 ? response.data.access_token : ''
    const userId = response.status === 201 ? response.data.metadata.sub : 1

    return {
      jwtToken,
      userId,
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
    const response = await axiosInstance.post('registration', {
      name,
      email,
      password,
      age,
    }, {})

    const jwtToken = response.status === 201 ? response.data.access_token : ''
    const userId = response.status === 201 ? response.data.metadata.sub : 1

    return {
      jwtToken,
      userId,
    }
  },

  async me() {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get('auth/me')

    const userAuthData = response.status === 200 ? response.data.user : {}
    const isOccurError = response.status !== 200
    const isLoginIn = response.status === 200

    return {
      userId: userAuthData?.userId,
      isOccurError,
      isLoginIn,
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

    const posts = response.status === 200 ? response.data.posts : []
    return posts
  },

  async getPostsAmount() {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get('/posts/amount')
    const newsAmount = response.status === 200 ? response.data.postsTotalCount : 0
    return newsAmount
  },

  async getPosts(pageId = 1, perPage = 5) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`/posts?page=${pageId}&perPage=${perPage}`)
    const newsPost = response.status === 200 ? response.data : []
    return newsPost
  },

  /**
     * @param {string} postText
     */
  async addPost(postText) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('posts', {
      text: postText,
    })
    return response.data
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
    })
    return response.data
  },

  /**
     * @param {number} postId
     */
  async deletePost(postId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.delete(`posts/${postId}`)
    return response.data
  },

  /**
     * @param {number} postId
     */
  async likePost(postId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('posts/set/like', { postId })
    return response.data
  },
}
