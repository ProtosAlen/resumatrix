# 💼 Resumatrix

**Resumatrix** is a sleek resume builder web app built with **React**, powered by **Vite**, styled with **NextUI** and **Tailwind CSS**, and deployed with ease on **Vercel** 🚀. It helps you create and manage beautiful resumes with zero hassle.

👉 [Try it on Vercel](https://resumatrix-dev.vercel.app/)

---

## 🛠️ Technologies Used

- ⚛️ [React](https://react.dev/): For building interactive UIs.
- ⚡ [Vite](https://vitejs.dev/guide/): Lightning-fast dev environment.
- 💎 [NextUI](https://nextui.org): Gorgeous React UI components.
- 🌈 [Tailwind CSS](https://tailwindcss.com): Utility-first CSS styling.
- 🎭 [Tailwind Variants](https://tailwind-variants.org): Style components with smart variants.
- ✨ [TypeScript](https://www.typescriptlang.org): Strongly typed JavaScript.
- 🎞️ [Framer Motion](https://www.framer.com/motion): Smooth animations for React.
- ☁️ [Vercel](https://vercel.com): Easy deployment & hosting.

---

## ⚡ Quick Start

### 📥 Clone the Repository

```bash
git clone https://github.com/nextui-org/vite-template.git
cd vite-template # or your project folder
```

### 📦 Install Dependencies

We recommend using **Yarn** 🧶 for best compatibility:

```bash
yarn install
```

> You can still use `npm`, `pnpm`, or `bun` if you prefer.

Using `pnpm`? Optionally add this to your `.npmrc`:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

Then:

```bash
pnpm install
```

### 🔧 Run the Development Server

```bash
yarn dev
```

---

## 🧠 VS Code Debugging (Optional)

Want to debug with Chrome + VS Code? Here's how:

1. Create a `.vscode/launch.json` file with this content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run Vite Dev Server",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "never"
    },
    {
      "type": "chrome",
      "request": "attach",
      "name": "Debug Chrome (Attach to Vite)",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ],
  "compounds": [
    {
      "name": "Debug Vite + Chrome (Attach)",
      "configurations": ["Run Vite Dev Server", "Debug Chrome (Attach to Vite)"],
      "stopAll": true
    }
  ]
}
```

2. 🧩 Install the **Debugger for Chrome** extension in VS Code.
3. 🐞 Open the Debug panel → Select **Debug Vite + Chrome (Attach)** → Hit play!

---

## 🌍 Deploy to Vercel

1. 📤 Push your code to GitHub/GitLab/Bitbucket.
2. 📝 Create a free account on [vercel.com](https://vercel.com).
3. ➕ Add a new project → Link your repo.
4. 🧠 Vercel auto-detects your setup.
5. 🚀 Click **Deploy** – and boom, you’re live!

---

## 📚 Useful Links

- 📘 [NextUI Docs](https://nextui.org/docs)
- 🌀 [Tailwind Docs](https://tailwindcss.com/docs)
- ⚡ [Vite Docs](https://vitejs.dev/guide/)
- ⚛️ [React Docs](https://react.dev/)
- ☁️ [Vercel Docs](https://vercel.com/docs)

---

## 📄 License

Licensed under the [MIT license](https://github.com/nextui-org/vite-template/blob/main/LICENSE).

---

Made with 💙 to help you build resumes effortlessly. Happy coding with **Resumatrix**! ✨
