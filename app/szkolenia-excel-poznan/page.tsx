import LocalHubPage, { localHubMetadata } from '@/components/LocalHubPage';
import { getHubBySlug } from '@/data/localHubs';

const hub = getHubBySlug('szkolenia-excel-poznan')!;

export const metadata = localHubMetadata(hub);

export default function Page() {
  return <LocalHubPage hub={hub} />;
}
