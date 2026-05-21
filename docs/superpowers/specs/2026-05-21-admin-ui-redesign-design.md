# Admin UI Redesign Design

Date: 2026-05-21
Project: `localhost:3000/admin`
Status: Approved for planning

## Summary

Redesign the Payload admin experience for `7 DAY SPA` / `Oasis Spa` into a softer luxury interface that feels like a boutique spa workspace rather than a default CMS skin. The redesign should preserve day-to-day operational usefulness on both desktop and mobile, with a visual direction based on the approved `Soft Gallery` concept and a usability balance closer to a working admin console than a brand poster.

## Context

The current admin is a Payload CMS admin shell with custom branding, a custom dashboard overview, and SCSS overrides in `src/app/(payload)/custom.scss`. The current experience already introduces a luxury mood, especially on login, but the working screens still feel like a partially themed CMS:

- The login screen has brand atmosphere but too much empty space and too little operational clarity.
- The dashboard uses a heavier hero treatment that does not fully match the softer boutique aesthetic requested.
- The transition between branded screens and standard collection or form screens feels inconsistent.
- Mobile usage needs to support both quick review work and direct editing, not just passive viewing.

## Goals

- Create a coherent luxury admin identity across login, dashboard, navigation, collection views, and editing forms.
- Use a soft, gallery-like visual language with warm neutrals, gentle separation, refined typography, and restrained emphasis.
- Improve desktop composition so the admin feels curated and premium rather than wide and generic.
- Improve mobile layout so operators can review bookings and inquiries, then move into editing services, technicians, and settings without friction.
- Keep the redesign compatible with the existing Payload admin shell and current custom component structure.

## Non-Goals

- No redesign of the underlying Payload information architecture.
- No new backend data requirements or new API dependencies.
- No major content model changes for bookings, inquiries, services, or technicians.
- No reimplementation of the entire admin as a separate custom application.

## Approved Design Direction

The approved direction is:

- Visual family: `Soft Gallery`
- Product posture: `soft luxury + operationally usable`
- Priority: `beauty first, without sacrificing real admin workflow`
- Mobile usage: `balanced between monitoring and editing`

This means the interface should feel calm, curated, and boutique-led, but still support fast task handling and direct manipulation on smaller screens.

## Experience Principles

1. The admin should feel like a premium spa workspace, not a generic SaaS dashboard.
2. Softness should come from layering, spacing, and material contrast, not from low contrast or weak affordances.
3. Important actions must remain unmistakable even in a gentle visual system.
4. Mobile should be a task-capable control surface, not a compressed desktop layout.
5. Dashboard, list, and form screens should feel like one product family.

## Constraints From Existing Code

- Payload admin shell is configured via `payload.config.ts`.
- Custom admin components currently include:
  - branding graphics
  - language toggle
  - logout button
  - dashboard overview
  - auth shell provider
- Styling is centralized primarily in `src/app/(payload)/custom.scss`.
- The redesign should follow this structure and extend it rather than introducing a separate styling system.

## Visual System

### Color

Use a warm luxury palette built around:

- soft cream, oat, stone, and champagne surfaces
- muted forest or deep olive for high-priority emphasis
- restrained bronze or warm gold accents for premium contrast
- dark espresso or deep charcoal text tones for legibility

Guidelines:

- Large surfaces should feel airy and creamy, not flat white.
- Primary actions and selected states should use a deeper, confident color block.
- Supporting dividers should be subtle and low-noise.
- Visual softness must not reduce contrast below comfortable reading levels.

### Typography

Typography should split into two roles:

- display serif for hero titles, section titles, and brand-led moments
- clean sans serif for controls, tables, form labels, values, and body copy

Guidelines:

- Headings should feel editorial but disciplined.
- Operational text should remain compact and readable.
- Data values should be visually crisp and easier to scan than today.

### Shape, Elevation, and Texture

- Rounded corners should be generous but controlled.
- Elevation should come from soft shadows and layered warm surfaces instead of hard borders.
- Panels should read as curated trays or cards rather than default admin boxes.
- Hover and active states should lift slightly, with restrained motion.

## Desktop Layout

### Navigation

The left navigation should become a boutique directory rather than a plain admin rail:

- softer background treatment
- clearer grouping rhythm
- rounded active state that feels elevated instead of harshly highlighted
- language toggle and logout integrated into the same visual language

### Main Content Frame

