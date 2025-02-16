import StudyroomTable from '@/components/studyroom/studyroomTable';
import getStudyrooms from '@/lib/actions/studyroom';

export default async function StudyroomDashBoard() {
  const studyrooms = await getStudyrooms();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">스터디룸 관리</h1>
      <div className="rounded-lg bg-white p-4 shadow">
        <StudyroomTable studyrooms={studyrooms} />
      </div>
    </div>
  );
}
