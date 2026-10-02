# FAQ Chatbot --- 3-Day Implementation Plan for Gemini CLI

## 1. Project overview

**Project title:** Chatbot for FAQs\
**Timeline:** 3 days\
**Goal:** Build a small web application where a user enters a question
and receives the best-matching answer from a curated FAQ dataset.

### Required features

-   A curated collection of FAQ questions and answers for one clearly
    defined topic.
-   Text cleaning and normalization.
-   Similarity-based FAQ matching using TF-IDF and cosine similarity, or
    an equally simple, explainable intent-matching approach.
-   A chat-style interface that displays the user's question and the
    matched answer.
-   A sensible fallback when no FAQ is sufficiently similar.
-   Optional copy-answer button, if all required features and tests are
    complete.

### Fixed scope for this 3-day project

Use **one topic only** for the initial FAQ dataset. If the user has not
selected a topic, ask once before implementing; do not silently invent a
product or organization. Keep the FAQ data in a simple local JSON file
unless the existing repository already has an established data format.

Recommended default technical direction, subject to repository
inspection: - Frontend: React with the repository's existing build tool.
If no frontend exists, use Vite + React. - Styling: use **React Bits**
and **Vengence UI** only where their actual package names, installation
instructions, and compatible components can be verified. Do not guess
package names or APIs. If either library is unavailable or incompatible,
stop and report the blocker; use plain CSS only after explicit
approval. - Matching: Python backend using scikit-learn TF-IDF + cosine
similarity, unless the repository already has a simpler compatible
stack. Do not introduce a second backend framework without approval. -
API: one small endpoint that accepts a question and returns the best FAQ
answer, matched question, and similarity score. - Data: local JSON FAQ
dataset. - No authentication, database, cloud deployment, LLM API, user
accounts, analytics, or unrelated features unless explicitly approved.

## 2. How Gemini CLI must operate

This file is the project contract. Treat it as the **single source of
truth** for project scope, workflow, and task selection.

### Non-negotiable operating rules

1.  **Read this file first** at the start of every session and before
    every phase.
2.  Work on **one phase at a time**. Never start a later phase until the
    current phase's acceptance checklist passes and the user authorizes
    moving on.
3.  At the beginning of a phase, print:
    -   current phase and its goal;
    -   the exact checklist items planned for this phase;
    -   files expected to be created or changed;
    -   any blockers or decisions that require user input.
4.  Execute only the tasks explicitly listed in the active phase's TODO
    list. Do not add features, refactor unrelated code, change the
    stack, or work ahead.
5.  **Inspect before editing.** First list and read relevant files,
    package manifests, configuration, and existing conventions. Do not
    overwrite an existing project or delete files without explicit
    permission.
6.  If this is an existing repository, preserve its architecture and
    naming conventions unless a listed task requires a change.
7.  If a requirement is ambiguous, libraries cannot be verified, or a
    dependency conflicts with the project, stop and ask the user. Do not
    guess, silently substitute, or install an alternative.
8.  Before installing any dependency, state why it is needed and verify
    its official package name and compatibility using the repository and
    official documentation available to you. Ask permission before
    adding a dependency not listed in this file or the existing
    manifest.
9.  Do not run destructive commands, delete user data, rewrite Git
    history, expose secrets, or modify environment files containing
    credentials.
10. Never place API keys, passwords, tokens, or private data in source
    code, logs, screenshots, or Git.
11. Do not claim a task or test passed unless you actually ran it and
    checked the result. If a test cannot run, report it as **NOT RUN**
    and explain why.
12. Do not fabricate test output, FAQ content, package APIs, file paths,
    screenshots, or completion status.
13. Keep changes minimal. Do not perform unrelated formatting, broad
    refactors, or speculative "improvements."
14. After editing, inspect the diff and summarize every file changed.
15. Do not start the next phase automatically. Stop after the phase
    report and wait for the user to say **"Proceed to Phase N."**
16. If the user asks for a task outside the active phase, explain which
    phase it belongs to and wait for authorization rather than doing it
    early.
17. Keep the implementation understandable for a student project. Prefer
    a small, readable solution over unnecessary abstractions.
18. If a command fails, show the relevant error, diagnose only what is
    needed for the active phase, and ask before making scope-changing
    fixes.
19. Never use real customer data. Use only user-approved, public, or
    clearly fictional sample FAQs.
