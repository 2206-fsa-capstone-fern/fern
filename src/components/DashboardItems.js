import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { MDBIcon, MDBContainer } from "mdbreact";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "400px",
    height: "400px",
    backgroundColor: "green",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          minWidth: "400px",
          minHeight: "450px",
          border: "1px solid",
          borderColor: "black",
        }}
      >
        <button {...listeners} {...attributes}>
          Drag
        </button>
        <MDBContainer>{props.value}</MDBContainer>
      </div>
    </div>
  );
};

export default SortableItem;
