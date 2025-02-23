'use server';

import { adminFetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';
import { Crawler } from '../definitions';

export async function getCrawler() {
  const { body: result } = await adminFetchExtended<Crawler>('/v1/batch/studyroom', {
    cache: 'force-cache',
    next: {
      tags: ['crawler'],
    },
  });

  return result;
}

export async function activateCrawler() {
  await adminFetchExtended('/v1/batch/studyroom/activate', {
    method: 'POST',
  });
  revalidateTag('crawler');
}

export async function deactivateCrawler() {
  await adminFetchExtended('/v1/batch/studyroom/deactivate', {
    method: 'POST',
  });
  revalidateTag('crawler');
}

export async function activateCrawlerHealthCheck() {
  await adminFetchExtended('/v1/batch/studyroom/health-check/activate', {
    method: 'POST',
  });
  revalidateTag('crawler');
}

export async function deactivateCrawlerHealthCheck() {
  await adminFetchExtended('/v1/batch/studyroom/health-check/deactivate', {
    method: 'POST',
  });
  revalidateTag('crawler');
}

export async function changeCronTime(cronTime: string) {
  await adminFetchExtended('/v1/batch/studyroom/cron-time', {
    method: 'POST',
    body: { cronTime },
  });
  revalidateTag('crawler');
}
