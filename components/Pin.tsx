import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

const updatePinMutation = gql`
    mutation updatePin(
        $id: String!
        $title: String
        $description: String
        $status: String
        $userId: String
    ) {
        updatePin(
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

const deletePinMutation = gql`
    mutation deletePin($id: String!) {
        deletePin(id: $id) {
            id
        }
    }
`;

const Pin: React.FC<Pin> = ({
    title,
    description,
    id,
    boardCategory,
    index,
}) => {
    const [updatePin, { data, loading, error }] =
        useMutation(updatePinMutation);
    const [deletePin] = useMutation(deletePinMutation);
    const [pinTitle, setPinTitle] = useState(title);
    const [pinDescription, setPinDescription] = useState(description);
    const [pinAssignTo, setPinAssignTo] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handlePinUpdate = (e) => {
        e.preventDefault();
        updatePin({
            variables: {
                title: pinTitle,
                description: pinDescription,
                status: boardCategory,
                id: id,
            },
        });
        handleCloseModal();
    };

    const handlePinDelete = () => {
        deletePin({
            variables: {
                id: id,
            },
        });
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                    <Card
                        className="pin-container"
                        onClick={handleShowModal}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Card.Body>{title}</Card.Body>
                    </Card>
                )}
            </Draggable>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a Pin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePinUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={pinTitle}
                                onChange={(e) => setPinTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={pinDescription}
                                onChange={(e) =>
                                    setPinDescription(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select
                                value={pinAssignTo}
                                onChange={(e) => setPinAssignTo(e.target.value)}
                            ></Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                style={{ padding: "2px" }}
                                size="lg"
                                onClick={handlePinDelete}
                            />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Pin;
