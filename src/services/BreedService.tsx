import apiService from './apiService'

export async function getBreeds() {
  return apiService.get('/breeds')
}

export async function imageSearchByBreedId(breedId: string, page: number = 1, limit: number = 10) {
  return apiService.get('/images/search', {
    params: { breed_id: breedId, page, limit },
  })
}

/**
 * Get the image and the details by providing the breed id.
 *
 * @param breedId is the identifier of the cat breed
 * @returns {Object} cat breed details including the large image url
 */
export async function getBreedImageById(breedId: string) {
  return apiService.get(`/images/${breedId}`)
}
