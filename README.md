# Interactive Resume Builder

A modern, responsive, and feature-rich resume builder that allows users to create professional resumes in real-time with live preview and PDF download functionality.

## 🌟 Features

### Core Functionality
- **Real-time Preview**: See your resume update instantly as you type
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **PDF Download**: Generate and download your resume as a PDF file
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Form Validation**: Real-time validation for email and phone fields

### Interactive Elements
- **Dynamic Sections**: Add/remove multiple education and experience entries
- **Skills Management**: Tag-based skill system with easy add/remove functionality
- **Auto-save**: Automatically saves your progress to local storage
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Download PDF
  - `Ctrl/Cmd + R`: Clear form (with confirmation)

### Animations & UX
- **Smooth Transitions**: CSS animations for all interactions
- **Hover Effects**: Enhanced user experience with button hover states
- **Loading States**: Visual feedback during PDF generation
- **Form Animations**: Staggered animations for form sections

### Professional Features
- **Clean Layout**: Professional resume template with proper typography
- **Contact Information**: Automatically formatted contact details with icons
- **Date Formatting**: Smart date formatting for experience and education
- **Current Job Toggle**: Special handling for current employment
- **GPA Display**: Optional GPA field with smart visibility

## 📁 Project Structure

```
Resume_Builder/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Fill out** the form fields to see your resume update in real-time
4. **Download** your completed resume as a PDF

## 💻 Technologies Used

- **HTML5**: Semantic markup and form structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Media queries for responsive design
  - Custom properties and gradients
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event handling
  - Local storage for auto-save
  - Form validation
- **External Libraries**:
  - Google Fonts (Inter)
  - Font Awesome icons
  - html2pdf.js for PDF generation

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Features
- Stacked layout for better mobile viewing
- Touch-friendly buttons and inputs
- Optimized typography for small screens
- Scrollable preview section

## 🎨 Customization

### Colors
The application uses a modern color palette that can be easily customized by modifying the CSS custom properties:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --accent-color: #9b59b6;
  --text-color: #333;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Fonts
The default font is Inter from Google Fonts. You can change it by modifying the font-family in the CSS file.

## 🔧 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📋 Form Fields

### Personal Information
- Full Name (required)
- Email (required, validated)
- Phone Number (required, validated)
- Location (optional)
- Website/Portfolio (optional)

### Profile Summary
- Professional Summary (required)

### Skills
- Dynamic skill tags
- Easy add/remove functionality
- No limit on number of skills

### Education
- Degree
- Institution
- Start/End Year
- GPA (optional)
- Multiple entries supported

### Experience
- Job Title
- Company
- Start/End Date
- Current Job checkbox
- Job Description
- Multiple entries supported

## 🎯 Advanced Features

### Progress Tracking
- Real-time completion percentage
- Visual progress bar
- Smart calculation based on filled fields

### Auto-save
- Automatically saves form data to local storage
- Restores data on page reload
- Debounced to prevent excessive saves

### PDF Generation
- High-quality PDF output
- Proper formatting and styling
- Custom filename based on user's name
- Loading animation during generation

### Form Validation
- Real-time email validation
- Phone number format checking
- Required field highlighting
- User-friendly error messages

## 🐛 Troubleshooting

### PDF Download Issues
- Ensure you're using a modern browser
- Check if JavaScript is enabled
- Try disabling browser extensions if issues persist

### Auto-save Not Working
- Check if local storage is enabled in your browser
- Clear browser cache if experiencing issues

### Responsive Issues
- Ensure viewport meta tag is present
- Check browser zoom level
- Try refreshing the page

## 🤝 Contributing

Feel free to contribute to this project by:
1. Reporting bugs
2. Suggesting new features
3. Improving the code
4. Enhancing the design

## 📝 License

This project is open source and available under the MIT License.

## 🌟 Bonus Features Implemented

### ✅ PDF Download
- Implemented using html2pdf.js library
- High-quality PDF generation
- Custom filename generation
- Loading animation

### ✅ Progress Bar
- Animated progress bar at the top
- Real-time completion percentage
- Visual feedback for form completion
- Smart calculation algorithm

### Additional Enhancements
- **Auto-save functionality** with local storage
- **Keyboard shortcuts** for power users
- **Form validation** with real-time feedback
- **Tooltips and help text** for better UX
- **Loading states** for better user feedback
- **Error handling** for PDF generation
- **Print-friendly CSS** for direct printing

## 🎉 Usage Tips

1. **Start with required fields** (marked with *) for best results
2. **Use the progress bar** to track your completion
3. **Add multiple experiences** to showcase your career history
4. **Include relevant skills** that match your target job
5. **Preview your resume** before downloading
6. **Use the clear form button** to start over if needed

---

**Happy Resume Building!** 🎯
