import { Metadata } from 'next';
import Link from 'next/link';
import TrekCard from '@/components/TrekCard';
import Breadcrumb from '@/components/Breadcrumb';
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
  lohajung: [
    {
      heading: 'Why Lohajung Is Garhwal\u2019s Premier Trek Base',
      body: (
        <>
          <p>Lohajung is a quiet roadhead village at 2,350 metres in Chamoli district, perched on a ridge that overlooks the Wan valley and the white peaks of the Nanda Devi region beyond. It is not a town that exists for tourists — there is no market, no hotel strip, no commercial infrastructure. Lohajung exists because the road ends here, and two of the most celebrated trekking routes in the Indian Himalayas begin from its outskirts.</p>
          <p>The <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal winter trek</Link> and the <Link href="/treks/location/lohajung/roopkund-trek">Roopkund mystery lake expedition</Link> both launch from Lohajung, making it the common base camp for Garhwal&apos;s frozen lake and mystery lake routes. The village sits at the sweet spot between accessible (10 hours from Rishikesh by road) and remote (far enough from any tourist corridor that the mountains feel genuinely wild). This combination — real mountain solitude with road access — is what makes Lohajung work as a trekking base.</p>
          <p>If you are planning a trek in the <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>, Lohajung is where the Brahmatal and Roopkund journeys begin.</p>
        </>
      ),
    },
    {
      heading: 'Treks from Lohajung',
      body: (
        <>
          <p>The <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek</Link> is a 4-day, 22 km route through oak and rhododendron forest to the frozen Brahmatal lake at 3,850 metres. Rated moderate, it is Garhwal&apos;s best winter trek — snow-covered ridges, frozen alpine lakes, and continuous views of Trishul and Nanda Ghunti. The trail is non-technical and well-supported, making it accessible to first-time high-altitude trekkers with reasonable fitness. Best season: December to March.</p>
          <p>The <Link href="/treks/location/lohajung/roopkund-trek">Roopkund Trek</Link> is a 7-day, 53 km expedition to the glacial Roopkund Lake at 4,800 metres — one of the most iconic high-altitude routes in India. The trek crosses the vast Bedni Bugyal alpine meadow, ascends through exposed high-altitude terrain, and reaches the mystery lake famous for its ancient skeletal remains. Rated challenging, it requires prior high-altitude experience and strong fitness. Best season: May–June and September–October.</p>
          <p>Both treks share the first section of trail out of Lohajung before diverging — so the village truly functions as a common gateway to two very different mountain experiences.</p>
        </>
      ),
    },
    {
      heading: 'Best Time to Trek from Lohajung',
      body: (
        <>
          <p><strong>Winter (December–March):</strong> The Brahmatal window. Snow blankets the trail above 2,800 metres, lakes freeze solid, and mountain visibility is at its sharpest. Night temperatures drop to −10°C at camp. This is Lohajung&apos;s signature season — quieter than the <Link href="/treks/winter-treks-uttarakhand">winter treks near Sankri</Link> and equally rewarding.</p>
          <p><strong>Pre-monsoon (May–June):</strong> The Roopkund window. Snow line retreats above 4,000 metres, opening the high passes. Temperatures are warm at lower elevations, with afternoon cloud build-up common. The alpine meadows at Bedni Bugyal and Ali Bugyal are carpeted in wildflowers.</p>
          <p><strong>Monsoon (July–August):</strong> Not recommended. Heavy rainfall, trail erosion, leech activity in forests, and zero visibility above treeline. All guided operations suspend.</p>
          <p><strong>Post-monsoon (September–October):</strong> The secondary Roopkund window. Sharper visibility than pre-monsoon, cooler temperatures, golden meadow grasses. A less crowded alternative to the May–June season. Snow begins returning to higher ridges by late October.</p>
        </>
      ),
    },
    {
      heading: 'How to Reach Lohajung',
      body: (
        <>
          <p><strong>From Rishikesh:</strong> Lohajung is approximately 220 km from Rishikesh — a 10-hour drive via Karnaprayag and Dewal on NH-7 and state roads. The road is paved but narrow in the final section. Shared taxis and state transport buses run daily from Rishikesh.</p>
          <p><strong>From Delhi:</strong> Take a train or bus to Haridwar or Rishikesh (5–6 hours), then road transport to Lohajung. Total door-to-door from Delhi is approximately 14–16 hours. Most guided groups arrange shared transport from Rishikesh or Kathgodam.</p>
          <p><strong>Road conditions:</strong> The road is reliable in winter (Brahmatal season) and pre-monsoon (Roopkund season). During monsoon, landslide disruptions are common between Dewal and Lohajung. The last reliable fuel stop is at Tharali — fill up before the final stretch.</p>
          <p><strong>Accommodation:</strong> Lohajung has basic guesthouses and a few lodges. Most guided treks include one night in Lohajung before the trek start. Do not expect hotel-grade facilities — this is a working village, not a resort town.</p>
        </>
      ),
    },
    {
      heading: 'Difficulty &amp; Terrain Overview',
      body: (
        <>
          <p>Treks from Lohajung span moderate to challenging, with terrain that progresses through four distinct zones:</p>
          <p><strong>Forest trails (2,350–3,000 m):</strong> Dense oak and rhododendron forest with well-defined paths. Sheltered from wind, these sections are comfortable even in cold months. The canopy is particularly beautiful in spring (rhododendron bloom) and winter (snow-laden branches).</p>
          <p><strong>Alpine meadows / bugyals (3,000–3,500 m):</strong> Open grasslands — Bedni Bugyal and Ali Bugyal on the Roopkund route are among the largest alpine meadows in India. Terrain is exposed with panoramic views. Snow cover is common from November through April.</p>
          <p><strong>High-altitude zone (3,500–4,800 m):</strong> Above the treeline. Rocky moraine, snow, and exposed ridges. The Roopkund approach above 4,000 metres is genuinely challenging — steep gradients, thin air, and weather that can change in minutes. Only for experienced trekkers.</p>
          <p><strong>Frozen lakes:</strong> Both Brahmatal and Roopkund are glacial lakes. In winter, Brahmatal freezes solid — trekkers camp near the lake edge. Roopkund is typically frozen or partially frozen depending on season. No swimming, no water collection from the lake.</p>
        </>
      ),
    },
    {
      heading: 'Which Lohajung Trek Is Right for You?',
      body: (
        <>
          <p>Both routes from Lohajung are excellent, but they serve very different trekkers:</p>
          <p><strong>Choose <Link href="/treks/location/lohajung/brahmatal-trek">the Brahmatal winter trek</Link> if:</strong> You want a snow experience at moderate difficulty, this is your first Garhwal trek, you have 4 days on trail, or you prefer the December–March window. Brahmatal is one of the <Link href="/treks/winter-treks-uttarakhand">best winter treks in Uttarakhand</Link> for a reason — it delivers dramatic snow scenery without extreme altitude demands.</p>
          <p><strong>Choose <Link href="/treks/location/lohajung/roopkund-trek">the Roopkund mystery lake expedition</Link> if:</strong> You have prior high-altitude experience above 4,000 m, you want a 7-day wilderness expedition, you are drawn to the iconic skeleton lake destination, or you prefer the May–June or September–October windows.</p>
          <p>Not sure? Our <Link href="/treks/brahmatal-vs-kuari-pass">comparison of moderate Garhwal treks</Link> helps if you are deciding between Brahmatal and Joshimath-based routes. For the challenging tier, see <Link href="/treks/roopkund-vs-pangarchulla">Roopkund vs the Pangarchulla summit climb</Link>.</p>
          <p>Both treks are part of the wider <Link href="/treks/garhwal-himalayas">Garhwal Himalayas trekking circuit</Link> — see our region guide for the full picture.</p>
        </>
      ),
    },
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <p><strong>Is Brahmatal safe for beginners?</strong> Yes. Brahmatal is moderate difficulty and suitable for first-time Himalayan trekkers with reasonable fitness. If you can jog 5 km comfortably, you are likely ready. No prior snow trekking experience is required — guides provide gaiters, microspikes, and trekking poles.</p>
          <p><strong>Is Roopkund safe?</strong> Roopkund is a challenging high-altitude trek that requires experience. With a professional guided team, proper acclimatisation schedule, and appropriate fitness, it is safe. The route avoids technical climbing — the challenge is altitude, distance, and weather exposure.</p>
          <p><strong>How far in advance should I book?</strong> Winter Brahmatal treks (December–January) should be booked 4–6 weeks ahead. Roopkund groups fill up 2–3 months in advance during the May–June window. Early booking secures your dates and allows time for fitness preparation.</p>
          <p><strong>What is the mobile network coverage?</strong> BSNL has intermittent coverage in Lohajung village. Beyond the village, there is no mobile signal on either trek route. Guided groups carry satellite communication or emergency beacons.</p>
          <p><strong>Can I combine Brahmatal and Roopkund?</strong> Not in one trip — they are different-season treks with different difficulty levels. Do Brahmatal first (winter) to get your Garhwal introduction, then return for Roopkund (pre-monsoon) with high-altitude confidence.</p>
        </>
      ),
    },
  ],
  joshimath: [
    {
      heading: 'Why Joshimath Is the Gateway to the Nanda Devi Region',
      body: (
        <>
          <p>Joshimath sits at 1,875 metres on the ancient pilgrim road to Badrinath — a mountain town with a history that predates modern trekking by centuries. It is one of the four cardinal matts established by Adi Shankaracharya and a cultural waypoint on the Char Dham pilgrimage circuit. For trekkers, Joshimath serves a different purpose: it is the most accessible launchpad for routes into the Nanda Devi Sanctuary zone, including the famed <Link href="/treks/location/joshimath/kuari-pass-trek">Lord Curzon Trail to Kuari Pass</Link> and the demanding <Link href="/treks/location/joshimath/pangarchulla-trek">summit climb to Pangarchulla Peak</Link>.</p>
          <p>Unlike the remote base villages of <Link href="/treks/location/lohajung">Lohajung</Link> or <Link href="/treks/location/sankri">Sankri</Link>, Joshimath has genuine town infrastructure — hotels, restaurants, shops, ATMs, and a cable car connection to the ski resort of Auli. This makes it a more comfortable staging point, particularly for trekkers combining a trek with visits to Badrinath, the Valley of Flowers, or Hemkund Sahib.</p>
          <p>Joshimath is a key base in the <Link href="/treks/garhwal-himalayas">Garhwal Himalayas trekking</Link> network — connecting the ridge walks and summit routes of Chamoli to the broader Uttarakhand trail system.</p>
        </>
      ),
    },
    {
      heading: 'Treks from Joshimath',
      body: (
        <>
          <p>The <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass Trek</Link> is a 5-day, 30 km ridge walk to the historic Kuari Pass at 3,876 metres. First explored by Lord Curzon in the early 1900s, the route follows a high ridge offering near-continuous views of Nanda Devi (7,816 m), Dronagiri, Chaukhamba, and Kamet. Rated moderate with no technical sections, this is widely considered the finest view-to-effort ratio of any trek in Uttarakhand. An excellent choice for trekkers seeking Himalayan grandeur without extreme altitude. Best season: March–May and October–November.</p>
          <p>The <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla Peak Trek</Link> extends the Kuari Pass route with a true summit push to 4,590 metres. The final day involves a steep snow-and-scree ascent with a 3 AM alpine start, rewarded by a 360° panorama of the Nanda Devi Sanctuary. Rated challenging, it requires prior high-altitude experience above 4,000 metres and strong fitness. This is one of the few accessible peak summits in the <Link href="/treks/garhwal-himalayas">Garhwal Himalaya trekking region</Link>. Best season: March–May.</p>
          <p>The two routes share common approach trail out of Dhak village, beyond Joshimath. Kuari Pass turns toward Auli on descent; Pangarchulla diverges for the summit push from Khullara camp.</p>
        </>
      ),
    },
    {
      heading: 'Best Time to Trek from Joshimath',
      body: (
        <>
          <p><strong>Spring (March–May):</strong> The prime window for both Kuari Pass and Pangarchulla. Retreating snow creates excellent conditions for the Pangarchulla summit push in March–April when consolidated snow provides grip. Rhododendrons bloom in the forests below 3,500 metres. Clear mornings with afternoon cloud build-up is the typical pattern. This is the recommended season for most trekkers.</p>
          <p><strong>Autumn (October–November):</strong> Outstanding for Kuari Pass. The sharpest mountain visibility of the year — the Nanda Devi range appears almost three-dimensional in the clear autumn light. Golden forest colours, crisp temperatures, and far fewer trekkers than spring. Pangarchulla is less reliable in autumn as early snow can make the summit approach unstable.</p>
          <p><strong>Winter (December–February):</strong> Kuari Pass is feasible for experienced winter trekkers with proper snow gear. Deep snow transforms the ridge walk into a more challenging proposition. Pangarchulla is generally not attempted in deep winter. Joshimath itself remains accessible — the Badrinath road is maintained to Joshimath year-round.</p>
          <p><strong>Monsoon (July–August):</strong> Not recommended for trekking. However, the Valley of Flowers (accessible from Govindghat, 25 km beyond Joshimath) is in its prime during monsoon — making Joshimath a year-round mountain destination even when treks are suspended.</p>
          <p>For more <Link href="/treks/summer-treks-uttarakhand">summer trek options across Uttarakhand</Link>, see our seasonal guide.</p>
        </>
      ),
    },
    {
      heading: 'How to Reach Joshimath',
      body: (
        <>
          <p><strong>From Rishikesh:</strong> Joshimath is approximately 270 km from Rishikesh — a 9–10 hour drive via Devprayag, Rudraprayag, and Chamoli on NH-7. Regular GMOU (Garhwal Motor Owners Union) bus services and shared taxis run daily. The road follows the Alaknanda River valley — one of the most scenic mountain drives in India.</p>
          <p><strong>From Delhi:</strong> Train to Haridwar (4–5 hours) or bus to Rishikesh (5–6 hours), then road transport to Joshimath. Total door-to-door is approximately 14–16 hours. Some guided groups arrange overnight transport to maximise trekking time.</p>
          <p><strong>Road conditions:</strong> The Rishikesh–Joshimath highway is well-maintained as it serves the Badrinath pilgrim traffic. During monsoon, landslide delays are possible between Rudraprayag and Pipalkoti, but the road is cleared quickly due to its strategic importance. Winter road conditions are generally good — the road stays open to Joshimath year-round.</p>
          <p><strong>Accommodation:</strong> Joshimath has hotels ranging from budget to mid-range. Unlike remote bases, you can expect attached bathrooms, hot water, and restaurant meals. Most guided treks include one night in Joshimath before the trek. The town also has ATMs, pharmacies, and basic trekking gear shops.</p>
        </>
      ),
    },
    {
      heading: 'Difficulty &amp; Terrain Overview',
      body: (
        <>
          <p>Treks from Joshimath span moderate to challenging, with terrain defined by Garhwal&apos;s characteristic ridge-and-valley structure:</p>
          <p><strong>Forest trails (1,875–2,800 m):</strong> Dense oak, rhododendron, and birch forest on well-maintained paths. The approach via Dhak and Gulling is sheltered and gradual — a gentle start that lets you settle into mountain rhythm before gaining altitude.</p>
          <p><strong>Ridge walking (2,800–3,876 m):</strong> The defining character of Joshimath treks. The Kuari Pass route follows a high ridge running parallel to the main Himalayan chain. This means views are continuous rather than episodic — you walk along the crest with Nanda Devi, Dronagiri, and Chaukhamba arrayed before you.</p>
          <p><strong>Summit zone (3,876–4,590 m):</strong> Pangarchulla only. Above Khullara camp, the terrain shifts to steep snow and scree. The summit push involves approximately 700 metres of elevation gain from camp in a single day, with an alpine start around 3 AM. Crampons, gaiters, and trekking poles are essential. This is genuine mountain climbing — not trail walking.</p>
          <p><strong>Auli descent:</strong> Both treks can route their descent through Auli — the ski resort connected to Joshimath by cable car. This adds variety to the return journey and avoids retracing the approach trail.</p>
        </>
      ),
    },
    {
      heading: 'Joshimath Beyond Trekking',
      body: (
        <>
          <p>Joshimath is more than a trek base — it is a mountain town with connections to some of Uttarakhand&apos;s most significant destinations:</p>
          <p><strong>Auli:</strong> Connected to Joshimath by cable car (Asia&apos;s longest), Auli is Uttarakhand&apos;s premier skiing destination in winter and a meadow viewpoint in summer. Many trekkers add a day at Auli before or after their trek.</p>
          <p><strong>Badrinath:</strong> The holy temple town, 45 km beyond Joshimath on NH-7, is one of the Char Dham pilgrimage sites. Open May–November. Trekkers with cultural interests can visit before or after their trek.</p>
          <p><strong>Valley of Flowers:</strong> Accessible from Govindghat (25 km past Joshimath), this UNESCO World Heritage Site blooms spectacularly in July–August — the opposite season from trekking. A monsoon visit to the Valley can be combined with a post-monsoon Kuari Pass trek for a double Joshimath experience.</p>
          <p>This multi-use character makes Joshimath the most versatile mountain base in the <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link> — useful across all seasons and interests.</p>
        </>
      ),
    },
    {
      heading: 'Which Joshimath Trek Is Right for You?',
      body: (
        <>
          <p>Both routes from Joshimath share the same approach via Dhak village, but they diverge into fundamentally different experiences:</p>
          <p><strong>Choose <Link href="/treks/location/joshimath/kuari-pass-trek">the Kuari Pass panoramic ridge walk</Link> if:</strong> You want the widest Himalayan panorama relative to effort, this is your first high-altitude Himalayan trek, you prefer spring or autumn dates, or you value a historic trail (the Lord Curzon route). Kuari Pass is widely considered <Link href="/treks/summer-treks-uttarakhand">one of the finest summer treks in Uttarakhand</Link>.</p>
          <p><strong>Choose <Link href="/treks/location/joshimath/pangarchulla-trek">the Pangarchulla summit challenge</Link> if:</strong> You have completed Kuari Pass or an equivalent moderate trek above 3,800 m, you want a true peak summit with crampons and an alpine start, you thrive on concentrated high-intensity climbing days, or you are trekking in March–May.</p>
          <p>For a detailed breakdown, see our <Link href="/treks/brahmatal-vs-kuari-pass">moderate trek comparison (Brahmatal vs Kuari Pass)</Link> or the <Link href="/treks/roopkund-vs-pangarchulla">challenging trek comparison (Roopkund vs Pangarchulla)</Link>.</p>
          <p>Both routes feed into the <Link href="/treks/garhwal-himalayas">Garhwal Himalayas trekking progression</Link> — a structured path from moderate to challenging that builds altitude confidence with each trek.</p>
        </>
      ),
    },
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <p><strong>Is Kuari Pass suitable for beginners?</strong> Yes. Kuari Pass is moderate difficulty and is one of the best choices for a first serious Himalayan trek. The route stays below 3,900 metres with no technical sections. Basic fitness — ability to walk 8–10 km daily on uneven terrain — is sufficient.</p>
          <p><strong>Do I need mountaineering gear for Pangarchulla?</strong> Crampons, gaiters, and trekking poles are essential for summit day. Guided operators provide safety equipment. You should bring a 4-season sleeping bag and layered clothing rated to −10°C. Prior high-altitude trekking experience is strongly recommended.</p>
          <p><strong>Can I do both Kuari Pass and Pangarchulla in one trip?</strong> Yes — Pangarchulla extends the Kuari Pass route. Some itineraries combine both, reaching Kuari Pass on day 3 and pushing to Pangarchulla summit from Khullara camp. This requires an additional 1–2 days and significantly more fitness.</p>
          <p><strong>Is Joshimath safe after the subsidence events?</strong> The subsidence (land sinking) that affected central Joshimath in 2023 impacted the town&apos;s core residential and commercial areas. The trekking routes to Dhak, Kuari Pass, and Pangarchulla are on different geological formations and were not affected. Guided operators continue to run full seasons from Joshimath. The approach road remains open year-round.</p>
          <p><strong>What is <Link href="/treks/location/chakrata">Chakrata</Link> like compared to Joshimath?</strong> Chakrata is a weekend destination at 2,250 m — close to Dehradun, easy forest trails, no high-altitude exposure. Joshimath is a serious trekking base giving access to 3,800–4,600 m routes. Choose Chakrata for a quick escape; choose Joshimath when you want genuine Himalayan scale.</p>
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

  // CTR-optimized overrides for Garhwal trek hubs
  const GARHWAL_HUB_META: Record<string, { title: string; description: string }> = {
    lohajung: {
      title: 'Treks from Lohajung (2 Routes: 3,850m–4,800m) — Brahmatal & Roopkund | Retreats And Treks',
      description:
        'Lohajung is the base for 2 Garhwal Himalaya treks: Brahmatal (3,850m, moderate, winter) and Roopkund (4,800m, challenging, summer). How to reach, best season, difficulty & booking guide.',
    },
    joshimath: {
      title: 'Treks from Joshimath (2 Routes: 3,876m–4,590m) — Kuari Pass & Pangarchulla | Retreats And Treks',
      description:
        'Joshimath is the base for 2 Garhwal Himalaya treks: Kuari Pass (3,876m, moderate, spring/autumn) and Pangarchulla Peak (4,590m, challenging, spring). Season, difficulty & planning guide.',
    },
  };

  const override = GARHWAL_HUB_META[locationId];
  if (override) {
    return {
      title: override.title,
      description: override.description,
      alternates: {
        canonical: `https://www.retreatsandtreks.com/treks/location/${locationId}`,
      },
      robots: { index: true, follow: true },
    };
  }

  return getTrekHubMetadata(locationId);
}

export default async function TrekHubPage({ params }: PageProps) {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  const locationData = getLocationById(locationId);
  const treks = getTreksByLocation(locationId);

  if (!locationData) {
    return (
      <main style={{ width: '100%', padding: '0' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontWeight: 200 }}>Location not found</h1>
          <Link href="/treks" style={{ color: 'var(--color-primary)' }}>← Back to all treks</Link>
        </div>
      </main>
    );
  }

  const guideSections = LOCATION_GUIDES[locationId] || [];

  return (
    <main style={{ width: '100%', padding: '0' }}>

      {/* ── HERO ── */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Treks', href: '/treks' },
              { name: locationData.name },
            ]}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.56rem', letterSpacing: '0.28em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7,
            }}>Trekking Base · Garhwal Himalayas</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            color: '#111111', lineHeight: 1.1,
            margin: '0 0 1.5rem',
          }}>
            Treks Around {locationData.name}
          </h1>
          {treks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
              {treks.map((trek) => (
                <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} style={{ textDecoration: 'none' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.78rem', fontWeight: 300, color: '#333333',
                    background: '#ffffff', border: '1px solid #e5e7eb',
                    borderRadius: '100px', padding: '5px 14px',
                  }}>
                    <span style={{
                      fontSize: '0.55rem', fontWeight: 600,
                      letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                      color: 'var(--color-primary)', opacity: 0.75,
                    }}>{trek.difficulty}</span>
                    {trek.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TREK CARDS ── */}
{treks.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Available Treks</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
        fontWeight: 200, letterSpacing: '-0.03em',
        color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
      }}>Available Treks</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {treks.map((trek) => {
          const TREK_IMAGES: Record<string, string> = {
            'brahmatal-trek': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80&fit=crop',
            'roopkund-trek': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop',
            'kuari-pass-trek': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80&fit=crop',
            'pangarchulla-trek': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop',
            'kedarkantha-trek': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&fit=crop',
            'har-ki-dun-trek': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop',
            'weekend-trek': 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80&fit=crop',
            'tiger-fall-trek': 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&q=80&fit=crop',
            'budher-caves-trek': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
          };
          const imgSrc = TREK_IMAGES[trek.slug] ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop';
          const isModerate = trek.difficulty?.toLowerCase() === 'moderate';

          return (
            <Link
              key={trek.slug}
              href={`/treks/location/${trek.locationId}/${trek.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column' as const,
              }}>
                {/* Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={imgSrc}
                    alt={trek.title}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                  {/* Difficulty badge over image */}
                  <span style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.58rem', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase' as const,
                    color: isModerate ? 'var(--color-primary)' : '#e65100',
                    background: isModerate ? 'rgba(247,249,247,0.95)' : 'rgba(255,250,245,0.95)',
                    border: `1px solid ${isModerate ? 'rgba(15,118,110,0.2)' : 'rgba(230,81,0,0.2)'}`,
                    borderRadius: '100px', padding: '3px 10px',
                  }}>{trek.difficulty}</span>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                  <h3 style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.92rem', fontWeight: 500,
                    color: '#111111', margin: '0 0 0.5rem',
                    lineHeight: 1.3,
                  }}>{trek.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.82rem', fontWeight: 300,
                    color: '#666666', lineHeight: 1.7,
                    margin: '0 0 1rem', flex: 1,
                  }}>{trek.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.75rem', fontWeight: 300, color: '#999999',
                    }}>{trek.duration}</span>
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.75rem', fontWeight: 500,
                      color: 'var(--color-primary)',
                    }}>View trek →</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link href="/treks" style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        color: 'var(--color-primary)', fontWeight: 500,
        textDecoration: 'none', fontSize: '0.85rem',
      }}>
        Browse treks across locations →
      </Link>
    </div>
  </section>
)}

      {/* ── AUTHORITY GUIDE SECTIONS — alternating bg ── */}
{guideSections.length > 0 ? (
  guideSections.map((section, i) => {
    const isFAQ = section.heading.toLowerCase().includes('frequently asked');
    return (
      <section key={i} style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: i % 2 === 0 ? '#f7f9f7' : '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .faq-body > p {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-left: 3px solid var(--color-primary);
            border-radius: 8px;
            padding: 1.1rem 1.25rem;
            margin: 0 0 0.75rem !important;
          }
          .faq-body > p:last-child { margin-bottom: 0 !important; }
          .faq-body > p > strong:first-child {
            display: block;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem;
            font-weight: 500;
            color: #111111;
            margin-bottom: 0.5rem;
          }
        `}</style>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>
              {isFAQ ? 'FAQ' : String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', lineHeight: 1.2,
            marginBottom: '1.75rem',
          }}>{section.heading}</h2>
          <div
            className={isFAQ ? 'faq-body' : undefined}
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              lineHeight: 1.85, color: '#555555',
            }}
          >
            {section.body}
          </div>
        </div>
      </section>
    );
  })
) : (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#555555', lineHeight: 1.85 }}>
        {locationData.name} is a trekking destination in the Indian Himalayas. Explore the available treks below or discover{' '}
        <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>retreats in {locationData.name}</Link>.
      </p>
    </div>
  </section>
)}

      {/* ── RELATED EXPERIENCES + CTA ── */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: guideSections.length % 2 === 0 ? '#ffffff' : '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--color-primary)', opacity: 0.4, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Plan Your Visit</span>
            <span style={{ width: '20px', height: '1px', background: 'var(--color-primary)', opacity: 0.4, display: 'inline-block' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#555555', lineHeight: 1.85, marginBottom: '1.75rem' }}>
            {locationData.name} also offers{' '}
            <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
              wellness retreats and meditation experiences
            </Link>.
          </p>
          <a
             href={`https://wa.me/919760446101?text=Hi%2C%20I%20am%20interested%20in%20a%20trek%20in%20${encodeURIComponent(locationData.name)}.`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-geist-sans), sans-serif',
              padding: '13px 28px',
              background: 'var(--color-primary)', color: '#ffffff',
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase' as const,
              borderRadius: '4px', textDecoration: 'none',
            }}
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
}