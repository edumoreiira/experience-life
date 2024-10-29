export interface Toast {
    id?: number;
    title?: string;
    message: string;
    variant: 'default' | 'outline' | 'success' | 'danger' | 'warning' | 'info';
    duration?: number;
    isVisible?: boolean;
}