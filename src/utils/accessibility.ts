// Accessibility utilities for production-ready application

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Trap focus within a container element
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
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
  },

  /**
   * Move focus to the next focusable element
   */
  focusNext: (currentElement: HTMLElement): void => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const currentIndex = Array.from(focusableElements).indexOf(currentElement);
    const nextElement = focusableElements[currentIndex + 1];
    
    if (nextElement) {
      nextElement.focus();
    }
  },

  /**
   * Move focus to the previous focusable element
   */
  focusPrevious: (currentElement: HTMLElement): void => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const currentIndex = Array.from(focusableElements).indexOf(currentElement);
    const previousElement = focusableElements[currentIndex - 1];
    
    if (previousElement) {
      previousElement.focus();
    }
  }
};

/**
 * ARIA utilities
 */
export const ariaUtils = {
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Set ARIA attributes for a modal dialog
   */
  setupModal: (modal: HTMLElement, trigger?: HTMLElement): (() => void) => {
    const previousActiveElement = document.activeElement as HTMLElement;
    
    // Set ARIA attributes
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus the modal
    const firstFocusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Return cleanup function
    return () => {
      modal.setAttribute('aria-hidden', 'true');
      if (trigger) {
        trigger.focus();
      } else if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  },

  /**
   * Set ARIA attributes for a collapsible section
   */
  setupCollapsible: (
    trigger: HTMLElement,
    content: HTMLElement,
    isExpanded: boolean = false
  ): (() => void) => {
    const id = `collapsible-${Math.random().toString(36).substr(2, 9)}`;
    
    trigger.setAttribute('aria-controls', id);
    trigger.setAttribute('aria-expanded', isExpanded.toString());
    content.setAttribute('id', id);
    content.setAttribute('aria-hidden', (!isExpanded).toString());
    
    const toggle = () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', (!expanded).toString());
      content.setAttribute('aria-hidden', expanded.toString());
    };
    
    trigger.addEventListener('click', toggle);
    
    return () => {
      trigger.removeEventListener('click', toggle);
    };
  }
};

/**
 * Keyboard navigation utilities
 */
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation for menu items
   */
  handleArrowKeys: (
    container: HTMLElement,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(
        container.querySelectorAll('[role="menuitem"], [role="option"], button, a')
      ) as HTMLElement[];
      
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      
      if (currentIndex === -1) return;
      
      let nextIndex = currentIndex;
      
      if (orientation === 'vertical') {
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowUp') {
          nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        }
      } else {
        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        }
      }
      
      if (nextIndex !== currentIndex) {
        e.preventDefault();
        items[nextIndex].focus();
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },

  /**
   * Handle escape key to close modals/dropdowns
   */
  handleEscape: (callback: () => void): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }
};

/**
 * Color contrast utilities
 */
export const colorContrast = {
  /**
   * Calculate relative luminance of a color
   */
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const parseColor = (color: string): [number, number, number] => {
      const hex = color.replace('#', '');
      return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
      ];
    };
    
    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);
    
    const l1 = colorContrast.getLuminance(r1, g1, b1);
    const l2 = colorContrast.getLuminance(r2, g2, b2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },

  /**
   * Check if contrast ratio meets WCAG AA standards
   */
  meetsWCAGAA: (foreground: string, background: string): boolean => {
    const ratio = colorContrast.getContrastRatio(foreground, background);
    return ratio >= 4.5; // WCAG AA standard for normal text
  }
};

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Hide element from screen readers
   */
  hideFromScreenReader: (element: HTMLElement): void => {
    element.setAttribute('aria-hidden', 'true');
  },

  /**
   * Show element to screen readers
   */
  showToScreenReader: (element: HTMLElement): void => {
    element.removeAttribute('aria-hidden');
  },

  /**
   * Create screen reader only text
   */
  createScreenReaderText: (text: string): HTMLElement => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  }
};

/**
 * Initialize accessibility features
 */
export const initializeAccessibility = (): void => {
  // Add screen reader only class to CSS if not present
  if (!document.querySelector('style[data-accessibility]')) {
    const style = document.createElement('style');
    style.setAttribute('data-accessibility', 'true');
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      .focus-visible:focus {
        outline: 2px solid #1e40af;
        outline-offset: 2px;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #1e40af;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
  }
};