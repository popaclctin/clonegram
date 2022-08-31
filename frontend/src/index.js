import React from 'react';
import { createRoot } from 'react-dom/client';
import Hello from './Hello';

const root = createRoot(document.getElementById('root'));
root.render(<Hello />);