20. Do not silently claim the project is production-ready. Document
    known limitations.

### Required phase-end report

At the end of each phase, provide: - **Status:** PASS / BLOCKED /
PARTIAL. - **Completed checklist:** each item marked complete only if
verified. - **Files changed:** path and purpose. - **Commands/tests
run:** command and concise actual result. - **Acceptance checks:** PASS
/ FAIL / NOT RUN with evidence. - **Known issues and decisions
needed.** - **Next phase:** name only; do not execute it. - Wait for
user authorization.

## 3. Master prompt for Gemini CLI

Copy and paste the following prompt to begin the project:

> You are the implementation assistant for the **FAQ Chatbot** student
> internship project. The file `PROJECT_WORKFLOW.md` is the controlling
> specification and the only authorized task list.
>
> **First action:** read `PROJECT_WORKFLOW.md` completely. Then inspect
> the current repository without modifying anything. Report the existing
> folder structure, relevant files, current stack, available scripts,
> and whether React Bits and Vengence UI can be verified as compatible
> dependencies/components. Do not install or edit anything during this
> initial inspection.
>
> **Strict scope:** implement only the active phase's TODO items. Do not
> invent requirements, select a topic without asking, add extra
> features, change the architecture, install unapproved dependencies, or
> begin another phase. Ask before making a decision that is not
> explicitly covered here.
>
> **Required application behavior:** the user types a question in a chat
> UI; the application normalizes the text, compares it with the curated
> FAQ questions using the approved matching method, and returns the best
> matching answer only when the score meets the configured threshold.
> Otherwise it returns a polite fallback and may suggest a few known FAQ
> questions. The response must not pretend the answer is guaranteed
> correct.
>
> **Matching requirements:** make the matching logic deterministic and
> explainable. Use TF-IDF with cosine similarity unless the inspected
> project requires an approved alternative. Return the matched FAQ
> question, answer, and similarity score for debugging/display only if
> approved in the UI plan. Put the fallback threshold in one clearly
> named configuration location. Handle empty input and an empty FAQ
> dataset safely. Never send user questions to an external service.
>
> **UI requirements:** create a responsive, accessible chat interface
> with clear message roles, readable text, loading/error/empty states
> where applicable, and keyboard-friendly input. Use React Bits and
> Vengence UI only after verifying the exact packages/components and
> their documented usage. Never guess APIs. If either library is not
> usable, stop and ask for approval before substituting plain CSS or
> another component library.
>
> **Engineering rules:** inspect before editing; use the existing
> conventions; make minimal changes; do not delete or overwrite user
> work; do not expose secrets; do not add authentication, a database,
> cloud services, LLM APIs, analytics, or unrelated features. Do not
> claim tests passed unless they were run.
>
> **Workflow:** execute only Phase 1 initially. Print the phase plan and
> intended file changes before editing. At the end, run only relevant
> checks available for that phase, inspect the diff, report
> PASS/BLOCKED/PARTIAL with evidence, and stop. Wait for my exact
> authorization before proceeding to the next phase.
>
> If any required decision is missing or any dependency/API is
> uncertain, ask a concise question and do not guess.

## 4. Three-day schedule

  -----------------------------------------------------------------------
  Day                     Phase                   Main outcome
  ----------------------- ----------------------- -----------------------
  Day 1 --- first half    Phase 1: Inspect and    Confirm topic, stack,
                          plan                    scope, and repository
                                                  plan

  Day 1 --- second half   Phase 2: FAQ data and   Curated FAQs and tested
                          matching engine         similarity logic/API

  Day 2                   Phase 3: Chat UI        Responsive chat
                                                  interface connected to
                                                  the approved API

  Day 3 --- first half    Phase 4: Integration    End-to-end behavior and
                          and testing             edge cases verified

  Day 3 --- second half   Phase 5: Documentation  Run instructions,
                          and handoff             screenshots if
                                                  requested, and final
                                                  checklist
  -----------------------------------------------------------------------

**Time-box rule:** prioritize the required working flow over optional
polish. If time runs short, defer the optional copy button and visual
extras; do not skip core matching, fallback behavior, or tests. If a
blocker makes the three-day schedule unrealistic, report it rather than
hiding it.

------------------------------------------------------------------------

# Phase 1 --- Repository inspection and plan

**Target:** Day 1, first half\
**Goal:** Understand the repository and freeze a minimal, approved
implementation plan without making code changes.

