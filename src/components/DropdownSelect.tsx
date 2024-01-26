import { useMemo } from 'react'
import Select from 'react-select'

type DropdownSelectProps = {
  selectedValue?: string
  onChange: (value: string) => void
  options: Array<{
    label?: string
    value?: string
    id?: string
    name?: string
  }>
  isLoading?: boolean
  label: string
}

export default function DropdownSelect({
  label,
  options,
  selectedValue,
  onChange,
  isLoading = false,
}: Readonly<DropdownSelectProps>) {
  // Pre-populate values in the dropdown
  const value = useMemo(() => {
    return options.filter(({ value }) => value === selectedValue)
  }, [options, selectedValue])

  return (
    <div className="dropdown-select">
      <label htmlFor="dropdown">{label}</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={value?.length > 0 ? value[0] : 'Select'}
        isDisabled={false}
        isLoading={isLoading}
        isClearable
        isRtl={false}
        name="breed-options"
        options={options as any}
        onChange={(value: Record<any, any>) => onChange(value?.id)}
      />
    </div>
  )
}
