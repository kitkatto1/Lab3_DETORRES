# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Laboratory Exercise 3: React Props and Component Communication

## Guide Questions

1. **What is the difference between props and state?**
   Props (properties) are external inputs passed from a parent component to a child component and are read-only. State is internal data managed within a component itself that can change over time and trigger re-renders when updated.

2. **Why can a child component not modify the props it receives?**
   React enforces a strict one-way (unidirectional) data flow where props are immutable inside the child component. Preventing children from mutating props keeps data predictable, easier to debug, and ensures the parent remains the single source of truth.

3. **How does the `onAddToCart` callback allow data to flow from child to parent even though props only flow downward?**
   The parent passes a function reference downward as a prop (`onAddToCart`). When an event happens in the child (like a button click), the child executes that function and passes arguments (such as `title`) back into it, allowing the parent's function to receive the data and update its own state.

4. **Why is the `key` prop required when rendering a list with `.map()`? What could happen if it is missing or duplicated?**
   The `key` prop helps React uniquely identify each element in a list so it knows which items were added, changed, or removed during re-renders. If keys are missing or duplicated, React may render the wrong UI state, lose component focus/input values, or experience performance issues.

5. **What does the `children` prop allow you to do that a normal prop does not?**
   The `children` prop allows a parent component to pass arbitrary JSX elements, HTML tags, or other components directly between the opening and closing tags of a child component, enabling flexible wrapper and layout composition.