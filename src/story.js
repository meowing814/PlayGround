export const CHARACTERS = {
  narrator: {
    name: "Narration",
    short: "Narrator",
    role: "the desert remembers",
    color: "#d2a453",
    gem: "#d2a453",
    initials: "N",
  },
  june: {
    name: "June Calloway",
    short: "June",
    role: "the stranger",
    color: "#e6c98f",
    gem: "#e6c98f",
    initials: "JC",
  },
  clem: {
    name: "Clementine Vane",
    short: "Clem",
    role: "proprietor of the Gilded Lily",
    color: "#d2644c",
    gem: "#d2644c",
    initials: "CV",
    full: "Clementine",
    route: "The woman who kept your room.",
    quote: "I have loved you so long it has stopped being a feeling. It is a fact.",
  },
  ada: {
    name: "Dr. Ada Hale",
    short: "Ada",
    role: "physician, keeper of secrets",
    color: "#70a9a0",
    gem: "#70a9a0",
    initials: "AH",
    full: "Ada",
    route: "The woman who kept your bullet.",
    quote: "You are the only variable I cannot control.",
  },
  rosa: {
    name: "Rosa Delgado",
    short: "Rosa",
    role: "outlaw, optimist",
    color: "#d8a14d",
    gem: "#d8a14d",
    initials: "RD",
    full: "Rosa",
    route: "The woman who kept your ticket.",
    quote: "I don't share, June. Not the money. Not the horse. Not you.",
  },
  morrow: {
    name: "Silas Morrow",
    short: "Morrow",
    role: "owner of the Cinder mine",
    color: "#a38b7c",
    gem: "#a38b7c",
    initials: "SM",
  },
};

export const STARTER_STATE = {
  affection: { clem: 0, ada: 0, rosa: 0 },
  obsession: { clem: 0, ada: 0, rosa: 0 },
  clues: [],
  flags: [],
  route: null,
  focus: null,
  node: "opening_1",
  act: "PROLOGUE",
  visited: [],
  choices: 0,
  playtime: 0,
  startedAt: null,
};

export const CLUES = {
  invitation: {
    icon: "✉",
    title: "The Invitation",
    text: "“Come home before the first frost. I have kept everything of yours.” Signed only “V.” The paper smells of whiskey and lilies.",
  },
  key: {
    icon: "⚿",
    title: "Room 7",
    text: "A brass key worn smooth. The tag reads JUNE, and beneath it, in a different hand: APRIL 1888 — THE NIGHT SHE LEFT.",
  },
  ledger: {
    icon: "✚",
    title: "Ada's Ledger",
    text: "J. Calloway. Gunshot wound, left shoulder. Pulse 96. Favourite tea: black, no sugar. Fears: abandonment, small rooms, being forgotten.",
  },
  ticket: {
    icon: "▤",
    title: "Two Tickets",
    text: "El Paso, April 12th, 1888. Two seats. One name filled in: R. DELGADO. The other line is blank, but the ink is yours.",
  },
  bullet: {
    icon: "◉",
    title: "The Bullet",
    text: "A flattened slug in a glass jar, labelled J.C. Ada removed it from your shoulder herself. She has kept it polished for eighteen months.",
  },
  arsenic: {
    icon: "☠",
    title: "Arsenic Report",
    text: "Fourteen miners. The same slow poison. Every sample traces back to the Cinder mine's water. The report is written in Ada's careful hand.",
  },
  morrow_letter: {
    icon: "✉",
    title: "Morrow's Summons",
    text: "“Meet me at the mine at dawn. Come alone. The last man who asked questions is under the assay office.” Signed “M.”",
  },
  sketches: {
    icon: "✦",
    title: "A Drawer of Portraits",
    text: "Dozens of sketches of your face, dated across nineteen months. You are laughing in some. Dead in others. Clementine drew every version she could keep.",
  },
  rosa_letter: {
    icon: "✉",
    title: "The Intercepted Letter",
    text: "A letter in your hand, never sent: “Rosa — if this goes wrong, take the south road. Don't wait for me.” Rosa has carried it against her heart.",
  },
  rosa_tickets: {
    icon: "▤",
    title: "Two Tickets to Mexico",
    text: "Veracruz, first class. One for R. Delgado. One for J. Calloway. Rosa bought them the day you were shot, and has not stopped carrying them.",
  },
  letters: {
    icon: "✒",
    title: "Three Letters, One Hand",
    text: "Three letters summoned you to Cinder Gulch. Three different signatures, three different promises. The handwriting is the same. It is yours.",
  },
  scar: {
    icon: "♡",
    title: "The Scar",
    text: "A clean entry wound, left shoulder. Eighteen months old. Whatever happened at the mine, you carried it out of the dark inside your own body.",
  },
  pact: {
    icon: "♧",
    title: "The Midnight Pact",
    text: "Clementine's key. Ada's jar. Rosa's ticket. Three keepsakes on one table, and three women willing to burn Cinder Gulch down before they lose you again.",
  },
};

export const ENDINGS = [
  {
    id: "clem_lily",
    title: "The Gilded Lily",
    route: "Clementine's ending",
    color: "#d2644c",
    sigil: "✦",
    tag: "A future, freely given.",
    copy: `The sun comes up over Cinder Gulch and finds the Gilded Lily open for business.

Morrow's men do not stay for breakfast. Neither does Morrow. By noon, the whole town knows that Clementine Vane stood in her doorway with a shotgun and a smile and told the richest man in the territory to go to hell.

You sell the saloon. She sells the piano. You keep the room key, because some things are worth remembering.

“I kept your room for two years,” she says, on the train out of town. Her hand is warm in yours. “I don't intend to keep you in it.”

You laugh. The desert slides past. She looks at you like the horizon is a promise she has finally decided to believe.

Some cages are made of gold. This one was only ever a house. You walk out of it together.`,
    quote: "“I kept the room,” she says. “Not you. There is a difference.”",
    stats: ["Trust earned", "Cinder Gulch freed", "A ticket west"],
  },
  {
    id: "clem_cage",
    title: "Gilded Cage",
    route: "Clementine's ending",
    color: "#9f3f3a",
    sigil: "❖",
    tag: "She will never let you leave again.",
    copy: `Morrow's men leave. Morrow does not come back. Clementine is very good with a shotgun, and even better with the truth.

The Gilded Lily closes for the season. Then for good.

You wake in Room 7 with a headache and a new lock on the door. Your boots are gone. Your coat is gone. The window has been painted shut. There are fresh lilies in a vase and a tray of breakfast getting cold.

“You were going to leave,” Clementine says. She sits on the edge of the bed, stroking your hair. “I saw it in your face. You always look at the door before you lie to me.”

She has thought of everything. The town believes you took the morning stage. She has told them so, with tears in her eyes. She is a very good actress when the role is love.

“I'll keep you safe,” she whispers. “I'll keep you. That's the same thing, in the end.”

Outside, the desert goes on forever. In here, the days do too.`,
    quote: "“You'll forget the door,” she says. “You'll forget there ever was one.”",
    stats: ["Devotion: absolute", "Door: locked", "Room 7: forever"],
  },
  {
    id: "ada_clean",
    title: "A Clean Bill of Health",
    route: "Ada's ending",
    color: "#70a9a0",
    sigil: "✚",
    tag: "Love, examined and found sound.",
    copy: `Ada does not shoot anyone. She does something far more dangerous.

At dawn, she opens the clinic doors to the miners, the wives, the town council, and a reporter from the Santa Fe New Mexican. She lays the arsenic report on the table. She lays the bullet beside it. She explains, in her dry, precise voice, exactly how Silas Morrow has been poisoning the town that made him rich.

By sunset, Morrow is in irons. By winter, the mine belongs to the miners.

You stay for the trial. Then you stay for the winter. Then you stop pretending you are staying for any reason at all.

Ada closes the clinic in Cinder Gulch and opens a smaller one in San Francisco, above a bakery that smells of cardamom. You keep the books. She keeps a jar on the windowsill with a single flattened bullet in it, and refuses to throw it away.

“A reminder,” she says, when you ask. “That the heart is an organ. It can be wounded. It can be repaired.”

She kisses your temple, once, with the careful precision of a woman who has spent her whole life being wrong about what she needs.

“You are not a case study, June,” she murmurs. “You are the cure.”`,
    quote: "“I have no interest in owning you,” she says. “Only in keeping you alive.”",
    stats: ["Truth exposed", "Morrow convicted", "A clinic by the sea"],
  },
  {
    id: "ada_specimen",
    title: "The Specimen",
    route: "Ada's ending",
    color: "#4f8f88",
    sigil: "⌬",
    tag: "Kept under observation. Forever.",
    copy: `The arsenic report never reaches the town council.

Neither do you.

Ada locks the clinic door at dawn and draws the curtains. She has prepared for this. There is a room in the back with a clean bed, a shelf of books, and a window that looks onto a brick wall. There is a leather strap around your wrist, buckled with clinical kindness.

“You were going to leave,” she says. “Your pulse always gives you away.”

She feeds you broth and reads to you. She takes your temperature. She writes everything down. When you shout, she waits. When you cry, she holds you. When you ask to go, she explains, patiently, that you are not well.

Morrow's men come and go. Ada tells them you died. She is very convincing. She has the charts to prove it.

Some nights, she lies beside you and talks about the future. A house by the sea. A garden. A life measured in small, careful doses.

“I am not cruel,” she whispers into your hair. “I am thorough.”

The door has no handle on the inside. She has thought of everything.`,
    quote: "“You are the only patient I have ever wanted to keep,” she says.",
    stats: ["Condition: stable", "Observation: permanent", "Door: no handle"],
  },
  {
    id: "rosa_border",
    title: "South of the Border",
    route: "Rosa's ending",
    color: "#d8a14d",
    sigil: "➹",
    tag: "Two women, one horizon.",
    copy: `The dynamite takes the assay office, the payroll, and most of Morrow's dignity. Rosa takes his ledgers. You take his horse.

By the time the sun clears the mountains, you are two dust trails heading south. By the time the law thinks to follow, you are already a story.

The border is a line in the dirt and then it is behind you. Veracruz is salt air, white walls, a dog that adopts you both, and a cantina where nobody asks why two women with northern accents pay in silver.

Rosa spends the first month looking over her shoulder. The second month, she starts to laugh again. The third, she buys a fishing boat with a terrible name and no engine.

You learn her in a way you never learned her before—not as an outlaw, not as a threat, not as a woman holding a gun on a banker. Just Rosa, who burns the coffee, sings badly, and sleeps with one hand curled around your wrist as if you might dissolve.

“I don't share,” she says one night, against your shoulder. “But I'm learning how to be a person who keeps something without closing her fist around it.”

The sea keeps its own counsel. So do you.`,
    quote: "“You're not my getaway,” she says. “You're the place I'm going.”",
    stats: ["Morrow ruined", "Border crossed", "A boat with no engine"],
  },
  {
    id: "rosa_wheels",
    title: "Till the Wheels Come Off",
    route: "Rosa's ending",
    color: "#b07b2d",
    sigil: "⚙",
    tag: "One last ride. No brakes.",
    copy: `The mine payroll goes up in smoke. So does the assay office. So, almost, do you.

Rosa gets you out through the tunnel with a bullet graze and a grin. She has the ledgers. She has the money. She has a stolen carriage waiting behind the church, and two horses, and a plan that involves three states and a boat.

What she does not have is any intention of letting you out of her sight.

The handcuffs are silver, lined with velvet. “A precaution,” she says. She fastens one around your wrist and the other around hers. “Until you remember how to stay.”

You do not remember. You do not get the chance.

For a while it is glorious. Card games, cheap hotels, sunsets that look like they were painted by a liar. Rosa laughs loud and spends fast and kisses you like the world is ending. Maybe it is.

Then the roads start to look the same. The towns get smaller. The handcuffs stay on in the night. She stops asking whether you are happy and starts asking whether you are hungry.

“Where would you even go?” she asks, when you mention the door. “You don't even remember who you are without me.”

The wheels keep turning. So does your stomach. Somewhere behind you, Cinder Gulch is burning.

You are not sure either of you remembers how to stop.`,
    quote: "“Till the wheels come off,” she says. “And then we walk.”",
    stats: ["Payroll: gone", "Border: close", "Wrist: cuffed"],
  },
  {
    id: "three_of_kind",
    title: "Three of a Kind",
    route: "Everyone's ending",
    color: "#e6c98f",
    sigil: "✧",
    tag: "An impossible hand, played beautifully.",
    copy: `It is Ada who says it first, because Ada is the one who understands systems.

“We are not competing,” she says, looking at the key, the bullet, the ticket. “We are three separate solutions to the same problem. She cannot choose without losing something. So we change the problem.”

Clementine laughs. It is not a kind laugh. Then it is. “You're proposing a partnership.”

“I'm proposing a town,” Ada says.

Rosa puts her boots on the table. “I'm proposing we shoot Morrow first.”

They do. Well—they ruin him, which is worse, and the town does the rest. The Gilded Lily becomes a co-op. The clinic gets a new roof. The stable gets a sign that says, in Rosa's handwriting, NO HORSES STOLEN ON SUNDAYS.

You do not choose. You are chosen, repeatedly and exhaustingly, by three women who have decided that the only thing better than owning you is outnumbering you.

It is not simple. There are arguments. There are rules. There is a rota.

But on winter nights, when the stove is hot and the town is quiet and all three of them are arguing about cards in the next room, you feel something you have not felt since before the mine.

You feel at home. Not kept. Not chosen. Just home.

Some knots are tied to hold. Some are tied to hang. This one, somehow, is tied to all of you at once.`,
    quote: "“One of us will always find you,” Clementine says. “That's the point.”",
    stats: ["Town: shared", "Hands: full", "Heart: impossibly so"],
  },
  {
    id: "ride_on",
    title: "Ride On",
    route: "June's ending",
    color: "#b7a98e",
    sigil: "➤",
    tag: "The horizon is a kind of lover, too.",
    copy: `You choose yourself.

It is the hardest thing you have ever done, and you do it without a speech. You put the key on the bar. You put the bullet on the clinic desk. You fold the tickets and tuck them into Rosa's shirt pocket.

“I don't remember who I was,” you say. “But I know I don't want to be a thing that is kept.”

Clementine does not cry. Ada does not argue. Rosa does not follow. They stand in the doorway of the Gilded Lily and watch you ride out, and the fact that they let you go is the greatest proof of love any of them has ever offered.

You take the south road. Then the north. You sell your gun in Albuquerque and buy a notebook. You write down everything you remember, and then everything you don't. The blank pages stop frightening you.

You are not sure you will ever go back. You are not sure you need to.

Somewhere behind you, three women are learning how to live with an open door. Somewhere ahead of you, the desert is doing what it has always done: making room.

The sun comes up. You keep riding.`,
    quote: "“I am not a town,” you tell them. “I am a road.”",
    stats: ["Chosen: yourself", "Debts: settled", "Horizon: open"],
  },
  {
    id: "hunt",
    title: "The Hunt",
    route: "June's ending",
    color: "#8e3b35",
    sigil: "☠",
    tag: "They let you go. They follow.",
    copy: `You choose yourself, and for one beautiful hour, it works.

Then you hear the hooves.

Clementine rides like a woman who has never been refused. Ada rides like a woman who has calculated exactly how long it will take. Rosa rides like the devil is behind her, because as far as she is concerned, you are.

They do not shoot you. That would be wasteful. They simply keep appearing—at the next town, the next station, the next cheap hotel. A fresh key on the pillow. A tonic in your coffee. A handcuff hanging from the bedpost with a bow.

“We're not keeping you,” Clementine says, each time. “We're just making sure you're safe.”

You stop sleeping. You stop staying. You start to recognize the sound of them before you see them.

The territory is big. It is not big enough. Every road leads to a town, and every town has a saloon, and every saloon has a woman in it who knows your name.

One night, in a hotel in El Paso, you find three letters under your door. Three keys. Three tickets. Three promises.

The note is in your own handwriting: Come home.

You do not remember writing it. You do not remember home. But your hands are shaking, and the door is locked, and somewhere downstairs, someone is laughing.

Some knots are tied to hold. Some are tied to hang.`,
    quote: "“You can't outrun a town,” Ada says. “We are the town.”",
    stats: ["Chosen: yourself", "Followers: three", "Road: ending"],
  },
];

