import StudyroomTable from '@/components/studyroom/studyroomTable';
import { getCrawler } from '@/lib/actions/crawler';
import { getStudyrooms } from '@/lib/actions/studyroom';

export default async function StudyroomDashBoard() {
  const studyrooms = await getStudyrooms();
  const crawler = await getCrawler();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">스터디룸 관리</h1>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">크롤러 상태</h2>
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                crawler.isRunning ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <p className="text-lg font-medium">{crawler.isRunning ? '실행 중' : '중지됨'}</p>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            마지막 실행: {new Date(crawler.lastFiredAt).toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-600">cron-time 설정값: {crawler.cronTime}</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <StudyroomTable studyrooms={studyrooms} />
      </div>
    </div>
  );
}
