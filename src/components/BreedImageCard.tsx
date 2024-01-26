import { CDN_CONFIG_URL } from '../config'

type BreedImageCardProps = {
  id: string
  breedId: string
  btnOnClick: () => void
}
export default function BreedImageCard({ id, breedId, btnOnClick }: Readonly<BreedImageCardProps>) {
  return (
    <div className="card">
      <div className="img-container">
        <img src={`${CDN_CONFIG_URL}/${id}.jpg`} alt={`${breedId}`} />
      </div>
      <button onClick={btnOnClick} className="details-btn">
        View Details
      </button>
    </div>
  )
}
