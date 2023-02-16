import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../components/forms/SignInForm';
import validator from 'validator';
import { isObjEmpty } from '../helpers/helpers';
import { loginUser } from '../actions/authAction';

export default function SignIn() {

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.auth.loggedIn)
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/")
    }
  });

  const login = ({ email, password }) => {
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "El correo electrónico es inválido";
    }

    if (validator.isEmpty(password)) {
      errors.password = "La contraseña esta vacía";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(loginUser({ email, password }))
      .then(response => {

      }).catch(error => {
        //error.response.data.message #capturarlo del back
        setErrors({ auth: "El mail o la contraseña son incorrectos" })
      });
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>

            {errors.auth && <Alert variant='danger'> {errors.auth} </Alert>}

            <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
            <div className='mt-4'>
              <Link to={"/signup"}>No tienes una cuenta? Registrate aquí.</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
