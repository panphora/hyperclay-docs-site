---
title: Changelog
publish: true
description: Development milestones and feature releases for the Hyperclay platform from inception to present
---

**Milestones**
- Created example app: Landing Page (May 2025)
- Ability to upload and edit Files (April 2025)
- Drag & drop files and folders in dashboard (April 2025)
- Homepage redesign (Mar 2025)
- Subdomain architecture (Jan 2025)
- Created example apps: Devlog & Kanban (Dec 2024)
- Created core libraries: hyperclay.js, dollar.js (June - Nov 2024)
- Created main app dashboard (October 2024)
- Created example app: Writer (Sept 2024)
- Transitioned to SQLite from file-based db (June 2024)
- Support for app backup & restore (April 2024)
- App code editing with CodeMirror (Jan 2024)

**Category Key**
* ✨ New Features
* 🚀 Improvements
* 🐛 Bug Fixes
* 🔧 Technical
* 🗑️ Deprecated
* 🧐 Research

**May 2025**
* 05/06/25
    * 🔧 Deployed `https://notes.hyperclay.com` after notes were cleaned up in Obsidian.
    * ✨ Developed a new Hyperclay example app: a landing page builder based on the Storybrand marketing framework.
    * ✨ Worked on the page editor for the landing page builder, which included implementing "edit" labels, popover editing interfaces (click to edit, single line edit, auto-expanding textareas, live sync to DOM), and image/icon editing capabilities.
* 05/02/25
    * 🔧 Completed the final production deployment, which included running all migrations and configuring the server to support larger file uploads (up to 20MB).
    * ✨ Added introductory welcome toasts with explainers to each example app.
    * 🚀 Improved the structure of welcome toasts to use a single HTML element with distinct CSS classes.
    * 🐛 Addressed and fixed a general issue with the save functionality.
    * ✨ Implemented the new `hyperclay-ignore` attribute to exclude elements from the save process.

**April 2025**
* 04/30/25
    * 🔧 Ensured the Hyperclay backup system was fully operational and resolved a previous issue with backup execution.
    * 🚀 Enhanced asset serving: Hyperclay assets now use full URLs, synchronization of public assets to production was improved, asset links on example apps were fixed, and Cross-Origin Resource Sharing (CORS) issues were resolved.
* 04/25/25
    * ✨ Implemented versioning for content in the database.
    * ✨ Established an app limit for users (5 initial sites + 1 per month) via server-side checks.
    * 🧐 Conducted an audit of security best practices related to authentication.
    * ✨ Implemented a check to compare new passwords against a list of the 100,000 most common passwords.
    * ✨ Added an "ethical software promise" to the pricing page.
    * 🧐 Researched Team support and decided against implementation because it was too much effort for too little gain.
* 04/18/25
    * 🚀 Continued development of file editing capabilities: file contents were enabled to be loaded into the CodeMirror editor and saving files from the file edit page for various file types was implemented.
    * 🚀 Refined example applications, ensuring final code versions were deployed.
* 04/11/25
    * 🚀 Enhanced the home page: a video section (mobile-friendly) was added, links to example apps with emulated edit mode were included, and homepage images were minified for faster loading.
    * ✨ Initiated development for direct file editing support within Hyperclay, adding support for json, md, htm, html, css, js, jsx, svg files with CodeMirror syntax highlighting.
* 04/04/25
    * ✨ Finalized the new file display UI in the "Files" section.
    * 🚀 Completed a major refactor to exclusively use the `Node` model for representing all user content, so a folder structure could be implemented using a single model.
    * ✨ Added a newsletter signup section to the home page using Buttondown, which included honeypot spam prevention.

**March 2025**
* 03/28/25
    * ✨ Linked to the "forgot password" page from the login page.
    * ✨ Implemented a requirement for users to provide a username during signup.
    * 🚀 Continued development of the file display UI for the "Files" section.
    * 🔧 Began a major backend refactoring to improve the content management structure and unify how all user content was handled.
* 03/21/25
    * ✨ Initiated the "Files" feature: the backend database structure for files was implemented.
    * ✨ Began development of the user interface for displaying files.
    * ✨ Added an "early bird deal" mention to the pricing page.
    * ✨ Developed a reusable button component for the UI.
