import type { IconType } from "react-icons";
import {
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineBuildingLibrary,
  HiOutlineKey,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export type Industry = {
  id: string;
  name: string;
  /** The one thing that vertical is actually judged on. Naming their specific
   *  pain is what separates "we clean everything" from "we clean *yours*". */
  pain: string;
  proof: string;
  Icon: IconType;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "offices",
    name: "Corporate Offices",
    pain: "Tenant complaints land on your desk, not ours.",
    proof: "Nightly logs + named site supervisor",
    Icon: HiOutlineBriefcase,
  },
  {
    id: "medical",
    name: "Medical Facilities",
    pain: "Every surface has to survive an infection-control audit.",
    proof: "Bloodborne-pathogen trained crews",
    Icon: HiOutlineHeart,
  },
  {
    id: "schools",
    name: "Schools & Campuses",
    pain: "Absence spikes when shared surfaces slip.",
    proof: "Term-schedule deep-clean cycles",
    Icon: HiOutlineAcademicCap,
  },
  {
    id: "retail",
    name: "Retail & Hospitality",
    pain: "Customers read cleanliness as competence.",
    proof: "Pre-open, front-of-house standard",
    Icon: HiOutlineShoppingBag,
  },
  {
    id: "warehouse",
    name: "Warehouse & Distribution",
    pain: "Dust and dock grime become a safety finding.",
    proof: "Ride-on scrubbing around your shifts",
    Icon: HiOutlineCube,
  },
  {
    id: "government",
    name: "Government Buildings",
    pain: "Procurement needs paperwork, not promises.",
    proof: "Bid-ready insurance & compliance file",
    Icon: HiOutlineBuildingLibrary,
  },
  {
    id: "property",
    name: "Property Management",
    pain: "One vendor, many buildings, one invoice.",
    proof: "Multi-site portfolio reporting",
    Icon: HiOutlineKey,
  },
  {
    id: "industrial",
    name: "Industrial Plants",
    pain: "Cleaning cannot cost you production hours.",
    proof: "Scheduled around line downtime",
    Icon: HiOutlineCog6Tooth,
  },
];
