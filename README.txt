CEILING PRICE DATA COMPARE - FINAL PWA PROJECT (v3.1)
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
The previous build (v3.0) had a second, duplicate rendering script tacked
onto the end of index.html ("FINAL FORMULATION SCREEN FIX"). It watched the
results table with a MutationObserver and re-rendered on every change to
that table -- but since its own re-render also changed the table, it kept
re-triggering itself in a loop. It also duplicated logic the main renderer
already handled correctly (Formulation from Product-Formulation-MRP, Drug
Name from the matched Ceiling Price record).

That duplicate script has been removed. All comparison logic, matching
rules, calculations, and the 16-column screen output are unchanged --
only the redundant/looping code was taken out.

PWA deployment
--------------
Upload all three files (index.html, manifest.webmanifest, sw.js) to the
SAME GitHub repository root.

Important:
The service-worker cache was changed to v6 (from v5) so installed PWAs and
browsers pick up this fix instead of continuing to serve the old cached
build. index.html remains network-first on navigation.

After replacing files on GitHub Pages:
1. Close the installed PWA/browser tab.
2. Re-open the GitHub Pages URL.
3. If an old installed PWA still appears, uninstall the old PWA once and
   install/open it again.

The application runs entirely in the browser and does not upload Excel
data to a server.
