import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function SignUpForm({ errors, onSubmitCallback }) {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ email, password, first_name, last_name });
    }

    return (
        <Form onSubmit={submitForm}>

            <Row>
                <Col md="6" xs="12" >
                    <Form.Group control="firstName" className='mb-3'>
                        <Form.Control
                            type='text'
                            value={first_name}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="Nombre"
                            isInvalid={errors.first_name}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md="6" xs="12" >
                    <Form.Group control="lastName" className='mb-3'>
                        <Form.Control
                            type='text'
                            value={last_name}
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Apellido"
                            isInvalid={errors.last_name}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group control="email" className='mb-3'>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control="password">
                <Form.Control
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    isInvalid={errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2 mt-3">
                <Button type="submit" variant="primary">
                    Crear Cuenta
                </Button>
            </div>
        </Form>
    )
}
