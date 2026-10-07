"""Source list for the Gear page. Generates data/products.json (site fallback) and products.csv (sheet import)."""
import csv, json, os

COLS = ["id", "status", "name", "brand", "room", "category", "price_tier", "approx_price",
        "priority", "tags", "why", "link_type", "amazon_url", "asin", "image_url",
        "featured", "kits", "date_added", "notes"]

def tier(p):
    if p < 25: return "$"
    if p < 75: return "$$"
    if p < 200: return "$$$"
    return "$$$$"

IMG = "https://m.media-amazon.com/images/I/{}._AC_SL500_.jpg"

# (asin, name, brand, room, category, price, priority, tags, why, image_id, featured, kits)
PRODUCTS = [
 ("B0DD7JFK68", "USB touch bedside lamp", "Dicoool", "Bedroom", "Lighting", 23, "Must-have", "Guest wow", "USB-A and USB-C ports in the lamp base. Guests charge their phones within reach and stop unplugging your lamps to do it.", "71RL9RdCSzL", True, "Starter kit"),
 ("B00UV3Z7KO", "Ellington revolving spice rack", "Kamenstein", "Kitchen", "Cooking", 53, "Nice to have", "Guest wow", "A stocked spice rack is a small thing guests mention in reviews. Comes filled, with free refills for 5 years.", "71e3MZhYx5L", True, "Kitchen kit"),
 ("B00008WQ3L", "20-jar revolving spice rack", "Kamenstein", "Kitchen", "Cooking", 49, "Nice to have", "Guest wow", "The larger stainless version with 20 jars. Same 5 years of free refills, so restocking costs you nothing.", "71AiuQKcleL", False, "Kitchen kit"),
 ("B003EH0CY0", "Travel toothpaste, 144 tubes", "Freshmint", "Bathroom", "Amenities", 48, "Must-have", "Guest wow", "Forgot my toothpaste is one of the most common guest messages. At about 33 cents a tube, just leave one out.", "71xFhOgQaZL", True, "Starter kit"),
 ("B07NCNRCMV", "Wrapped toothbrushes, 100 pack", "natraco", "Bathroom", "Amenities", 39, "Must-have", "Guest wow", "Pair with the toothpaste in a small basket. Under 40 cents a stay and it shows up in reviews.", "81inBvSXlXL", False, "Starter kit"),
 ("B09B73D1CF", "Hotel toiletries bundle, 125 pieces", "Bergman Kelly", "Bathroom", "Amenities", 55, "Nice to have", "Guest wow", "Mini soap, shampoo, conditioner, lotion and body wash for guests who forget theirs. Refill your big bottles less often too.", "81tvagA97CL", False, ""),
 ("B09LVJ5DLQ", "Stainless toothbrush holder", "Wbbog", "Bathroom", "Organization", 12, "Nice to have", "Cleaner-friendly", "Stainless steel wipes clean in seconds. Ceramic holders collect grime that your cleaner will miss.", "61O7LJXmBdL", False, ""),
 ("B0BR8SX468", "Over-the-door hook rack, 12 hooks", "Optish", "Bathroom", "Organization", 13, "Must-have", "Cleaner-friendly", "No drilling. Twelve hooks on the bathroom door give every guest a spot for a wet towel, so towels stop ending up on the bed.", "51KljFkR4cL", False, "Starter kit"),
 ("B07K71JDZ3", "Wall hook rails, 2 pack", "Dseap", "Entry", "Organization", 27, "Must-have", "Durability", "Hooks by the door for jackets, bags and beach towels. Keeps wet and dirty things off your furniture.", "71jrApzcDML", False, "Starter kit"),
 ("B0F2FPZ1YX", "34 inch wood coat rack, 10 hooks", "IBosins", "Entry", "Organization", 35, "Nice to have", "Guest wow", "A longer rail for group rentals. The white wood looks good in an entry photo.", "61gIAE7Og6L", False, ""),
 ("B08G8Z27FP", "Porcelain mug set, 12 pack", "Amazon Basics", "Kitchen", "Dishes", 30, "Must-have", "Durability", "Twelve matching white mugs. No mismatched cups in your photos, and spares in the cabinet when one breaks.", "51WvgTrKMLL", False, "Kitchen kit"),
 ("B07FJ8DDPX", "18-piece dinnerware set", "Amazon Basics", "Kitchen", "Dishes", 40, "Must-have", "Durability", "Plain white porcelain photographs well and is easy to replace a piece at a time.", "618TVX6BwOL", False, "Kitchen kit"),
 ("B0D9XV7RZQ", "Unbreakable dinnerware, service for 8", "Homienly", "Kitchen", "Dishes", 50, "Nice to have", "Safety", "Plates, bowls and cups that survive drops and the dishwasher. Built for family and group rentals.", "71rw+agTEtL", False, ""),
 ("B0CDX22Q53", "Unbreakable cups, 8 pack", "Hlukana", "Kitchen", "Dishes", 17, "Nice to have", "Safety", "For pools, patios and kids. No broken glass, no cleaner cuts, no damage claims.", "6187BaRdxtL", False, ""),
 ("B0F2HQQ3D1", "24-piece flatware set with steak knives", "Dehov", "Kitchen", "Dishes", 19, "Must-have", "Durability", "Steak knives are the thing hosts forget. Buy 2 sets for a rental that sleeps 6 to 8.", "71BP1K+OwhL", False, "Kitchen kit"),
 ("B0CB7R93MG", "Wood silverware caddy", "Ayiaren", "Kitchen", "Organization", 23, "Nice to have", "Cleaner-friendly", "Forks and spoons on the counter where guests look first, so they stop opening every drawer.", "61l2J2GyF8L", False, ""),
 ("B0FPR34XCG", "Utensil holder with silverware drawer", "Idcymoul", "Kitchen", "Organization", 41, "Nice to have", "Cleaner-friendly", "Cooking tools and silverware in one spot. Fewer drawers to search and a faster reset for your cleaner.", "71hSUzPtd9L", False, ""),
 ("B0DYYDN9HR", "Knife block set", "Brewin", "Kitchen", "Cooking", 27, "Must-have", "Guest wow", "Guests who cook judge the knives. A sharp set under $30 heads off the kitchen was poorly stocked comment.", "71o6RJD0oGL", True, "Kitchen kit"),
 ("B0CWRCCFTM", "7-piece knife set", "Brewin", "Kitchen", "Cooking", 25, "Must-have", "Guest wow", "Nearly the same Brewin set in a 7-piece listing. Buy whichever is cheaper the day you order.", "7150xxQDqDL", False, ""),
 ("B07K2RY8TJ", "7-piece steel utensil set", "Berglander", "Kitchen", "Cooking", 21, "Must-have", "Durability", "Matching steel tools on a stand look tidy in photos and last for years. No melted plastic spatulas.", "71BiKm1n6pL", False, "Kitchen kit"),
 ("B08GFR4F5T", "13-piece steel utensil set", "Berglander", "Kitchen", "Cooking", 33, "Nice to have", "Durability", "The fuller set for rentals that attract real cooks: holiday groups, families, longer stays.", "711qykG8FGL", False, ""),
 ("B0DKHFZB52", "6-piece steel utensil set", "Gymdin", "Kitchen", "Cooking", 23, "Nice to have", "Durability", "The budget pick that still covers spatula, ladle, whisk and pasta server.", "61cuJDOIBRL", False, ""),
]

