require('./db');
const mongoose = require('mongoose');

require('./auth');
const passport = require('passport');
const path = require('path');

const routes = require('./routes/index');

const express = require('express');
const app = express();

const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

// const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

const BAD_KEYWORDS = ["a55", "a55hole", "aeolus", "ahole", "anal", "analprobe", "anilingus", "anus", "areola", "areole", "arian", "aryan", "ass", "assbang", "assbanged", "assbangs", "asses", "assfuck", "assfucker", "assh0le", "asshat", "assho1e", "ass hole", "assholes", "assmaster", "assmunch", "asswipe", "asswipes", "azazel", "azz", "b1tch", "ballsack", "bang", "banger", "barf", "bawdy", "beaner", "beardedclam", "beastiality", "beatch", "beater", "beaver", "beeyotch", "beotch", "biatch", "bigtits", "big tits", "bimbo", "bitch", "bitched", "bitches", "bitchy", "blow job", "blow", "blowjob", "blowjobs", "bod", "bodily", "boink", "bollock", "bollocks", "bollok", "bone", "boned", "boner", "boners", "bong", "boob", "boobies", "boobs", "booby", "booger", "bookie", "bootee", "bootie", "booty", "booze", "boozer", "boozy", "bosom", "bosomy", "bowel", "bowels", "bra", "brassiere", "breast", "breasts", "bugger", "bukkake", "bullturds", "bung", "busty", "butt", "butt fuck", "buttfuck", "buttfucker", "buttplug", "c.0.c.k", "c.o.c.k.", "c.u.n.t", "c0ck", "c-0-c-k", "caca", "cahone", "cameltoe", "carpetmuncher", "cawk", "cervix", "chinc", "chincs", "chink", "chode", "chodes", "cl1t", "climax", "clit", "clitoris", "clitorus", "clits", "clitty", "cocain", "cocaine", "cock", "c-o-c-k", "cockblock", "cockholster", "cockknocker", "cocks", "cocksmoker", "cocksucker", "cock sucker", "coital", "commie", "condom", "coon", "coons", "corksucker", "crabs", "crack", "cracker", "crackwhore", "crap", "crappy", "cum", "cummin", "cumming", "cumshot", "cumshots", "cumslut", "cumstain", "cunilingus", "cunnilingus", "cunny", "cunt", "c-u-n-t", "cuntface", "cunthunter", "cuntlick", "cuntlicker", "cunts", "d0ng", "d0uch3", "d0uche", "d1ck", "d1ld0", "d1ldo", "dago", "dagos", "damnit", "dawgie-style", "dick", "dickbag", "dickdipper", "dickface", "dickflipper", "dickhead", "dickheads", "dickish", "dick-ish", "dickripper", "dicksipper", "dickweed", "dickwhipper", "dickzipper", "diddle", "dike", "dildo", "dildos", "diligaf", "dillweed", "dimwit", "dingle", "dipship", "doggie-style", "doggy-style", "dong", "doofus", "doosh", "dopey", "douch3", "douche", "douchebag", "douchebags", "douchey", "dumass", "dumbass", "dumbasses", "dyke", "dykes", "ejaculate", "enlargement", "erect", "erection", "erotic", "essohbee", "extacy", "extasy", "f.u.c.k", "fack", "fag", "fagg", "fagged", "faggit", "faggot", "fagot", "fags", "faig", "faigt", "fannybandit", "fart", "fartknocker", "fat", "felch", "felcher", "felching", "fellate", "fellatio", "feltch", "feltcher", "fisted", "fisting", "fisty", "floozy", "foad", "fondle", "foobar", "foreskin", "freex", "frigg", "frigga", "fubar", "fuck", "f-u-c-k", "fuckass", "fucked", "fucker", "fuckface", "fuckin", "fucking", "fucknugget", "fucknut", "fuckoff", "fucks", "fucktard", "fuck-tard", "fuckup", "fuckwad", "fuckwit", "fudgepacker", "fuk", "fvck", "fxck", "gae", "gai", "ganja", "gays", "gey", "gfy", "ghay", "ghey", "gigolo", "glans", "goatse", "goldenshower", "gonad", "gonads", "gook", "gooks", "gringo", "gspot", "g-spot", "gtfo", "guido", "h0m0", "h0mo", "handjob", "hard on", "he11", "hebe", "heeb", "hemp", "heroin", "herp", "herpes", "herpy", "hitler", "hiv", "hobag", "hom0", "homey", "homo", "homoey", "honky", "hooch", "hookah", "hooker", "hoor", "hootch", "hooter", "hooters", "horny", "hump", "humped", "humping", "hussy", "hymen", "inbred", "incest", "injun", "j3rk0ff", "jackass", "jackhole", "jackoff", "jap", "japs", "jerk", "jerk0ff", "jerked", "jerkoff", "jism", "jiz", "jizm", "jizz", "jizzed", "junkie", "junky", "kike", "kikes", "kill", "kinky", "kkk", "klan", "knobend", "kooch", "kooches", "kootch", "kraut", "kyke", "labia", "lech", "leper", "lesbo", "lesbos", "lez", "lezbian", "lezbians", "lezbo", "lezbos", "lezzie", "lezzies", "lezzy", "lmao", "lmfao", "loin", "loins", "lube", "lusty", "mams", "massa", "masterbate", "masterbating", "masterbation", "masturbate", "masturbating", "masturbation", "maxi", "menses", "menstruate", "menstruation", "meth", "m-fucking", "mofo", "molest", "moolie", "moron", "motherfucka", "motherfucker", "motherfucking", "mtherfucker", "mthrfucker", "mthrfucking", "muff", "muffdiver", "murder", "muthafuckaz", "muthafucker", "mutherfucker", "mutherfucking", "muthrfucking", "nad", "nads", "naked", "napalm", "nappy", "nazi", "nazism", "negro", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "niggle", "niglet", "nimrod", "ninny", "nipple", "nooky", "nympho", "opiate", "opium", "oral", "orally", "organ", "orgasm", "orgasmic", "orgies", "orgy", "ovary", "ovum", "ovums", "p.u.s.s.y.", "paddy", "paki", "pantie", "panties", "panty", "pastie", "pasty", "pcp", "pecker", "pedo", "pedophile", "pedophilia", "pedophiliac", "pee", "peepee", "penetrate", "penetration", "penial", "penile", "penis", "perversion", "peyote", "phalli", "phallic", "phuck", "pillowbiter", "pimp", "pinko", "piss", "pissed", "pissoff", "piss-off", "pms", "polack", "pollock", "poon", "poontang", "porn", "porno", "pornography", "pot", "potty", "prick", "prig", "prostitute", "prude", "pube", "pubis", "punkass", "punky", "puss", "pussies", "pussy", "pussypounder", "puto", "queaf", "queef", "queer", "queero", "queers", "quicky", "quim", "racy", "rape", "raped", "raper", "rapist", "raunch", "rectal", "rectum", "rectus", "reefer", "reetard", "reich", "retard", "retarded", "revue", "rimjob", "ritard", "rtard", "r-tard", "rum", "rump", "rumprammer", "ruski", "s.h.i.t.", "s.o.b.", "s0b", "sadism", "sadist", "scag", "scantily", "schizo", "schlong", "screw", "scrog", "scrot", "scrote", "scrotum", "scrud", "scum", "seaman", "seamen", "seduce", "semen", "sex", "sexual", "sh1t", "s-h-1-t", "shamedame", "shit", "s-h-i-t", "shite", "shiteater", "shitface", "shithead", "shithole", "shithouse", "shits", "shitt", "shitted", "shitter", "shitty", "shiz", "sissy", "skag", "skank", "slave", "sleaze", "sleazy", "slut", "slutdumper", "slutkiss", "sluts", "smegma", "smut", "smutty", "snatch", "sniper", "snuff", "s-o-b", "sodom", "souse", "soused", "sperm", "spic", "spick", "spik", "spiks", "spooge", "spunk", "steamy", "stfu", "stiffy", "stoned", "strip", "stroke", "stupid", "suck", "sucked", "sucking", "sumofabiatch", "t1t", "tampon", "tard", "tawdry", "teabagging", "teat", "terd", "teste", "testee", "testes", "testicle", "testis", "thrust", "thug", "tinkle", "tit", "titfuck", "titi", "tits", "tittiefucker", "titties", "titty", "tittyfuck", "tittyfucker", "toke", "toots", "tramp", "transsexual", "trashy", "tubgirl", "turd", "tush", "twat", "twats", "ugly", "undies", "unwed", "urinal", "urine", "uterus", "uzi", "vag", "vagina", "valium", "viagra", "virgin", "vixen", "vodka", "vomit", "voyeur", "vulgar", "vulva", "wad", "wang", "wank", "wanker", "wazoo", "wedgie", "weed", "weenie", "weewee", "weiner", "weirdo", "wench", "wetback", "wh0re", "wh0reface", "whitey", "whiz", "whoralicious", "whore", "whorealicious", "whored", "whoreface", "whorehopper", "whorehouse", "whores", "whoring", "wigger", "womb", "woody", "wop", "wtf", "x-rated", "xxx", "yeasty", "yobbo", "zoophile", "Inch", "Topless", "Sado", "Sado-mazo", "Bollocks", "clitfuck", "Dum", "Queer", "Turd", "balls", "ride you", "asshole", "my dong", "bisexual", "3some", "3 some", "4some", "4 some", "licking", "lick", "finger", "fingering", "nipples", "dogging", "doggystyle", "doggy style", "face sitting", "facesitting", "face sit", "squirting", "squirt", "gangbang", "ladyboy", "pornostar", "vibrator", "Double Penetration", "Assfingering", "Assfucking", "Bbw", "Bdsm", "Buttcam", "Buttfucking", "Butthole", "Buttplug", "Cfnm", "Felching", "Ejaculation", "Femdom", "Pissing", "Poronographi", "Lezdom", "Muff Diving", "Sucking", "To Mouth", "Footjob", "Foot job", "Pedophile", "Pedophiles", "Blue movie", "Semen", "imb3cil", "estup1do", "castrado", "imbcil", "sondaanal", "ano", "aureola", "areolas", "ario", "aria", "culo", "culeada", "culeado", "culeadas", "culos", "culero", "culera", "imbec1l", "caraculo", "1mb3c1l", "1mbec1l", "imbeciles", "amanzaculo", "mamaculo", "limpiaculo", "limpiaculos", "relambeculo", "kulo", "put4", "escroto", "tirar", "tirador", "vomito", "gonorrea", "frijolero", "almeja barbuda", "bestialidad", "sida", "pajero", "totona", "puuta", "perra", "p3rra", "tetona", "tetotas", "putita", "perr4", "puteada", "perr4s", "putilla", "mamada", "mamar", "sexo oral", "mamadas", "vph", "corporal", "papiloma", "mamahuevadas", "mamagevadas", "pendejada", "erecto", "penetrado", "ereccin", "erecciones", "teta", "tetas", "senos", "tetita", "moco", "verga", "cul1to", "culito", "kul1to", "licor", "vergota", "vergacion", "pechuga", "pechugona", "intestino", "intestinos", "sosten", "brasier", "s3no", "s3nos", "mardicion", "bukake", "cagones", "uretra", "busto", "trasero", "cogeculo", "cogida de culo", "cogedor de culo", "culeador", "tapon de ano", "p.0.l.l.a", "p.o.l.l.a.", "c.o..o", "p0lla", "p-0-l-l-a", "mierda", "cabrona", "dedo de camello", "muerdealmohada", "gevo", "chino", "chinos", "chinito", "chinita", "pene grueso", "penes gruesos", "cocaina", "garcha", "p-3-n-3", "puta", "cara de puta", "putiadero", "putas", "putear", "utero", "que carajo", "zooflico", "pulgada", "topless", "sado", "sadomazoquismo", "cogeclitoris", "bobo", "marica", "mojon", "cogido", "bolas", "montarte", "agujero del culo", "mi", "burdel", "masturbacion", "tr1o", "trio", "cu4rteto", "cuarteto", "4no", "lamiendo", "lamer", "dedear", "dedeo", "pezones", "perrear", "coger como perro", "estilo perrito", "cntarse en la cara", "sentarse en la cara", "sientate en mi cara", "corrida", "correrse", "violacion grupal", "paja", "prostituta", "mariquito", "orgias", "estrella porno", "mamar culo", "transexual", "vibrador", "doble penetracion", "meter el dedo en el culo", "sexo por el culo", "bbw", "sadomasoquismo", "camara anal", "coger por el culo", "hueco del culo", "tapon de culo", "mujer vestida hombre desnudo", "tragar semen desde la vagina", "eyaculacion", "dominacin femenina", "orinar", "poronografia", "masturbar con los pies", "paja con los pies", "pedofilo", "pedofilos", "pelcula azul", "putero", "sin parte de arriba", "gafo", "marico", "pedazo de mierda", "cogio", "garchar", "prostibulo", "tri0", "correrse a chorros", "negrona", "acabar", "cajeta", "conchuda", "clitoriano", "clitos", "clitorica", "soplavergas", "soplapollas", "pollon", "pollones", "fumapene", "mamadora", "mamador de pene", "comu", "comunista", "forro", "vaginita", "coitos", "lamepenes", "l4dillas", "basura blanca", "puta en crack", "ladilla", "mierdero", "eyacula", "eyaculando", "acab4r", "polvazo", "polvazos", "tragaleche", "lechazo", "mamacuca", "mamar cuca", "lamecuca", "coo", "cuca", "crica", "cara de cuca", "caza cuca", "lamecoo", "lamedor de coo", "coos", "chota", "idiota", "pendejo", "pito", "vibr4d0r", "v1br4d0r", "dagor", "dogor", "maldicion", "de perrito", "prepucio", "soplaverga", "cara de verga", "mama vergas", "cabeza de pene", "cabezas de verga", "p3nd3j0", "imbe", "rompepene", "quiebrapene", "mamapene", "lamepene", "lamegevo", "tortillera", "penil", "strapon", "drogas", "machiche", "coripe", "perico", "g4rch4", "pija", "p1j4", "p1ja", "pij4", "subnormal", "gilipollas", "mamagevos", "pendejote", "cabron", "cretinos", "cachapera", "cachaperas", "alargamiento", "erotico", "extasis", "ecstasis", "m.i.e.r.d.a", "merda", "maricn", "maricoon", "mariqueado", "mariquin", "marik", "marika", "marikos", "mar1kos", "maryco", "maryca", "pedorreta", "gordo", "mamacrica", "mamaclitoris", "felar", "felacion", "tragal3che", "tra4s3men", "pueta", "puetear", "puetero", "tragasemen", "muerdepene", "agarrar teta", "muerdeguevo", "frijida", "aborto", "bosta", "zurra", "mald1t0", "m13rd4", "kuler0", "violado", "violao", "violador", "caraemierda", "m4ld1t0", "m4ld1t4", "comemierda", "maldito loco", "vete a la mierda", "coge", "retrasado", "retardado", "retr4sado", "trag4l3che", "ret4rd4d0", "koo", "k0o", "ko0", "guey", "ganya", "gei", "gais", "mariica", "ghei", "glande", "culoabierto", "meado", "gonada", "gonadas", "chiniito", "puntog", "punto-g", "ptm", "mariika", "puuto", "p4j4", "3r3ct0", "infierno", "moa", "herona", "h3rp3s", "herposo", "hitl3r", "vih", "perrita", "pooto", "malandro", "maleante", "mamn", "chupon", "pete", "prost1tut4", "niche", "t3t0n4", "t3t0n4s", "cachondo", "frotarse", "frotars3", "perr3ar", "cl1t0ri", "himen", "incesto", "1nc3sto", "terrorista", "paj4z0", "paj3r0", "p4j4z0", "paj1zo", "campesino", "sandnigger", "cr3tin0", "cr3t1n0", "masturbo", "masturbado", "lechita", "lech1ta", "lech4z0", "polv4z0", "p0lv4z0", "drogadicto", "dr0gadicto", "crico", "matar", "pervertido", "ku klux klan", "racista", "perineo", "gooch", "esfinter", "toto", "t0t0na", "gokum", "leproso", "lesbis", "lesvis", "lezbiana", "lezbis", "lezvianas", "lezvos", "lezvoz", "t0rtiller4", "tort1ller4", "t0rt1ll3r4", "cagado de la risa", "recagado de risa", "reputa", "ingles", "lubricante", "lujurioso", "pechos", "masturbarse", "mazturbarse", "masturbarze", "mazturbar", "masturvar", "masturvasion", "monse", "menstru", "menstruar", "menstruacion", "metanfetamina", "doblepenetracion", "hijodeputa", "toquetear", "moly", "imv3zil", "mamahu3v0", "mamaguebo", "mamawebo", "mamagu3v0", "mmgvo", "mmgv", "mmg", "muerdealfombra", "asesinar", "m4ldit0", "hijo e puta", "ijo e puta", "malditacion", "cevilluo", "sebillo", "gonad4s", "desnudo", "n4p4lm", "labiuda", "nasi", "nasismo", "nazismo", "n4zismo", "negro de mierda", "maldito negro", "nigguh", "nignog", "n1gg3r", "neegah", "nuggle", "nigglet", "monglico", "tarado", "tetilla", "panocha", "ninfomana", "opiaceo", "opio", "orai", "oralmente", "organo", "orgasmo", "orgasmico", "orgia", "ovario", "uevo", "uevos", "toalla", "paqui", "pantaleta", "pantaletas", "pantaletta", "pastaleta", "pastosa", "piquito", "pederasta", "pedofilia", "ped0filia", "pipi", "p1p1", "penetrar", "penetracion", "falico", "pene", "perversi0n", "p3yot3", "falo", "f4lico", "mu3rdealmoada", "chulo", "chul0", "mear", "encabronado", "3ncabronado", "encabronar", "premenstrual", "flujuda", "imbecilidad", "trabuco", "pr0n", "pr0n0", "p0rn0gr4fia", "marihuana", "marijuana", "gandul", "p1t0", "pr0sstitut4", "mojigata", "pubico", "pubiko", "malote", "gallito", "cuquita", "cuquitas", "totonita", "cogecucas", "vagipedo", "pedovaginal", "pedo vaginal", "peo baginal", "mariposon", "pargo", "rapidito", "polvo rapido", "violar", "vi0l4d0r", "v10l4d0r", "vi0lad0r", "r3ct4l", "porro", "retrzzado", "r3trzdo", "rtrd4do", "m4m4r cul0", "rtardado", "rtrazdo", "r-trdado", "ron", "rompebolas", "rompeculo", "m.i.e.r.d.a.", "h.d.p.", "hdp", "sadismo", "sadico", "caballoblanco", "facilona", "esquizo", "salchicha", "joder", "jodido", "jodedor", "escrotal", "scroto", "basura", "cemen", "cmen", "seducir", "cm3n", "cexo", "cexual", "mielda", "m.-ielda", "slutshaming", "m-i-e-l-d-a", "mierrrda", "comemielda", "caremierda", "cabezademierda", "culicagado", "culicagao", "mieldas", "mojones", "culocagado", "cagalitroso", "cagn", "cagador", "afeminado", "zorra", "esclavo", "putisima", "malnacido", "perrisima", "cogeprras", "besaputas", "zanganas", "serepe", "requeson", "rikota", "pajear", "francotirador", "decapitar", "H-D-P", "sodomita", "borracho", "borrachin", "esperma", "chele", "chelazo", "ch3laz0", "ch3l4z0", "eyaculada", "vaporon", "cierra el orto", "guebo", "drogado", "marihuano", "paj3ar", "estupida", "chupar", "chupado", "chupando", "hijodeperra", "t3t4", "tampax", "t4rado", "t4r4d0", "bolas en la cara", "tetha", "mierdon", "gilazo", "alcahuete", "concha", "testiculo", "churra", "paja rusa", "pajarusa", "paja turca", "cogetetas", "teticas", "senito", "cubana", "violatetas", "churro", "mujerzuela", "naco", "naca", "m0j0n", "an0", "almeja", "papo", "feo", "interiores", "orinal", "orine", "metralleta", "vagi", "vajina", "balium", "biagra", "birgen", "virjen", "bodka", "bomito", "bulgar", "bulba", "bulva", "chorizo", "chaqueta", "chaquetero", "pajizo", "pajuo", "hierba", "cripy", "kush", "longaniza", "rarito", "nerd", "espaldababosa", "ramera", "r4mera", "blanquito", "quesudo", "gordiputa", "r4m3r4", "ram3r4", "tirado", "blue movie", "ch3l3", "tragar semen desde el ano", "mujer dominante", "lezbianaz", "mam4r", "a boca", "femdom", "pelicula porno", "cosa a 3", "cosa a 4", "anale", "ariano", "Stronzo", "INCULARSELA", "inculare", "asini", "assfucking", "stronzi", "AssMaster", "Asswipe", "palle", "scoppio", "osceno", "bBW", "Beaner", "bestialit", "battitore", "castoro", "grandi tette", "tette grosse", "bisessuale", "cagna", "femmine", "bisbetico", "soffio", "pompino", "pompini", "Film blu", "corporale", "Boink", "Bollok", "osso", "disossato", "errore marchiano", "tetta", "sule", "tette", "tonto", "Booger", "allibratore", "scarpetta", "bottino", "liquore", "bevitore", "seno", "viscere", "reggiseno", "Seno", "seni", "tappo", "tettona", "cazzo di culo", "buttfucking", "butthole", "cacca", "Cahone", "Cameltoe", "cervice", "cfnm", "spiraglio", "Chodes", "clitoride", "clitoridi", "cazzo", "pompinara", "cazzi", "succhiacazzi", "coitale", "preservativo", "procione lavatore", "Coons", "Granchi", "crepa", "Crackwhore", "una schifezza", "scadente", "Cumming", "Eiaculazione", "sborrate", "fica", "fiche", "Dagos", "accidenti", "testa di cazzo", "teste di cazzo", "imbrogliare", "diga", "scemo", "alla pecorina", "pecorina", "inebetito", "Doppia Penetrazione", "doccia", "cretino", "dum", "dighe", "estasi", "eiaculare", "allargamento", "eretto", "erezione", "faccia a faccia", "Seduta in faccia", "sigaretta", "Faggioli", "fascina", "froci", "scoreggia", "Grasso", "Felch", "Felcher", "Dominatrici", "dito", "diteggiatura", "pugno", "Fisty", "puttana", "Foad", "accarezzare", "Piede", "Masturbazione con i piedi", "prepuzio", "Freex", "Frigg", "Frigga", "Fubar", "Fanculo", "scopata", "Coglione", "scopa", "Gey", "doccia dorata", "gonade", "gonadi", "musi gialli", "duro", "Heeb", "canapa", "eroina", "erpete", "Herpy", "Hobag", "accogliente", "omosessuale", "narghil", "Hooker", "Hoor", "sirena", "corneo", "gobba", "sgualdrinetta", "imene", "innato", "pollice", "Injun", "asino", "Jackhole", "Masturbazione", "jAPS", "strattone", "sperma", "drogato", "Junky", "uccidere", "eccentrico", "Kooch", "labbra", "lebbroso", "lesbica", "lesbiche", "Lezbos", "leccare", "leccata", "lombo", "reni", "lubrificante", "vigoroso", "Massa", "masturbarsi", "masturbazione", "Maxi", "mestruazioni", "mestruare", "mestruazione", "Mofo", "molestare", "deficiente", "fottuto", "manicotto", "Immersioni subacquee", "omicidio", "mio dong", "nudo", "pannolino", "nazista", "negri", "fare il pignolo", "gonzo", "capezzolo", "capezzoli", "ninfomane", "narcotico", "oppio", "orale", "per via orale", "orgasmica", "orge", "ovaia", "ovulo", "ovuli", "risaia", "mutandine", "collant", "pasticcio", "PCP", "I pedofili", "fare pip", "pip", "penetrare", "penetrazione", "perversione", "falli", "fallico", "Phuck", "mezzano", "Pinko", "pisciare", "sbronzo", "Pioggia dorata", "Polack", "Poon", "pornografia", "pentola", "vasino", "puntura", "saccente", "micio", "fighe", "strano", "finocchi", "vivace", "stupro", "violentata", "stupratore", "rettale", "retto", "spinello", "ritardare", "ritardato", "Revue", "cavalca", "Rum", "scamone", "Sadomaso", "vite", "Scrote", "feccia", "marinaio", "marinai", "sedurre", "Sperma", "sesso", "sessuale", "faccia di merda", "merde", "merdoso", "Shiz", "donnicciola", "Skag", "schiavo", "squallido", "troie", "oscenit", "fuligginoso", "strappare", "cecchino", "tabacco da fiuto", "Sodoma", "inzuppare", "carpione", "Spiks", "audacia", "schizzare", "Schizzi", "appannato", "sballato", "striscia", "ictus", "stupido", "succhiare", "succhiato", "suzione", "tampone", "pacchiano", "tettarella", "testicoli", "testicolo", "spinta", "teppista", "tintinnio", "Alla bocca", "Toke", "a seno nudo", "vagabondo", "transessuale", "brutta", "biancheria intima", "orinale", "urina", "vibratore", "vergine", "volpe femmina", "Vodka", "volgare", "batuffolo", "Wank", "segaiolo", "Wazoo", "erba", "Weiner", "strambo", "fischio", "bordello", "puttane", "prostituirsi", "Wigger", "grembo", "legnoso", "WTF", "simile a lievito", "Zoophile", "Plan a trois", "Plan a quatre", "sonde anale", "annulingus", "arole", "Aryan", "Cul", "Trou du cul", "Enculer", "Dans le cul", "culs", "Doigts dans le cul", "Baiseur de cul", "Baiser un cul", "Abruti", "trous du cul", "Maitre des culs", "imbcile", "stupide", "stupides", "Couilles", "Baiser", "Baiseur", "Vomir", "Au revoir", "BBW", "BDSM", "Mexicain", "Grosse touffe", "salope", "batteur", "La chatte", "gros seins", "Mamelons", "Bimbo", "bisexuels", "Chienne", "rl", "chiennes", "Souffler", "Fellation", "Fellations", "Film de cul", "dbo", "corporelles", "tactac", "couille", "couilles", "Couille", "os", "dsosses", "Au garde  vous", "dsosseurs", "nichon", "nichons", "crotte de nez", "dmago", "Gros cul", "Beau cul", "Cul denfer", "alcool", "Alcoolique", "bien arrose", "Gougoutte", "Grosse gougoutte", "intestin", "entrailles", "soutien-gorge", "poitrine", "seins", "bougre", "Bukkake", "bulleurs", "fesse", "sodomiser", "Filmer le cul", "sodomiseur", "enculer", "plug anal", "sans couilles", "pied de chameau", "bouffeuse de minou", "col de lutrus", "CFNM", "jaune", "les jaunes", "grosse bite", "grosses bites", "point culminant", "clito", "cocane", "Bite", "suceuse de bite", "Niqueur de dsir", "bouche", "abruti", "bites", "avaleuse de bite", "cotal", "Communiste", "prservatif", "ngre", "ngres", "crabes", "vagin de pute", "pauvre mec", "salope a cocane", "merdique", "sperme", "gros engin", "jouir", "jaculation", "jaculations", "salope qui aime le sperme", "la mouille", "Cunnilingus", "cuni", "chatte", "Stupide salope", "Chasseur de chatte", "bouffeur de chatte", "chattes", "rital", "ritals", "consanguin", "bite", "gros baiseur", "Tte de bite", "Ttes de bite", "imptueux", "boucher", "avaleur de sperme", "abruti total", "exhibitionniste", "suceur de bite", "escroquer", "digue", "gode", "godes", "fou", "simplet", "pd", "levrette", "en levrette", "crtin", "mot imprononable", "Double pntration", "crtins", "douch", "dbile", "dbiles", "lesbienne", "lesbiennes", "extase", "jaculer", "largissement", "bander", "rection", "rotique", "sassoir sur le visage", "biker", "fatigu", "clopes", "Pter", "gras", "bouffeur de merde", "aspirer le sperme", "Aspirer le sperme", "faire une fellation", "aspirateur de sperme", "Dominatrice", "doigt", "mettre des doigts", "fist", "hardcore", "allumeuse", "Va te faire foutre et crve", "caresser", "foutu", "Branler avec les pieds", "prpuce", "fan", "mater", "beau cul", "baiser", "baise", "baiseur", "Dugland", "idiot", "Va te faire foutre", "con", "abruti fini", "personne mprisable", "baiseur de cul", "Gang Bang", "Gigolo", "gland", "stirer lanus", "se pisser dessus", "coren", "corens", "ricain", "point g", "branlette", "juif", "chanvre", "hrone", "Herps", "herpetophile", "Hitler", "VIH", "accueillante", "Homo", "menteur", "herbe", "pute", "goutte", "sein", "chaud", "caresse", "allum", "frotter", "coquine", "consanguines", "inceste", "nain", "abruti stupide", "se branler", "JAP", "Japs", "connard", "nerv", "jacul", "Accro", "juifs", "tuer", "lcher les pieds", "vagin", "bosch", "lvres", "pervet", "lpreux", "Lesbos", "lesbi", "dominatrice lesbienne", "gouine", "lcher", "mdr", "xptdr", "bassin", "bassins", "chaudasse", "mamelons", "maitre", "se masturber", "masturber", "les rgles", "menstruations", "speed", "molester", "ngro", "fils de pute", "baiser une maman", "baiseur de mamans", "maladroit", "bouffer une chatte poilue", "bouffeur de chattes poilues", "meurtre", "Baiseur de maman", "ma bite", "nue", "Napalm", "couche", "nazisme", "Ngro", "Ngros", "trouver  redire", "chasseur", "nini", "mamelon", "sexe", "opiac", "par voie orale", "organe", "orgasme", "orgasmique", "orgie", "ovaire", "ovule", "oves", "rouquin", "culotte", "culottes", "pdophile", "Pdophile", "Pdophiles", "pdophilie", "pdophiles", "pntrer", "pntration", "du pnis", "pnis", "Champignons hallucinognes", "phallus", "phallique", "dfoncer le cul", "socialiste", "pisser", "faire chier", "PMS", "le minou", "pornographie", "star du x", "Pornographie", "toilette", "arrogant", "prostitue", "relou", "malade", "mec en chien", "pet vaginal", "Pd", "pds", "tirer un coup", "minou", "bonasse", "viol", "violeur", "Sexe non conventionnel", "rectale", "sac de beuh", "Reich", "vous monter", "anulingus", "rhum", "croupe", "acrro au rhum", "ruskov", "sadisme", "sadique", "tenue lgre", "longue bite", "vis", "sexe agressif", "belle de loin mais loin dtre belle", "racaille", "matelot", "marins", "sduire", "Sperme", "sexuelle", "honte", "scatophile", "compltement bourr", "merdier", "chiotte", "merdes", "chiottes", "fille a mec", "esclave", "irrflchi", "dpotoirs", "salope qui nembrasse pas", "salopes", "peau du prpuce", "charbon", "chauffs", "tireur dlite", "tabac  priser", "Sodome", "Sousse", "cuit", "espingouin", "espingouins", "semence", "jaculation fminine", "torride", "Chut", "lapid", "dshabiller", "coup de bassin", "sucer", "aspir", "Sucer", "suce moi la bite salope", "sordide", "les couilles qui pendent", "ttine", "Mansouri", "salaud", "salauds", "testicule", "Pousse", "criminel", "branlette espagnole", "baiseur de seins", "baiser des nichons", "baiseur de nichons", "la bouche", "fumer de lherbe", "pter", "Seins nus", "clochard", "Transsexuel", "sale", "fille qui mange sa merde", "tron", "cochonne", "cochonnes", "moche", "sous-vtements avertissent", "clibataires", "urinoir", "utrus", "Uzi", "Valium", "Viagra", "vibromasseur", "Vierge", "vomir", "Voyeur", "vulgaire", "vulve", "zizi", "branle", "branleur", "remonter son froc", "herbes", "petite bite", "faire  pipi", "popol", "bizar", "pute pour pirates", "Remouillage", "blanc bec", "pute professionnelle", "putain", "se prostituer", "tte de pute", "grosse salope", "bordel", "putes", "prostituer", "bite en rection", "contenu sexuel", "mycose", "Cassos", "Dreier", "3er", "Vierer", "4er", "Anal", "Analsone", "Anilingus", "Anus", "Areola", "Areole", "Arier", "Arsch", "Arschloch", "Arschfick", "Arschgefickt", "Arschficken", "rsche", "Arschfingern", "Arschficker", "Arschhut", "Arschlcher", "Arschmeister", "Arschlecken", "Arschwischen", "Azazel", "Hoden", "Hodensack", "knallen", "Ficker", "Barf", "Bawdy", "Bohner", "Brtige Muschel", "Biesigkeit", "Biatsch", "Schlger", "Bieber", "Groe Titten", "bisexuell", "Schlampe", "verhurt", "Schlampen", "schlampig", "blasen", "Blow job", "Blowjob", "Blowjobs", "bodifizieren", "Stnder", "Brust", "Brste", "Hintern", "Alkohol", "Bosom", "Bosomig", "BH", "brstig", "Arsch fick", "Arschaufnahme", "Arschlock", "Teppichschlemmer", "Hhepunkt", "Klitoris", "Klitoris ficken", "Klitori", "Kokain", "Schwanz", "Schwanzlutscher", "Hahnblock", "Cockknocker", "Hhne", "Hahnenschrei", "koital", "Kondom", "Waschbr", "Korkenzieher", "Krabben", "Riss", "Cracker", "Mist", "beschissen", "Kmmel", "abspritzen", "Cumstain", "Leichte", "Fotze", "Cunthunter", "Fotzecken", "Fotzen", "Kanake", "verdammt", "Schwanzbeutel", "Schwanzdipper", "dickgesicht", "Schwachkopf", "dickisch", "Dickripper", "Dickweed", "Deich", "Dildo", "Dildos", "Dingle", "Tauchschiff", "Doggy-Stil", "Doggystyle", "Hndchen-Stil", "Dong", "Dofus", "bld", "Doppelte Durchdringung", "Dusche", "Dummkopf", "Douchebeutel", "Douchey", "Bldmann", "Deiche", "Ekstase", "ejakulieren", "Ejakulation", "Erweiterung", "aufrecht", "Erektion", "erotisch", "Gesicht sitzen", "Facesitting", "Kippe", "zackig", "Schwuchtel", "Kotzen", "Furz", "Furzknocker", "Fett", "Fleck", "Geiger", "Felchen", "Fellat", "Fellatio", "Filz", "Filzer", "Domina", "Finger", "Fingersatz", "gefistet", "Fisting", "besoffen", "streicheln", "Fujob", "Vorhaut", "Freispiel", "Scheie", "Fickarsch", "gefickt", "Fickgesicht", "Ficken", "Ficknugget", "Ficknuss", "Verpiss dich", "fickt", "Ficktard", "ficken", "Fickwad", "Fudgepacker", "Gangbang", "Ganja", "Frhlich", "Schwule", "Eichel", "Ziege", "goldene Dusche", "Gonade", "Keimdrsen", "wtend", "weint", "Gringo", "G-Punkt", "Guido", "Handjob", "hart an", "er ist", "heb", "Hanf", "Heroin", "Herpes", "gemtlich", "Homie", "Fusel", "Huka", "Nutte", "Hur", "Hure", "Hupe", "Hooters", "geil", "Buckel", "bucklig", "schleimig", "Flittchen", "Hymen", "Inzucht", "Inzest", "Zoll", "Esel", "Jackoff", "Trottel", "gewichst", "Jism", "Jiz", "anspritzen", "Junkie", "Wiken", "tten", "versaut", "Knauf", "Kootch", "Schamlippen", "Ladyboy", "Ausstzige", "lesbisch", "Lesben", "Lezben", "lecken", "Lecken", "Lmao", "Lende", "Lenden", "Schmiermittel", "lustvoll", "Mutter", "Meisterschaft", "masturbieren", "masturbiert", "Masturbation", "Menses", "menstruieren", "Menstruation", "Meth", "m-Ficken", "belstigen", "Moolie", "Mutterfick", "Wichser", "Muff", "Muff Tauchen", "Muffentaucher", "Mord", "mutherficken", "Mutfucking", "mein dong", "Nadeln", "nackt", "Windel", "Nazi", "Nazismus", "Neger", "Nigga", "Niggah", "Niggas", "Niggaz", "Nigger", "noggle", "Nimrod", "Ninny", "Nippel", "verrckt", "Nymphomanin", "Opiate", "Opium", "Oral", "Organ", "Orgasmus", "Orgien", "Orgie", "Eierstock", "Ovum", "Eizellen", "Paddy", "Hschen", "Unterhose", "Pastie", "pasts", "Pdophilie", "pdophil", "pinkeln", "Pipi", "durchdringen", "Penetration", "Penis", "Perversion", "Peyote", "Phalli", "phallisch", "Kissenbeier", "Zuhlter", "Piss", "Pissen", "Seelachs", "Poontang", "Porno", "Topf", "Tpfchen", "Stechen", "Prostituierte", "prde", "Wrfel", "Scham", "Punktrass", "Punky", "Der Kater", "Muschi", "Knig", "schwul", "Quicky", "rassig", "vergewaltigen", "vergewaltigt", "Vergewaltiger", "rektal", "Rektum", "Rectus", "Reefer", "Abschied", "verzgern", "Verzgert", "reiten Sie", "Hinterteil", "Rumprammer", "Russki", "Sadismus", "Sadist", "Sado-Mazo", "Schnee", "sprlich", "Schraube", "Scribble", "gekratzt", "scrudieren", "Abschaum", "Seemann", "Seeleute", "verfhren", "Samen", "Sex", "sexuell", "Shamedame", "Scheisse", "Shiteater", "Scheihaus", "scheit", "geschissen", "Wurf", "Weichei", "Prost", "Sklave", "schmieren", "schmierig", "Smegma", "Schmutz", "schmutzig", "entreien", "Scharfschtze", "Schnupftabak", "Sodom", "Spik", "spitz", "Spikes", "Spucke", "spritzen", "spritzend", "dampfend", "steif", "entsteint", "Streifen", "Schlaganfall", "saugen", "gesaugt", "saugend", "Saugen", "Sumofabiatch", "Tampon", "Spt", "tdlich", "Teebeutel", "Zitze", "Testee", "Schub", "klingeln", "Meise", "Titten", "Tittiefucker", "Tittenfick", "Tittenficker", "Zum Mund", "token", "Toots", "Oben ohne", "Tramp", "Transsexuelle", "trashig", "Kter", "tuschen", "Mse", "Zweige", "hsslich", "Unterwsche", "unverheiratet", "Urinal", "Urin", "Gebrmutter", "Vag", "Vagina", "Vibrator", "Jungfrau", "Fchsin", "Wodka", "erbrechen", "vulgr", "Vulva", "Bndel", "wichsen", "Gras", "Weenie", "Weewee", "Verrckter", "Weibsbild", "Nsse", "weilich", "sausen", "whoralisch", "whorealizisch", "gehurst", "Huregesicht", "Hurehopper", "Puff", "Huren", "Hurerei", "holzig", "x-bewertet", "hefig", "Rowdy", "u 3jku", "u trojku", "u 4ku", "u cetvorku", "analno", "analna sonda", "cmar", "arijski", "dupe", "upak", "jebanje u dupe", "jebani u dupe", "jebacine u dupe", "dupeta", "Prstenovanje dupe", "jebanje u guzicu", "jebac guzica", "Analno jebanje", "gluperda", "seronja", "seronje", "gospodar dupeta", "jedenje dupeta", "brisanje dupeta", "brisanja dupeta", "muda", "monice", "izjebati", "jebac", "povracka", "nepristojan", "Debele lepe ene", "Dominacija", "meksikanac", "bradati ljam", "bestijalnost", "kucka", "koji tuce", "stidnica", "velike sise", "velikesise", "glupaca", "biseksualac", "izjebana", "kucke", "dangrizava", "ispui", "puenje kurca", "puenje kite", "puenja kurca", "Plavi film", "telo", "telesno", "umociti", "mudo", "Monice", "jaja", "kost", "uvaliti kosku", "dignut kurac", "erekcije kurca", "kanabis", "sisa", "sise", "grudi", "dojkica", "lajm", "kladionicar", "dupence", "guza", "alkohol", "alkoholicar", "pijan", "prsata", "crevo", "creva", "brushalter", "grudnjak", "dojka", "hulja", "grupno svravanje", "jebaci bikove statue", "zapuac", "sisata", "karanje u dupe", "Cmarni breuljak", "jebanje u cmar", "jebac dupeta", "Jebanje u dupe", "rupa u dupetu", "zaiti picku", "kaka", "testisi", "usmine", "lezbaca", "cerviks", "obucena ena", "goli mukarac", "azijac", "azijci", "azijatkinja", "azijka", "debeli kurac", "debeli kurci", "vrhunac", "klica", "klitoris", "jebanje klitorisa", "klitorus", "klice", "koka", "kokain", "puac kurca", "blokiranje kurca", "jebanje u rupu", "udaranje kurca", "kite", "puacica kurceva", "sisacica kurca", "snoaj", "svravac", "kondom", "propalica", "propalice", "sisac kite", "vai", "krek", "koristi krek", "kurva za krek", "sranje", "jebeni", "svrio", "svriti", "svravanje", "bacanje sperme", "bacanja sperme", "drkacica", "izdrkotina", "kunilingus", "pizda", "picka", "pizdurina", "juri picke", "lizanje picke", "lizac picki", "picke", "latino", "latinosi", "prokletstvo", "kurac", "govnjivko", "umakac kurca", "kurcevo lice", "nabijac", "kurvin sin", "kurvini sinovi", "kurvinski", "jebac beba", "peko gutac sperme", "glupak", "kontrolisanje kurcem", "rajferlus za kurac", "koji vara", "lezbejka", "vibratori", "glupan", "govance", "jebanje otpozadi", "kuceci stil", "pasji stil", "kuceci-stil", "seljacina", "budala", "Dvostruka penetracija", "govno", "govnjivci", "budaletina", "Glup", "tupca", "tupan", "tupani", "lezbijka", "lezbijke", "ekstazi", "ejakulat", "Ejakulacija", "proirenje", "dignut", "erekcija", "erotski", "pouda", "sedi na licu", "sedenje na licu", "sedenjenalicu", "pedercina", "pekiric", "peder", "homic", "pederi", "seka persa", "koji prdi", "debeo", "gutanje sperme", "gutacica", "gutati", "Gutanje", "jebanje u obraz", "felacio", "feti", "fetiista", "kanjavanje u seksu", "prst", "prstenovanje", "pesnicen", "pesnicenje", "pesniciti", "pesnicom", "fufa", "odjebi i umri", "ljubazno", "iskarana", "jebanje nogom", "Jebanje nogom", "koica penisa", "nakaza", "frigidna", "frigid", "prejebena", "jebati", "gadan", "jeben", "karan", "iskaran", "grozan", "jebanje", "karanje", "jebote", "odjebi", "idioti", "propalitet", "kapljice sperme", "izjeban", "derpe", "jebanje u grupi", "gej", "gejevi", "igolo", "glavic", "raskrecen anus", "zlatni tu", "jajnik", "jajnici", "kosook", "kosooki", "g tacka", "g-tacka", "maco", "drkanje rukom", "rucno drkanje", "digao se", "konobarica", "jea", "konoplja", "herpesni", "fufica", "pederko", "pedercic", "crncuga", "alkoholno pice", "nargila", "kurva", "drolja", "prostitutka", "droljasta", "napaljen", "naskace", "naskocen", "naskakanje", "bestidnica", "parenje", "Inc", "indun", "kreten", "onanisanje", "japanceros", "japancerosi", "onanisati", "seme", "spermica", "spermua", "narkoman", "narkos", "jevrej", "jevreji", "ubij", "uvrnuto", "kvrgav kurcic", "pica", "pice", "pickica", "jevrejka", "usmina", "enskaro", "udnja", "lepra", "lezbejke", "lezbace", "lezbejke muce", "lizati", "lizanje", "slabina", "slabine", "lubrikant", "poudna", "mamice", "masaa", "onanie", "masturbira", "masturbiranje", "masturbacija", "maksi", "menzisi", "menstrulno", "menstruacija", "metadon", "jebem", "usran", "zlostavljati", "svetleci zubi", "Jebem ti jebem", "jebeno jebeno", "mamojebac", "mrtvo", "umakanje u vaginu", "umakac u vagine", "ubistvo", "kuckini sinovi", "kuckin sin", "pizda materina", "prokleto", "moja virla", "jajce", "jajca", "gola", "opojno", "nacista", "nacizam", "crnja", "crnac", "crnje", "crnci", "crncuge", "crni kurac", "bradavica", "bradavice", "nimfomanka", "opijat", "opijum", "oralno", "ustima", "orgazam", "orgazmicki", "orgije", "orgijanja", "orgija", "jajna celija", "jajne celije", "sranje tokom seksa", "pakistanac", "gace", "gacice", "vruce pantalonice", "pokrivac za bradavice", "zalepljene bradavice", "pcp droga", "pedofil", "Pedofil", "Pedofili", "pedofilija", "pedofilican", "pikiti", "mokraca", "probiti", "penetracija", "mokrenje u vaginu", "penilni", "perverzije", "pejot", "falican", "falicni", "grize jastuke", "makro", "podvodac", "piacka", "ljut", "Pianje", "razljutiti", "poljak", "polok", "vagina devojcice", "jebacica", "pornic", "pornografija", "porno zvezda", "poronografi", "klozet", "klozetarka", "drkadija", "cistunica", "nevinace", "pubicna", "pubicne", "kvazi mafija", "smor", "maca", "pickice", "lupac pickica", "muka kurva", "prdeti", "glasno prdenje", "prdac", "Prde", "prdacina", "prdei", "seks na brzaka", "hvatanje", "seksi", "silovanje", "silovana", "silovati", "silovatelj", "gadan seks", "rektalno", "rektum", "rektus", "retardinjo", "rajh", "retardiran", "parodija", "jaem te", "lizanje upka", "riming", "cekic", "cekisanje", "sadizam", "sadista", "mrk", "besramno", "izo", "pionja", "karati", "skrog", "skrot", "skrotum", "rugoba", "dubre", "zavodenje", "semeni", "Semena", "seks", "seksualno", "poniavanje", "sracka", "jede govna", "usrano lice", "usrana rupa", "usrana kuca", "sranja", "jebiga", "koji sere", "govnjar", "rob", "ljigavac", "ljigavo", "jebac kurvi", "kurvinski poljubac", "kurve", "smrdljive genitalije", "eksplicitno", "smrdljiv", "grabiti", "snajper", "sodoma", "sos", "sosiran", "hispano", "hispanac", "panac", "panci", "isprskati", "svracka", "mlaznica", "pricanje", "uzavrelo", "umukni", "ukrucen", "ustondiran", "skidanje odece", "udar", "glup", "sisaj", "sisati", "sisao", "sisanje", "Sisanje", "kurvinski sin", "mudrica", "kloar", "sisanje jaja", "dojenje", "kakica", "testi", "testisa", "testisani", "potisak", "kriminalac", "golicanje", "drkanje na sise", "jebac sisa", "sisice", "sisurina", "sisica", "jebanje sisica", "jebacsisa", "U usta", "kockar", "ribe", "Bez brusa", "fuksa", "transseksualac", "tranda", "smecarka", "primacica", "izmet", "Izmet", "zatvori", "drolje", "runo", "donji ve", "nevencani", "pisoar", "urin", "materica", "valiujm", "viajgra", "devica", "cica", "povracanje", "voajer", "vulgarno", "kurcina", "drkac kurca", "masturbator", "zadnjica", "skidac", "trava", "pia", "piica", "piora", "cudak", "mlada koka", "ilegalci", "lo trip", "zviduk", "jebozovna", "kurvinska", "kurvanja", "faca kurve", "naskakac kurvi", "kurvarluk", "kurvinska kuca", "kurvanje", "kao crnja", "utroba", "poeljan", "italijan", "koji kurac", "pornografski sadraj", "gljivicna", "huligan", "zoofil", "I'm so wet", "intestine"]

