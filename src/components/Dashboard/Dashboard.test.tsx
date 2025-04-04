import React from 'react';
            import { render, screen } from '@testing-library/react';
            import '@testing-library/jest-dom';
            import Dashboard from './Dashboard';

            test('renders Dashboard component', () => {
            render(<Dashboard />);
            expect(screen.getByText('Dashboard Component')).toBeInTheDocument();
            });