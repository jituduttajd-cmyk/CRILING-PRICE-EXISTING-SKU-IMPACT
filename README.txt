# Ceiling Price Data Compare - PWA

Files:
- index.html
- manifest.webmanifest
- sw.js

Expected Product-Formulation-MRP headings:
Material Code | Product Name | Pack Size | Formulation | MRP | GST%

Expected Ceiling Price Data:
Sheet "Table 1", with:
Sl. No. | Medicines | Dosage form and strength | Unit | Ceiling price ... | Existing S.O., No. & Date | Date

The application extracts WPI% from the Ceiling Price heading. For the supplied file it is 0.64956%.

Proposed MRP formula currently implemented:
Ceiling Price × Pack Size × (1 + GST% / 100)

Important:
The supplied Ceiling Price is treated as per the stated Unit. Pack Size is converted to a numeric quantity. If a different regulatory formula is required for a particular dosage/pack convention, update calculateProposedMRP() in index.html.

Run as PWA:
Use a local HTTPS/HTTP server (not file://), e.g. VS Code Live Server or GitHub Pages.