const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


// app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

app.use('/', routes);


app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
	response.sendFile('/public/home.html', { root: '.' })
});

const request = require('request-promise');
//const cheerio = require('cheerio');
//const express = require('express');
//const app = express();

app.use(express.static(__dirname + '/public'));

const Caption = mongoose.model('Caption');

app.get('/', function (request, response) {
	response.sendFile('/public/home.html', { root: '.' })
});
function removeDuplicates(arr) {
	return arr.filter((item,
		index) => arr.indexOf(item) === index);
};
function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
};
app.get('/api/captions', function (req, res) {

	console.log(req.query.type);
	console.log(req.query.category);

	if (req.query.category != null || req.query.category != "") {
		if (req.query.category == "songs") {
			let lyrics_list = [];

			(async () => {

				const songURL = ('https://www.lyrics.com/lyrics/' + req.query.type);
				const response = await request({
					uri: songURL,
					headers: {
						'Accept':
							'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
						'Accept-Encoding': 'gzip, deflate, br',
						'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
						'Cache-Control': 'max-age=0',
						'Connection': 'keep-alive',
						'Host': 'www.lyrics.com',
						'Upgrade-Insecure-Requests': '1',
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
					},
					gzip: true

				});

				try {

					let $ = cheerio.load(response);

					let label = $('.lyric-meta-title');
					console.log(label);
					let output = label.find('pre').text();

					$('.lyric-body').each((index, element) => {
						const captions = $(element).text();
						let check = 0;
						for (let i = 0; i <= BAD_KEYWORDS.length; i++) {
							if (captions.includes(BAD_KEYWORDS[i])) {
								check = 1;
								break;
							}
						}
						let splitString = captions.split('\n');
						const splitLines = splitString;
						if (splitLines.length == 1) {
							lyrics_list.push({
								'captions': splitLines[0]
							})
						}
						else if (check == 0 && splitLines[0] == splitLines[1]) {
							lyrics_list.push({
								'captions': splitLines[0]
							})
						}
						else {
							for (let i = 0; i < splitLines.length; i++) {

								//if(check == 0 && (splitLines[i].includes(req.query.type.toString())) || (splitLines[i].includes(req.query.type+","))){

								if (check == 0 && ((splitLines[i].toString()).toLowerCase().includes((req.query.type.toString()).toLowerCase()) || (splitLines[i].toString()).toLowerCase().includes((req.query.type.toString()).toLowerCase() + ", "))) {
									lyrics_list.push({
										'captions': splitLines.slice(0, i + 1)
									})
									break;
								}
							}
						}

						/*		
								if (check == 0 && (splitLines[0].toLowerCase().includes((req.query.type.toString()).toLowerCase()) || splitLines[0].toLowerCase().includes((req.query.type.toString()).toLowerCase()+","))){
									lyrics_list.push({
											'captions': splitLines[0]
										})
								}
								else if (check == 0 && splitLines[0]==splitLines[1]){
									lyrics_list.push({
										'captions': splitLines[0]
									})
								}
								else if (check == 0){
									lyrics_list.push({
									'captions': captions
									})
								}
				*/
					});

				} catch (err) {
					console.log(err);
				}

				let new_lyrics_list = [...new Set(lyrics_list)];
				// new_lyrics_list = uniq(lyrics_list)
				console.log(new_lyrics_list)
				res.send(new_lyrics_list);
			})();
		}

		if (req.query.category == "puns") {
			let puns_list = [];

			(async () => {

				const punsURL = ('https://puns.samueltaylor.org/?word=' + req.query.type);
				let response = await request(punsURL);

				try {

					let $ = cheerio.load(response);

					let label = $('.puns');
					let output = label.find('li').text();

					$('#puns-list').each((index, element) => {
						const captions = $(element).text();
						let check1 = 0;
						for (let i = 0; i <= BAD_KEYWORDS.length; i++) {
							if (captions.includes(BAD_KEYWORDS[i])) {
								check1 = 1;
								break;
							}
						}
						if (check1 == 0) {
							puns_list.push({
								'captions': captions
							})
						}
					});

				} catch (err) {
					console.log(err);
				}


				console.log(puns_list)
				res.send(puns_list);
			})();
		}

		else if (req.query.category == "people") {
			let people_list = [];

			(async () => {

				const peopleURL = ('https://www.quotes.net/quotations/' + req.query.type);
				const response = await request({
					uri: peopleURL,
					headers: {
						'Accept':
							'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
						'Accept-Encoding': 'gzip, deflate, br',
						'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
						'Cache-Control': 'max-age=0',
						'Connection': 'keep-alive',
						'Host': 'www.quotes.net',
						'Upgrade-Insecure-Requests': '1',
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
					},
					gzip: true

				});

				try {

					let $ = cheerio.load(response);
					let label = $('.tal qx');
					console.log(label);
					let output = label.find('a').text();

					$('.author-quote').each((index, element) => {
						const captions = $(element).text();
						let check2 = 0;
						for (let i = 0; i <= BAD_KEYWORDS.length; i++) {
							if (captions.includes(BAD_KEYWORDS[i])) {
								check2 = 1;
								break;
							}
						}
						if (check2 == 0) {
							people_list.push({
								'captions': captions
							})
						}
					});

				} catch (err) {
					console.log(err);
				}
				console.log(people_list)
				res.send(people_list);
			})();
		}

		else if (req.query.category == "movies") {
			let quotes_list = [];

			(async () => {

				let movieURL = ('https://www.moviequotes.com/search-quotes/?q=' + req.query.type);
				let response = await request(movieURL);
				try {

					let $ = cheerio.load(response);
					let label = $('[class=\"post-box\"]');
					let output = label.find('span').text();


					$('[class=\"whole-read-more\"]').each((index, element) => {
						const captions = $(element).text();
						let check3 = 0;
						for (let i = 0; i <= BAD_KEYWORDS.length; i++) {
							if (captions.includes(BAD_KEYWORDS[i])) {
								check3 = 1;
								break;
							}
						}
						if (check3 == 0) {
							quotes_list.push({
								'captions': captions
							})
						}
					});
				} catch (err) {
					console.log(err);
				}
				console.log(quotes_list)
				res.send(quotes_list);
			})();
		}

		if (req.query.type != null) {

		}
	}
});


// connect to the db and start the express server
let db;

// URL of database 
const url = 'mongodb://127.0.0.1:27017/collab';

//connecting to database
MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
	if (err) {
		return console.log(err)
	}
	db = database
})

// save to collab


app.post('/api/caption/save', (req, res) => {
  	// TODO: create new review... if save succeeds, send back JSON
  	// representation of saved object
  	console.log(req.body);
  	console.log("req.body.caption: ", req.body.caption);
  	
  	let json = req.body;
  	
  	let caption = Caption();
  	caption.name = json.caption;
	caption.user = req.user._id;
	console.log(caption);
	caption.save(function(err, saved, count) {
		console.log(err);
		console.log(saved);
		console.log(count);
		res.send(saved);
	});
	
  	
});








// get the click data from the database
app.get('/captions', (req, res) => {
	db.collection('clicks').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.send(result);
	});
});








app.listen(3000);