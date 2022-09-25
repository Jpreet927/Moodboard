import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Row } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import Pin from "../components/Pin";
import BoardSection from "../components/BoardSection";

const allPinsQuery = gql`
    query {
        pins {
            id
            title
            description
            status
        }
    }
`;

const updatePinMutation = gql`
    mutation updatePin(
        $id: String!
        $title: String
        $description: String
        $status: String!
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

const Board = () => {
    const [pins, setPins] = useState([]);
    const { data, loading, error } = useQuery(allPinsQuery, {
        onCompleted: (data) => {
            console.log(data);
            setPins(data);
        },
    });
    const [updatePin] = useMutation(updatePinMutation);

    const sections: Array<string> = [
        "Backlog",
        "In-Progress",
        "Review",
        "Done",
    ];

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;

        updatePin({
            variables: {
                id: draggableId,
                status: destination.droppableId,
            },
        });

        const updatedPins =
            pins &&
            pins.pins.map((pin: any) => {
                if (pin.id === draggableId) {
                    return {
                        ...pin,
                        status: destination.droppableId,
                    };
                } else {
                    return pin;
                }
            });

        setPins(updatedPins);
    };

    if (error) return <p>{`Error: ${error}`}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="pt-3 h-100 d-flex flex-column">
            <Row>
                <h1>Project Title</h1>
            </Row>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-container d-flex flex-row flex-grow-1">
                    {sections.map((section: string, index: number) => {
                        let filtered: Array<Pin> = data
                            ? data.pins.filter(
                                  (pin: Pin) => pin.status === section
                              )
                            : [];
                        return (
                            <BoardSection
                                key={index}
                                title={section}
                                pins={filtered}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;