- Content should sit within a calmer, more intentional canvas.
- Width, spacing, and vertical rhythm should feel curated rather than stretched.
- Collection screens and edit screens should inherit the same spacing language as the dashboard.

### Dashboard Composition

The dashboard should shift away from a single dominant dark hero block and toward a gallery-style composition:

- one softer lead summary area
- a hierarchy of metric cards instead of four equally weighted stats
- recent activity panel treated as a premium task list
- emphasis placed on bookings and inquiries first, then on services and technicians

The desktop dashboard should feel assembled, not tiled.

## Mobile Layout

The mobile admin should support both monitoring and editing.

### Mobile Priorities

1. See what requires attention now
2. Jump into common actions quickly
3. Edit operational content without cramped controls

### Mobile Dashboard Structure

- compact summary header instead of a large decorative hero
- key metric cards arranged as one-column or two-column adaptive tiles
- shortcut actions promoted into larger tap-friendly buttons
- recent bookings rendered as task-like cards rather than thin desktop-style rows

### Mobile Interaction Rules

- tap targets must be comfortable and consistent
- button and input heights should be increased where needed
- no horizontal scrolling on dashboard, list, or form views
- visual hierarchy should remain clear even when content stacks vertically

## Key Screen Changes

### Login

The login page should retain the luxury mood but become more confident and useful:

- reduce empty space
- tighten composition
- increase contrast on fields and actions
- keep the brand entrance premium without making the form feel secondary

### Dashboard Overview

Refactor the current custom dashboard overview toward:

- softer hero or lead card
- more nuanced card sizing and grouping
- premium task-list styling for recent bookings
- clearer distinction between quick actions and informational blocks

### Collection Lists

Collection list pages should look more intentional and aligned with the dashboard:

- softer wrappers
- cleaner list controls
- refined table containers
- more elegant spacing around headings, filters, and action bars

### Forms and Editing Screens

Forms should feel calmer and more premium while remaining easy to use:

- more consistent field spacing
- clearer labels and helper copy
- better focus states
- cleaner grouping of sections and controls

## Component-Level Design Changes

The redesign should focus on these reusable areas:

- brand logo and icon treatment
- login container and auth templates
- nav group labels and nav links
- selected and hover states
- dashboard hero and supporting cards
- dashboard stats cards
- panel headers and inline actions
- list row styling
- form inputs, textareas, select controls, and button styles

The objective is to create one shared language, not isolated page-level custom styling.

## Motion and Responsiveness

- Use subtle lift, fade, and soft state transitions only.
- Avoid decorative animation that competes with operational tasks.
- Ensure layout changes happen cleanly between desktop, tablet, and mobile breakpoints.
- Maintain visual continuity between screen sizes rather than creating unrelated compositions.

## Accessibility and Usability Requirements

- Preserve clear focus states for keyboard users.
- Maintain readable contrast for text, labels, and actions.
- Ensure mobile controls remain touch-friendly.
- Do not rely on hover alone for important cues.
- Keep primary actions visually distinct even in a gentle palette.

## Validation Criteria

The redesign is considered successful when:

- `/admin` login feels premium and better balanced.
- `/admin` dashboard feels like a cohesive luxury workspace instead of a themed default CMS.
- Desktop and mobile both read as intentional, high-end, and usable.
- Dashboard, lists, and forms share the same design language.
- Mobile can handle both review tasks and editing tasks without awkward density or overflow.
- No major functional regressions are introduced to existing Payload admin workflows.

## Implementation Notes For Planning

- Most work should remain inside `src/app/(payload)/custom.scss` and the existing custom admin components.
- `AdminDashboardOverview.tsx` is the main structural candidate for dashboard composition changes.
- The redesign should minimize churn to data fetching logic and focus on layout, hierarchy, and styling.
- The implementation plan should separate:
  - design token and shared shell refinements
  - dashboard structure updates
  - list and form polish
  - responsive verification

## Risks

- Too much softness could reduce operational clarity if emphasis is not carefully preserved.
- Payload default admin structures may resist aggressive layout changes in some list and form areas.
- Existing encoding issues in some Chinese dashboard copy should be handled carefully during implementation so visual cleanup does not accidentally worsen localization output.

## Assumptions

- The redesign will target the current admin experience mounted at `localhost:3000/admin`.
- Existing custom admin components remain the right extension point.
- The user prefers a stronger brand-led aesthetic over a conventional productivity dashboard look, as long as core workflows stay usable.
