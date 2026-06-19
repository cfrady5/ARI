/**
 * Partner / trust strip entries for the hero marquee.
 *
 * `logo` is the filename of an all-white partner logo placed at
 * `public/brand/partners/<logo>`. Until that file exists, the marquee shows
 * the partner name as text (graceful fallback). Add the white PNG/SVG logos
 * to that folder to switch each item to artwork — no code change needed.
 */

export type Partner = {
  name: string;
  logo: string; // file under public/brand/partners/
};

export const PARTNERS: Partner[] = [
  { name: "DARPAConnect", logo: "darpaconnect.png" },
  { name: "Platform One / Marketplace One", logo: "platform-one.png" },
  { name: "Heartland BioWorks", logo: "heartland-bioworks.png" },
  { name: "DoW SciTechCONNECT", logo: "scitechconnect.png" },
  { name: "Silicon Crossroads", logo: "silicon-crossroads.png" },
  { name: "Tradewinds", logo: "tradewinds.png" },
  { name: "Indiana Research Consortium", logo: "indiana-research-consortium.png" },
];