## Phase 1 master prompt

> Read `PROJECT_WORKFLOW.md` and follow its operating rules. Work on
> Phase 1 only.
>
> Inspect the repository in read-only mode. Identify the operating
> environment, folder structure, package manifests, existing
> frontend/backend, test setup, run scripts, and current Git changes if
> available. Do not print secrets or the contents of credential files.
>
> Check whether React Bits and Vengence UI are identifiable from
> official documentation/package metadata and compatible with the
> existing React version. Do not assume their package names or APIs. If
> you cannot verify a library, record it as BLOCKED and ask me what to
> do.
>
> Ask me to confirm the FAQ topic if it is not already specified. Do not
> invent the topic or create fake organization-specific answers.
>
> Produce a concise implementation plan mapped exactly to Phases 2--5,
> with proposed file paths and acceptance checks. Do not install
> dependencies, create files, or edit code in this phase. Stop and wait
> for approval.

## Phase 1 TODO

-   [ ] Read this entire workflow file.
-   [ ] Inspect the existing project structure and manifests without
    editing.
-   [ ] Identify existing framework, scripts, and tests.
-   [ ] Confirm the FAQ topic with the user if missing.
-   [ ] Verify React Bits and Vengence UI availability/compatibility; do
    not guess.
-   [ ] Identify blockers and decisions requiring approval.
-   [ ] Present the proposed file plan for Phases 2--5.
-   [ ] Make no code changes in this phase.

## Phase 1 acceptance checklist

-   [ ] Existing stack and relevant files are documented.
-   [ ] FAQ topic is user-approved.
-   [ ] UI library compatibility is verified or explicitly marked
    BLOCKED.
-   [ ] Phase plan stays within this file's scope.
-   [ ] No files or dependencies were changed.

------------------------------------------------------------------------

# Phase 2 --- FAQ dataset and matching engine

**Target:** Day 1, second half\
**Goal:** Build and test the FAQ data structure and deterministic
similarity matching. Implement only after Phase 1 is approved.

## Phase 2 master prompt

> Read `PROJECT_WORKFLOW.md`, then execute Phase 2 only. Follow the
> approved Phase 1 plan and preserve the existing stack.
>
> Create a small, well-organized FAQ dataset for the user-approved
> topic. Use only verified information supplied or approved by the user.
> Each record should have a stable ID, canonical question, answer, and
> optional alternate phrasings if explicitly approved. Aim for
> approximately 15--25 useful FAQ entries only if the user can supply or
> verify that content; never fabricate organization-specific policies,
> prices, dates, or contact details.
>
> Implement text normalization and TF-IDF + cosine similarity using the
> approved backend/stack. Keep preprocessing simple and explainable:
> normalize case, trim whitespace, and handle punctuation safely. Add
> tokenization or stop-word removal only if it improves the chosen
> method and is available in the approved dependencies. Avoid
> overengineering.
>
> Expose the smallest necessary interface for the frontend: accept a
> question and return the matched question, answer, and similarity
> score; use a configurable threshold for fallback. Validate empty input
> and malformed requests. Do not add an LLM, external
> translation/embedding service, database, or unrelated endpoints.
>
> Add focused tests for exact matches, paraphrase-like wording, unknown
> questions, empty input, and an empty or invalid FAQ dataset where
> applicable. Run the available checks and report real results. Do not
> build the UI in this phase. Stop and wait for approval.

## Phase 2 TODO

-   [ ] Create the FAQ data file in the approved location and format.
-   [ ] Confirm all FAQ answers are user-approved and topic-specific.
-   [ ] Implement normalization/preprocessing.
-   [ ] Implement the approved similarity method.
-   [ ] Configure the fallback threshold in one location.
-   [ ] Implement the minimal request/response interface if required by
    the approved architecture.
-   [ ] Handle empty questions and missing/invalid data safely.
-   [ ] Add focused unit tests.
-   [ ] Run the relevant tests and record actual results.
-   [ ] Inspect the diff; do not build the frontend yet.

## Phase 2 acceptance checklist

-   [ ] The matcher returns the expected answer for a known question.
-   [ ] An unknown question triggers the fallback below the threshold.
-   [ ] Empty input is handled safely.
-   [ ] FAQ records follow one consistent schema.
-   [ ] The matching method and threshold are documented.
-   [ ] Tests are run and results are reported honestly.
-   [ ] No unapproved features or dependencies were added.

