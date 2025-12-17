export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Use in your components:
import { API_BASE_URL } from './config';

const response = await fetch(`${API_BASE_URL}/api/chat`, {
});
