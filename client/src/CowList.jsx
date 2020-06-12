import React from "react";

const CowList = (props) => (
  <div>
    There are {props.cows.length} cows:
    <br />
    {props.cows.map((cow) => (
      <CowItem cow={cow} clickHandler={props.clickHandler} />
    ))}
  </div>
);

const CowItem = ({ cow, clickHandler }) => (
  <tr>
    <td>
      <span
        onClick={() => {
          clickHandler(cow.name, cow.description);
        }}
      >
        {cow.name}
      </span>
    </td>
  </tr>
);

export default CowList;
