# 🏋️‍♂️ FitBuddy - Student Wellness Application

A modern, responsive wellness web application designed for students to track their fitness journey, nutrition, mood, and achievements. Created as a frontend prototype for an internal hackathon.

![FitBuddy Preview](https://via.placeholder.com/800x400/10b981/ffffff?text=FitBuddy+Dashboard)

## ✨ Features

### 🔐 Login System
- **Stylish Login Page**: Modern glassmorphism design with animated background
- **Form Validation**: Real-time validation with visual feedback
- **SweetAlert2 Integration**: Beautiful success/error notifications
- **Remember Me**: Persistent login state
- **Social Login Buttons**: UI for Google, Facebook, and Apple integration
- **Forgot Password**: Email-based reset flow simulation

### 📊 Dashboard Components

#### 1. 🗺️ Daily Roadmap
- Interactive task list with progress tracking
- Real-time progress bar updates
- Task completion animations with confetti effects
- Achievement unlocks for completing all tasks

#### 2. 🍎 Nutrition Tracker
- Circular progress chart for daily calories
- Macro nutrient breakdown (Protein, Carbs, Fat)
- Add meal functionality with calorie tracking
- Animated progress bars

#### 3. 📖 Wellness Journal
- Mood tracking with emoji selection
- Text area for daily reflections
- Auto-save functionality
- Reflection history storage

#### 4. 🏆 Achievements
- Badge system with earned/locked states
- Statistics display (badges earned, streaks)
- Interactive badge details
- Achievement unlock animations

#### 5. 👥 Challenges
- Active challenge display with progress
- Leaderboard with user rankings
- Participant count and status
- Interactive user profiles

### 🎨 Design Features
- **Modern UI**: Clean, intuitive design with vibrant colors
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Optimized for desktop, tablet, and mobile
- **Animations**: Smooth transitions and hover effects
- **Toast Notifications**: Real-time feedback for user actions
- **Accessibility**: Focus states, keyboard shortcuts, and screen reader support

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation
1. **Clone/Download** the project files to your local directory
2. **Open** `index.html` in your browser or serve via a local web server

### Demo Credentials
For easy testing, use any of these login combinations:
- **Username:** `admin` **Password:** `admin123`
- **Username:** `demo` **Password:** `demo`
- **Username:** `user` **Password:** `123456`
- **Username:** `fitbuddy` **Password:** `wellness`

*Or use any username with a password of 4+ characters*

## 📱 Device Compatibility

### Desktop (1200px+)
- Full feature set with optimal layout
- Hover effects and animations
- Keyboard shortcuts support

### Tablet (768px - 1199px)
- Responsive grid layout
- Touch-friendly interactions
- Optimized spacing and typography

### Mobile (< 768px)
- Single-column layout
- Condensed navigation
- Touch-optimized controls
- Simplified mood/achievement grids

## 🎯 Usage Guide

### Login Process
1. Open `index.html` in your browser
2. Enter demo credentials (see above)
3. Click "Sign In" to access the dashboard
4. Enable "Remember Me" to stay logged in

### Dashboard Navigation
- **Theme Toggle**: Switch between light/dark modes
- **Profile Dropdown**: Access settings and logout
- **Interactive Cards**: Click on various elements to interact

### Key Interactions
- **Tasks**: Click to mark complete/incomplete
- **Mood**: Select your current mood
- **Journal**: Write and save daily reflections
- **Achievements**: Click badges for details
- **Nutrition**: Add meals with calorie tracking
- **Leaderboard**: Click users for profile info

### Keyboard Shortcuts
- **Ctrl/Cmd + D**: Toggle dark mode
- **Ctrl/Cmd + S**: Save journal entry
- **1-4 Keys**: Quick mood selection
- **Escape**: Close modals
- **Tab**: Navigate form fields

## 🛠️ Technical Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with variables, animations, and grid/flexbox
- **JavaScript (ES6+)**: Interactive functionality and local storage
- **Bootstrap 5**: Responsive grid and utility classes

### External Libraries
- **Font Awesome 6**: Icon library
- **Google Fonts (Poppins)**: Modern typography
- **SweetAlert2**: Beautiful modal dialogs
- **Toastify**: Toast notifications

### Features & APIs
- **Local Storage**: Data persistence
- **CSS Variables**: Dynamic theming
- **CSS Animations**: Smooth transitions
- **Responsive Design**: Media queries
- **Form Validation**: Client-side validation
- **Progressive Enhancement**: Works without JavaScript

## 📁 File Structure

```
FitBuddy/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── styles.css              # Complete stylesheet
├── script.js               # Login page JavaScript
├── dashboard.js            # Dashboard JavaScript
└── README.md              # This file
```

## 🎨 Color Palette

### Primary Colors
- **Green**: `#10b981` (Primary actions, success states)
- **Blue**: `#3b82f6` (Interactive elements, links)
- **Orange**: `#f97316` (Highlights, warnings)

### Theme Colors
- **Light Mode**: Clean whites and grays
- **Dark Mode**: Deep blues and subtle contrasts

### Gradients
- Primary: `linear-gradient(135deg, #10b981, #3b82f6)`
- Success: `linear-gradient(135deg, #10b981, #34d399)`
- Orange: `linear-gradient(135deg, #f97316, #fb923c)`

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Small**: 576px - 768px
- **Medium**: 768px - 992px
- **Large**: 992px - 1200px
- **Extra Large**: > 1200px

## 🔧 Customization

### Theme Colors
Modify CSS variables in `:root` selector in `styles.css`:

```css
:root {
    --primary-green: #10b981;
    --primary-blue: #3b82f6;
    --primary-orange: #f97316;
    /* ... more variables */
}
```

### Adding New Features
1. **HTML**: Add markup to `dashboard.html`
2. **CSS**: Style in `styles.css`
3. **JavaScript**: Add functionality in `dashboard.js`
4. **Events**: Wire up event listeners in `setupEventListeners()`

## 🐛 Browser Support

### Fully Supported
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Partially Supported
- Internet Explorer 11 (basic functionality)
- Older mobile browsers (reduced animations)

## 📊 Performance Optimizations

- **CSS**: Efficient selectors and minimal specificity
- **JavaScript**: Debounced inputs and throttled events
- **Images**: Optimized external image URLs
- **Fonts**: Preloaded Google Fonts
- **Animations**: Hardware-accelerated transforms
- **Storage**: Efficient localStorage usage

## 🔐 Security Considerations

*Note: This is a frontend prototype for demonstration purposes*

- **Client-side Only**: No real authentication
- **Demo Data**: All credentials are for demonstration
- **Local Storage**: Data stored locally in browser
- **No Backend**: No server-side validation or data processing

## 🤝 Contributing

This is a hackathon prototype, but suggestions for improvements are welcome:

1. **UI/UX Improvements**: Better animations, accessibility
2. **New Features**: Additional dashboard sections
3. **Performance**: Optimization suggestions
4. **Browser Compatibility**: Cross-browser testing
5. **Responsive Design**: Mobile experience enhancements

## 📈 Future Enhancements

### Planned Features
- **Data Visualization**: Charts for progress tracking
- **Social Features**: Friend connections and sharing
- **Workout Library**: Exercise database and tutorials
- **Meal Planning**: Recipe suggestions and meal prep
- **Integration**: Fitness tracker and health app connectivity

### Technical Improvements
- **Backend Integration**: User accounts and data sync
- **PWA Features**: Offline functionality and notifications
- **Real-time Updates**: Live data synchronization
- **Advanced Analytics**: Detailed progress insights
- **API Integration**: Third-party health and fitness services

## 🎯 Hackathon Goals Achieved

✅ **Responsive Design**: Works on all device sizes
✅ **Modern UI**: Clean, engaging visual design
✅ **Interactive Elements**: Dynamic user interactions
✅ **Toast Notifications**: Real-time feedback
✅ **Dark Mode**: Theme switching capability
✅ **Form Validation**: User input validation
✅ **Local Storage**: Data persistence
✅ **Animations**: Smooth transitions and effects
✅ **Accessibility**: Keyboard navigation and focus states
✅ **Cross-browser**: Compatible with major browsers

## 📄 License

This project is created for educational and demonstration purposes. Feel free to use as reference for your own projects.

## 💡 Tips for Developers

### CSS Tips
- Use CSS custom properties for theming
- Implement smooth transitions for better UX
- Utilize flexbox and grid for responsive layouts
- Add focus states for accessibility

### JavaScript Tips
- Debounce user inputs for performance
- Use localStorage for client-side persistence
- Implement proper error handling
- Add keyboard shortcuts for power users

### Design Tips
- Maintain consistent spacing and typography
- Use meaningful animations that enhance UX
- Implement proper color contrast ratios
- Test on real devices, not just browser dev tools

---

**Built with ❤️ for the FitBuddy Hackathon**

*Ready to start your wellness journey? Open `index.html` and let's get fit! 💪*