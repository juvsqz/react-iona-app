import React, { createContext, useReducer, useContext, useMemo, ReactNode } from 'react'

// Pre-defined valid action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING' as const,
  UPDATE_BREED_OPTIONS: 'UPDATE_BREED_OPTIONS' as const,
  SET_ACTIVE_BREED_IMAGES: 'SET_ACTIVE_BREED_IMAGES' as const,
  SET_SELECTED_BREED_IMAGE: 'SET_SELECTED_BREED_IMAGE' as const,
}
type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: ActionTypes; payload: any }

// Handling application state
type State = {
  isLoading: boolean
  activeBreed: {
    id: string
    selectedImage: Record<string, any>
    images: Array<Record<string, any>>
  }
  breedOptions: Array<Record<string, unknown>>
}
const DEFAULT_STATE: State = {
  isLoading: true,
  activeBreed: {
    id: '',
    selectedImage: {},
    images: [],
  },
  breedOptions: [],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action?.payload || false }
    case ActionTypes.UPDATE_BREED_OPTIONS:
      return { ...state, breedOptions: action.payload ?? [], isLoading: false }
    case ActionTypes.SET_ACTIVE_BREED_IMAGES:
      return { ...state, activeBreed: action.payload }
    case ActionTypes.SET_SELECTED_BREED_IMAGE:
      return {
        ...state,
        activeBreed: {
          ...action.payload,
          ...state.activeBreed,
          selectedImage: action.payload.selectedImage,
        },
      }
    default:
      return state
  }
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<ContextType | undefined>(undefined)

type AppContextProviderProps = {
  children: ReactNode
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

const Dispatcher = (dispatch: React.Dispatch<Action>) => {
  const setLoading = (isLoading: boolean = false) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading })
  }

  const setBreedOptions = (breedOptions: State['breedOptions'] = []) => {
    dispatch({ type: ActionTypes.UPDATE_BREED_OPTIONS, payload: breedOptions })
  }

  const setActiveBreedImages = (id: string | null = null, images = []) => {
    if (id != null) {
      dispatch({
        type: ActionTypes.SET_ACTIVE_BREED_IMAGES,
        payload: {
          id,
          images,
        },
      })
    }
  }

  const setSelectedBreedImage = (id: string | null = null, selectedImage = {}) => {
    if (id != null) {
      dispatch({
        type: ActionTypes.SET_ACTIVE_BREED_IMAGES,
        payload: {
          id,
          selectedImage,
        },
      })
    }
  }

  return { setLoading, setBreedOptions, setActiveBreedImages, setSelectedBreedImage }
}

const useAppContext = (): ContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}

export { AppContextProvider, Dispatcher, useAppContext }
