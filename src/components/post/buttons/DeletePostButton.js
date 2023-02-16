import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { DELETE_POST_ENDPOINT } from '../../../helpers/endpoints';
import { getUserPosts } from '../../../actions/postAction';
import { toast } from 'react-toastify';

export default function DeletePostButton({ post_id, title }) {

    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: "Eliminar post",
            message: `Estas seguro que deseas eliminar el post ${title}`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => { deletePost() }
                },
                {
                    label: 'No',
                    onClick: () => { return false; }
                }
            ]
        })
    }

    const deletePost = async () => {
        try {
            await axios.delete(`${DELETE_POST_ENDPOINT}/${post_id}`);

            await dispatch(getUserPosts());

            toast.info("El post se ha eliminado", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: "colored",
            });
        } catch (error) {
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: "colored",
            });
        }
    }

    return (
        <Button
            variant='primary'
            size='sm'
            onClick={createAlert}>
            Eliminar
        </Button>
    )
}