* 03/14/25
    * 🚀 Generalized folder/node deletion and renaming endpoints and updated their usage.
    * 🐛 Fixed an issue that caused files to be deleted twice in some scenarios.
* 03/07/25
    * 🔧 Continued database migration for username-based file paths.
    * 🚀 Refactored site move, delete, and rename functionalities.
    * ✨ Implemented functionality for moving, deleting, and renaming uploaded files and folders.

**February 2025**
* 02/28/25
    * ✨ Established the pricing structure: a single plan with monthly and annual payment options, detailing key features.
    * 🚀 Improved reliability of fetching HTML content through backend optimizations.
    * 🚀 Enhanced file synchronization mechanisms and timestamp handling.
    * 🔧 Began foundational work for using usernames in file paths.
* 02/21/25
    * ✨ Implemented functionality to allow users to rename their sites.
    * ✨ Created `hyperclay.sendMessage`, a new messaging function with support for human/bot detection.
* 02/14/25
    * 🔧 Performed a general deployment to production.
    * 🔧 Tested and confirmed that backups were working correctly on the production environment.
    * ✨ Implemented functionality to allow users to delete a site, which required name confirmation and moved backups to an "old" folder.
* 02/07/25
    * 🔧 Deployed subdomain changes to the production environment.
    * 🚀 Improved the Panphora (devlog) project renaming modal, fixed input width and an issue with the modal not disappearing correctly.

**January 2025**
* 01/31/25
    * 🐛 Conducted comprehensive testing and fixed issues in the "Platform" application (view/edit endpoints, site copying notice, new site creation) and "Panphora (devlog)" (save endpoint).
* 01/24/25
    * ✨ Initiated Phase 1 of subdomain implementation, updated internal links and critical endpoints for future custom domain consistency.
    * 🔧 Tested "Kanban" and "Page Writer" applications with subdomain changes, and fixed related issues.
* 01/19/25
    * 🚀 Updated the pricing page: $15/month or $100/year with 5 initial HTML apps (+1 every 15 days), custom domains (manual setup), file upload, form submissions, code editor, unlimited backups/restore, app organization (folders), HTML app export, cloning from a library, and personal founder help. No special discounts were offered, but existing users kept their current plan if prices rose.
* 01/17/25
    * 🔧 Completed the renaming of the project from "Hyperspace" to "Hyperclay," which included repository and development environment updates.
    * 🔧 Addressed existing blog posts and documentation that referenced "Hyperspace."
* 01/14/25
    * 🔧 Completed the major rebranding from Hyperspace.so to Hyperclay.com. This comprehensive update included migrating Gmail services, reconfiguring Namecheap and Cloudflare DNS, updating OG images, setting up new S3 backup folders, updating server Nginx configurations, and provisioning a new wildcard SSL certificate. Existing `hyperspace.so` links will be forwarded using Cloudflare page rules (301 redirect).
* 01/13/25
    * ✨ Developed `isLikelyHuman.js`, a sophisticated client-side behavior collector and server-side middleware to differentiate human users from bots. This system captured a wide array of behavioral data (mouse movements, scroll events, keyboard inputs, timings, clicks, etc.). A server-side middleware analyzed this data to assess human likelihood before processing requests, enhancing spam and bot protection.

**December 2024**
* 12/14/24
    * 🔧 Documented the process of acquiring the `hyperclay.com` domain.
* 12/09/24
    * 🐛 Fixed an issue causing the Kanban board to save prematurely.
* 12/08/24
    * ✨ Added Hyperclay example apps (Page Writer, Panphora (devlog), Kanban) to the documentation.
    * ✨ Created the "Hyperclay Starter Pack," a collection of essential JavaScript initializations for new projects, which included UI components, custom attribute initializers, persistent form input values, admin resource management, and various page save mechanisms.
* 12/06/24
    * ✨ Added an `ignore-mutations` attribute to prevent DOM change listeners from firing for specific elements and their children.
