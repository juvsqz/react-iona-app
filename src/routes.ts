import Home from './pages/Home'
import BreedDescription from './pages/BreedDescription'

export default [
  // First will always be the index
  {
    element: Home,
  },
  {
    path: '/breeds/:breed_id',
    element: Home,
  },
  {
    path: '/breeds/:breed_id/:image_id',
    element: BreedDescription,
  },
]
