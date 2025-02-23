import CrawlerInfo from '@/components/studyroom/crawlerInfo';
import StudyroomTable from '@/components/studyroom/studyroomTable';
import { getCrawler } from '@/lib/actions/crawler';
import { getStudyrooms } from '@/lib/actions/studyroom';

export default async function StudyroomDashBoard() {
  const studyrooms = await getStudyrooms();
  const crawler = await getCrawler();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">스터디룸 관리</h1>
      <CrawlerInfo crawler={crawler} />
      <div className="rounded-lg bg-white p-4 shadow">
        <StudyroomTable studyrooms={studyrooms} />
      </div>
    </div>
  );
}