* 12/05/24
    * ✨ Completed and showcased "dollar," a lightweight jQuery alternative. Announced on Show HN.
    * ✨ Added `prop()` and `css()` plugins to the "dollar" library.
    * 🐛 Fixed an issue with `option` visibility generating excessive styles.
    * 🐛 Addressed a visual bug with plus buttons on the Kanban board.
    * ✨ Implemented `option` conditional visibility attribute.
* 12/01/24
    * ✨ Implemented `cycle` and `cycleAttr` custom attributes for cycling through values or attributes on click.
    * ✨ Added an `admin-page` attribute via `hyperclay.js` to dynamically mark pages for admin-specific functionalities.
    * 🚀 Client-side `show-if` attribute visibility logic was enhanced, removing server-side processing.

**November 2024**
* 11/27/24
    * 🐛 Fixed issues with site copying functionality.
    * 🚀 Significantly improved the "leave site" confirmation dialog behavior for Panphora (devlog) using throttling and page state comparison.
* 11/23/24
    * ✨ Developed `all.js`, a new lightweight jQuery alternative, providing a comprehensive set of DOM manipulation and utility methods.
* 11/13/24
    * 🔧 Tested the newsletter signup process and implemented more flexible messaging.
    * 🔧 Renewed an expired SSL certificate.
* 11/06/24
    * ✨ Enabled dragging and dropping of sites and folders within breadcrumbs to move them.
    * ✨ Implemented drag and drop reordering for sites and folders.
* 11/03/24
    * 🐛 Fixed an issue preventing Browse of non-existent directories.
    * 🐛 Resolved errors occurring when dragging a folder onto the main page body.
    * 🐛 Prevented borders from showing when dragging folders or sites.
    * ✨ Added functionality to delete folders, moving all contained nodes up one level.
    * ✨ Implemented renaming for folders, ensuring all child node paths were updated.
    * ✨ Added the ability to drop nodes up one level in the folder hierarchy.

**October 2024**
* 10/25/24
    * 🔧 Performed a successful data migration, which included adding folder structures for each site.
    * ✨ Implemented folder structures to organize sites.
* 10/17/24
    * 🐛 Fixed an issue where Panphora (devlog) would incorrectly trigger a date popup for non-admin users.
    * ✨ Implemented `disableOnClickBeforeSave()` to manage `onclick` attributes during page save.
    * 🐛 Corrected a bug where menu remnants remained visible if left open on an admin page.
    * 🚀 Improved "leave site" dialog behavior in Panphora (devlog) to reduce false triggers.
* 10/10/24
    * 🚀 Removed `position: absolute` from `show-if` rules to reduce style conflicts.
    * ✨ Added a `replaceWith` method to `All.js` for easier element replacement.
    * 🐛 Fixed `unsavedChanges` behavior for non-admins and AJAX requests.
    * 🐛 Ensured sortable functionality was not enabled for non-admin users.
    * 🐛 Fixed the versions page to correctly display all site versions.
* 10/07/24
    * ✨ Created working interactive demos for the README.
    * ✨ Added the ability to emulate a viewer (non-admin) perspective.
    * 🔧 Ensured the code editor page correctly used `show=view-page`.
* 10/06/24
    * ✨ Implemented `enablePersistentFormInputValues()` to automatically persist form input values.
    * 🔧 Moved `processShowIf` and `attachPageType` functionalities to be server-side.
    * 🚀 Made the page writer edit area full page height.
    * 🚀 Made several minor internal improvements and code organization updates.
* 10/04/24
    * 🔧 Stopped Base64 encoding for Quill JSON content.
* 10/02/24
    * ✨ Added a README.
    * 🐛 Fixed an infinite loop when `/readme` was accessed.
* 10/01/24
    * 🐛 Fixed code block formatting in the page writer's view-only mode after it was saved in the code editor.

**September 2024**
* 09/27/24
    * 🐛 Fixed an issue where saving the `/edit` code page could truncate Page Writer content by correctly escaping `</textarea>`.
    * 🐛 Resolved an unterminated string error in JSON when the README was saved via the code editor.
* 09/26/24
    * 🐛 Addressed Page Writer bugs, which included fixing disappearing `quill-data` nodes, issues with `</textarea>` escaping causing truncation, and formatting discrepancies.
    * ✨ Implemented `onUserDomMutation` to delay saving until user interaction, preventing premature saves on page load.
