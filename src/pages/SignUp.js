import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';
import validator from 'validator';
import { isObjEmpty } from '../helpers/helpers';
import { loginUser, registerUser } from '../actions/authAction';

export default function SignUp() {

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.auth.loggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/")
        }
    });

    const register = ({ email, password, first_name, last_name }) => {
        const errors = {};
        setErrors(errors);

        if (!validator.isEmail(email)) {
            errors.email = "El correo electrónico es inválido";
        }

        if (!validator.isLength(password, { min: 8, max: 25 })) {
            errors.password = "La contraseña debe tener entre 8 y 25 caracteres";
        }

        if (validator.isEmpty(first_name)) {
            errors.first_name = "El nombre no puede estar vacío";
        }

        if (validator.isEmpty(last_name)) {
            errors.last_name = "El apellido no puede estar vacío";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }

        dispatch(registerUser({ email, password, first_name, last_name }))
            .then(response => {
                dispatch(loginUser({ email, password }));
            }).catch(error => {
                setErrors({ registerError: error.response.data });
            });
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card body>

                        {errors.registerError && <Alert variant='danger'> {errors.registerError} </Alert>}

                        <h3>Registrarte</h3> <hr></hr>
                        <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
                        <div className='mt-4'>
                            <Link to={"/signin"}>Ya tienes una cuenta? Inicia sesión aquí.</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
