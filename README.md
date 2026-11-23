# CvSU Mini Store (Lab 4: Live Search and Filter)

A React mini product catalog with live search, category filter, price sorting,
and a debounced search input. Built with Vite and React hooks (`useState`, `useEffect`).

## Features

- Controlled search box, category dropdown, and sort dropdown (`SearchBar` component)
- 300ms debounced search using `useEffect`, `setTimeout`, and a cleanup function
- Filtered and sorted list calculated during render (original data is never mutated)
- Result count ("Showing X of Y products") and an empty-state message
- Browser tab title updates with the number of results
- Clear Filters button resets all inputs
- Add to Cart message from Lab 3 still works

## Run the project

```bash
npm install
npm run dev
```

## Guide Questions

**1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?**

searchText has to update on every keystroke so the input box stays responsive
and controlled. debouncedSearch only updates after the user pauses typing for
300ms, so the filtering is not recalculated on every single keystroke.

**2. What would happen if the debounce effect did not return a cleanup function?**

Every keystroke would leave its own timer running. The old timers would still
fire and update debouncedSearch, so the list would update many times with
outdated values instead of only once after the final pause. The cleanup calls
clearTimeout to cancel the previous timer each time searchText changes.

**3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**

The dependency array tells React when to re-run the effect: only when one of
the listed values has changed since the last render.
- Empty array `[]`: the effect runs only once, after the first render.
- Left out completely: the effect runs after every render, which causes
  unnecessary work and can create infinite loops if the effect updates state.

**4. Why should we avoid sorting the original products array directly?**

`.sort()` mutates the array it is called on. Mutating the original data goes
against React's rule of not mutating data, can cause bugs in other parts of the
app, and makes it impossible to return to the default order. Copying first
(`[...products]`) keeps the original intact.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**

It is better calculated during rendering. The filtered list is derived from
existing state (debouncedSearch, category, sortOrder), so storing it in its own
state would duplicate data and risk it going out of sync. Calculating it on
each render keeps one source of truth and requires less code.