* 09/25/24
    * 🚀 Updated the README and configured it to be published at `/readme`, with a link from the homepage.
* 09/21/24
    * ✨ Added a changelog link to the homepage.
    * ✨ Allowed admin users to set any site name.
* 09/20/24
    * 🐛 Fixed favicon display problems.
    * 🐛 Fixed `currentSite` cookie handling.
    * ✨ Added front-end support for `isAdmin`.
    * 🚀 Updated homepage content.
* 09/19/24
    * ✨ Implemented regular local backups of sites to Dropbox.
    * ✨ Introduced a public changelog.
    * ✨ Enabled admin users to use any site name, including reserved names like "blog" and "readme."
    * 🚀 Optimized backups to only save differing versions.
    * ✨ Added a script for backing up local sites.
    * 🔧 Prepared for page writer deployment.
    * 🚀 Updated Quill.js.
    * 🐛 Fixed page saving in the page writer.
* 09/18/24
    * 🚀 Improved the page editor for deployment.
    * 🚀 Enhanced the `beforeSave` callback to allow DOM modification before saving.
    * 🐛 Fixed default tooltip values.
    * 🗑️ Removed UI placeholders.
* 09/17/24
    * ✨ Implemented a rich text editor with code blocks and syntax highlighting.
    * 🚀 Improved code block icons and heading styles.
    * 🚀 Enhanced list styles and overall styling.
    * 🚀 Updated `editor.css` for improved styling.
    * 🚀 Improved saving and loading of Quill editor data.
    * ✨ Added syntax highlighting support.
* 09/16/24
    * ✨ Added code block support to the editor.
    * 🚀 Cleaned up styles for a better UI.
    * 🚀 Made the toolbar sticky for a better user experience.
    * ✨ Implemented image tooltip functionality.
    * 🚀 Improved image input handling in the editor.
    * 🚀 Updated fonts for the Quill editor.
    * 🔧 Synchronized page styles with editor content.
    * ✨ Created a prose page template.
* 09/14/24
    * ✨ Enabled file uploads directly from the code editor.
    * 🚀 Enhanced buttons and UI elements.
    * 🚀 Improved upload and file creation.
* 09/13/24
    * ✨ Added a file upload button to the code editor with comprehensive features (name input, type detection, encoding, Base64 upload, URL to clipboard, form reset).
    * ✨ Implemented multiple selections (Cmd+D) in the code editor.
    * 🚀 Improved search in the code editor.
    * 🚀 Updated CodeMirror configurations.
* 09/11/24
    * 🐛 Fixed date handling in backups.
    * 🚀 Enhanced modal dialogs with input fields.
    * 🚀 Improved support for adding new projects.
    * 🚀 Updated CSS imports and modal functionality.
* 09/10/24
    * 🔧 Got the Panphora (devlog) site working with new updates.
    * 🔧 Worked on synchronizing Panphora (devlog) functionality.
* 09/07/24
    * 🔧 Marked all dynamic elements for improved data handling.
    * 🗑️ Removed executable keys for security.
    * 🚀 Enhanced animations across the platform.
    * 🚀 Updated the "3 rules" page.
    * 🚀 Improved pricing page content.
* 09/06/24
    * ✨ Established a robust daily backup system for the full server to a remote, write-once S3 storage, which included SQLite and application directory archiving. Functionality was tested.
    * 🔧 Ensured the versions page was operational.
    * 🔧 Updated deployment scripts.
    * ✨ Added backup scripts for S3.
    * 🔧 Documented starter templates.
    * 🚀 Improved data synchronization methods.
    * 🗑️ Removed minified scripts for clarity.
* 09/05/24
    * 🐛 Fixed the "Manage billing" link.
* 09/02/24
    * 🐛 Ensured the `/edit` code editor page saved correctly.
    * 🚀 Updated pricing page information.
    * 🚀 Enhanced button hover effects.
    * 🐛 Fixed issues with the "I agree to 3 rules" text.
* 09/01/24
    * ✨ Added agreement to "the 3 rules" (Terms of Service) in signup.
    * ✨ Invited an initial set of 10 people to the platform.
    * 🚀 Rewrote homepage content for clarity.
    * 🚀 Adjusted star animation count and speed based on screen size.
    * 🚀 Improved mobile responsiveness and content.
    * ✨ Added homepage buttons for easier navigation.