------------------------------------------------------------------------

# Phase 3 --- React chat UI

**Target:** Day 2\
**Goal:** Build the smallest usable chat interface and connect it to the
approved matching interface.

## Phase 3 master prompt

> Read `PROJECT_WORKFLOW.md` and execute Phase 3 only, using the
> approved Phase 1 plan and Phase 2 API contract.
>
> Build a clean, responsive React chat interface. Include a
> header/title, short explanation, scrollable conversation area,
> visually distinct user and bot messages, a text input, send button,
> disabled/loading behavior during requests, and readable error/fallback
> states. Support Enter to send and preserve normal keyboard navigation.
> Prevent blank submissions and show a sensible empty state.
>
> Use React Bits and Vengence UI only for components whose exact
> package/API and compatibility were verified and approved in Phase 1.
> Do not invent imports, props, installation commands, or component
> names. If integration is blocked, stop and ask for approval rather
> than silently switching libraries. Keep styling consistent and avoid
> decorative features that delay the core flow.
>
> Connect the UI to the existing approved API without changing the
> backend contract. Use the project's existing configuration conventions
> for the API base URL; do not hard-code secrets. Do not add
> authentication, routing, persistence, accounts, or extra pages unless
> explicitly listed in the approved plan.
>
> Add or update focused UI tests only if the existing test setup
> supports them. Verify the app builds and report any checks not run. Do
> not start final documentation or unrelated cleanup. Stop after the
> phase report.

## Phase 3 TODO

-   [ ] Create/update only the approved React UI files.
-   [ ] Implement a responsive chat layout.
-   [ ] Distinguish user messages from chatbot responses.
-   [ ] Implement text input and send button.
-   [ ] Support Enter to send and prevent blank submissions.
-   [ ] Show loading and API error states.
-   [ ] Display the fallback response clearly.
-   [ ] Connect to the approved API contract.
-   [ ] Use only verified and approved React Bits/Vengence UI
    components.
-   [ ] Run available frontend checks/build.
-   [ ] Inspect the diff and stop.

## Phase 3 acceptance checklist

-   [ ] The UI works at narrow and desktop widths.
-   [ ] A question can be submitted by button and keyboard.
-   [ ] Empty submissions do not trigger requests.
-   [ ] Loading and errors are understandable.
-   [ ] The UI displays the API answer and fallback correctly.
-   [ ] No unapproved UI library or feature was added.

------------------------------------------------------------------------

# Phase 4 --- Integration and end-to-end testing

**Target:** Day 3, first half\
**Goal:** Verify that the whole user journey works and fix only defects
within the approved scope.

## Phase 4 master prompt

> Read `PROJECT_WORKFLOW.md` and execute Phase 4 only. Do not add new
> features.
>
> Start the backend and frontend using the project's documented
> commands. Verify the full flow from typing a question to receiving the
> matched answer in the UI. Test known questions, alternate wording,
> unknown questions, blank input, malformed requests, API failure, and
> responsive layout where practical.
>
> Check that the fallback threshold behaves as configured and that the
> UI does not misrepresent a low-confidence match as a certain answer.
> Check the browser console and backend output for relevant errors
> without exposing secrets. Run the existing test suite and build/lint
> commands that are available.
>
> Fix only reproducible defects required for the acceptance criteria.
> Before any fix that changes the architecture, adds a dependency, or
> expands scope, stop and ask me. Do not perform unrelated refactoring.
> Record each test as PASS, FAIL, or NOT RUN with the actual evidence.
> Stop after the phase report.

## Phase 4 TODO

-   [ ] Start backend and frontend with documented commands.
-   [ ] Test an exact known FAQ.
-   [ ] Test alternate wording for a known FAQ.
-   [ ] Test an unknown question and verify fallback.
-   [ ] Test empty input and malformed requests.
-   [ ] Test API unavailable/error behavior.
-   [ ] Verify threshold configuration is respected.
-   [ ] Check responsive layout and keyboard interaction.
-   [ ] Run available unit tests, build, and lint checks.
-   [ ] Fix only in-scope, reproducible defects.
-   [ ] Record PASS / FAIL / NOT RUN honestly.

## Phase 4 acceptance checklist

-   [ ] End-to-end question-to-answer flow works.
-   [ ] Unknown questions receive the fallback.
-   [ ] Invalid input does not crash the app.
-   [ ] No critical console or server errors remain in tested flows.
-   [ ] Build and tests pass, or failures/limitations are clearly
    documented.
