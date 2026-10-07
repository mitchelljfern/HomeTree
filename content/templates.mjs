// Placeholders: {property} {host} {checkin} {checkout} {wifi} {wifipass} are filled from the form.
// [Guest name] style brackets stay for the host to edit.
export const MESSAGES = [
  { id: 'booking', title: 'Booking confirmation', when: 'Right after a booking', body:
`Hi [Guest name],

Thanks for booking {property}. We're glad you're coming.

Check-in is at {checkin} and checkout is at {checkout}. I'll send the address, door code and Wi-Fi details 3 days before you arrive.

If you have any questions before then, just message me here.

{host}` },
  { id: 'pre-arrival', title: 'Check-in instructions', when: '2 to 3 days before arrival', body:
`Hi [Guest name],

Your stay at {property} is almost here. Here's everything you need:

Address: [Address]
Parking: [Where to park]
Check-in: {checkin} or later

Getting in:
1. Walk to [the front door / side gate].
2. Enter your door code: [last 4 digits of your phone number].
3. Press the lock button to lock it again when you leave.

Wi-Fi: {wifi}
Password: {wifipass}

The house guide is on the kitchen counter. Message me anytime if something isn't right.

{host}` },
  { id: 'day-of', title: 'Day-of reminder', when: 'Morning of check-in', body:
`Good morning [Guest name],

{property} is ready for you after {checkin} today. Your door code is [code].

Safe travels, and message me when you're settled in if you have any questions.

{host}` },
  { id: 'morning-after', title: 'Morning-after check-in', when: 'Morning after arrival', body:
`Hi [Guest name],

Just checking in. Is everything working and do you have what you need?

If anything is missing or not quite right, tell me now and I'll get it fixed today.

{host}` },
  { id: 'checkout', title: 'Checkout reminder', when: 'Evening before checkout', body:
`Hi [Guest name],

Hope you've had a great stay. Checkout is tomorrow at {checkout}.

Before you go:
- Start the dishwasher
- Put trash in the outside bins
- Leave used towels in the bathtub
- Lock the door behind you

No need to strip the beds. Safe travels home.

{host}` },
  { id: 'thanks', title: 'Thank you and review', when: 'After checkout', body:
`Hi [Guest name],

Thanks for staying at {property}. It was a pleasure hosting you, and I've left you a review.

If you have a minute, I'd love to hear how your stay went in a review of your own. It helps other guests and helps me keep improving.

Hope to host you again.

{host}` },
  { id: 'early', title: 'Early check-in reply', when: 'When a guest asks to arrive early', body:
`Hi [Guest name],

Thanks for asking. Our cleaner needs the full time between guests, so check-in is at {checkin}.

If the place is ready sooner, I'll message you right away. In the meantime, [nearby cafe or lunch spot] is a great place to wait.

{host}` },
  { id: 'problem', title: 'Fixing a problem', when: 'When something breaks during a stay', body:
`Hi [Guest name],

I'm sorry about the [problem], and thanks for letting me know right away.

[Repair person] will be there by [time] to fix it. If that time doesn't work for you, tell me and I'll reschedule.

To make up for the trouble, [offer: late checkout / partial refund / delivery credit].

{host}` },
];

export const CHECKLISTS = [
  { id: 'turnover', title: 'Turnover checklist', when: 'Every clean, for your cleaner', groups: [
    ['Bedrooms', ['Strip beds and start laundry', 'Make beds with fresh linens, tight corners', 'Check under beds and in drawers for left items', 'Dust nightstands and lamps', 'Test lamp and charging ports']],
    ['Bathrooms', ['Clean toilet, shower, tub and sink', 'Check drains and shower for hair', 'Wipe mirrors and fixtures streak free', 'Restock toilet paper (4 rolls out) and soap', 'Fresh towels: 2 bath, 1 hand per guest']],
    ['Kitchen', ['Run and unload dishwasher', 'Wipe counters, stovetop and inside microwave', 'Empty fridge of guest food', 'Restock coffee, dish soap, pods and paper towels', 'Take out all trash and recycling']],
    ['Living areas', ['Vacuum and mop all floors', 'Fluff pillows and fold throws', 'Reset remotes and check the TV is signed out', 'Check for damage and note it']],
    ['Finish', ['Set thermostat to the welcome setting', 'Take photos of every room', 'Report low supplies and any damage', 'Lock up and confirm the door code works']],
  ] },
  { id: 'deep', title: 'Deep clean checklist', when: 'Every 2 to 3 months', groups: [
    ['Every room', ['Wash pillows, duvets and mattress protectors', 'Wipe baseboards, doors and light switches', 'Clean windows inside', 'Vacuum under furniture and cushions', 'Replace HVAC filter']],
    ['Kitchen and bath', ['Clean oven and inside fridge shelves', 'Descale coffee maker and kettle', 'Scrub grout and re-caulk if needed', 'Check under sinks for leaks']],
    ['Safety', ['Test smoke and CO alarms', 'Check fire extinguisher pressure', 'Restock first aid kit', 'Replace smart lock batteries if over 6 months']],
  ] },
];

export const PRINTABLES = [
  { id: 'wifi', title: 'Wi-Fi card', when: 'Frame it by the TV or on the fridge' },
  { id: 'rules', title: 'House rules card', when: 'Leave it on the kitchen counter' },
  { id: 'checkout-card', title: 'Checkout card', when: 'Put it by the front door' },
];
