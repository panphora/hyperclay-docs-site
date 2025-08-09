import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Hyperclay Docs",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "docs.hyperclay.com",
    ignorePatterns: [
      "private", 
      "templates", 
      ".obsidian",
      "**/.obsidian/**",
      "**/.git/**",
      "**/node_modules/**",
      "**/.DS_Store",
      "**/*.excalidraw.md"
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "JetBrains Mono",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#d5d6db",  // --bg from your light theme
          lightgray: "#cbccd1",  // --bg_dark
          gray: "#9699a3",  // --comment
          darkgray: "#343b58",  // --fg
          dark: "#272e4b",  // --fg_dark
          secondary: "#0f4b6e",  // --cyan (accent)
          tertiary: "#34548a",  // --blue
          highlight: "rgba(220, 222, 226, 0.5)",  // --bg_highlight
          textHighlight: "#7dcfff44",
        },
        darkMode: {
          light: "#1a1b26",  // --bg from your dark theme
          lightgray: "#292e42",  // --bg_highlight_dark
          gray: "#565f89",  // --comment
          darkgray: "#a9b1d6",  // --fg_dark
          dark: "#ebeeffc",  // --fg
          secondary: "#7dcfff",  // --cyan (accent)
          tertiary: "#bb9af7",  // --magenta
          highlight: "rgba(41, 46, 66, 0.5)",  // --bg_highlight
          textHighlight: "#7dcfff44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
