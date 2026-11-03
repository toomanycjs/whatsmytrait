// The twenty three-letter interest codes that the most O*NET occupations
// carry, each with one line on what the combination means and up to five UK
// job titles mapped from O*NET occupations with that exact code, linking to
// National Careers Service profiles.
//
// How the twenty were chosen: O*NET OnLine's browse-by-interests pages
// (https://www.onetonline.org/explore/interests/<Type>/) list every
// occupation with its interest code; the six pages were fetched on
// 3 November 2026 and the three-letter codes counted across the 923
// occupations listed. 413 occupations carry a two-letter code and 20 a
// single letter; those are not counted. Five codes tied for the last two
// places, and the two with UK job profiles to show (CIE and IRS) were taken.
// The counts are not shown on the page: they describe O*NET's occupation
// list, not how common each code is among people.
//
// Every National Careers Service slug below is in the service's own
// explore-careers sitemap (https://nationalcareers.service.gov.uk/explore-careers/sitemap.xml),
// checked 3 November 2026.
import type { UkJob } from './content';

export interface HollandCode {
	code: string;
	/** What the combination describes, in one line. */
	line: string;
	jobs: UkJob[];
}

export const HOLLAND_CODES: HollandCode[] = [
	// Realistic first
	{
		code: 'RCI', line: 'practical work to a procedure, with some technical understanding: operating, maintaining and inspecting.',
		jobs: [
			{ title: 'Construction plant operator', ncs: 'construction-plant-operator', onet: 'Operating Engineers and Other Construction Equipment Operators' },
			{ title: 'Train driver', ncs: 'train-driver', onet: 'Locomotive Engineers' },
			{ title: 'Motor mechanic', ncs: 'motor-mechanic', onet: 'Automotive Service Technicians and Mechanics' },
			{ title: 'Radiographer', ncs: 'radiographer', onet: 'Radiologic Technologists and Technicians' },
			{ title: 'Wind turbine technician', ncs: 'wind-turbine-technician', onet: 'Wind Turbine Service Technicians' },
		],
	},
	{
		code: 'RIC', line: 'engineering and technical work: designing, building and testing things that have to work.',
		jobs: [
			{ title: 'Civil engineer', ncs: 'civil-engineer', onet: 'Civil Engineers' },
			{ title: 'Mechanical engineer', ncs: 'mechanical-engineer', onet: 'Mechanical Engineers' },
			{ title: 'Electrical engineer', ncs: 'electrical-engineer', onet: 'Electrical Engineers' },
			{ title: 'Chemical engineer', ncs: 'chemical-engineer', onet: 'Chemical Engineers' },
			{ title: 'Dental technician', ncs: 'dental-technician', onet: 'Dental Laboratory Technicians' },
		],
	},
	{
		code: 'RCE', line: 'hands-on work with responsibility for people or a vehicle: driving, cooking, policing, flying.',
		jobs: [
			{ title: 'Police officer', ncs: 'police-officer', onet: "Police and Sheriff's Patrol Officers" },
			{ title: 'Chef', ncs: 'chef', onet: 'Cooks, Restaurant' },
			{ title: 'Airline pilot', ncs: 'airline-pilot', onet: 'Airline Pilots, Copilots, and Flight Engineers' },
			{ title: 'Train conductor', ncs: 'train-conductor', onet: 'Railroad Conductors and Yardmasters' },
			{ title: 'Merchant navy deck officer', ncs: 'merchant-navy-deck-officer', onet: 'Captains, Mates, and Pilots of Water Vessels' },
		],
	},
	{
		code: 'RCS', line: 'practical work done for people, one at a time: prisons, salons, buses, operating theatres.',
		jobs: [
			{ title: 'Prison officer', ncs: 'prison-officer', onet: 'Correctional Officers and Jailers' },
			{ title: 'Hairdresser', ncs: 'hairdresser', onet: 'Hairdressers, Hairstylists, and Cosmetologists' },
			{ title: 'Bus or coach driver', ncs: 'bus-or-coach-driver', onet: 'Bus Drivers, Transit and Intercity' },
			{ title: 'Operating department practitioner', ncs: 'operating-department-practitioner', onet: 'Surgical Technologists' },
			{ title: 'Embalmer', ncs: 'embalmer', onet: 'Embalmers' },
		],
	},
	{
		code: 'RAC', line: 'making things by hand to a design: flowers, sound, furniture, cloth, stone.',
		jobs: [
			{ title: 'Florist', ncs: 'florist', onet: 'Floral Designers' },
			{ title: 'Studio sound engineer', ncs: 'studio-sound-engineer', onet: 'Sound Engineering Technicians' },
			{ title: 'Furniture restorer', ncs: 'furniture-restorer', onet: 'Furniture Finishers' },
			{ title: 'Pattern cutter', ncs: 'pattern-cutter', onet: 'Fabric and Apparel Patternmakers' },
			{ title: 'Stonemason', ncs: 'stonemason', onet: 'Stone Cutters and Carvers, Manufacturing' },
		],
	},
	// Investigative first
	{
		code: 'IRC', line: 'laboratory and field science: measuring, analysing and recording.',
		jobs: [
			{ title: 'Chemist', ncs: 'chemist', onet: 'Chemists' },
			{ title: 'Physicist', ncs: 'physicist', onet: 'Physicists' },
			{ title: 'Microbiologist', ncs: 'microbiologist', onet: 'Microbiologists' },
			{ title: 'Meteorologist', ncs: 'meteorologist', onet: 'Atmospheric and Space Scientists' },
			{ title: 'Forensic scientist', ncs: 'forensic-scientist', onet: 'Forensic Science Technicians' },
		],
	},
	{
		code: 'ICR', line: 'technical investigation to a method: networks, biology, transport, safety.',
		jobs: [
			{ title: 'Network engineer', ncs: 'network-engineer', onet: 'Computer Network Architects' },
			{ title: 'Biologist', ncs: 'biologist', onet: 'Biologists' },
			{ title: 'Biotechnologist', ncs: 'biotechnologist', onet: 'Molecular and Cellular Biologists' },
			{ title: 'Transport planner', ncs: 'transport-planner', onet: 'Transportation Planners' },
			{ title: 'Health and safety adviser', ncs: 'health-and-safety-adviser', onet: 'Occupational Health and Safety Specialists' },
		],
	},
	{
		code: 'ISR', line: 'medicine with people and with your hands: eyes, anaesthetics, wards, surgery.',
		jobs: [
			{ title: 'Optometrist', ncs: 'optometrist', onet: 'Optometrists' },
			{ title: 'Anaesthetist', ncs: 'anaesthetist', onet: 'Anesthesiologists' },
			{ title: 'Hospital doctor', ncs: 'hospital-doctor', onet: 'General Internal Medicine Physicians' },
			{ title: 'Surgeon', ncs: 'surgeon', onet: 'Pediatric Surgeons' },
		],
	},
	{
		code: 'IRS', line: 'medicine with your hands first: teeth, bones, feet, eyes.',
		jobs: [
			{ title: 'Dentist', ncs: 'dentist', onet: 'Dentists, General' },
			{ title: 'Surgeon', ncs: 'surgeon', onet: 'Orthopedic Surgeons, Except Pediatric' },
			{ title: 'Podiatrist', ncs: 'podiatrist', onet: 'Podiatrists' },
			{ title: 'Orthoptist', ncs: 'orthoptist', onet: 'Orthoptists' },
			{ title: 'Hospital doctor', ncs: 'hospital-doctor', onet: 'Cardiologists' },
		],
	},
	// Social first
	{
		code: 'SIC', line: 'helping through expertise: speech, health education, teaching, assessment.',
		jobs: [
			{ title: 'Speech and language therapist', ncs: 'speech-and-language-therapist', onet: 'Speech-Language Pathologists' },
			{ title: 'Health promotion specialist', ncs: 'health-promotion-specialist', onet: 'Health Education Specialists' },
			{ title: 'Physician associate', ncs: 'physician-associate', onet: 'Physician Assistants' },
			{ title: 'Higher education lecturer', ncs: 'higher-education-lecturer', onet: 'Mathematical Science Teachers, Postsecondary' },
			{ title: 'Psychologist', ncs: 'psychologist', onet: 'School Psychologists' },
		],
	},
	{
		code: 'SRI', line: 'helping with hands-on care: ambulances, teeth, backs, muscles.',
		jobs: [
			{ title: 'Paramedic', ncs: 'paramedic', onet: 'Paramedics' },
			{ title: 'Emergency care assistant', ncs: 'emergency-care-assistant', onet: 'Emergency Medical Technicians' },
			{ title: 'Dental hygienist', ncs: 'dental-hygienist', onet: 'Dental Hygienists' },
			{ title: 'Chiropractor', ncs: 'chiropractor', onet: 'Chiropractors' },
			{ title: 'Massage therapist', ncs: 'massage-therapist', onet: 'Massage Therapists' },
		],
	},
	// Enterprising first
	{
		code: 'ECS', line: 'managing and selling with people: a hotel, a team, a sales floor, a client list.',
		jobs: [
			{ title: 'Hotel manager', ncs: 'hotel-manager', onet: 'Lodging Managers' },
			{ title: 'Recruitment consultant', ncs: 'recruitment-consultant', onet: 'Human Resources Specialists' },
			{ title: 'Events manager', ncs: 'events-manager', onet: 'Meeting, Convention, and Event Planners' },
			{ title: 'Estate agent', ncs: 'estate-agent', onet: 'Real Estate Sales Agents' },
			{ title: 'Retail manager', ncs: 'retail-manager', onet: 'First-Line Supervisors of Retail Sales Workers' },
		],
	},
	{
		code: 'ECR', line: 'managing practical operations: sites, kitchens, buildings, buying.',
		jobs: [
			{ title: 'Restaurant manager', ncs: 'restaurant-manager', onet: 'Food Service Managers' },
			{ title: 'Retail buyer', ncs: 'retail-buyer', onet: 'Wholesale and Retail Buyers, Except Farm Products' },
			{ title: 'Construction manager', ncs: 'construction-manager', onet: 'Construction Managers' },
			{ title: 'Facilities manager', ncs: 'facilities-manager', onet: 'Facilities Managers' },
			{ title: 'Football referee', ncs: 'football-referee', onet: 'Umpires, Referees, and Other Sports Officials' },
		],
	},
	// Conventional first
	{
		code: 'CEI', line: 'finance and systems with judgment: audit, underwriting, claims, analysis.',
		jobs: [
			{ title: 'Auditor', ncs: 'auditor', onet: 'Accountants and Auditors' },
			{ title: 'IT project manager', ncs: 'it-project-manager', onet: 'Computer and Information Systems Managers' },
			{ title: 'Insurance underwriter', ncs: 'insurance-underwriter', onet: 'Insurance Underwriters' },
			{ title: 'Insurance claims handler', ncs: 'insurance-claims-handler', onet: 'Claims Adjusters, Examiners, and Investigators' },
			{ title: 'Investment analyst', ncs: 'investment-analyst', onet: 'Financial and Investment Analysts' },
		],
	},
	{
		code: 'CES', line: 'organised work with customers: lending, accounts, front desks, arrangements.',
		jobs: [
			{ title: 'Mortgage adviser', ncs: 'mortgage-adviser', onet: 'Loan Officers' },
			{ title: 'Credit controller', ncs: 'credit-controller', onet: 'Bill and Account Collectors' },
			{ title: 'Customer service assistant', ncs: 'customer-service-assistant', onet: 'Customer Service Representatives' },
			{ title: 'Personal assistant', ncs: 'personal-assistant', onet: 'Executive Secretaries and Executive Administrative Assistants' },
			{ title: 'Funeral director', ncs: 'funeral-director', onet: 'Morticians, Undertakers, and Funeral Arrangers' },
		],
	},
	{
		code: 'CRI', line: 'technical support and measurement: IT support, networks, surveying, energy.',
		jobs: [
			{ title: 'IT support technician', ncs: 'it-support-technician', onet: 'Computer User Support Specialists' },
			{ title: 'Network manager', ncs: 'network-manager', onet: 'Network and Computer Systems Administrators' },
			{ title: 'Land surveyor', ncs: 'land-surveyor', onet: 'Surveyors' },
			{ title: 'Domestic energy assessor', ncs: 'domestic-energy-assessor', onet: 'Energy Auditors' },
			{ title: 'Telecoms engineer', ncs: 'telecoms-engineer', onet: 'Telecommunications Engineering Specialists' },
		],
	},
	{
		code: 'CER', line: 'procedures around goods and money: purchasing, borders, dispensing, freight.',
		jobs: [
			{ title: 'Purchasing manager', ncs: 'purchasing-manager', onet: 'Purchasing Agents, Except Wholesale, Retail, and Farm Products' },
			{ title: 'Pharmacy assistant', ncs: 'pharmacy-assistant', onet: 'Pharmacy Aides' },
			{ title: 'Border Force officer', ncs: 'border-force-officer', onet: 'Customs and Border Protection Officers' },
			{ title: 'Store detective', ncs: 'store-detective', onet: 'Retail Loss Prevention Specialists' },
			{ title: 'Import-export clerk', ncs: 'import-export-clerk', onet: 'Freight Forwarders' },
		],
	},
	{
		code: 'CIR', line: 'checking systems and places against a standard: compliance, mapping, quality.',
		jobs: [
			{ title: 'Environmental health officer', ncs: 'environmental-health-officer', onet: 'Environmental Compliance Inspectors' },
			{ title: 'Geospatial technician', ncs: 'geospatial-technician', onet: 'Geographic Information Systems Technologists and Technicians' },
			{ title: 'Systems analyst', ncs: 'systems-analyst', onet: 'Computer Systems Engineers/Architects' },
			{ title: 'Cartographer', ncs: 'cartographer', onet: 'Cartographers and Photogrammetrists' },
			{ title: 'Quality control assistant', ncs: 'quality-control-assistant', onet: 'Quality Control Analysts' },
		],
	},
	{
		code: 'CRE', line: 'procedures that keep things moving: stock, airspace, flying, warehouses.',
		jobs: [
			{ title: 'Stock control assistant', ncs: 'stock-control-assistant', onet: 'Stockers and Order Fillers' },
			{ title: 'Air traffic controller', ncs: 'air-traffic-controller', onet: 'Air Traffic Controllers' },
			{ title: 'Helicopter pilot', ncs: 'helicopter-pilot', onet: 'Commercial Pilots' },
			{ title: 'Drone pilot', ncs: 'drone-pilot', onet: 'Commercial Pilots' },
			{ title: 'Warehouse worker', ncs: 'warehouse-worker', onet: 'Shipping, Receiving, and Inventory Clerks' },
		],
	},
	{
		code: 'CIE', line: 'analysis for business and law: consulting, cases, risk, data.',
		jobs: [
			{ title: 'Management consultant', ncs: 'management-consultant', onet: 'Management Analysts' },
			{ title: 'Business analyst', ncs: 'business-analyst', onet: 'Management Analysts' },
			{ title: 'Paralegal', ncs: 'paralegal', onet: 'Paralegals and Legal Assistants' },
			{ title: 'Actuary', ncs: 'actuary', onet: 'Actuaries' },
			{ title: 'Data analyst', ncs: 'data-analyst-statistician', onet: 'Business Intelligence Analysts' },
		],
	},
];

export const ONET_BROWSE = 'https://www.onetonline.org/explore/interests/';
