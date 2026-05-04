const SOURCES = {
  museumCard: "https://muuseumikaart.ee/uued-naitused-mujal-eestis/",
  noba: "https://noba.ac/et/naitustekaart/",
  nobaAjax:
    "https://noba.ac/wp-admin/admin-ajax.php?action=artGalleryExhibitionsSearch",
  ekm: "https://kunstimuuseum.ekm.ee/avatud-naitused/",
};

const headers = {
  "User-Agent": "Dekadents exhibitions fetcher (+https://dekadents.eu)",
  Accept: "text/html,application/xhtml+xml,application/json",
};

function stripTags(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value = "") {
  const entities = {
    amp: "&",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    nbsp: " ",
  };

  return value.replace(/&(#(\d+)|#x([0-9a-f]+)|[a-z]+);/gi, (match, body) => {
    if (body[0] === "#") {
      const code = body[1]?.toLowerCase() === "x"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }

    return entities[body.toLowerCase()] ?? match;
  });
}

function clean(value = "") {
  return decodeHtml(stripTags(value)).trim();
}

function absolutize(url, base) {
  if (!url) return "";
  try {
    return new URL(decodeHtml(url), base).toString();
  } catch {
    return "";
  }
}

function firstSrcFromSrcset(srcset = "") {
  return srcset.split(",")[0]?.trim().split(/\s+/)[0] ?? "";
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers ?? {}) },
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.text();
}

function parseMuseumCard(html) {
  const items = [];
  const blocks = html.match(/<div class="compact-exhibition-item">[\s\S]*?(?=<div class="compact-exhibition-item">|<\/main>)/g) ?? [];

  for (const block of blocks) {
    const title = clean(block.match(/<p class="[^"]*fw-extrabold[^"]*">([\s\S]*?)<\/p>/)?.[1]);
    if (!title) continue;

    const url = absolutize(block.match(/<a href="([^"]+)" class="item__thumb"/)?.[1], SOURCES.museumCard);
    const image =
      absolutize(block.match(/data-lazy-src="([^"]+)"/)?.[1], SOURCES.museumCard) ||
      absolutize(block.match(/<img[^>]+src="([^"]+)"/)?.[1], SOURCES.museumCard);
    const location = clean(block.match(/<li><a [^>]+>([\s\S]*?)<\/a><\/li>/)?.[1]);
    const endDate = clean(block.match(/<strong>Avatud kuni:<\/strong>\s*([^<]+)/)?.[1]);
    const paragraphs = [...block.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)].map((match) =>
      clean(match[1]),
    );
    const description = paragraphs.find((text) => text && text !== title) ?? "";

    items.push({
      id: `muuseumikaart-${title}-${endDate}`,
      title,
      source: "Muuseumikaart",
      location,
      dateLabel: endDate ? `Avatud kuni ${endDate}` : "",
      description,
      url,
      image,
    });
  }

  return items.slice(0, 18);
}

async function fetchNoba() {
  const params = new URLSearchParams();
  params.set("namespace", "agemas2");
  params.set("lang", "et");
  params.set("language", "et");
  params.set("requestCounter", "1");
  params.set("filter[orderBy]", "");
  params.set("filter[order]", "");
  params.set("filter[uiDateformat]", "d.m.Y");
  params.set("filter[keyword]", "");
  params.append("filter[dateFilter][]", "open");
  params.append("filter[countryCodes][]", "EE");

  const text = await fetchText(SOURCES.nobaAjax, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = JSON.parse(text);

  return (data.resultRows ?? []).slice(0, 18).map((row) => ({
    id: `noba-${row.entityId}`,
    title: row.nameTranslations?.et || row.name,
    source: "NOBA",
    location: row.locationName || row.childLocationName || "",
    dateLabel:
      row.openPeriodStartFormatted && row.openPeriodEndFormatted
        ? `${row.openPeriodStartFormatted} - ${row.openPeriodEndFormatted}`
        : "",
    description: clean(row.introductionTranslations?.et || row.introduction || ""),
    url: row.exhibitionUrl || SOURCES.noba,
    image: row.firstProfileImageUri || row.thumbnailUri || "",
  }));
}

function parseEkm(html) {
  const items = [];
  const blocks = html.match(/<li class="simple-event-grid__item"[\s\S]*?<\/li>/g) ?? [];

  for (const block of blocks) {
    const title = clean(block.match(/<h3 class="no-title-styles card__header-title">([\s\S]*?)<span/)?.[1]);
    if (!title) continue;

    const dateLabel = clean(block.match(/<span class="card__header-date-text"[^>]*>([\s\S]*?)<\/span>/)?.[1]);
    const url = absolutize(block.match(/<a href="([^"]+)"\s+class="card__link"/)?.[1], SOURCES.ekm);
    const location = clean(block.match(/<div class="color-[^"]+"[^>]*>([\s\S]*?)<\/div>/)?.[1]);
    const type = clean(block.match(/<div class="card__header-additional-tag">\s*([\s\S]*?)<\/div>/)?.[1]);
    const image = absolutize(
      firstSrcFromSrcset(block.match(/data-srcset="([^"]+)"/)?.[1]) ||
        block.match(/<img[^>]+data-src="([^"]+)"/)?.[1],
      SOURCES.ekm,
    );
    const caption = clean(block.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1]);

    items.push({
      id: `ekm-${title}-${dateLabel}`,
      title,
      source: "Eesti Kunstimuuseum",
      location,
      dateLabel,
      description: caption || type,
      url,
      image,
    });
  }

  return items.slice(0, 18);
}

export async function handler() {
  const fetchedAt = new Date().toISOString();
  const settled = await Promise.allSettled([
    fetchText(SOURCES.museumCard).then(parseMuseumCard),
    fetchNoba(),
    fetchText(SOURCES.ekm).then(parseEkm),
  ]);

  const errors = [];
  const exhibitions = settled.flatMap((result, index) => {
    if (result.status === "fulfilled") return result.value;

    errors.push({
      source: ["Muuseumikaart", "NOBA", "Eesti Kunstimuuseum"][index],
      message: result.reason?.message ?? "Unknown error",
    });
    return [];
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=900, stale-while-revalidate=3600",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ fetchedAt, exhibitions, errors }),
  };
}