export const ENDING_BY_ID = Object.fromEntries(ENDINGS.map((ending) => [ending.id, ending]));

const castAll = ["clem", "ada", "rosa"];

export const STORY = {
  opening_1: {
    chapter: "PROLOGUE",
    place: "The Stage Road · Dusk",
    actTitle: "Cinder Gulch",
    actSub: "New Mexico Territory · October 1889",
    bg: "streetDusk",
    cast: [],
    speaker: "narrator",
    mood: "The stage road, October 1889",
    text: `The stagecoach leaves you in a cloud of red dust and does not look back.

Cinder Gulch rises out of the desert like something remembered badly: false-front buildings, a crooked water tower, and a sky the colour of a wound. Somewhere a piano is playing. Somewhere a dog is not barking.

You have a letter in your coat, a revolver you do not remember loading, and a six-month hole where your life used to be.`,
    next: "opening_2",
  },
  opening_2: {
    bg: "streetDusk",
    cast: [],
    speaker: "narrator",
    text: `The letter is soft from being read too many times.

**“June. The lilies are blooming at the Gilded Lily. Come home before the first frost. I have kept everything of yours.”**

It is signed with a single initial. You have spent three weeks deciding it must belong to an old friend, a former employer, a woman you met once in a fever.

You are wrong.`,
    next: "opening_3",
  },
  opening_3: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    text: `Three women are waiting on the boardwalk.

They are not standing together. They are arranged, deliberately, like pieces on a board: a redhead in burgundy with a saloon key hanging from her belt; a pale doctor in teal with a black bag and eyes that take your pulse from thirty feet away; an outlaw in a man's hat, twirling a ticket between her fingers.

None of them looks surprised to see you.

All three look hungry.`,
    enter: { clue: "invitation" },
    next: "opening_4",
  },
  opening_4: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "A smile with teeth in it",
    text: `“There she is.” The redhead steps off the boardwalk first. “Two years, three months, eleven days. And still wearing that coat.”`,
    next: "opening_5",
  },
  opening_5: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "ada",
    mood: "Clinical. Starving.",
    text: `“Pulse elevated. Pupils dilated. Respiration shallow.” The doctor's gaze travels over you like a hand. “You always did arrive like a fever, June.”`,
    next: "opening_6",
  },
  opening_6: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "rosa",
    mood: "Delighted, dangerous",
    text: `“Took you long enough, corazón.” The outlaw grins. A gold tooth catches the sunset. “I already packed your bag.”`,
    next: "opening_7",
  },
  opening_7: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "Off balance",
    text: `“I've never been to Cinder Gulch in my life.”`,
    next: "opening_8",
  },
  opening_8: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "A silence with a heartbeat",
    text: `The piano stops.

The three women exchange a look that is not surprise. It is something older and more careful—a shared suspicion, quickly hidden.

“Amnesia,” Ada says at last. “Or a performance.”

“Either way,” Clementine says, “she's not standing out here in the dust.”

They turn to you. Three hands, not quite offered. Three versions of the same question.`,
    next: "opening_choice",
  },
  opening_choice: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "Choose whose hand you take",
    text: `The stagecoach is already a speck on the horizon. The town is very quiet.

“Well?” Clementine says. “You're among friends.”`,
    choices: [
      {
        text: "Take Clementine's arm. The warm one.",
        sub: "She smells of whiskey and lilies. She is already smiling.",
        tag: "CLEMENTINE",
        effects: { focus: "clem", love: { clem: 1 }, obsession: { clem: 1 } },
        next: "opening_9",
      },
      {
        text: "Let Ada take your pulse.",
        sub: "Her fingers are cool. Her eyes are not.",
        tag: "ADA",
        effects: { focus: "ada", love: { ada: 1 }, obsession: { ada: 1 } },
        next: "opening_9",
      },
      {
        text: "Follow Rosa's grin.",
        sub: "She has already picked up your bag. She has not asked.",
        tag: "ROSA",
        effects: { focus: "rosa", love: { rosa: 1 }, obsession: { rosa: 1 } },
        next: "opening_9",
      },
      {
        text: "Step back from all three.",
        sub: "Keep your hands where you can see them.",
        tag: "CAREFUL",
        effects: { obsession: { clem: 1, ada: 1, rosa: 1 }, flag: "guarded" },
        next: "opening_9",
      },
    ],
  },
  opening_9: {
    bg: "streetDusk",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    get text() {
      return `Clementine leads the way to the Gilded Lily. Ada walks on your left, close enough to catch you if you fall. Rosa walks behind, close enough to catch you if you run.

The boardwalk creaks. A curtain twitches in the assay office. Above the saloon, a sign creaks in the wind: **THE GILDED LILY — ROOMS, WHISKEY, LUCK.**

You have the distinct feeling that all three of them are counting something.`;
    },
    next: "act1_card",
  },
  act1_card: {
    chapter: "ACT I",
    place: "The Gilded Lily · Night",
    actTitle: "The Gilded Lily",
    actSub: "Whiskey, luck, and three bad ideas",
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    transition: true,
    speaker: "narrator",
    mood: "The Gilded Lily, after sundown",
    text: `Inside, the air is whiskey, sawdust, and something floral doing its best to cover both.

The piano player takes one look at you and stops. The few drinkers at the bar find urgent business elsewhere. Clementine locks the door.`,
    next: "act1_1",
  },
  act1_1: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "Hostess. Predator. Hostess.",
    text: `“Sit,” Clementine says, gesturing at a table laid for four. “You look like a woman who's been dead and had to walk it off.”

There are four places set. Four glasses. One of them has your initials on it.`,
    next: "act1_2",
  },
  act1_2: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "ada",
    mood: "Opening a file",
    text: `“Before the whiskey,” Ada says, “the facts.” She sets a leather ledger on the table. “You arrived in Cinder Gulch on the ninth of April, 1888. You were shot on the eleventh. You left on the twelfth. You have been dead, officially, for eighteen months.”`,
    next: "act1_3",
  },
  act1_3: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "rosa",
    mood: "A knife under the smile",
    text: `“She's leaving out the good parts.” Rosa drops a folded ticket beside the ledger. “You promised me the biggest score in the territory. Then you went and got yourself shot before we could spend a dime.”`,
    next: "act1_4",
  },
  act1_4: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "Possessive, precise",
    text: `“You promised me a wedding,” Clementine says. She sets a brass key on the table. “Room seven. I've kept it ready. Changed the sheets every Sunday. You said you'd come back before the frost.”`,
    next: "act1_5",
  },
  act1_5: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "Touching the scar",
    text: `“I would remember a wedding,” you say. “Or a contract. Or a felony.”

Your hand finds your left shoulder before you can stop it. Under the coat, under the shirt, there is a scar shaped like a small, ugly star.`,
    next: "act1_6",
  },
  act1_6: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "ada",
    mood: "Very still",
    text: `“The bullet was mine,” Ada says. “I removed it myself. You screamed my name. Then you made me promise not to tell anyone you'd cried.”

She opens the ledger. Your name is written in it forty-one times.`,
    enter: { clue: "ledger" },
    next: "act1_choice",
  },
  act1_choice: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "Three pieces of a broken story",
    text: `The key. The ledger. The ticket. Each one is real. Each one is a door you do not remember walking through.

The three women watch you the way coyotes watch a wounded thing: not cruelly. Patiently.`,
    choices: [
      {
        text: "Examine Ada's ledger.",
        sub: "Forty-one entries. A doctor does not write that much unless she is afraid of forgetting.",
        tag: "CLUE",
        effects: {
          love: { ada: 1 },
          obsession: { ada: 1 },
          clue: "ledger",
          flag: "trusted_ada_records",
        },
        next: "act1_7",
      },
      {
        text: "Test Clementine's key.",
        sub: "Room seven. It fits the lock. It fits her hand even better.",
        tag: "CLEMENTINE",
        effects: {
          love: { clem: 1 },
          obsession: { clem: 1 },
          clue: "key",
          flag: "trusted_clem_key",
        },
        next: "act1_7",
      },
      {
        text: "Take Rosa's ticket.",
        sub: "El Paso, April 12th. Two seats. One name missing.",
        tag: "CLUE",
        effects: {
          love: { rosa: 1 },
          obsession: { rosa: 1 },
          clue: "ticket",
          flag: "trusted_rosa_ticket",
        },
        next: "act1_7",
      },
    ],
  },
  act1_7: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("trusted_clem_key")) {
        return `You turn the key over. The metal is warm from Clementine's hand.

“April the twelfth,” she says, very quietly. “You left before dawn. You didn't say goodbye. You left the key on the pillow and a note that said *I'm sorry.*”

Her voice does not crack. It simply goes somewhere else for a moment, and comes back smaller.`;
      }
      if (this._state?.flags?.includes("trusted_rosa_ticket")) {
        return `You unfold the ticket. Two seats to El Paso. The second name has been inked in, scraped out, and inked in again.

“I bought them the morning you were shot,” Rosa says. “I figured you'd wake up and we'd go. You didn't wake up for two days. Then you disappeared.”

She shrugs, as if it costs her nothing. Her knuckles are white on the table.`;
      }
      return `You open the ledger. The entries are obsessive in their precision: pulse, temperature, sleep, appetite. Favourite tea. Fears. The date you first laughed in her clinic.

“Medical necessity,” Ada says, without looking at you. “I am not a sentimental woman.”

The last line is dated the day you left. It reads: *Patient discharged against advice. Prognosis: poor. Personal prognosis: worse.*`;
    },
    next: "act1_8",
  },
  act1_8: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "Three invitations",
    text: `Clementine pours four whiskeys. Ada does not drink hers. Rosa drinks both hers and yours.

“You can't be in three places at midnight,” Clementine says. “So choose one.”

Ada folds her hands. “The clinic has a lock and a spare bed. I can keep you safe.”

Rosa tips her chair back. “I've got two horses and a plan. I can keep you *alive*.”

Clementine smiles. “I've got a room upstairs and a bottle of very good bourbon. I can keep you.”

They look at you. The clock on the wall ticks toward midnight. Outside, the wind starts to sound like something with teeth.`,
    next: "act1_route_choice",
  },
  act1_route_choice: {
    bg: "saloon",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "Midnight",
    text: `“One invitation,” you say. “One night.”

The three of them do not move. The whole saloon seems to lean in.`,
    choices: [
      {
        text: "Clementine's room. The warm one.",
        sub: "Let her remind you who you were. Or who she needs you to be.",
        tag: "CLEMENTINE",
        effects: {
          route: "clem",
          love: { clem: 1 },
          obsession: { clem: 1 },
          flag: "route_clem",
        },
        next: "clem_1",
      },
      {
        text: "Ada's clinic. The clean one.",
        sub: "Let her examine the wound. And the woman attached to it.",
        tag: "ADA",
        effects: {
          route: "ada",
          love: { ada: 1 },
          obsession: { ada: 1 },
          flag: "route_ada",
        },
        next: "ada_1",
      },
      {
        text: "Rosa's stable. The dangerous one.",
        sub: "Let her show you the plan. And the two tickets.",
        tag: "ROSA",
        effects: {
          route: "rosa",
          love: { rosa: 1 },
          obsession: { rosa: 1 },
          flag: "route_rosa",
        },
        next: "rosa_1",
      },
    ],
  },

  // ——— CLEMENTINE ROUTE ———
  clem_1: {
    chapter: "ACT II",
    place: "The Gilded Lily · After Hours",
    actTitle: "Pour Decisions",
    actSub: "Clementine's route · one room, two women",
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    transition: true,
    speaker: "clem",
    mood: "Relieved. Terrified.",
    text: `The saloon empties. Clementine turns the sign to CLOSED, draws the curtains, and locks the door with a key she keeps on a ribbon around her neck.

“There,” she says. “Now the town can't see us.”

She pours two fingers of bourbon into the glass with your initials. Her hands are not steady.`,
    next: "clem_2",
  },
  clem_2: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    mood: "A confession in a glass",
    text: `“You don't remember the night you promised me.”

It is not a question. She sits across from you, close enough that her knee brushes yours. The lamplight makes a saint of her and a liar of the shadows.

“I could tell you,” she says. “But you'd only think I made it up. And I have made up so many versions of you, June. I'd like to give you a real one.”`,
    next: "clem_choice_1",
  },
  clem_choice_1: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "june",
    mood: "The bourbon is very good",
    text: `She waits. The clock ticks. Somewhere upstairs, a floorboard settles like a held breath.`,
    choices: [
      {
        text: "“Tell me. I want to remember.”",
        sub: "Lean into the warmth. Let her build the past around you.",
        tag: "TRUST",
        effects: { love: { clem: 2 }, obsession: { clem: 1 } },
        next: "clem_3",
      },
      {
        text: "“I can't promise something I don't remember.”",
        sub: "Honesty, even if it cuts.",
        tag: "HONEST",
        effects: { love: { clem: 1 }, obsession: { clem: 1 }, flag: "clem_honest" },
        next: "clem_3",
      },
      {
        text: "“You're lying. You've been waiting for a ghost.”",
        sub: "Push her. See what's underneath.",
        tag: "RISKY",
        effects: { obsession: { clem: 3 }, flag: "clem_challenged" },
        next: "clem_3",
      },
    ],
  },
  clem_3: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    get text() {
      if (this._state?.flags?.includes("clem_challenged")) {
        return `Clementine goes very still.

Then she laughs—one short, ugly sound. “A ghost. Yes. That's exactly what you are.”

She stands, walks to the bar, and comes back with a bottle. She does not pour. She just holds it, like a woman holding a weapon she has decided not to use.

“You think I don't know how this looks? I have spent nineteen months being reasonable. I have run a business. I have paid my taxes. I have smiled at men who called me *poor thing* and meant *unhinged.*” Her eyes shine. “You came back. I am allowed to be a little unhinged.”`;
      }
      return `Clementine's smile comes back slowly, like dawn deciding to bother.

“It was raining,” she says. “You'd lost at poker. You were a terrible loser and an even worse liar. I cheated to let you win. You caught me.”

She touches the rim of your glass.

“You said, *Clementine, if I live through this week, I'm going to marry you.* And I said, *If you live through this week, I'm going to hold you to that.* And then you kissed me like the answer to a question I'd been asking my whole life.”`;
    },
    next: "clem_4",
  },
  clem_4: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    mood: "Opening a drawer",
    text: `She takes a sketchbook from behind the bar. Then another. Then a third.

“I drew you,” she says. “Every day you were gone. I didn't mean to. It was the only way to keep my hands busy.”

The pages are full of you. You laughing. You asleep. You standing in the rain with your coat open. You with a bullet wound, drawn with such tenderness that it looks like a flower.`,
    enter: { clue: "sketches" },
    next: "clem_5",
  },
  clem_5: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    mood: "The door that isn't locked",
    text: `Somewhere in the stack is a drawing of a room you have never seen: a small house, a garden, two chairs on a porch. One chair is empty. The other is occupied by a woman with red hair and a ring on her hand.

“That's not a memory,” Clementine says, before you can ask. “That's a hope. I'm allowed one.”

She closes the book. Her palm stays flat on the cover.

“Stay tonight,” she says. “Not forever. Just tonight. Let me be a person you chose, for one hour, before the sun comes up and makes cowards of us both.”`,
    next: "clem_choice_2",
  },
  clem_choice_2: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "june",
    mood: "Her hand is very close",
    text: `The bourbon is warm in your chest. The room is warm. She is warm, and close, and looking at you like you are a door that might open.`,
    choices: [
      {
        text: "Take her hand. “Just tonight.”",
        sub: "The world can wait until morning.",
        tag: "INTIMATE",
        effects: { love: { clem: 2 }, obsession: { clem: 1 }, flag: "clem_intimate" },
        next: "clem_6",
      },
      {
        text: "“I need the truth before I promise anything.”",
        sub: "Keep your head. Ask about the letters.",
        tag: "CLUE",
        effects: { love: { clem: 1 }, obsession: { clem: 2 }, clue: "morrow_letter" },
        next: "clem_6",
      },
      {
        text: "“Unlock the door, Clementine.”",
        sub: "You are not a thing to be kept. Not yet.",
        tag: "BOUNDARY",
        effects: { obsession: { clem: 3 }, flag: "clem_boundary" },
        next: "clem_6",
      },
    ],
  },
  clem_6: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("clem_boundary")) {
        return `Clementine's hand stops halfway to yours.

For a moment, something ugly moves behind her eyes. Then it is gone, folded away like a tablecloth.

She unlocks the door. The click is very loud.

“There,” she says. “Open. See? I'm not a monster.”

The door stays open. She does not step away from it. Neither do you.`;
      }
      return `Clementine's hand closes around yours. Her thumb finds the pulse at your wrist.

“Just tonight,” she agrees, and her voice is steady. Her hand is not.

Above you, the ceiling creaks. She looks up, and her jaw tightens. “That'll be Morrow's man. He's been watching the Lily since you got off the stage.”`;
    },
    next: "clem_7",
  },
  clem_7: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    mood: "A letter on the bar",
    text: `She takes a folded paper from her bodice and lays it on the table.

“Found it in your coat the night you came back. I wasn't going to show you. I was going to burn it.”

The handwriting is a blunt, black scrawl: **Meet me at the mine at dawn. Come alone. The last man who asked questions is under the assay office. — M.**

“Morrow,” she says. “He owns the mine. He owns half the town. He thinks he owns me.”`,
    enter: { clue: "morrow_letter" },
    next: "clem_8",
  },
  clem_8: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    mood: "Fierce. Frightened.",
    text: `“You were investigating him. The mine, the water, the men who went missing. You were going to bring him down.”

She laughs, without humour. “And then you got shot, and I got to spend eighteen months being the woman who couldn't save you. So forgive me if I'm not eager to let you go play hero again.”`,
    next: "clem_9",
  },
  clem_9: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    mood: "Dawn is coming",
    text: `The clock strikes one. The lamp gutters. Clementine stands between you and the door, not quite blocking it.

“I can protect you,” she says. “I can keep you here until this is over. You'd be safe. You'd be *mine.*”

The word hangs in the air, bright and sharp as a blade.`,
    next: "clem_choice_3",
  },
  clem_choice_3: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "june",
    mood: "One last choice before dawn",
    text: `She is close enough to kiss. Close enough to run from. The key is still on the table.`,
    choices: [
      {
        text: "“I'm not going anywhere tonight.”",
        sub: "Let her believe it. Let yourself believe it.",
        tag: "SURRENDER",
        effects: { love: { clem: 2 }, obsession: { clem: 2 }, flag: "clem_stay" },
        next: "clem_10",
      },
      {
        text: "“Then come with me to the mine.”",
        sub: "You don't need a keeper. You need a partner.",
        tag: "PARTNER",
        effects: { love: { clem: 1 }, obsession: { clem: 1 }, flag: "clem_partner" },
        next: "clem_10",
      },
      {
        text: "“I'll be safe when Morrow is dead.”",
        sub: "Choose the fight over the room.",
        tag: "RECKLESS",
        effects: { love: { clem: 1 }, obsession: { clem: 2 }, flag: "clem_fight" },
        next: "clem_10",
      },
    ],
  },
  clem_10: {
    bg: "saloonNight",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    get text() {
      if (this._state?.flags?.includes("clem_stay")) {
        return `“Tonight,” she repeats, and the word sounds like a vow.

She takes your face in both hands. Her palms smell of whiskey and gun oil. “Then tonight, you're mine. Not the town's. Not Morrow's. Not the ghost of the woman who left.”

Outside, a horse whickers. She does not look away from you.

“If he comes through that door,” she says, “I'll shoot him myself.”`;
      }
      return `Clementine looks at the door, then at you. Something in her face gives way.

“All right,” she says. “But if you die in that mine, I will drag you back by your hair and kill you again.”

She takes your hand and presses the key into it. “For after. Room seven. If you're not back by sunrise, I'm coming with a shotgun.”

The key is warm. The promise is warmer.`;
    },
    next: "conv_1",
  },

  // ——— ADA ROUTE ———
  ada_1: {
    chapter: "ACT II",
    place: "Hale's Clinic · Midnight",
    actTitle: "The Necessary Wound",
    actSub: "Ada's route · a body is a kind of evidence",
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    transition: true,
    speaker: "ada",
    mood: "Professional. Hungry.",
    text: `The clinic smells of carbolic soap and dried lavender. Ada lights one lamp, then another, then a third, until the room is warm enough to be honest in.

“Sleeve,” she says. “And don't lie to me about the pain.”

You sit. She unwinds your shirt cuff with the efficiency of a woman who has undressed you before.`,
    next: "ada_2",
  },
  ada_2: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    mood: "A jar on the shelf",
    text: `“The bullet was mine,” she says, cleaning the old scar. “I removed it in this room. You held my hand so hard you broke two of my fingers. I did not mind.”

She reaches to a shelf and brings down a glass jar. Inside, a flattened slug sits on a bed of cotton like a museum specimen.

“I kept it,” she says. “For science.”`,
    enter: { clue: "bullet" },
    next: "ada_choice_1",
  },
  ada_choice_1: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "june",
    mood: "Her fingers on your wrist",
    text: `Her fingers rest on your pulse. She is counting. She is always counting something.`,
    choices: [
      {
        text: "“Why keep it? Really.”",
        sub: "Make her say the unscientific part out loud.",
        tag: "TRUTH",
        effects: { love: { ada: 2 }, obsession: { ada: 1 } },
        next: "ada_3",
      },
      {
        text: "“You could have thrown it away.”",
        sub: "A gentle accusation. A door left open.",
        tag: "GENTLE",
        effects: { love: { ada: 1 }, obsession: { ada: 1 } },
        next: "ada_3",
      },
      {
        text: "Pull your wrist away.",
        sub: "You are not a specimen.",
        tag: "BOUNDARY",
        effects: { obsession: { ada: 3 }, flag: "ada_distance" },
        next: "ada_3",
      },
    ],
  },
  ada_3: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    get text() {
      if (this._state?.flags?.includes("ada_distance")) {
        return `Ada looks at her empty hand for a moment, as if it has betrayed her.

“Of course,” she says. “I apologise. I am not accustomed to patients who object to being studied.”

She turns away and writes something in the ledger. Her pen presses hard enough to tear the page.

“You always did hate being known,” she says, without turning around. “It is why you were so easy to love. And so difficult to keep.”`;
      }
      return `Ada is quiet for a long moment.

“Because I am a coward,” she says at last. “I can dissect a tumour. I can set a bone. I cannot say *I missed you* without turning it into a diagnosis.”

She sets the jar down. “So I kept the bullet. I wrote down everything you ate. I measured your sleep. I made you into a case study because a case study cannot leave.”

Her eyes lift to yours. “You are the only variable I cannot control.”`;
    },
    next: "ada_4",
  },
  ada_4: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    mood: "Opening the ledger",
    text: `She opens the ledger to a page you have not seen. Your name at the top. Beneath it: *Subject displays aversion to abandonment. Responds to praise. Fears small rooms. Prefers black tea. Left shoulder scar—touch with caution. Laughs when nervous. Does not know how beautiful she is. Do not tell her.*

“I wrote that last part in code,” she says. “I am not very good at code.”`,
    enter: { clue: "ledger" },
    next: "ada_5",
  },
  ada_5: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    mood: "The examination table",
    text: `She sets down her pen. The lamp makes a small, private sun between you.

“I have a tonic,” she says. “For the dreams. You used to wake up screaming. You would not tell me what you saw.”

She does not reach for the bottle. She waits.`,
    next: "ada_choice_2",
  },
  ada_choice_2: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "june",
    mood: "The clinic is very quiet",
    text: `A bottle of amber liquid sits on the shelf. A clean bed waits behind a screen. Ada's hands are folded in front of her, perfectly still.`,
    choices: [
      {
        text: "“No tonic. Just stay with me.”",
        sub: "Let her be a person, not a physician.",
        tag: "INTIMATE",
        effects: { love: { ada: 2 }, obsession: { ada: 1 }, flag: "ada_intimate" },
        next: "ada_6",
      },
      {
        text: "“Tell me what I was investigating.”",
        sub: "The case first. The heart after.",
        tag: "CLUE",
        effects: { love: { ada: 1 }, obsession: { ada: 2 }, clue: "arsenic" },
        next: "ada_6",
      },
      {
        text: "“You can't fix me, Ada.”",
        sub: "Let the wound be a wound.",
        tag: "BOUNDARY",
        effects: { obsession: { ada: 3 }, flag: "ada_boundary" },
        next: "ada_6",
      },
    ],
  },
  ada_6: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    get text() {
      if (this._state?.flags?.includes("ada_boundary")) {
        return `Ada's jaw tightens.

“I am aware,” she says. “I have been aware for eighteen months. It has not made me want you any less.”

She picks up the tonic and puts it away, then stands with her back to you, hands braced on the shelf.

“I cannot fix you. I can only keep you alive long enough for someone else to. Is that not the most humiliating thing you have ever heard?”`;
      }
      return `Ada pulls the chair closer. Her knee touches yours. This time she does not pretend it was an accident.

“Morrow's water,” she says. “Arsenic. Slow enough to look like a sickness, steady enough to empty a town of anyone who asks questions. Fourteen miners. I have the samples. I have the death certificates. I have a report that would ruin him.”

She pauses. “I also have a letter from you. It says: *If I don't come back, go to Ada. She'll know what to do.*”`;
    },
    next: "ada_7",
  },
  ada_7: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    mood: "A voice at the door",
    text: `A fist pounds on the clinic door. Three slow knocks, then two fast ones.

Ada's expression does not change. “Morrow's man,” she says. “He comes every Thursday to ask if I have seen you. I tell him you are dead. He does not believe me.”

She reaches under the desk and takes out a small revolver. “I have never shot anyone. I am told it is mostly a matter of commitment.”`,
    next: "ada_8",
  },
  ada_8: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    mood: "Dawn is a diagnosis",
    text: `“Stay,” she says. “Not because I order it. Because I am asking.”

The knock comes again, harder. The lamp flickers.

“I have a back room,” she says. “No windows. A lock. If he breaks in, he will not find you. I have thought about this more than is healthy.”

She holds out her hand. The revolver is still in the other.`,
    next: "ada_choice_3",
  },
  ada_choice_3: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "june",
    mood: "The knocks are getting louder",
    text: `Her hand is steady. The rest of her is not.`,
    choices: [
      {
        text: "Take her hand. “You don't have to protect me alone.”",
        sub: "Choose the woman behind the doctor.",
        tag: "PARTNER",
        effects: { love: { ada: 2 }, obsession: { ada: 1 }, flag: "ada_partner" },
        next: "ada_9",
      },
      {
        text: "“Open the door. We face him together.”",
        sub: "Turn the examination into evidence.",
        tag: "BOLD",
        effects: { love: { ada: 1 }, obsession: { ada: 2 }, flag: "ada_face" },
        next: "ada_9",
      },
      {
        text: "Let her hide you.",
        sub: "The back room. The lock. The dark.",
        tag: "SURRENDER",
        effects: { love: { ada: 1 }, obsession: { ada: 3 }, flag: "ada_hidden" },
        next: "ada_9",
      },
    ],
  },
  ada_9: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("ada_hidden")) {
        return `The back room is smaller than you expected. There is a bed, a shelf, a basin. A window painted over. The door closes. The lock turns.

Through the wall, you hear Ada's voice, calm as water: “She is dead, Mr. Ketch. I signed the certificate myself. Would you like to see the body?”

The lie is so smooth that even you almost believe it.`;
      }
      return `Ada opens the door.

The man on the step is big and damp and very tired. He looks at you, then at Ada, then at the revolver.

“Evening, Doc,” he says.

“Good evening, Mr. Ketch,” Ada says. “I am afraid the clinic is closed. The patient and I were just discussing arsenic.”

The man's smile dies in stages.`;
    },
    next: "ada_10",
  },
  ada_10: {
    bg: "clinic",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    get text() {
      if (this._state?.flags?.includes("ada_hidden")) {
        return `When the door opens again, Ada is holding a bloody handkerchief and a lie she has clearly enjoyed telling.

“He's gone,” she says. “He will be back at dawn with Morrow. I have made a list of everything we need to do before then.”

She sits beside you on the bed. Her hand finds yours in the dark. “You are shaking,” she says, and her voice is soft. “I have a tonic for that.”`;
      }
      return `Mr. Ketch leaves with a promise to return and a look in his eye that makes the revolver feel very small.

Ada sets it down. Her hands are trembling now that it is over.

“I have never been brave before,” she says. “I find I like it. I would like to do it again. With you.”

She kisses you—quickly, precisely, as if she has calculated the angle and then abandoned the mathematics entirely.`;
    },
    next: "conv_1",
  },

  // ——— ROSA ROUTE ———
  rosa_1: {
    chapter: "ACT II",
    place: "Delgado Stables · Midnight",
    actTitle: "The Last Big Score",
    actSub: "Rosa's route · two tickets and a stolen horse",
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    transition: true,
    speaker: "rosa",
    mood: "Grinning. Grieving.",
    text: `The stable smells of hay, horse, and nitroglycerin. Rosa is sitting on an upturned crate with a bottle between her boots and a map spread across her knees.

“Close the door, corazón. And don't look at the dynamite. It gets shy.”`,
    next: "rosa_2",
  },
  rosa_2: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "A plan on her knee",
    text: `The map is of the Cinder mine. Someone has drawn little stars on the assay office, the payroll wagon, and the powder shed. Someone else has drawn a heart around the word *south.*

“Morrow keeps his ledgers in the assay office,” she says. “The same ledgers that prove he's been poisoning his own miners. Also his payroll. Also his very nice brandy.”

She taps the map. “One job. One night. We take the proof, the money, and the road.”`,
    enter: { clue: "morrow_letter" },
    next: "rosa_choice_1",
  },
  rosa_choice_1: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "june",
    mood: "The horse approves",
    text: `She tips the bottle toward you. Behind her, a bay mare puts her head over the stall door and sighs.

“Well?” Rosa says. “You in?”`,
    choices: [
      {
        text: "“I'm in. But I'm not your decoy.”",
        sub: "Join her. Set a condition.",
        tag: "PARTNER",
        effects: { love: { rosa: 2 }, obsession: { rosa: 1 }, flag: "rosa_partner" },
        next: "rosa_3",
      },
      {
        text: "“This is insane.”",
        sub: "She is. You might be, too.",
        tag: "HONEST",
        effects: { love: { rosa: 1 }, obsession: { rosa: 2 }, flag: "rosa_honest" },
        next: "rosa_3",
      },
      {
        text: "“What did I promise you?”",
        sub: "Keep your eyes on the map. And the heart.",
        tag: "CLUE",
        effects: { love: { rosa: 1 }, obsession: { rosa: 2 }, clue: "rosa_letter" },
        next: "rosa_3",
      },
    ],
  },
  rosa_3: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    get text() {
      if (this._state?.flags?.includes("rosa_honest")) {
        return `Rosa laughs, loud and real.

“Insane? I'm a romantic. There's a difference.”

She swings her boots off the crate and crosses to you. “You know what's actually insane? I've been sitting in this stable for eighteen months waiting for a dead woman to come back. I've turned down three jobs. I've paid rent on a room for a horse I could have sold.”

Her grin falters. “You don't owe me a heist, June. I just didn't know what to do with all this hope.”`;
      }
      return `Rosa's grin softens into something younger and much more dangerous.

“You promised me the biggest score in the territory. And then you promised me something bigger.”

She pulls a letter from inside her vest. The paper is worn soft. “You wrote this the night before you got shot. *Rosa—if this goes wrong, take the south road. Don't wait for me.*”

She turns it over. On the back, in your hand: *I think I am falling in love with you. I am sorry. I am not sorry.*`;
    },
    next: "rosa_4",
  },
  rosa_4: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "Two tickets in her boot",
    text: `She pulls two train tickets from her boot and lays them on the map like a winning hand.

“Veracruz,” she says. “First class. I bought them the morning you were shot. I figured we'd take the noon train and be in El Paso before Morrow noticed the money was gone.”

She touches one of the names. “I wrote your name in with a pencil. I didn't want to put it in ink until I knew you were alive.”

The tickets are very worn. She has carried them for eighteen months.`,
    enter: { clue: "rosa_tickets" },
    next: "rosa_choice_2",
  },
  rosa_choice_2: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "june",
    mood: "The lantern is low",
    text: `The stable is warm. The horse is asleep. Rosa is close, and still, and looking at you like a question she is afraid to ask twice.

“Say something,” she says.`,
    choices: [
      {
        text: "Kiss her.",
        sub: "Let the map fall. Let the plan wait.",
        tag: "INTIMATE",
        effects: { love: { rosa: 2 }, obsession: { rosa: 1 }, flag: "rosa_kiss" },
        next: "rosa_5",
      },
      {
        text: "“You kept two tickets for a ghost.”",
        sub: "The saddest thing you have ever heard.",
        tag: "TENDER",
        effects: { love: { rosa: 2 }, obsession: { rosa: 1 }, flag: "rosa_tender" },
        next: "rosa_5",
      },
      {
        text: "“If we do this, we do it clean.”",
        sub: "No more ghosts. No more secrets.",
        tag: "PARTNER",
        effects: { love: { rosa: 1 }, obsession: { rosa: 2 }, flag: "rosa_clean" },
        next: "rosa_5",
      },
    ],
  },
  rosa_5: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    get text() {
      if (this._state?.flags?.includes("rosa_kiss")) {
        return `Rosa kisses like she has been holding her breath for eighteen months.

The map slides off her knees. The bottle tips. Neither of you notices. Her hands are in your hair, on your jaw, against your ribs, checking that you are real.

When she finally pulls back, her eyes are wet and her grin is back. “Well,” she says. “That's one way to say yes.”`;
      }
      if (this._state?.flags?.includes("rosa_tender")) {
        return `Rosa looks down at the tickets. Her jaw works.

“It wasn't for a ghost,” she says. “It was for you. I don't know how to explain the difference. The ghost is the one who left. You're the one who came back.”

She folds the tickets carefully and puts them in your hand. “Keep them. If you decide not to come with me, at least one of us should have a way out.”`;
      }
      return `“Clean,” Rosa repeats. She tests the word like a coin she isn't sure will spend.

“All right. No killing unless we have to. No robbing anyone who can't afford it. No leaving anyone behind.” She spits in her palm and holds it out. “Swear it.”

You take her hand. It is warm and callused and trembling very slightly.`;
    },
    next: "rosa_6",
  },
  rosa_6: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "A storm at the window",
    text: `The stable door rattles. Rosa's hand goes to the gun at her hip, then relaxes.

“Morrow's men,” she says. “They've been circling since sundown. He knows you're in town.”

She looks at the dynamite, then at the tickets, then at you. “We could go now. Tonight. Forget the ledgers. Forget the town. Just ride south.”

It is the first time she has offered you a way out that does not involve a crime. It is also the first time she has sounded afraid.`,
    next: "rosa_7",
  },
  rosa_7: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "Fierce",
    text: `“But if we stay,” she says, “I need to know you're with me. Not because you feel guilty. Not because I've got a gun and a nice smile. Because you want the life.”

She steps closer. “I don't share, June. Not the money. Not the horse. Not you. If you're mine, be mine. If you're not, tell me now and I'll get drunk and cry about it like a professional.”`,
    next: "rosa_choice_3",
  },
  rosa_choice_3: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "june",
    mood: "The lantern gutters",
    text: `Her hand is on your waist. The map is on the floor. The tickets are in your pocket.

There is still time to be sensible. It would be a first.`,
    choices: [
      {
        text: "“I'm with you. South, after.”",
        sub: "Give her the answer she has been waiting eighteen months to hear.",
        tag: "PROMISE",
        effects: { love: { rosa: 2 }, obsession: { rosa: 2 }, flag: "rosa_promise" },
        next: "rosa_8",
      },
      {
        text: "“I'm with you. But I'm not yours.”",
        sub: "A partner, not a possession.",
        tag: "BOUNDARY",
        effects: { love: { rosa: 1 }, obsession: { rosa: 3 }, flag: "rosa_boundary" },
        next: "rosa_8",
      },
      {
        text: "“Ask me again after the mine.”",
        sub: "Keep the future unspent.",
        tag: "CAUTIOUS",
        effects: { love: { rosa: 1 }, obsession: { rosa: 1 }, flag: "rosa_after" },
        next: "rosa_8",
      },
    ],
  },
  rosa_8: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("rosa_boundary")) {
        return `Rosa's smile goes crooked.

“Not yours,” she says. “Right. Of course.”

She steps back, gives you room. It costs her something to do it. You can see the effort in her shoulders.

“I've never been good at sharing,” she says. “But I can try. For you. Just don't expect me to like it.”`;
      }
      return `Rosa kisses you once, hard, and then pulls away before it can become a promise she has to keep.

“After,” she says. “Fine. But I'm holding you to it.”

She throws you a bedroll and takes the first watch. When you wake in the dark, she is sitting by the stable door with the shotgun across her knees, watching the road and humming something old and sad.`;
    },
    next: "rosa_9",
  },
  rosa_9: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "Dawn, through the slats",
    text: `Before dawn, she wakes you with a hand over your mouth.

“Company,” she whispers. “Morrow's men. Six of them. They're at the assay office.”

She is already dressed, already armed, already smiling the way she does when she is about to do something stupid and magnificent.

“Last chance to be sensible, corazón.”`,
    next: "rosa_10",
  },
  rosa_10: {
    bg: "stable",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "The sun is coming up",
    text: `You saddle the mare. Rosa checks the dynamite. The town is very quiet, the way a held breath is quiet.

“Whatever happens up there,” she says, “I want you to know something.”

She tightens the cinch, then looks at you. “I would have waited another eighteen months. I would have waited forever. That's not a threat. It's just a fact.”`,
    next: "conv_1",
  },

  // ——— CONVERGENCE ———
  conv_1: {
    chapter: "ACT III",
    place: "Cinder Gulch · Midnight",
    actTitle: "Three of a Kind",
    actSub: "The reckoning · Cinder Gulch, midnight",
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    transition: true,
    speaker: "narrator",
    mood: "Rain on the roof",
    text: `You do not remember deciding to come back to the Gilded Lily. You only remember the rain starting, and the sound of three women arriving one after another, each with a different piece of your past.

Clementine brings the key. Ada brings the bullet. Rosa brings the tickets.

They set them on the table between you. Three objects. Three promises. One woman who cannot remember making any of them.`,
    next: "conv_2",
  },
  conv_2: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "ada",
    mood: "Reading the evidence",
    text: `“There is something none of us has said.” Ada turns the letter on the table toward the light. “These letters were not written by an admirer. They were written by you.”

She sets three pages side by side. The handwriting is identical. The signatures are not.

“You summoned yourself home,” she says. “Before the mine. Before the bullet. You wrote three letters and gave one to each of us.”`,
    enter: { clue: "letters" },
    next: "conv_3",
  },
  conv_3: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "A crack in the mask",
    text: `“I didn't write mine,” Clementine says. Her voice is very flat. “I found it under my pillow the morning you left. I thought it was from you because it *was* from you.”

Rosa laughs, without humour. “Mine came tied to a bullet. Real romantic.”

“Mine was in the clinic ledger,” Ada says. “Between the pages, as if it had always been there.”`,
    next: "conv_4",
  },
  conv_4: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "A memory, breaking the surface",
    text: `You reach for the letters. Your fingers know the paper before your mind does.

A flash: a desk in the assay office. A pen. Rain against a window. Three envelopes. A hand—your hand—shaking as it writes.

Then the mine. The dark. The sound of a shot.

You gasp. The scar on your shoulder burns like a brand.`,
    enter: { clue: "scar" },
    next: "conv_5",
  },
  conv_5: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "Remembering",
    text: `“I was going to bring him down,” you say. “Morrow. The arsenic. I had the ledgers. I was going to give them to the territorial marshal.”

You look up. Three faces, all of them afraid of the same thing.

“I wrote to you because I was going to die. I didn't want to die without—without being known.”

The rain gets louder. Clementine's hand is on the table, palm up. Ada's is beside it. Rosa's is already reaching for yours.`,
    next: "conv_6",
  },
  conv_6: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "ada",
    mood: "Cold. Certain.",
    text: `“Morrow knows you're alive,” Ada says. “His men have been watching the Lily since you arrived. At dawn, he will come for the ledgers. And for you.”

Clementine stands. “Then we don't wait for dawn.”

“We take the mine,” Rosa says. “We take the proof. We take his payroll. We make sure every miner in this territory knows what he's been drinking.”

“And then?” Ada asks.

Rosa grins. “Then we get very, very drunk.”`,
    next: "conv_7",
  },
  conv_7: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "The room holds its breath",
    text: `Clementine turns to you.

“Before we do this,” she says, “you need to choose. Not for the plan. For after.”

She sets the key on the table. Ada sets the bullet beside it. Rosa sets the ticket on top.

“One of us,” Clementine says. “Or none of us. Or—God help me—all of us. But choose, June. No more ghosts.”

Outside, hooves. A lantern. A man's voice, rough with rain: “Morrow wants the ledgers. And the woman.”`,
    next: "conv_choice",
  },
  conv_choice: {
    bg: "saloonNight",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "The last choice before dawn",
    text: `The clock strikes midnight. The key. The bullet. The ticket.

Three women. One impossible future.`,
    choices: [
      {
        text: "Clementine. “I want the life you kept for me.”",
        sub: "The room, the key, the warm hand. A home that does not have to be a cage.",
        tag: "CLEMENTINE",
        effects: { route: "clem", love: { clem: 2 }, obsession: { clem: 1 }, flag: "final_clem" },
        next: "final_clem_1",
      },
      {
        text: "Ada. “I want the truth—and you beside it.”",
        sub: "The clinic, the ledger, the clean light. A love examined and found sound.",
        tag: "ADA",
        effects: { route: "ada", love: { ada: 2 }, obsession: { ada: 1 }, flag: "final_ada" },
        next: "final_ada_1",
      },
      {
        text: "Rosa. “I want the horizon with you.”",
        sub: "The ticket, the horse, the road south. A future with no walls.",
        tag: "ROSA",
        effects: { route: "rosa", love: { rosa: 2 }, obsession: { rosa: 1 }, flag: "final_rosa" },
        next: "final_rosa_1",
      },
      {
        text: "“All three. If the town can learn to share, so can we.”",
        sub: "An impossible hand. A town that belongs to everyone who stays.",
        tag: "SECRET",
        when: (state) =>
          state.clues.length >= 5 &&
          state.affection.clem + state.affection.ada + state.affection.rosa >= 8 &&
          Math.max(state.obsession.clem, state.obsession.ada, state.obsession.rosa) < 8,
        effects: { route: "all", love: { clem: 1, ada: 1, rosa: 1 }, flag: "final_all" },
        next: "final_all_1",
      },
      {
        text: "“I choose myself. I'm leaving Cinder Gulch.”",
        sub: "No keeper. No owner. No ghost. Just the road.",
        tag: "JUNE",
        effects: { route: "alone", flag: "final_alone" },
        next: "final_alone_1",
      },
    ],
  },

  // ——— FINALES ———
  final_clem_1: {
    chapter: "FINALE",
    place: "The Gilded Lily · Dawn",
    actTitle: "The Gilded Lily",
    actSub: "Clementine's finale · dawn, and what comes after",
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    transition: true,
    speaker: "clem",
    mood: "A shotgun and a smile",
    text: `The Gilded Lily at dawn is a different animal. The lamps are out. The windows are grey. Clementine is standing behind the bar with a shotgun and her hair coming down.

“Morrow's men are outside,” she says. “Six of them. Maybe seven. They've got a wagon and a bad attitude.”

She racks the shotgun. “I've got six shells. Seems fair.”`,
    next: "final_clem_2",
  },
  final_clem_2: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "morrow",
    mood: "From the street",
    text: `“Clementine Vane!” The voice comes through the batwing doors, wet and patient. “Send the woman out. The mine needs its surveyor. The town needs its doctor. Nobody needs a dead saloon girl.”

Clementine's smile does not move. Her knuckles go white on the stock.

“He always did know how to make a girl feel special,” she says.`,
    next: "final_clem_3",
  },
  final_clem_3: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    mood: "A door, opening",
    text: `“I could keep you upstairs,” she says, very quietly. “Put the key in my pocket. Tell the town you left on the morning stage. Let him burn himself out.”

Her eyes are wet. “It would be so easy. You have no idea how easy.”

The batwing doors creak. Boots on the boardwalk.`,
    next: "final_clem_choice",
  },
  final_clem_choice: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "june",
    mood: "The last door",
    text: `The key is on the bar. The shotgun is in her hands. The town is holding its breath.`,
    choices: [
      {
        text: "Stand beside her. “We open the door together.”",
        sub: "Face Morrow with her. Trust her aim, and your own.",
        tag: "TOGETHER",
        effects: { love: { clem: 2 }, obsession: { clem: 1 }, flag: "clem_together" },
        next: "final_clem_4",
      },
      {
        text: "“Put the gun down. I'll go with him.”",
        sub: "Trade yourself for the town. She will never forgive you.",
        tag: "SACRIFICE",
        effects: { love: { clem: 1 }, obsession: { clem: 3 }, flag: "clem_sacrifice" },
        next: "final_clem_4",
      },
      {
        text: "“Come with me. We leave now, before he gets in.”",
        sub: "The back door. The horses. The rest of your lives.",
        tag: "ESCAPE",
        effects: { love: { clem: 2 }, obsession: { clem: 1 }, flag: "clem_escape" },
        next: "final_clem_4",
      },
    ],
  },
  final_clem_4: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("clem_sacrifice")) {
        return `Clementine stares at you.

“No,” she says. “No. Absolutely not.”

You put your hand on the barrel of the shotgun and push it gently toward the floor. She lets you. That is the worst part.

“You don't get to be noble,” she says. “Not with me. Not after I kept your room.”

The door opens. The morning comes in. So does Morrow.`;
      }
      if (this._state?.flags?.includes("clem_escape")) {
        return `Clementine looks at the back door. Then at the front. Then at you.

“I've spent my whole life being the woman who stays,” she says. “Running is a lot to ask.”

She takes your hand. Her palm is damp. “Ask me again in a minute.”

The door opens. The morning comes in. So does Morrow.`;
      }
      return `You put your hand over hers on the shotgun.

“Together,” you say.

Clementine's smile comes back—the real one, the one from the drawings. “Together,” she agrees. “But I'm aiming.”`;
    },
    next: "final_clem_5",
  },
  final_clem_5: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    mood: "The truth, in the doorway",
    get text() {
      const obs = this._state?.obsession?.clem ?? 0;
      const love = this._state?.affection?.clem ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `The door opens.

Clementine does not shoot Morrow. She shoots the lantern above his head, and in the sudden dark she pulls you behind the bar with a strength that is not entirely gentle.

“You wanted to be chosen,” she whispers. “So I'm choosing. You. Me. Room seven. Forever.”

When the lamp comes back on, Morrow is gone, and so is the key.

She locks the door. She puts the key in her bodice, next to her heart. She smiles.

“There,” she says. “Now nobody can take you.”`;
      }
      return `The door opens.

Morrow is smaller than you remembered. Wet boots, expensive coat, a smile like a closed fist. Behind him, six men with rifles.

Clementine steps in front of you. “Evening, Silas.”

“Miss Vane.” He looks past her. “Miss Calloway. You've led me a merry chase.”

You step out from behind her. “I remember now,” you say. “The assay office. The ledgers. The arsenic. I remember everything.”

For the first time, Morrow looks afraid.`;
    },
    next: "final_clem_6",
  },
  final_clem_6: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    get text() {
      const obs = this._state?.obsession?.clem ?? 0;
      const love = this._state?.affection?.clem ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `By noon, the town believes you left on the morning stage. Clementine tells them so with tears in her eyes.

By evening, Room 7 has a new lock. By winter, you have stopped asking about the door.

She brings you breakfast. She reads to you. She paints the window shut. She is always gentle. She is always there.

“You're safe,” she says, every night, into your hair. “I'll never let anyone hurt you again.”

Outside, Cinder Gulch burns itself out. Inside, the lilies never wilt.`;
      }
      return `What happens next takes less than a minute.

Rosa comes through the back with the ledgers. Ada comes through the side door with the arsenic report and the town's three most frightened, most furious wives. The miners come last, still in their work clothes, carrying picks.

Morrow's men look at the miners. The miners look at Morrow.

Clementine lowers the shotgun. “Well,” she says. “Looks like the town's had enough of you, Silas.”

Morrow reaches for his gun. Clementine shoots it out of his hand.

“I said,” she says, “enough.”`;
    },
    next: "final_clem_7",
  },
  final_clem_7: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "clem",
    get text() {
      const obs = this._state?.obsession?.clem ?? 0;
      const love = this._state?.affection?.clem ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `She turns to you. The shotgun is still warm. Her smile is very tender.

“You can stop pretending now,” she says. “You're home.”

The key is in her bodice. The door is locked. The morning is very far away.`;
      }
      return `She turns to you. The shotgun is still warm. Her smile is the one from the drawings.

“I kept your room,” she says. “But I'd rather keep you.”

You laugh. “That's the same thing.”

“No,” she says. “It isn't. I'm learning.”

She holds out her hand. The door is open. The morning is waiting.`;
    },
    next: "ending_clem",
  },
  ending_clem: {
    bg: "saloonDawn",
    cast: ["clem"],
    camera: "close",
    speaker: "narrator",
    ending: "clem",
    text: ``,
  },

  final_ada_1: {
    chapter: "FINALE",
    place: "Hale's Clinic · Dawn",
    actTitle: "The Necessary Evidence",
    actSub: "Ada's finale · a clean wound, a dirty town",
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    transition: true,
    speaker: "ada",
    mood: "Calm. Furious.",
    text: `Ada has been awake all night. You can tell because the clinic is immaculate, the report is copied in triplicate, and her hair is still perfect, which is how she looks when she is beyond fear.

“Morrow is coming at dawn,” she says. “I have prepared a tray.”`,
    next: "final_ada_2",
  },
  final_ada_2: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    mood: "The tray",
    text: `The tray holds a syringe, a bottle of clear liquid, and a small, neat pile of papers.

“Arsenic,” she says. “The same as the mine water. Enough to kill a man in an hour, or make him very sick in five minutes. I have numbered the doses. I am not a murderer. I am a physician with a point to make.”

She sets the syringe down. “I would prefer not to use it.”`,
    next: "final_ada_3",
  },
  final_ada_3: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "morrow",
    mood: "A knock at the door",
    text: `“Doctor Hale!” Morrow's voice, muffled by wood and rain. “I know she's in there. I know about the report. Open the door and we can discuss this like reasonable people.”

Ada looks at you. “Reasonable people,” she repeats. “He poisoned fourteen men.”

She picks up the report. “I am going to open the door. You are going to stay behind me. And whatever happens, you are not to offer yourself in exchange. I have seen how you negotiate. It is terrible.”`,
    next: "final_ada_choice",
  },
  final_ada_choice: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "june",
    mood: "The door, the report, the dawn",
    text: `Her hand is on the latch. The tray is on the desk. The report is in her other hand.`,
    choices: [
      {
        text: "“Open it. I'm with you.”",
        sub: "Stand shoulder to shoulder. Let the truth be the weapon.",
        tag: "TOGETHER",
        effects: { love: { ada: 2 }, obsession: { ada: 1 }, flag: "ada_together" },
        next: "final_ada_4",
      },
      {
        text: "“Let me speak to him first.”",
        sub: "A confession for a confession. Your life for the town's.",
        tag: "SACRIFICE",
        effects: { love: { ada: 1 }, obsession: { ada: 3 }, flag: "ada_sacrifice" },
        next: "final_ada_4",
      },
      {
        text: "“Take my hand. We leave through the back.”",
        sub: "The report can wait. So can the town.",
        tag: "ESCAPE",
        effects: { love: { ada: 2 }, obsession: { ada: 2 }, flag: "ada_escape" },
        next: "final_ada_4",
      },
    ],
  },
  final_ada_4: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("ada_sacrifice")) {
        return `“No,” Ada says, with the flat certainty of a diagnosis.

She opens the door before you can argue. Morrow is on the step, flanked by two men, rain dripping from his hat.

“Doctor,” he says. “Miss Calloway. How convenient.”

Ada holds up the report. “Mr. Morrow. How poisoned.”`;
      }
      if (this._state?.flags?.includes("ada_escape")) {
        return `Ada looks at the back door. Then at the report in her hand.

“This is the only copy that matters,” she says. “If we run, he wins. If we stay, we might die. I am not usually a gambling woman.”

She takes your hand. “But you have always been a bad influence.”`;
      }
      return `You put your hand on the latch beside hers.

“Together,” you say.

Ada's mouth twitches—not quite a smile. “Together,” she agrees. “Though I reserve the right to be right.”`;
    },
    next: "final_ada_5",
  },
  final_ada_5: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    mood: "The door opens",
    get text() {
      const obs = this._state?.obsession?.ada ?? 0;
      const love = this._state?.affection?.ada ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `The door opens.

Morrow steps in. Ada smiles. The syringe is very fast.

He is not dead. He is simply very, very ill, and by the time the town council arrives, he is on the floor of the clinic confessing to everything—the arsenic, the missing miners, the fire at the assay office—between bouts of vomiting.

Ada writes it all down. She is thorough.

When it is over, she locks the door. She draws the curtains. She turns to you with the syringe still in her hand.

“You were going to leave,” she says. “I saw it in your face. You always look at the door before you lie.”

She sets the syringe down and picks up a leather strap. “But we can discuss that later. First, your pulse.”`;
      }
      return `The door opens.

Morrow steps in. Ada holds up the report.

“Arsenic,” she says. “Fourteen miners. I have samples, charts, and the testimony of every wife in this town. You can shoot me, of course. But I have also sent copies to the territorial marshal, the Santa Fe New Mexican, and—rather spitefully—your mother.”

Morrow's face does something complicated. Behind him, his men are already stepping away.

“You're bluffing,” he says.

Ada smiles. “I'm a doctor. We never bluff about test results.”`;
    },
    next: "final_ada_6",
  },
  final_ada_6: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    get text() {
      const obs = this._state?.obsession?.ada ?? 0;
      const love = this._state?.affection?.ada ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `By noon, Silas Morrow is in irons and you are in the back room.

Ada tells the deputy you died of your wounds. She produces a certificate. She is a very good doctor. She is an even better liar.

The clinic closes for the winter. The window looks onto a brick wall. The door has no handle on the inside.

“I am not cruel,” Ada says, every night, writing in her ledger. “I am thorough.”

You are the longest case study she has ever conducted. You are going to live forever.`;
      }
      return `By noon, Silas Morrow is in irons and the whole town is in the street.

By evening, the miners have taken back the mine. Ada has set up a table outside the clinic and is treating everyone for free. She looks exhausted and triumphant and very slightly drunk on power.

“I have decided to leave Cinder Gulch,” she says, when the last patient has gone. “I have also decided to ask you to come with me.”

She produces two train tickets. “San Francisco. There is a clinic by the sea. It has a garden. And a spare room.”

She pauses. “It also has a door with a handle on both sides. I checked.”`;
    },
    next: "final_ada_7",
  },
  final_ada_7: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "ada",
    get text() {
      const obs = this._state?.obsession?.ada ?? 0;
      const love = this._state?.affection?.ada ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `She sets the ledger on the nightstand. Your name is at the top of a new page.

“I have a theory,” she says, “that love is a chronic condition. Not curable. Only managed.”

She turns down the lamp. “I am going to manage you very carefully.”`;
      }
      return `She waits, hands folded, as if she has not just offered you a life.

“Well?” she says. “Is the prognosis good?”

You take the ticket. “I think the patient will live.”

Ada's smile is small, and real, and entirely unmedical.`;
    },
    next: "ending_ada",
  },
  ending_ada: {
    bg: "clinicDawn",
    cast: ["ada"],
    camera: "close",
    speaker: "narrator",
    ending: "ada",
    text: ``,
  },

  final_rosa_1: {
    chapter: "FINALE",
    place: "Cinder Mine · Dawn",
    actTitle: "The Last Big Score",
    actSub: "Rosa's finale · dynamite, ledgers, and a way south",
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    transition: true,
    speaker: "rosa",
    mood: "Alive. Ready.",
    text: `The mine at dawn is a mouth full of gold teeth. Rosa crouches behind a powder wagon with a grin and a bundle of dynamite.

“There's Morrow's office,” she whispers. “There's the payroll. There's the ledgers. There's about nine men who would rather shoot us than look at us.”

She hands you a fuse. “Any questions?”`,
    next: "final_rosa_2",
  },
  final_rosa_2: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    mood: "The plan",
    text: `“We blow the powder shed as a distraction. I take the payroll. You take the ledgers. We meet at the south gate with the horses.”

She pauses. “There's a chance the tunnel collapses. There's a chance Morrow's men are better shots than they look. There's a chance I've been in love with a ghost for eighteen months and this is all a very elaborate way of getting us both killed.”

She grins. “But the odds are good.”`,
    next: "final_rosa_3",
  },
  final_rosa_3: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "morrow",
    mood: "A voice in the dark",
    text: `“Miss Delgado. Miss Calloway.”

Morrow steps out of the assay office with a rifle and six men. He looks tired and expensive and entirely unsurprised.

“I knew you'd come for the ledgers,” he says. “I had them moved. The ones in there are blank.”

Rosa's grin does not falter. “Then why are you here?”

Morrow's smile does.`,
    next: "final_rosa_choice",
  },
  final_rosa_choice: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "june",
    mood: "The fuse is in your hand",
    text: `The fuse is in your hand. The powder shed is twenty feet away. Rosa is watching you, waiting for a signal only the two of you understand.`,
    choices: [
      {
        text: "Light the fuse. “South, after.”",
        sub: "Trust the plan. Trust her.",
        tag: "TOGETHER",
        effects: { love: { rosa: 2 }, obsession: { rosa: 1 }, flag: "rosa_together" },
        next: "final_rosa_4",
      },
      {
        text: "“Let her go, Morrow. I'll stay.”",
        sub: "Trade yourself for the woman with the tickets.",
        tag: "SACRIFICE",
        effects: { love: { rosa: 1 }, obsession: { rosa: 3 }, flag: "rosa_sacrifice" },
        next: "final_rosa_4",
      },
      {
        text: "Drop the fuse and run for the horses.",
        sub: "No explosion. No heroics. Just the road.",
        tag: "ESCAPE",
        effects: { love: { rosa: 2 }, obsession: { rosa: 2 }, flag: "rosa_escape" },
        next: "final_rosa_4",
      },
    ],
  },
  final_rosa_4: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("rosa_sacrifice")) {
        return `Rosa looks at you like you have slapped her.

“Don't you dare,” she says. “Don't you *dare* be noble.”

She takes the fuse out of your hand, strikes a match on her boot, and lights it herself. “If we're going to die,” she says, “we're going to do it together. That was the deal.”

Morrow shouts. The fuse hisses.`;
      }
      if (this._state?.flags?.includes("rosa_escape")) {
        return `You drop the fuse. Rosa stares at it, then at you.

“The ledgers,” she says.

“I know.”

“The money.”

“I know.”

She laughs—wild, incredulous. “You really are a terrible outlaw.”

She grabs your hand and runs.`;
      }
      return `You strike the match. Rosa's grin goes wide enough to hurt.

“That's my girl,” she says.

The fuse hisses. Morrow shouts. The world goes white.`;
    },
    next: "final_rosa_5",
  },
  final_rosa_5: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "narrator",
    mood: "After the noise",
    get text() {
      const obs = this._state?.obsession?.rosa ?? 0;
      const love = this._state?.affection?.rosa ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `The powder shed goes up. The assay office follows. In the chaos, Rosa drags you through the tunnel and out into the dawn.

She has the ledgers. She has the money. She has a stolen carriage waiting behind the church.

She also has handcuffs.

“A precaution,” she says, clicking one around your wrist and the other around hers. “You were going to leave. I saw it.”

She kisses your forehead. “Till the wheels come off, corazón.”`;
      }
      return `The powder shed goes up. The assay office follows. In the chaos, Rosa drags you through the tunnel and out into the dawn.

She has the ledgers. She has the money. She has a stolen carriage waiting behind the church.

“The south road,” she gasps, laughing. “I can't believe that worked.”

Behind you, Cinder Gulch is ringing like a bell. Ahead, the border. Between you, a future with no walls.`;
    },
    next: "final_rosa_6",
  },
  final_rosa_6: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "rosa",
    get text() {
      const obs = this._state?.obsession?.rosa ?? 0;
      const love = this._state?.affection?.rosa ?? 0;
      if (obs >= 5 && obs >= love - 1) {
        return `She holds up the ledgers. “We'll publish them from Mexico. Ruin Morrow from a cantina. Very romantic.”

She clicks the handcuff. The key disappears into her pocket.

“Don't look so worried,” she says. “I'll take it off when you stop looking at the door.”

The horses run. The cuffs chime. The horizon comes closer and closer and never arrives.`;
      }
      return `She holds up the ledgers. “We'll send these to the marshal from El Paso. Then we'll disappear.”

She looks at the tickets in her pocket, then at you. “Unless you want to stay? Help rebuild? I hear the mine's going to need a new owner.”

You think of the key on the bar. The report in the clinic. The town full of women who kept pieces of you.

“South,” you say. “But we can come back.”

Rosa's smile is the sunrise.`;
    },
    next: "ending_rosa",
  },
  ending_rosa: {
    bg: "mine",
    cast: ["rosa"],
    camera: "close",
    speaker: "narrator",
    ending: "rosa",
    text: ``,
  },

  final_all_1: {
    chapter: "FINALE",
    place: "The Gilded Lily · Dawn",
    actTitle: "Three of a Kind",
    actSub: "Everyone's finale · an impossible hand",
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    transition: true,
    speaker: "narrator",
    mood: "Three women, one table",
    text: `You put your hand flat on the table, covering the key, the bullet, and the ticket.

“All three,” you say. “Or none of me.”

The silence is enormous.

Clementine laughs first. Then Ada. Then Rosa. Then all three of them are laughing, and none of them is entirely happy about it.`,
    next: "final_all_2",
  },
  final_all_2: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "clem",
    mood: "A proposal",
    text: `“You want us to share,” Clementine says. “Like a card game.”

“Like a town,” Ada corrects. “Shared infrastructure. Clear boundaries. Regular review.”

Rosa puts her boots on the table. “I want a rota.”

“You cannot have a rota for a relationship,” Ada says.

“Watch me.”`,
    next: "final_all_3",
  },
  final_all_3: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "Morrow arrives",
    text: `The batwing doors bang open.

Morrow stands in the doorway with rain on his shoulders and six men behind him. He looks at the three women, then at you, then at the key, the bullet, and the ticket.

“I don't have time for whatever this is,” he says. “Give me the ledgers.”

Clementine racks the shotgun. Ada picks up the arsenic report. Rosa lights a stick of dynamite and holds it up like a cigar.

“Mr. Morrow,” Ada says, “we were just discussing infrastructure.”`,
    next: "final_all_choice",
  },
  final_all_choice: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "june",
    mood: "The town, deciding",
    text: `Outside, the miners are gathering. Inside, three women are waiting for you to say something.

The key. The bullet. The ticket. The fuse.`,
    choices: [
      {
        text: "“Take the mine. Give it back to the town.”",
        sub: "Make Morrow watch everything he built become something better.",
        tag: "TOGETHER",
        effects: { love: { clem: 1, ada: 1, rosa: 1 }, obsession: { clem: 1 }, flag: "all_town" },
        next: "final_all_4",
      },
      {
        text: "“Burn his ledgers. Let the truth be the explosion.”",
        sub: "No more secrets. No more leverage. Just the whole ugly truth.",
        tag: "TRUTH",
        effects: { love: { clem: 1, ada: 1, rosa: 1 }, obsession: { ada: 1 }, flag: "all_truth" },
        next: "final_all_4",
      },
      {
        text: "“South. All of us. Today.”",
        sub: "One town can't hold you. Maybe a horizon can.",
        tag: "FREEDOM",
        effects: { love: { clem: 1, ada: 1, rosa: 1 }, obsession: { rosa: 1 }, flag: "all_road" },
        next: "final_all_4",
      },
    ],
  },
  final_all_4: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    get text() {
      if (this._state?.flags?.includes("all_road")) {
        return `Morrow opens his mouth. Rosa throws the dynamite.

It is a very small charge. It makes a very large noise. By the time the smoke clears, Morrow's men have remembered urgent business elsewhere and Morrow is sitting on the floor with his hat over his eyes.

The four of you take the south road before noon. The Gilded Lily stays open under new management. The clinic gets a new doctor. The stable gets a new sign.

Cinder Gulch will tell stories about you for fifty years. Most of them will be true.`;
      }
      return `Morrow opens his mouth. Clementine fires a warning shot through his hat.

By the time the smoke clears, the miners are inside, the ledgers are on the bar, and Ada is reading the arsenic report aloud in her calm, carrying voice.

Morrow's men put down their rifles. Morrow puts up his hands. The town puts him in a wagon and sends him toward the territorial marshal with a note that says *do not return him.*

The Gilded Lily stays open. It belongs to everyone now. So does the mine. So, in a way, do you.`;
    },
    next: "final_all_5",
  },
  final_all_5: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "A town, shared",
    text: `That night, the four of you sit at the table with the key, the bullet, and the ticket between you.

“Rules,” Ada says. “We need rules.”

“No keeping,” Clementine says, and looks at you. “I'm working on it.”

“No handcuffs,” Rosa says, and looks at you. “Unless requested.”

“No disappearing,” you say.

They all look at you.

“I mean it,” you say. “I'm staying. Not because I'm kept. Because I choose this. All of it. All of you.”

The clock strikes midnight. Outside, the town is singing.`,
    next: "ending_all",
  },
  ending_all: {
    bg: "saloonDawn",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    ending: "all",
    text: ``,
  },

  final_alone_1: {
    chapter: "FINALE",
    place: "Cinder Gulch · Dawn",
    actTitle: "The Open Road",
    actSub: "June's finale · one woman and a horizon",
    bg: "streetDawn",
    cast: [],
    camera: "wide",
    transition: true,
    speaker: "narrator",
    mood: "The stage road, dawn",
    text: `You leave the key on the bar, the bullet on the clinic desk, and the tickets in Rosa's shirt pocket.

You do not make a speech. You have made enough speeches. You have been enough things to enough people.

You saddle a horse that does not belong to you, and leave a note that says *I'm sorry. I'm not sorry.*`,
    next: "final_alone_2",
  },
  final_alone_2: {
    bg: "streetDawn",
    cast: castAll,
    camera: "wide",
    speaker: "narrator",
    mood: "Three women in a doorway",
    text: `They are standing in the doorway of the Gilded Lily when you ride past. Clementine with her arms crossed. Ada with her hands folded. Rosa with her hat in her hands.

They do not call after you. They do not draw.

Clementine lifts one hand. It might be a wave. It might be a warning.

You do not look back.`,
    next: "final_alone_3",
  },
  final_alone_3: {
    bg: "streetDawn",
    cast: [],
    camera: "wide",
    speaker: "june",
    mood: "The road",
    text: `“I am not a town,” you say, to no one. “I am a road.”

The horse snorts. The sun comes up. The desert opens its long, patient hands.`,
    next: "final_alone_choice",
  },
  final_alone_choice: {
    bg: "streetDawn",
    cast: [],
    camera: "wide",
    speaker: "june",
    mood: "One last look",
    text: `At the edge of town, the road forks. South, toward El Paso. North, toward the mountains.

Behind you, three women are still standing in the doorway.`,
    choices: [
      {
        text: "Ride south. Don't look back.",
        sub: "The horizon is a kind of lover, too.",
        tag: "LEAVE",
        effects: { flag: "alone_leave" },
        next: "final_alone_4",
      },
      {
        text: "Look back. Just once.",
        sub: "Some doors close louder than others.",
        tag: "HESITATE",
        effects: { obsession: { clem: 1, ada: 1, rosa: 1 }, flag: "alone_look" },
        next: "final_alone_4",
      },
    ],
  },
  final_alone_4: {
    bg: "streetDawn",
    cast: [],
    camera: "wide",
    speaker: "narrator",
    get text() {
      const maxObs = Math.max(
        this._state?.obsession?.clem ?? 0,
        this._state?.obsession?.ada ?? 0,
        this._state?.obsession?.rosa ?? 0
      );
      if (maxObs >= 5) {
        return `You look back.

The doorway is empty. For a moment, you feel something like relief.

Then you hear the hooves.

Three riders, coming hard, spread across the road like a net. Clementine's red hair. Ada's pale coat. Rosa's hat, low against the wind.

They do not shout. They do not need to. You know exactly what they are going to say.

*You can't outrun a town.*

You kick the horse. The race begins.`;
      }
      return `You look back.

Clementine lifts her hand again. This time it is definitely a wave. Ada nods, once, as if confirming a diagnosis. Rosa puts her hat on and grins.

They let you go. That is the gift.

You ride south, into the light, with three women behind you and the whole world ahead.`;
    },
    next: "ending_alone",
  },
  ending_alone: {
    bg: "streetDawn",
    cast: [],
    camera: "wide",
    speaker: "narrator",
    ending: "alone",
    text: ``,
  },
};

