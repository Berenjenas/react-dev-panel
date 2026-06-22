---
"@berenjena/react-dev-panel": patch
---

Fix an infinite render loop ("Maximum update depth exceeded") for controls whose `value` is an array or object, such as `multiselect`. `hasControlsChanged` now compares control values structurally instead of by reference, so a section is no longer re-registered on every render when the consumer rebuilds the value array. Multiselect `options` are now compared as well.
