import axios from 'axios';

const url = 'http://localhost:5678/posts';

export const fetchPosts= ()=> axios.get(url);
