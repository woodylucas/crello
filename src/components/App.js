import React from 'react';
import List from './List';
import { connect } from "react-redux"
import CrelloActionButton from "./CrelloActionButton"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from "../actions"
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends React.Component {
  onDragEnd  = (result) => {
  const { destination, source, draggableId, type } = result;

  if(!destination) {
    return;
  }
  this.props.dispatch(sort(
    source.droppableId,
    destination.droppableId,
    source.index,
    destination.index,
    draggableId,
    type
  ))
};
render() {
  const { lists } = this.props
  console.log(lists)
  return(
  <DragDropContext onDragEnd={this.onDragEnd}>
    <div className="App">
      <h2>Welcome to Crello</h2>
      <Droppable droppableId="all-list" direction="horizontal" type="list">
        {provided => (
          <ListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {lists.map((list,index) =>
            <List
              listID={list.id}
              title={list.title}
              cards={list.cards}
              key={list.id}
              index={index}
            /> )}
            {provided.placeholder}
            <CrelloActionButton list />
          </ListContainer>
        )}
      </Droppable>

        </div>
    </DragDropContext>
        );
      }
    }

const mapStateToProps = state => ({
  lists: state.lists
})



export default connect(mapStateToProps)(App);
