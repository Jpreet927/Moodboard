import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";
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

const Board = () => {
    const { data, loading, error } = useQuery(allPinsQuery, {
        onCompleted: (data) => console.log(data),
    });

    const sections: Array<String> = [
        "Backlog",
        "In-Progress",
        "Review",
        "Done",
    ];

    if (error) return <p>{`Error: ${error}`}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="pt-3 h-100 d-flex flex-column">
            <Row>
                <h1>Project Title</h1>
            </Row>
            <div className="board-container d-flex flex-row flex-grow-1">
                {/* {data &&
                    data.pins.map((pin) => (
                        <Pin
                            title={pin.title}
                            description={pin.description}
                            id={pin.id}
                            key={pin.id}
                        />
                    ))} */}
                {sections.map((section: String, index: number) => {
                    let filtered: Array<Pin> = data
                        ? data.pins.filter((pin: Pin) => pin.status === section)
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
        </div>
    );
};

export default Board;
