import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';

const SITE = 'https://darenprince.netlify.app';

function curlStatus(url: string): number {
  const output = execSync(`curl -s -o /dev/null -w "%{http_code}" ${url}`, {
    encoding: 'utf8',
  });
  return Number(output.trim());
}

describe('netlify rules', () => {
  it('serves the homepage', () => {
    const status = curlStatus(SITE);
    expect(status).toBe(200);
  });

  it('returns 404 for missing paths', () => {
    const status = curlStatus(`${SITE}/__missing-test`);
    expect(status).toBe(404);
  });
});
