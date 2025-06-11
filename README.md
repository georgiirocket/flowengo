## Flowengo

Flowengo is a clean, fast, and minimalist desktop application for managing tasks with a Kanban-style board. Whether you're planning personal goals, managing work projects, or organizing your daily to-dos, Flowengo helps you stay focused and in control.

Create boards, add task cards, move them across customizable columns, and track your progress—all without distractions, right on your desktop.

---

### System requirements
- **Windows:** 7 and above
- **macOS:** 10.15 and above
- **Linux:** webkit2gtk 4.0 for Tauri v1 (for example Ubuntu 18.04). webkit2gtk 4.1 for Tauri v2 (for example Ubuntu 22.04).

---

### Windows
[![Download for Windows](https://img.shields.io/badge/Windows-x64-blue?logo=windows)](https://github.com/georgiirocket/flowengo/releases/latest/download/flowengo_0.1.5_x64_en-US.msi)

### MacOS
[![Download for macOS (Apple Silicon)](https://img.shields.io/badge/macOS-ARM--aarch64-lightgrey?logo=apple)](https://github.com/georgiirocket/flowengo/releases/latest/download/flowengo_0.1.5_aarch64.dmg)
[![Download for macOS (Intel)](https://img.shields.io/badge/macOS-Intel--x64-lightgrey?logo=apple)](https://github.com/georgiirocket/flowengo/releases/latest/download/flowengo_0.1.5_x64.dmg)

Apple Silicon users, please run this command to prevent the error saying the app is broken (not required if installing using homebrew):
```bash
xattr -cr /Applications/flowengo.app
```

### Linux

[![Download for Linux](https://img.shields.io/badge/Linux-x64-yellow?logo=linux)](https://github.com/georgiirocket/flowengo/releases/latest/download/flowengo_0.1.5_amd64.deb)

- Download app
- Open Downloads
- Right mouse click (Open current folder in terminal)

```bash
sudo dpkg -i flowengo_0.1.5_amd64.deb
```

---

### Crypto

We use cryptography when storing your data on disk.

<img src="./screenshot/auth.png" alt="auth" width="1000"/>

### Common board

- Fast and intuitive interface.
- Easy navigation
- Moving tasks between columns

<img src="./screenshot/board.png" alt="board" width="1000"/>


### Several boards

- Create multiple projects
- Create custom columns
- Rename them and swap them out.
- Free switching between projects

<img src="./screenshot/new-project.png" alt="new-project" width="1000"/>
<img src="./screenshot/multi-project.png" alt="multi" width="1000"/>

### Task handling

- Create, modify, move, remove, view tasks
- Use Rich editor for detailed task descriptions

<img src="./screenshot/edit-task.png" alt="edit-task" width="1000"/>
<img src="./screenshot/view-task.png" alt="view-task" width="1000"/>

### Theme

- Light and dark mode
- You can use the system theme if your device supports it

<img src="./screenshot/theme.png" alt="theme" width="1000"/>

---


### FAQ

#### I forgot my password

You can reset all data along with your account. This can be done by selecting “Drop user data” from the system menu

#### Can I recover my data if I lose my password?

Since we can't verify the authenticity of your face. The only options are to reset your data or enter the correct password

---

### Tech Stack

**Client:** React, TailwindCSS, Rust, Tauri

---

### Development

Requirements: Rust, Npm, Cargo

Install node dependencies

```bash
npm install
```


Start project:

```bash
npm run tauri dev
```

Generate icons

```bash
npm run tauri icon
```

Build project

```bash
npm run tauri build
```



> Node: v22.13.0 Npm: 10.9.2 Rust: 1.86.0