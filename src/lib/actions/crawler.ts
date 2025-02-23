'use server';

import { adminFetchExtended } from '@/utils/fetchExtended';
import { unstable_noStore } from 'next/cache';
import { Crawler } from '../definitions';

export async function getCrawler() {
  unstable_noStore();
  const { body: result } = await adminFetchExtended<Crawler>('/v1/batch/studyroom');
  return result;
}

export async function activateCrawler() {
  await adminFetchExtended('/v1/batch/studyroom/activate', {
    method: 'POST',
  });
}

export async function deactivateCrawler() {
  await adminFetchExtended('/v1/batch/studyroom/deactivate', {
    method: 'POST',
  });
}

export async function activateCrawlerHealthCheck() {
  await adminFetchExtended('/v1/batch/studyroom/health-check/activate', {
    method: 'POST',
  });
}

export async function deactivateCrawlerHealthCheck() {
  await adminFetchExtended('/v1/batch/studyroom/health-check/deactivate', {
    method: 'POST',
  });
}

export async function changeCronTime(cronTime: string) {
  await adminFetchExtended('/v1/batch/studyroom/cron-time', {
    method: 'POST',
    body: { cronTime },
  });
}
