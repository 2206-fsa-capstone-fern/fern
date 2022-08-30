import React from "react";
import { useState } from "react";
// import BarChart from "./BarChart";
// import LineGraph from "./LineGraph";
// import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import { dummyTransactions } from "../DummyData/Transactions";
import SideNav from "./SideNav/SideNav";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard = () => {
  //dnd
  const [components, setComponents] = useState([
    // { content: <DoughnutChart /> },
    { content: "monthly" },
    { content: "category" },
    { content: "budget" },
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

  // const dummyData = dummyTransactions[0].transactions.slice(0, 10);
  // const transactionCategory = dummyData.map(
  //   (transaction) => transaction.category[0]
  // );
  // const transactionAmount = dummyData.map((transaction) => transaction.amount);
  // const [chartData, setChartData] = useState({
  //   labels: transactionCategory,
  //   datasets: [
  //     {
  //       label: "Transactions",
  //       data: transactionAmount,
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: ["rgba(75,192,192,1)"],
  //       borderWidth: 5,
  //     },
  //   ],
  // });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="order" direction="vertical" type="column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
                  >
                    <div>
                      <i class="bi bi-list" {...provided.dragHandleProps}></i>
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
  );
};

export default Dashboard;
