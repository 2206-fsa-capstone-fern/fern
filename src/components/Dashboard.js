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

import _ from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import SideNav from "./SideNav/SideNav";
import BalancesOverview from "./AccountBalancesOverview";
import LastVsCurr from "./LastVsCurr";
import TotalBudgetCard from "../BudgetComponents/TotalBudgetCard";

//needs imported budget component for progress bar
import Yearly from "./Yearly";

import "../Dashboard.css";

const comp1 = {
  id: "comp-1",
  name: "1",
  component: <BalancesOverview />,
};

const comp2 = {
  id: "comp-2",
  name: "1",
  component: <LastVsCurr />,
};

const comp3 = {
  id: "comp-3",
  name: "1",
  component: <Yearly />,
};

const comp4 = {
  id: "comp-4",
  name: "1",
  component: <TotalBudgetCard />,
};

const Dashboard = ({ open, ready }) => {
  const [columns, setColumns] = useState({
    "component-1": { name: "1", content: [comp1, comp2] },
    "component-2": { name: "1", content: [comp3, comp4] },
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }

    const startCol = columns[result.source.droppableId];
    const startComponents = [...startCol.content];
    const endCol = columns[result.destination.droppableId];
    const endComponents = [...endCol.content];
    const [reorderedComponents] = startComponents.splice(
      result.source.index,
      1
    );
    endComponents.splice(result.destination.index, 0, reorderedComponents);
    setColumns({
      ...columns,
      [result.source.droppableId]: { ...startCol, content: startComponents },
      [result.destination.droppableId]: { ...endCol, content: endComponents },
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
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="card-section">
              <DragDropContext onDragEnd={onDragEnd}>
                {_.map(columns, (column, key) => (
                  <div className="column" key={key}>
                    <h3>{column.name}</h3>
                    <Droppable droppableId={key}>
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
                                      <div>{component.component}</div>
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
                  </div>
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
