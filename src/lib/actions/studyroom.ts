'use server';

import fetchExtended from '@/utils/fetchExtended';
import encryptPassword from '@/utils/encryptPassword';
import { Studyroom } from '../definitions';

const adminApiKey = encryptPassword(process.env.ADMIN_API_KEY!.toString());

export default async function getStudyrooms() {
  const {
    body: { studyrooms },
  } = await fetchExtended<Studyroom>('/v1/studyroom/info/all', {
    headers: {
      'admin-api-key': adminApiKey,
    },
    cache: 'force-cache',
    next: {
      tags: ['studyrooms'],
    },
  });

  return studyrooms;
}
