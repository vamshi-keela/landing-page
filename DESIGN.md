# Design System Strategy: The Cinematic Canvas

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Auteur."**

This is not a generic SaaS interface; it is a high-end production suite designed to mirror the focus and prestige of a film editing bay. We move beyond "standard" UI by embracing a cinematic, editorial aesthetic that prioritizes content—the video—above all else. The system breaks the traditional "template" look by using intentional asymmetry, overlapping elements that create a sense of physical depth, and high-contrast typography scales that feel more like a film’s title sequence than a software dashboard.

The goal is to provide filmmakers and enterprises with a tool that feels as premium as the output they generate.

---

## 2. Colors & Tonal Depth
The palette is rooted in deep charcoals and blacks to minimize eye strain and maximize the vibrancy of the AI-generated video content.

### The "No-Line" Rule
To achieve a high-end, bespoke feel, **1px solid borders for sectioning are strictly prohibited.** Structural boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section should sit directly against a `surface` background to create a soft, sophisticated edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of obsidian glass.
- Use `surface-container-lowest` (#0e0e0e) for the base background.
- Nest `surface-container` (#1f1f1f) cards inside to create a "lifted" interactive area.
- Use `surface-container-highest` (#353535) for active states or focused elements.

### The "Glass & Gradient" Rule
Floating panels and navigation bars should utilize **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur` (20px–40px). This allows the colors of the video generation preview to bleed through, softening the edges and making the UI feel integrated into the creative work.

### Signature Accents
- **Primary CTA:** Transition from `primary` (#ffb5a1) to `primary_container` (#cc3300) using a 45-degree linear gradient. This provides a "soul" and professional polish that flat hex codes lack.
- **Secondary Accent:** Use `secondary` (#f4b6c1) sparingly for high-interest notifications or status indicators.

---

## 3. Typography: The Editorial Voice
Our typography creates a hierarchy that feels authoritative yet technical.

* **Display & Headline (Space Grotesk):** This is our "Hero" typeface. It’s geometric and bold, reminiscent of modern film posters. Use `display-lg` (3.5rem) for major impact areas, ensuring wide tracking (letter-spacing) for a premium, airy feel.
* **Body & Title (Inter/IBM Plex Mono):** We use Inter for high-readability body text. However, for technical metadata (timestamps, resolution, prompt data), use **IBM Plex Mono**. This contrast between human-centric body copy and machine-centric mono type reinforces the AI-driven nature of the platform.
* **Label (Space Grotesk):** Small-caps or high-weight Space Grotesk labels provide a "production slate" aesthetic to metadata.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "material"; we use light to represent "presence."

* **The Layering Principle:** Depth is achieved by stacking surface-container tiers. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural, soft "recess."
* **Ambient Shadows:** If a floating effect is required (e.g., a modal), use an extra-diffused shadow: `blur: 60px`, `spread: -10px`, `opacity: 8%`. The shadow color should be a deep tint of the accent color (#3c0800) rather than pure black to mimic a "glow" from the screen.
* **The Ghost Border:** If accessibility requires a stroke, use `outline_variant` at **15% opacity**. Never use a 100% opaque border.
* **Interaction:** On hover, a container should not just "brighten"; it should transition from `surface-container` to `surface-bright` (#393939), creating a "lit from within" effect.

---

## 5. Components

### Buttons
* **Primary:** Linear gradient (`primary` to `primary_container`). `0.25rem` (sm) corner radius. Typography: `label-md` bold, uppercase.
* **Secondary:** Ghost style. Transparent background with a "Ghost Border" (outline-variant at 20%).
* **Tertiary:** Text-only with an underline that expands from center on hover.

### Input Fields & Text Areas
* **Styling:** Background: `surface_container_lowest`. No border. A bottom-only highlight of 2px appears in `primary` only when focused.
* **Labels:** Always use `label-sm` in `on_surface_variant` for a technical, clean look.

### Cards & Lists
* **The "No-Divider" Rule:** Forbid the use of divider lines. Separate list items using `spacing-4` (1.4rem) or a subtle shift to `surface_container_low` on every second item (zebra striping) at very low contrast.
* **Video Thumbnails:** Always use `rounded-md` (0.375rem). Apply a subtle `primary` inner glow (1px) on hover to indicate selection.

### AI Processing Chips
* **Status:** Use `secondary_container` with `on_secondary_container` text. For "Processing" states, use a slow, pulsing opacity animation (1.5s duration) rather than a spinning loader to maintain the cinematic calm.

### Timeline Slider
* **Track:** `surface_container_highest`.
* **Handle:** `primary` (#ffb5a1) with a soft glow.
* **Indicator:** `IBM Plex Mono` for timestamp readouts.

---

## 6. Do’s and Don’ts

### Do:
* **Use Asymmetry:** Place high-level descriptions off-center to create a dynamic, editorial layout.
* **Embrace Negative Space:** Use `spacing-20` and `spacing-24` between major sections to let the "cinematic" aesthetic breathe.
* **Mix Typefaces:** Pair the technicality of Mono fonts with the geometric elegance of Space Grotesk in the same component.

### Don’t:
* **Don't use pure white (#FFFFFF) for body text:** Use `on_surface` (#e2e2e2) to reduce glare against the dark background.
* **Don't use standard "Rounded" buttons:** Keep the `DEFAULT` radius at `0.25rem`. Rounded "pill" buttons (`full`) are only for status chips, never for primary actions.
* **Don't use heavy drop shadows:** They feel like 2010s web design. Stick to tonal layering and subtle glows.
* **Don't use standard dividers:** If you feel the need to separate, use a background color shift or more vertical space. Lines are the enemy of this system's premium feel.