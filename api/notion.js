export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const TOKEN = process.env.NOTION_TOKEN;
  const { endpoint } = req.query;

  if (!endpoint) return res.status(400).json({ error: "endpoint required" });

  const notionRes = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method: req.method,
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await notionRes.json();
  return res.status(notionRes.status).json(data);
}
