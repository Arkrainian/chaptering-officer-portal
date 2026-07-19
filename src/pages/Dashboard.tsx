import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

// TODO: replace with real dashboard analytics (open cases, recent activity, alerts, etc.)
export function Dashboard() {
  return (
    <PlaceholderPage
      title="Dashboard"
      description="Everything you need at a glance, right when you log in."
      upcoming={[
        'Summary metrics (open cases, pending reviews, recent activity)',
        'Notifications and alerts',
        'Quick links to assigned cases',
      ]}
    />
  );
}
