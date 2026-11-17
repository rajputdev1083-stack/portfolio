// Edit everything here. Empty contact values are hidden automatically.
export const CONTACT = { email: "", linkedin: "", github: "", whatsapp: "" }; // whatsapp: digits with country code
export const PORTRAIT = "/dev.jpg"; // put your photo at public/dev.jpg
export const PROJECTS = [
 { name:"Deals On Digital Security", image:"/shots/deals.jpg", url:"https://dealsondigitalsecurity.com/" },
 { name:"Velanora Beauty", image:"/shots/velanora.jpg", url:"https://velanorabeauty.com/" },
 { name:"ARC Institute", image:"/shots/arc.jpg", url:"https://www.arcinstitute.in/" },
 { name:"JMart World", image:"/shots/jmart.jpg", url:"https://www.jmartworld.in/" },
 { name:"Shree Ledger", image:"/shots/shree-ledger.jpg", url:"https://www.shreeledger.in/" },
 { name:"Grow Development", image:"/shots/grow.jpg", url:"https://www.growdevelopment.in/", own:true, overview:"My own business and personal brand." },
].map(p=>({ overview:"Live website built by Dev Rajput.", tech:[], contribution:"Development & digital delivery", image:"", ...p }));
// tech: [] = add only verified technologies. image: "/shots/name.jpg" = add real screenshots in public/shots.
export const SKILLS = {
 "Frontend":["HTML5","CSS3","JavaScript","React.js","Next.js","Tailwind CSS","Responsive Design"],
 "Backend":["Node.js","Express.js","MongoDB","REST APIs","Database Management","Authentication"],
 "Digital Marketing":["SEO","Technical SEO","On-Page SEO","Off-Page SEO","Google Ads","Meta Ads","Performance Marketing","Social Media Marketing","Google Analytics","Conversion Rate Optimization"],
 "Other":["UI/UX Design","Speed Optimization","WordPress","Git & GitHub","Vercel Deployment","Website Maintenance"]};
export const SERVICES = [
 ["Full Stack Websites","End-to-end builds, from interface to database."],["E-commerce Development","Stores that load fast and are easy to manage."],
 ["Custom Web Applications","Tools built around how your business works."],["SEO & Organic Growth","Technical, on-page and off-page SEO."],
 ["Google Ads Management","Search campaigns set up and managed."],["Meta Ads Campaigns","Paid social campaigns across Meta platforms."],
 ["Performance Marketing","Campaigns tracked and tuned against goals."],["Speed Optimization","Faster pages for users and search engines."]];
export const GROW = ["Full Stack Web Development","Website Design & Development","Software Development","App Development","SEO Services","Google Ads","Meta Ads","Performance Marketing","Digital Marketing Solutions"];
