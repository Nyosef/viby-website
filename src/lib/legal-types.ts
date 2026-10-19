export type LegalDocumentKey = "terms" | "privacy";
export type LegalBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "list"; items: string[]; ordered?: boolean };
export type LegalDocument = {
  title: string;
  updated: string;
  version: string;
  effectiveDate: string;
  description: string;
  sections: Array<{ id: string; title: string; blocks: LegalBlock[] }>;
};
