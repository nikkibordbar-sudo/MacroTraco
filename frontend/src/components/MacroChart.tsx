import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts'
  
  type MacroChartProps = {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  
  function MacroChart({ protein, carbs, fat, fiber }: MacroChartProps) {
    const data = [
      { name: 'Protein', value: protein * 4 },
      { name: 'Carbs', value: carbs * 4 },
      { name: 'Fat', value: fat * 9 },
    ]
  
    const colors = ['#22c55e', '#38bdf8', '#a78bfa']

    const totalCalories = protein * 4 + carbs * 4 + fat * 9

    const percentages = data.map((macro) => ({
        ...macro,
        percentage: totalCalories > 0
        ? Math.round((macro.value / totalCalories) * 100)
        : 0,
    }))
  
    return (
      <div className="macro-chart-container">
        <h3>Daily Macronutrient Breakdown</h3>
        <p>See where your daily calories come from.</p>
  
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={colors[index]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(0)} kcal`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div> 

        <div className="fiber-summary">
            <h4>Daily Fiber Goal</h4>
            <p>{fiber}g</p>
            <span>Included in your total carbohydrate goal</span>
        </div>

        <div className="macro-percentages">
        {percentages.map((macro, index) => (
            <div className="macro-percentage-item" key={macro.name}>
            <span style={{ color: colors[index] }}>
                {macro.name}
            </span>
            <strong>{macro.percentage}%</strong>
            </div>
        ))}
        </div>
      </div>
    )
  }
  
  export default MacroChart
  