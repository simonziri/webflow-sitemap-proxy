const urlsToRemove: string[] = [
    "/competitor-new/**",
    "/de/competitor-new/**",
    "/partner/**",
    "/de/partner/**",
    "/info/**",
    "/de/info/**",
    "/de/walkthrough/**",
    "/solutions/**",
    "/de/solutions/**",
    "/best/**",
    "/de/best/**",
    "/thank-you",
    "/thank-you-demo",
    "/thank-you-webinar",
    "/thank-you-customer",
    "/event-thank-you",
    "/event-thank-you-communitymember",
    "/meetings-thank-you",
    "/ondemand-thank-you",
    "/thanks-for-your-interest-in-leapsome",
    "/community-application-received",
    "/community-application-received-tour",
    "/asset-download",
    "/asset-download-tour",
    "/de/thank-you",
    "/de/thank-you-demo",
    "/de/thank-you-webinar",
    "/de/thank-you-customer",
    "/de/event-thank-you",
    "/de/event-thank-you-communitymember",
    "/de/meetings-thank-you",
    "/de/ondemand-thank-you",
    "/de/thanks-for-your-interest-in-leapsome",
    "/de/community-application-received",
    "/de/community-application-received-tour",
    "/de/asset-download",
    "/de/asset-download-tour",
    "/leapsome-hris-software",
    "/leapsome-hris-software-v1",
    "/leapsome-hris-software-na-v1",
    "/lp-paid-meta-leapsome-hr-software-2",
    "/meta-leapsome-hr-software-v1",
    "/mt-leapsome-hris-na-v1",
    "/request-a-demo-outbound",
    "/hris-migration-support",
    "/partner-network",
    "/tradeshows/**",
    "/legal-redirect/**",
    "/de/leapsome-hris-software",
    "/de/leapsome-hris-software-v1",
    "/de/leapsome-hris-software-na-v1",
    "/de/lp-paid-meta-leapsome-hr-software-2",
    "/de/meta-leapsome-hr-software-v1",
    "/de/mt-leapsome-hris-na-v1",
    "/de/request-a-demo-outbound",
    "/de/hris-migration-support",
    "/de/partner-network",
    "/de/tradeshows/**",
    "/search",
    "/sandbox",
    "/dev/**",
    "/logo-marquee-test",
    "/chili-piper-test",
    "/de/search",
    "/de/sandbox",
    "/de/chili-piper-test",
    "/de/logo-marquee-test",
    "/blog-categories/comparisons",
    "/de/blog-kategorien/comparisons",
];

const urlsToAdd: string[] = [];

const newSitemapDomain: string = "https://www.leapsome.com";

export async function getUrlsToRemove(): Promise<string[]> {
    const origin = process.env.ORIGIN_DOMAIN || '';
    if (!origin) {
        throw new Error('ORIGIN_DOMAIN environment variable is not set.');
    }
    return urlsToRemove.map(url => `${origin}${url}`);
}

export async function getUrlsToAdd(): Promise<string[]> {
    const origin = await getOriginDomain();
    return urlsToAdd.map(url => `${url.startsWith("http") ? "" : origin}${url}`);
}

export async function getDomainToReplace(): Promise<string> {
    return newSitemapDomain;
}

export async function getSourceSitemapUrl(): Promise<string> {
    const url = process.env.SOURCE_SITEMAP_URL ||
                (process.env.ORIGIN_DOMAIN ? `${process.env.ORIGIN_DOMAIN}/sitemap.xml` : null);
    if (!url) {
        throw new Error('Neither SOURCE_SITEMAP_URL nor ORIGIN_DOMAIN is set.');
    }
    return url;
}

export async function getOriginDomain(): Promise<string> {
    const origin = process.env.ORIGIN_DOMAIN;
    if (!origin) {
        console.warn('ORIGIN_DOMAIN environment variable is not set.');
        return '';
    }
    return origin;
}

export async function getSitemapLimit(): Promise<number> {
    const raw = process.env.SITEMAP_LIMIT;
    if (!raw) return 45000;
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 45000;
}