# Category picks without a chosen product yet (Amazon search links). Swap for a product link when you pick one.
SEARCH = [
 ("Folding luggage rack", "Bedroom", "Furniture", 40, "Must-have", "Guest wow", "Keeps suitcases off the bed and the floor. Guests notice, and so do your bedspreads.", "folding luggage rack", True, "Starter kit"),
 ("Waterproof mattress protector", "Bedroom", "Bedding", 35, "Must-have", "Durability", "One spill without a protector can mean a new mattress. Buy 2 per bed so one is always clean.", "waterproof mattress protector", True, "Starter kit"),
 ("Medium-firm hybrid mattress", "Bedroom", "Furniture", 450, "Must-have", "Guest wow", "Comfortable beds come up in more reviews than almost anything else. Medium-firm suits the most guests.", "medium firm hybrid mattress queen", False, ""),
 ("Platform bed frame", "Bedroom", "Furniture", 180, "Must-have", "Cleaner-friendly", "No box spring needed. Pick one with enough clearance for a robot vacuum or none at all, so nothing hides underneath.", "platform bed frame queen", False, ""),
 ("Nightstand with charging station", "Bedroom", "Furniture", 60, "Nice to have", "Guest wow", "Outlets and USB ports at the bedside. One less question about where to charge.", "nightstand with charging station", False, ""),
 ("Blackout curtains", "Bedroom", "Decor", 30, "Must-have", "Guest wow", "Sleep is the product. Blackout panels fix the street light and early sunrise complaints.", "blackout curtains", False, "Starter kit"),
 ("White hotel bedding set", "Bedroom", "Bedding", 70, "Must-have", "Cleaner-friendly", "White sheets and duvet covers can be bleached, mixed between beds and replaced one piece at a time.", "white duvet cover set hotel", False, "Starter kit"),
 ("White hotel bath towels", "Bathroom", "Bedding", 45, "Must-have", "Cleaner-friendly", "Same reason as white bedding: bleachable and swappable. Keep 3 sets per bed.", "white hotel bath towels set", False, "Starter kit"),
 ("Quiet tower fan", "Bedroom", "Comfort", 60, "Nice to have", "Guest wow", "A fan in every bedroom for hot sleepers and white noise. Quiet models only.", "quiet tower fan", False, ""),
 ("55 inch smart TV", "Living room", "Electronics", 330, "Must-have", "Guest wow", "Built-in streaming apps so guests log into their own accounts. Add a note to sign out at checkout.", "55 inch smart tv", False, ""),
 ("Multi-port charging station", "Living room", "Electronics", 30, "Nice to have", "Guest wow", "A charging hub on the coffee table or desk for groups with phones, watches and tablets.", "multi port usb c charging station", False, ""),
 ("Keypad smart lock", "Entry", "Safety", 150, "Must-have", "Safety", "Unique codes per guest, no lost keys, no lockbox. The base of a good self check-in.", "keypad smart lock deadbolt", True, "Starter kit"),
 ("Smoke and CO alarm combo", "Whole home", "Safety", 35, "Must-have", "Safety", "Required in most places and listed on Airbnb. One per bedroom and hallway, tested every turnover.", "smoke carbon monoxide detector combo", False, "Starter kit"),
 ("Kitchen fire extinguisher", "Kitchen", "Safety", 30, "Must-have", "Safety", "Mount it near the exit, not over the stove. Shows as a safety feature on your listing.", "kitchen fire extinguisher", False, "Starter kit"),
 ("First aid kit", "Whole home", "Safety", 20, "Must-have", "Safety", "A stocked kit under the bathroom sink. Another listed safety feature that costs very little.", "first aid kit home", False, "Starter kit"),
 ("Drip and single-serve coffee maker", "Kitchen", "Appliances", 90, "Must-have", "Guest wow", "Covers both the pot-for-the-group crowd and the pod-per-person crowd.", "dual coffee maker single serve and carafe", False, "Kitchen kit"),
 ("Ergonomic desk chair", "Workspace", "Furniture", 150, "Nice to have", "Guest wow", "A real chair and desk lets you list a dedicated workspace and book more weekday stays.", "ergonomic office chair", False, ""),
 ("Outdoor string lights", "Outdoor", "Decor", 35, "Nice to have", "Guest wow", "The cheapest way to make a patio photo look like a place guests want to be at night.", "outdoor string lights", False, ""),
 ("Portable crib and play yard", "Bedroom", "Family", 70, "Nice to have", "Guest wow", "Lets you check the crib amenity, which families filter for.", "pack and play portable crib", False, ""),
 ("Iron and ironing board", "Laundry", "Laundry", 50, "Nice to have", "Durability", "Another filterable amenity. A compact over-the-door board saves closet space.", "over the door ironing board and iron", False, ""),
]

