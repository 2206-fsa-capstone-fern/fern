import React, { useState } from "react";
import { Box } from "grommet";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  Sortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./DashboardItems";

import { MDBContainer } from "mdbreact";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import SideNav from "./SideNav/SideNav";
import BalancesOverview from "./AccountBalancesOverview";
import LastVsCurr from "./LastVsCurr";
import TotalBudgetCard from "../BudgetComponents/TotalBudgetCard";
import Yearly from "./Yearly";

import "../Dashboard.css";

const Dashboard = ({ open, ready }) => {
  const [activeId, setActiveId] = useState(null);
  const [components, setComponents] = useState([
    <BalancesOverview />,
    <LastVsCurr />,
    <Yearly />,
    <TotalBudgetCard />,
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => {
    setActiveId(null);

    if (event.active.id !== event.over.id) {
      setComponents((components) => {
        const oldIndex = components.indexOf(event.active.id);
        const newIndex = components.indexOf(event.over.id);

        return arrayMove(components, oldIndex, newIndex);
      });
    }
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
              >
                <MDBContainer
                  flex={true}
                  wrap={true}
                  direction="row"
                  alignItems="center"
                  style={{ maxWidth: "1100px" }}
                >
                  <SortableContext
                    items={components}
                    strategy={rectSortingStrategy}
                  >
                    {components.map((id) => (
                      <SortableItem key={id} id={id} handle={true} value={id} />
                    ))}
                    <DragOverlay>
                      {activeId ? (
                        <div
                          style={{
                            //hover card style
                            width: "500px",
                            height: "450px",
                            backgroundColor: "#c9e4ca",
                            opacity: "0.5",
                            border: "1px solid #c9e4ca",
                            borderRadius: "7px",
                          }}
                        ></div>
                      ) : null}
                    </DragOverlay>
                  </SortableContext>
                </MDBContainer>
              </DndContext>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
