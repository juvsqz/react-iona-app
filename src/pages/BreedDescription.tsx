import { useAppContext } from '../contexts/AppContext'
import useBreed from '../hooks/useBreed'

function BreedDescription() {
  const { state } = useAppContext()
  const { navigateToBreed } = useBreed()

  return (
    <div>
      <button onClick={() => navigateToBreed()}> Back</button>
      <img src={state.activeBreed.selectedImage.url} />
    </div>
  )
}

export default BreedDescription
