'use client';

import { StudyroomDetail } from '@/lib/definitions';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dynamic from 'next/dynamic';

function AdminTable({ studyrooms }: { studyrooms: StudyroomDetail[] }) {
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
      title: '마지막 수정일',
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
      title: '작업',
      dataIndex: 'action',
      key: 'action',
      className: 'text-center w-64',
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

export default dynamic(() => Promise.resolve(AdminTable), {
  ssr: false,
  loading: () => <span className="font-bold">로딩중...</span>,
});
