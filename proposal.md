# MODZ Kiosk — Technical Proposal

## Research on Suggested Solutions

### FlipHTML5 ❌ Not Suitable
- Offline mode works **only on Android devices**
- For Linux/Raspberry Pi, a **paid plan** is required to download the local version
- [Official Documentation](https://help.fliphtml5.com/docs/offline-reading/)

### FlowPaper ❌ Not Suitable
- Self-hosted version requires a **paid license**
- No free offline solution available for our use case

---

## ✅ Recommended Solution

**Pi-Kiosk + Local Web Application**

We will create a fully autonomous application that works without internet:

```
Raspberry Pi
    └── Auto-launch browser in fullscreen mode
        └── Local website (stored on the Pi itself)
            ├── Home screen with 4 brand buttons
            ├── Catalog viewer with swipe navigation
            └── PDF pages as optimized images
```

---

## Why This Solution?

| Criteria | Status |
|----------|--------|
| Works completely offline | ✅ |
| Touch and swipe support | ✅ |
| Fast page loading | ✅ |
| Easy to use | ✅ |
| Reliable | ✅ |
| Free technologies | ✅ |

---

## What Will Be Implemented

✅ **Home Screen** — 4 buttons to select a brand (MODZ, MODZ Battery, EKT, MC)

✅ **Home Button** — return to home screen from anywhere

✅ **Back Button** — return to the current catalog's table of contents

✅ **Table of Contents** — tap a section (e.g., "Wheels") = jump to that page

✅ **Swipe Left/Right** — flip through catalog pages

✅ **Auto-Reset** — after 10 minutes of inactivity, screen returns to home

---

## Questions Before Starting Development

To begin work, I need the following information:

1. **What Raspberry Pi model do you have?**  
   (Pi 4 or Pi 5 — affects configuration)

2. **What is the ELO kiosk screen resolution?**  
   (Needed to optimize images for the display)

3. **Are the 4 PDF catalog files ready?**  
   (Needed to convert into images)

4. **What sections should be in each catalog's table of contents?**  
   (Section names and which pages they link to)

5. **Is the home screen design finalized?**  
   (Or should we use the concept version?)

---

## Next Steps

After receiving your answers:

1. Set up Raspberry Pi in kiosk mode
2. Convert PDFs into optimized images
3. Develop the interface to match your design
4. Test on actual hardware
5. Clone setup to the second kiosk

---

*Happy to answer any questions!*

