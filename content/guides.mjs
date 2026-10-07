// HomeTree launch guides. Voice: experienced host over coffee. No em dashes.
const tip = (html, title = 'Host tip') => `<div class="callout"><div class="callout-title">__TIP_ICON__${title}</div><p>${html}</p></div>`;
const toolLink = (href, title, sub, ico) => `<a class="tool-link" href="${href}"><span class="t-ico">__ICON_${ico}__</span><span><strong>${title}</strong><span>${sub}</span></span></a>`;

export const TOPICS = ['Pricing', 'Operations', 'Reviews', 'Listing', 'Setup', 'For landlords'];

export const PHOTOS = {
  hero: { src: 'photo-1543490791-db8323d8e5b2', by: 'Kelcie Papp', user: 'studiogene', alt: 'A bright rental bedroom with white bedding and morning light' },
  living: { src: 'photo-1612543322525-f021384dc6a4', by: 'Véronique Trudel', user: 'veroniquetrudel', alt: 'A grey armchair beside a large potted plant in a bright living room' },
  towels: { src: 'photo-1760722974657-f64bce2f9cc5', by: 'Mads Leif Hansen', user: 'mads_leif_hansen', alt: 'A stack of clean white towels in warm morning light' },
  bedroom2: { src: 'photo-1617202009606-c890040e0c59', by: 'Kate Darmody', user: 'kdarmody', alt: 'A neatly made bed with white linen' },
  sofa: { src: 'photo-1626965654957-fef1cb80d4b7', by: 'Kate Darmody', user: 'kdarmody', alt: 'A blue and white sofa in a sunny living room' },
  desk: { src: 'photo-1679939153963-fd105167b4c3', by: 'aes', user: 'aislinns', alt: 'A bedroom with a bed, a desk and a window' },
  kitchen: { src: 'photo-1560185127-1902ccdc5094', by: 'Francesca Tosolini', user: 'fromitaly', alt: 'A white kitchen with grey counters' },
  door: { src: 'photo-1649170314982-d67689ebc351', by: 'Luke Schlanderer', user: 'lukeschlanderer', alt: 'A potted plant in front of a white front door' },
  linen: { src: 'photo-1639690222869-1e608aa51f82', by: 'Bree Anne', user: 'breebuddy', alt: 'Close up of a bed with crisp white sheets' },
  kitchen2: { src: 'photo-1588796460718-f457ad1e1a1f', by: 'Lotus Design N Print', user: 'lotusdnp', alt: 'A kitchen with white and wood cabinets' },
  kitchen3: { src: 'photo-1764526624453-db32c24eca55', by: 'Clay Banks', user: 'claybanks', alt: 'A modern kitchen with wooden cabinets and an island' },
  bedroom3: { src: 'photo-1580862842845-5aa6f6438329', by: 'Sean Foster', user: 'fosterious', alt: 'White bed linen in a blue bedroom' },
  plants: { src: 'photo-1657040899606-b22f17a6afd5', by: 'Christina Radevich', user: 'chris_designer', alt: 'A cozy living room with a couch and plants' },
  chair: { src: 'photo-1631510390389-c1e4fb20ff31', by: 'Spacejoy', user: 'spacejoy', alt: 'A white and grey chair near a window' },
};

