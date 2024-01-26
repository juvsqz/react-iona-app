type BreedProfileProps = {
  imageUrl: string
  name: string
  origin: string
  temperament: Array<string>
  description: string
}

export default function BreedProfile({
  name,
  imageUrl,
  origin,
  temperament,
  description,
}: Readonly<BreedProfileProps>) {
  return (
    <div className="profile-card">
      <img src={imageUrl} alt={name} className="profile-image" />
      <h2 className="breed-name">{name}</h2>
      <div className="origin-location">Origin: {origin}</div>
      <div className="skills">
        {temperament.map((val: any) => (
          <span className="badge" key={val}>
            {val}
          </span>
        ))}
      </div>
      <p className="description">{description}</p>
    </div>
  )
}
