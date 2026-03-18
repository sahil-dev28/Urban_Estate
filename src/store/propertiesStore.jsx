import { create } from "zustand";

export const usePropertiesStore = create((set) => ({
  properties: [],
  setProperties: (properties) => set({ properties }),
  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),
  removeProperty: (propertyId) =>
    set((state) => ({
      properties: state.properties.filter(
        (property) => property.id !== propertyId
      ),
    })),
  updateProperty: (updatedProperty) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      ),
    })),
  clearProperties: () => set({ properties: [] }),
}));
