# Jeremiah Daniel Serenge - Data Engineering Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Designed specifically for data engineers and BI developers to showcase projects, architecture diagrams, and technical documentation.

## Features

- **Modern Dark Theme** — Professional aesthetic with gradient accents
- **Interactive PDF/PPT Viewer** — Built-in modal viewer for documents and flowcharts
- **Project Filtering** — Filter by category (Data Engineering, ML, BI, AI)
- **Animated Process Timeline** — Showcase your data engineering methodology
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **Contact Form** — Ready for Formspree/EmailJS integration
- **Scroll Animations** — Smooth reveal animations as you scroll
- **Particle Background** — Animated hero section
- **No Build Step Required** — Pure HTML/CSS/JS, works immediately

## Project Structure

```
data-engineer-portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # All interactivity
├── assets/
│   ├── docs/               # Your PDFs and PPTs for projects
│   │   ├── credit-risk-documentation.pdf
│   │   ├── mophones-case-study.pptx
│   │   ├── sales-forecasting-architecture.pdf
│   │   ├── chatbot-flowchart.pdf
│   │   ├── bigdata-pipeline-diagram.pdf
│   │   └── powerbi-dashboard-screenshots.pptx
│   ├── flowcharts/         # Your architecture diagrams
│   │   ├── etl-pipeline-architecture.pdf
│   │   ├── ml-lifecycle.pptx
│   │   ├── bi-architecture.pdf
│   │   └── copilot-mcp-workflow.pptx
│   └── images/             # Project screenshots, profile photo, etc.
└── README.md
```

## Quick Start

### 1. Download the Project
Download and extract the project folder to your computer.

### 2. Add Your Documents

**For Project Documentation:**
- Place your PDF files in `assets/docs/`
- Update the file references in `js/main.js` in the `projectDocs` object

**For Flowcharts/Architecture Diagrams:**
- Place your PDF/PPTX files in `assets/flowcharts/`
- Update the file references in `js/main.js` in the `flowchartDocs` object

**For Images:**
- Add project screenshots to `assets/images/`
- Replace the gradient placeholders in `index.html` with `<img>` tags

### 3. Customize Content

Open `index.html` and update:
- Your name and title in the hero section
- Your stats and metrics
- Project descriptions and links
- Contact information
- Social media links

### 4. Test Locally

Simply open `index.html` in your browser, or use VS Code's Live Server extension for live reloading.

## Hosting on GitHub Pages (Free)

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New Repository**
3. Name it `jserenge-portfolio` (or anything you like)
4. Make it **Public**
5. Click **Create repository**

### Step 2: Upload Your Files

**Option A: Via GitHub Web Interface**
1. In your new repo, click **"uploading an existing file"**
2. Drag and drop all project files
3. Click **Commit changes**

**Option B: Via Command Line (Recommended)**
```bash
# Navigate to your project folder
cd data-engineer-portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add your GitHub repo URL (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/jserenge-portfolio.git

# Push
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Select **main** branch and **/ (root)** folder
4. Click **Save**
5. Wait 2-3 minutes for the site to deploy
6. Your site will be live at: `https://YOUR_USERNAME.github.io/jserenge-portfolio/`

## Adding PDFs and PowerPoints

### Converting PPTX to PDF (Recommended for Web Viewing)
PowerPoint files cannot be viewed directly in browsers. For best results:

1. **Open your PPTX in PowerPoint or Google Slides**
2. **Export as PDF**: File → Export → Create PDF/XPS
3. **Save the PDF** to `assets/docs/` or `assets/flowcharts/`
4. **Update the reference** in `js/main.js`:

```javascript
'my-project': {
    title: 'My Project Title',
    file: 'assets/docs/my-project.pdf',  // Change from .pptx to .pdf
    type: 'pdf',
    fallbackMessage: 'Description here'
}
```

### For PPTX Files You Want to Keep as PowerPoint
If you want visitors to download the original PPTX:
- Keep the file as `.pptx` in the assets folder
- The modal will show a download button instead of a viewer
- Visitors can download and open in PowerPoint

## Customization Guide

### Changing Colors
Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --accent: #06b6d4;         /* Secondary accent */
    --bg-primary: #0f172a;     /* Background color */
    --text-primary: #f1f5f9;   /* Main text color */
}
```

### Adding New Projects
1. Copy an existing project card in `index.html`
2. Update the content, icons, and `data-category` attribute
3. Add the document reference in `js/main.js` under `projectDocs`
4. Add your PDF to `assets/docs/`

### Adding New Flowcharts
1. Add a new `flowchart-card` in the Process section of `index.html`
2. Add the document reference in `js/main.js` under `flowchartDocs`
3. Add your file to `assets/flowcharts/`

### Adding a Contact Form Backend
Since this is a static site, you need a form backend service:

**Option 1: Formspree (Easiest)**
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint URL
3. Replace the form in `index.html` with:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: EmailJS**
1. Sign up at [emailjs.com](https://emailjs.com)
2. Follow their setup guide
3. Update `js/main.js` to use EmailJS instead of the toast

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Data Engineers

1. **Export architecture diagrams as PDFs** — They render crisply at any zoom level
2. **Use high-res screenshots** for Power BI dashboards — 1920x1080 minimum
3. **Keep file sizes under 5MB** — Compress PDFs if needed for faster loading
4. **Name files descriptively** — Helps with SEO and organization
5. **Add alt text** if you replace gradient placeholders with actual images

## License

This portfolio template is free to use for personal and commercial projects.

---

**Built with passion by Jeremiah Daniel Serenge**
