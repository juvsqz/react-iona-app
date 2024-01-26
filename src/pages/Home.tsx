import { useAppContext } from '../contexts/AppContext'
import useBreed from '../hooks/useBreed'
import DropdownSelect from '../components/DropdownSelect'
import BreedImageCard from '../components/BreedImageCard'

function Home() {
  const { state } = useAppContext()
  const { navigateToBreed, loadBreedImages } = useBreed()

  return (
    <div>
      <div className="container">
        <header>
          <h1>Welcome to Cat Browser</h1>
        </header>
        <DropdownSelect
          label="Select a breed"
          options={state.breedOptions}
          onChange={navigateToBreed}
          selectedValue={state?.activeBreed?.id}
          isLoading={state.isLoading && state.breedOptions.length < 1}
        />

        {state.errorMsg ? (
          <div className="info-box alert">{state.errorMsg}</div>
        ) : (
          <>
            <div className="card-list">
              {state.activeBreed.images.map(({ id }, index) => {
                return (
                  <BreedImageCard
                    key={`${index}_${id}`}
                    id={id}
                    breedId={state.activeBreed.id}
                    btnOnClick={() => navigateToBreed(state.activeBreed.id, id)}
                  />
                )
              })}
            </div>

            {state.activeBreed.id && (
              <div className="text-center">
                {state.pagination.hasNext || state.isLoading ? (
                  <button
                    disabled={state.isLoading}
                    className="load-more-button"
                    onClick={() => loadBreedImages(state?.activeBreed?.id, state.pagination.currentPage + 1)}
                  >
                    {state.isLoading ? 'Loading...' : 'Load More'}
                  </button>
                ) : (
                  <div className="end-of-results">- End of Results -</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
