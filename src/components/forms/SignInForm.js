import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignInForm({ errors, onSubmitCallback }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ email, password });
    }

    return (
        <Form onSubmit={submitForm}>
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
                    Iniciar Sesión
                </Button>
            </div>
        </Form>
    )
}
