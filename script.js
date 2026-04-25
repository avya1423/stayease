// ====================================================
//  SheherSaathi — Complete Script
// ====================================================

let activeCity = 'Bhopal';
let activeTab  = 'pg';
let activeCat  = 'hospital';
let selRating  = 0;
let currentPG  = null;

// ============================================================
//  CITY DATA
// ============================================================
const cityData = {
  Bhopal: {
    fareFrom: [
      { val:'bj',   label:'Bhopal Junction (Main Station)' },
      { val:'rk',   label:'Rani Kamlapati Station' },
      { val:'isbt', label:'ISBT Bus Stand' },
      { val:'aprt', label:'Raja Bhoj Airport' },
    ],
    fareTo: [
      { val:'mpn', label:'MP Nagar' },
      { val:'nm',  label:'New Market' },
      { val:'ac',  label:'Arera Colony' },
      { val:'tt',  label:'TT Nagar' },
      { val:'kol', label:'Kolar Road' },
      { val:'man', label:'MANIT / University' },
      { val:'aim', label:'AIIMS Bhopal' },
      { val:'dbc', label:'DB City Mall' },
      { val:'ham', label:'Hamidia Hospital' },
      { val:'ob',  label:'Old Bhopal / Chowk' },
    ],
    fares: {
      bj:  { mpn:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–150',b:'₹60–90',e:'₹40–60',n:'Prepaid auto booth main gate ke daaye taraf hai'},nm:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:'Old Bhopal se guzarna padega'},ac:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹120–160',b:'₹80–110',e:'N/A',n:'Residential area, quiet roads'},tt:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹60–90',b:'₹40–65',e:'₹30–50',n:'Govt offices ka area'},kol:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹180–250',b:'₹120–170',e:'N/A',n:'Thoda door hai, cab behtar rahega'},man:{d:'5 km',t:'18 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Students ka popular area'},aim:{d:'9 km',t:'28 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:'Saket Nagar ke paas hai'},dbc:{d:'6 km',t:'20 min',a:'₹80–110',c:'₹100–140',b:'₹65–95',e:'N/A',n:'MP Nagar ke paas'},ham:{d:'1 km',t:'5 min',a:'₹30–50',c:'₹50–70',b:'₹25–40',e:'₹20–30',n:'Paidal bhi ja sakte ho'},ob:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹60–90',b:'₹35–55',e:'₹25–40',n:'Chowk area mein traffic ho sakta hai'} },
      rk:  { mpn:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:'Metro bhi available hai Rani Kamlapati se'},nm:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'N/A',n:''},ac:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'N/A',n:''},tt:{d:'5 km',t:'16 min',a:'₹70–100',c:'₹90–120',b:'₹55–85',e:'N/A',n:''},kol:{d:'9 km',t:'28 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:''},man:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''},aim:{d:'6 km',t:'20 min',a:'₹90–130',c:'₹110–160',b:'₹70–110',e:'N/A',n:''},dbc:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},ham:{d:'7 km',t:'22 min',a:'₹90–130',c:'₹110–150',b:'₹75–110',e:'N/A',n:''},ob:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''} },
      isbt:{ mpn:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:'ISBT Nadra Bus Stand'},nm:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'₹35–55',n:''},ac:{d:'6 km',t:'20 min',a:'₹80–120',c:'₹100–140',b:'₹65–100',e:'N/A',n:''},tt:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹60–80',b:'₹30–50',e:'₹25–40',n:''},kol:{d:'11 km',t:'32 min',a:'₹140–190',c:'₹170–230',b:'₹115–160',e:'N/A',n:''},man:{d:'4 km',t:'14 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'N/A',n:''},aim:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},dbc:{d:'5 km',t:'18 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'N/A',n:''},ham:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹70–90',b:'₹40–65',e:'₹30–50',n:''},ob:{d:'3 km',t:'12 min',a:'₹50–70',c:'₹70–90',b:'₹40–65',e:'₹30–50',n:''} },
      aprt:{ mpn:{d:'11 km',t:'32 min',a:'₹180–240',c:'₹220–300',b:'N/A',e:'N/A',n:'Airport pe Ola/Uber prepaid best hai'},nm:{d:'14 km',t:'40 min',a:'₹200–280',c:'₹260–350',b:'N/A',e:'N/A',n:''},ac:{d:'12 km',t:'35 min',a:'₹180–250',c:'₹230–310',b:'N/A',e:'N/A',n:''},tt:{d:'13 km',t:'38 min',a:'₹190–260',c:'₹240–320',b:'N/A',e:'N/A',n:''},kol:{d:'8 km',t:'25 min',a:'₹130–180',c:'₹160–220',b:'N/A',e:'N/A',n:''},man:{d:'10 km',t:'30 min',a:'₹160–220',c:'₹200–270',b:'N/A',e:'N/A',n:''},aim:{d:'7 km',t:'22 min',a:'₹110–160',c:'₹150–200',b:'N/A',e:'N/A',n:''},dbc:{d:'11 km',t:'32 min',a:'₹170–230',c:'₹210–280',b:'N/A',e:'N/A',n:''},ham:{d:'16 km',t:'45 min',a:'₹230–300',c:'₹280–380',b:'N/A',e:'N/A',n:''},ob:{d:'15 km',t:'42 min',a:'₹220–290',c:'₹270–360',b:'N/A',e:'N/A',n:''} },
    },
    guide:[
      {title:'Platform se bahar niklo',desc:'Exit boards follow karo. Bhopal Junction mein Exit Gate 1 (Main) aur Gate 2 dono hain. Rani Kamlapati pe Metro bhi available hai.',tip:'Coolie se pehle rate fix karo'},
      {title:'Prepaid Auto Counter',desc:'Station ke bahar Prepaid Auto Booth hota hai — fixed rate pe auto milta hai, bargaining nahi karni. Safe aur sasta option hai.',tip:'Main gate ke daaye taraf milega booth'},
      {title:'SIM Card / Recharge',desc:'Station ke andar ya bahar Airtel/Jio shops milte hain. New SIM ke liye Aadhaar card zaroori hai. Bhopal mein Jio aur Airtel ka network achha hai.',tip:''},
      {title:'ATM / Cash',desc:'SBI, HDFC, PNB ke ATM station ke andar aur bahar dono jagah available hain. Raat ko station ke andar wala ATM use karo — zyada safe hai.',tip:''},
      {title:'Khana / Paani',desc:'Station pe IRCTC stall aur private food stalls hain. Bhopal famous hai Poha-Jalebi ke liye. Sealed water bottle lo station se hi.',tip:'Poha-Jalebi zaroor khaao — Bhopal ka special nashta!'},
      {title:'Musibat ho to kya karo',desc:'Station ke andar RPF (Railway Police) office hota hai — kisi bhi problem mein seedha wahan jao. Railway helpline: 139. City police: 100.',tip:'Raat ko akele station pe zyada der mat ruko'},
    ],
    helplines:[
      {icon:'🚂',name:'Railway Helpline',num:'139',desc:'Train info, lost item, emergency'},
      {icon:'🚔',name:'Bhopal City Police',num:'0755-2443573',desc:'Local police helpline'},
      {icon:'🏥',name:'Hamidia Hospital',num:'0755-2540222',desc:'Govt hospital, 24x7'},
      {icon:'👩',name:'Women Helpline',num:'1091',desc:'24x7 Toll Free'},
      {icon:'🧒',name:'Child Helpline',num:'1098',desc:'Toll Free, 24x7'},
      {icon:'🗺️',name:'Tourist Helpline MP',num:'1800-233-3232',desc:'Toll Free'},
    ],
    nearby:{
      hospital:[{name:'Hamidia Hospital',dist:'1.5 km from Bhopal Jn',desc:'Largest govt hospital — 24x7 emergency'},{name:'AIIMS Bhopal',dist:'9 km',desc:'Premium govt hospital, Saket Nagar'},{name:'Bhopal Memorial Hospital',dist:'6 km',desc:'Gas Tragedy victims hospital'},{name:'Bansal Hospital',dist:'7 km',desc:'Top private hospital, MP Nagar'}],
      police:[{name:'Bhopal Junction GRP',dist:'At station',desc:'Railway police — inside station'},{name:'TT Nagar Police Station',dist:'3 km',desc:'Near govt offices area'},{name:'MP Nagar Police Station',dist:'7 km',desc:'Main commercial zone'},{name:'Kotwali Police Station',dist:'2 km',desc:'Old Bhopal area'}],
      atm:[{name:'SBI ATM',dist:'Inside station',desc:'24x7, reliable'},{name:'HDFC ATM — New Market',dist:'3 km',desc:'Near shopping area'},{name:'PNB ATM — TT Nagar',dist:'3.5 km',desc:'Near govt offices'},{name:'ICICI ATM — MP Nagar',dist:'7 km',desc:'Commercial zone'}],
      food:[{name:'Chatori Gali — New Market',dist:'3 km',desc:'Famous street food — Poha, Jalebi, Bhutte ka Kees'},{name:'DB Mall Food Court',dist:'6 km',desc:'All cuisines, AC seating'},{name:'Manohar Dairy',dist:'2 km',desc:'Famous sweets aur namkeen'},{name:'Under the Mango Tree',dist:'8 km',desc:'Popular cafe, MP Nagar'}],
      transport:[{name:'Bhopal Junction',dist:'0 km',desc:'Main station — trains to all cities'},{name:'ISBT Bus Stand',dist:'3 km',desc:'Interstate buses — MP, UP, Rajasthan'},{name:'Rani Kamlapati Station',dist:'5 km',desc:'New modern station with Metro'},{name:'Raja Bhoj Airport',dist:'12 km',desc:'Domestic flights — IndiGo, Air India, SpiceJet'}],
    },
  },
  Delhi: {
    fareFrom:[{val:'ndls',label:'New Delhi Railway Station'},{val:'nizm',label:'Nizamuddin Station'},{val:'igt',label:'IGI Airport (T3)'},{val:'isbt',label:'Kashmere Gate ISBT'}],
    fareTo:[{val:'cp',label:'Connaught Place'},{val:'krol',label:'Karol Bagh'},{val:'lajp',label:'Lajpat Nagar'},{val:'dwrk',label:'Dwarka'},{val:'noid',label:'Noida Sector 18'},{val:'grgn',label:'Gurugram (Gurgaon)'}],
    fares:{
      ndls:{cp:{d:'3 km',t:'15 min',a:'₹60–100',c:'₹80–120',b:'₹50–80',e:'₹30–50',n:'Metro lo — Yellow Line se Rajiv Chowk'},krol:{d:'2 km',t:'10 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},lajp:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},dwrk:{d:'18 km',t:'45 min',a:'₹250–350',c:'₹300–420',b:'N/A',e:'N/A',n:'Metro preferred — Blue Line'},noid:{d:'22 km',t:'55 min',a:'₹300–400',c:'₹350–480',b:'N/A',e:'N/A',n:'Metro lo — Yellow + Blue'},grgn:{d:'30 km',t:'70 min',a:'₹400–550',c:'₹450–650',b:'N/A',e:'N/A',n:'Cab best hai'}},
      nizm:{cp:{d:'6 km',t:'20 min',a:'₹100–140',c:'₹120–160',b:'₹80–120',e:'N/A',n:''},krol:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹150–200',b:'₹100–140',e:'N/A',n:''},lajp:{d:'4 km',t:'15 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹35–55',n:''},dwrk:{d:'20 km',t:'50 min',a:'₹280–380',c:'₹330–450',b:'N/A',e:'N/A',n:''},noid:{d:'18 km',t:'45 min',a:'₹250–340',c:'₹300–400',b:'N/A',e:'N/A',n:''},grgn:{d:'28 km',t:'65 min',a:'₹380–520',c:'₹430–600',b:'N/A',e:'N/A',n:''}},
      igt:{cp:{d:'16 km',t:'40 min',a:'₹350–480',c:'₹400–550',b:'N/A',e:'N/A',n:'Airport Express Metro most convenient'},krol:{d:'18 km',t:'45 min',a:'₹380–520',c:'₹440–600',b:'N/A',e:'N/A',n:''},lajp:{d:'14 km',t:'35 min',a:'₹300–420',c:'₹360–490',b:'N/A',e:'N/A',n:''},dwrk:{d:'8 km',t:'22 min',a:'₹160–220',c:'₹200–280',b:'N/A',e:'N/A',n:''},noid:{d:'38 km',t:'80 min',a:'₹500–700',c:'₹600–850',b:'N/A',e:'N/A',n:''},grgn:{d:'14 km',t:'35 min',a:'₹300–420',c:'₹360–490',b:'N/A',e:'N/A',n:''}},
      isbt:{cp:{d:'5 km',t:'18 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Metro: Yellow Line from Kashmere Gate'},krol:{d:'5 km',t:'16 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:''},lajp:{d:'11 km',t:'30 min',a:'₹160–220',c:'₹190–260',b:'N/A',e:'N/A',n:''},dwrk:{d:'23 km',t:'55 min',a:'₹320–440',c:'₹380–520',b:'N/A',e:'N/A',n:''},noid:{d:'25 km',t:'60 min',a:'₹350–480',c:'₹410–560',b:'N/A',e:'N/A',n:''},grgn:{d:'33 km',t:'75 min',a:'₹450–620',c:'₹520–720',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'New Delhi Station pe utro',desc:'3 exits hain — Paharganj side, Ajmeri Gate, aur Sadar Bazaar. Paharganj side budget hotels ke liye best hai.',tip:'CSMT aur Hazrat Nizamuddin alag stations hain — confuse mat hona'},
      {title:'Metro lo — Sabse Sasta',desc:'Delhi Metro India ki best metro hai. Station ke andar hi Metro entry hai. Single journey token ya Day Pass lo. Airport Express bhi available hai.',tip:'Rush hour (9–11am, 6–9pm) mein crowds bahut zyada'},
      {title:'Auto / Cab',desc:'Delhi mein auto meter se chalte hain officially. Ola/Uber Delhi mein bahut reliable hain. Prepaid taxi booth bahar available hai.',tip:'App cab use karo — safe aur transparent fare'},
      {title:'Cash aur SIM',desc:'ATMs station ke andar available hain. SIM ke liye Airtel/Jio store nearby milenge. Aadhaar card maango.',tip:''},
      {title:'Stay dhundho',desc:'Paharganj mein budget hotels hain (₹500–1500/night). Karol Bagh mein mid-range options hain. PG ke liye SheherSaathi use karo.',tip:'Paharganj tourist area hai — savdhan rehna'},
      {title:'Emergency mein',desc:'RPF station ke andar available hai. Delhi Police: 100. Women helpline: 1091.',tip:'Raat mein akele mat ghoomna — cab prefer karo'},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Delhi Police',num:'011-23490000',desc:'City helpline'},{icon:'🏥',name:'AIIMS Delhi',num:'011-26588500',desc:'Top govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚇',name:'Delhi Metro',num:'155370',desc:'Metro info helpline'}],
    nearby:{
      hospital:[{name:'AIIMS Delhi',dist:'8 km from NDLS',desc:'Top government hospital India'},{name:'RML Hospital',dist:'4 km',desc:'Govt hospital near CP'},{name:'Safdarjung Hospital',dist:'7 km',desc:'Large govt hospital'},{name:'Apollo Hospital',dist:'10 km',desc:'Top private hospital'}],
      police:[{name:'New Delhi Railway GRP',dist:'At station',desc:'Railway police inside NDLS'},{name:'Connaught Place PS',dist:'4 km',desc:'Central Delhi'},{name:'Paharganj PS',dist:'1 km',desc:'Near budget hotel area'}],
      atm:[{name:'SBI ATM — NDLS',dist:'Inside',desc:'24x7'},{name:'HDFC — Connaught Place',dist:'4 km',desc:'Multiple ATMs'},{name:'PNB — Paharganj',dist:'1 km',desc:'Near hotels'}],
      food:[{name:'Paranthe Wali Gali',dist:'2 km',desc:'Famous Old Delhi street food'},{name:"Karim's — Jama Masjid",dist:'5 km',desc:'Iconic Mughlai restaurant'},{name:'CP Food Street',dist:'4 km',desc:'All cuisines available'}],
      transport:[{name:'New Delhi Metro Station',dist:'At NDLS',desc:'Yellow Line — Airport Express'},{name:'IGI Airport',dist:'16 km',desc:'All major airlines'},{name:'Kashmere Gate ISBT',dist:'5 km',desc:'Buses to all states'}],
    },
  },
  Mumbai: {
    fareFrom:[{val:'cst',label:'CSMT (Chhatrapati Shivaji)'},{val:'lr',label:'Lokmanya Tilak Terminus (LTT)'},{val:'bdr',label:'Bandra Terminus'},{val:'csia',label:'Chhatrapati Shivaji Airport'}],
    fareTo:[{val:'ddr',label:'Dadar'},{val:'andr',label:'Andheri'},{val:'bonn',label:'Borivali'},{val:'thne',label:'Thane'},{val:'bkc',label:'BKC / Bandra'},{val:'navi',label:'Navi Mumbai'}],
    fares:{
      cst:{ddr:{d:'5 km',t:'25 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:'Local train sabse fast aur sasta hai Mumbai mein'},andr:{d:'18 km',t:'60 min',a:'₹200–280',c:'₹250–350',b:'N/A',e:'N/A',n:'Western local train lo — much faster'},bonn:{d:'35 km',t:'90 min',a:'₹400–550',c:'₹500–700',b:'N/A',e:'N/A',n:'Local train strongly recommended'},thne:{d:'34 km',t:'85 min',a:'₹380–520',c:'₹450–650',b:'N/A',e:'N/A',n:'Central line local train best'},bkc:{d:'12 km',t:'40 min',a:'₹150–200',c:'₹180–250',b:'₹120–170',e:'N/A',n:''},navi:{d:'25 km',t:'65 min',a:'₹300–420',c:'₹360–500',b:'N/A',e:'N/A',n:'Harbour line local available'}},
      lr:{ddr:{d:'8 km',t:'30 min',a:'₹120–160',c:'₹150–210',b:'₹95–135',e:'N/A',n:''},andr:{d:'12 km',t:'40 min',a:'₹150–200',c:'₹190–260',b:'₹120–170',e:'N/A',n:''},bonn:{d:'28 km',t:'75 min',a:'₹320–440',c:'₹400–560',b:'N/A',e:'N/A',n:''},thne:{d:'20 km',t:'55 min',a:'₹240–330',c:'₹290–400',b:'N/A',e:'N/A',n:''},bkc:{d:'5 km',t:'20 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:''},navi:{d:'18 km',t:'50 min',a:'₹220–300',c:'₹270–380',b:'N/A',e:'N/A',n:''}},
      bdr:{ddr:{d:'7 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},andr:{d:'8 km',t:'25 min',a:'₹120–160',c:'₹150–200',b:'₹95–135',e:'N/A',n:''},bonn:{d:'22 km',t:'60 min',a:'₹270–370',c:'₹330–460',b:'N/A',e:'N/A',n:''},thne:{d:'25 km',t:'65 min',a:'₹300–410',c:'₹360–500',b:'N/A',e:'N/A',n:''},bkc:{d:'2 km',t:'10 min',a:'₹50–80',c:'₹70–100',b:'₹40–65',e:'N/A',n:'BKC bilkul paas hai'},navi:{d:'25 km',t:'65 min',a:'₹300–420',c:'₹360–500',b:'N/A',e:'N/A',n:''}},
      csia:{ddr:{d:'12 km',t:'35 min',a:'₹200–280',c:'₹250–340',b:'N/A',e:'N/A',n:'Airport se Ola/Uber prepaid best'},andr:{d:'4 km',t:'15 min',a:'₹80–120',c:'₹100–150',b:'₹65–95',e:'N/A',n:'Airport bilkul Andheri ke paas'},bonn:{d:'20 km',t:'55 min',a:'₹260–360',c:'₹320–440',b:'N/A',e:'N/A',n:''},thne:{d:'22 km',t:'60 min',a:'₹280–380',c:'₹340–470',b:'N/A',e:'N/A',n:''},bkc:{d:'10 km',t:'30 min',a:'₹160–220',c:'₹200–280',b:'N/A',e:'N/A',n:''},navi:{d:'30 km',t:'75 min',a:'₹380–520',c:'₹460–640',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'CSMT ya LTT pe utro',desc:'CSMT South Mumbai mein hai. LTT Kurla mein hai — long distance trains ke liye. Dono pe taxi prepaid booths aur auto stands hain.',tip:'CSMT ke bahar auto aur black-yellow taxi milti hai'},
      {title:'Mumbai Local Train',desc:'Mumbai ki lifeline — local train! Cheap aur fast. Western, Central, Harbour lines cover karti hain poori Mumbai. ₹5–15 mein kahin bhi jao.',tip:'Rush hours (8–11am, 6–9pm) mein crowds bahut zyada hote hain'},
      {title:'Auto aur Taxi',desc:'Mumbai mein auto aur kaali-peeli taxi meter se chalti hai. App cabs (Ola/Uber) bhi bahut popular hain.',tip:'Auto meter revised fare se chalta hai — purana rate mat maano'},
      {title:'Stay dhundho',desc:'Budget stay ke liye Dadar, Andheri, Thane best hain. CST ke paas bahut mehga hoga. PG ke liye SheherSaathi use karo.',tip:''},
      {title:'Khana',desc:'Vada Pav Mumbai ka national food hai — ₹15–20 mein milta hai har jagah. Pav Bhaji, Misal Pav bhi try karo.',tip:'Vada Pav zaroor khaao!'},
      {title:'Emergency mein',desc:'Mumbai Police helpline: 100. GRP station pe available hai. Women helpline: 1091.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Mumbai Police',num:'022-22620111',desc:'City police'},{icon:'🏥',name:'KEM Hospital',num:'022-24107000',desc:'Govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚦',name:'Traffic Police',num:'022-24934400',desc:'Traffic issues'}],
    nearby:{
      hospital:[{name:'KEM Hospital',dist:'Near Parel',desc:'Top govt hospital Mumbai'},{name:'Tata Memorial',dist:'Parel',desc:'Cancer hospital — world class'},{name:'Hinduja Hospital',dist:'Mahim',desc:'Top private hospital'}],
      police:[{name:'CSMT GRP',dist:'At station',desc:'Railway police'},{name:'Azad Maidan PS',dist:'2 km',desc:'South Mumbai'},{name:'Dadar PS',dist:'5 km',desc:'Central area'}],
      atm:[{name:'SBI — CSMT',dist:'Inside',desc:'24x7'},{name:'HDFC — Dadar',dist:'5 km',desc:''},{name:'ICICI — Andheri',dist:'18 km',desc:''}],
      food:[{name:'Juhu Beach Food Stalls',dist:'20 km',desc:'Famous street food hub'},{name:'Mohammed Ali Road',dist:'3 km',desc:'Iftaar street food, biryani'},{name:'Chowpatty Beach',dist:'8 km',desc:'Bhel puri, Pav Bhaji'}],
      transport:[{name:'CSMT',dist:'0 km',desc:'Main station'},{name:'Mumbai Airport',dist:'25 km from CSMT',desc:'International + Domestic'},{name:'Dadar Bus Depot',dist:'5 km',desc:'State buses'}],
    },
  },
  Pune: {
    fareFrom:[{val:'pnst',label:'Pune Railway Station'},{val:'shiv',label:'Shivajinagar Station'},{val:'pnap',label:'Pune Airport'},{val:'swrg',label:'Swargate Bus Stand'}],
    fareTo:[{val:'korc',label:'Koregaon Park'},{val:'bner',label:'Baner / Balewadi'},{val:'hnjw',label:'Hinjawadi (IT Hub)'},{val:'koth',label:'Kothrud'},{val:'vman',label:'Viman Nagar'},{val:'pcmc',label:'Pimpri-Chinchwad'}],
    fares:{
      pnst:{korc:{d:'4 km',t:'15 min',a:'₹60–90',c:'₹80–110',b:'₹50–75',e:'₹35–55',n:'Koregaon Park mein traffic rehta hai'},bner:{d:'15 km',t:'40 min',a:'₹180–240',c:'₹220–300',b:'₹150–200',e:'N/A',n:''},hnjw:{d:'22 km',t:'55 min',a:'₹280–380',c:'₹340–460',b:'N/A',e:'N/A',n:'IT hub — morning rush mein zyada time'},koth:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:''},vman:{d:'8 km',t:'25 min',a:'₹110–150',c:'₹140–190',b:'₹90–130',e:'N/A',n:'Airport ke paas'},pcmc:{d:'18 km',t:'45 min',a:'₹220–300',c:'₹270–370',b:'N/A',e:'N/A',n:''}},
      shiv:{korc:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–70',e:'₹30–50',n:''},bner:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'₹120–170',e:'N/A',n:''},hnjw:{d:'19 km',t:'50 min',a:'₹240–330',c:'₹300–410',b:'N/A',e:'N/A',n:''},koth:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹130–170',b:'₹80–120',e:'N/A',n:''},vman:{d:'10 km',t:'28 min',a:'₹130–175',c:'₹160–220',b:'₹105–145',e:'N/A',n:''},pcmc:{d:'17 km',t:'42 min',a:'₹210–285',c:'₹260–355',b:'N/A',e:'N/A',n:''}},
      pnap:{korc:{d:'7 km',t:'22 min',a:'₹100–140',c:'₹130–175',b:'₹80–120',e:'N/A',n:'Airport pe Ola/Uber best'},bner:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'N/A',e:'N/A',n:''},hnjw:{d:'18 km',t:'45 min',a:'₹230–315',c:'₹285–390',b:'N/A',e:'N/A',n:''},koth:{d:'12 km',t:'35 min',a:'₹150–200',c:'₹190–260',b:'N/A',e:'N/A',n:''},vman:{d:'3 km',t:'12 min',a:'₹50–80',c:'₹70–100',b:'₹40–65',e:'N/A',n:'Airport se Viman Nagar bilkul paas'},pcmc:{d:'25 km',t:'60 min',a:'₹310–425',c:'₹380–520',b:'N/A',e:'N/A',n:''}},
      swrg:{korc:{d:'6 km',t:'20 min',a:'₹90–130',c:'₹110–155',b:'₹70–105',e:'₹40–60',n:''},bner:{d:'17 km',t:'45 min',a:'₹210–285',c:'₹260–355',b:'N/A',e:'N/A',n:''},hnjw:{d:'24 km',t:'60 min',a:'₹300–410',c:'₹370–510',b:'N/A',e:'N/A',n:''},koth:{d:'5 km',t:'18 min',a:'₹75–110',c:'₹95–135',b:'₹60–90',e:'₹35–55',n:''},vman:{d:'10 km',t:'28 min',a:'₹130–175',c:'₹160–220',b:'N/A',e:'N/A',n:''},pcmc:{d:'18 km',t:'45 min',a:'₹225–305',c:'₹280–385',b:'N/A',e:'N/A',n:''}},
    },
    guide:[
      {title:'Pune Station se bahar niklo',desc:'Main exit Shivajinagar side hai. Station ke bahar auto aur cab stand clearly marked hain. PMPML city bus bhi available hai.',tip:'Station ke bahar autowale thoda zyada rate maangenge — bargain karo'},
      {title:'Auto / Cab',desc:'Pune mein autos meter se chalte hain officially. App cabs Ola/Uber bahut active hain. Bike taxi bhi popular hai especially IT areas ke liye.',tip:'Hinjawadi ke liye Ola/Uber best — auto wahan nahi jaate easily'},
      {title:'PMPML City Bus',desc:'Pune ka cheap transport — ₹8–30 mein kahin bhi. Swargate, Shivajinagar main bus hubs hain.',tip:''},
      {title:'Stay options',desc:'Budget ke liye Shivajinagar, Deccan area best hai. IT jobs ke liye Baner, Hinjawadi ke paas PG lo. Koregaon Park premium area hai.',tip:''},
      {title:'Khana',desc:'Pune mein Misal Pav, Vada Pav bahut famous hai. FC Road aur JM Road pe bohot options hain.',tip:'Misal Pav zaroor khaao — Punekar ka nashta!'},
      {title:'Emergency',desc:'Pune Railway Police station ke andar available hai. City police: 100.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Pune City Police',num:'020-26122880',desc:'City helpline'},{icon:'🏥',name:'Sassoon Hospital',num:'020-26128000',desc:'Main govt hospital'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚌',name:'PMPML Bus',num:'020-24501500',desc:'City bus info'}],
    nearby:{
      hospital:[{name:'Sassoon Hospital',dist:'Near Pune Station',desc:'Main govt hospital'},{name:'Ruby Hall Clinic',dist:'Sangamvadi',desc:'Top private hospital'},{name:'KEM Hospital Pune',dist:'Rasta Peth',desc:'Govt hospital'}],
      police:[{name:'Pune Railway GRP',dist:'At station',desc:'Railway police'},{name:'Shivajinagar PS',dist:'2 km',desc:'Main area'},{name:'Deccan PS',dist:'4 km',desc:'Near FC Road'}],
      atm:[{name:'SBI — Pune Station',dist:'Inside',desc:'24x7'},{name:'HDFC — FC Road',dist:'4 km',desc:''},{name:'Axis — JM Road',dist:'4 km',desc:''}],
      food:[{name:'FC Road Food Stalls',dist:'4 km',desc:'Student area — cheap and tasty'},{name:'JM Road Restaurants',dist:'4 km',desc:'All cuisines'},{name:'Deccan Khau Galli',dist:'5 km',desc:'Famous street food'}],
      transport:[{name:'Pune Station',dist:'0 km',desc:'Main station'},{name:'Pune Airport',dist:'8 km',desc:'Domestic flights'},{name:'Swargate Bus Stand',dist:'6 km',desc:'State buses'}],
    },
  },
  Patna: {
    fareFrom:[{val:'pnbe',label:'Patna Junction'},{val:'rjpb',label:'Rajendra Nagar Station'},{val:'pnap',label:'Patna Airport'},{val:'pnbs',label:'Mithapur Bus Stand'}],
    fareTo:[{val:'borc',label:'Boring Road'},{val:'bori',label:'Bailey Road'},{val:'kank',label:'Kankarbagh'},{val:'rjnd',label:'Rajendra Nagar'},{val:'dnak',label:'Danapur'},{val:'frzr',label:'Frazer Road'}],
    fares:{
      pnbe:{borc:{d:'5 km',t:'18 min',a:'₹60–90',c:'₹80–120',b:'₹50–75',e:'₹35–55',n:'Patna mein auto mostly bargaining se chalte hain'},bori:{d:'6 km',t:'20 min',a:'₹70–100',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:''},kank:{d:'7 km',t:'22 min',a:'₹80–120',c:'₹100–140',b:'₹65–95',e:'₹40–60',n:'Kankarbagh busy area hai'},rjnd:{d:'8 km',t:'25 min',a:'₹90–130',c:'₹115–155',b:'₹70–105',e:'₹45–65',n:''},dnak:{d:'15 km',t:'40 min',a:'₹170–230',c:'₹210–285',b:'N/A',e:'N/A',n:'Highway se jaate hain'},frzr:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹55–80',b:'₹30–50',e:'₹25–40',n:'Bilkul paas hai'}},
      rjpb:{borc:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},bori:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},kank:{d:'5 km',t:'18 min',a:'₹65–95',c:'₹85–120',b:'₹50–80',e:'₹35–55',n:''},rjnd:{d:'2 km',t:'8 min',a:'₹40–60',c:'₹55–80',b:'₹30–50',e:'₹25–40',n:''},dnak:{d:'12 km',t:'35 min',a:'₹140–190',c:'₹175–240',b:'N/A',e:'N/A',n:''},frzr:{d:'6 km',t:'20 min',a:'₹70–105',c:'₹90–130',b:'₹55–85',e:'₹40–60',n:''}},
      pnap:{borc:{d:'8 km',t:'25 min',a:'₹100–140',c:'₹130–175',b:'₹80–115',e:'N/A',n:'Airport pe Ola/Uber best hai'},bori:{d:'7 km',t:'22 min',a:'₹90–130',c:'₹115–155',b:'₹70–105',e:'N/A',n:''},kank:{d:'10 km',t:'30 min',a:'₹120–165',c:'₹150–205',b:'₹95–135',e:'N/A',n:''},rjnd:{d:'9 km',t:'27 min',a:'₹110–150',c:'₹140–190',b:'₹85–125',e:'N/A',n:''},dnak:{d:'20 km',t:'50 min',a:'₹240–330',c:'₹300–410',b:'N/A',e:'N/A',n:''},frzr:{d:'8 km',t:'25 min',a:'₹100–140',c:'₹130–175',b:'N/A',e:'N/A',n:''}},
      pnbs:{borc:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''},bori:{d:'4 km',t:'15 min',a:'₹55–80',c:'₹72–105',b:'₹45–70',e:'₹30–50',n:''},kank:{d:'5 km',t:'18 min',a:'₹65–95',c:'₹85–120',b:'₹50–80',e:'₹35–55',n:''},rjnd:{d:'6 km',t:'20 min',a:'₹75–110',c:'₹95–135',b:'₹60–90',e:'₹38–58',n:''},dnak:{d:'13 km',t:'38 min',a:'₹155–210',c:'₹195–265',b:'N/A',e:'N/A',n:''},frzr:{d:'3 km',t:'12 min',a:'₹50–75',c:'₹65–95',b:'₹40–65',e:'₹30–50',n:''}},
    },
    guide:[
      {title:'Patna Junction se bahar niklo',desc:'Main exit ke bahar auto stand aur e-rickshaw clearly available hain. Station ke andar hi RPF police post hai.',tip:'Bahar niklo toh touts se savdhan — khud auto negotiate karo'},
      {title:'Auto aur E-Rickshaw',desc:'Patna mein autos meter se nahi chalte — bargaining karni padegi. E-rickshaw local areas mein sasta option hai. Ola/Uber available hai.',tip:'Destination confirm karo pehle — kai drivers nahi jaante door areas'},
      {title:'SIM aur ATM',desc:'Station ke paas Airtel/Jio stores hain. SBI ATM station ke andar available hai. UPI use karo — sab jagah accept hota hai.',tip:''},
      {title:'Stay dhundho',desc:'Budget stay ke liye Fraser Road, Kankarbagh area best hai. Students ke liye Rajendra Nagar aur Bailey Road pe PG milte hain.',tip:''},
      {title:'Khana',desc:'Patna mein Litti-Chokha bahut famous hai — zaroor khaao! Satu Paratha bhi try karo. Station ke bahar achhe dhabas milte hain.',tip:'Litti-Chokha zaroor khaao — Bihar ka swad!'},
      {title:'Emergency mein',desc:'Patna Junction GRP station pe available hai. City police: 100. Patna Medical College (PMCH) main govt hospital hai.',tip:''},
    ],
    helplines:[{icon:'🚂',name:'Railway Helpline',num:'139',desc:'24x7'},{icon:'🚔',name:'Patna Police',num:'0612-2201977',desc:'City helpline'},{icon:'🏥',name:'PMCH Hospital',num:'0612-2300015',desc:'Patna Medical College'},{icon:'👩',name:'Women Helpline',num:'1091',desc:'Toll Free 24x7'},{icon:'🚑',name:'Bihar Ambulance',num:'0612-2216000',desc:'State emergency'}],
    nearby:{
      hospital:[{name:'PMCH Patna',dist:'Near station',desc:'Patna Medical College — main govt hospital'},{name:'IGIMS',dist:'7 km',desc:'Indira Gandhi Institute of Medical Sciences'},{name:'Paras HMRI',dist:'6 km',desc:'Top private hospital Patna'}],
      police:[{name:'Patna Junction GRP',dist:'At station',desc:'Railway police'},{name:'Kotwali PS',dist:'2 km',desc:'Old Patna area'},{name:'Gardanibagh PS',dist:'4 km',desc:''}],
      atm:[{name:'SBI — Patna Junction',dist:'Inside',desc:'24x7'},{name:'HDFC — Fraser Road',dist:'3 km',desc:''},{name:'PNB — Kankarbagh',dist:'7 km',desc:''}],
      food:[{name:'Ashiana Market Food Stalls',dist:'6 km',desc:'Famous Litti-Chokha stalls'},{name:'Fraser Road Restaurants',dist:'3 km',desc:'All cuisines available'},{name:'Sone ki Nagri Sweets',dist:'2 km',desc:'Famous mithai shop'}],
      transport:[{name:'Patna Junction',dist:'0 km',desc:'Main railway station'},{name:'Patna Airport',dist:'8 km',desc:'IndiGo, Air India, Vistara'},{name:'Mithapur Bus Stand',dist:'3 km',desc:'State buses Bihar'}],
    },
  },
};

// ============================================================
//  INIT
// ============================================================
window.onload = function () {
  // Hide loader
  setTimeout(() => {
    const l = document.getElementById('loader');
    l.style.opacity = '0';
    setTimeout(() => l.style.display = 'none', 500);
  }, 1500);

  // Dark mode
  if (localStorage.getItem('ss_dark') === '1') document.body.classList.add('dark');

  // Profile pic
  const dp = localStorage.getItem('ss_dp');
  if (dp) document.getElementById('profilePic').src = dp;

  // Login check
  const user = localStorage.getItem('ss_user');
  if (user) {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('greetUser').textContent = 'Hi, ' + user;
    if (user === 'Guest') document.getElementById('profileEditArea').style.display = 'none';
  } else {
    // Show login modal
    document.getElementById('loginModal').style.display = 'flex';
  }

  // Always load city data regardless of login
  loadCity('Bhopal');
};

// ============================================================
//  CITY SWITCH
// ============================================================
function switchCity(city, btn) {
  activeCity = city;
  document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('activeCityText').textContent = city;
  loadCity(city);
}

function loadCity(city) {
  document.getElementById('pg-heading').textContent    = city + ' ke PGs';
  document.getElementById('fare-heading').textContent  = city + ' Fare Calculator';
  document.getElementById('guide-heading').textContent = city + ' City Guide';
  document.getElementById('nearby-heading').textContent = city + ' Nearby Places';
  document.getElementById('nearby-sub').textContent    = city + ' ke important places';
  renderPGs(); loadFareDropdowns(city); loadGuide(city); loadHelplines(city); loadNearby(city, activeCat);
}

// ============================================================
//  TAB SWITCH
// ============================================================
function switchTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  btn.classList.add('active');
}

// ============================================================
//  PG FINDER
// ============================================================
function renderPGs() {
  const search = (document.getElementById('pgSearch').value || '').toLowerCase();
  const gender = document.getElementById('pgGender').value;
  const maxPr  = parseInt(document.getElementById('pgPrice').value) || 999999;

  const list = pgData.filter(p => {
    const price = parseInt(p.price.replace(/[^0-9]/g, ''));
    return p.city === activeCity &&
      (!search || p.name.toLowerCase().includes(search)) &&
      (!gender || p.gender === gender) &&
      price <= maxPr;
  });

  document.getElementById('pg-count').textContent = list.length + ' PG' + (list.length !== 1 ? 's' : '') + ' milein';

  if (!list.length) {
    document.getElementById('pgGrid').innerHTML = '<div class="no-results">😔 Koi PG nahi mila<br><small>Filters change karo ya dusri city try karo</small></div>';
    return;
  }

  document.getElementById('pgGrid').innerHTML = list.map((pg, i) => {
    const price    = parseInt(pg.price.replace(/[^0-9]/g, ''));
    const reviews  = getReviews(pg.name);
    const avg      = avgRating(pg.name);
    const gClass   = pg.gender === 'Boys' ? 'b-boys' : pg.gender === 'Girls' ? 'b-girls' : 'b-both';
    const gEmoji   = pg.gender === 'Boys' ? '👦' : pg.gender === 'Girls' ? '👧' : '👥';
    return `
      <div class="pg-card" style="animation-delay:${i*0.04}s" onclick="openPGDetail('${pg.name.replace(/'/g,"\\'")}')">
        <div class="pg-img-wrap">
          <img src="${pg.image}?w=400" loading="lazy" alt="${pg.name}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'">
          <div class="pg-badges">
            <span class="pg-badge ${gClass}">${gEmoji} ${pg.gender}</span>
            ${i < 2 ? '<span class="pg-badge" style="background:rgba(234,179,8,.9);color:#fff">⭐ Top Pick</span>' : ''}
          </div>
        </div>
        <div class="pg-body">
          <h3>${pg.name}</h3>
          <div class="pg-city-tag">📍 ${pg.city}</div>
          <div class="pg-rent">₹${price.toLocaleString()} <span>/ month</span></div>
          <div class="pg-stars">${starsHTML(avg)}<small>(${reviews.length} reviews)</small></div>
          <div class="pg-btns">
            <button class="bcall" onclick="event.stopPropagation();callPG('${pg.contact}')">📞 Call</button>
            <button class="bmap"  onclick="event.stopPropagation();mapPG('${pg.name}','${pg.city}')">📍 Map</button>
            <button class="bfav"  onclick="event.stopPropagation();savePG('${pg.name}')">❤️</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openPGDetail(pgName) {
  const pg = pgData.find(p => p.name === pgName);
  if (!pg) return;
  currentPG = pg;
  const price   = parseInt(pg.price.replace(/[^0-9]/g, ''));
  const reviews = getReviews(pg.name);
  const avg     = avgRating(pg.name);

  document.getElementById('pgDetailBody').innerHTML = `
    <img class="detail-img" src="${pg.image}?w=500" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'" alt="${pg.name}">
    <div style="margin-bottom:10px">${starsHTML(avg)} <small style="color:var(--muted)">(${reviews.length} reviews${avg>0?' · '+avg.toFixed(1)+'/5':''})</small></div>
    <div class="detail-facts">
      <p>📍 <strong>City:</strong> ${pg.city}</p>
      <p>💰 <strong>Rent:</strong> ₹${price.toLocaleString()} / month</p>
      <p>👥 <strong>For:</strong> ${pg.gender||'All'}</p>
      <p>📞 <strong>Contact:</strong> ${pg.contact}</p>
      ${pg.address?`<p>🏠 <strong>Address:</strong> ${pg.address}</p>`:''}
    </div>
    <div class="detail-action-row">
      <button class="bcall" onclick="callPG('${pg.contact}')">📞 Call Now</button>
      <button class="bmap"  onclick="mapPG('${pg.name}','${pg.city}')">📍 Directions</button>
    </div>
    <div class="rev-title">⭐ Reviews & Ratings</div>
    <div class="star-row" id="starRow">${[1,2,3,4,5].map(n=>`<span onclick="setStar(${n})" id="star${n}">⭐</span>`).join('')}</div>
    <div class="rev-input-row">
      <input class="m-input" id="revText" placeholder="Apna review likhein..." style="margin:0">
      <button onclick="postReview()">Post</button>
    </div>
    <div class="rev-list">${
      reviews.length
        ? reviews.map(r=>`<div class="rev-item"><div class="rev-user">${r.user}</div><div class="rev-stars-text">${'⭐'.repeat(r.rating)}</div><div class="rev-body">${r.text}</div></div>`).join('')
        : '<p style="color:var(--muted);font-size:13px;padding:8px 0">Koi review nahi — pehle aap likhein!</p>'
    }</div>`;
  selRating = 0;
  openModal('pgDetailModal');
}

// Reviews
function getReviews(name) { return JSON.parse(localStorage.getItem('rev_'+name)||'[]'); }
function avgRating(name)  { const r=getReviews(name); return r.length?r.reduce((s,x)=>s+x.rating,0)/r.length:0; }
function starsHTML(avg)   { return [1,2,3,4,5].map(i=>`<span style="color:${i<=Math.round(avg)?'#f59e0b':'#d1d5db'};font-size:14px">★</span>`).join(''); }

function setStar(n) {
  selRating = n;
  [1,2,3,4,5].forEach(i => {
    const el = document.getElementById('star'+i);
    if (el) { el.style.opacity = i<=n?'1':'0.3'; el.style.transform = i<=n?'scale(1.2)':'scale(1)'; }
  });
}

function postReview() {
  if (!currentPG) return;
  const text = (document.getElementById('revText').value||'').trim();
  const user = localStorage.getItem('ss_user')||'Guest';
  if (!text)      { alert('Review likhein pehle ❌'); return; }
  if (!selRating) { alert('Stars select karo ❌'); return; }
  const reviews = getReviews(currentPG.name);
  reviews.unshift({user, text, rating:selRating, date: new Date().toLocaleDateString('en-IN')});
  localStorage.setItem('rev_'+currentPG.name, JSON.stringify(reviews));
  alert('Review post ho gaya ✅ Shukriya!');
  openPGDetail(currentPG.name);
}

function callPG(num) { window.location.href = 'tel:'+num; }
function mapPG(name, city) { window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+' PG '+city+' India')}`, '_blank'); }
function savePG(name) {
  let favs = JSON.parse(localStorage.getItem('ss_favs')||'[]');
  if (!favs.includes(name)) { favs.push(name); localStorage.setItem('ss_favs', JSON.stringify(favs)); alert('Saved ❤️'); }
  else alert('Already saved 👍');
}

function addNewPG() {
  const name    = (document.getElementById('newPGName').value||'').trim();
  const city    = document.getElementById('newPGCity').value;
  const price   = document.getElementById('newPGPrice').value;
  const gender  = document.getElementById('newPGGender').value;
  const contact = (document.getElementById('newPGContact').value||'').trim();
  const address = (document.getElementById('newPGAddress').value||'').trim();
  if (!name||!city||!contact) { alert('Required fields bhar do ❌'); return; }
  pgData.push({ name, city, price:'₹'+(parseInt(price)||5000), gender, contact, address, image:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' });
  alert('PG listed ho gaya ✅');
  closeModal('addPGModal');
  ['newPGName','newPGPrice','newPGContact','newPGAddress'].forEach(id => document.getElementById(id).value='');
  renderPGs();
}

// ============================================================
//  FARE CALCULATOR
// ============================================================
function loadFareDropdowns(city) {
  const data = cityData[city];
  if (!data) return;
  const fromEl = document.getElementById('fareFrom');
  const toEl   = document.getElementById('fareTo');
  fromEl.innerHTML = '<option value="">-- Source chunein --</option>' + data.fareFrom.map(f=>`<option value="${f.val}">${f.label}</option>`).join('');
  toEl.innerHTML   = '<option value="">-- Destination chunein --</option>' + data.fareTo.map(f=>`<option value="${f.val}">${f.label}</option>`).join('');
  document.getElementById('fareResult').style.display = 'none';
}

function calcFare() {
  const from = document.getElementById('fareFrom').value;
  const to   = document.getElementById('fareTo').value;
  const res  = document.getElementById('fareResult');
  if (!from||!to) { res.style.display='none'; return; }
  const data = cityData[activeCity];
  const fare = data && data.fares[from] && data.fares[from][to];
  if (!fare) { res.style.display='none'; return; }
  document.getElementById('f-dist').textContent  = '📍 '+fare.d;
  document.getElementById('f-time').textContent  = '⏱ '+fare.t;
  document.getElementById('f-auto').textContent  = fare.a;
  document.getElementById('f-cab').textContent   = fare.c;
  document.getElementById('f-bike').textContent  = fare.b;
  document.getElementById('f-erick').textContent = fare.e;
  document.getElementById('f-note').textContent  = fare.n || 'Raat 10 baje ke baad cab prefer karo.';
  res.style.display = 'block';
}

// ============================================================
//  CITY GUIDE
// ============================================================
function loadGuide(city) {
  const steps = (cityData[city]||{}).guide || [];
  document.getElementById('guideSteps').innerHTML = steps.map((s,i) => `
    <div class="g-step">
      <div class="g-num">${i+1}</div>
      <div class="g-body">
        <div class="g-title">${s.title}</div>
        <div class="g-desc">${s.desc}</div>
        ${s.tip ? `<span class="g-tip">💡 ${s.tip}</span>` : ''}
      </div>
    </div>`).join('');
}

// ============================================================
//  HELPLINES
// ============================================================
function loadHelplines(city) {
  const list = (cityData[city]||{}).helplines || [];
  document.getElementById('helplineItems').innerHTML = list.map(h => `
    <div class="h-item">
      <div class="h-icon">${h.icon}</div>
      <div class="h-info"><strong>${h.name}</strong><span>${h.desc}</span></div>
      <a href="tel:${h.num.replace(/[^0-9+]/g,'')}" class="h-call">📞 ${h.num}</a>
    </div>`).join('');
}

// ============================================================
//  NEARBY
// ============================================================
function showCategory(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadNearby(activeCity, cat);
}

function loadNearby(city, cat) {
  const data  = (cityData[city]||{}).nearby || {};
  const items = data[cat] || [];
  document.getElementById('nearbyItems').innerHTML = items.map(n => `
    <div class="n-item">
      <div class="n-icon">${catIcon(cat)}</div>
      <div class="n-info"><strong>${n.name}</strong><span>${n.desc}</span></div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
        <span class="n-dist">${n.dist}</span>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.name+' '+city)}" target="_blank" class="n-map">📍 Map</a>
      </div>
    </div>`).join('');
}

function catIcon(cat) {
  return {hospital:'🏥',police:'🚔',atm:'🏧',food:'🍽️',transport:'🚌'}[cat]||'📍';
}

// ============================================================
//  LOGIN / PROFILE
// ============================================================
function doLogin() {
  const name  = (document.getElementById('loginName').value||'').trim();
  const email = (document.getElementById('loginEmail').value||'').trim();
  if (!name||!email) { alert('Saare fields bhar do ❌'); return; }
  if (!email.includes('@')) { alert('Valid email likho ❌'); return; }
  localStorage.setItem('ss_user', name);
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('greetUser').textContent = 'Hi, '+name;
  loadCity(activeCity);
}

function doGuest() {
  localStorage.setItem('ss_user','Guest');
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('greetUser').textContent = 'Hi, Guest';
  document.getElementById('profileEditArea').style.display = 'none';
  loadCity(activeCity);
}

function logout() { localStorage.removeItem('ss_user'); location.reload(); }

function toggleProfileMenu() {
  const m = document.getElementById('profileMenu');
  m.style.display = m.style.display==='block' ? 'none' : 'block';
}

function saveProfile() {
  const n = (document.getElementById('newName').value||'').trim();
  if (n) { localStorage.setItem('ss_user',n); document.getElementById('greetUser').textContent='Hi, '+n; alert('Saved ✅'); }
}

function changeDP(e) {
  const r = new FileReader();
  r.onload = ev => { document.getElementById('profilePic').src=ev.target.result; localStorage.setItem('ss_dp',ev.target.result); };
  r.readAsDataURL(e.target.files[0]);
}

// ============================================================
//  DARK MODE
// ============================================================
function toggleDark() {
  document.body.classList.toggle('dark');
  localStorage.setItem('ss_dark', document.body.classList.contains('dark')?'1':'0');
}

// ============================================================
//  MODALS
// ============================================================
function openModal(id)  { document.getElementById(id).style.display='flex'; }
function closeModal(id) { document.getElementById(id).style.display='none'; }

document.addEventListener('click', e => {
  if (e.target.classList.contains('overlay')) { document.querySelectorAll('.overlay').forEach(o => { if(o.id!=='loginModal') o.style.display='none'; }); }
  if (!e.target.closest('.profile-wrap')) { const m=document.getElementById('profileMenu'); if(m) m.style.display='none'; }
});
