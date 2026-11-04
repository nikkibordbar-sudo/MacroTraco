
import { useState, useEffect, useLayoutEffect } from 'react'

type FoodEntry = {
  id: number
  date: string
  meal: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

type NutritionGoals = {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
}
  
type NutritionTotals = {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
}
  
type FoodTrackerProps = {
    goals: NutritionGoals | null
    onTotalsChange: (totals: NutritionTotals) => void
}

function FoodTracker({ goals, onTotalsChange }: FoodTrackerProps) {

    const getLocalDate = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
      
        return `${year}-${month}-${day}`
      }
      
      const [selectedDate, setSelectedDate] = useState(getLocalDate)
    
    const [foods, setFoods] = useState<FoodEntry[]>(() => {
        try {
        const savedFoods = localStorage.getItem('macrotraco-foods')
    
        if (savedFoods) {
            const parsed = JSON.parse(savedFoods)
    
            if (Array.isArray(parsed)) {
            return parsed.map((food: FoodEntry) => ({
                ...food,
                date: food.date || getLocalDate(),
                meal: food.meal || 'Snacks'
            }))
            }
        }
        } catch (error) {
        console.error('Error loading saved foods:', error)
        }
    
        return []
    })
  

    useEffect(() => {
        try {
        localStorage.setItem('macrotraco-foods', JSON.stringify(foods))
        } catch (error) {
        console.error('Error saving foods:', error)
        }
    }, [foods])
    
    const [name, setName] = useState('')
    const [meal, setMeal] = useState('Breakfast')
    const [calories, setCalories] = useState('')
    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fat, setFat] = useState('')
    const [fiber, setFiber] = useState('')
    const [editingId, setEditingId] = useState<number | null>(null)

    const editFood = (food: FoodEntry) => {
        setEditingId(food.id)
        setName(food.name)
        setCalories(String(food.calories))
        setProtein(String(food.protein))
        setCarbs(String(food.carbs))
        setFat(String(food.fat))
        setFiber(String(food.fiber))
        setMeal(food.meal)
        setSelectedDate(food.date)
      }

      const cancelEdit = () => {
        setEditingId(null)
        setName('')
        setCalories('')
        setProtein('')
        setCarbs('')
        setFat('')
        setFiber('')
      }

  const addFood = () => {
    if (!name.trim() || calories.trim() === '') {
      alert('Please enter a food name and calories.')
      return
    }

    const values = [calories, protein, carbs, fat, fiber]
    if (values.some(value => value !== '' &&
        (!Number.isFinite(Number(value)) || Number(value) < 0))) {
      alert('Nutrition values must be zero or greater.')
      return
    }

    const newFood: FoodEntry = {
      id: Date.now() + Math.random(),
      date: selectedDate,
      meal: meal,
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      fiber: Number(fiber) || 0,
    }

    if (editingId !== null) {
        setFoods(prevFoods =>
          prevFoods.map(food =>
            food.id === editingId
              ? { ...newFood, id: editingId }
              : food
          )
        )
        setEditingId(null)
      } else {
        setFoods(prevFoods => [...prevFoods, newFood])
      }

    setName('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
    setFiber('')
  }

  const removeFood = (id: number) => {
    setFoods(foods.filter(food => food.id !== id))
  }

  const dailyFoods = foods.filter(food => food.date === selectedDate)

  const totals = dailyFoods.reduce(
    (total, food) => ({
      calories: total.calories + food.calories,
      protein: total.protein + food.protein,
      carbs: total.carbs + food.carbs,
      fat: total.fat + food.fat,
      fiber: total.fiber + food.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  )

  useLayoutEffect(() => {
    onTotalsChange(totals)
  }, [
    totals.calories,
    totals.protein,
    totals.carbs,
    totals.fat,
    totals.fiber,
    onTotalsChange
  ])

  const remaining = goals
  ? {
      calories: Math.max(0, goals.calories - totals.calories),
      protein: Math.max(0, goals.protein - totals.protein),
      carbs: Math.max(0, goals.carbs - totals.carbs),
      fat: Math.max(0, goals.fat - totals.fat),
      fiber: Math.max(0, goals.fiber - totals.fiber),
    }
  : null

  return (
    <section className="food-tracker">
      <h2>Daily Food Tracker</h2>
      <p>Log your meals and track your daily nutrition.</p>

        <div className="food-date-selector">
        <label htmlFor="food-date">Select Date:</label>

        <input
            id="food-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
        />
        </div>

      <div className="food-form">

        <select
        className="meal-select"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
        </select>

        <input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Calories"
          value={calories}
          onChange={e => setCalories(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Protein (g)"
          value={protein}
          onChange={e => setProtein(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={e => setCarbs(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Fat (g)"
          value={fat}
          onChange={e => setFat(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Fiber (g)"
          value={fiber}
          onChange={e => setFiber(e.target.value)}
        />

        <button type="button" onClick={addFood}>
        {editingId !== null ? 'Save Changes' : 'Add Food'}
        </button>

        {editingId !== null && (
        <button
            type="button"
            className="cancel-edit"
            onClick={cancelEdit}
        >
            Cancel
        </button>
        )}
      </div>

      <h3>Today's Nutrition Totals</h3>

      <div className="food-totals">
        <p>Calories: {totals.calories.toFixed(0)} kcal</p>
        <p>Protein: {totals.protein.toFixed(1)}g</p>
        <p>Carbs: {totals.carbs.toFixed(1)}g</p>
        <p>Fat: {totals.fat.toFixed(1)}g</p>
        <p>Fiber: {totals.fiber.toFixed(1)}g</p>
      </div>


{goals && remaining && (
  <div className="nutrition-progress">
    <h3>Daily Nutrition Progress</h3>

    {([
      { label: 'Calories', key: 'calories', unit: 'kcal' },
      { label: 'Protein', key: 'protein', unit: 'g' },
      { label: 'Carbs', key: 'carbs', unit: 'g' },
      { label: 'Fat', key: 'fat', unit: 'g' },
      { label: 'Fiber', key: 'fiber', unit: 'g' },
    ] as const).map(({ label, key, unit }) => (
      <div className="progress-item" key={key}>
        <div className="progress-label">
          <span>{label}</span>
          <span>
            {totals[key].toFixed(1)} / {goals[key]} {unit}
          </span>
        </div>

        <div className="progress-bar">
          <div
            className={`progress-fill progress-${key}`}
            style={{
              width: `${Math.min(
                100,
                goals[key] > 0
                  ? (totals[key] / goals[key]) * 100
                  : 0
              )}%`,
            }}
          />
        </div>

        <p>{remaining[key].toFixed(1)} {unit} remaining</p>
      </div>
    ))}
  </div>
)}
      
    <h3>Food Log</h3>

    {(['Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const).map(
    (mealCategory) => {
        const mealFoods = dailyFoods.filter(
        (food) => food.meal === mealCategory
        )

        return (
        <div className="meal-category" key={mealCategory}>
            <h4>{mealCategory}</h4>

            {mealFoods.length === 0 ? (
            <p className="empty-meal">No foods added yet.</p>
            ) : (
            <div className="food-list">
                {mealFoods.map((food) => (
                <div key={food.id} className="food-item">
                    <strong>{food.name}</strong>

                    <p>
                    {food.calories} kcal | P: {food.protein}g |
                    C: {food.carbs}g | F: {food.fat}g |
                    Fiber: {food.fiber}g
                    </p>
                    <div className="food-actions">
                    <button
                        type="button"
                        onClick={() => editFood(food)}
                        >
                        Edit
                        </button>

                        <button
                        type="button"
                        onClick={() => removeFood(food.id)}
                        >
                        Remove
                        </button>
                </div>
                </div>
                ))}
            </div>
            )}
        </div>
    )
}
)}
    </section>
  )
}
export default FoodTracker
