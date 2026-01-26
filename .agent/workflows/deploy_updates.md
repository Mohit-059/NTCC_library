---
description: How to update and redeploy the website
---
# How to Update Your Live Website

Whenever you make changes to the code (like changing text, colors, or adding features), follow these steps to update the live version at college.

1.  **Save your changes** in VS Code.
2.  **Open the Terminal** (Ctrl+~).
3.  **Run these two commands**:

```bash
npm run build
// turbo
firebase deploy
```

**That's it!**
*   `npm run build`: Compresses your code into the `build` folder.
*   `firebase deploy`: Uploads that `build` folder to the internet.

Your changes will be live in about 30 seconds.
