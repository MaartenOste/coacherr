import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { PostEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';

const PostEditPage = ({ children }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const { editPostViewModel, updatePost } = useApi();
  const [ postViewModel, setPostViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchPostViewModel = async () => {        
      const data = await editPostViewModel(id);
      setPostViewModel(data);
    }

    fetchPostViewModel();    
  }, [editPostViewModel, id]);

  const handleOnUpdate = async (post) => {
    const updatedPost = await updatePost(post);
    addToast({
      title: `Administration: Update Post`,
      message: `Successfully updated an existing post with id: ${updatedPost._id} and title: ${updatedPost.title}`
    });
    history.push(Routes.BACKOFFICE_POSTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <PostEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-edit" viewModel={postViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default PostEditPage;