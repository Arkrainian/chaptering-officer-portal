import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

// TODO: replace with real account/org settings once auth is wired up
export function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Account and organization preferences."
      upcoming={[
        'Profile and notification preferences',
        'Organization-level configuration',
        'Audit log and security settings',
      ]}
    />
  );
}
