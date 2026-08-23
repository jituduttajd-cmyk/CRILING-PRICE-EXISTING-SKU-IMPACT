CEILING PRICE DATA COMPARE - FINAL PWA PROJECT
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

PWA deployment
--------------
Upload all three files to the SAME GitHub repository root.

Important:
The service-worker cache was changed to v5 and index.html is network-first
to prevent an older PWA cache from continuing to show the previous screen.

After replacing files on GitHub Pages:
1. Close the installed PWA/browser tab.
2. Re-open the GitHub Pages URL.
3. If an old installed PWA still appears, uninstall the old PWA once and
   install/open it again.

The application runs entirely in the browser and does not upload Excel
data to a server.
