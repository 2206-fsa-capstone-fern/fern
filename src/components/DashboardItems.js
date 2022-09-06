import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });
  //can we change this?

  const style = {
    //non-hovering card style
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
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
          minHeight: "450px",
          border: "1px",
          borderColor: "none",
          padding: "10px",
        }}
      >
        <i
          class="bi bi-grip-vertical"
          {...listeners}
          {...attributes}
          style={{
            color: "#666",
            fontSize: "1rem",
          }}
        ></i>
        <div>{props.value}</div>
      </div>
    </div>
  );
};

export default SortableItem;
