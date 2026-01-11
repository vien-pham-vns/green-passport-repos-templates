import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => {
  // Initialize from sessionStorage if available (client-side)
  // This will be undefined on server, defaulting to true
  const stored =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('sidebarOpen') : null;
  const initialIsOpen = stored !== null ? stored === 'true' : true;

  return {
    isOpen: initialIsOpen,
    setIsOpen: (isOpen) => {
      set({ isOpen });
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('sidebarOpen', String(isOpen));
      }
    },
    toggleSidebar: () => {
      set((state) => {
        const newIsOpen = !state.isOpen;
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('sidebarOpen', String(newIsOpen));
        }
        return { isOpen: newIsOpen };
      });
    },
  };
});

export default useSidebarStore;
