import { axiosClient } from './axiosClient';

export const PostsApi =  {
    // Lấy ra toàn bộ các bài posts
    async getAll(params) {
        try{
            const response = await axiosClient.get(`/posts?_limit=${params}`);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    },

    // Lấy ra toàn bộ các id của các bài posts
    async getAllId(params) {
        try{
            const response = await axiosClient.get(`/posts?_limit=${params}`);
            const posts = response.data;
            // Cách 1 
            // return posts.map(post => ({
            //     params: {
            //         // id phải khớp với tên file ta khai báo. Ở đây ta khai báo file là [id].jsx nên key là id
            //         // Giá trị bắt buộc phải là string vì nó nằm trên URL nên ta phải ép kiểu từ number vê string
            //         id: `${post.id}`
            //     }
            // }))
            // Cách 2
            return posts.map(post => `/posts/${post.id}`);
        }
        catch(error){
            console.log(error);
        }
    },

    // Lấy ra chi tiết bài post
    async getDetail(id) {
        try{
            const response = await axiosClient.get(`/posts/${id}`);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }
}

