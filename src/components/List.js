import React from "react"
import CrelloCard from "./CrelloCard"
import CrelloActionButton from "./CrelloActionButton"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const ListContainer = styled.div`
background-color: #dfe3e6;
border-raidius: 3px;
width: 300px;
padding: 8px;
height: 100%;
margin-right: 8px;
`;
const List = ( { title, cards, listID, index} ) => {

  console.log(listID)
  return(
  <Draggable draggableId={String(listID)} index={index}>
  {provided => (
    <ListContainer
    {...provided.draggableProps}
    ref={provided.innerRef}
    {...provided.dragHandleProps}
    >
      <Droppable droppableId={ String(listID) }>
        {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h4>{ title }</h4>
          {cards.map((card, index) => (
            <CrelloCard index={index}
              text={card.text}
              key={card.id}
              id={card.id}
            />
          ))}
          {provided.placeholder}
          <CrelloActionButton listID={listID} />
        </div>
      )}
      </Droppable>
    </ListContainer>
    )}
  </Draggable>


    );
  };

export default List
