# Admin UI Redesign Implementation Plan

Date: 2026-05-21
Depends on: `docs/superpowers/specs/2026-05-21-admin-ui-redesign-design.md`

## Objective

Implement the approved `Soft Gallery` admin redesign for `localhost:3000/admin` using the existing Payload admin shell, current custom admin components, and the stylesheet layer in `src/app/(payload)/custom.scss`.

## Delivery Strategy

Ship the redesign in four passes so that shared shell styling is stabilized before dashboard-specific work, and responsive issues are handled before sign-off.

## Phase 1: Shared Shell and Design Tokens

### Goal

Establish the new luxury visual foundation across the admin without changing data flow.

### Files

- `src/app/(payload)/custom.scss`
- `src/app/(payload)/components/AdminBrandLogo.tsx`
- `src/app/(payload)/components/AdminBrandIcon.tsx`
- `src/app/(payload)/components/AdminLanguageToggle.tsx`
- `src/app/(payload)/components/AdminLogoutButton.tsx`

### Tasks

1. Replace the current admin token set with a softer luxury palette:
   - warm cream and oat surfaces
   - stronger premium text contrast
   - refined accent colors for selected states and primary actions
   - more coherent radii and shadow scale

2. Refine the admin shell surfaces:
   - nav background and borders
   - app header treatment
   - generic container surfaces used by dashboard, lists, and forms

3. Update brand primitives:
   - adjust logo/icon styling so they match the softer gallery aesthetic
   - keep markup simple and compatible with Payload graphic slots

4. Refresh utility controls:
   - language toggle styling
   - logout button styling
   - hover, pressed, and disabled states

### Exit Criteria

- Admin shell looks consistent before dashboard-specific layout changes begin.
- Shared tokens are stable enough to be reused everywhere else.

## Phase 2: Login and Authentication Surfaces

### Goal

Keep the premium entrance but improve balance, contrast, and usability.

### Files

- `src/app/(payload)/custom.scss`
- `src/app/(payload)/components/AdminAuthShellProvider.tsx` if needed for layout behavior only

### Tasks

1. Rework the login composition:
   - reduce excess empty space
   - tighten form container hierarchy
   - make the form feel first-class instead of visually secondary

2. Improve field and CTA clarity:
   - stronger field contrast
   - better spacing and labels
   - clearer primary button emphasis

3. Preserve bilingual and first-user setup behavior.

### Exit Criteria

- Login feels premium and more intentional.
- The page remains comfortable on both desktop and smaller screens.

## Phase 3: Dashboard Overview Redesign

### Goal

Transform the current dashboard into the approved `Soft Gallery` layout while preserving existing data queries and navigation targets.

### Files

- `src/app/(payload)/components/AdminDashboardOverview.tsx`
- `src/app/(payload)/custom.scss`

### Tasks

1. Recompose the dashboard structure:
   - replace the heavy hero feel with a softer lead summary area
   - create clearer hierarchy between urgent operations and supporting metrics

2. Redesign metric cards:
   - avoid four equally weighted tiles
   - make bookings and inquiries the primary focus
   - make services and technicians more supportive

3. Redesign the recent bookings panel:
   - convert it into a premium task-list surface
   - improve spacing, metadata grouping, and quick action rhythm

4. Review copy rendering:
   - be careful with existing Chinese text encoding issues
   - avoid mixing visual changes with accidental copy regressions

### Exit Criteria

- Dashboard feels curated rather than tiled.
- Desktop and mobile hierarchy is materially improved.

## Phase 4: Collection Lists and Form Polish

### Goal

Carry the same design language through default Payload admin list and form screens.

### Files

- `src/app/(payload)/custom.scss`

### Tasks

1. Refine collection list wrappers:
   - heading spacing
   - filter controls
   - table containers
   - list action bars

2. Refine form surfaces:
   - input backgrounds and borders
   - textarea and select consistency
   - button hierarchy
   - section grouping rhythm

3. Validate that changes remain generic enough to style Payload defaults safely.

### Exit Criteria

- Lists and forms visually belong to the same product family as login and dashboard.
- The styling does not break core admin layouts.

## Phase 5: Responsive Pass

### Goal

Ensure the redesign works as a real dual-surface admin across desktop and mobile.

### Files

- `src/app/(payload)/custom.scss`
- `src/app/(payload)/components/AdminDashboardOverview.tsx` if structural adjustments are required

### Tasks

1. Validate dashboard breakpoints:
   - desktop
   - tablet
   - mobile phone widths

2. Adjust mobile behavior:
   - stack key metric cards cleanly
   - enlarge touch targets where needed
   - turn recent items into mobile-friendly task cards
   - preserve shortcut action clarity

3. Check list and form behavior on mobile:
   - no horizontal overflow where avoidable
   - comfortable touch targets
   - clear spacing for field groups and action bars

### Exit Criteria

- Mobile is clearly task-capable, not just visually compressed.
- No obvious overflow or touch-density issues remain.

## Verification Plan

### Manual Checks

1. Open `/admin/login` on desktop and mobile widths.
2. Open `/admin` dashboard on desktop and mobile widths.
3. Open representative collection list pages:
   - bookings
   - inquiries
   - services
   - technicians
4. Open representative edit forms and confirm spacing and control behavior.

### Visual Checks

- Confirm the luxury aesthetic is present across all touched screens.
- Confirm primary actions remain visually obvious.
- Confirm the dashboard no longer feels like a default CMS with a single themed section.

### Regression Checks

- Ensure links still route correctly.
- Ensure dashboard data still renders.
- Ensure language toggle and logout still work.
- Ensure no CSS changes break Payload interactive controls.

## Risk Management

- Keep structural JSX changes concentrated in `AdminDashboardOverview.tsx`.
- Keep generic admin styling changes isolated and incremental in `custom.scss`.
- Test list and form screens after every major style adjustment to avoid cascading Payload regressions.
- Treat localization text carefully while touching dashboard UI.

## Suggested Execution Order

1. Update shared tokens and shell styling.
2. Refresh login.
3. Rebuild dashboard structure and card hierarchy.
4. Polish list and form styling.
5. Do responsive cleanup and final verification.

## Done Definition

The implementation is complete when:

- the approved design direction is visible across login, dashboard, lists, and forms
- desktop and mobile both feel premium and usable
- core admin workflows still function as before
- no major visual inconsistencies remain between custom surfaces and Payload default screens
