import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext, Dispatcher } from '../contexts/AppContext'
import { getBreeds, imageSearchByBreedId, getBreedImageById } from '../services/BreedService'
import { useEffect } from 'react'
import { differenceWith, get } from 'lodash'
import { DEFAULT_ERROR } from '../config'

type KnownUrlParams = { breed_id: string; image_id: string }

function useBreed() {
  const params = useParams<KnownUrlParams>()
  const { state, dispatch } = useAppContext()
  const navigate = useNavigate()

  const { setLoading, setBreedOptions, setActiveBreedImages, setSelectedBreedImage, setErrorMessage } =
    Dispatcher(dispatch)

  const loadBreedOptions = async () => {
    let errMsg = ''
    try {
      setLoading(true)
      const breeds = await getBreeds()
      if (Array.isArray(get(breeds, 'data', null))) {
        setBreedOptions(breeds.data)
      } else {
        throw new Error('This is invalid data')
      }
    } catch (error) {
      errMsg = DEFAULT_ERROR
      return null
    } finally {
      setLoading(false)
      if (errMsg.length > 0) {
        setErrorMessage(errMsg)
      }
    }
  }

  const loadBreedImages = async (breedId: string | null, page = 1) => {
    let errMsg = ''
    if (breedId === null) return
    try {
      setLoading(true)

      if (page === 1) {
        setActiveBreedImages(breedId, [])
      }
      const images = await imageSearchByBreedId(breedId, page)

      let newData = []
      if (page > 1) {
        // Check if there are new items to be added
        const newItems = differenceWith(images.data, state.activeBreed.images, (currentItems: any, newItems: any) => {
          return currentItems.id === newItems.id
        })
        newData = [...state.activeBreed.images, ...newItems]
      } else {
        newData = images.data
      }
      setActiveBreedImages(breedId, newData, page)
    } catch (error) {
      setActiveBreedImages(breedId, [])
      errMsg = DEFAULT_ERROR
      return null
    } finally {
      setLoading(false)
      if (errMsg.length > 0) {
        setErrorMessage(errMsg)
      }
    }
  }

  const loadBreedImage = async (breedId: string | null, imageId: string) => {
    let errMsg = ''
    if (breedId === null) return
    try {
      setLoading(true)
      const image = await getBreedImageById(imageId)
      setSelectedBreedImage(breedId, image.data)
    } catch (error) {
      setSelectedBreedImage(breedId, {})
      errMsg = DEFAULT_ERROR
      return null
    } finally {
      setLoading(false)
      if (errMsg.length > 0) {
        setErrorMessage(errMsg)
      }
    }
  }

  const navigateToBreed = async (breedId: string = state.activeBreed.id, imageId: string | null = null) => {
    if (breedId.length > 0) {
      if (imageId === null) {
        navigate(`/breeds/${breedId}`)
      } else {
        navigate(`/breeds/${breedId}/${imageId}`)
      }
    }
  }

  useEffect(() => {
    const requestedBreedId = get(params, 'breed_id', null)
    const requestedImageId = get(params, 'image_id', null)

    if (requestedImageId) {
      // Request new image if the params is different from the previously selected
      // Will be false only if the route was triggered from the home page
      const selectedImageId = get(state, 'activeBreed.selectedImage.id', null)
      const isNewImageSelected = selectedImageId !== requestedImageId
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
      navigateToBreed(actualBreedId, requestedImageId)
    }
  }, [state.activeBreed.selectedImage])

  useEffect(() => {
    // Always load breed options' first page when empty
    if (state.breedOptions.length < 1) loadBreedOptions()
  }, [])

  return { loadBreedOptions, loadBreedImages, navigateToBreed, params }
}

export default useBreed