export function resolveEnding(state, pick) {
  if (pick === "clem") {
    const { clem: love } = state.affection;
    const { clem: obs } = state.obsession;
    return obs >= 5 && obs >= love - 1 ? ENDING_BY_ID.clem_cage : ENDING_BY_ID.clem_lily;
  }
  if (pick === "ada") {
    const love = state.affection.ada;
    const obs = state.obsession.ada;
    return obs >= 5 && obs >= love - 1 ? ENDING_BY_ID.ada_specimen : ENDING_BY_ID.ada_clean;
  }
  if (pick === "rosa") {
    const love = state.affection.rosa;
    const obs = state.obsession.rosa;
    return obs >= 5 && obs >= love - 1 ? ENDING_BY_ID.rosa_wheels : ENDING_BY_ID.rosa_border;
  }
  if (pick === "all") return ENDING_BY_ID.three_of_kind;
  const maxObs = Math.max(state.obsession.clem, state.obsession.ada, state.obsession.rosa);
  return maxObs >= 5 ? ENDING_BY_ID.hunt : ENDING_BY_ID.ride_on;
}

export const GALLERY_ENDINGS = ENDINGS.map((ending) => ({
  id: ending.id,
  title: ending.title,
  route: ending.route,
  tag: ending.tag,
  color: ending.color,
  sigil: ending.sigil,
}));
