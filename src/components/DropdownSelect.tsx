type DropdownSelectProps = {
  selectedValue?: string
  onChange: (value: string) => void
  options: Array<{
    label?: string
    value?: string
    id?: string
    name?: string
  }>
}

function DropdownSelect({ options, selectedValue, onChange }: Readonly<DropdownSelectProps>) {
  console.log('select', options)
  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value ?? option.id} value={option.value ?? option.id}>
            {option.label ?? option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownSelect
