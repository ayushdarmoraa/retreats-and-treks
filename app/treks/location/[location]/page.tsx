import { Metadata } from 'next';
import Link from 'next/link';
import TrekCard from '@/components/TrekCard';
import { getTreksByLocation } from '@/lib/treks';
import { getLocationById, getAllLocations } from '@/lib/locations';
import { getTrekHubMetadata } from '@/lib/metadata';
import type { LocationId } from '@/config/locations';

// ── Per-location authority content ──────────────────────────
type GuideSection = { heading: string; body: React.ReactNode };

const LOCATION_GUIDES: Record<string, GuideSection[]> = {
  chakrata: [
    {
      heading: 'Why Chakrata Is Uttarakhand\u2019s Best-Kept Trekking Secret',
      body: (
        <>
          <p>Chakrata sits at roughly 2,250 metres on a limestone ridge in the Jaunsar-Bawar region of Uttarakhand, just 90 km from Dehradun. Unlike the crowded hill stations along the Mussoorie–Nainital corridor, Chakrata remains a cantonment town with restricted commercial development — no mall road, no tourist bazaar, no honking traffic jams. What you get instead is an unhurried mountain settlement surrounded by dense deodar and oak forests, open meadows, and a network of forest trails that most visitors never discover.</p>
          <p>The terrain here is fundamentally different from the high-alpine zones around Sankri or Munsiyari. Chakrata\u2019s trails wind through mid-altitude forests between 1,800 and 2,400 metres — no glacier crossings, no snow-line scrambles, no altitude sickness concerns. The landscape is defined by limestone geology: ancient cave systems like Budher Caves, seasonal waterfalls fed by underground springs, and ridge walks along forested escarpments with views stretching to the snow-capped Bandarpoonch range on clear days.</p>
          <p>This makes Chakrata uniquely positioned for weekend trekkers, first-time Himalayan visitors, and anyone seeking genuine mountain immersion without the physical intensity of a high-altitude expedition. It is the Himalayas at walking pace.</p>
        </>
      ),
    },
    {
      heading: 'Best Time to Trek in Chakrata',
      body: (
        <>
          <p><strong>Spring (February\u2013April):</strong> The premier trekking window. Daytime temperatures hover around 15\u201322\u00b0C, forests are alive with birdsong, and rhododendrons bloom at higher elevations. Trails are dry and well-defined. This is the ideal season for the Budher Caves trek and guided forest walks.</p>
          <p><strong>Monsoon (July\u2013August):</strong> Chakrata receives moderate monsoon rainfall, which transforms Tiger Fall into a thundering cascade — its most spectacular state. Forest trails become lush but slippery. The Tiger Fall trek is best attempted during or just after the monsoon when water volume peaks. Leeches are present on forest floors.</p>
          <p><strong>Autumn (September\u2013November):</strong> Clear skies, crisp mornings, and excellent visibility. The forests begin their colour shift, and the air carries a sharpness that makes ridge walks particularly rewarding. This is arguably the most comfortable season for multi-day guided treks and weekend camping.</p>
          <p><strong>Winter (December\u2013January):</strong> Chakrata receives occasional snowfall, blanketing the deodar forests in white. Trails at higher elevations may be icy. It\u2019s quieter than any other season — good for solitude seekers, though not ideal for first-time trekkers unfamiliar with cold-weather hiking.</p>
          <p>For a detailed seasonal breakdown covering both treks and retreats, see our guide: <Link href="/blog/best-time-for-retreat-in-chakrata">Best Time for a Retreat in Chakrata</Link>.</p>
        </>
      ),
    },
    {
      heading: 'Popular Treks in Chakrata',
      body: (
        <>
          <p>The <Link href="/treks/location/chakrata/weekend-trek">Chakrata Weekend Trek</Link> is the most accessible route — a 2-night, 3-day itinerary covering 8 km of forest trails, grassland meadows, and ridge campsites at around 2,100 metres. It requires no prior trekking experience and is designed for professionals, couples, and families looking for a genuine outdoor weekend without extreme physical demands. Pickup and drop from Dehradun makes it logistically effortless.</p>
          <p>The <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek</Link> leads to one of the highest direct waterfalls in the region. The 12 km route passes through dense forest before reaching the falls, where a natural pool allows swimming in the right season. This is a moderate trek best done in the monsoon and post-monsoon months (July\u2013October) when water volume is at its peak.</p>
          <p>The <Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves Trek</Link> is Chakrata\u2019s most distinctive offering — a 10 km trail through oak forest to a network of ancient limestone caves. The caves hold local historical significance and offer a rare combination of trekking and underground exploration. Moderate difficulty, best in spring and autumn when cave conditions are dry.</p>
          <p>For those wanting a curated experience with local ecological interpretation, the <Link href="/treks/location/chakrata/guided-treks">Chakrata Guided Treks</Link> programme offers flexible 1\u20133 day itineraries with expert naturalists who know every trail, viewpoint, and bird call in the region.</p>
        </>
      ),
    },
    {
      heading: 'Difficulty & Terrain Overview',
      body: (
        <>
          <p>Chakrata treks range from easy to moderate — there is nothing here that demands mountaineering skill or high-altitude acclimatisation. The terrain character is distinctly different from the alpine zones of Sankri or the glacial approaches of Kumaon:</p>
          <p><strong>Forest trails (1,800\u20132,200 m):</strong> Well-shaded paths through deodar, oak, and pine forest. The canopy cover makes these trails comfortable even in warm months. The understorey is rich with ferns, moss, and wildflowers — the forest floor is the attraction, not just the destination.</p>
          <p><strong>Ridge walks (2,200\u20132,400 m):</strong> Chakrata\u2019s defining terrain. The limestone ridge offers exposed viewpoints with panoramic sightlines to the Greater Himalayan range. Wind can be brisk at ridge level, but the walking is on firm, undulating ground with minimal scrambling.</p>
          <p><strong>Cave systems:</strong> The Budher Caves require basic agility — ducking through low passages, navigating uneven rock floors. No climbing gear is needed, but a headlamp and comfort in enclosed spaces are essential. Guides provide safety briefings and light sources.</p>
          <p><strong>Waterfall approaches:</strong> The final descent to Tiger Fall involves steep, sometimes slippery terrain, especially in wet conditions. Trekking poles and proper footwear with grip are recommended. River crossings on this route are minor compared to the glacier-fed rivers of higher-altitude treks.</p>
        </>
      ),
    },
    {
      heading: 'How to Reach Chakrata',
      body: (
        <>
          <p><strong>From Delhi:</strong> Drive or take a bus to Dehradun (250 km, 5\u20136 hours). From Dehradun, Chakrata is just 90 km — approximately 3 to 3.5 hours on a winding mountain road via Mussoorie bypass and Dhaula Kuan. This is Chakrata\u2019s single biggest advantage over remote bases like Sankri: you can leave Delhi on Friday evening and be on a forest trail by Saturday morning.</p>
          <p><strong>From Dehradun:</strong> The road climbs steadily through Vikasnagar and into the Jaunsar hills. Road quality is good until the final 20 km, which is narrow but paved. No mountain passes or high-altitude road sections — the drive itself is gentle compared to routes deeper into Garhwal.</p>
          <p><strong>Weekend logistics:</strong> Our guided treks include Dehradun pickup and drop, which means you don\u2019t need to arrange mountain transport separately. For self-drivers, parking is available at the cantonment. The last reliable fuel stop is Vikasnagar — fill up before the climb.</p>
          <p><strong>Permits:</strong> No forest permits are required for standard treks around Chakrata. The Budher Caves area may require a nominal entry fee at the forest check-post, handled by guides as part of the trek package.</p>
        </>
      ),
    },
    {
      heading: 'Chakrata vs Sankri: Different Mountains, Different Journeys',
      body: (
        <>
          <p>Visitors frequently compare Chakrata and Sankri since both are Uttarakhand trekking destinations accessible from Dehradun. But they serve fundamentally different needs, and choosing between them is not about which is better — it\u2019s about what you\u2019re looking for.</p>
          <p><strong>Elevation and intensity:</strong> Sankri treks reach 3,500\u20133,800 metres with genuine alpine exposure — snow, wind, altitude. Chakrata\u2019s highest point is around 2,400 metres. There is no overlap in difficulty. Chakrata is gentle; Sankri demands preparation.</p>
          <p><strong>Duration:</strong> Chakrata is a weekend destination — leave Friday, return Sunday. Sankri requires a minimum 5\u20137 day commitment including travel. If your window is 2\u20133 days, Chakrata is the only viable option.</p>
          <p><strong>Character:</strong> Sankri is a remote basecamp village in the Tons Valley, launching point for expedition-style treks. Chakrata is a forested ridge town with trails radiating out from the settlement itself. Sankri gives you wilderness; Chakrata gives you a gentler communion with mountains.</p>
          <p><strong>Who should choose Chakrata:</strong> First-time trekkers, families with children, professionals wanting a weekend reset, anyone combining a trek with a <Link href="/retreats/chakrata">wellness retreat</Link>. Explore our detailed <Link href="/blog/chakrata-vs-sankri">Chakrata vs Sankri comparison</Link> for the full breakdown.</p>
          <p><strong>Who should choose <Link href="/treks/location/sankri">Sankri</Link>:</strong> Experienced trekkers seeking snow summits, multi-day wilderness immersion, or classic Himalayan expeditions like Kedarkantha and Har Ki Dun.</p>
        </>
      ),
    },
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <p><strong>Is Chakrata good for first-time trekkers?</strong> It is one of the best places in India to start Himalayan trekking. Easy-to-moderate terrain, low altitude, short durations, and proximity to Dehradun make it ideal for beginners. No prior mountain experience is needed for the weekend trek.</p>
          <p><strong>Can I visit Chakrata for just a weekend?</strong> Absolutely — that\u2019s exactly what Chakrata is built for. A Friday-to-Sunday itinerary gives you a full trek day, a campsite night, and forest walking. Our weekend trek packages include Dehradun transfers.</p>
          <p><strong>Is Chakrata safe for families and children?</strong> Yes. The trails are forested and sheltered, altitude is manageable, and there are no technical sections. Children aged 8 and above can comfortably complete the weekend trek with guided supervision.</p>
          <p><strong>What should I pack?</strong> Layered clothing (temperatures drop after sunset even in spring), sturdy shoes with ankle support, a headlamp for the Budher Caves, rain jacket for monsoon treks, and sun protection for ridge walks. Full gear lists are provided in trek booking confirmations.</p>
          <p><strong>Can I combine a trek with a retreat?</strong> This is one of Chakrata\u2019s strongest offerings. A 2-day trek followed by a 2-day <Link href="/retreats/chakrata">wellness retreat</Link> gives you both adventure and recovery in a single long weekend. It\u2019s a combination that isn\u2019t practical at more remote bases like Sankri.</p>
        </>
      ),
    },
  ],
  munsiyari: [
    {
      heading: 'Why Munsiyari Is the Gateway to the High Himalaya',
      body: (
        <>
          <p>Munsiyari sits at approximately 2,200 metres on a natural balcony in the Kumaon Himalayas, directly facing the five summits of the Panchachuli massif (6,312–6,904 m). Unlike Garhwal trekking bases such as Sankri or Uttarkashi, Munsiyari belongs to the eastern Himalayan corridor of Uttarakhand — a region shaped by the ancient Johar Valley trade route that once connected Kumaon to Tibet through the Milam and Ralam passes.</p>
          <p>The town retains a frontier character that most Himalayan destinations have long lost. There is no mall road, no resort strip, no queue at a viewpoint. What exists instead is a working mountain settlement where Johari Bhotiya families maintain traditions of wool trade, pastoral migration, and mountain guiding that predate colonial records. The Goriganga River carves through the valley below, fed by the Milam, Ralam, and Namik glaciers — the same glaciers that define the trekking routes radiating from this basecamp.</p>
          <p>Munsiyari&apos;s elevation profile is fundamentally higher than Chakrata or even Sankri. Treks here begin above 2,200 metres and push towards 3,600–4,000 metres within days, entering glacial terrain that demands genuine physical preparedness. This is not weekend trekking. This is the high Himalaya — exposed, remote, and profoundly rewarding for those who come prepared.</p>
        </>
      ),
    },
    {
      heading: 'Best Time to Trek in Munsiyari',
      body: (
        <>
          <p><strong>Late spring (May–June):</strong> The premier trekking window. Snow recedes above 3,500 metres, high passes become navigable, and the Panchachuli range is visible with extraordinary clarity in the pre-monsoon light. Wildflowers blanket the alpine meadows between Munsiyari and the glacier basecamps. Daytime temperatures at town elevation reach 20–25°C, dropping sharply above 3,000 metres.</p>
          <p><strong>Post-monsoon (September–October):</strong> The second-best window. Kumaon receives heavy monsoon rainfall through August, but by mid-September the skies clear to reveal the sharpest mountain views of the year. Autumn colour transforms the birch and oak forests, and trail conditions stabilise. This is the quietest season — fewer groups, more solitude.</p>
          <p><strong>Winter (November–February):</strong> Munsiyari itself receives snowfall, and the road from Birthi Falls onward becomes treacherous or impassable. Higher trails are buried under deep snow. Only experienced winter mountaineers should consider this season, and only with fully self-supported expedition logistics. The town largely shuts down for tourism.</p>
          <p><strong>Monsoon (July–August):</strong> Not recommended for trekking. The Kumaon Himalaya receives some of the heaviest monsoon precipitation in Uttarakhand. Trails become dangerously slippery, river crossings swell, and landslides routinely block the road between Thal and Munsiyari. Leech activity is intense in forested sections below 3,000 metres.</p>
        </>
      ),
    },
    {
      heading: 'Popular Treks from Munsiyari',
      body: (
        <>
          <p><strong>Khaliya Top Trek:</strong> The most accessible route from Munsiyari — a steady climb through dense rhododendron and oak forest to an alpine meadow at approximately 3,500 metres. The summit meadow offers an unbroken 180-degree panorama of the Panchachuli range, Nanda Devi East, and the Rajrambha peaks. This is a 2-day out-and-back trek suitable for fit beginners, and the closest Munsiyari comes to a &quot;short trek&quot; — though at this altitude, even short means demanding.</p>
          <p><strong>Milam Glacier Trek:</strong> A 7–9 day expedition following the Goriganga River to the snout of the Milam Glacier at approximately 3,450 metres. The route passes through the abandoned trading village of Milam and traces the historic Johar trade route to the Tibetan border. This trek requires Inner Line Permits (issued at the Munsiyari SDM office) and is restricted to Indian nationals for sections near the border. The terrain is glacial moraine, river crossings on improvised bridges, and exposed valley walking — a genuine expedition, not a guided nature walk.</p>
          <p><strong>Ralam Glacier Trek:</strong> A less-frequented alternative to Milam, the Ralam route follows the Ralam River to its glacial source at roughly 3,600 metres. The trail passes through pristine birch forests and moraine fields with virtually no other trekking groups. This is Munsiyari at its most remote — 6–8 days with no resupply points, no mobile coverage, and no shortcuts. Inner Line Permits are required.</p>
          <p><strong>Nanda Devi Base Camp (via Munsiyari approach):</strong> Advanced-level expedition trekking towards the eastern approaches of the Nanda Devi Sanctuary. This is not a standard commercial trek but a serious mountaineering approach requiring permits, experienced guides, and full expedition logistics. The route offers some of the most dramatic high-altitude scenery in the Indian Himalaya.</p>
        </>
      ),
    },
    {
      heading: 'Terrain & Difficulty Profile',
      body: (
        <>
          <p>Munsiyari treks operate in a fundamentally different terrain band than <Link href="/treks/location/chakrata">Chakrata</Link> or <Link href="/treks/location/sankri">Sankri</Link>. The difficulty floor here is higher, the exposure greater, and the safety margin thinner. Understanding the terrain zones is essential for preparation:</p>
          <p><strong>Subalpine forest (2,200–3,000 m):</strong> Dense oak, rhododendron, and birch forest with steep, rooty trails. These sections are sheltered from wind but demanding on the legs — consistent uphill gradient with few flat sections. Leeches are present during and after monsoon.</p>
          <p><strong>Alpine meadows and treeline (3,000–3,500 m):</strong> Above the forest canopy, the terrain opens to exposed grasslands and rocky ground. Weather changes rapidly at this altitude — clear mornings can turn to hail or whiteout within an hour. The Khaliya Top trek culminates in this zone.</p>
          <p><strong>Glacial moraine and river valleys (3,000–4,000 m):</strong> The Milam and Ralam glacier routes traverse loose rocky moraine, glacial rubble, and braided river beds. Footing is unstable. River crossings — over log bridges or by wading — are required at multiple points. Water levels fluctuate daily with glacial melt, making afternoon crossings significantly more dangerous than morning ones.</p>
          <p><strong>Who this terrain suits:</strong> Munsiyari treks are not beginner-friendly. The Khaliya Top trek is accessible to fit, determined first-timers, but the glacier treks require prior multi-day Himalayan experience, comfort with altitude above 3,000 metres, and the physical endurance for 6–8 consecutive trekking days. If you are planning your first Himalayan trek, start with <Link href="/treks/location/chakrata">Chakrata</Link> or <Link href="/treks/location/sankri">Sankri</Link> and build your mountain fitness before attempting Munsiyari&apos;s glacier routes.</p>
        </>
      ),
    },
    {
      heading: 'How to Reach Munsiyari',
      body: (
        <>
          <p><strong>From Delhi:</strong> Take an overnight train or bus to Kathgodam (290 km, 7–8 hours by road, or 6 hours by Shatabdi Express). From Kathgodam, Munsiyari is a further 275 km — approximately 10 to 12 hours on mountain roads via Almora, Bageshwar, and Thal. This is not a casual drive. The road narrows progressively after Bageshwar, with hairpin switchbacks cut into steep valley walls. Allow a full day for the Kathgodam–Munsiyari leg.</p>
          <p><strong>From Kathgodam/Haldwani:</strong> Shared jeeps and state transport buses run daily to Munsiyari, departing early morning. The route passes through Almora (a useful overnight stop to break the journey) before climbing through Bageshwar and into the Goriganga valley. Road quality is acceptable to Thal; the final 90 km from Thal to Munsiyari is narrow, winding, and subject to landslide disruption during monsoon.</p>
          <p><strong>Remoteness factor:</strong> Munsiyari&apos;s access challenges are real and should be factored into trip planning. Unlike Chakrata (3 hours from Dehradun) or Sankri (10 hours from Dehradun), reaching Munsiyari requires a minimum two-day travel commitment from Delhi. This remoteness is also its greatest asset — it filters out casual traffic and preserves the authentic mountain character that defines the experience.</p>
          <p><strong>Permits:</strong> Standard treks like Khaliya Top require no permits. Glacier treks towards Milam, Ralam, or Nanda Devi approaches require Inner Line Permits, obtainable at the Munsiyari SDM (Sub-Divisional Magistrate) office. Processing takes 1–2 days. Carry passport-size photos and valid ID. Foreign nationals face additional restrictions on routes near the Indo-China border — check current regulations before planning.</p>
        </>
      ),
    },
    {
      heading: 'Munsiyari vs Sankri vs Chakrata',
      body: (
        <>
          <p>All three are Uttarakhand trekking destinations, but they serve completely different audiences y and ambitions. Choosing between them is not about quality — it&apos;s about matching the destination to your experience level, available time, and what you want from the mountains.</p>
          <p><strong>Elevation range:</strong> <Link href="/treks/location/chakrata">Chakrata</Link> operates between 1,800–2,400 m (forested ridges, no altitude concern). <Link href="/treks/location/sankri">Sankri</Link> pushes to 3,500–3,800 m (alpine meadows and snow summits). Munsiyari reaches 3,500–4,000+ m on glacier treks with genuine high-altitude exposure and glacial terrain that neither Chakrata nor Sankri approach.</p>
          <p><strong>Duration commitment:</strong> Chakrata is a weekend destination (2–3 days). Sankri requires 5–7 days including travel. Munsiyari demands 8–14 days for a glacier trek including travel — this is expedition-scale time commitment.</p>
          <p><strong>Terrain character:</strong> Chakrata offers sheltered forest trails and limestone caves on a gentle ridge. Sankri provides classic alpine trekking through meadows (<em>bugyals</em>) and snow slopes. Munsiyari delivers raw glacial valleys, moraine fields, river crossings, and exposed high-altitude terrain with minimal trail infrastructure.</p>
          <p><strong>Ideal trekker profile:</strong></p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.7 }}>
            <li><strong><Link href="/treks/location/chakrata">Chakrata</Link>:</strong> First-timers, families, weekend warriors, trek-and-retreat combos</li>
            <li><strong><Link href="/treks/location/sankri">Sankri</Link>:</strong> Intermediate trekkers seeking snow summits and alpine meadow camping</li>
            <li><strong>Munsiyari:</strong> Experienced Himalayan trekkers ready for multi-day glacier expeditions and genuine remoteness</li>
          </ul>
          <p>If you are building your trekking progression, the natural sequence is Chakrata → Sankri → Munsiyari — each step increases altitude, duration, remoteness, and reward.</p>
        </>
      ),
    },
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <p><strong>Is Munsiyari suitable for beginner trekkers?</strong> The Khaliya Top trek is accessible to fit beginners with determination and proper guidance. However, the glacier treks (Milam, Ralam) are not beginner-appropriate — they require prior Himalayan experience, comfort at altitude, and multi-day endurance. If this is your first mountain trek, consider starting at <Link href="/treks/location/chakrata">Chakrata</Link>.</p>
          <p><strong>Do I need permits for trekking in Munsiyari?</strong> Khaliya Top requires no permits. All glacier treks and routes approaching the Indo-China border require Inner Line Permits from the Munsiyari SDM office. Processing takes 1–2 days — plan accordingly and carry photo ID and passport-size photographs.</p>
          <p><strong>How long should I plan for a Munsiyari trip?</strong> For Khaliya Top: 4–5 days total (including travel). For Milam Glacier: 12–14 days. For Ralam Glacier: 10–12 days. Add buffer days for permit processing and weather contingencies. Munsiyari does not reward rushed itineraries.</p>
          <p><strong>Is there mobile coverage in Munsiyari?</strong> BSNL has intermittent coverage in Munsiyari town. Jio and Airtel are unreliable. Beyond the town — on any trek route — there is no mobile coverage whatsoever. Carry a fully charged power bank and inform family of your itinerary before departing.</p>
          <p><strong>Can I combine a trek with a retreat?</strong> Yes — our <Link href="/retreats/munsiyari">Munsiyari retreats</Link> are designed for visitors who want contemplative mountain time without the physical intensity of a glacier expedition. A Khaliya Top trek pairs well with a subsequent retreat for those wanting both adventure and stillness.</p>
        </>
      ),
    },
  ],
  sankri: [
    {
      heading: 'Why Sankri Is a Major Trekking Base in Uttarakhand',
      body: (
        <>
          <p>Sankri sits at approximately 1,950 metres in the Tons Valley of Uttarakhand, within the buffer zone of Govind Pashu Vihar National Park. The village serves as the primary basecamp for several of India&apos;s most celebrated Himalayan treks. The Supin River runs through the valley below, feeding alpine meadows (locally called <em>bugyals</em>) that stretch up to 3,800 metres and beyond.</p>
          <p>What makes Sankri exceptional as a trekking base is its combination of accessibility and genuine remoteness. Unlike towns closer to Mussoorie or Rishikesh, Sankri retains the character of a working mountain village — no tourist strip, no commercial noise. Yet it is reachable by road from Dehradun in a single day, making it practical for guided expeditions departing from Delhi or Chandigarh.</p>
          <p>The terrain around Sankri is remarkably diverse: dense oak and rhododendron forests at lower elevations give way to open meadows, moraines, and snow-covered ridgelines above the treeline. This range supports treks from moderate valley explorations to challenging winter summit attempts — all originating from the same basecamp.</p>
        </>
      ),
    },
    {
      heading: 'Best Time to Trek in Sankri',
      body: (
        <>
          <p><strong>Winter (December–February):</strong> The premier season for snow treks. Kedarkantha and surrounding ridges receive reliable snowfall, creating conditions ideal for summit attempts. Night temperatures drop to −10°C at higher camps. This is peak season for guided groups and requires proper cold-weather gear.</p>
          <p><strong>Spring (March–April):</strong> Snow begins to recede at lower elevations. Rhododendron forests burst into bloom between 2,500–3,200 metres, creating one of the most visually striking trekking windows. Trails are quieter than winter, and temperatures are mild during the day.</p>
          <p><strong>Summer (May–June):</strong> Clear skies and long days make this the best window for high-altitude exploration and photography. Snow persists only above 3,500 metres. The Har Ki Dun valley is particularly rewarding in early summer when wildflowers carpet the meadows.</p>
          <p><strong>Monsoon (July–August):</strong> Not recommended. Heavy rainfall makes trails slippery and river crossings dangerous. Leeches are active in forested sections. Road access from Dehradun is frequently disrupted by landslides.</p>
          <p><strong>Autumn (September–November):</strong> Golden meadow grasses, crisp air, and excellent visibility. A quieter alternative to winter with fewer groups on the trail. Early snow may appear on higher ridges by late November, offering a preview of winter conditions.</p>
        </>
      ),
    },
    {
      heading: 'Popular Treks from Sankri',
      body: (
        <>
          <p>The <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek</Link> is Sankri&apos;s most well-known route — a 5-day winter snow trek culminating at 3,810 metres with panoramic views of Swargarohini, Bandarpoonch, and Black Peak. It is widely considered one of the best introductory snow treks in India, though the summit day demands genuine physical effort and altitude acclimatisation.</p>
          <p>The <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek</Link> follows the Supin River valley to a remote cradle-shaped glacial valley at 3,566 metres. This is a different kind of trek — slower, more contemplative, passing through ancient villages like Osla and Seema where traditional timber architecture and pastoral culture remain intact. It rewards patience rather than peak-bagging ambition.</p>
          <p>For a deeper comparison of these two routes, see our guide: <Link href="/blog/kedarkantha-vs-har-ki-dun">Kedarkantha vs Har Ki Dun — Which Trek Should You Choose?</Link></p>
        </>
      ),
    },
    {
      heading: 'Difficulty & Terrain Overview',
      body: (
        <>
          <p>Treks from Sankri span moderate to challenging difficulty. The terrain transitions through four distinct zones as you gain elevation:</p>
          <p><strong>Forest trails (1,950–2,800 m):</strong> Dense oak, pine, and rhododendron forest with well-defined paths. Moderate gradient. These sections are shaded and relatively sheltered from wind.</p>
          <p><strong>Alpine meadows / bugyals (2,800–3,400 m):</strong> Open grasslands with expansive views. Terrain becomes exposed to weather. Snow cover is common from November through March.</p>
          <p><strong>Snow and moraine (3,400–3,800 m):</strong> Above the treeline, trails cross snowfields in winter and loose rocky moraine in summer. Proper footwear and trekking poles are essential. Summit approaches require early morning starts to manage snow conditions.</p>
          <p><strong>River crossings:</strong> The Supin and its tributaries must be crossed at several points on the Har Ki Dun route. In summer, meltwater raises river levels — guided groups use established crossing points with safety protocols.</p>
        </>
      ),
    },
    {
      heading: 'How to Reach Sankri',
      body: (
        <>
          <p><strong>From Delhi:</strong> Take an overnight bus or train to Dehradun (250 km, 5–6 hours by road). From Dehradun, Sankri is a 200 km drive via Mussoorie, Purola, and Mori — approximately 10–11 hours on mountain roads. Most guided groups arrange shared transport from Dehradun.</p>
          <p><strong>From Dehradun:</strong> The road follows NH-507 through the Yamuna valley before turning north into the Tons valley. Road quality is reasonable until Purola; the final stretch to Sankri is narrow and winding but paved. During monsoon, landslide delays are common between Naugaon and Mori.</p>
          <p><strong>Permits:</strong> Treks entering Govind Pashu Vihar National Park require a forest permit, obtainable at the Sankri forest check-post. Guided operators handle this as part of the trek package. Carry valid photo ID (Aadhaar or passport for foreign nationals).</p>
        </>
      ),
    },
    {
      heading: 'Sankri vs Other Trekking Bases',
      body: (
        <>
          <p><strong>Sankri vs <Link href="/treks/location/chakrata">Chakrata</Link>:</strong> Chakrata is closer to Dehradun (3–4 hours) and better suited for weekend treks and beginner-friendly trails. Sankri offers longer, more remote routes at higher altitudes — it is the choice when you want genuine wilderness rather than a quick escape. See also our <Link href="/blog/chakrata-vs-sankri">Chakrata vs Sankri comparison</Link>.</p>
          <p><strong>Sankri vs Munsiyari:</strong> Both are remote Himalayan basecamps, but Munsiyari sits in the Kumaon region with access to the Panchachuli range and Milam Glacier. Sankri&apos;s advantage is better road access from Delhi/Dehradun and more reliable winter snow conditions for summit treks.</p>
        </>
      ),
    },
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <p><strong>Is Sankri safe for solo trekkers?</strong> The trails are well-established but remote. We strongly recommend guided groups, especially in winter when route-finding in snow requires experience. Mobile coverage is absent beyond Sankri village.</p>
          <p><strong>Do I need prior trekking experience?</strong> Kedarkantha is suitable for first-time Himalayan trekkers with reasonable fitness. Har Ki Dun requires more endurance due to its length but is technically easier. Both benefit from pre-trek cardio preparation.</p>
          <p><strong>What about altitude sickness?</strong> Maximum elevations on Sankri treks (3,500–3,800 m) are moderate by Himalayan standards. Proper acclimatisation is built into guided itineraries. Symptoms are uncommon if you follow the pacing and hydration guidance.</p>
          <p><strong>Can I combine a trek with a retreat?</strong> Yes — our <Link href="/retreats/sankri">Sankri retreats</Link> are designed to pair with trekking itineraries. Many guests do a 5-day trek followed by a 3-day rest and integration retreat.</p>
        </>
      ),
    },
  ],
};

// ── Page component ──────────────────────────────────────────

interface PageProps {
  params: Promise<{ location: string }>;
}

export function generateStaticParams(): { location: string }[] {
  return getAllLocations()
    .filter((loc) => loc.supportsTreks)
    .map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  return getTrekHubMetadata(locationId);
}

export default async function TrekHubPage({ params }: PageProps) {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  const locationData = getLocationById(locationId);
  const treks = getTreksByLocation(locationId);

  if (!locationData) {
    return (
      <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Location not found</h1>
        <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
          ← Back to all treks
        </Link>
      </main>
    );
  }

  const guideSections = LOCATION_GUIDES[locationId] || [];

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* BREADCRUMB + H1 */}
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
          <a href="/treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Treks</a> &nbsp;→&nbsp; {locationData.name}
        </div>
        <h1 style={{ marginBottom: '0.75rem' }}>Treks Around {locationData.name}</h1>
      </section>

      {/* AUTHORITY GUIDE SECTIONS */}
      {guideSections.length > 0 ? (
        guideSections.map((section, i) => (
          <section key={i} style={{ marginBottom: '2.5rem', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{section.heading}</h2>
            {section.body}
          </section>
        ))
      ) : (
        <section style={{ marginBottom: '2.5rem', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
            {locationData.name} is a trekking destination in the Indian Himalayas. Explore the available treks below or discover <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>retreats in {locationData.name}</Link>.
          </p>
        </section>
      )}

      {/* TREK CARDS */}
      <section style={{ marginBottom: '3rem', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem' }}>Available Treks</h2>
        {treks.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {treks.map((trek) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/location/${trek.locationId}/${trek.slug}`}
                />
              ))}
            </div>
            <Link href="/treks" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.95rem' }}>
              Browse treks across locations →
            </Link>
          </>
        ) : (
          <p style={{ color: 'var(--color-muted)' }}>No treks available at this location yet.</p>
        )}
      </section>

      {/* RELATED EXPERIENCES */}
      <section style={{ marginBottom: '2rem', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
          {locationData.name} also offers{' '}
          <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
            wellness retreats and meditation experiences
          </Link>.
        </p>
      </section>

      {/* SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to book a trek?</p>
        <a
          href={`https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20am%20interested%20in%20a%20trek%20in%20${encodeURIComponent(locationData.name)}.`}
          style={{ display: 'inline-block', padding: '0.75rem 1.25rem', backgroundColor: 'var(--color-primary)', color: '#ffffff', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}
        >
          Chat on WhatsApp
        </a>
      </section>
    </main>
  );
}

