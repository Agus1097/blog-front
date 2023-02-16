import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { getUserPosts } from '../actions/postAction';
import NewPostForm from '../components/forms/NewPostForm';
import { POST_DETAILS_ENDPOINT, UPDATE_POST_ENDPOINT } from '../helpers/endpoints';
import { exposuresId } from '../helpers/exposure';
import { isObjEmpty } from '../helpers/helpers';

export default function EditPost() {

    const { post_id } = useParams();
    const [errors, setErrors] = useState({});
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${post_id}`)
            .then(response => {
                setPost(response.data);
            }).catch(error => {
                navigate("/")
            })
    }, [navigate, post_id]);

    const editPost = async ({ title, content, expiration_time, exposure_id }) => {
        const errors = {};
        setErrors(errors);

        if (validator.isEmpty(title)) {
            errors.title = "El título esta vacío";
        }

        if (validator.isEmpty(content)) {
            errors.content = "El contenido esta vacío";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }

        expiration_time = exposure_id === exposuresId.PRIVATE ? 0 : expiration_time;

        try {
            const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post_id}`, { title, content, expiration_time, exposure_id });
            await dispatch(getUserPosts());
            toast.info("El post se ha modificado correctamente", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: "colored",
            });
            navigate(`/post/${response.data.post_id}`)
        } catch (error) {
            setErrors({ editPost: error.response.data });
        }
    }

    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col sm="12" md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 2 }}>
                    <Card body>

                        {errors.editPost && <Alert variant='danger'> {errors.editPost} </Alert>}

                        <h3>Editar Post</h3><hr></hr>
                        {post && <NewPostForm
                        errors={errors}
                        onSubmitCallback={editPost}
                        pTitle={post.title}
                        pContent={post.content}
                        pExpirarionTime={post.expiration_time}
                        pExposureId={post.exposure_id}
                        textButton="Editar Post">
                        </NewPostForm>}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