**August 2024**
* 08/31/24
    * 🚀 Enhanced animations across the platform.
    * 🚀 Updated `hyperspace-app.css` for improved styling.
    * 🚀 Refined homepage text and content.
* 08/30/24
    * 🚀 Redesigned the homepage with new content and animations.
    * ✨ Implemented dynamic star animations on the homepage.
    * 🐛 Adjusted content and fixed mobile display issues.
* 08/29/24
    * 🚀 Rewrote the homepage for better user engagement.
    * 🚀 Improved animations and UI elements.
* 08/28/24
    * 🚀 Implemented improved animations throughout the application.
    * 🚀 Optimized UI elements for a better user experience.
* 08/27/24
    * ✨ Added Berkeley Mono font for code styling.
    * 🔧 Updated deployment scripts for efficiency.
* 08/15/24
    * 🚀 Worked on homepage design and content.
    * 🗑️ Removed unnecessary deployment workflows.
* 08/10/24
    * ✨ Created the "3 rules" page (Terms of Service), which emphasized collaborative building (MIT license), immutable backups, and responsible use. Noted addition to signup flow.
* 08/09/24
    * 🔧 Deployed the application to Hetzner servers.
    * 🔧 Ensured payment processing worked in production.
* 08/05/24
    * ✨ Implemented payment acceptance functionality with Stripe, which included free access requests and tiered paid plans ("WEB EXPLORER", "WEB BUILDER"). Work covered account creation, webhooks, env variables, and pricing table UI.

**July 2024**
* 07/06/24
    * ✨ Implemented a complete signup flow, which included password reset.
    * ✨ Enabled site creation for new users.
    * 🐛 Fixed issues with site backups and renaming.
    * ✨ Added a password generator for enhanced security.
* 07/03/24
    * 🚀 Improved payment processing routes.
    * 🚀 Enhanced database handling for user accounts.
    * ✨ Started integrating username/password login.
* 07/01/24
    * 🔧 Removed expiration dates from email confirmation tokens.

**June 2024**
* 06/29/24
    * 🔧 Migrated to SQLite for improved data handling and future flexibility, particularly for user/site relationships. Site content remained as HTML files.
* 06/24/24
    * 🔧 Set up database columns and message endpoints.
    * 🚀 Improved HTML email formatting.
    * 🚀 Enhanced database models for better data representation.
* 06/20/24
    * ✨ Implemented password-based user accounts, which included signup with hashed passwords, login, and a password reset flow.
    * 🚀 Enhanced session handling and user authentication.
    * 🚀 Improved request handling with user data.
* 06/18/24
    * 🚀 Improved database field naming conventions.
    * 🚀 Enhanced email confirmation tokens and the database API.
    * ✨ Added more data fields to the database for user accounts.
* 06/17/24
    * 🗑️ Removed the `page()` function as part of a refactor.
* 06/10/24
    * ✨ Added Terms of Service and Privacy Policy pages.
    * ✨ Implemented environment variable handling.
    * 🔧 Handled subscription updates in the payment system.
    * ✨ Added active subscription checks for users.
* 06/05/24
    * ✨ Developed and released `hyperspace.js`, a core library providing page change handling, data synchronization, utilities, UI components, DOM helpers, and custom attribute initializers.
    * ✨ Officially changed the business name to Hyperspace Systems LLC.
    * 🗑️ Removed bot filtering middleware.
    * ✨ Set up the pricing page with payment options.

**May 2024**
* 05/31/24
    * ✨ Created custom error pages for a better user experience.
* 05/27/24
    * 🔧 Set up esbuild for JavaScript minification.
    * 🚀 Improved file upload functionality.
    * 🚀 Enhanced code documentation and organization.
    * 🚀 Implemented better data synchronization methods.
* 05/26/24
    * 🚀 Organized Hyperspace libraries for easier maintenance.
    * ✨ Added special attributes for data handling.
* 05/24/24
    * 🔧 Synced data across different parts of the application.
    * 🚀 Improved file system operations and methods.
