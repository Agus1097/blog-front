import moment from 'moment';
import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { exposures } from '../../helpers/exposure';
import DeletePostButton from './buttons/DeletePostButton';

export default function Post({ post, renderControls }) {
  return (
    <Card className='mb-4'>
      {renderControls &&
        <Card.Header className='d-flex justify-content-between'>
          <div>
            <Badge bg='secondary' className='me-2'> {post.exposure.type} </Badge>
            {post.expired && post.exposure.type === exposures.PUBLIC && <Badge bg="danger"> Expirado </Badge>}
          </div>
          <div>
            <Button variant='primary' size='sm' className='me-2'  as={NavLink} to={`/editpost/${post.post_id}`}>Editar</Button>
            <DeletePostButton post_id={post.post_id} title={post.title}></DeletePostButton>
          </div>
        </Card.Header>
      }
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${post.post_id}`}> {post.title} </Link>
        </Card.Title>
        <Card.Text>
          Creado por {post.user.first_name}, {moment(post.created_at).fromNow()}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
