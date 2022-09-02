import React, { useState } from "react";
import {
  CDBBtn,
  CDBProgress,
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBLink,
} from "cdbreact";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import SideNav from "./SideNav/SideNav";
import BalancesOverview from "./AccountBalancesOverview";
import LastVsCurr from "./LastVsCurr";
import TotalBudgetCard from "../BudgetComponents/TotalBudgetCard";

//needs imported budget component for progress bar
import Yearly from "./Yearly";

import "../Dashboard.css";

const Dashboard = ({ open, ready }) => {
  const [components, setComponents] = useState([
    { id: "component-1", content: <BalancesOverview /> },
    { id: "component-2", content: <LastVsCurr /> },
    { id: "component-3", content: <Yearly /> },
    { id: "component-4", content: <TotalBudgetCard /> },
  ]);
  const [columns, setColumns] = useState([
    {
      name: "col-1",
      content: components,
    },
    { name: "col-2", content: [] },
  ]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const col = columns[result.source.droppableId];
    const componentsCopy = [...col.content];
    const [reorderedComponents] = componentsCopy.splice(result.source.index, 1);
    componentsCopy.splice(result.destination.index, 0, reorderedComponents);
    setColumns({
      ...columns,
      [result.source.droppableId]: { ...col, content: componentsCopy },
    });
  };

  return (
    <div className="dashboard d-flex">
      <div>
        <SideNav open={open} ready={ready} />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <div
            style={{
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div className="card-section">
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([id, column]) => (
                  <Droppable
                    droppableId={id}
                    // direction="vertical"
                    // type="column"
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                        }}
                      >
                        {column.content.map((component, index) => (
                          <Draggable
                            draggableId={component.id}
                            key={component.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="d-flex cards-container"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div
                                  className="card-bg w-200 border d-flex h-2000"
                                  style={{
                                    background: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#c9e4ca",
                                  }}
                                >
                                  <i
                                    className="bi bi-list"
                                    {...provided.dragHandleProps}
                                  />
                                  <CDBContainer
                                    style={{
                                      width: "400px",
                                      height: "400px",
                                      margin: "400 -400rem 400 -400rem",
                                    }}
                                    className="p-0"
                                  >
                                    <div>{component.content}</div>
                                  </CDBContainer>
                                </div>
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
          </div>
        </div>
        <CDBTable borderless responsive />
      </div>
    </div>
  );
};

export default Dashboard;
