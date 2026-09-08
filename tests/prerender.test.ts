import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderStaticResume } from "../src/prerender.ts";

const getProfile = () =>
  JSON.parse(readFileSync(new URL("../public/data/profile.json", import.meta.url), "utf8"));

test("the response contains all resume sections before JavaScript runs", () => {
  const profile = getProfile();
  const output = renderStaticResume(profile);
  for (const text of [
    profile.intro.name,
    "Technologies and Languages",
    "Education",
    "Work Experience",
    "Side Projects",
    "Interests",
    "Original template by",
  ]) {
    assert.ok(output.includes(text), text);
  }
  assert.equal((output.match(/<main /g) ?? []).length, 1);
  assert.equal((output.match(/<header /g) ?? []).length, 1);
  assert.ok(!output.includes("<resume-intro"));
  assert.ok(!output.includes("<resume-work"));
});

test("Lit escapes profile text and quoted attributes", () => {
  const profile = getProfile();
  profile.intro.summary = 'Uses <dialog> & <template> "examples"';
  profile.resumeUrl.sourceLink = 'https://example.test/?a=1&b="two"';
  const output = renderStaticResume(profile);
  assert.ok(output.includes("&lt;dialog&gt;"));
  assert.ok(output.includes("&lt;template&gt;"));
  assert.ok(output.includes("&amp;b=&quot;two&quot;"));
  assert.ok(!output.includes("<dialog>"));
  assert.ok(!output.includes("&amp;amp;"));
});

test("initially hidden projects retain their print state in static HTML", () => {
  const profile = getProfile();
  profile.projects = [
    { name: "Hidden project", details: "Example", url: "example.test", hide: true },
  ];
  assert.match(renderStaticResume(profile), /<resume-hideable\s+hide[\s>]/);
});
