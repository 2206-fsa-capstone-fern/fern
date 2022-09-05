import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { MDBContainer } from "mdbreact";
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
  } = useSortable({ id: props.value });
  //can we change this?

  const style = {
    //non-hovering card style
    transform: CSS.Transform.toString(transform),
    transition,
    width: "500px",
    height: "450px",
    backgroundColor: "#c9e4ca",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    border: "1px solid #c9e4ca",
    borderRadius: "7px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          minWidth: "500px",
          minHeight: "500px",
          border: "1px",
          borderColor: "none",
          padding: "8px",
        }}
      >
        <i
          class="bi bi-grip-vertical"
          {...listeners}
          {...attributes}
          style={{
            background: "green",
            color: "white",
            border: "1px solid green",
            borderRadius: "5px",
            padding: "3px 3px",
          }}
        ></i>
        {props.value}
        {console.log("props", props)}
      </div>
    </div>
  );
};

export default SortableItem;
