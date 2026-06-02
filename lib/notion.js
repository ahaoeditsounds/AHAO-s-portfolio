// lib/notion.js
// ────────────────────────────────────────────────────────────────
//  Notion API 串接邏輯 (JavaScript 版本)
// ────────────────────────────────────────────────────────────────

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

// ── 基礎 fetch 封裝 ──────────────────────────────────────────────
async function notionFetch(endpoint, options = {}) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("Missing NOTION_TOKEN in environment variables.");

  const res = await fetch(`${NOTION_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Next.js ISR 快取：每 60 秒去跟 Notion 同步一次新作品
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Notion API Error ${res.status}: ${JSON.stringify(error)}`);
  }

  return res.json();
}

// ── 屬性解析小幫手 ─────────────────────────────────────────────
function getText(prop) {
  if (!prop) return "";
  if (prop.type === "title") {
    return prop.title?.map((t) => t.plain_text).join("") ?? "";
  }
  if (prop.type === "rich_text") {
    return prop.rich_text?.map((t) => t.plain_text).join("") ?? "";
  }
  return "";
}

function getUrl(prop) {
  return prop?.url ?? "";
}

function getSelect(prop) {
  return prop?.select?.name ?? "";
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map((s) => s.name) ?? [];
}

function getCheckbox(prop) {
  return prop?.checkbox ?? false;
}

function getDate(prop) {
  return prop?.date?.start ?? "";
}

// 🚀 新增：解析數字欄位，如果沒填就給 999（讓它排到最後面）
function getNumber(prop) {
  return prop?.number ?? 999; 
}

// ── 單筆 Notion 資料轉換為網頁乾淨格式 ────────────────────────────
function parseNotionPage(page) {
  const props = page.properties;
  const category = getSelect(props["Category"]);

  const base = {
    id: page.id,
    title: getText(props["Title"]),
    client: getText(props["Client"]),
    description: getText(props["Description"]),
    featured: getCheckbox(props["Featured"]),
    publishedAt: getDate(props["PublishedAt"]),
    order: getNumber(props["Order"]), // 🚀 抓取剛剛建立的 Order 欄位
  };

  if (category === "video") {
    return {
      ...base,
      category: "video",
      thumbnailUrl: getUrl(props["ThumbnailUrl"]),
      videoUrl: getUrl(props["VideoUrl"]),
      tags: getMultiSelect(props["Tags"]),
    };
  }

  if (category === "audio") {
    return {
      ...base,
      category: "audio",
      audioUrl: getUrl(props["AudioUrl"]),
      videoUrl: getUrl(props["VideoUrl"]),
      thumbnailUrl: getUrl(props["ThumbnailUrl"]),
      duration: getText(props["Duration"]),
      emotions: getMultiSelect(props["Emotions"]),
    };
  }

  return null;
}

// ── 主要供網頁呼叫的 Functions ───────────────────────────────────────────

// 取得所有作品
export async function getAllWorks() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID.");

  const body = {
    // 🚀 修改排序規則：先按 Order (1, 2, 3...)，再按 PublishedAt (最新到最舊)
    sorts: [
      { property: "Order", direction: "ascending" },
      { property: "PublishedAt", direction: "descending" }
    ],
    page_size: 100,
  };

  const data = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data.results.map(parseNotionPage).filter((w) => w !== null);
}

// 只取得影音作品
export async function getVideoWorks() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const body = {
    filter: { property: "Category", select: { equals: "video" } },
    sorts: [
      { property: "Order", direction: "ascending" },
      { property: "PublishedAt", direction: "descending" }
    ],
  };
  const data = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data.results.map(parseNotionPage).filter((w) => w?.category === "video");
}

// 只取得配音作品
export async function getAudioWorks() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const body = {
    filter: { property: "Category", select: { equals: "audio" } },
    sorts: [
      { property: "Order", direction: "ascending" },
      { property: "PublishedAt", direction: "descending" }
    ],
  };
  const data = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data.results.map(parseNotionPage).filter((w) => w?.category === "audio");
}

// 取得首頁精選作品
export async function getFeaturedWorks() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const body = {
    filter: { property: "Featured", checkbox: { equals: true } },
    sorts: [
      { property: "Order", direction: "ascending" },
      { property: "PublishedAt", direction: "descending" }
    ],
  };
  const data = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data.results.map(parseNotionPage).filter((w) => w !== null);
}