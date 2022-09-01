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

//needs imported budget component for progress bar
import Yearly from "./Yearly";

import "../Dashboard.css";

const Dashboard = ({ open, ready }) => {
  const [components, setComponents] = useState([
    { content: <BalancesOverview /> },
    { content: <LastVsCurr /> },
    // progress bar
    { content: <Yearly /> },
    // { content: <Daily /> },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const allComponents = [...components];
    const [reorderedComponents] = allComponents.splice(result.source.index, 1);
    allComponents.splice(result.destination.index, 0, reorderedComponents);
    setComponents(allComponents);
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
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <div className="d-flex card-section">
              <div className="cards-container">
                <div
                  className="card-bg w-200 border d-flex flex-column h-2000"
                  style={{ background: "#c9e4ca" }}
                >
                  <div className="p-4 d-flex flex-column h-200">
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="m-0 h5 font-weight-bold text-dark">
                        Traffic by Source
                      </h4>
                      <div className="px-2 py-1 bg-grey rounded-circle"></div>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <CDBContainer
                        style={{
                          width: "250px",
                          height: "300px",
                          margin: "400 -400rem 400 -400rem",
                        }}
                        className="p-0"
                      >
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable
                            droppableId="order"
                            direction="vertical"
                            type="column"
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {components.map((component, index) => (
                                  <Draggable
                                    draggableId={`draggable-${index}`}
                                    key={`draggable-${index}`}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        className="component-container"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        isdragging={snapshot.isdragging}
                                      >
                                        <div>
                                          <i
                                            className="bi bi-list"
                                            {...provided.dragHandleProps}
                                          ></i>
                                          {component.content}
                                        </div>
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </CDBContainer>
                    </div>
                  </div>
                </div>
                <CDBTable borderless responsive></CDBTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
