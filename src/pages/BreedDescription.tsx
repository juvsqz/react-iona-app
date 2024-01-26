import { get } from 'lodash'
import { useAppContext } from '../contexts/AppContext'
import useBreed from '../hooks/useBreed'
import BreedProfile from '../components/BreedProfile'

function BreedDescription() {
  const { state } = useAppContext()
  const { navigateToBreed, params } = useBreed()

  // Alternatively used as an selected identifier
  const imageUrl = get(state, 'activeBreed.selectedImage.url', null)
  const details = get(state, 'activeBreed.selectedImage.breeds[0]', null)

  if (details === null || state.activeBreed.selectedImage.id !== params.image_id) {
    return <div>Loading data...</div>
  }
  return (
    <div>
      <div className="container">
        <div className="profile">
          <button className="back-button" onClick={() => navigateToBreed(params.breed_id)}>
            Back
          </button>
          <BreedProfile
            imageUrl={imageUrl}
            name={details.name}
            origin={details.origin}
            temperament={details.temperament.split(',')}
            description={details.description}
          />
        </div>
      </div>
    </div>
  )
}

export default BreedDescription
