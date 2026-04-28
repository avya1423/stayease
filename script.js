// =====================================================
//  SheherSaathi v4 — Complete Script
// =====================================================

let activeCity   = 'Bhopal';
let activeCat    = 'hospital';
let selRating    = 0;
let currentPG    = null;
let currentLang  = 'en';

// =====================================================
//  TRANSLATIONS
// =====================================================
const T = {
  en: {
    heroTitle: 'Find Your Home<br><em>Away From Home</em>',
    heroSub: 'PG Finder · Fare Calculator · City Guide · Emergency Helplines',
    searchPlaceholder: 'Search PG, area, or city...',
    pgHeading: city => `PGs in ${city}`,
    fareHeading: city => `${city} Fare Calculator`,
    guideHeading: city => `${city} City Guide`,
    nearbyHeading: city => `Nearby Places in ${city}`,
    langBtn: 'Switch to Hindi',
    fromLabel: 'From',
    toLabel: 'To',
    callBtn: '📞 Call',
    mapBtn: '📍 Map',
    saveBtn: '❤️',
    bestTag: 'Best',
    selectSource: 'Select source...',
    selectDest: 'Select destination...',
    noResults: 'No PGs found. Try different filters.',
    reviewPosted: 'Review posted! Thank you.',
    reviewError: 'Please write a review and select a rating.',
    saved: 'Saved to favourites ❤️',
    alreadySaved: 'Already saved 👍',
    loginSuccess: name => `Welcome, ${name}!`,
    registerSuccess: 'Account created! Please sign in.',
    profileSaved: 'Profile updated successfully!',
    pgAdded: 'Your PG has been listed successfully!',
    pgError: 'Please fill all required fields.',
    loginError: 'Please enter your name, email and password.',
    passError: 'Passwords do not match.',
    passTooShort: 'Password must be at least 6 characters.',
    invalidEmail: 'Please enter a valid email address.',
    wrongPass: 'Incorrect password. Please try again.',
    userNotFound: 'No account found. Please register first.',
  },
  hi: {
    heroTitle: 'अपना घर खोजें<br><em>नए शहर में</em>',
    heroSub: 'PG खोजें · किराया जानें · सिटी गाइड · इमरजेंसी हेल्पलाइन',
    searchPlaceholder: 'PG, इलाका या शहर खोजें...',
    pgHeading: city => `${city} में PG`,
    fareHeading: city => `${city} किराया कैलकुलेटर`,
    guideHeading: city => `${city} सिटी गाइड`,
    nearbyHeading: city => `${city} के पास`,
    langBtn: 'English पर जाएं',
    fromLabel: 'कहाँ से',
    toLabel: 'कहाँ जाना है',
    callBtn: '📞 कॉल',
    mapBtn: '📍 मैप',
    saveBtn: '❤️',
    bestTag: 'बेस्ट',
    selectSource: 'कहाँ से चुनें...',
    selectDest: 'कहाँ जाना है...',
    noResults: 'कोई PG नहीं मिला। फ़िल्टर बदलें।',
    reviewPosted: 'रिव्यू पोस्ट हो गया! धन्यवाद।',
    reviewError: 'रिव्यू लिखें और स्टार चुनें।',
    saved: 'फेवरेट में सेव हो गया ❤️',
    alreadySaved: 'पहले से सेव है 👍',
    loginSuccess: name => `स्वागत है, ${name}!`,
    registerSuccess: 'अकाउंट बन गया! साइन इन करें।',
    profileSaved: 'प्रोफाइल अपडेट हो गई!',
    pgAdded: 'आपका PG लिस्ट हो गया!',
    pgError: 'सभी जरूरी फ़ील्ड भरें।',
    loginError: 'नाम, ईमेल और पासवर्ड डालें।',
    passError: 'पासवर्ड मेल नहीं खाते।',
    passTooShort: 'पासवर्ड कम से कम 6 अक्षर का हो।',
    invalidEmail: 'सही ईमेल डालें।',
    wrongPass: 'गलत पासवर्ड।',
    userNotFound: 'अकाउंट नहीं मिला। पहले रजिस्टर करें।',
  }
};

function t(key, ...args) {
  const val = T[currentLang][key];
  return typeof val === 'function' ? val(...args) : val;
}

