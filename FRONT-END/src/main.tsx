import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CartProvider } from './context/CartContext';
import { LikedProvider } from './context/LikedContext';
import { PlayerProvider } from './context/PlayerContext';
import './index.css'

createRoot(document.getElementById("root")!).render(
	<PlayerProvider>
		<CartProvider>
			<LikedProvider>
				<App />
			</LikedProvider>
		</CartProvider>
	</PlayerProvider>
);
