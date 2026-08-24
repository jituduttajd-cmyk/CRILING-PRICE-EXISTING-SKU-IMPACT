CEILING PRICE DATA COMPARE - FINAL PWA PROJECT (v3.5)
===============================================

Files
-----
1. index.html
2. manifest.webmanifest
3. sw.js

Excel input: Product-Formulation-MRP
-----------------------------------
Required headings:
Material Code
Product Name
Pack Size
Formulation
Medicines
Dosage form and strength
Unit
MRP
GST%

Excel input: Ceiling Price Data
-------------------------------
Required headings:
Medicines
Dosage form and strength
Unit
Ceiling Price

Comparison sequence
-------------------
1. Product-Formulation-MRP -> Medicines
   compared with
   Ceiling Price Data -> Medicines

2. Product-Formulation-MRP -> Dosage form and strength
   compared with
   Ceiling Price Data -> Dosage form and strength

3. Product-Formulation-MRP -> Unit
   compared with
   Ceiling Price Data -> Unit

Screen output
-------------
Sr. No.
Material Code
Product Name
Pack Size
Formulation
Drug Name
Dosage Form & Strength
Unit
GST%
WPI%
Existing MRP
Ceiling Price
MRP as per Ceiling Price
MRP as per WPI
Proposed MRP
Difference Rs.
Difference %
Status

Source rules
------------
Formulation:
Product-Formulation-MRP -> Formulation

Drug Name:
Matched Ceiling Price Data -> Medicines

Dosage Form & Strength:
Matched Ceiling Price Data -> Dosage form and strength

Unit:
Matched Ceiling Price Data -> Unit

Calculation
-----------
MRP as per Ceiling Price:
(Ceiling Price * Pack Size) + GST%

Implemented numerically as:
Ceiling Price * Pack Size * (1 + GST% / 100)

MRP as per WPI:
Existing MRP excluding GST, increased by WPI, then GST added.

Proposed Revised MRP:
Lowest of MRP as per Ceiling Price and MRP as per WPI.

What changed in v3.1
---------------------
The v3.0 build had a second, duplicate rendering script tacked onto the
end of index.html ("FINAL FORMULATION SCREEN FIX"). It watched the results
table with a MutationObserver and re-rendered on every change to that
table -- but since its own re-render also changed the table, it kept
re-triggering itself in a loop. It also duplicated logic the main renderer
already handled correctly (Formulation from Product-Formulation-MRP, Drug
Name from the matched Ceiling Price record).

That duplicate script was removed. All comparison logic, matching rules,
calculations, and the 16-column screen output are unchanged -- only the
redundant/looping code was taken out.

What changed in v3.2 (important fix)
-------------------------------------
index.html never actually registered sw.js. There was a service-worker
file sitting in the repo, but nothing in the page ever called
navigator.serviceWorker.register(...) on it. That meant:

- Whatever version was already installed as a PWA on a device was running
  a service worker registered by some earlier deployment, and that old
  worker stayed permanently in control of the site, intercepting every
  request and serving its own old cached copy.
- Uploading new files to GitHub could never fix this by itself, because
  the page never talked to the service worker to check for or apply an
  update -- so v3.0/v3.1 kept showing even after the new files were live.

index.html now explicitly:
1. Registers sw.js on load (with updateViaCache:"none" so the browser
   never serves a stale cached copy of sw.js itself).
2. Calls registration.update() immediately, forcing a real check against
   the server for a newer service worker.
3. Also re-checks for updates whenever the tab/PWA regains focus.
4. Automatically reloads the page once a new service worker has finished
   activating, so a newly deployed version appears without the user
   needing to manually clear cache or reinstall.

sw.js's cache name was bumped to v7 (from v6) so this fix itself is
guaranteed to load fresh.

What changed in v3.3
---------------------
Two columns added to the screen and to both Excel exports, positioned
after Ceiling Price and before Proposed MRP:

- MRP as per Ceiling Price (the intermediate calculated value, not just
  the raw Ceiling Price)
- MRP as per WPI (the intermediate calculated value from the WPI-based
  formula)

These values were already being calculated internally for the Proposed
MRP comparison -- they just weren't shown as their own columns before.
Now the screen has 18 columns total, so the table is wider (min-width
increased); scroll horizontally to see all of it on smaller screens.

sw.js's cache name was bumped to v8 (from v7) so this update loads
cleanly through the auto-update mechanism added in v3.2.

What changed in v3.4
---------------------
Decimal precision was fixed for three columns, independent of the
Rounding dropdown setting (which still controls the other money columns
as before):

- MRP as per Ceiling Price: always shown/exported to 4 decimal places.
- MRP as per WPI: always shown/exported to 4 decimal places.
- Proposed MRP: always shown/exported to 2 decimal places, and TRIMMED
  (truncated) rather than rounded -- e.g. 45.4656 displays as 45.46, not
  45.47. This applies on screen and in both Excel exports.

sw.js's cache name was bumped to v9 (from v8) so this update loads
cleanly through the auto-update mechanism.

What changed in v3.5
---------------------
Added a "4 Decimal Places" option to the Rounding dropdown (it now shows
4 / 2 / 1 / 0). This controls Existing MRP, Ceiling Price, and
Difference Rs. as before -- it does NOT affect MRP as per Ceiling Price,
MRP as per WPI (always fixed at 4 decimals), or Proposed MRP (always
fixed at 2 decimals, trimmed) which were locked to their own precision
in v3.4.

sw.js's cache name was bumped to v10 (from v9) so this update loads
cleanly through the auto-update mechanism.

PWA deployment
--------------
Upload all three files (index.html, manifest.webmanifest, sw.js) to the
SAME GitHub repository root.

One-time cleanup needed for devices already stuck on an old version:
Because those devices have a pre-v3.2 service worker in control (one that
was never told to check for updates), this v3.2 fix has to reach them
once through a manual refresh before auto-updating takes over from then
on:
1. Open the site in a normal (non-installed) browser tab.
2. DevTools (F12) -> Application -> Service Workers -> Unregister.
   Then Application -> Storage -> Clear site data.
3. Hard reload (Ctrl+Shift+R / Cmd+Shift+R).
4. If it was installed as an app, uninstall it and reinstall from the
   Pages URL.

After this one-time reset, every future deployment will auto-update on
its own -- no more manual cache clearing needed.

The application runs entirely in the browser and does not upload Excel
data to a server.
