import {IContactState, TContactAction, ContactActionTypes, IContact} from '../../types/contacts'

const initialState: IContactState = {
  contacts: []
}

const contactReducer = (state = initialState, action: TContactAction): IContactState => {
  switch (action.type) {
    case ContactActionTypes.FETCH_CONTACTS:
      if (JSON.stringify(state.contacts) !== JSON.stringify(action.payload)) {
        return {...state, contacts: action.payload}
      } else return state

    case ContactActionTypes.CONFIRM_CONTACTS:
      return {...state, contacts: action.payload}

    case ContactActionTypes.FETCH_NOTE:
      const {elId, value} = action.payload
      const newState: any = {...state}
      const index = newState.contacts?.findIndex((el: IContact) => el.id === elId)
      newState.contacts[index].note = value
      
      return newState

    case ContactActionTypes.ADD_CONTACT:
      if (JSON.stringify(state.contacts) !== JSON.stringify(action.payload)) {
        return {...state, contacts: action.payload}
      } else return state

    case ContactActionTypes.DELETE_CONTACT:
      return {...state, contacts: action.payload.user.contacts}

    case ContactActionTypes.CLEAR_STATE:
      return {...state, contacts: []}

    default:
      return state
  }
}

export default contactReducer