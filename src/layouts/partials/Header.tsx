

import config from "@/config/config.json";
import menu from "@/config/menu.json";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import { fadeInDownVariants } from "@/lib/animations";

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface IMegaMenuNavigation {
  mega_menu_title: string;
  page_title: string;
  mega_menu_groups: IChildNavigationLink[][];
  page_links: IChildNavigationLink[];
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
  mega_menu?: IMegaMenuNavigation;
}

const normalizePath = (path: string) => {
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const Header = ({ pathname: initialPathname }: { pathname?: string }) => {
  // distructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  // get current path
  const pathname = initialPathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const normalizedPathname = normalizePath(pathname);

  const isPathActive = (url?: string) => {
    if (!url) return false;
    return normalizePath(url) === normalizedPathname;
  };

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  // scroll to top and close menu on route change
  useEffect(() => {
    window.scroll(0, 0);
    closeMenu();
  }, [pathname, closeMenu]);

  // close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMenu]);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInDownVariants}
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}  `}
    >
      <nav className="navbar container relative">
        {/* logo */}
        <div className="order-0">
          <a href="/" className="navbar-brand inline-block"><img src={config.site.logo} alt={config.site.title} width={Number(config.site.logo_width) * 2} height={Number(config.site.logo_height) * 2} style={{ height: `${config.site.logo_height}px`, width: `${config.site.logo_width}px` }} /></a>
        </div>
        {/* navbar toggler */}
        <button
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          className="order-3 cursor-pointer flex items-center xl:hidden text-text xl:order-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className={`h-6 fill-current ${menuOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            className={`h-6 fill-current ${menuOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </button>
        {/* /navbar toggler */}

        <ul
          id="nav-menu"
          className={`navbar-nav order-3 xl:order-1 xl:flex xl:w-auto xl:pb-0 xl:space-x-8 ${
            menuOpen
              ? "absolute top-full inset-x-0 bg-body border-b border-border/6 z-40 w-full pb-6 max-h-[calc(100dvh-6rem)] overflow-y-auto"
              : "hidden"
          }`}
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li
                  className="nav-item nav-dropdown group relative"
                  onMouseEnter={() => setHoveredMenu(menu.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    onClick={() => toggleSubmenu(menu.name)}
                    className={`nav-link inline-flex items-center w-full xl:pointer-events-none justify-center ${
                      [
                        ...(menu.mega_menu?.mega_menu_groups?.flat() || []),
                        ...(menu.mega_menu?.page_links || []),
                        ...(menu.children || []),
                      ].some(({ url }) => isPathActive(url))
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg
                      className={`h-4 w-4 fill-current transition-transform xl:transition-none ${
                        openSubmenu === menu.name
                          ? "rotate-180 xl:rotate-0"
                          : ""
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>
                  {menu.mega_menu ? (
                    <>
                      {/* Mobile: state-controlled */}
                      <div
                        className={`xl:hidden ${
                          openSubmenu === menu.name ? "block" : "hidden"
                        }`}
                      >
                        <div className="p-2.5 w-full rounded-3xl mt-3 bg-card border border-border/6 grid gap-3">
                          <div className="nav-dropdown-list nav-mega-menu col-span-2">
                            <div className="nav-mega-grid">
                              <p className="nav-mega-title nav-mega-company-title">
                                {menu.mega_menu.mega_menu_title}
                              </p>
                              {menu.mega_menu.mega_menu_groups?.map(
                                (group, groupIndex) => (
                                  <div
                                    className="nav-mega-company-col"
                                    key={`company-group-${groupIndex}`}
                                  >
                                    {group.map((item, itemIndex) => (
                                        <a
                                          href={item.url}
                                          onClick={closeMenu}
                                          key={`company-item-${groupIndex}-${itemIndex}`}
                                          className={`nav-mega-link ${isPathActive(item.url) ? "active" : ""}`}
                                        >
                                          <span className="nav-mega-icon-wrap">
                                            {item.icon && <DynamicIcon icon={item.icon} className="nav-mega-icon" />}
                                          </span>
                                          <span className="nav-mega-content">
                                            <span className="nav-mega-name">{item.name}</span>
                                            <span className="nav-mega-description">{item.description}</span>
                                          </span>
                                        </a>
                                    ))}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Desktop: AnimatePresence with fadeInUp */}
                      <div className="hidden xl:block">
                        <AnimatePresence>
                          {hoveredMenu === menu.name && (
                            <motion.div
                              className="absolute left-1/5 w-245 -translate-x-1/2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                              <div className="p-2.5 w-full rounded-3xl mt-4 bg-card border border-border/6 grid gap-3 grid-cols-3 items-start">
                                <div className="nav-dropdown-list nav-mega-menu col-span-2">
                                  <div className="nav-mega-grid">
                                    <p className="nav-mega-title nav-mega-company-title">
                                      {menu.mega_menu.mega_menu_title}
                                    </p>
                                    {menu.mega_menu.mega_menu_groups?.map(
                                      (group, groupIndex) => (
                                        <div
                                          className="nav-mega-company-col"
                                          key={`company-group-${groupIndex}`}
                                        >
                                          {group.map((item, itemIndex) => (
                                              <a
                                                href={item.url}
                                                key={`company-item-${groupIndex}-${itemIndex}`}
                                                className={`nav-mega-link ${isPathActive(item.url) ? "active" : ""}`}
                                              >
                                                <span className="nav-mega-icon-wrap">
                                                  {item.icon && <DynamicIcon icon={item.icon} className="nav-mega-icon" />}
                                                </span>
                                                <span className="nav-mega-content">
                                                  <span className="nav-mega-name">{item.name}</span>
                                                  <span className="nav-mega-description">{item.description}</span>
                                                </span>
                                              </a>
                                          ))}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-1 p-4">
                                  <p className="nav-mega-title nav-mega-legal-title">
                                    {menu.mega_menu.page_title}
                                  </p>
                                  <div className="nav-mega-legal-list">
                                    {menu.mega_menu.page_links?.map((item, index) => (
                                        <a
                                          href={item.url}
                                          onClick={closeMenu}
                                          key={`legal-link-${index}`}
                                          className={`nav-mega-legal-link ${isPathActive(item.url) ? "active" : ""}`}
                                        >
                                          {item.icon && <DynamicIcon icon={item.icon} className="nav-mega-legal-icon" />}
                                          <span>{item.name}</span>
                                        </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Mobile: state-controlled */}
                      <ul
                        className={`nav-dropdown-list xl:hidden ${
                          openSubmenu === menu.name ? "block" : "hidden"
                        }`}
                      >
                        {menu.children?.map((child, i) => (
                          <li className="nav-dropdown-item" key={`children-${i}`}>
                            <a
                              href={child.url}
                              onClick={closeMenu}
                              className={`nav-dropdown-link block ${
                                isPathActive(child.url) && "active"
                              }`}
                            >
                              {child.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                      {/* Desktop: AnimatePresence with fadeInUp */}
                      <div className="hidden xl:block">
                        <AnimatePresence>
                          {hoveredMenu === menu.name && (
                            <motion.ul
                              className="nav-dropdown-list absolute top-full left-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                              {menu.children?.map((child, i) => (
                                <li className="nav-dropdown-item" key={`children-${i}`}>
                                  <a
                                    href={child.url}
                                    onClick={closeMenu}
                                    className={`nav-dropdown-link block ${
                                      isPathActive(child.url) && "active"
                                    }`}
                                  >
                                    {child.name}
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    href={menu.url}
                    onClick={closeMenu}
                    className={`nav-link block ${
                      isPathActive(menu.url) && "active"
                    }`}
                  >
                    {menu.name}
                  </a>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block xl:hidden">
              <a
                className="btn btn-primary"
                href={navigation_button.link}
                onClick={closeMenu}
                target={
                  navigation_button.link.startsWith("http") ? "_blank" : "_self"
                }
                rel={
                  navigation_button.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {navigation_button.label}
              </a>
            </li>
          )}
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 xl:ml-0">
          {navigation_button.enable && (
            <a
              className="btn btn-primary hidden xl:inline-block"
              href={navigation_button.link}
              onClick={closeMenu}
              target={
                navigation_button.link.startsWith("http") ? "_blank" : "_self"
              }
              rel={
                navigation_button.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {navigation_button.label}
            </a>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
