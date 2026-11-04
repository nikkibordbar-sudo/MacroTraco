# MacroTraco — Personalized Nutrition & Fitness Calculator

MacroTraco is a web-based nutrition and fitness application that helps users estimate their daily calorie needs, macronutrient targets, and fiber intake based on their body measurements, activity level, and fitness goals.

The project is designed to make personalized nutrition planning simple, accessible, and visually understandable.

**Project Status:** In Development

## Features

- **Personalized Calorie Calculator:** Estimates daily calorie requirements based on age, sex, height, weight, and activity level.
- **BMI Calculator:** Calculates Body Mass Index (BMI) and provides an adult BMI classification.
- **BMR Calculator:** Uses the Mifflin-St Jeor equation to estimate basal metabolic rate.
- **Maintenance Calories:** Estimates total daily energy expenditure (TDEE) using activity multipliers.
- **Macronutrient Calculator:** Generates daily protein, carbohydrate, and fat targets based on calorie goals.
- **Fiber Recommendations:** Estimates daily fiber intake goals.
- **Weight Goal Tracking:** Calculates the distance to a target weight and an estimated timeline.
- **Interactive Nutrition Chart:** Displays macronutrient calorie distribution using a donut chart.
- **Responsive Interface:** Designed for desktop and smaller screens.

## Technologies Used

- **React** — Frontend user interface
- **TypeScript** — Application logic and type safetys
- **JavaScript** — Web application development
- **HTML5 & CSS3** — Page structure, styling, and responsive layouts
- **Vite** — Frontend development and build tooling
- **Recharts** — Interactive nutrition data visualization
- **Git & GitHub** — Version control and project management
- **Visual Studio Code** — Development environment

## How It Works

1. Users enter their age, sex, height, and current weight.
2. Users select their activity level and fitness goal.
3. MacroTraco estimates BMI, BMR, and maintenance calories.
4. The application adjusts calorie recommendations for weight loss, maintenance, or weight gain.
5. Daily protein, carbohydrate, fat, and fiber targets are calculated.
6. Results are displayed through summary cards, progress information, and an interactive chart.

All calculations currently run in the frontend.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/nikkibordbar-sudo/MacroTraco.git
```

Navigate to the frontend directory:

```bash
cd MacroTraco/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal to view the application.

## Future Improvements

- Daily food logging and nutrition tracking
- Personalized meal planning
- Progress charts for weight and nutrition goals
- User accounts and saved nutrition profiles
- Backend API and database integration
- Improved mobile experience
- Additional nutrition insights and recommendations

## Disclaimer

MacroTraco provides general nutrition and fitness estimates for informational purposes. Results are not medical advice, and individual nutritional requirements may vary.

## Developer

Developed by **Nikita Bordbar**

Personal software development project focused on frontend engineering, nutrition calculations, and interactive data visualization.