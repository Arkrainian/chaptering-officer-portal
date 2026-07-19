import { PageHeading } from '@/components/ui/PageHeading';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeading title={title} description={description} />
    </div>
  );
}