export const GUIDES = [
{
  slug: 'price-your-rental', topic: 'Pricing', minutes: 8, photo: 'living', featured: true,
  title: 'How to price your short-term rental',
  excerpt: 'Find your break-even number, set a base rate from real comps, then let weekends, seasons and minimum stays do the rest.',
  lead: 'Pricing is the lever that moves everything else. Get the base rate right, add a few simple rules, and check it for 10 minutes a week.',
  tool: ['revenue-calculator', 'Revenue and profit calculator', 'Find your break-even nights before you set a single rate.', 'tools'],
  sections: [
    ['break-even', 'Start with your break-even number', `
<p>Before you look at a single competitor, know the number you can't go below. Add up your monthly fixed costs (mortgage or rent, utilities, internet, insurance, software) and your cost per turnover (cleaner, laundry, supplies).</p>
<p>From there you can work out how many booked nights you need each month just to cover costs. <strong>If your break-even is 18 nights a month and your market books 15, the problem isn't your pricing.</strong> It's the property, the market or the costs.</p>
__TOOL__`],
    ['base-rate', 'Set a base rate from real comps', `
<p>Your base rate is a normal weeknight in a normal month. To find it:</p>
<ol>
<li>Search Airbnb for a Tuesday night 6 to 8 weeks out, with your guest count and bedroom count.</li>
<li>Filter to listings like yours: same type, similar amenities, 4.8 stars or higher.</li>
<li>Write down 10 to 15 nightly prices. Ignore the very cheapest and the very highest.</li>
<li>Your base rate is the middle of that list.</li>
</ol>
<p>New listing with no reviews? Start about 10% under the middle until you have your first 5 reviews, then move up to it. Those first reviews are worth more than the discount.</p>`],
    ['weekends-seasons', 'Weekends, seasons and events', `
<p>Once the base rate is set, adjust for demand instead of guessing night by night.</p>
<ul>
<li><strong>Weekends:</strong> Friday and Saturday usually run 15% to 30% above your weeknight rate. Beach and mountain towns often sit at the high end.</li>
<li><strong>Seasons:</strong> Mark your peak, shoulder and slow months. Peak can be 30% to 60% over base. Slow months may sit 10% to 20% under it.</li>
<li><strong>Events:</strong> Put local festivals, college graduations, races and big concerts in your calendar a year out. These nights often book first, so price them early.</li>
</ul>
${tip('Check the calendars of 5 comps for next month. If they are mostly booked on a date and you are open, your price for that date is too high. If you booked months early on a big weekend, it was too low.')}`],
    ['minimum-nights', 'Minimum nights and gap nights', `
<p>Every turnover costs you a cleaning and some wear. Minimum stays protect you from paying a cleaner for one cheap night.</p>
<ul>
<li>Use a 2-night minimum on weekends in most markets.</li>
<li>Allow 1-night stays for gap nights (a single empty night between two bookings), because nobody else will book it.</li>
<li>Raise the minimum to 3 or more for holiday weekends and peak weeks.</li>
</ul>`],
    ['discounts', 'Length-of-stay and last-minute pricing', `
<p>Longer stays mean fewer turnovers, so you can afford to discount them.</p>
<table><thead><tr><th>Stay length</th><th>Typical discount</th><th>Why</th></tr></thead><tbody>
<tr><td>7+ nights</td><td>10% to 15%</td><td>One clean instead of two or three</td></tr>
<tr><td>28+ nights</td><td>25% to 40%</td><td>Fills slow months, very low turnover cost</td></tr>
<tr><td>Last minute (under 7 days)</td><td>5% to 15% if still empty</td><td>An empty night earns nothing</td></tr>
</tbody></table>
<p>Be careful with last-minute discounts in busy seasons. If your dates usually fill, keep the price and let them.</p>`],
    ['dynamic-pricing', 'Should you use a dynamic pricing tool?', `
<p>Tools like PriceLabs, Wheelhouse and Beyond adjust your nightly rate every day based on demand in your market. Once you have more than one listing, or you just don't want to think about it, they usually pay for themselves.</p>
<p>Two rules if you use one:</p>
<ul>
<li><strong>Always set a minimum price</strong> at or above your break-even nightly rate. Otherwise the tool can rent your place for less than it costs you.</li>
<li>Review its choices weekly for the first month. You know your local events better than the algorithm does.</li>
</ul>`],
    ['weekly-routine', 'A 10-minute weekly pricing check', `
<ol>
<li>Look at the next 30 days. Any open nights inside 10 days? Drop them 5% to 10%.</li>
<li>Look at days 30 to 90. Already booked more than your comps? Raise the open dates 5%.</li>
<li>Check for new events in town and price those dates up.</li>
<li>Note your occupancy for the month. Trend matters more than any single week.</li>
</ol>`],
  ],
  takeaways: ['Know your break-even nights before setting rates.', 'Base rate equals the middle of 10 to 15 strong comps.', 'Add rules for weekends, seasons, events and minimum nights.', 'Set a floor price on any dynamic pricing tool.'],
  related: ['get-great-reviews', 'listing-photos', 'hire-and-manage-cleaners'],
},
{
  slug: 'hire-and-manage-cleaners', topic: 'Operations', minutes: 8, photo: 'towels', featured: true,
  title: 'How to hire and manage cleaners',
  excerpt: 'Where to find a great cleaner, what to pay, how to run a paid trial and how to get photo proof every single turnover.',
  lead: 'Your cleaner is the most important person in your business. Guests never meet them, but they review their work in every stay.',
  tool: ['cleaning-fee-calculator', 'Cleaning fee calculator', 'Turn your cleaner pay into a guest cleaning fee that still books.', 'receipt'],
  sections: [
    ['what-turnover-means', 'What a turnover includes', `
<p>A turnover is more than a house clean. Write this list down and share it before you hire anyone:</p>
<ul>
<li>Strip and remake every bed with fresh linens, and run or drop off laundry.</li>
<li>Clean bathrooms and kitchen top to bottom, including inside the microwave and fridge.</li>
<li>Empty all trash, run and unload the dishwasher.</li>
<li>Restock consumables to the par levels you set (toilet paper, soap, coffee, trash bags).</li>
<li>Reset the staging: pillows, throws, remote controls, welcome note.</li>
<li>Check for damage and left-behind items, and report both.</li>
<li>Send photos of every room when done.</li>
</ul>`],
    ['where-to-find', 'Where to find a cleaner', `
<ul>
<li><strong>Other hosts.</strong> Ask in local host Facebook groups who they use and who they would hire again. A cleaner who already does short-term rentals is worth a lot.</li>
<li><strong>Turnover apps.</strong> Turno lists cleaners who specialize in vacation rentals and handles scheduling and payment.</li>
<li><strong>House cleaning companies</strong> that offer vacation rental service. More expensive, but they bring backup staff.</li>
<li><strong>Neighbors and Nextdoor.</strong> Great for small markets.</li>
</ul>
${tip('Interview at least 3 cleaners, even if you love the first one. You need a backup anyway.')}`],
    ['what-to-pay', 'What to pay', `
<p>Most hosts pay a flat rate per turnover, set by bedroom and bathroom count. Hourly pay invites slow cleans and surprise bills.</p>
<p>Rates vary a lot by market, so ask 3 local cleaners and 3 local hosts. As a rough guide, many US markets land somewhere around $70 to $120 for a 1-bedroom and $100 to $180 for a 3-bedroom turnover, with laundry sometimes extra.</p>
<ul>
<li>Pay a little more for same-day turnovers (checkout at 10, check-in at 3).</li>
<li>Pay for deep cleans separately, usually every 2 to 3 months.</li>
<li>Pay on time, every time. Fast, reliable pay is how you keep the best cleaner in town.</li>
</ul>`],
    ['paid-trial', 'Run a paid trial clean', `
<p>Before you hand anyone your calendar, book one paid trial clean. Walk the property with them, show them your checklist and where supplies live, then inspect the result.</p>
<p>Look at the places guests notice first: hair in the shower and on pillows, crumbs in the toaster, smudges on mirrors and glass, and the smell when you open the door.</p>`],
    ['photo-proof', 'Get photo proof of every turnover', `
<p>Ask for 10 to 15 photos after every clean, shot from the same spots each time: each bed, each bathroom, kitchen counters, living room and anything that breaks often.</p>
<p>Photos protect you both. If a guest says the place was dirty, you can see exactly how it was left. If a guest breaks something, you have a before photo to send with a damage claim.</p>
${tip('Make a shared photo album or channel per property. The cleaner drops photos in, and you scroll through them in 30 seconds.')}`],
    ['scheduling', 'Scheduling and communication', `
<ul>
<li>Share your booking calendar so cleaners see every checkout automatically. Most apps and channel managers can send a calendar link.</li>
<li>Agree on one place for messages, not five.</li>
<li>Ask them to report low supplies, damage and maintenance issues the same day.</li>
<li>Keep a locked owner's closet with backup linens and 1 to 2 months of supplies.</li>
</ul>`],
    ['backup', 'Always have a backup cleaner', `
<p>Cleaners get sick, go on vacation and leave. Have a second cleaner who has done at least 2 turnovers at your place this year. When your main cleaner can't make it, you make one text instead of panicking at 9 a.m. on a Saturday.</p>`],
  ],
  takeaways: ['Write the turnover checklist before you hire.', 'Pay a flat rate per turnover, on time.', 'Run a paid trial and inspect what guests notice first.', 'Get photos every turnover and keep a backup cleaner.'],
  related: ['restock-supplies', 'get-great-reviews', 'self-check-in'],
},
{
  slug: 'get-great-reviews', topic: 'Reviews', minutes: 7, photo: 'bedroom2', featured: true,
  title: 'How to get great reviews',
  excerpt: 'Reviews are about expectations. Set them clearly, message at the right moments, fix problems fast and respond to every review.',
  lead: 'Most low reviews are not about a bad stay. They are about a stay that did not match what the guest expected.',
  tool: null,
  sections: [
    ['categories', 'Know what guests are rating', `
<p>On Airbnb, guests give an overall star rating plus six category ratings: cleanliness, accuracy, check-in, communication, location and value. You control 5 of the 6 directly. Location is the one you chose when you bought or rented the place.</p>
<p><strong>Cleanliness and accuracy cause most of the damage.</strong> A spotless place that looks like its photos will get good reviews even with a few small problems.</p>`],
    ['expectations', 'Set expectations in the listing', `
<ul>
<li>Say what's not perfect: street noise, stairs, a small second bedroom, a shared wall. Guests forgive what they were told about.</li>
<li>Make photos honest. Wide-angle shots that make a small room look huge lead to accuracy hits.</li>
<li>List exactly what's provided in the kitchen and bathroom.</li>
</ul>`],
    ['four-messages', 'Send four messages at the right times', `
<p>Good communication is mostly timing. Automate these four and you are ahead of most hosts:</p>
<ol>
<li><strong>Right after booking:</strong> thank them and say when check-in details arrive.</li>
<li><strong>2 to 3 days before arrival:</strong> address, parking, door code instructions, Wi-Fi.</li>
<li><strong>The morning after check-in:</strong> a short "Is everything working?" This one catches problems before checkout, when you can still fix them.</li>
<li><strong>The evening before checkout:</strong> checkout time and a short, reasonable checkout list.</li>
</ol>
<p>Copy-and-paste versions are on the <a href="/templates/">Templates page</a>.</p>`],
    ['fix-fast', 'Fix problems fast, and offer something', `
<p>Things will break. What guests remember is how fast you responded.</p>
<ul>
<li>Reply within an hour during the day.</li>
<li>Give a clear time for the fix: "A repair person will be there by 2 p.m."</li>
<li>If it affects their stay, offer something small without being asked: a late checkout, a partial refund for a night, a delivery gift card.</li>
</ul>
${tip('Keep a short list of a plumber, electrician, locksmith and handyman who can come same day. Save it in your phone and give it to your cleaner.')}`],
    ['small-touches', 'Small touches that show up in reviews', `
<p>You do not need a gift basket. You need a few things that make guests feel looked after:</p>
<ul>
<li>A short welcome note with their name.</li>
<li>A basket of the things people forget: toothpaste, toothbrushes, phone chargers, hair ties.</li>
<li>A stocked kitchen with real knives, a spice rack and good coffee.</li>
<li>A one-page local guide with your 5 favorite places, not 50.</li>
</ul>
<p>See the <a href="/gear/">Gear page</a> for the exact items.</p>`],
    ['ask', 'How to ask for a review', `
<p>On Airbnb, guests have 14 days after checkout to leave a review, and neither review is shown until both are in or the window closes. A short thank-you after checkout that mentions you left them a review is usually enough. Don't ask for 5 stars. Ask them to share how the stay went.</p>`],
    ['respond', 'Respond to every review', `
<p>Future guests read your replies. Keep them short and gracious, especially on a 4-star or critical review.</p>
<ul>
<li>Thank them by name.</li>
<li>If there was a problem, say what you fixed: "We replaced the mattress topper after your stay."</li>
<li>Never argue in public. Message the guest privately if you need to.</li>
</ul>`],
  ],
  takeaways: ['Cleanliness and accuracy matter most.', 'Tell guests about imperfections up front.', 'Automate four messages, especially the morning-after check-in.', 'Fix problems fast and reply to every review.'],
  related: ['hire-and-manage-cleaners', 'furnish-your-rental', 'listing-title-description'],
},
{
  slug: 'listing-photos', topic: 'Listing', minutes: 6, photo: 'sofa',
  title: 'Photos that get the click',
  excerpt: 'Guests decide in the first few photos. What to shoot, in what order, and how to light it with what you already own.',
  lead: 'Your first photo is doing most of the work. Here is what to shoot, in what order, and how to light it with what you already own.',
  tool: null,
  sections: [
    ['order', 'Get the first five right', `
<p>On Airbnb, the first five photos show at the top of your listing, and the first one shows in search. Put your best shots there, in this order:</p>
<ol>
<li>The room guests will actually live in, usually the living room or the best view.</li>
<li>The main bedroom.</li>
<li>The kitchen.</li>
<li>The best bathroom.</li>
<li>Your standout feature: hot tub, patio, fireplace, workspace.</li>
</ol>
<p>The front door or the outside of the building almost never belongs first.</p>`],
    ['light', 'Light it like a magazine, with no extra gear', `
<ul>
<li>Shoot during the day, with every light in the room on and every curtain open.</li>
<li>Turn off the flash. Use HDR mode on your phone.</li>
<li>Shoot with your back to the window, so the light falls on the room, not into the lens.</li>
<li>Use warm bulbs (2700K to 3000K) everywhere. Mixed bulb colors look messy in photos.</li>
</ul>`],
    ['angles', 'Angles that make rooms look right', `
<ul>
<li>Hold the phone at chest height, not eye level.</li>
<li>Shoot from a corner or doorway to show the whole room.</li>
<li>Keep vertical lines straight. Turn on your camera's grid and line up the door frames.</li>
<li>Use the 0.5x lens carefully. It shows more of the room but stretches the edges. If the room looks bigger than it is, guests will notice.</li>
</ul>
${tip('Take 3 versions of every shot and pick the best one later. Photos are free.')}`],
    ['staging', 'Stage before you shoot', `
<ul>
<li>Remove 50% of what is on every surface. Cords, remotes, toiletries and fridge magnets all go.</li>
<li>Make beds tight, with pillows plumped and a throw folded at the foot.</li>
<li>Add a few signs of life: a bowl of lemons, a plant, a book on the coffee table, coffee mugs on a tray.</li>
<li>Open the toilet lid? Never. Close it.</li>
</ul>`],
    ['shot-list', 'The full shot list', `
<table><thead><tr><th>Room</th><th>Shots</th></tr></thead><tbody>
<tr><td>Living room</td><td>Wide from 2 corners, 1 detail</td></tr>
<tr><td>Each bedroom</td><td>Wide, bed straight on, 1 detail (nightstand, lamp)</td></tr>
<tr><td>Kitchen</td><td>Wide, counter detail, coffee station</td></tr>
<tr><td>Bathrooms</td><td>Wide, vanity with towels</td></tr>
<tr><td>Outdoor</td><td>Patio wide, view, entrance at dusk</td></tr>
<tr><td>Extras</td><td>Workspace, laundry, parking, nearby beach or trail</td></tr>
</tbody></table>
<p>Then add captions in Airbnb's photo tour so guests know which bedroom has which bed.</p>`],
    ['pro', 'When to hire a photographer', `
<p>If your listing earns more than a few thousand dollars a year, a professional real estate or vacation rental photographer is almost always worth it. Ask for 25 to 35 edited photos and the right to use them on your own website too. Reshoot when you redecorate or every couple of years.</p>`],
  ],
  takeaways: ['Lead with the room guests will use most.', 'Shoot in daylight with all lights on and flash off.', 'Remove half of everything before you shoot.', 'Caption photos so guests know what they are looking at.'],
  related: ['listing-title-description', 'furnish-your-rental', 'price-your-rental'],
},
{
  slug: 'listing-title-description', topic: 'Listing', minutes: 5, photo: 'desk',
  title: 'Write a listing title and description that books',
  excerpt: 'A title formula that fits the character limit, and a description structure that answers questions before guests ask.',
  lead: 'Your title gets a guest to click. Your description gets them to book without sending you 6 questions first.',
  tool: null,
  sections: [
    ['title', 'The title formula', `
<p>Airbnb titles are short (about 50 characters), so every word has to earn its spot. Lead with the thing that makes a guest choose you:</p>
<p><strong>[Standout feature] + [type of place] + [location hook]</strong></p>
<ul>
<li>Hot tub cabin, 5 min to the ski lift</li>
<li>Walk to the beach: bright 2BR with patio</li>
<li>Quiet studio with workspace near downtown</li>
</ul>
<p>Skip words that every listing uses: "cozy," "charming," "perfect getaway." Use the space for facts.</p>`],
    ['description', 'Structure the description', `
<p>Only the first few lines show before guests tap "Show more," so the top has to work alone.</p>
<ol>
<li><strong>One-sentence hook:</strong> who it's for and why. "A quiet 2-bedroom for families who want to walk to the beach and still sleep well."</li>
<li><strong>The highlights:</strong> 3 to 5 short lines with the features that matter most.</li>
<li><strong>The space:</strong> room by room, including bed sizes.</li>
<li><strong>Guest access and parking.</strong></li>
<li><strong>Other things to note:</strong> stairs, noise, pets, cameras on the exterior, quiet hours.</li>
</ol>`],
    ['amenities', 'Fill in every amenity', `
<p>Guests filter search results by amenities like dedicated workspace, crib, washer, free parking and self check-in. If you have it and haven't checked the box, you are hidden from those searches. Go through the full amenities list once a quarter.</p>
${tip('Add a dedicated workspace (a real desk and chair) and check that box. It brings in remote workers on weekdays when weekend guests are gone.')}`],
    ['honesty', 'Be honest about the imperfect parts', `
<p>A short "good to know" list builds trust and protects your accuracy rating: third-floor walk-up, train nearby, small second bedroom, shared driveway. Guests who book anyway won't be surprised, and that keeps reviews high.</p>`],
  ],
  takeaways: ['Lead your title with the standout feature.', 'Make the first lines of the description work alone.', 'Check every amenity you really have.', 'List the imperfect parts up front.'],
  related: ['listing-photos', 'get-great-reviews', 'price-your-rental'],
},
{
  slug: 'furnish-your-rental', topic: 'Setup', minutes: 9, photo: 'kitchen', featured: true,
  title: 'Furnish and set up your rental, room by room',
  excerpt: 'What to buy for every room, what to skip, and the small items guests mention in reviews.',
  lead: 'Buy for durability and easy cleaning first, then add a few things that make guests feel looked after. Here is the list, room by room.',
  tool: ['restock-calculator', 'Restock calculator', 'Estimate how much toilet paper, coffee and soap to buy each month.', 'cart'],
  sections: [
    ['principles', 'Four rules for buying', `
<ul>
<li><strong>White and bleachable</strong> for all bedding and towels. You can mix sets between beds and replace one piece at a time.</li>
<li><strong>Durable over pretty</strong> for anything guests touch every day: dishes, cups, outdoor furniture.</li>
<li><strong>Easy to clean</strong> under and around: platform beds, wall-mounted hooks, washable covers.</li>
<li><strong>Buy spares</strong> of anything that breaks or stains: mugs, glasses, pillow protectors.</li>
</ul>`],
    ['bedroom', 'Bedrooms', `
<ul>
<li>A medium-firm mattress with a waterproof protector. Two protectors per bed so one is always clean.</li>
<li>Four pillows per bed (2 firm, 2 soft), each with a protector.</li>
<li>Three sets of white sheets and a duvet with a washable cover per bed.</li>
<li>Nightstands on both sides, each with a lamp and a charging port.</li>
<li>Blackout curtains and a fan.</li>
<li>A luggage rack and at least 6 hangers per guest.</li>
</ul>
<p><a href="/gear/?room=Bedroom">See bedroom picks</a></p>`],
    ['kitchen', 'Kitchen', `
<ul>
<li>Dishes, mugs, glasses and flatware for twice your max guest count.</li>
<li>A real knife set, a cutting board and a basic utensil set.</li>
<li>One large nonstick pan, one medium pot, one large pot, a baking sheet.</li>
<li>A coffee maker that works for groups and singles, plus a kettle.</li>
<li>A stocked spice rack, oil, salt and pepper.</li>
<li>Dish soap, dishwasher pods, sponges, paper towels and trash bags.</li>
</ul>
<p><a href="/gear/?room=Kitchen">See kitchen picks</a></p>`],
    ['bathroom', 'Bathrooms', `
<ul>
<li>Two bath towels, one hand towel and one washcloth per guest, plus a set of spares.</li>
<li>Refillable pump bottles for shampoo, conditioner and body wash (cheaper than minis, less waste).</li>
<li>A hair dryer, a plunger and a small trash can with a lid.</li>
<li>A basket of forgotten items: toothpaste, toothbrushes, razors, cotton swabs.</li>
<li>Hooks on the back of the door for wet towels.</li>
</ul>
<p><a href="/gear/?room=Bathroom">See bathroom picks</a></p>`],
    ['living', 'Living room and workspace', `
<ul>
<li>Seating for every guest, with a washable slipcover or performance fabric.</li>
<li>A smart TV with built-in streaming apps.</li>
<li>A charging station near the couch.</li>
<li>A real desk and chair if you want weekday remote workers.</li>
</ul>`],
    ['safety', 'Safety items you can\'t skip', `
<ul>
<li>Smoke and carbon monoxide alarms in every bedroom and hallway. Test them every turnover.</li>
<li>A fire extinguisher near the kitchen exit.</li>
<li>A first aid kit.</li>
<li>Clear emergency info in the house manual: address, nearest hospital, how to shut off water.</li>
</ul>
${tip('Check your city and county rules too. Many require specific safety equipment and an inspection for short-term rentals.')}`],
    ['skip', 'What to skip', `
<ul>
<li>Glass coffee tables and glass shower doors you have to squeegee.</li>
<li>Dark or patterned bedding you can't bleach.</li>
<li>Decorative pillows piled high on beds. Guests throw them on the floor.</li>
<li>Expensive art and anything sentimental.</li>
</ul>`],
  ],
  takeaways: ['White, bleachable bedding and towels.', 'Twice your guest count in dishes and cups.', 'Hooks, chargers and a luggage rack are cheap wins.', 'Safety gear in every bedroom and the kitchen.'],
  related: ['restock-supplies', 'get-great-reviews', 'listing-photos'],
},
{
  slug: 'self-check-in', topic: 'Operations', minutes: 5, photo: 'door',
  title: 'Self check-in that never fails',
  excerpt: 'Smart locks, backup plans and instructions so clear that nobody has to call you at 11 p.m.',
  lead: 'Most guests prefer self check-in, and most check-in problems are preventable. Here is the setup that just works.',
  tool: null,
  sections: [
    ['lock', 'Use a keypad smart lock', `
<p>A keypad deadbolt lets you give every guest their own code that works only during their stay. No keys to copy, no lockbox codes shared on the internet, and you can see when the door was opened.</p>
<ul>
<li>Pick one with a physical keypad, not just a phone app. Guests arrive with dead phones.</li>
<li>Choose one that connects to your booking platform or channel manager so codes are created automatically.</li>
<li>Use the last 4 digits of the guest's phone number as their code. Easy to remember, unique each time.</li>
</ul>`],
    ['backup', 'Always have a backup', `
<p>Batteries die, and Wi-Fi goes down. Keep a key in a lockbox hidden nearby, with a code you change every few months. Put a reminder in your calendar to replace the lock batteries every 6 months, even if they still show as fine.</p>`],
    ['instructions', 'Write instructions with photos', `
<ul>
<li>Send check-in instructions 2 to 3 days before arrival and again the morning of.</li>
<li>Include a photo of the building, the front door and where to park.</li>
<li>Write steps in order: park here, walk to this door, enter your code, press the lock button.</li>
<li>Include the Wi-Fi name and password in the same message.</li>
</ul>
${tip('Test your own instructions once by arriving at night as if you were a guest. You will find at least one thing to fix.')}`],
    ['lighting', 'Light the way', `
<p>Add a motion-sensor or smart light at the entrance and along the path. Guests often arrive after dark, and a lit, easy-to-find door is the first impression of your rental.</p>`],
  ],
  takeaways: ['Use a keypad smart lock with codes per guest.', 'Keep a backup key in a lockbox.', 'Send instructions with photos twice.', 'Light the entrance.'],
  related: ['hire-and-manage-cleaners', 'get-great-reviews', 'furnish-your-rental'],
},
{
  slug: 'restock-supplies', topic: 'Operations', minutes: 5, photo: 'linen',
  title: 'Restock supplies without running out',
  excerpt: 'Set par levels, keep an owner\'s closet and order once a month so guests never find an empty toilet paper roll.',
  lead: 'Running out of toilet paper is a review waiting to happen. A simple par level system means you never have to think about it.',
  tool: ['restock-calculator', 'Restock calculator', 'Get a monthly shopping list based on your bookings.', 'cart'],
  sections: [
    ['par', 'Set par levels', `
<p>A par level is the amount that should be out for guests after every turnover. Write it down per room and give it to your cleaner:</p>
<ul>
<li>Each bathroom: 4 rolls of toilet paper out, full soap pumps, 1 box of tissues.</li>
<li>Kitchen: 1 roll of paper towels, 6 dishwasher pods, 1 dish soap, 2 sponges, coffee for 2 mornings per guest.</li>
<li>Each bed: 1 full set of sheets in use, 1 spare set in the closet.</li>
</ul>`],
    ['closet', 'Keep a locked owner\'s closet', `
<p>Guests don't need to see 40 rolls of toilet paper. Keep backup supplies in a locked closet or cabinet with 1 to 2 months of everything, so the cleaner can restock from it every turnover.</p>`],
    ['ordering', 'Order once a month', `
<ul>
<li>Ask your cleaner to report anything below a set amount in the closet.</li>
<li>Place one order a month, timed so it arrives before you run low.</li>
<li>Use subscriptions for things you always need: toilet paper, trash bags, dishwasher pods, coffee.</li>
<li>Have the order shipped to the property only if someone will be there to put it away.</li>
</ul>
${tip('Track what you buy for 2 or 3 months. You will quickly learn your real usage per booked night, and the monthly order becomes copy and paste.')}`],
  ],
  takeaways: ['Write par levels for every room.', 'Keep a locked closet with 1 to 2 months of supplies.', 'Order once a month, with subscriptions for staples.'],
  related: ['hire-and-manage-cleaners', 'furnish-your-rental', 'price-your-rental'],
},
{
  slug: 'screen-tenants', topic: 'For landlords', minutes: 6, photo: 'kitchen2', landlord: true,
  title: 'Screen tenants for a one-year lease',
  excerpt: 'Write your criteria before you list, apply them the same way to everyone, and verify what applicants tell you.',
  lead: 'Good screening is the best protection a long-term landlord has. The key is to decide your rules first and apply them the same way to every applicant.',
  tool: null,
  sections: [
    ['criteria', 'Write your criteria before you list', `
<p>Put your screening criteria in writing and share them with every applicant. Common criteria include:</p>
<ul>
<li>Monthly income of about 2.5 to 3 times the rent.</li>
<li>A minimum credit score or a clean recent payment history.</li>
<li>Positive references from previous landlords.</li>
<li>No recent evictions.</li>
</ul>
<p>Apply the same criteria, in the same order, to everyone. That consistency is what keeps the process fair.</p>`],
    ['fair-housing', 'Follow fair housing rules', `
<p>The federal Fair Housing Act prohibits discrimination based on race, color, religion, sex, national origin, familial status and disability. Many states and cities add more protected groups, such as source of income. Don't ask questions related to any of them, and don't change your criteria based on them.</p>`],
    ['verify', 'Verify what applicants tell you', `
<ul>
<li>Run credit and background checks only with the applicant's written consent, through a tenant screening service.</li>
<li>Verify income with pay stubs, an offer letter or bank statements.</li>
<li>Call the previous landlord, not just the current one. The current landlord may want the tenant gone.</li>
<li>Confirm the applicant's identity matches the application.</li>
</ul>
${tip('Ask previous landlords one simple question: "Would you rent to them again?" A pause tells you a lot.', 'Landlord tip')}`],
    ['decide', 'Decide and document', `
<p>Process applications in the order you receive them. Approve the first applicant who meets your criteria, and keep a record of why each application was approved or denied. If you deny someone based on a credit report, federal rules require you to send them an adverse action notice.</p>`],
  ],
  takeaways: ['Write criteria before you list.', 'Apply them the same way to everyone.', 'Verify income and call previous landlords.', 'Document every decision.'],
  disclaimer: 'This guide is general information, not legal advice. Landlord-tenant law varies by state and city, so check local rules or talk to a local attorney before you finalize your process.',
  related: ['price-your-rental', 'furnish-your-rental', 'hire-and-manage-cleaners'],
},
];
