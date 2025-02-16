import returnFetch, { ReturnFetch } from 'return-fetch';
import returnFetchJson from 'return-fetch-json';
import encryptPassword from './encryptPassword';

const API_KEY = process.env.ADMIN_API_KEY || 'default_key';

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status === 500) {
          const msg = JSON.parse(await response.text()).message;
          console.error('500 에러 발생:', msg);
          throw new Error(msg);
        }
        if (response.status === 401) {
          throw new Error('인증 오류: 로그인 상태를 확인하세요.');
        }
        if (response.status === 429) {
          throw new Error('Too Many Requests');
        }
        if (response.status === 502) {
          const msg = JSON.parse(await response.text()).message;
          console.error('502 에러 발생:', msg);
          throw new Error(msg);
        }
        if (response.status >= 400) {
          const msg = JSON.parse(await response.text()).message;
          throw new Error(msg);
        }

        return response;
      },
    },
  });

const returnFetchRetry: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response, requestArgs, fetch) => {
        if (response.status > 500) {
          return fetch(...requestArgs);
        }
        if (response.status === 401) {
          throw new Error('로그인 오류');
        }
        if (response.status >= 400) {
          return fetch(...requestArgs);
        }
        return response;
      },
    },
  });

const fetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
});

const retryFetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchRetry({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  }),
});

const encryptedKey = encryptPassword(API_KEY);

const adminFetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'admin-api-key':`${encryptedKey}`,
    },
  }),
});

export { fetchExtended, retryFetchExtended, adminFetchExtended };
