import { render, fireEvent } from '@testing-library/react'
import { test } from 'vitest'
import BreedImageCard from './BreedImageCard'
import assert from 'assert'

test('BreedImageCard renders correctly', async () => {
  const btnOnClick = () => {}
  const { getByAltText, getByText } = render(
    <BreedImageCard id="test-id" breedId="test-breedId" btnOnClick={btnOnClick} />,
  )

  // Check if the image and button are rendered correctly
  assert.ok(getByAltText('test-breedId'))
  assert.ok(getByText('View Details'))
})

test('BreedImageCard calls btnOnClick when button is clicked', async () => {
  let clicked = false
  const btnOnClick = () => {
    clicked = true
  }
  const { getByText } = render(<BreedImageCard id="test-id" breedId="test-breedId" btnOnClick={btnOnClick} />)

  fireEvent.click(getByText('View Details'))
  // Check if the onClick handler is called
  assert.ok(clicked)
})
