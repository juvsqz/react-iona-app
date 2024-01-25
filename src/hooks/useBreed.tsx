import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext, Dispatcher } from '../contexts/AppContext'
import { getBreeds, imageSearchByBreedId, getBreedImageById } from '../services/BreedService'
import { useEffect } from 'react'
import { get } from 'lodash'

type KnownUrlParams = { breed_id: string; image_id: string }

function useBreed() {
  const params = useParams<KnownUrlParams>()
  const { state, dispatch } = useAppContext()
  const navigate = useNavigate()

  const { setLoading, setBreedOptions, setActiveBreedImages, setSelectedBreedImage } = Dispatcher(dispatch)

  const loadBreedOptions = async () => {
    try {
      setLoading(true)
      const breeds = await getBreeds()
      setBreedOptions(breeds.data)
    } catch (error) {
      return null
    } finally {
      setLoading(false)
    }
  }

  const loadBreedImages = async (breedId: string | null) => {
    if (breedId === null) return
    try {
      setLoading(true)
      setActiveBreedImages(breedId, [])
      const images = await imageSearchByBreedId(breedId)
      setActiveBreedImages(breedId, images.data)
    } catch (error) {
      setActiveBreedImages(breedId, [])
      return null
    } finally {
      setLoading(false)
    }
  }

  const loadBreedImage = async (breedId: string | null, imageId: string) => {
    if (breedId === null) return
    try {
      setLoading(true)
      const image = await getBreedImageById(imageId)
      setSelectedBreedImage(breedId, image.data)
    } catch (error) {
      setSelectedBreedImage(breedId, {})
      return null
    } finally {
      setLoading(false)
    }
  }

  const navigateToBreed = async (breedId: string = state.activeBreed?.id || '') => {
    if (breedId.length > 0) {
      navigate(`/breeds/${breedId}`)
    }
  }

  useEffect(() => {
    const requestedBreedId = get(params, 'breed_id', null)
    const requestedImageId = get(params, 'image_id', null)

    if (requestedImageId) {
      // Request new image if the params is different from the previously selected
      // Will be false only if the route was triggered from the home page
      const selectedImageId = get(state, 'activeBreed.selectedImage.id', null)
      const isNewImageSelected = selectedImageId != null && selectedImageId !== requestedImageId
      if (isNewImageSelected) {
        loadBreedImage(requestedBreedId, requestedImageId)
      }
    } else {
      const activeBreedId = get(state, 'activeBreed.id', null)
      const isNewBreedSelected = activeBreedId === null || requestedBreedId != activeBreedId

      // Request breed images if the params is different from the previously selected
      // Will be false only if the the route was triggered from the breed description page
      if (isNewBreedSelected) {
        loadBreedImages(requestedBreedId)
      }
    }
  }, [params])

  useEffect(() => {
    // We will force to redirect to correct url when the image is valid
    // but the breed id is not valid or associated to the image id
    const requestedBreedId = get(params, 'breed_id', null)
    const requestedImageId = get(params, 'image_id', null)
    const actualBreedId = get(state, 'activeBreed.selectedImage.breeds[0].id', null)
    if (!!actualBreedId && actualBreedId !== requestedBreedId && !!requestedImageId) {
      navigate(`/breeds/${actualBreedId}/${requestedImageId}`)
    }
  }, [state.activeBreed.selectedImage])

  useEffect(() => {
    // Always load breed options' first page when empty
    if (state.breedOptions.length < 1) loadBreedOptions()
  }, [])

  return { loadBreedOptions, navigateToBreed, params }
}

export default useBreed
