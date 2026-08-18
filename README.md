# Jeremiah Daniel Serenge - Data Engineering Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Designed specifically for data engineers and BI developers to showcase projects, architecture diagrams, and technical documentation.

## Features

- **Modern Dark Theme** — Professional aesthetic with gradient accents
- **Interactive Document Viewer** — Built-in modal viewer for PDFs and self-contained HTML diagrams/dashboards
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
│   └── main.js              # All interactivity
├── assets/
│   ├── docs/                # Your PDFs and self-contained HTML docs for projects
│   │   ├── credit-risk-documentation.pdf
│   │   ├── mophones-case-study.pptx
│   │   ├── sales-forecasting-architecture.pdf
│   │   ├── bigdata-pipeline-diagram.html          # interactive, replaces old .pdf
│   │   └── jd-bi-loan-portfolio-dashboard.html    # Power BI screenshot viewer
│   ├── flowcharts/          # Your architecture diagrams
│   │   ├── etl-pipeline-architecture.pdf
│   │   ├── ml-lifecycle.pptx
│   │   ├── bi-architecture.pdf
│   │   └── support-copilot-rag-pipeline.html      # interactive, replaces old chatbot-flowchart.pdf
│   └── images/               # Project screenshots, profile photo, etc.
│       ├── 00-cover.png                # JD.BI dashboard — cover/summary
│       ├── 01-executive-overview.png
│       ├── 02-risk-credit-quality.png
│       ├── 03-collections.png
│       ├── 04-branch-performance.png
│       └── 05-customer-lending.png
└── README.md
```

> **Note:** `bigdata-pipeline-diagram.html`, `jd-bi-loan-portfolio-dashboard.html`, and `support-copilot-rag-pipeline.html` are self-contained interactive documents (no external files needed except the dashboard's screenshots in `assets/images/`) — see **Adding Interactive HTML Diagrams** below for how they're wired into the viewer.

## Quick Start

### 1. Download the Project
Download and extract the project folder to your computer.

### 2. Add Your Documents

**For Project Documentation:**
- Place your PDF or HTML files in `assets/docs/`
- Update the file references in `js/main.js` in the `projectDocs` object

**For Flowcharts/Architecture Diagrams:**
- Place your PDF/PPTX/HTML files in `assets/flowcharts/`
- Update the file references in `js/main.js` in the `flowchartDocs` object

**For Images:**
- Add project screenshots to `assets/images/`
- Referenced directly by any HTML viewer that needs them (e.g. the JD.BI dashboard viewer), or dropped into `index.html` as `<img>` tags for static project cards

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

## Adding Interactive HTML Diagrams

Some project docs are now self-contained HTML instead of static PDFs — useful for architecture diagrams with animated data flow, phase toggles, or a screenshot-based dashboard viewer with tabs and zoom. These render inside the same modal viewer as PDFs; just point the config at the `.html` file and set `type: 'html'`:

```javascript
'bigdata': {
    title: 'Big Data Pipeline - Diagram',
    file: 'assets/docs/bigdata-pipeline-diagram.html',
    type: 'html',
    fallbackMessage: 'Enterprise big data pipeline architecture diagram'
},
'dashboard': {
    title: 'JD.BI - Loan Portfolio Dashboard',
    file: 'assets/docs/jd-bi-loan-portfolio-dashboard.html',
    type: 'html',
    fallbackMessage: 'Power BI loan portfolio management dashboard (screenshots)'
},
'copilot-rag': {
    title: 'Support Copilot - RAG Pipeline',
    file: 'assets/flowcharts/support-copilot-rag-pipeline.html',
    type: 'html',
    fallbackMessage: 'Retrieval-augmented generation architecture for a support copilot'
}
```

A couple of things to keep in mind:
- **Relative paths matter.** `jd-bi-loan-portfolio-dashboard.html` references its screenshots as `../images/...png` — that only resolves correctly if the HTML sits in `assets/docs/` and the images sit one level up in `assets/images/`. Don't move one without the other.
- **Fonts load from Google Fonts CDN** on these HTML files (Space Grotesk / IBM Plex Mono / Inter) — fine for a hosted site, but they won't render their intended type if opened fully offline.
- These are unrelated to the "beta feature" Power BI screenshots problem — the dashboard viewer displays your screenshots as-is (no re-rendering), since the report itself can't be hosted live without an active Power BI license.

## Converting PPTX to PDF (For Files You're Keeping as PDF)
PowerPoint files cannot be viewed directly in browsers. For projects you're keeping as static PDFs rather than converting to interactive HTML:

1. **Open your PPTX in PowerPoint or Google Slides**
2. **Export as PDF**: File → Export → Create PDF/XPS
3. **Save the PDF** to `assets/docs/` or `assets/flowcharts/`
4. **Update the reference** in `js/main.js`:

```javascript
'my-project': {
    title: 'My Project Title',
    file: 'assets/docs/my-project.pdf',
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
4. Add your PDF or HTML file to `assets/docs/`

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

1. **Export static architecture diagrams as PDFs** — They render crisply at any zoom level
2. **Use interactive HTML for diagrams that benefit from motion or state** — animated data flow, phase toggles, hover detail
3. **Use high-res screenshots** for Power BI dashboards — 1920x1080 minimum
4. **Keep file sizes under 5MB** — Compress PDFs and images if needed for faster loading
5. **Name files descriptively** — Helps with SEO and organization
6. **Add alt text** if you replace gradient placeholders with actual images

## License

This portfolio template is free to use for personal and commercial projects.

---

**Built with passion by Jeremiah Daniel Serenge**
