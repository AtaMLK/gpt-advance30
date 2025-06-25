/* import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}));
 */

import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CardState {
  items: Product[];
  addItem: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CardState>((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const found = state.items.find((p) => p.id === product.id);
      if (found)
        return {
          items: state.items.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          ),
        };
      return { items: [...state.items, product] };
    }),

  increaseQty: (id) => {
    set((state) => ({
      items: state.items.map((item) =>
        id === item.id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },
  decreaseQty: (id) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          id === item.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },
  removeCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}));
