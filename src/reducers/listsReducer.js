import { CONSTANTS } from "../actions"

let listID = 2;
let cardID = 6;
const initialState = [
  {
    title: "Liams 1st birthday party",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "party acessories: tables, plastic untensils etc."
      },
      {
        id: `card-${1}`,
        text: "games for the children"
      }
    ]
  },
  {
    title: "In process",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${3}`,
        text: "adding features."
      },
      {
        id: `card-${4}`,
        text: "creating invitations"
      },
      {
        id: `card-${5}`,
        text: "developing games"
      }
    ]
  }
]

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`
      };
      listID += 1;
      return [...state, newList];
    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      }
      cardID += 1;

      const newState = state.map(list => {
        if(list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        } else {
          return list;
        }
      });

      return newState;
  }
      case CONSTANTS.DRAG_HAPPENED:
        const {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          draggableId,
          type
        } = action.payload
        const newState = [...state];

        if(type === "list") {
          const list = newState.splice(droppableIndexStart, 1);
          newState.splice(droppableIndexEnd, 0, ...list);
          return newState
        }

        // in same list
        if(droppableIdStart === droppableIdEnd) {
          const list = state.find(list => droppableIdStart === list.id)
          const card = list.cards.splice(droppableIndexStart, 1)
          list.cards.splice(droppableIndexEnd, 0, ...card)
        }

        // other list
        if(droppableIdStart !== droppableIdEnd) {
          const listStart = state.find(list => droppableIdStart === list.id)

          //pull out card from this list
          const card = listStart.cards.splice(droppableIndexStart, 1);

          // find the list where drag ended
          const listEnd = state.find(list => droppableIdEnd === list.id)

          //put card in the new list
          listEnd.cards.splice(droppableIndexEnd, 0, ...card)
        }
        return newState

    default:
      return state;
  }
}

export default listsReducer;
