import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const PostsTable = ({children, posts, onDelete, onEdit}) => {

  const handleDelete = (event, postId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(postId, deleteMode);
    }
  };

  const handleEdit = (event, postId) => {
    if (typeof onEdit === 'function') {
      onEdit(postId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Synopsis</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.map(post => (
          <tr
            key={post.id}
          >
            <td>
              CHKB
            </td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>
              {moment(posts._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, post.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(post._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, post.id, post._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, post.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;