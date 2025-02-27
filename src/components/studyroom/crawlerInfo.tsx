'use client';

import { useRef, useTransition } from 'react';
import { Button, Input, InputRef, message, Popconfirm } from 'antd';
import { activateCrawler, deactivateCrawler, changeCronTime } from '@/lib/actions/crawler';
import { Crawler } from '@/lib/definitions';

export default function CrawlerInfo({ crawler }: { crawler: Crawler }) {
  const { isRunning, lastFiredAt, cronTime } = crawler;
  const cronTimeRef = useRef<InputRef>(null);
  const [isPending, startTransition] = useTransition();

  const toggleCrawler = async () => {
    startTransition(async () => {
      try {
        if (isRunning) {
          await deactivateCrawler();
          message.success('크롤러가 비활성화되었습니다.');
        } else {
          await activateCrawler();
          message.success('크롤러가 활성화되었습니다.');
        }
      } catch (error) {
        message.error('요청을 처리하는 중 오류가 발생했습니다.');
      }
    });
  };

  const updateCronTime = async () => {
    startTransition(async () => {
      try {
        const newCronTime = cronTimeRef.current?.input?.value;
        if (!newCronTime) {
          message.error('크론 설정을 입력하세요.');
          return;
        }
        await changeCronTime(newCronTime);
        message.success('크론 설정이 업데이트되었습니다.');
      } catch (error) {
        message.error('크론 설정 업데이트 실패! 입력값을 확인하거나 서버 관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">크롤러 상태</h2>
        <div className="mb-4 flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`} />
          <p className="text-lg font-medium">{isRunning ? '실행 중' : '중지됨'}</p>
        </div>
        <p className="text-sm text-gray-600">
          - 마지막 실행: {new Date(lastFiredAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
        </p>
        <p className="text-sm text-gray-600">- Cron Time 설정: {cronTime}</p>

        <Popconfirm
          title="주의"
          description="활성화 여부를 변경하시겠습니까?"
          onConfirm={toggleCrawler}
          okText="예"
          cancelText="아니오"
        >
          <Button type="primary" danger={isRunning} loading={isPending} className="mt-4 w-full">
            {isRunning ? '비활성화' : '활성화'}
          </Button>
        </Popconfirm>
      </div>

      <div className="flex flex-col justify-between rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Cron Time 변경</h2>
        <Input
          defaultValue={cronTime}
          ref={cronTimeRef}
          placeholder="예: */5 * * * * *"
          className="mb-3"
        />
        <Popconfirm
          title="주의"
          description={
            <>
              Cron Time을 변경하시겠습니까? <br />
              정확한 값을 입력하셨는지 다시 한번 확인해주세요!!!
            </>
          }
          onConfirm={updateCronTime}
          okText="예"
          cancelText="아니오"
        >
          <Button type="primary" loading={isPending} className="w-full">
            적용
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
