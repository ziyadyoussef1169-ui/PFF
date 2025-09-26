import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LikedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  onSale: boolean;
  featured: boolean;
}

interface LikedContextType {
  likedProducts: LikedProduct[];
  addToLiked: (product: LikedProduct) => void;
  removeFromLiked: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  likedCount: number;
}

const LikedContext = createContext<LikedContextType | undefined>(undefined);

export const LikedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);

  const addToLiked = (product: LikedProduct) => {
    setLikedProducts(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromLiked = (productId: string) => {
    setLikedProducts(prev => prev.filter(item => item.id !== productId));
  };

  const isLiked = (productId: string) => {
    return likedProducts.some(item => item.id === productId);
  };

  const likedCount = likedProducts.length;

  return (
    <LikedContext.Provider value={{
      likedProducts,
      addToLiked,
      removeFromLiked,
      isLiked,
      likedCount
    }}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (context === undefined) {
    throw new Error('useLiked must be used within a LikedProvider');
  }
  return context;
};
