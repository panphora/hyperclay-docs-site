import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // For numeric-prefixed files (like "01 Title", "02 Title"), extract the number
        const getNumericPrefix = (node) => {
          const name = node.displayName || node.slugSegment || ""
          const match = name.match(/^(\d+)\s/)
          return match ? parseInt(match[1]) : null
        }
        
        const aNum = getNumericPrefix(a)
        const bNum = getNumericPrefix(b)
        
        // If both have numeric prefixes, sort by number
        if (aNum !== null && bNum !== null) {
          return aNum - bNum
        }
        
        // If only one has a numeric prefix, it comes first
        if (aNum !== null) return -1
        if (bNum !== null) return 1
        
        // Default sorting: folders first, then alphabetical
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // For numeric-prefixed files (like "01 Title", "02 Title"), extract the number
        const getNumericPrefix = (node) => {
          const name = node.displayName || node.slugSegment || ""
          const match = name.match(/^(\d+)\s/)
          return match ? parseInt(match[1]) : null
        }
        
        const aNum = getNumericPrefix(a)
        const bNum = getNumericPrefix(b)
        
        // If both have numeric prefixes, sort by number
        if (aNum !== null && bNum !== null) {
          return aNum - bNum
        }
        
        // If only one has a numeric prefix, it comes first
        if (aNum !== null) return -1
        if (bNum !== null) return 1
        
        // Default sorting: folders first, then alphabetical
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
    }),
  ],
  right: [],
}
