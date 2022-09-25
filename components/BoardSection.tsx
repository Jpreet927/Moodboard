import React, { useState } from "react";
import Pin from "./Pin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Button, Card, Form, Container } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import CreatePinModal from "./CreatePinModal";

interface BoardSectionProps {
    title: string;
    pins: Array<Pin>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, pins }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Col md={3} className="d-flex flex-column p-2">
                <div className="board-section-header d-flex flex-row align-items-center">
                    <h3 className="me-auto">{title}</h3>
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: "#6f7782" }}
                    />
                </div>
                <Droppable droppableId={title} key={title}>
                    {(provided) => (
                        <Container
                            className="p-0 d-flex flex-column h-100"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {pins &&
                                pins.map((pin: Pin, index: number) => (
                                    <Pin
                                        title={pin.title}
                                        description={pin.description}
                                        id={pin.id}
                                        key={pin.id}
                                        boardCategory={title}
                                        index={index}
                                    ></Pin>
                                ))}
                            {pins.length > 0 && (
                                <Button
                                    className="add-wrapper"
                                    onClick={handleOpenModal}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ padding: "2px" }}
                                    />
                                    Add Task
                                </Button>
                            )}
                            {pins.length === 0 && (
                                <div className="is-empty">
                                    <Button
                                        className="add-wrapper"
                                        onClick={handleOpenModal}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            style={{ padding: "2px" }}
                                        />
                                        Add Task
                                    </Button>
                                </div>
                            )}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </Col>
            <CreatePinModal
                showModal={showModal}
                handleClose={handleCloseModal}
                boardCategory={title}
            />
        </>
    );
};

export default BoardSection;
