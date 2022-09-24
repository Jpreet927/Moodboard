import React, { useState } from "react";
import { Col, Button, Card, Form, Container, Modal } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";

interface CreatePinModalProps {
    showModal: boolean;
    handleClose: () => void;
    boardCategory: String;
}

const createPinMutation = gql`
    mutation createPin(
        $id: String
        $title: String!
        $description: String!
        $status: String!
        $userId: String
    ) {
        createPin(
            id: $id
            title: $title
            description: $description
            status: $status
            userId: $userId
        ) {
            id
            title
            description
            status
        }
    }
`;

const CreatePinModal: React.FC<CreatePinModalProps> = ({
    showModal,
    handleClose,
    boardCategory,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignTo, setAssignTo] = useState("");

    const [createPin, { data, loading, error }] = useMutation(
        createPinMutation,
        {
            onCompleted: (data) => {
                setTitle("");
                setDescription("");
                setAssignTo("");
            },
        }
    );

    const handlePinCreate = (e) => {
        e.preventDefault();

        createPin({
            variables: {
                title: title,
                description: description,
                status: boardCategory,
            },
        });
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Pin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePinCreate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Assign To</Form.Label>
                        <Form.Select
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                        ></Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePinModal;
