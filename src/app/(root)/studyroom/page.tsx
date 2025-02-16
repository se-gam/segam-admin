import getStudyrooms from '@/lib/actions/studyroom';

export default async function StudyroomDashBoard() {
  const studyrooms = await getStudyrooms();
  // TO_DO : 스터디룸 데이터를 이용한 antd table 생성
  console.log(studyrooms);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">스터디룸 관리</h1>
      <div className="rounded-lg bg-white p-4 shadow">null</div>
    </div>
  );
}
