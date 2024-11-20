import DiscoveryCommunities from "@/components/DiscoveryCommunities";
import { Header } from "@/components/Header";
import { getCommunities } from "../actions/communities";

export default async function Home() {
  const communities = await getCommunities();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <DiscoveryCommunities communities={communities} />
    </div>
  );
}
