# LIVE 2025 Conference Submission Form

**Conference:** LIVE 2025  
**User:** david@hyperclay.com  
**Submission Type:** New submission

## Important Deadlines
- **Registration Deadline:** Monday Jul 21, 2025, 11:59 PM AoE
- **Completion Deadline:** Monday Jul 21, 2025, 11:59 PM AoE

---

## Required Fields

### Title *
"Hyperclay: Single HTML Files as Self-Modifying Web Applications"

### Abstract *
Hyperclay reimagines web applications as single, self-contained HTML files that can modify and persist themselves. By treating the DOM as simultaneously the source code, runtime, database, and UI, Hyperclay eliminates the complexity of modern web stacks while enabling immediate, malleable software creation. As you shape the document, you shape the application—no gap between intention and creation. Users can build functional web applications without backends, build tools, or deployment pipelines—just HTML that saves itself. We demonstrate how collapsing the traditional separation between code, data, and infrastructure enables a new paradigm of personal software where you can hold an entire application in your mind at once. Through novel techniques like the save-strip-restore cycle and DOM-as-database patterns, Hyperclay makes web development as immediate and tactile as working with physical objects.

---

## Optional Fields

### Contacts
These users can view and edit the submission. All listed authors with site accounts are contacts.

### URL or Notes
If the submission cannot be uploaded and/or is hosted elsewhere.
- Live platform: https://hyperclay.com
- Example applications: https://hyperclay.com/examples
- Documentation: https://hyperclay.com/docs
- GitHub repository: https://github.com/hyperclay/hyperclay

### Submission (optional) (PDF, max 600MB)
E.g. PDF, video, or zip archive of a web essay
_[Upload video demonstration and technical documentation PDF]_

---

## Questions

LIVE is a scholarly workshop that welcomes many submissions from outside of academia. We hope to provide a bridge into academic values and practices for people who want to join the academic conversation.

As part of this process, we ask that you consider and respond to the following three questions in your submission:

### Question 1: The headline *
**What did you discover that other researchers should know about?**

We discovered that web applications can be radically simplified by treating HTML documents as mutable, self-persisting entities. The key insight: if you collapse the entire web stack—UI, backend, database, and behavior—into a single HTML file that can save its own modifications, you enable a fundamentally different mode of creation. Most frameworks reduce complexity by adding abstractions; Hyperclay reduces it by removing them. This isn't just a technical optimization; it's a new type of application that's portable, self-contained, and comprehensible in its entirety. Researchers should know that by embracing "locality of concern" over "separation of concerns" and treating the DOM as the single source of truth, we can eliminate entire categories of complexity while enabling users to modify their tools at runtime. The result: software you can hold in your mind in its entirety.

### Question 2: Building on the past *
**What previous systems are similar to yours, in their goals or their methods? How does your system differ?**

Hyperclay builds on several lineages:
- **Spreadsheets** (VisiCalc, Excel): The canonical example of live programming where data and computation unite, but Hyperclay extends this to full web applications
- **TiddlyWiki**: Self-contained wiki in a single HTML file, but Hyperclay generalizes beyond wiki functionality to arbitrary applications
- **HyperCard**: Shares end-user programming through direct manipulation, but Hyperclay uses standard web technologies rather than proprietary formats
- **Smalltalk**: Image-based persistence where code and data are unified, but applied to web documents instead of virtual machines
- **Emacs**: Self-modifying environments where the tool can edit itself, but using HTML/DOM instead of Lisp
- **Wiki systems**: Embraces Ward Cunningham's editable web, but extends editing to include behavior, not just content
- **Webstrates**: Collaborative malleable web documents, but Hyperclay prioritizes single-file simplicity over collaboration primitives
- **Observable/Jupyter**: Immediate feedback and literate programming, but producing standalone applications rather than notebooks

Hyperclay differs through its radical commitment to single-file architecture and using the DOM itself as the database, eliminating backend infrastructure while maintaining standard web compatibility.

### Question 3: Keeping a critical eye *
**Where are the limits of your system? What unsolved problems lie ahead?**

Hyperclay makes explicit trade-offs that limit its applicability:
- **Scale boundaries**: Single HTML files work well up to ~100,000 DOM elements; beyond that, browsers struggle
- **Security model**: Everything in the document is visible to all users—no secrets, no complex permissions
- **Collaboration limits**: No version control, branching, or merge conflict resolution beyond simple ownership
- **Performance ceiling**: Save operations transmit the entire document (typically 50KB-5MB), which can be an issue on slower networks

Unsolved problems include:
- How to maintain wholeness while enabling composition across documents
- How to preserve immediacy when documents reference external resources
- Whether visual programming can extend beyond code-literate users without sacrificing directness
- The deeper challenge: shifting from industrial-scale to personal-scale thinking about software

The philosophical tension remains: every feature that increases capability risks fracturing the "one thing" philsophy that makes Hyperclay apps comprehensible.

---

## Video Demonstration Outline (3-5 minutes)

### **Opening (30 seconds)**
- Show a complex modern web stack diagram (React, Node, PostgreSQL, Docker, AWS)
- Contrast with single HTML file
- "What if web apps were just HTML files that could save themselves?"

### **Demo: Building a Todo App (90 seconds)**
1. Start with empty HTML file
2. Add title with `edit-mode-contenteditable`
3. Create todo template with clone pattern
4. Show progressive enhancement:
   - Add `persist` attribute for input persistence
   - Add `sortable` for drag-and-drop
   - Use `.nearest.task` for DOM navigation
5. Live edit in DevTools - changes persist on save
6. Press Ctrl+S - visualize save-strip-restore cycle
7. Reload to show persistence
8. View source: it's just HTML

### **Technical Architecture (60 seconds)**
- DOM as database visualization
- Animate save-strip-restore cycle:
  1. Edit mode shows admin UI
  2. Save strips `edit-mode-*` attributes
  3. Server stores clean HTML
  4. Reload restores edit capabilities
- Key patterns live demo:
  - `this.nearest.task.remove()` - DOM navigation
  - `option:status="done"` - conditional visibility
  - Template-clone pattern for dynamic content

### **Philosophy & Impact (60 seconds)**
- "Software should be as malleable as clay"
- Show examples of personal tools people have built
- Emphasize immediate feedback loop
- "The document modifies itself, stores itself, serves itself"

### **Limitations & Future (30 seconds)**
- Acknowledge scale boundaries
- Show roadmap: HTML page API, document linking, versioning, visual programming
- Call to action: "Start with one HTML file"

### **Closing (15 seconds)**
- Website: hyperclay.com
- "The source code is the user interface. The user interface is the application. The application is the source code."

---

## Additional Materials to Submit
- Live examples: Dev Log, Writer, Kanban, Landing (all at hyperclay.com)
- Technical documentation: "Hacker's Manual for Hyperclay.md"
x - GitHub repository: https://github.com/hyperclay/hyperclay
- Screenshots of save-strip-restore cycle in action
- Code snippets demonstrating the 9 key attributes

---

## Submission Status

**Note:** If your submission does not present a novel programming system, you can ignore the questions above.

### Ready for Review
☐ **The submission is ready for review** _(Mark when all materials are uploaded)_

**Status:** You must fill out all required fields to mark the submission as ready for review.

**Update Period:** You can update this submission until Monday Jul 21, 2025, 11:59 PM AoE (Jul 22 7:59 AM your time). Only submissions marked ready for review will be evaluated.