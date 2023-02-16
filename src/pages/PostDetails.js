import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints';
import '../styles/Jumbotron.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { downloadTextAsFile } from '../helpers/helpers';

export default function PostDetails() {

    const { post_id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${post_id}`)
            .then(response => {
                setPost(response.data);
            }).catch(error => {
                navigate("/")
            })
    }, [navigate, post_id]);

    return (
        <div className='pb-4'>
            {post && (
                <React.Fragment>
                    <div className='jumbotron'>
                        <h1>{post.title}</h1>
                        <p>Creado por {post.user.first_name}, {moment(post.created_at).fromNow()}</p>
                    </div>
                    <Card className='mb-4'>
                        <Card.Header>
                            <Button
                                variant="primary"
                                size="sm"
                                className='me-2'
                                onClick={() => {
                                    downloadTextAsFile(post.title, post.content)
                                }}>Descargar</Button>
                            <CopyToClipboard
                                onCopy={() => {
                                    toast.info("Copiado al portapapeles", {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose: 2000,
                                        theme: "colored",
                                    });
                                }}
                                text={post.content}
                            >
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {

                                    }}>Copiar al portapapeles
                                </Button>
                            </CopyToClipboard>
                        </Card.Header>
                        <Card.Body>
                            <SyntaxHighlighter showLineNumbers={true}>
                                {post.content}
                            </SyntaxHighlighter>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            )}
        </div>
    )
}
