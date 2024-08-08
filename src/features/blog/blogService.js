import axios from 'axios';
const API_URL = "http://localhost:5000/api/blogs/";

 const createBlog =async (userData)=>{
    const response= await axios.post(API_URL +'schedule', userData,{
        headers:{"Content-Type":"multipart/form-data"}
    });
    return response.data;
}
const createBlogSchedule = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        console.log(userData,'userData')
        return response.data;
    } catch (error) {
        console.error("Error creating blog schedule:", error);
        throw error;
    }
}


const editBlogSchedule =async (userData)=>{
    const {id} = userData
    const response= await axios.put(API_URL+id, userData);
    return response.data;
}

const getBlogById =async (id)=>{
    const response= await axios.get(API_URL+id,);
    return response.data;
}

const getBlog =async ()=>{
    const response= await axios.get(API_URL+"/get");
    return response.data;
}

const getBlogSchedule =async ()=>{
    const response = await axios.get(API_URL );
    return response.data;
}



const blogService ={
    getBlogById,
    getBlogSchedule,
    createBlog,
    createBlogSchedule,
    getBlog,
    editBlogSchedule
 }
 
 export default blogService;