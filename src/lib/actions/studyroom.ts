'use server';

import { adminFetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';
import { Studyroom } from '../definitions';

export async function getStudyrooms() {
  const {
    body: { studyrooms },
  } = await adminFetchExtended<Studyroom>('/v1/studyroom/info/all', {
    cache: 'force-cache',
    next: {
      tags: ['studyrooms'],
    },
  });

  return studyrooms;
}

export async function patchStudyroom(id: number, isActive: boolean) {
  await adminFetchExtended(`/v1/studyroom/info/${id}`, {
    method: 'PATCH',
    body: {
      isActive,
    },
  });
  revalidateTag('studyrooms');
}