-   [ ] No unrelated changes were made.

------------------------------------------------------------------------

# Phase 5 --- Documentation and handoff

**Target:** Day 3, second half\
**Goal:** Make the project easy to run, demonstrate, and explain during
the internship review.

## Phase 5 master prompt

> Read `PROJECT_WORKFLOW.md` and execute Phase 5 only.
>
> Write concise documentation based on the implementation that actually
> exists. Document prerequisites, installation, environment
> configuration if any, how to run the backend and frontend, how to run
> tests, FAQ dataset format, preprocessing and similarity method,
> fallback threshold, project structure, known limitations, and a short
> demonstration script.
>
> Include only commands verified from the repository or actually tested.
> Do not claim deployment, security, accuracy, or production readiness
> without evidence. Do not add deployment configuration, new features,
> screenshots, or dependencies unless explicitly approved. If
> screenshots are requested, ask before capturing or including anything
> that might reveal personal data or secrets.
>
> Review the final diff, confirm the TODO and acceptance lists reflect
> reality, and provide a handoff summary with changed files, run
> commands, test results, and known limitations. Do not start any new
> work after the report.

## Phase 5 TODO

-   [ ] Write or update the project README with verified setup steps.
-   [ ] Document how to run the backend and frontend.
-   [ ] Document how to run tests.
-   [ ] Explain the FAQ data format.
-   [ ] Explain text normalization, similarity scoring, and fallback
    threshold.
-   [ ] Document known limitations and expected behavior.
-   [ ] Write a short demo sequence for the internship review.
-   [ ] Check that all commands match the actual project.
-   [ ] Review final diff and ensure no secrets are present.
-   [ ] Produce the final handoff report.

## Phase 5 acceptance checklist

-   [ ] Another student can follow the documented run steps.
-   [ ] Tests and build results are accurately recorded.
-   [ ] Matching and fallback behavior are explained in plain language.
-   [ ] Known limitations are disclosed.
-   [ ] No unsupported claims or unapproved scope changes appear.

------------------------------------------------------------------------

## 5. Suggested project structure

This is a **proposal**, not permission to create all these files
immediately. Gemini CLI must first inspect the repository and use the
approved plan.

``` text
faq-chatbot/
├── PROJECT_WORKFLOW.md
├── README.md
├── backend/
│   ├── app.py                 # Only if approved by the inspected stack
│   ├── faq_data.json
│   ├── matcher.py
│   ├── requirements.txt
│   └── tests/
│       └── test_matcher.py
└── frontend/
    ├── package.json
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   └── styles/
    └── ...
```

Do not create duplicate backend/frontend folders if the repository
already has a different structure.

## 6. Matching behavior and fallback policy

1.  Normalize the incoming question using the approved preprocessing
    function.
2.  Compare it with the canonical FAQ questions and any approved
    alternate phrasings.
3.  Compute cosine similarity using the fitted TF-IDF representation.
4.  Select the highest-scoring candidate.
5.  If the score meets the configured threshold, return the associated
    approved answer.
6.  If the score is below the threshold, return a polite fallback such
    as:\
    **"Sorry, I couldn't find a reliable answer to that question. Please
    try rephrasing it or choose one of the available FAQs."**
7.  Handle empty input separately with a prompt to enter a question.

A similarity score is a text-overlap signal, **not a guarantee that an
answer is factually correct**. Choose the threshold using a small test
set of known and unknown questions; do not claim the system understands
every paraphrase.

## 7. Final definition of done

-   [ ] All five phases were individually authorized and completed or
    their blockers documented.
-   [ ] The user can submit a question through the React chat interface.
-   [ ] The matching engine returns an approved FAQ answer when the
    score meets the threshold.
-   [ ] Unknown or low-similarity questions receive a fallback.
-   [ ] Empty input and API failures are handled.
-   [ ] The approved tests/build checks have been run and their results
    recorded.
-   [ ] Setup and demonstration instructions are documented.
-   [ ] React Bits and Vengence UI usage is verified, or the unresolved
    dependency decision is explicitly documented.
-   [ ] No extra features, unapproved dependencies, secrets, or
    unrelated files were introduced.

**End-of-scope rule:** once this definition of done is met, stop. Do not
extend the project unless the user explicitly requests a new scope.
