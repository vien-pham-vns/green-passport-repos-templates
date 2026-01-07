import { create } from 'store';
import { FeatureFlags } from 'types/common';

interface Store {
  flags: FeatureFlags | null;
  setFlags: (flags: FeatureFlags) => void;
}

// Create the store immediately with null initial state
const useFeatureFlagsStore = create<Store>((set) => ({
  flags: null,
  setFlags: (flags) => set({ flags }),
}));

const useFeatureFlags = () => {
  const flags = useFeatureFlagsStore((state) => state.flags);
  return flags;
};

export { useFeatureFlagsStore, useFeatureFlags };
