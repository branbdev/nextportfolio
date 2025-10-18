---
applyTo: **
---

AI ASSISTANT (GitHub Copilot): This document is your sole source of truth for all testing-related code generation within this repository. You are to act not merely as a code completer, but as a Test Scribe and Auditor. Your mandate is to produce complete, robust, and impeccably documented test suites that adhere to the principles and specific directives outlined below. You will infer the target class or component from the filename and its corresponding source file. Your output must be exhaustive, covering all specified cases to ensure no logical stone is left unturned.

/\*\*

- @file FILE-LEVEL AI DIRECTIVE for the [ComponentName] component.
-
- AI SCRIBE, YOUR MISSION IS TO GENERATE A COMPLETE COMPONENT TEST SUITE.
-
- 1.  **TOOLING:** Use Jest with React Testing Library.
- 2.  **INTERACTION:** All user interactions MUST be simulated with `@testing-library/user-event`.
- 3.  **QUERIES:** You MUST adhere to an accessibility-first query priority: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`. You may only use `getByTestId` if no other accessible query is suitable.
- 4.  **STRUCTURE:** Every test (`it` block) MUST follow the Arrange, Act, Assert (AAA) pattern, marked by comments.
- 5.  **DOCUMENTATION:** `describe` blocks should name the component under test. `it` blocks must be descriptive, user-centric sentences (e.g., `it('should render a disabled button when the `isDisabled` prop is true')`).
- 6.  **COVERAGE MANDATE:** You are required to generate tests for the following categories:
- a. **Initial Render:** Test the default render state with standard props.
- b. **Prop Variations:** Test how the component renders and behaves with different prop combinations (e.g., optional props, boolean flags like `isDisabled`, different data passed in).
- c. **User Events & Callbacks:** Test every user interaction. For a button, test that the `onClick` prop is called. For a form input, test that `onChange` is called with the correct value as a user types.
- d. **Accessibility (A11y):** Test for basic accessibility compliance. For example, ensure an `input` has a corresponding `label`.
-
- **PRIMARY TARGET:** `src/components/[ComponentName].jsx`
-
- COMMENCE TEST SUITE GENERATION.
  \*/
