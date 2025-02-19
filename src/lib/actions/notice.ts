'use server';

import { revalidateTag } from 'next/cache';
import { fetchExtended, adminFetchExtended} from '@/utils/fetchExtended';
import { Notice } from '@/lib/definitions';

export async function getNotices() {
  const { body: notices } = await fetchExtended<Notice[]>('/v1/notice', {
    cache: 'force-cache',
    next: {
      tags: ['notices'],
    },
  });

  return notices;
}

export async function handleDelete(id: number) {
  await adminFetchExtended(`/v1/notice/${id}`, {
    method: 'DELETE',
  });
  revalidateTag('notices');
  revalidateTag(`notice-${id}`);
}

export async function handleCreate(data: Pick<Notice, 'title' | 'content'>) {
  await adminFetchExtended('/v1/notice', {
    method: 'POST',
    body: data,
  });
  revalidateTag('notices');
}

export async function handleEdit(id: number, data: Pick<Notice, 'title' | 'content'>) {
  await adminFetchExtended(`/v1/notice/${id}`, {
    method: 'PUT',
    body: data,
  });
  revalidateTag('notices');
  revalidateTag(`notice-${id}`);
}

export async function getNoticeById(id: number): Promise<Pick<Notice, 'title' | 'content'>> {
  const { body: notice } = await fetchExtended<Pick<Notice, 'title' | 'content'>>(
    `/v1/notice/${id}`,
    {
      method: 'GET',
      cache: 'force-cache',
      next: {
        tags: [`notice-${id}`],
      },
    },
  );
  return notice;
}

export async function handlePopup(id: number) {
  const response = await adminFetchExtended(`/v1/notice/popup/${id}`, {
    method: 'POST',
  });
  return {
    success: response.status === 201,
  };
}