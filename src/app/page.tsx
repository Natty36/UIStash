"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  BookmarkPlus,
  Compass,
  Check,
  User,
  X,
  Bookmark,
  Trash2,
  Heart,
  Sparkles,
} from "lucide-react";
import { resourcesData, categories } from "@/data/resources";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState<"All" | "Saved" | "ChefsChoice">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for '/' and Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      if (
        (e.key === "/" && !isInputActive) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // UI Saved Drawer State
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return resourcesData.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      let matchesCategory = true;
      if (!query) {
        if (activeFilter === "All") {
          matchesCategory = activeCategory === "All" || item.category === activeCategory;
        } else if (activeFilter === "Saved") {
          matchesCategory = savedItems.includes(item.id) && (activeCategory === "All" || item.category === activeCategory);
        } else if (activeFilter === "ChefsChoice") {
          matchesCategory = !!item.chefsChoice && (activeCategory === "All" || item.category === activeCategory);
        }
      } else {
        if (activeFilter === "Saved") {
          matchesCategory = savedItems.includes(item.id);
        } else if (activeFilter === "ChefsChoice") {
          matchesCategory = !!item.chefsChoice;
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, activeFilter, searchQuery, savedItems]);

  const savedResourcesList = useMemo(() => {
    return resourcesData.filter((item) => savedItems.includes(item.id));
  }, [savedItems]);

  const toggleSave = (id: number) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-zinc-800 relative">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => { setActiveFilter("All"); setActiveCategory("All"); setSearchQuery(""); }}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="UI Stash" className="w-8 h-8 object-contain rounded-md" />
            <span className="font-bold text-xl tracking-tight hidden sm:block font-mono group-hover:text-zinc-300 transition-colors">
              UI Stash
            </span>
          </div>

          {/* Right Action Controls + Compact Search */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto">
            {/* Search Input */}
            <div className="relative group w-36 sm:w-56">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-zinc-500 group-focus-within:text-zinc-200 transition-colors" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tools..."
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-md py-1.5 pl-8 pr-7 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all placeholder:text-zinc-500 text-zinc-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-0.5 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
                    title="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-800 px-1 font-mono text-[9px] text-zinc-500 bg-zinc-900 pointer-events-none">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Saved Button */}
            <button
              onClick={() => { setActiveFilter("Saved"); setActiveCategory("All"); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-zinc-800 transition-all active:scale-95 ${
                activeFilter === "Saved"
                  ? "bg-zinc-800 text-foreground border-zinc-700"
                  : "bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${savedItems.length > 0 ? "text-foreground fill-foreground/30" : "text-zinc-500"}`} />
              <span className="hidden sm:inline">Saved ({savedItems.length})</span>
            </button>

            {/* Sign In Button */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
              title="Sign In"
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 flex-1 flex flex-col md:flex-row py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 px-1">Discover</h3>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveFilter("All"); setActiveCategory("All"); setSearchQuery(""); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono transition-colors ${
                    activeFilter === "All" && activeCategory === "All"
                      ? 'bg-zinc-800/80 text-foreground border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-foreground hover:bg-zinc-900/60'
                  }`}
                >
                  <Compass className={`h-4 w-4 ${activeFilter === "All" && activeCategory === "All" ? 'text-zinc-200' : 'text-zinc-500'}`} />
                  All Resources
                </button>
                <button
                  onClick={() => { setActiveFilter("Saved"); setActiveCategory("All"); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-mono transition-colors ${
                    activeFilter === "Saved"
                      ? 'bg-zinc-800/80 text-foreground border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-foreground hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className={`h-4 w-4 ${activeFilter === "Saved" ? 'text-zinc-200 fill-zinc-200/20' : 'text-zinc-500'}`} />
                    <span>Saved</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
                    {savedItems.length}
                  </span>
                </button>
                <button
                  onClick={() => { setActiveFilter("ChefsChoice"); setActiveCategory("All"); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono transition-colors ${
                    activeFilter === "ChefsChoice"
                      ? 'bg-zinc-800/80 text-foreground border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-foreground hover:bg-zinc-900/60'
                  }`}
                >
                  <Sparkles className={`h-4 w-4 ${activeFilter === "ChefsChoice" ? 'text-amber-400' : 'text-zinc-500'}`} />
                  Chef&apos;s Choice
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 px-1">Categories</h3>
              <div
                className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin overscroll-contain"
                data-lenis-prevent
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { 
                      setActiveCategory(cat);
                      if (activeFilter !== "All") setActiveFilter("All");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-all ${
                      activeCategory === cat && activeFilter === "All"
                        ? "bg-zinc-800/60 text-foreground border border-zinc-700/40"
                        : "text-zinc-400 hover:text-foreground hover:bg-zinc-900/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mb-8 flex items-end justify-between border-b border-zinc-800/60 pb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-1 font-[family-name:var(--font-space-grotesk)]">
                {activeFilter === "Saved"
                  ? "Saved Resources"
                  : activeFilter === "ChefsChoice"
                  ? "Chef's Choice"
                  : activeCategory === "All"
                  ? "Explore Resources"
                  : activeCategory}
              </h1>
              <p className="text-xs font-mono text-zinc-500">
                Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredResources.map((resource) => {
                  const isSaved = savedItems.includes(resource.id);
                  return (
                    <motion.div
                      key={resource.id}
                      layout
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 overflow-hidden transition-colors duration-200 hover:border-zinc-600 hover:bg-zinc-900/80 cursor-default"
                    >
                      {/* Whole card clickable link overlay */}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 cursor-default"
                        aria-label={resource.title}
                      />

                      <div className="relative z-20 pointer-events-none">
                        <div className="flex justify-between items-start mb-3 pointer-events-auto">
                          <span className="inline-flex items-center rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            {resource.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSave(resource.id);
                            }}
                            className={`p-1.5 rounded transition-colors ${
                              isSaved ? 'text-foreground bg-zinc-800 border border-zinc-700' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60'
                            }`}
                            aria-label="Save resource"
                          >
                            {isSaved ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        <div className="mt-2">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-9 h-9 rounded-md bg-zinc-950 flex items-center justify-center overflow-hidden border border-zinc-800 shrink-0 shadow-sm p-1">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${resource.url}&sz=128`}
                                alt={`${resource.title} icon`}
                                className="w-6 h-6 object-contain"
                                onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                              />
                            </div>
                            <h3 className="font-bold text-base text-zinc-100 flex items-center gap-1.5 font-[family-name:var(--font-space-grotesk)] group-hover:text-white transition-colors">
                              {resource.title}
                              <ExternalLink className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-mono">
                            {resource.desc}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-20 mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60 pointer-events-none">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] font-mono text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20 flex flex-col items-center">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center mb-3">
                <Bookmark className="h-5 w-5 text-zinc-500" />
              </div>
              <h3 className="text-base font-bold mb-1 font-[family-name:var(--font-space-grotesk)]">
                {activeFilter === "Saved" ? "No saved resources yet" : "No resources found"}
              </h3>
              <p className="text-xs font-mono text-zinc-500 max-w-xs mx-auto">
                {activeFilter === "Saved"
                  ? "Click the bookmark icon on any card to save it to your list."
                  : `We couldn't find anything matching your search.`}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 mt-12 bg-zinc-950/40">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500/20 inline" />
            <span>for developers & designers.</span>
          </p>
          <div className="flex items-center gap-6 text-xs font-mono text-zinc-500">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* --- SAVED RESOURCES DRAWER --- */}
      <AnimatePresence>
        {isSavedDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSavedDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col font-mono"
              >
                <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                      <Bookmark className="h-4 w-4 fill-zinc-200/20" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base font-[family-name:var(--font-space-grotesk)]">Saved Vault</h3>
                      <p className="text-[11px] text-zinc-500">{savedItems.length} resources saved</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSavedDrawerOpen(false)}
                    className="p-1.5 rounded hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-3" data-lenis-prevent>
                  {savedResourcesList.length > 0 ? (
                    savedResourcesList.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-start justify-between gap-3 group hover:border-zinc-700 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-xs hover:text-white flex items-center gap-1.5 transition-colors font-[family-name:var(--font-space-grotesk)]"
                          >
                            {item.title}
                            <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-zinc-300" />
                          </a>
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1 font-mono">{item.desc}</p>
                          <span className="inline-block mt-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-500">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSave(item.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-16 text-center space-y-2 text-zinc-500">
                      <Bookmark className="h-8 w-8 mx-auto text-zinc-700" />
                      <p className="text-xs font-mono">Your saved vault is empty.</p>
                      <p className="text-[10px] text-zinc-600">Click the bookmark icon on any card to save it here!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
