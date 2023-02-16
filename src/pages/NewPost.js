import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { getUserPosts } from '../actions/postAction';
import NewPostForm from '../components/forms/NewPostForm';
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints';
import { exposuresId } from '../helpers/exposure';
import { isObjEmpty } from '../helpers/helpers';

export default function NewPost() {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createPost = async ({ title, content, expiration_time, exposure_id }) => {
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
            const response = await axios.post(CREATE_POST_ENDPOINT, { title, content, expiration_time, exposure_id });
            await dispatch(getUserPosts());
            toast.info("El post se ha creado correctamente", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: "colored",
            });
            navigate(`/post/${response.data.post_id}`)
        } catch (error) {
            setErrors({ newPostError: error.response.data });
        }
    }

    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col sm="12" md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 2 }}>
                    <Card body>

                        {errors.newPostError && <Alert variant='danger'> {errors.newPostError} </Alert>}

                        <h3>Crear Post</h3><hr></hr>
                        <NewPostForm errors={errors} onSubmitCallback={createPost}></NewPostForm>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
