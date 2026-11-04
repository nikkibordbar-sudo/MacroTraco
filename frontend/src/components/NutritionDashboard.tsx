
type NutritionGoals = {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  
  type NutritionDashboardProps = {
    goals: NutritionGoals | null
    totals: NutritionGoals
  }
  
  function NutritionDashboard({ goals, totals }: NutritionDashboardProps) {
    return (
      <section className="nutrition-dashboard">
        <h2>Daily Nutrition Dashboard</h2>
        <p>Track your progress toward your daily nutrition goals.</p>
  
        {goals ? (
            <div className="dashboard-goals">
            <h3>Today's Nutrition Progress</h3>

            {(
                [
                { label: 'Calories', key: 'calories', unit: 'kcal' },
                { label: 'Protein', key: 'protein', unit: 'g' },
                { label: 'Carbs', key: 'carbs', unit: 'g' },
                { label: 'Fat', key: 'fat', unit: 'g' },
                { label: 'Fiber', key: 'fiber', unit: 'g' },
                ] as const
            ).map(({ label, key, unit }) => {
                const consumed = totals[key]
                const target = goals[key]
                const percentage = target > 0
                ? Math.min((consumed / target) * 100, 100)
                : 0

                const remaining = Math.max(0, target - consumed)

                return (
                <div className="dashboard-progress" key={key}>
                    <div className="dashboard-progress-label">
                    <strong>{label}</strong>
                    <span>
                        {consumed.toFixed(1)} / {target} {unit}
                    </span>
                    </div>

                    <div className="dashboard-progress-track">
                    <div
                        className={`dashboard-progress-fill ${key}`}
                        style={{ width: `${percentage}%` }}
                    />
                    </div>

                    <p>
                    {remaining.toFixed(1)} {unit} remaining
                    </p>
                </div>
                )
            })}
            </div>
        ) : (
          <p>Calculate your macros to see your nutrition goals.</p>
        )}
      </section>
    )
  }
  
  export default NutritionDashboard
  