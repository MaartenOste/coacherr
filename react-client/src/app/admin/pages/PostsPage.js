import React, { } from 'react';
import { useHistory, Link } from 'react-router-dom';

import * as Routes from '../../routes';
import { PostList } from '../../admin/components';

const PostsPage = ({ children }) => {
  let history = useHistory();

  const handleEdit = (postId) => {
    history.push(Routes.BACKOFFICE_POSTS_EDIT.replace(':id', postId));
  };

  return (
    <div className="container">
      <div className="row">
        <div class="col-12">
          <Link className="btn btn-primary" to={Routes.BACKOFFICE_POSTS_CREATE}>Create Post</Link>
        </div>
        <PostList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1} onEdit={handleEdit}  />
      </div>
    </div>
  )
};
export default PostsPage;