* 05/18/24
    * ✨ Implemented auto-save on every change.
    * ✨ Created a new blank site template.
    * 🚀 Added documentation strings to functions for clarity.
* 05/03/24
    * 🐛 Fixed issues with mutation observers on page load.
    * 🔧 Ensured the basic save script worked on the starter template.

**April 2024**
* 04/28/24
    * ✨ Developed the `/sites` page for site management, which included site rendering and a menu for view, copy, and code editor access.
    * 🚀 Improved the email confirmation template to reduce spam flagging.
* 04/27/24
    * ✨ Added AJAX form submissions for a better UX.
    * ✨ Added the ability to copy sites and create versions.
    * ✨ Implemented AJAX buttons for restoring sites.
    * 🐛 Fixed issues with site copying and rendering.
* 04/26/24
    * ✨ Added the `onbeforesubmit` custom attribute for forms.
    * ✨ Implemented AJAX form handling with success callbacks.
* 04/25/24
    * 🔧 Fixed backups and ensured the versions page worked correctly.
* 04/24/24
    * 🚀 Organized front-end modules for easier maintenance.
    * 🚀 Cleaned up modal components after they closed.
* 04/21/24
    * 🚀 Improved the `clearDirectory()` function for backups.
    * 🐛 Fixed issues with the Panphora (devlog) site.
* 04/20/24
    * 🚀 Enhanced file uploads and rendering.
* 04/19/24
    * 🐛 Fixed file upload functionality.
* 04/15/24
    * 🚀 Cleaned up code and got the code editor page rendering again.
* 04/14/24
    * ✨ Implemented site backup and restore functionality.
    * ✨ Developed login and signup pages.
    * ✨ Created custom 404, 401, and 400 error pages.
    * ✨ Developed the versions page with one-click restore and view options.
    * ✨ Implemented admin-only scripts.
    * 🚀 Improved modal styles and interactions.
* 04/13/24
    * ✨ Added a copy site modal with enhanced styles.
    * 🚀 Improved hover effects and clip paths for modal close buttons.
* 04/12/24
    * ✨ Created a copy site page for easier site duplication.
    * ✨ Added moving border effects and page titles.
* 04/09/24
    * 🚀 Improved the versions page and removed the old backups page.
    * ✨ Added a route to clear all data if needed.
* 04/08/24
    * 🚀 Updated Remake V3 attempt with working features.
* 04/07/24
    * ✨ Implemented new `renderData` function.
    * 🔧 Moved assets to new locations for better organization.
    * 🚀 Replaced old message displays with improved ones.
* 04/06/24
    * ✨ Started building Remake V3 with improved utilities.
    * 🚀 Organized scripts and functions for clarity.
* 04/05/24
    * 🚀 Worked on Remake V3 refactoring.
    * ✨ Added an `isBrowserRequest` check in middleware.
    * ✨ Added toast notifications for better user feedback.
* 04/04/24
    * ✨ Implemented logout functionality.
* 04/03/24
    * 🐛 Fixed issues with site ordering and duplicate detection.
    * 🚀 Improved page rerendering and error messages.
    * 🐛 Fixed UI elements like moving borders.
* 04/02/24
    * 🚀 Enhanced the sites page with responsive design.
    * ✨ Added menu functionalities to the sites page.
    * 🐛 Fixed gaps and improved layouts.
* 04/01/24
    * ✨ Created a new sites management page.
    * ✨ Began work on the sites page layout and functionality.

**March 2024**
* 03/31/24
    * 🔧 Integrated Tailwind CSS for styling.
* 03/27/24
    * 🐛 Fixed issues with the dx.js  setup.
* 03/25/24
    * ✨ Developed the `all.js` script.
    * 🚀 Updated the site creation/copying process to first ask for a site name.
    * ✨ Worked on a new site modal for easier site creation.
* 03/23/24
    * ✨ Implemented the initial sites management page.
    * 🐛 Fixed various bugs and improved stability.
* 03/22/24
    * 🐛 Fixed tests for the dx.js setup.
    * 🔧 Ensured the application was running smoothly.
* 03/18/24
    * 🚀 Simplified account routes and middleware.
    * 🗑️ Removed unnecessary code for easier maintenance.
