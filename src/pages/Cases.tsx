import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

// TODO: replace with real case management (list, filter, detail view, status workflow)
export function Cases() {
  return (
    <PlaceholderPage
      title="Cases"
      description="Manage chaptering cases and their status."
      upcoming={[
        'Case list with search and filtering',
        'Case detail view with workflow status',
        'File uploads and audit log per case',
      ]}
    />
  );
}
