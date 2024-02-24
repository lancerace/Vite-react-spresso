import axios from "axios"


export const getPosts = async () => (axios.get('https://jsonplaceholder.typicode.com/posts'));