// =====================================================
//  CITY DATA
// =====================================================
const cityData = {
  Bhopal: {
    fareFrom: [
      {val:'bj',label:'Bhopal Junction (Main Station)'},
      {val:'rk',label:'Rani Kamlapati Station'},
      {val:'isbt',label:'ISBT Bus Stand'},
      {val:'aprt',label:'Raja Bhoj Airport'},
    ],
    fareTo: [
      {val:'mpn',label:'MP Nagar'},{val:'nm',label:'New Market'},
      {val:'ac',label:'Arera Colony'},{val:'tt',label:'TT Nagar'},
      {val:'kol',label:'Kolar Road'},{val:'man',label:'MANIT / University'},
      {val:'aim',label:'AIIMS Bhopal'},{val:'dbc',label:'DB City Mall'},
      {val:'ham',label:'Hamidia Hospital'},{val:'ob',label:'Old Bhopal / Chowk'},
    ],
    fares: {
      bj:{mpn:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–150',b:'₹60–90',e:'₹40–60',n:'Prepaid auto booth at main gate (right side)'},nm:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:'Route passes through Old Bhopal'},ac:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹120–160',b:'₹80–110',e:'N/A',n:'Quiet residential area'},tt:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹60–90',b:'₹40–65',e:'₹30–50',n:'Government offices area'},kol:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹180–250',b:'₹120–170',e:'N/A',n:'Far area, cab recommended'},man:{d:'5 km',t:'18 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Popular student area'},aim:{d:'9 km',t:'28 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:'Near Saket Nagar'},dbc:{d:'6 km',t:'20 min',a:'₹80–110',c:'₹100–140',b:'₹65–95',e:'N/A',n:'Near MP Nagar'},ham:{d:'1 km',t:'5 min',a:'₹30–50',c:'₹50–70',b:'₹25–40',e:'₹20–30',n:'Can walk from station'},ob:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹60–90',b:'₹35–55',e:'₹25–40',n:'Expect traffic at Chowk area'}},
      rk:{mpn:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:'Metro also available from Rani Kamlapati'},nm:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'N/A',n:''},ac:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'N/A',n:''},tt:{d:'5 km',t:'16 min',a:'₹70–100',c:'₹90–120',b:'₹55–85',e:'N/A',n:''},kol:{d:'9 km',t:'28 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:''},man:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''},aim:{d:'6 km',t:'20 min',a:'₹90–130',c:'₹110–160',b:'₹70–110',e:'N/A',n:''},dbc:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},ham:{d:'7 km',t:'22 min',a:'₹90–130',c:'₹110–150',b:'₹75–110',e:'N/A',n:''},ob:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''}},
      isbt:{mpn:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:'ISBT Nadra Bus Stand'},nm:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'₹35–55',n:''},ac:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''},tt:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹60–80',b:'₹30–50',e:'₹25–40',n:''},kol:{d:'11 km',t:'32 min',a:'₹140–190',c:'₹170–230',b:'₹115–160',e:'N/A',n:''},man:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'N/A',n:''},aim:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},dbc:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'N/A',n:''},ham:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹70–90',b:'₹40–65',e:'₹30–50',n:''},ob:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹70–90',b:'₹40–65',e:'₹30–50',n:''}},
      aprt:{mpn:{d:'11 km',t:'32 min',a:'₹180–240',c:'₹220–300',b:'N/A',e:'N/A',n:'Ola/Uber prepaid recommended at airport'},nm:{d:'14 km',t:'40 min',a:'₹200–280',c:'₹260–350',b:'N/A',e:'N/A',n:''},ac:{d:'12 km',t:'35 min',a:'₹180–250',c:'₹230–310',b:'N/A',e:'N/A',n:''},tt:{d:'13 km',t:'38 min',a:'₹190–260',c:'₹240–320',b:'N/A',e:'N/A',n:''},kol:{d:'8 km',t:'25 min',a:'₹130–180',c:'₹160–220',b:'N/A',e:'N/A',n:''},man:{d:'10 km',t:'30 min',a:'₹160–220',c:'₹200–270',b:'N/A',e:'N/A',n:''},aim:{d:'7 km',t:'22 min',a:'₹110–160',c:'₹150–200',b:'N/A',e:'N/A',n:''},dbc:{d:'11 km',t:'32 min',a:'₹170–230',c:'₹210–280',b:'N/A',e:'N/A',n:''},ham:{d:'16 km',t:'45 min',a:'₹230–300',c:'₹280–380',b:'N/A',e:'N/A',n:''},ob:{d:'15 km',t:'42 min',a:'₹220–290',c:'₹270–360',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'Exit the Platform',desc:'Follow exit boards. Bhopal Junction has Exit Gate 1 (Main) and Gate 2. Rani Kamlapati also has Metro connectivity.',tip:'Fix coolie rate before handing bags'},
      {title:'Prepaid Auto Counter',desc:'A prepaid auto booth is available outside the main gate (right side). Fixed rates — no bargaining needed. Safest option for first-timers.',tip:'Look for the green booth at the main gate'},
      {title:'Get a SIM Card',desc:'Airtel and Jio shops are available inside and outside the station. Carry your Aadhaar card for new SIM activation. Jio and Airtel both have strong networks in Bhopal.',tip:''},
      {title:'ATM & Cash',desc:'SBI, HDFC, and PNB ATMs are available inside and outside the station. Use the indoor ATM at night — safer option.',tip:''},
      {title:'Food & Water',desc:'IRCTC stalls and private food stalls are available. Bhopal is famous for Poha-Jalebi — try it right outside the station! Always buy sealed water bottles.',tip:'Must try: Poha-Jalebi — Bhopal\'s signature breakfast!'},
      {title:'If You Need Help',desc:'RPF (Railway Police Force) office is inside the station. Approach them for any issue. Railway helpline: 139. City police: 100.',tip:'Avoid staying alone at the station at night'},
    ],
    helplines:[
      {icon:'🚂',name:'Railway Helpline',num:'139',desc:'Train info, emergency, lost & found'},
      {icon:'🚔',name:'Bhopal City Police',num:'0755-2443573',desc:'Local police helpline'},
      {icon:'🏥',name:'Hamidia Hospital',num:'0755-2540222',desc:'Govt hospital, 24x7 emergency'},
      {icon:'👩',name:'Women Helpline',num:'1091',desc:'24x7 Toll Free'},
      {icon:'🧒',name:'Child Helpline',num:'1098',desc:'Toll Free, 24x7'},
      {icon:'🗺️',name:'MP Tourism Helpline',num:'1800-233-3232',desc:'Toll Free tourist assistance'},
    ],
    nearby:{
      hospital:[{name:'Hamidia Hospital',dist:'1.5 km',desc:'Largest govt hospital — 24x7 emergency'},{name:'AIIMS Bhopal',dist:'9 km',desc:'Premier govt hospital, Saket Nagar'},{name:'Bhopal Memorial Hospital',dist:'6 km',desc:'Bhopal Gas Tragedy hospital'},{name:'Bansal Hospital',dist:'7 km',desc:'Top private hospital, MP Nagar'}],
      police:[{name:'Bhopal Junction GRP',dist:'At Station',desc:'Railway police — inside premises'},{name:'TT Nagar Police Station',dist:'3 km',desc:'Near government offices'},{name:'MP Nagar Police Station',dist:'7 km',desc:'Commercial zone police'},{name:'Kotwali Police Station',dist:'2 km',desc:'Old Bhopal area'}],
      atm:[{name:'SBI ATM',dist:'Inside Station',desc:'24x7, reliable'},{name:'HDFC ATM — New Market',dist:'3 km',desc:'Near shopping area'},{name:'PNB ATM — TT Nagar',dist:'3.5 km',desc:'Near government offices'},{name:'ICICI ATM — MP Nagar',dist:'7 km',desc:'Commercial zone'}],
      food:[{name:'Chatori Gali — New Market',dist:'3 km',desc:'Famous street food — Poha, Jalebi, Bhutte ka Kees'},{name:'DB Mall Food Court',dist:'6 km',desc:'All cuisines, air-conditioned'},{name:'Manohar Dairy',dist:'2 km',desc:'Famous sweets and snacks'},{name:'Under the Mango Tree',dist:'8 km',desc:'Popular rooftop cafe, MP Nagar'}],
      transport:[{name:'Bhopal Junction',dist:'0 km',desc:'Main station — trains to all cities'},{name:'ISBT Bus Stand',dist:'3 km',desc:'Buses — MP, UP, Rajasthan'},{name:'Rani Kamlapati Station',dist:'5 km',desc:'Modern station with Metro'},{name:'Raja Bhoj Airport',dist:'12 km',desc:'IndiGo, Air India, SpiceJet'}],
    },
  },
  Delhi: {
    fareFrom:[{val:'ndls',label:'New Delhi Railway Station'},{val:'nizm',label:'Nizamuddin Station'},{val:'igt',label:'IGI Airport (T3)'},{val:'isbt',label:'Kashmere Gate ISBT'}],
    fareTo:[{val:'cp',label:'Connaught Place'},{val:'krol',label:'Karol Bagh'},{val:'lajp',label:'Lajpat Nagar'},{val:'dwrk',label:'Dwarka'},{val:'noid',label:'Noida Sector 18'},{val:'grgn',label:'Gurugram (Gurgaon)'}],
    fares:{
      ndls:{cp:{d:'3 km',t:'15 min',a:'₹60–100',c:'₹80–120',b:'₹50–80',e:'₹30–50',n:'Take Metro — Yellow Line to Rajiv Chowk'},krol:{d:'2 km',t:'10 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},lajp:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},dwrk:{d:'18 km',t:'45 min',a:'₹250–350',c:'₹300–420',b:'N/A',e:'N/A',n:'Metro preferred — Blue Line'},noid:{d:'22 km',t:'55 min',a:'₹300–400',c:'₹350–480',b:'N/A',e:'N/A',n:'Take Metro — Yellow + Blue line'},grgn:{d:'30 km',t:'70 min',a:'₹400–550',c:'₹450–650',b:'N/A',e:'N/A',n:'Cab recommended'}},
      nizm:{cp:{d:'6 km',t:'20 min',a:'₹100–140',c:'₹120–160',b:'₹80–120',e:'N/A',n:''},krol:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:''},lajp:{d:'4 km',t:'15 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹35–55',n:''},dwrk:{d:'20 km',t:'50 min',a:'₹280–380',c:'₹330–450',b:'N/A',e:'N/A',n:''},noid:{d:'18 km',t:'45 min',a:'₹250–340',c:'₹300–400',b:'N/A',e:'N/A',n:''},grgn:{d:'28 km',t:'65 min',a:'₹380–520',c:'₹430–600',b:'N/A',e:'N/A',n:''}},
      igt:{cp:{d:'16 km',t:'40 min',a:'₹350–480',c:'₹400–550',b:'N/A',e:'N/A',n:'Airport Express Metro is most convenient'},krol:{d:'18 km',t:'45 min',a:'₹380–520',c:'₹440–600',b:'N/A',e:'N/A',n:''},lajp:{d:'14 km',t:'35 min',a:'₹300–420',c:'₹360–490',b:'N/A',e:'N/A',n:''},dwrk:{d:'8 km',t:'22 min',a:'₹160–220',c:'₹200–280',b:'N/A',e:'N/A',n:''},noid:{d:'38 km',t:'80 min',a:'₹500–700',c:'₹600–850',b:'N/A',e:'N/A',n:''},grgn:{d:'14 km',t:'35 min',a:'₹300–420',c:'₹360–490',b:'N/A',e:'N/A',n:''}},
      isbt:{cp:{d:'5 km',t:'18 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Metro: Yellow Line from Kashmere Gate'},krol:{d:'5 km',t:'16 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:''},lajp:{d:'11 km',t:'30 min',a:'₹160–220',c:'₹190–260',b:'N/A',e:'N/A',n:''},dwrk:{d:'23 km',t:'55 min',a:'₹320–440',c:'₹380–520',b:'N/A',e:'N/A',n:''},noid:{d:'25 km',t:'60 min',a:'₹350–480',c:'₹410–560',b:'N/A',e:'N/A',n:''},grgn:{d:'33 km',t:'75 min',a:'₹450–620',c:'₹520–720',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'Exit New Delhi Station',desc:'There are 3 exits — Paharganj side, Ajmeri Gate, and Sadar Bazaar. Paharganj side is best for budget hotels.',tip:'CSMT and Hazrat Nizamuddin are different stations — don\'t get confused'},
      {title:'Take the Metro',desc:'Delhi Metro is India\'s best public transport. Metro entry is right at the station. Buy a single journey token or Day Pass. Airport Express is also available.',tip:'Avoid rush hours: 9–11am and 6–9pm'},
      {title:'Auto / Cab',desc:'Delhi autos run on meter officially. Ola/Uber are very reliable in Delhi. Prepaid taxi booth is available outside New Delhi Station.',tip:'Use app cabs for transparent pricing'},
      {title:'Cash & SIM',desc:'ATMs are available inside the station. Airtel/Jio stores are nearby. Carry your Aadhaar card for SIM activation.',tip:''},
      {title:'Find Accommodation',desc:'Paharganj has budget hotels (₹500–1500/night). Karol Bagh has mid-range options. Use SheherSaathi for PG listings.',tip:'Be careful in Paharganj — it\'s a busy tourist area'},
      {title:'In an Emergency',desc:'RPF is available inside the station. Delhi Police: 100. Women helpline: 1091.',tip:'Avoid travelling alone at night — use cabs'},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Delhi Police',num:'011-23490000',desc:'City helpline'},{icon:'🏥',name:'AIIMS Delhi',num:'011-26588500',desc:'Top govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚇',name:'Delhi Metro',num:'155370',desc:'Metro info helpline'}],
    nearby:{
      hospital:[{name:'AIIMS Delhi',dist:'8 km from NDLS',desc:'Top government hospital'},{name:'RML Hospital',dist:'4 km',desc:'Govt hospital near CP'},{name:'Safdarjung Hospital',dist:'7 km',desc:'Large govt hospital'},{name:'Apollo Hospital',dist:'10 km',desc:'Top private hospital'}],
      police:[{name:'NDLS Railway GRP',dist:'At Station',desc:'Railway police inside NDLS'},{name:'Connaught Place PS',dist:'4 km',desc:'Central Delhi'},{name:'Paharganj PS',dist:'1 km',desc:'Near budget hotel area'}],
      atm:[{name:'SBI ATM — NDLS',dist:'Inside',desc:'24x7'},{name:'HDFC — Connaught Place',dist:'4 km',desc:'Multiple ATMs'},{name:'PNB — Paharganj',dist:'1 km',desc:'Near hotels'}],
      food:[{name:'Paranthe Wali Gali',dist:'2 km',desc:'Famous Old Delhi street food'},{name:"Karim's — Jama Masjid",dist:'5 km',desc:'Iconic Mughlai restaurant'},{name:'CP Food Street',dist:'4 km',desc:'All cuisines available'}],
      transport:[{name:'New Delhi Metro',dist:'At NDLS',desc:'Yellow Line — Airport Express'},{name:'IGI Airport',dist:'16 km',desc:'All major airlines'},{name:'Kashmere Gate ISBT',dist:'5 km',desc:'Buses to all states'}],
    },
  },
  Mumbai:{
    fareFrom:[{val:'cst',label:'CSMT (Chhatrapati Shivaji)'},{val:'lr',label:'LTT (Lokmanya Tilak Terminus)'},{val:'bdr',label:'Bandra Terminus'},{val:'csia',label:'Mumbai Airport (CSIA)'}],
    fareTo:[{val:'ddr',label:'Dadar'},{val:'andr',label:'Andheri'},{val:'bonn',label:'Borivali'},{val:'thne',label:'Thane'},{val:'bkc',label:'BKC / Bandra'},{val:'navi',label:'Navi Mumbai'}],
    fares:{
      cst:{ddr:{d:'5 km',t:'25 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:'Local train is fastest and cheapest in Mumbai'},andr:{d:'18 km',t:'60 min',a:'₹200–280',c:'₹250–350',b:'N/A',e:'N/A',n:'Western local train is much faster'},bonn:{d:'35 km',t:'90 min',a:'₹400–550',c:'₹500–700',b:'N/A',e:'N/A',n:'Local train strongly recommended'},thne:{d:'34 km',t:'85 min',a:'₹380–520',c:'₹450–650',b:'N/A',e:'N/A',n:'Central line local train is best'},bkc:{d:'12 km',t:'40 min',a:'₹150–200',c:'₹180–250',b:'₹120–170',e:'N/A',n:''},navi:{d:'25 km',t:'65 min',a:'₹300–420',c:'₹360–500',b:'N/A',e:'N/A',n:'Harbour line local available'}},
      lr:{ddr:{d:'8 km',t:'30 min',a:'₹120–160',c:'₹150–210',b:'₹95–135',e:'N/A',n:''},andr:{d:'12 km',t:'40 min',a:'₹150–200',c:'₹190–260',b:'₹120–170',e:'N/A',n:''},bonn:{d:'28 km',t:'75 min',a:'₹320–440',c:'₹400–560',b:'N/A',e:'N/A',n:''},thne:{d:'20 km',t:'55 min',a:'₹240–330',c:'₹290–400',b:'N/A',e:'N/A',n:''},bkc:{d:'5 km',t:'20 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:''},navi:{d:'18 km',t:'50 min',a:'₹220–300',c:'₹270–380',b:'N/A',e:'N/A',n:''}},
      bdr:{ddr:{d:'7 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},andr:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹150–200',b:'₹95–135',e:'N/A',n:''},bonn:{d:'22 km',t:'60 min',a:'₹270–370',c:'₹330–460',b:'N/A',e:'N/A',n:''},thne:{d:'25 km',t:'65 min',a:'₹300–410',c:'₹360–500',b:'N/A',e:'N/A',n:''},bkc:{d:'2 km',t:'10 min',a:'₹50–80',c:'₹70–100',b:'₹40–65',e:'N/A',n:'BKC is very close to Bandra'},navi:{d:'25 km',t:'65 min',a:'₹300–420',c:'₹360–500',b:'N/A',e:'N/A',n:''}},
      csia:{ddr:{d:'12 km',t:'35 min',a:'₹200–280',c:'₹250–340',b:'N/A',e:'N/A',n:'Book Ola/Uber prepaid at airport'},andr:{d:'4 km',t:'15 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:'Airport is very close to Andheri'},bonn:{d:'20 km',t:'55 min',a:'₹260–360',c:'₹320–440',b:'N/A',e:'N/A',n:''},thne:{d:'22 km',t:'60 min',a:'₹280–380',c:'₹340–470',b:'N/A',e:'N/A',n:''},bkc:{d:'10 km',t:'30 min',a:'₹160–220',c:'₹200–280',b:'N/A',e:'N/A',n:''},navi:{d:'30 km',t:'75 min',a:'₹380–520',c:'₹460–640',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'CSMT or LTT?',desc:'CSMT (VT) is in South Mumbai. LTT in Kurla is for long-distance trains. Both have prepaid taxi booths and auto stands.',tip:'Black-yellow taxis and autos are available outside CSMT'},
      {title:'Mumbai Local Train',desc:'The lifeline of Mumbai! Cheap and fast. Western, Central, Harbour lines cover entire Mumbai. Travel anywhere for ₹5–15.',tip:'Rush hours (8–11am, 6–9pm) are extremely crowded'},
      {title:'Auto & Taxi',desc:'Mumbai autos and black-yellow taxis run on meter officially. Ola/Uber are very popular. AC cabs cost slightly more.',tip:'Auto meter uses revised rates — check the fare card'},
      {title:'Find Accommodation',desc:'Dadar, Andheri, and Thane are best for budget stays. Near CST is expensive. Use SheherSaathi for PG listings.',tip:''},
      {title:'Must Try Food',desc:'Vada Pav is Mumbai\'s national food — ₹15–20 everywhere. Also try Pav Bhaji and Misal Pav. All very affordable.',tip:'Must eat: Vada Pav!'},
      {title:'In an Emergency',desc:'Mumbai Police: 100. GRP is available at the station. Women helpline: 1091.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Mumbai Police',num:'022-22620111',desc:'City police'},{icon:'🏥',name:'KEM Hospital',num:'022-24107000',desc:'Main govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚦',name:'Traffic Helpline',num:'022-24934400',desc:'Traffic issues'}],
    nearby:{
      hospital:[{name:'KEM Hospital',dist:'Near Parel',desc:'Top government hospital Mumbai'},{name:'Tata Memorial',dist:'Parel',desc:'World class cancer hospital'},{name:'Hinduja Hospital',dist:'Mahim',desc:'Top private hospital'}],
      police:[{name:'CSMT GRP',dist:'At Station',desc:'Railway police'},{name:'Azad Maidan PS',dist:'2 km',desc:'South Mumbai'},{name:'Dadar PS',dist:'5 km',desc:'Central area'}],
      atm:[{name:'SBI — CSMT',dist:'Inside',desc:'24x7'},{name:'HDFC — Dadar',dist:'5 km',desc:''},{name:'ICICI — Andheri',dist:'18 km',desc:''}],
      food:[{name:'Juhu Beach Food Stalls',dist:'20 km',desc:'Famous Mumbai street food hub'},{name:'Mohammed Ali Road',dist:'3 km',desc:'Biryani and Iftar food street'},{name:'Chowpatty Beach',dist:'8 km',desc:'Bhel puri, Pav Bhaji'}],
      transport:[{name:'CSMT',dist:'0 km',desc:'Main railway station'},{name:'Mumbai Airport',dist:'25 km from CSMT',desc:'International + Domestic'},{name:'Dadar Bus Depot',dist:'5 km',desc:'State buses'}],
    },
  },
  Pune:{
    fareFrom:[{val:'pnst',label:'Pune Railway Station'},{val:'shiv',label:'Shivajinagar Station'},{val:'pnap',label:'Pune Airport'},{val:'swrg',label:'Swargate Bus Stand'}],
    fareTo:[{val:'korc',label:'Koregaon Park'},{val:'bner',label:'Baner / Balewadi'},{val:'hnjw',label:'Hinjawadi (IT Hub)'},{val:'koth',label:'Kothrud'},{val:'vman',label:'Viman Nagar'},{val:'pcmc',label:'Pimpri-Chinchwad'}],
    fares:{
      pnst:{korc:{d:'4 km',t:'15 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'₹35–55',n:'Koregaon Park has heavy traffic'},bner:{d:'15 km',t:'40 min',a:'₹180–240',c:'₹220–300',b:'₹150–200',e:'N/A',n:''},hnjw:{d:'22 km',t:'55 min',a:'₹280–380',c:'₹340–460',b:'N/A',e:'N/A',n:'IT hub — extra time during morning rush'},koth:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},vman:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:'Near the airport'},pcmc:{d:'18 km',t:'45 min',a:'₹220–300',c:'₹270–370',b:'N/A',e:'N/A',n:''}},
      shiv:{korc:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},bner:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'₹120–170',e:'N/A',n:''},hnjw:{d:'19 km',t:'50 min',a:'₹240–330',c:'₹300–410',b:'N/A',e:'N/A',n:''},koth:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹130–170',b:'₹80–120',e:'N/A',n:''},vman:{d:'10 km',t:'28 min',a:'₹130–175',c:'₹160–220',b:'₹105–145',e:'N/A',n:''},pcmc:{d:'17 km',t:'42 min',a:'₹210–285',c:'₹260–355',b:'N/A',e:'N/A',n:''}},
      pnap:{korc:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹130–175',b:'₹80–120',e:'N/A',n:'Book Ola/Uber at airport'},bner:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'N/A',e:'N/A',n:''},hnjw:{d:'18 km',t:'45 min',a:'₹230–315',c:'₹285–390',b:'N/A',e:'N/A',n:''},koth:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'N/A',e:'N/A',n:''},vman:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–65',e:'N/A',n:'Viman Nagar is very close to airport'},pcmc:{d:'25 km',t:'60 min',a:'₹310–425',c:'₹380–520',b:'N/A',e:'N/A',n:''}},
      swrg:{korc:{d:'6 km',t:'20 min',a:'₹90–130',c:'₹110–155',b:'₹70–105',e:'₹40–60',n:''},bner:{d:'17 km',t:'45 min',a:'₹210–285',c:'₹260–355',b:'N/A',e:'N/A',n:''},hnjw:{d:'24 km',t:'60 min',a:'₹300–410',c:'₹370–510',b:'N/A',e:'N/A',n:''},koth:{d:'5 km',t:'18 min',a:'₹75–110',c:'₹95–135',b:'₹60–90',e:'₹35–55',n:''},vman:{d:'10 km',t:'28 min',a:'₹130–175',c:'₹160–220',b:'N/A',e:'N/A',n:''},pcmc:{d:'18 km',t:'45 min',a:'₹225–305',c:'₹280–385',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'Exit Pune Station',desc:'Main exit is on the Shivajinagar side. Auto and cab stands are clearly marked outside. PMPML city bus is also available.',tip:'Autos outside Pune station may quote high — always bargain'},
      {title:'Auto / Cab',desc:'Pune autos officially run on meter. Ola/Uber are very active. Bike taxi is popular especially for IT areas like Hinjawadi.',tip:'For Hinjawadi, use Ola/Uber — autos often refuse to go there'},
      {title:'PMPML City Bus',desc:'Pune\'s affordable transport — ₹8–30 anywhere. Swargate and Shivajinagar are main bus hubs.',tip:''},
      {title:'Find Accommodation',desc:'Shivajinagar and Deccan area are best for budget stays. For IT jobs, find PG near Baner or Hinjawadi. Koregaon Park is premium.',tip:''},
      {title:'Must Try Food',desc:'Misal Pav and Vada Pav are very famous in Pune. FC Road and JM Road have lots of food options.',tip:'Must eat: Misal Pav — Punekars\' favourite breakfast!'},
      {title:'In an Emergency',desc:'Pune Railway Police is inside the station. City police: 100.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Pune City Police',num:'020-26122880',desc:'City helpline'},{icon:'🏥',name:'Sassoon Hospital',num:'020-26128000',desc:'Main govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚌',name:'PMPML Bus',num:'020-24501500',desc:'City bus info'}],
    nearby:{
      hospital:[{name:'Sassoon Hospital',dist:'Near Pune Station',desc:'Main government hospital'},{name:'Ruby Hall Clinic',dist:'Sangamvadi',desc:'Top private hospital'},{name:'KEM Hospital Pune',dist:'Rasta Peth',desc:'Government hospital'}],
      police:[{name:'Pune Railway GRP',dist:'At Station',desc:'Railway police'},{name:'Shivajinagar PS',dist:'2 km',desc:'Main area'},{name:'Deccan PS',dist:'4 km',desc:'Near FC Road'}],
      atm:[{name:'SBI — Pune Station',dist:'Inside',desc:'24x7'},{name:'HDFC — FC Road',dist:'4 km',desc:''},{name:'Axis — JM Road',dist:'4 km',desc:''}],
      food:[{name:'FC Road Food Stalls',dist:'4 km',desc:'Student area — affordable and tasty'},{name:'JM Road Restaurants',dist:'4 km',desc:'All cuisines'},{name:'Deccan Khau Galli',dist:'5 km',desc:'Famous street food lane'}],
      transport:[{name:'Pune Station',dist:'0 km',desc:'Main railway station'},{name:'Pune Airport',dist:'8 km',desc:'Domestic flights'},{name:'Swargate Bus Stand',dist:'6 km',desc:'State buses'}],
    },
  },
  Patna:{
    fareFrom:[{val:'pnbe',label:'Patna Junction'},{val:'rjpb',label:'Rajendra Nagar Station'},{val:'pnap',label:'Patna Airport'},{val:'pnbs',label:'Mithapur Bus Stand'}],
    fareTo:[{val:'borc',label:'Boring Road'},{val:'bori',label:'Bailey Road'},{val:'kank',label:'Kankarbagh'},{val:'rjnd',label:'Rajendra Nagar'},{val:'dnak',label:'Danapur'},{val:'frzr',label:'Frazer Road'}],
    fares:{
      pnbe:{borc:{d:'5 km',t:'18 min',a:'₹60–90',c:'₹80–120',b:'₹50–75',e:'₹35–55',n:'Autos in Patna mostly run on bargaining'},bori:{d:'6 km',t:'20 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:''},kank:{d:'7 km',t:'22 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Kankarbagh is a busy area'},rjnd:{d:'8 km',t:'25 min',a:'₹90–130',c:'₹115–155',b:'₹70–105',e:'₹45–65',n:''},dnak:{d:'15 km',t:'40 min',a:'₹170–230',c:'₹210–285',b:'N/A',e:'N/A',n:'Via highway'},frzr:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹55–80',b:'₹30–50',e:'₹25–40',n:'Very close to station'}},
      rjpb:{borc:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},bori:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},kank:{d:'5 km',t:'18 min',a:'₹65–95',c:'₹85–120',b:'₹50–80',e:'₹35–55',n:''},rjnd:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹55–80',b:'₹30–50',e:'₹25–40',n:''},dnak:{d:'12 km',t:'35 min',a:'₹140–190',c:'₹175–240',b:'N/A',e:'N/A',n:''},frzr:{d:'6 km',t:'20 min',a:'₹70–105',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:''}},
      pnap:{borc:{d:'8 km',t:'25 min',a:'₹100–140',c:'₹130–175',b:'₹80–115',e:'N/A',n:'Book Ola/Uber at airport'},bori:{d:'7 km',t:'22 min',a:'₹90–130',c:'₹115–155',b:'₹70–105',e:'N/A',n:''},kank:{d:'10 km',t:'30 min',a:'₹120–165',c:'₹150–205',b:'₹95–135',e:'N/A',n:''},rjnd:{d:'9 km',t:'27 min',a:'₹110–150',c:'₹140–190',b:'₹85–125',e:'N/A',n:''},dnak:{d:'20 km',t:'50 min',a:'₹240–330',c:'₹300–410',b:'N/A',e:'N/A',n:''},frzr:{d:'8 km',t:'25 min',a:'₹100–140',c:'₹130–175',b:'N/A',e:'N/A',n:''}},
      pnbs:{borc:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},bori:{d:'4 km',t:'15 min',a:'₹55–80',c:'₹72–105',b:'₹45–70',e:'₹30–50',n:''},kank:{d:'5 km',t:'18 min',a:'₹65–95',c:'₹85–120',b:'₹50–80',e:'₹35–55',n:''},rjnd:{d:'6 km',t:'20 min',a:'₹75–110',c:'₹95–135',b:'₹60–90',e:'₹38–58',n:''},dnak:{d:'13 km',t:'38 min',a:'₹155–210',c:'₹195–265',b:'N/A',e:'N/A',n:''},frzr:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''}},
    },
    guide:[
      {title:'Exit Patna Junction',desc:'Auto stand and e-rickshaw stand are clearly available outside the main exit. RPF police post is inside the station.',tip:'Beware of touts outside — negotiate auto fare yourself'},
      {title:'Auto & E-Rickshaw',desc:'Patna autos do not run on meter — bargaining is necessary. E-rickshaw is cheap for local areas. Ola/Uber is available.',tip:'Confirm the destination first — some drivers don\'t know far areas'},
      {title:'Cash & SIM',desc:'Airtel/Jio stores are near the station. SBI ATM is available inside the station. UPI is widely accepted everywhere.',tip:''},
      {title:'Find Accommodation',desc:'Budget stays available in Fraser Road and Kankarbagh area. For students, PGs near Rajendra Nagar and Bailey Road are great.',tip:''},
      {title:'Must Try Food',desc:'Litti-Chokha is Patna\'s most famous dish — must try! Also try Satu Paratha. Good dhabas are available right outside the station.',tip:'Must eat: Litti-Chokha — Bihar\'s signature dish!'},
      {title:'In an Emergency',desc:'Patna Junction GRP is available at the station. City police: 100. PMCH is the main government hospital.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Patna Police',num:'0612-2201977',desc:'City helpline'},{icon:'🏥',name:'PMCH Hospital',num:'0612-2300015',desc:'Patna Medical College'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚑',name:'Bihar Ambulance',num:'0612-2216000',desc:'State emergency'}],
    nearby:{
      hospital:[{name:'PMCH Patna',dist:'Near Station',desc:'Patna Medical College — main govt hospital'},{name:'IGIMS',dist:'7 km',desc:'Indira Gandhi Institute of Medical Sciences'},{name:'Paras HMRI',dist:'6 km',desc:'Top private hospital Patna'}],
      police:[{name:'Patna Junction GRP',dist:'At Station',desc:'Railway police'},{name:'Kotwali PS',dist:'2 km',desc:'Old Patna area'},{name:'Gardanibagh PS',dist:'4 km',desc:''}],
      atm:[{name:'SBI — Patna Junction',dist:'Inside',desc:'24x7'},{name:'HDFC — Fraser Road',dist:'3 km',desc:''},{name:'PNB — Kankarbagh',dist:'7 km',desc:''}],
      food:[{name:'Ashiana Market Food Stalls',dist:'6 km',desc:'Famous Litti-Chokha stalls'},{name:'Fraser Road Restaurants',dist:'3 km',desc:'All cuisines available'},{name:'Sone ki Nagri Sweets',dist:'2 km',desc:'Famous sweet shop'}],
      transport:[{name:'Patna Junction',dist:'0 km',desc:'Main railway station'},{name:'Patna Airport',dist:'8 km',desc:'IndiGo, Air India, Vistara'},{name:'Mithapur Bus Stand',dist:'3 km',desc:'State buses Bihar'}],
    },
  },
};

// =====================================================
//  NOTIFICATIONS
// =====================================================
let notifications = JSON.parse(localStorage.getItem('ss_notifs')||'[]');
function addNotif(msg){ notifications.unshift({msg,time:new Date().toLocaleTimeString()}); if(notifications.length>10) notifications.pop(); localStorage.setItem('ss_notifs',JSON.stringify(notifications)); renderNotifs(); }
function renderNotifs(){ const el=document.getElementById('notifList'); if(!el) return; if(!notifications.length){ el.innerHTML='<div class="notif-empty">No notifications yet</div>'; document.getElementById('notifDot').classList.remove('show'); return; } el.innerHTML=notifications.map(n=>`<div class="notif-item">🔔 ${n.msg} <span style="font-size:11px;opacity:.6">· ${n.time}</span></div>`).join(''); document.getElementById('notifDot').classList.add('show'); }
function toggleNotif(){ const p=document.getElementById('notifPanel'); p.classList.toggle('hidden'); renderNotifs(); }
function clearNotifs(){ notifications=[]; localStorage.removeItem('ss_notifs'); renderNotifs(); document.getElementById('notifPanel').classList.add('hidden'); }

// =====================================================
//  INIT
// =====================================================
window.onload = function(){
  // Loader
  setTimeout(()=>{ const l=document.getElementById('loader'); l.style.opacity='0'; setTimeout(()=>l.style.display='none',500); },1600);

  // Dark mode
  if(localStorage.getItem('ss_dark')==='1') document.body.classList.add('dark');

  // Language
  currentLang = localStorage.getItem('ss_lang')||'en';
  applyLang();

  // User check
  const user = localStorage.getItem('ss_user');
  if(user){
    document.getElementById('loginModal').style.display='none';
    updateProfileUI();
  }

  // DP
  const dp = localStorage.getItem('ss_dp');
  if(dp){ setProfilePics(dp); }

  loadCity('Bhopal');
  renderNotifs();
};

// =====================================================
//  LANGUAGE
// =====================================================
function applyLang(){
  document.getElementById('heroTitle').innerHTML = t('heroTitle');
  document.getElementById('heroSub').textContent = t('heroSub');
  document.getElementById('heroSearchInput').placeholder = t('searchPlaceholder');
  const langBtn = document.getElementById('langBtnText');
  if(langBtn) langBtn.textContent = t('langBtn');
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn=>{ const key = currentLang==='en'?'en':'hi'; if(btn.dataset[key]) btn.textContent=btn.dataset[key]; });
  if(activeCity) loadCity(activeCity);
}

function switchLang(){
  currentLang = currentLang==='en'?'hi':'en';
  localStorage.setItem('ss_lang',currentLang);
  applyLang();
  document.getElementById('profileMenu').style.display='none';
}

// =====================================================
//  DARK MODE
// =====================================================
function toggleDark(){
  document.body.classList.toggle('dark');
  localStorage.setItem('ss_dark',document.body.classList.contains('dark')?'1':'0');
}

// =====================================================
//  PROFILE UI
// =====================================================
function updateProfileUI(){
  const name  = localStorage.getItem('ss_user')||'Guest';
  const email = localStorage.getItem('ss_email')||'';
  const dp    = localStorage.getItem('ss_dp')||'';
  const init  = name.charAt(0).toUpperCase();

  document.getElementById('profileInitial').textContent  = init;
  document.getElementById('pmInitial').textContent       = init;
  document.getElementById('pmName').textContent          = name;
  document.getElementById('pmEmail').textContent         = email||'Guest user';

  if(dp){ setProfilePics(dp); }
}

function setProfilePics(src){
  ['profilePic','pmPic'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){ el.src=src; el.style.display='block'; }
  });
}

function toggleProfileMenu(){
  const m=document.getElementById('profileMenu');
  m.style.display=m.style.display==='block'?'none':'block';
}

// =====================================================
//  AUTH
// =====================================================
function showAuthTab(tab){
  document.getElementById('loginForm').style.display    = tab==='login'?'block':'none';
  document.getElementById('registerForm').style.display = tab==='register'?'block':'none';
  document.querySelectorAll('.auth-tab').forEach((b,i)=>{
    b.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register'));
  });
}

function doLogin(){
  const name  = (document.getElementById('loginName').value||'').trim();
  const email = (document.getElementById('loginEmail').value||'').trim();
  const pass  = document.getElementById('loginPass').value;

  if(!name||!email||!pass){ alert(t('loginError')); return; }
  if(!email.includes('@')){ alert(t('invalidEmail')); return; }

  // Check registered users
  const users = JSON.parse(localStorage.getItem('ss_users')||'{}');
  if(users[email]){
    if(users[email].pass !== btoa(pass)){ alert(t('wrongPass')); return; }
  }

  localStorage.setItem('ss_user',name);
  localStorage.setItem('ss_email',email);
  document.getElementById('loginModal').style.display='none';
  updateProfileUI();
  addNotif(`Welcome back, ${name}!`);
  loadCity(activeCity);
}

function doRegister(){
  const name  = (document.getElementById('regName').value||'').trim();
  const email = (document.getElementById('regEmail').value||'').trim();
  const phone = (document.getElementById('regPhone').value||'').trim();
  const pass  = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;

  if(!name||!email||!pass){ alert(t('pgError')); return; }
  if(!email.includes('@')){ alert(t('invalidEmail')); return; }
  if(pass.length<6){ alert(t('passTooShort')); return; }
  if(pass!==pass2){ alert(t('passError')); return; }

  const users = JSON.parse(localStorage.getItem('ss_users')||'{}');
  users[email] = { name, email, phone, pass: btoa(pass) };
  localStorage.setItem('ss_users',JSON.stringify(users));

  alert(t('registerSuccess'));
  showAuthTab('login');
  document.getElementById('loginName').value  = name;
  document.getElementById('loginEmail').value = email;
}

function doGuest(){
  localStorage.setItem('ss_user','Guest');
  document.getElementById('loginModal').style.display='none';
  updateProfileUI();
  loadCity(activeCity);
}

function logout(){
  localStorage.removeItem('ss_user');
  localStorage.removeItem('ss_email');
  localStorage.removeItem('ss_dp');
  location.reload();
}

function togglePass(id){
  const el=document.getElementById(id);
  el.type=el.type==='password'?'text':'password';
}

// =====================================================
//  EDIT PROFILE
// =====================================================
function openModal(id){
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).style.display='flex';
  if(id==='editProfileModal'){ populateEditProfile(); }
  if(id==='savedPGModal'){ renderSavedPGs(); }
  document.getElementById('profileMenu').style.display='none';
}

function closeModal(id){
  document.getElementById(id).classList.add('hidden');
  document.getElementById(id).style.display='none';
}

function populateEditProfile(){
  document.getElementById('editName').value  = localStorage.getItem('ss_user')||'';
  document.getElementById('editEmail').value = localStorage.getItem('ss_email')||'';
  document.getElementById('editPhone').value = localStorage.getItem('ss_phone')||'';
  const dp=localStorage.getItem('ss_dp');
  const av=document.getElementById('editAvatar');
  const init=(localStorage.getItem('ss_user')||'?').charAt(0).toUpperCase();
  if(dp){ av.innerHTML=`<img src="${dp}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%">`; }
  else { av.textContent=init; }
}

function saveProfile(){
  const name  = (document.getElementById('editName').value||'').trim();
  const email = (document.getElementById('editEmail').value||'').trim();
  const phone = (document.getElementById('editPhone').value||'').trim();
  const pass  = document.getElementById('editPass').value;

  if(!name){ alert('Name cannot be empty'); return; }

  localStorage.setItem('ss_user',name);
  if(email) localStorage.setItem('ss_email',email);
  if(phone) localStorage.setItem('ss_phone',phone);

  if(pass){
    if(pass.length<6){ alert(t('passTooShort')); return; }
    const users=JSON.parse(localStorage.getItem('ss_users')||'{}');
    const em=email||localStorage.getItem('ss_email')||'';
    if(em) users[em]={...users[em],pass:btoa(pass)};
    localStorage.setItem('ss_users',JSON.stringify(users));
  }

  updateProfileUI();
  closeModal('editProfileModal');
  addNotif('Profile updated successfully!');
  alert(t('profileSaved'));
}

function changeDP(e){
  const r=new FileReader();
  r.onload=ev=>{
    localStorage.setItem('ss_dp',ev.target.result);
    setProfilePics(ev.target.result);
    const av=document.getElementById('editAvatar');
    if(av) av.innerHTML=`<img src="${ev.target.result}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  };
  r.readAsDataURL(e.target.files[0]);
}

// =====================================================
//  CITY SWITCH
// =====================================================
function switchCity(city,btn){
  activeCity=city;
  document.querySelectorAll('.city-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  loadCity(city);
}

function loadCity(city){
  activeCity=city;
  document.getElementById('pg-heading').textContent      = t('pgHeading',city);
  document.getElementById('fare-heading').textContent    = t('fareHeading',city);
  document.getElementById('guide-heading').textContent   = t('guideHeading',city);
  document.getElementById('nearby-heading').textContent  = t('nearbyHeading',city);
  document.getElementById('nearby-sub').textContent      = `Important places in ${city}`;
  renderPGs();
  loadFareDropdowns(city);
  loadGuide(city);
  loadHelplines(city);
  loadNearby(city,activeCat);
}

// =====================================================
//  TAB SWITCH
// =====================================================
function switchTab(tab,btn){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active');
}

// =====================================================
//  PG FINDER
// =====================================================
function renderPGs(){
  const search  = (document.getElementById('pgSearch')?.value||'').toLowerCase();
  const gender  = document.getElementById('pgGender')?.value||'';
  const maxPr   = parseInt(document.getElementById('pgPrice')?.value||'999999');
  const sortBy  = document.getElementById('pgSort')?.value||'';

  let list = pgData.filter(p=>{
    const price=parseInt(p.price.replace(/[^0-9]/g,''));
    return p.city===activeCity &&
      (!search||p.name.toLowerCase().includes(search)) &&
      (!gender||p.gender===gender) &&
      price<=(maxPr||999999);
  });

  if(sortBy==='price_asc')  list.sort((a,b)=>parseInt(a.price.replace(/\D/g,''))-parseInt(b.price.replace(/\D/g,'')));
  if(sortBy==='price_desc') list.sort((a,b)=>parseInt(b.price.replace(/\D/g,''))-parseInt(a.price.replace(/\D/g,'')));
  if(sortBy==='rating')     list.sort((a,b)=>avgRating(b.name)-avgRating(a.name));

  const count=document.getElementById('pg-count');
  if(count) count.textContent=`${list.length} PG${list.length!==1?'s':''} found`;

  const grid=document.getElementById('pgGrid');
  if(!grid) return;

  if(!list.length){
    grid.innerHTML=`<div class="no-results"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><br>${t('noResults')}</div>`;
    return;
  }

  grid.innerHTML=list.map((pg,i)=>{
    const price   = parseInt(pg.price.replace(/[^0-9]/g,''));
    const reviews = getReviews(pg.name);
    const avg     = avgRating(pg.name);
    const gClass  = pg.gender==='Boys'?'b-boys':pg.gender==='Girls'?'b-girls':'b-both';
    const gEmoji  = pg.gender==='Boys'?'👦':pg.gender==='Girls'?'👧':'👥';
    const amenities = pg.amenities||'WiFi, Meals, Laundry';
    return `
    <div class="pg-card" style="animation-delay:${i*.05}s" onclick="openPGDetail('${pg.name.replace(/'/g,"\\'")}')">
      <div class="pg-img-wrap">
        <img src="${pg.image}?w=400" loading="lazy" alt="${pg.name}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'">
        <div class="pg-badges">
          <span class="pg-badge ${gClass}">${gEmoji} ${pg.gender}</span>
          ${i<2?'<span class="pg-badge" style="background:rgba(234,179,8,.9);color:#fff">⭐ Top Pick</span>':''}
        </div>
        ${avg>0?`<div class="pg-rating-badge">★ ${avg.toFixed(1)}</div>`:''}
      </div>
      <div class="pg-body">
        <h3>${pg.name}</h3>
        <div class="pg-city-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>${pg.city}</div>
        <div class="pg-rent">₹${price.toLocaleString()} <span>/ month</span></div>
        <div class="pg-amenities">✓ ${amenities}</div>
        <div class="pg-stars">${starsHTML(avg)}<small>(${reviews.length})</small></div>
        <div class="pg-btns">
          <button class="bcall" onclick="event.stopPropagation();callPG('${pg.contact}')">📞 Call</button>
          <button class="bmap" onclick="event.stopPropagation();mapPG('${pg.name}','${pg.city}')">📍 Map</button>
          <button class="bfav" onclick="event.stopPropagation();savePG('${pg.name}')">❤️</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// PG Detail
function openPGDetail(pgName){
  const pg=pgData.find(p=>p.name===pgName);
  if(!pg) return;
  currentPG=pg;
  const price=parseInt(pg.price.replace(/[^0-9]/g,''));
  const reviews=getReviews(pg.name);
  const avg=avgRating(pg.name);
  document.getElementById('pgDetailBody').innerHTML=`
    <img class="detail-img" src="${pg.image}?w=500" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'" alt="${pg.name}">
    <h3 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:8px">${pg.name}</h3>
    <div style="margin-bottom:14px">${starsHTML(avg)} <small style="color:var(--muted)">(${reviews.length} reviews${avg>0?' · ★'+avg.toFixed(1):''})</small></div>
    <div class="detail-facts">
      <div class="detail-fact-row"><span>📍 City</span><span>${pg.city}</span></div>
      <div class="detail-fact-row"><span>💰 Rent</span><span>₹${price.toLocaleString()} / month</span></div>
      <div class="detail-fact-row"><span>👥 For</span><span>${pg.gender||'All'}</span></div>
      <div class="detail-fact-row"><span>📞 Contact</span><span>${pg.contact}</span></div>
      ${pg.address?`<div class="detail-fact-row"><span>🏠 Address</span><span>${pg.address}</span></div>`:''}
      ${pg.amenities?`<div class="detail-fact-row"><span>✓ Amenities</span><span>${pg.amenities}</span></div>`:''}
    </div>
    <div class="detail-action-row">
      <button class="bcall" onclick="callPG('${pg.contact}')">📞 Call Now</button>
      <button class="bmap" onclick="mapPG('${pg.name}','${pg.city}')">📍 Directions</button>
    </div>
    <div class="rev-title">Reviews & Ratings</div>
    <div class="star-row" id="starRow">${[1,2,3,4,5].map(n=>`<span onclick="setStar(${n})" id="star${n}">⭐</span>`).join('')}</div>
    <div class="rev-input-row">
      <input class="m-input" id="revText" placeholder="Write your review..." style="margin:0">
      <button onclick="postReview()">Post</button>
    </div>
    <div class="rev-list">${reviews.length?reviews.map(r=>`<div class="rev-item"><div class="rev-user">${r.user}</div><div class="rev-stars-text">${'⭐'.repeat(r.rating)}</div><div class="rev-body">${r.text}</div></div>`).join(''):'<p style="color:var(--muted);font-size:13px;padding:8px 0">No reviews yet — be the first!</p>'}</div>`;
  selRating=0;
  openModal('pgDetailModal');
}

// Reviews
function getReviews(name){ return JSON.parse(localStorage.getItem('rev_'+name)||'[]'); }
function avgRating(name){ const r=getReviews(name); return r.length?r.reduce((s,x)=>s+x.rating,0)/r.length:0; }
function starsHTML(avg){ return[1,2,3,4,5].map(i=>`<span style="color:${i<=Math.round(avg)?'#f59e0b':'#d1d5db'};font-size:14px">★</span>`).join(''); }
function setStar(n){ selRating=n; [1,2,3,4,5].forEach(i=>{const el=document.getElementById('star'+i);if(el){el.classList.toggle('on',i<=n);}}); }

function postReview(){
  if(!currentPG) return;
  const text=(document.getElementById('revText').value||'').trim();
  const user=localStorage.getItem('ss_user')||'Guest';
  if(!text||!selRating){ alert(t('reviewError')); return; }
  const reviews=getReviews(currentPG.name);
  reviews.unshift({user,text,rating:selRating,date:new Date().toLocaleDateString('en-IN')});
  localStorage.setItem('rev_'+currentPG.name,JSON.stringify(reviews));
  addNotif(`Review posted for ${currentPG.name}`);
  alert(t('reviewPosted'));
  openPGDetail(currentPG.name);
}

function callPG(num){ window.location.href='tel:'+num; }
function mapPG(name,city){ window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+' PG '+city+' India')}`,'_blank'); }

function savePG(name){
  let favs=JSON.parse(localStorage.getItem('ss_favs')||'[]');
  if(!favs.includes(name)){ favs.push(name); localStorage.setItem('ss_favs',JSON.stringify(favs)); addNotif(`${name} saved to favourites!`); alert(t('saved')); }
  else alert(t('alreadySaved'));
}

function renderSavedPGs(){
  const favs=JSON.parse(localStorage.getItem('ss_favs')||'[]');
  const el=document.getElementById('savedPGList');
  if(!favs.length){ el.innerHTML='<div class="saved-empty">❤️<br>No saved PGs yet.<br>Tap the heart icon to save PGs.</div>'; return; }
  el.innerHTML=favs.map(name=>{
    const pg=pgData.find(p=>p.name===name);
    if(!pg) return '';
    const price=parseInt(pg.price.replace(/[^0-9]/g,''));
    return `<div class="saved-pg-item" onclick="closeModal('savedPGModal');openPGDetail('${name.replace(/'/g,"\\'")}')">
      <img class="saved-pg-img" src="${pg.image}?w=100" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'" alt="${name}">
      <div class="saved-pg-info"><strong>${name}</strong><span>₹${price.toLocaleString()}/mo · ${pg.city}</span></div>
    </div>`;
  }).join('');
}

function addNewPG(){
  const name    =(document.getElementById('newPGName').value||'').trim();
  const city    = document.getElementById('newPGCity').value;
  const price   = document.getElementById('newPGPrice').value;
  const gender  = document.getElementById('newPGGender').value;
  const contact =(document.getElementById('newPGContact').value||'').trim();
  const address =(document.getElementById('newPGAddress').value||'').trim();
  const amen    =(document.getElementById('newPGAmen').value||'').trim();
  if(!name||!contact){ alert(t('pgError')); return; }
  pgData.push({name,city,price:'₹'+(parseInt(price)||5000),gender,contact,address,amenities:amen||'WiFi, Meals',image:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'});
  addNotif(`New PG listed: ${name}`);
  alert(t('pgAdded'));
  closeModal('addPGModal');
  ['newPGName','newPGPrice','newPGContact','newPGAddress','newPGAmen'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  renderPGs();
}

// =====================================================
//  FARE CALCULATOR
// =====================================================
function loadFareDropdowns(city){
  const data=cityData[city];
  if(!data) return;
  document.getElementById('fareFrom').innerHTML='<option value="">'+t('selectSource')+'</option>'+data.fareFrom.map(f=>`<option value="${f.val}">${f.label}</option>`).join('');
  document.getElementById('fareTo').innerHTML='<option value="">'+t('selectDest')+'</option>'+data.fareTo.map(f=>`<option value="${f.val}">${f.label}</option>`).join('');
  document.getElementById('fareResult').style.display='none';
}

function calcFare(){
  const from=document.getElementById('fareFrom').value;
  const to=document.getElementById('fareTo').value;
  const res=document.getElementById('fareResult');
  if(!from||!to){res.style.display='none';return;}
  const data=cityData[activeCity];
  const fare=data&&data.fares[from]&&data.fares[from][to];
  if(!fare){res.style.display='none';return;}
  document.getElementById('f-dist').textContent=fare.d;
  document.getElementById('f-time').textContent=fare.t;
  document.getElementById('f-auto').textContent=fare.a;
  document.getElementById('f-cab').textContent=fare.c;
  document.getElementById('f-bike').textContent=fare.b;
  document.getElementById('f-erick').textContent=fare.e;
  document.getElementById('f-note').textContent=fare.n||'Book cabs after 10 PM for safety.';
  res.style.display='block';
}

// =====================================================
//  CITY GUIDE
// =====================================================
function loadGuide(city){
  const steps=(cityData[city]||{}).guide||[];
  document.getElementById('guideSteps').innerHTML=steps.map((s,i)=>`
    <div class="g-step">
      <div class="g-num">${i+1}</div>
      <div class="g-body">
        <div class="g-title">${s.title}</div>
        <div class="g-desc">${s.desc}</div>
        ${s.tip?`<span class="g-tip">💡 ${s.tip}</span>`:''}
      </div>
    </div>`).join('');
}

// =====================================================
//  HELPLINES
// =====================================================
function loadHelplines(city){
  const list=(cityData[city]||{}).helplines||[];
  document.getElementById('helplineItems').innerHTML=list.map(h=>`
    <div class="h-item">
      <div class="h-icon">${h.icon}</div>
      <div class="h-info"><strong>${h.name}</strong><span>${h.desc}</span></div>
      <a href="tel:${h.num.replace(/[^0-9+]/g,'')}" class="h-call">📞 ${h.num}</a>
    </div>`).join('');
}

// =====================================================
//  NEARBY
// =====================================================
function showCategory(cat,btn){
  activeCat=cat;
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  loadNearby(activeCity,cat);
}

function loadNearby(city,cat){
  const data=(cityData[city]||{}).nearby||{};
  const items=data[cat]||[];
  document.getElementById('nearbyItems').innerHTML=items.map(n=>`
    <div class="n-item">
      <div class="n-icon">${catIcon(cat)}</div>
      <div class="n-info"><strong>${n.name}</strong><span>${n.desc}</span></div>
      <div class="n-right">
        <span class="n-dist">${n.dist}</span>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.name+' '+city)}" target="_blank" class="n-map">📍 Map</a>
      </div>
    </div>`).join('');
}

function catIcon(cat){ return{hospital:'🏥',police:'🚔',atm:'🏧',food:'🍽️',transport:'🚌'}[cat]||'📍'; }

// =====================================================
//  SEARCH
// =====================================================
function quickSearch(val){
  if(!val.trim()) return;
  document.getElementById('pgSearch').value=val;
  switchTab('pg',document.querySelector('.tab-btn'));
  renderPGs();
}

function heroSearch(val){ /* live preview optional */ }

function doHeroSearch(){
  const val=document.getElementById('heroSearchInput').value.trim();
  if(!val) return;
  document.getElementById('pgSearch').value=val;
  switchTab('pg',document.querySelector('.tab-btn'));
  renderPGs();
}

// =====================================================
//  CLOSE ON OVERLAY CLICK
// =====================================================
document.addEventListener('click',e=>{
  if(e.target.classList.contains('overlay')&&e.target.id!=='loginModal'){
    e.target.classList.add('hidden');
    e.target.style.display='none';
  }
  if(!e.target.closest('.profile-wrap')){ const m=document.getElementById('profileMenu'); if(m) m.style.display='none'; }
  if(!e.target.closest('.notif-btn')&&!e.target.closest('.notif-panel')){ const p=document.getElementById('notifPanel'); if(p) p.classList.add('hidden'); }
});
