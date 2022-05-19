##install
```
npm install
```
##install bootstrap
```
npm install bootstrap
```
##before sending the project to QA
```
gulp dist
```
<hr>
##use Responsive breakpoints
```
// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
---
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }

// Extra large devices (large desktops)
// No media query since the extra-large breakpoint has no upper bound on its width
---
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
---
// Example
// Apply styles starting from medium devices and up to extra large devices
@media (min-width: 768px) and (max-width: 1199.98px) { ... }

@include media-breakpoint-between(md, xl) { ... }
```
##snippets sublime text 3
```
"xsu": "@include media-breakpoint-up(xs) {|}",
"smu": "@include media-breakpoint-up(sm) {|}",
"mdu": "@include media-breakpoint-up(md) {|}",
"lgu": "@include media-breakpoint-up(lg) {|}",
"xlu": "@include media-breakpoint-up(xl) {|}",

"xsd": "@include media-breakpoint-down(xs) {|}",
"smd": "@include media-breakpoint-down(sm) {|}",
"mdd": "@include media-breakpoint-down(md) {|}",
"lgd": "@include media-breakpoint-down(lg) {|}",

"xso": "@include media-breakpoint-only(xs) {|}",
"smo": "@include media-breakpoint-only(sm) {|}",
"mdo": "@include media-breakpoint-only(md) {|}",
"lgo": "@include media-breakpoint-only(lg) {|}",
"xlo": "@include media-breakpoint-only(xl) {|}",
```