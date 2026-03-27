import StarField from './components/StarField'
import CircuitOverlay from './components/CircuitOverlay'
import Greeter from './components/Greeter'

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarField />
      <CircuitOverlay />
      <Greeter />
    </div>
  )
}

export default App
