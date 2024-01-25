import { useAppContext } from '../contexts/AppContext'
import useBreed from '../hooks/useBreed'
import DropdownSelect from '../components/DropdownSelect'

function Home() {
  const { state } = useAppContext()
  const { navigateToBreed } = useBreed()

  if (state.activeBreed?.id) {
    console.log('state.activeBreed', state.activeBreed)
  }

  if (state.isLoading && state.breedOptions.length < 1) {
    return <div>Loading data...</div>
  }

  return (
    <div>
      <DropdownSelect options={state.breedOptions} onChange={navigateToBreed} selectedValue={state?.activeBreed?.id} />
    </div>
  )
}

export default Home
