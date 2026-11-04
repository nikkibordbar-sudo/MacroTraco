import './App.css'
import MacroCalculator from './components/MacroCalculator'

function App() {
  return (
    <main className="home">
      <nav className="navbar">
        <div className="logo">
          Macro<span>Traco</span>
        </div>

        <div className="nav-links">
          <a href="#calculator">Calculator</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">

          <p className="eyebrow">SMARTER NUTRITION STARTS HERE</p>

          <h1>
            Reach Your Goals With
            <span> Smarter Nutrition.</span>
          </h1>

          <p className="hero-description">
            Calculate personalized calorie and macronutrient goals based
            on your body, activity level, and fitness goals.
          </p>

          <a href="#calculator" className="calculate-button">
            Calculate My Macros →
          </a>

          <div className="macro-preview">

            <div className="macro-card">
              <p>Calories</p>
              <h3>1,850</h3>
              <span>kcal / day</span>
            </div>

            <div className="macro-card">
              <p>Protein</p>
              <h3>150g</h3>
              <span>daily goal</span>
            </div>

            <div className="macro-card">
              <p>Carbs</p>
              <h3>180g</h3>
              <span>daily goal</span>
            </div>

            <div className="macro-card">
              <p>Fat</p>
              <h3>59g</h3>
              <span>daily goal</span>
            </div>

          </div>
        </div>
      </section>
      <MacroCalculator />
    </main>
  )
}

export default App