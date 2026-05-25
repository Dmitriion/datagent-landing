import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Metrics } from './components/sections/Metrics'
import { Features } from './components/sections/Features'
import { Architecture } from './components/sections/Architecture'
import { HowItWorks } from './components/sections/HowItWorks'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Features />
        <Architecture />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