* 03/17/24
    * ✨ Implemented the `checkSuperAdmin()` function.
    * 🚀 Cleaned up code and simplified middleware.
    * 🚀 Simplified the `/new` route for site creation.
* 03/16/24
    * 🗑️ Removed unused cookies and reorganized routes.
* 03/14/24
    * 🚀 Worked on simplifying the main `hello.js` script.
* 03/13/24
    * ✨ Added tests for matching functions.
    * 🚀 Improved link creation and retrieval methods.
* 03/12/24
    * ✨ Created functions for appending JSON data.
    * ✨ Added tests for data manipulation functions.
    * 🐛 Fixed bugs in file copying methods.
* 03/11/24
    * 🚀 Added documentation to code for clarity.
    * 🐛 Fixed issues with file reading and appending.
* 03/10/24
    * ✨ Implemented the `appendJSON()` function.
    * ✨ Added matching functionality with `isMatch()`.
* 03/08/24
    * 🚀 Reorganized the codebase for a better structure.
* 03/06/24
    * 🔧 Prepared for dx.js refactor.
    * 🔧 Formatted HTML and added the dx.js library.
    * 🗑️ Removed unnecessary cron jobs and finalized ephemeral refactor.
* 03/04/24
    * 🚀 Improved documentation for cron jobs.

**February 2024**
* 02/29/24
    * 🚀 Rewrote significant portions of the codebase.
* 02/27/24
    * 🚀 Enhanced the ID generator for better uniqueness.
    * 🐛 Fixed issues with copy site naming.
* 02/25/24
    * 🚀 Improved copy site functionality and naming conventions.
    * 🚀 Updated the TODO list with new tasks.
* 02/23/24
    * 🚀 Cleaned up code and removed unnecessary files.
    * ✨ Created rename methods for better file handling.
    * 🐛 Fixed bugs related to loops and iterations.
* 02/21/24
    * ✨ Implemented new cron jobs and improved file system operations.
    * 🐛 Fixed bugs and enhanced overall functionality.
* 02/20/24
    * 🚀 Improved file system handling methods.
    * 🚀 Enhanced application stability and performance.
* 02/17/24
    * 🚀 Updated backup functionalities and improved backup pages.
* 02/16/24
    * 🐛 Fixed bugs in file upload and management.
    * ✨ Implemented email functionality for notifications.
    * 🚀 Enhanced command scripts.
* 02/15/24
    * 🗑️ Removed the deprecated "save changes" feature.
* 02/14/24
    * ✨ Added Panphora (devlog) site HTML for testing.
    * 🚀 Updated command scripts.
* 02/07/24
    * ✨ Added images and assets for documentation.
* 02/05/24
    * 🔧 Merged branches and updated TODO lists.
    * 🚀 Made small code adjustments for optimization.

**January 2024**
* 01/24/24
    * 🐛 Fixed the "Save Site" command in the command palette.
    * 🚀 Ensured all links opened in the same tab for consistency.
* 01/22/24
    * ✨ Created a signup page and cleaned up page styles.
* 01/21/24
    * ✨ Added a "new page" command to the command palette.
    * ✨ Set up initial templates for new pages.
* 01/20/24
    * 🚀 Optimized CSS and integrated Tailwind CSS utilities.
    * 🚀 Separated Tailwind plugin styles into their own CSS files.
    * 🚀 Improved the homepage by using `hyperspace-home` as default.
    * ✨ Now checked site names against reserved words during creation.
    * 🐛 Fixed modal bugs and enhanced Quill editor features.
* 01/19/24
    * ✨ Integrated Quill editor support and added public site viewing option.
* 01/18/24
    * 🐛 Eliminated Tailwind CSS playground warnings.
    * 🔧 Marked pages appropriately for admin access.
* 01/17/24
    * ✨ Worked on Quill editor support for rich text editing.
* 01/16/24
    * 🔧 Integrated Tailwind CSS Play for styling.
    * ✨ Added documentation about project goals.
    * 🚀 Updated configurations for better performance.
* 01/15/24
    * 🚀 Implemented real-time synchronization (unreleased, needs better API) improvements.
    * 🚀 Cleaned up code and ensured collaboration worked both ways.
