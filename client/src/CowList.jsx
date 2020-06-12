import React from "react";

const CowList = (props) => (
  <div>
    There are {props.cows.length} cows:
    <br />
    {props.cows.map((cow) => (
      <CowItem cow={cow} />
    ))}
  </div>
);

const CowItem = ({ cow }) => (
  <tr>
    <td>{cow.name}</td>
  </tr>
);

export default CowList;
