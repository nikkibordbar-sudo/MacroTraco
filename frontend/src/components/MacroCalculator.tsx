import { useState } from 'react'
import MacroChart from './MacroChart'

type NutritionGoals = {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

type MacroCalculatorProps = {
  onCalculate: (goals: NutritionGoals) => void
}

function MacroCalculator({ onCalculate }: MacroCalculatorProps) {

  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('')
  const [goal, setGoal] = useState('')
  const [goalWeight, setGoalWeight] = useState('')

  const [results, setResults] = useState<{
    bmi: number
    bmr: number
    tdee: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    bmiCategory: string
    poundsToGoal: number | null
    estimatedWeeks: number | null
  } | null>(null)

  const calculateMacros = () => {
    const ageNum = Number(age)
    const feetNum = Number(feet)
    const inchesNum = Number(inches)
    const weightLbs = Number(weight)
  
    if (
      !ageNum ||
      !feetNum ||
      weightLbs <= 0 ||
      !sex ||
      !activity ||
      !goal
    ) {
      alert('Please complete all required fields.')
      return
    }
  
    // Convert imperial measurements to metric
    const totalInches = feetNum * 12 + inchesNum
    const heightCm = totalInches * 2.54
    const weightKg = weightLbs * 0.453592
  
    // BMI
    const heightMeters = heightCm / 100
    const bmi = weightKg / (heightMeters * heightMeters)

    // BMI classification for adults
    let bmiCategory = ''

    if (bmi < 18.5) {
      bmiCategory = 'Underweight'
    } else if (bmi < 25) {
      bmiCategory = 'Healthy Weight'
    } else if (bmi < 30) {
      bmiCategory = 'Overweight'
    } else {
      bmiCategory = 'Obesity'
    }
  
    // BMR using the Mifflin-St Jeor equation
    let bmr: number
  
    if (sex === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161
    }
  
    // Activity multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9,
    }
  
    // Estimated maintenance calories
    const tdee = bmr * activityMultipliers[activity]
  
    // Adjust calories based on goal
    let targetCalories = tdee
  
    if (goal === 'lose') {
      targetCalories -= 500
    } else if (goal === 'gain') {
      targetCalories += 300
    }
  
    // Macro targets
    const protein = weightLbs * 0.8
    const fat = (targetCalories * 0.25) / 9
  
    // Protein = 4 kcal/g, carbohydrates = 4 kcal/g
    const proteinCalories = protein * 4
    const fatCalories = fat * 9
    const carbCalories = targetCalories - proteinCalories - fatCalories
    const carbs = carbCalories / 4

    // Fiber target: 14g per 1,000 calories
    const fiber = Math.round((targetCalories / 1000) * 14)

    // Calculate distance to goal weight
    const goalWeightNum = Number(goalWeight)

    const poundsToGoal =
      goalWeight.trim() !== '' && goalWeightNum > 0
        ? Math.abs(weightLbs - goalWeightNum)
        : null

    // Estimate time based on calorie difference
    const dailyCalorieDifference = Math.abs(tdee - targetCalories)

    const estimatedWeeks =
      poundsToGoal !== null &&
      poundsToGoal > 0 &&
      dailyCalorieDifference > 0 &&
      ((goal === 'lose' && goalWeightNum < weightLbs) ||
      (goal === 'gain' && goalWeightNum > weightLbs))
        ? (poundsToGoal * 3500) / (dailyCalorieDifference * 7)
        : null
  
        setResults({
          bmi: Number(bmi.toFixed(1)),
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          calories: Math.round(targetCalories),
          protein: Math.round(protein),
          carbs: Math.max(0, Math.round(carbs)),
          fat: Math.round(fat),
          fiber,
          bmiCategory,
          poundsToGoal,
          estimatedWeeks,
        })

        onCalculate({
          calories: Math.round(targetCalories),
          protein: Math.round(protein),
          carbs: Math.max(0, Math.round(carbs)),
          fat: Math.round(fat),
          fiber: fiber,
        })
  }

    return (
      <section id="calculator" className="calculator-section">
  
        <div className="calculator-heading">
          <p className="eyebrow">PERSONALIZED FOR YOU</p>
          <h2>Calculate Your Macros</h2>
          <p>
            Tell us a little about yourself and your fitness goal.
          </p>
        </div>
  
        <div className="calculator-card">
  
          <div className="form-grid">
  
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                placeholder="25"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <select 
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)} 
                >
                <option value="" disabled>
                  Select
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
  
            <div className="form-group">
              <label>Height</label>
  
              <div className="height-inputs">
                <input
                  type="number"
                  placeholder="5"
                  min="3"
                  max="8"
                  aria-label="Height in feet"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                />
  
                <span>ft</span>
  
                <input
                  type="number"
                  placeholder="10"
                  min="0"
                  max="11"
                  aria-label="Height in inches"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                />
  
                <span>in</span>
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
  
              <div className="input-with-unit">
                <input
                  id="weight"
                  type="number"
                  placeholder="175"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span>lbs</span>
              </div>
            </div>
  
            <div className="form-group full-width">
              <label htmlFor="activity">Activity Level</label>
  
              <select 
                id="activity" 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}>
                <option value="" disabled>
                  Select your activity level
                </option>
  
                <option value="sedentary">
                  Sedentary — little or no exercise
                </option>
  
                <option value="light">
                  Lightly Active — exercise 1–3 days/week
                </option>
  
                <option value="moderate">
                  Moderately Active — exercise 3–5 days/week
                </option>
  
                <option value="very">
                  Very Active — exercise 6–7 days/week
                </option>
  
                <option value="extra">
                  Extra Active — very intense exercise or physical job
                </option>
              </select>
            </div>
  
            <div className="form-group">
              <label htmlFor="goal">Goal</label>
  
              <select 
                id="goal" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}>
                <option value="" disabled>
                  Select goal
                </option>
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
  
            <div className="form-group">
              <label htmlFor="goalWeight">Goal Weight</label>
  
              <div className="input-with-unit">
                <input
                  id="goalWeight"
                  type="number"
                  placeholder="165"
                  min="1"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                />
                <span>lbs</span>
              </div>
            </div>
  
          </div>
  
          <button 
            className="submit-calculator"
            onClick={calculateMacros}>
            Calculate My Goals →
          </button>
  
        </div>

        {results && (
          <div className="results-section">

            <div className="results-heading">
              <p className="eyebrow">YOUR PERSONALIZED RESULTS</p>
              <h2>Your Daily Goals</h2>
              <p>
                Based on your body measurements, activity level, and fitness goal.
              </p>
            </div>

            <div className="results-grid">

              <div className="result-card">
                <p>BMI</p>
                <h3>{results.bmi}</h3>
                <span>Body Mass Index</span>
              </div>

              <div className="result-card">
                <p>BMR</p>
                <h3>{results.bmr}</h3>
                <span>kcal at rest</span>
              </div>

              <div className="result-card">
                <p>Maintenance</p>
                <h3>{results.tdee}</h3>
                <span>kcal / day</span>
              </div>

              <div className="result-card highlight-card">
                <p>Calorie Goal</p>
                <h3>{results.calories}</h3>
                <span>kcal / day</span>
              </div>

              <div className="result-card">
                <p>Protein</p>
                <h3>{results.protein}g</h3>
                <span>daily goal</span>
              </div>

              <div className="result-card">
                <p>Carbs</p>
                <h3>{results.carbs}g</h3>
                <span>daily goal</span>
              </div>

              <div className="result-card">
                <p>Fat</p>
                <h3>{results.fat}g</h3>
                <span>daily goal</span>
              </div>

              <div className="result-card">
                <p>Fiber</p>
                <h3>{results.fiber}g</h3>
                <span>daily goal</span>
              </div>

            </div>

            <div className="goal-summary">
              <h3>Your Progress Overview</h3>

              <p>
                BMI Classification:
                <strong> {results.bmiCategory}</strong>
              </p>

              {results.poundsToGoal !== null && (
                <p>
                  Distance to Goal:
                  <strong> {results.poundsToGoal.toFixed(1)} lbs</strong>
                </p>
              )}

              {results.estimatedWeeks !== null && (
                <p>
                  Estimated Timeline:
                  <strong> {Math.ceil(results.estimatedWeeks)} weeks</strong>
                </p>
              )}

              <p className="goal-disclaimer">
                These are estimates for general planning, not medical advice.
                Actual calorie needs and weight changes vary.
              </p>
            </div>

            <MacroChart
              protein={results.protein}
              carbs={results.carbs}
              fat={results.fat}
              fiber={results.fiber}
            />

          </div>
        )}
  
      </section>
    )
  }
  
  export default MacroCalculator