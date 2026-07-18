import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

// TODO: replace with real dashboard analytics (open cases, recent activity, alerts, etc.)
export function Dashboard() {
  return (
    <PlaceholderPage
      title="Dashboard"
      description="A high-level overview for chaptering officers."
      upcoming={[
        'Summary metrics (open cases, pending reviews, recent activity)',
        'Notifications and alerts',
        'Quick links to assigned cases',
      ]}
    />
  );
}
