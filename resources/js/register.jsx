import { createRoot } from 'react-dom/client';
import RegisterForm from './RegisterForm';

const container = document.getElementById('register-root');

if (container) {
    createRoot(container).render(<RegisterForm />);
}
