import type { IconType } from "react-icons";
import {
  HiOutlineBuildingOffice2,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineTruck,
  HiOutlineBeaker,
} from "react-icons/hi2";

export type Service = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  Icon: IconType;
  /** Marks the offer we most want quoted. Drives the single highlighted card —
   *  one visual priority per grid, never two. */
  featured?: boolean;
};

/**
 * Six services: enough to signal full-service capability, few enough to scan
 * in one pass. Each summary leads with the outcome the buyer is accountable
 * for (audit scores, complaint volume, downtime), not with the activity.
 */
export const SERVICES: Service[] = [
  {
    id: "janitorial",
    title: "Recurring Janitorial",
    summary:
      "Nightly, weekly or custom-frequency cleaning run against a written scope your team signs off on — so “was it done?” stops being a question.",
    bullets: ["Scope-verified checklists", "Dedicated site supervisor", "Nightly completion log"],
    Icon: HiOutlineBuildingOffice2,
    featured: true,
  },
  {
    id: "disinfection",
    title: "Disinfection & Infection Control",
    summary:
      "EPA-registered, dwell-time-correct disinfection of touchpoints and shared surfaces, documented for your infection-control file.",
    bullets: ["EPA List N products", "Dwell-time compliance", "Colour-coded cloth protocol"],
    Icon: HiOutlineShieldCheck,
  },
  {
    id: "floor-care",
    title: "Hard Floor & Carpet Care",
    summary:
      "Strip, seal, burnish and hot-water extraction on a planned cycle that protects the asset instead of reacting once it already looks tired.",
    bullets: ["Scheduled restoration cycle", "Low-moisture extraction", "Slip-resistance maintained"],
    Icon: HiOutlineSparkles,
  },
  {
    id: "specialty",
    title: "Specialty & High-Access",
    summary:
      "Interior glass, high dusting, light fixtures and hard-to-reach surfaces handled on a rotation so they never become a visible problem.",
    bullets: ["Interior window & glass", "High dusting rotation", "Post-event resets"],
    Icon: HiOutlineSquares2X2,
  },
  {
    id: "industrial",
    title: "Warehouse & Industrial",
    summary:
      "Ride-on scrubbing, dock and dust control built around your production schedule, with crews briefed on your site safety rules.",
    bullets: ["Ride-on scrubbing", "Dock & bay degreasing", "Site-specific safety briefing"],
    Icon: HiOutlineTruck,
  },
  {
    id: "supplies",
    title: "Consumables & Restroom Program",
    summary:
      "Managed paper, soap and liner inventory with par-level restocking, so nobody on your staff is chasing a supply closet again.",
    bullets: ["Par-level restocking", "Touch-free dispenser fit-out", "Consolidated monthly invoice"],
    Icon: HiOutlineBeaker,
  },
];
