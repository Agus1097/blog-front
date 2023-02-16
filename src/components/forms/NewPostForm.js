import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { exposuresId } from '../../helpers/exposure';

export default function NewPostForm({ errors, onSubmitCallback, pTitle = "", pContent = "", pExposureId = exposuresId.PUBLIC, pExpirarionTime = 24, textButton = "Crear Post" }) {

    const [title, setTitle] = useState(pTitle);
    const [content, setContent] = useState(pContent);
    const [expiration_time, setExpirationTime] = useState(pExpirarionTime);
    const [exposure_id, setExposureId] = useState(pExposureId);


    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ title, content, expiration_time, exposure_id });
    }

    return (
        <Form onSubmit={submitForm}>
            <Form.Group control="title" className='mb-3'>
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g: Sherlock"
                    isInvalid={errors.title}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Row className='mb-3'>
                <Col md='6' xs='12'>
                    <Form.Group controlId='expirationTime'>
                        <Form.Label>Tiempo de expiración</Form.Label>
                        <Form.Control
                            disabled={exposure_id === exposuresId.PRIVATE}
                            as="select"
                            value={expiration_time}
                            onChange={e => setExpirationTime(e.target.value)}>
                            <option value='1'>1 hora</option>
                            <option value='6'>6 horas</option>
                            <option value='12'>12 horas</option>
                            <option value='24'>1 día</option>
                            <option value='48'>2 días</option>
                            <option value='72'>3 días</option>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.expiration_time}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md='6' xs='12'>
                    <Form.Group controlId='exposureId'>
                        <Form.Label>Tipo de post</Form.Label>
                        <div>
                            <Form.Check
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposure_id === exposuresId.PRIVATE}
                                value={exposuresId.PRIVATE}
                                inline
                                label='Privado'
                                name='exposure_id'
                                type='radio'>
                            </Form.Check>
                            <Form.Check
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposure_id === exposuresId.PUBLIC}
                                value={exposuresId.PUBLIC}
                                inline
                                label='Público'
                                name='exposure_id'
                                type='radio'>
                            </Form.Check>
                        </div>
                        <Form.Control.Feedback type='invalid'>
                            {errors.expiration_time}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group control="content">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={10}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    isInvalid={errors.content}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2 mt-3">
                <Button type="submit" variant="primary">
                    {textButton}
                </Button>
            </div>
        </Form>
    )
}
