const LOAD_START = 'LOAD_START'
const LOAD_END = 'LOAD_END'

const initialState = {
  isLoading: false
}

const loadStart = () => ({
  type: LOAD_START
})

const loadEnd = () => ({
  type: LOAD_END
})

const actions = {
  loadStart,
  loadEnd
}

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case LOAD_START:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_END:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default {
  actions,
  reducer
}
