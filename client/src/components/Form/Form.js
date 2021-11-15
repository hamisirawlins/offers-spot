import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography,Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';


const Form =({currentId,setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);

    const [postData, setPostData] = useState({
        title:'',link:'',description:'', tags:'',selectedFile:''
    });
 
    useEffect(()=>{
        if (post) setPostData(post);
    },[post])

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }
    const clear = ()=>{
        setCurrentId(null);
        setPostData({title:'',link:'',description:'', tags:'',selectedFile:''});
    }

    return (
       <Paper className={classes.paper}>
           <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
               <Typography variant="h6">{currentId ? 'Update': 'Create'} An Offer</Typography>
               <TextField name="title" variant="outlined" label="The Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
               <TextField name="link" variant="outlined" label="Link" fullWidth value={postData.link} onChange={(e) => setPostData({ ...postData, link: e.target.value })} />
               <TextField name="description" variant="outlined" label="A Brief Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
               <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
               <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Offer</Button>
               <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear Submission</Button>
               </div>
           </form>
       </Paper>
    )
}

export default Form