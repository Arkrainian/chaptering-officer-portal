import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

// TODO: replace with real officer directory backed by an `officers` table
export function Officers() {
  return (
    <PlaceholderPage
      title="Officers"
      description="Directory of chaptering officers and their roles."
      upcoming={[
        'Officer directory with contact details',
        'Role-based permissions per officer',
        'Assignment history',
      ]}
    />
  );
}
