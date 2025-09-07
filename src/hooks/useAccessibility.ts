import { useEffect, useCallback } from 'react';

interface AccessibilityOptions {
  enableKeyboardNavigation?: boolean;
  enableScreenReader?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    enableKeyboardNavigation = true,
    enableScreenReader = true,
    enableHighContrast = true,
    enableReducedMotion = true
  } = options;

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enableKeyboardNavigation) return;

    // Skip to main content
    if (event.key === 'Tab' && event.shiftKey && event.target === document.body) {
      const skipLink = document.querySelector('.skip-link') as HTMLElement;
      if (skipLink) {
        skipLink.focus();
        event.preventDefault();
      }
    }

    // Close modals/dropdowns with Escape
    if (event.key === 'Escape') {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.getAttribute('aria-expanded') === 'true') {
        activeElement.click();
      }
    }
  }, [enableKeyboardNavigation]);

  // Handle focus management
  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  // Announce changes to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableScreenReader) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [enableScreenReader]);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (!enableReducedMotion) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [enableReducedMotion]);

  // Check for high contrast preference
  const prefersHighContrast = useCallback(() => {
    if (!enableHighContrast) return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
  }, [enableHighContrast]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    trapFocus,
    announce,
    prefersReducedMotion,
    prefersHighContrast
  };
}