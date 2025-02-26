'use client';

import { patchStudyroom } from '@/lib/actions/studyroom';
import { StudyroomDetail } from '@/lib/definitions';
import { Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dynamic from 'next/dynamic';
import { useState } from 'react';

function StudyRoomTable({ studyrooms: initialStudyrooms }: { studyrooms: StudyroomDetail[] }) {
  const [studyrooms, setStudyrooms] = useState(initialStudyrooms);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleToggle = async (id: number, checked: boolean) => {
    setLoadingId(id);
    try {
      setStudyrooms((prev) =>
        prev.map((room) => (room.id === id ? { ...room, isActive: checked } : room)),
      );
      await patchStudyroom(id, checked);
    } catch (error) {
      setStudyrooms((prev) =>
        prev.map((room) => (room.id === id ? { ...room, isActive: !checked } : room)),
      );
      message.error('상태 업데이트에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  const columns: ColumnsType<StudyroomDetail> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'w-32',
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '위치',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '마지막 업데이트',
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      className: 'w-64',
      render(value: string) {
        const date = new Date(value);
        return (
          <span className="text-gray-600">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      title: '활성화',
      dataIndex: 'action',
      key: 'action',
      className: 'text-center w-64',
      render(value, record: StudyroomDetail) {
        return (
          <Switch
            checked={record.isActive}
            loading={loadingId === record.id}
            disabled={loadingId !== null}
            onClick={(checked) => handleToggle(record.id, checked)}
          />
        );
      },
    },
  ];

  return (
    <Table
      dataSource={studyrooms}
      columns={columns}
      rowKey="id"
      size="middle"
      tableLayout="fixed"
      bordered
      className="w-full"
      scroll={{ x: 800 }}
      pagination={{
        pageSize: 10,
        position: ['bottomRight'],
        hideOnSinglePage: true,
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(StudyRoomTable), {
  ssr: false,
  loading: () => <span className="font-bold">로딩중...</span>,
});
