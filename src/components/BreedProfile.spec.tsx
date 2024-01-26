import { render } from '@testing-library/react'
import { test } from 'vitest'
import BreedProfile from './BreedProfile'
import assert from 'assert'

test('BreedProfile renders correctly', async () => {
  const props = {
    imageUrl: 'test-image.jpg',
    name: 'Test Breed',
    origin: 'Test Origin',
    temperament: ['Friendly', 'Active'],
    description: 'Test Description',
  }

  const { getByAltText, getByText } = render(<BreedProfile {...props} />)

  // Check if the image, name, origin, temperament, and description are rendered correctly
  assert.ok(getByAltText(props.name))
  assert.ok(getByText(props.name))
  assert.ok(getByText(`Origin: ${props.origin}`))
  props.temperament.forEach((temperament) => {
    assert.ok(getByText(temperament))
  })
  assert.ok(getByText(props.description))
})