* 01/14/24
    * ✨ Worked on real-time synchronization (unreleased, needs better API) features.
    * 🚀 Updated the TODO list.
* 01/13/24
    * 🚀 Improved the CodeMirror editor and its save functionality.
    * ✨ Added a link to create a new site on the sites page.
* 01/12/24
    * 🚀 Revamped the message display system for better feedback.
    * 🚀 Updated modal functionalities and fixed related bugs.
* 01/11/24
    * 🚀 Improved the copy site flow and functionality.
* 01/10/24
    * ✨ Worked on the copy site template and its functionalities.
* 01/09/24
    * 🚀 Cleaned up the `/new` route and CodeMirror template.
* 01/08/24
    * ✨ Added CodeMirror editing capabilities.
    * 🐛 Fixed issues with in-memory IDs.
* 01/07/24
    * 🚀 Converted scripts into modules for better organization.
    * 🚀 Updated the admin index page.
    * ✨ Implemented dangerous site deletion functionality.
* 01/06/24
    * ✨ Enabled event source reconnection for real-time updates (unreleased, needs better API).
    * 🚀 Improved the "edit website" link functionality.
* 01/05/24
    * 🔧 Added logging for better debugging.
    * 🐛 Fixed bugs related to the website editing link.
* 01/03/24
    * 🚀 Enhanced the modal library with new features.
    * 🔧 Updated environment configurations.
    * 🚀 Improved the command palette with "fancy" modals.
* 01/02/24
    * ✨ Implemented login functionality and a "sites" link.
    * ✨ Added a requirement for users to specify their reason for signing up.
    * 🚀 Updated homepage content.
    * ✨ Now displayed admin or public site depending on user ownership.
    * ✨ Added a secret signup process; prevented general signups.
    * ✨ Added default page styles.
    * 🚀 Improved page editing functionality.
    * ✨ Added a favicon and logo.
    * 🗑️ Removed buggy real-time collaboration code.

**December 2023**
* 12/31/23
    * ✨ Implemented email confirmation for user signup.
* 12/30/23
    * 🔧 Set up cron jobs for scheduled tasks and improved deployment scripts to update them automatically.
    * 🐛 Fixed issues with crontab formatting.
* 12/28/23
    * ✨ Implemented email signup.
    * 🚀 Improved typography options.
    * 🚀 Updated homepage content.
* 12/24/23
    * 🚀 Improved styling of the command palette.
    * 🚀 Updated URLs for better aesthetics.
    * ✨ Added functionality to restore sites from backups.
* 12/23/23
    * 🚀 Enhanced command palette navigation with up/down arrow keys and prioritized matching commands.
    * 🗑️ Removed unnecessary commands from the palette.
* 12/22/23
    * ✨ Implemented a command palette for quick actions.
    * 🚀 Improved security by removing secrets from page HTML.
    * ✨ Added 'hyper' prefix to certain elements.
* 12/17/23
    * ✨ Implemented real-time collaboration features (unreleased, needs better API).
    * 🚀 Refactored scripts into modular pieces.
    * 🐛 Fixed server restart issues when website content changed.
* 12/12/23
    * ✨ Added warnings for when multiple users edited the same page.
    * 🔧 Adjusted server settings for better real-time updates (unreleased, needs better API).
* 12/11/23
    * 🚀 Improved the site creation script.
    * ✨ Allowed form submission from the admin page.
    * 🐛 Improved handling of newlines in configuration files.
* 12/10/23
    * ✨ Added a keyboard shortcut (Cmd+S) for saving pages.
    * 🚀 Improved attribute removal before saving pages.
    * 🚀 Updated scripts for saving pages.
* 12/09/23
    * ✨ Implemented site creation and page saving functionality.
    * ✨ Added safeguards to prevent overwriting other users' sites.
    * ✨ Implemented backups functionality with a directory listing.
    * 🔧 Updated deployment configurations.
* 12/08/23
    * ✨ Enabled live HTML editing.
    * ✨ Created a TODO list for project planning.
* 12/07/23
    * 🔧 Set up deployment scripts and workflows, implementing an automatic deployment process.
* 12/05/23
    * ✨ Initial project commit, setting up basic structure and initial code files.