rows = []
for i, (asin, name, brand, room, cat, price, prio, tags, why, img, feat, kits) in enumerate(PRODUCTS, 1):
    rows.append(dict(id=f"p{i:03d}", status="Live", name=name, brand=brand, room=room, category=cat,
        price_tier=tier(price), approx_price=price, priority=prio, tags=tags, why=why, link_type="Product",
        amazon_url=f"https://www.amazon.com/dp/{asin}", asin=asin, image_url=IMG.format(img),
        featured="Yes" if feat else "", kits=kits, date_added="2026-10-06", notes=""))
for j, (name, room, cat, price, prio, tags, why, q, feat, kits) in enumerate(SEARCH, len(rows) + 1):
    rows.append(dict(id=f"p{j:03d}", status="Live", name=name, brand="", room=room, category=cat,
        price_tier=tier(price), approx_price=price, priority=prio, tags=tags, why=why, link_type="Search",
        amazon_url="https://www.amazon.com/s?k=" + q.replace(" ", "+"), asin="", image_url="",
        featured="Yes" if feat else "", kits=kits, date_added="2026-10-06",
        notes="Category pick. Swap in a product link when you choose one."))

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.makedirs(os.path.join(root, "data"), exist_ok=True)
with open(os.path.join(root, "data", "products.json"), "w") as f:
    json.dump(rows, f, indent=1)
with open(os.path.join(root, "scripts", "products.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS)
    w.writeheader(); w.writerows(rows)
print(len(rows), "rows")
