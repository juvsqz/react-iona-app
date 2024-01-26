import { render } from '@testing-library/react'
import { test } from 'vitest'
import DropdownSelect from './DropdownSelect'
import assert from 'assert'

test('DropdownSelect renders correctly', async () => {
  const props = {
    label: 'Test Label',
    options: [
      { label: 'Option 1', value: '1', id: '1' },
      { label: 'Option 2', value: '2', id: '2' },
    ],
    selectedValue: '1',
    onChange: () => {},
    isLoading: false,
  }

  const { getByText } = render(<DropdownSelect {...props} />)

  // Check if the label is rendered correctly
  assert.ok(getByText(props.label))
})
