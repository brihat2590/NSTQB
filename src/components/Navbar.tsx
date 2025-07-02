'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExamsOpen, setIsExamsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsExamsOpen(false);
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleExams = () => {
    if (!isExamsOpen) setIsResourcesOpen(false);
    setIsExamsOpen(!isExamsOpen);
  };
  const toggleResources = () => {
    if (!isResourcesOpen) setIsExamsOpen(false);
    setIsResourcesOpen(!isResourcesOpen);
  };

  // Close all menus (used on mobile nav item click)
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsExamsOpen(false);
    setIsResourcesOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="bg-gray-50 shadow-lg sticky top-0 z-50 font-sans"
      aria-label="Main navigation"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src={'/whiteImage.png'}
                alt="Company Logo"
                width={100}
                height={100}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/">Home</NavLink>

            {/* Exams Dropdown */}
            <div className="relative">
              <DropdownButton
                isOpen={isExamsOpen}
                onClick={toggleExams}
                label="Exams"
              />
              {isExamsOpen && (
                <DropdownMenu>
                  <DropdownItem href="/CTFL" onClick={() => setIsExamsOpen(false)}>CTFL</DropdownItem>
                  <DropdownItem href="/mock-test" onClick={() => setIsExamsOpen(false)}>Mock Exam</DropdownItem>
                  <DropdownItem href="/exam-schedule" onClick={() => setIsExamsOpen(false)}>Exam Schedule</DropdownItem>
                  <DropdownItem href="/certified-testers" onClick={() => setIsExamsOpen(false)}>Certified Testers</DropdownItem>
                  <DropdownItem href="/registration-process" onClick={() => setIsExamsOpen(false)}>Registration Process</DropdownItem>
                </DropdownMenu>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <DropdownButton
                isOpen={isResourcesOpen}
                onClick={toggleResources}
                label="Resources"
              />
              {isResourcesOpen && (
                <DropdownMenu>
                  <DropdownItem href="/FAQ" onClick={() => setIsResourcesOpen(false)}>FAQs</DropdownItem>
                  <DropdownItem href="/code-of-conduct" onClick={() => setIsResourcesOpen(false)}>Code of Conduct</DropdownItem>
                  <DropdownItem href="/blogs" onClick={() => setIsResourcesOpen(false)}>blogs</DropdownItem>
                </DropdownMenu>
              )}
            </div>

            <NavLink href="/contact">Contact Us</NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 p-2 rounded-md transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <MobileNavLink href="/" onClick={closeAllMenus}>Home</MobileNavLink>

            {/* Exams Dropdown - Mobile */}
            <div className="space-y-1">
              <MobileDropdownButton
                isOpen={isExamsOpen}
                onClick={toggleExams}
                label="Exams"
              />
              {isExamsOpen && (
                <MobileDropdownMenu>
                  <MobileDropdownItem href="/CTFL" onClick={closeAllMenus}>CTFL</MobileDropdownItem>
                  <MobileDropdownItem href='/mock-test' onClick={closeAllMenus}>Mock Exam</MobileDropdownItem>
                  <MobileDropdownItem href="/exam-schedule" onClick={closeAllMenus}>Exam Schedule</MobileDropdownItem>
                  <MobileDropdownItem href="/certified-testers" onClick={closeAllMenus}>Certified Testers</MobileDropdownItem>
                  <MobileDropdownItem href="/registration-process" onClick={closeAllMenus}>Registration Process</MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </div>

            {/* Resources Dropdown - Mobile */}
            <div className="space-y-1">
              <MobileDropdownButton
                isOpen={isResourcesOpen}
                onClick={toggleResources}
                label="Resources"
              />
              {isResourcesOpen && (
                <MobileDropdownMenu>
                  <MobileDropdownItem href="/FAQ" onClick={closeAllMenus}>FAQs</MobileDropdownItem>
                  <MobileDropdownItem href="/blogs" onClick={closeAllMenus}>blogs</MobileDropdownItem>
                  <MobileDropdownItem href="/code-of-conduct" onClick={closeAllMenus}>Code of Conduct</MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </div>

            <MobileNavLink href="/contact" onClick={closeAllMenus}>Contact Us</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable components with updated onClick props
const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-800 hover:text-gray-600 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-100"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-800 hover:text-gray-600 block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-100"
  >
    {children}
  </Link>
);

const DropdownButton = ({
  isOpen,
  onClick,
  label,
}: {
  isOpen: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center text-gray-800 hover:text-gray-600 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-100"
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {label}
    <ChevronDown
      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`}
    />
  </button>
);

const MobileDropdownButton = ({
  isOpen,
  onClick,
  label,
}: {
  isOpen: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full text-gray-800 hover:text-gray-600 px-4 py-3 rounded-md text-base font-medium hover:bg-gray-100"
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {label}
    <ChevronDown
      className={`h-4 w-4 transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`}
    />
  </button>
);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
    {children}
  </div>
);

const MobileDropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="pl-6 space-y-1">{children}</div>
);

const DropdownItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
  >
    {children}
  </Link>
);

const MobileDropdownItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-sm font-medium hover:bg-gray-100"
  >
    {children}
  </Link>
);

export default Navbar;
