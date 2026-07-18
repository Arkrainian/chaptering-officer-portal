import { PageHeading } from '@/components/ui/PageHeading';
import { Card } from '@/components/ui/Card';

interface PlaceholderPageProps {
  title: string;
  description: string;
  /** What this section will eventually contain, shown as a bullet list. */
  upcoming: string[];
}

export function PlaceholderPage({ title, description, upcoming }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeading title={title} description={description} />
      <Card>
        <h2 className="text-sm font-semibold text-slate-900">Planned for this section</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
          {upcoming.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
