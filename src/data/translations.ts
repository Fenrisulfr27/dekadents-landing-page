export const translations = {
  en: {
    menu: "Menu",
    home: "Home",
    about: "About",
    gallery: "Gallery",
    rules: "Rules",
    join: "Join",
    joinDiscord: "Join Discord",
    joinOurDiscord: "Join Our Discord",
    enterDecadence: "Enter the Decadence",
    dekadents: "DEKADENTS",
    curatedArchive: "Curated archive",
    galleryDescription:
      "A curated archive of dark aesthetics, visual experiments, and selected work from the Dekadents community.",
    all: "All",
    featured: "Featured",
    digital: "Digital",
    traditional: "Traditional",
    photography: "Photography",
    sketches: "Sketches",
    communityDescription:
      "A Discord community for artists, photographers, poets, and anyone drawn to creative expression.",
    communityText:
      "Share your work. Find inspiration. Connect with people who move in the same creative direction.",
    learnMore: "Learn More",
    submitWork: "Submit your work",
    submitDescription:
      "Join the Discord server, share your work, and get featured in the archive.",

    artFeedback: "Art & Feedback",
    artFeedbackDesc:
      "Share your work and get constructive feedback from fellow creatives.",
    inspiration: "Inspiration",
    inspirationDesc:
      "Share references, visuals, and ideas, and find inspiration through the work and discussions of others.",
    community: "Community",
    communityDesc:
      "A friendly and active creative community from around the world.",
    exclusiveRoles: "Trivia & Weekly Challenges",
    exclusiveRolesDesc:
      "Test your knowledge in art-themed trivia and take part in weekly drawing and photography challenges.",

    featuredWork: "Featured work",
    rulesTitle: "Rules",
    rule1:
      "Do not share, repost, distribute, or circulate anyone's work outside this community without the creator's explicit consent. This includes screenshots, downloads, reposts, and sending other content to third parties.",

    aboutTitle: "About",
    aboutDescription:
      "Dekadents is a curated Discord community for artists, photographers, poets, and other creatives who are drawn to darker aesthetics, visual experimentation, and sincere creative exchange. It is a space for sharing work, discovering new inspiration, and connecting with people who value originality, atmosphere, and artistic identity.",
    aboutMission: "Our Mission",
    aboutMissionText:
      "Our mission is to create a focused and inspiring environment where members can share their work, receive meaningful feedback, develop their ideas, and grow alongside a community that values authenticity, experimentation, and artistic integrity.",
    aboutWhat: "What You Can Do Here",
    aboutWhatText:
      "Share your work in dedicated channels • Receive thoughtful feedback and critique • Exchange references, ideas, and inspiration • Take part in art trivia and weekly drawing or photography challenges • Discover other artists and their work • Become part of a carefully curated creative community.",
  },

  et: {
    menu: "Menüü",
    home: "Avaleht",
    about: "Meist",
    gallery: "Galerii",
    rules: "Reeglid",
    join: "Liitu",
    joinDiscord: "Liitu Discordiga",
    joinOurDiscord: "Liitu meie Discordiga",
    enterDecadence: "Sisene Dekadentsi",
    dekadents: "DEKADENTS",
    communityDescription:
      "Discordi kogukond kunstnikele, fotograafidele, luuletajatele ja teistele loomehuvilistele.",
    communityText:
      "Jaga oma loomingut. Saa inspiratsiooni. Leia sarnase loometunnetusega inimesi.",
    learnMore: "Lisateave",
    submitWork: "Esita oma töö",
    submitDescription:
      "Liitu Discordi serveriga, jaga oma tööd ja saa esindatud galeriis.",

    artFeedback: "Loome & Tagasiside",
    artFeedbackDesc:
      "Jaga oma tööd ja saa konstruktiivset tagasisidet teistelt loomeinimestelt.",
    inspiration: "Inspirasioon",
    inspirationDesc:
      "Jaga viiteid, visuale ja ideid ning leia inspiratsiooni teiste loomingust ja aruteludest.",
    community: "Kogukond",
    communityDesc:
      "Sõbralik ja aktiivne loomeinimeste kogukond kogu maailmast.",
    exclusiveRoles: "Mälumäng & nädalaväljakutsed",
    exclusiveRolesDesc:
      "Pane end proovile kunstiteemalises trivias ning osale iganädalastes joonistamis- ja fotograafiaväljakutsetes.",

    featuredWork: "Esiletõstetud töö",
    rulesTitle: "Reeglid",
    rule1:
      "Serveris jagatud tööde või loomingu levitamine ja edasi saatmine väljapoole serverit ilma autori selgesõnalise nõusolekuta on keelatud. See hõlmab kuvatõmmiseid, allalaadimisi või muu sisu saatmist kolmandatele osapooltele.",

    aboutTitle: "Meist",
    aboutDescription:
      "Dekadents on kureeritud Discordi kogukond kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele, keda kõnetavad tumedam esteetika, visuaalsed eksperimendid ja siiras loominguline eneseväljendus. See on koht, kus saab jagada oma töid, leida uut inspiratsiooni ja suhelda inimestega, kes väärtustavad originaalsust, atmosfääri ja kunstilist identiteeti.",
    aboutMission: "Meie missioon",
    aboutMissionText:
      "Meie eesmärk on luua keskendunud ja inspireeriv keskkond, kus liikmed saavad oma loomingut jagada, sisukat tagasisidet saada, ideid arendada ning kasvada koos kogukonnaga, mis väärtustab ausust, eksperimenteerimist ja kunstilist terviklikkust.",
    aboutWhat: "Mida siin teha saab",
    aboutWhatText:
      "Jaga oma töid eraldi kanalites • Saa läbimõeldud tagasisidet ja kriitikat • Vaheta viiteid, ideid ja inspiratsiooni • Osale kunstiteemalises trivias ning iganädalastes joonistamis- või fotograafiaväljakutsetes • Avasta teiste loojate töid • Ole osa hoolikalt kureeritud loomingulisest kogukonnast.",

    curatedArchive: "Kureeritud arhiiv",
    galleryDescription:
      "Tumeda esteetika, visuaalsete katsetuste ja Dekadentsi kogukonna valitud tööde kureeritud arhiiv.",
    all: "Kõik",
    featured: "Esiletõstetud",
    digital: "Digitaalne",
    traditional: "Traditsiooniline",
    photography: "Fotograafia",
    sketches: "Visandid",
  },
};

export type TranslationKey = keyof (typeof translations)["en"];
